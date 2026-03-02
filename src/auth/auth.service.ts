import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { eq } from "drizzle-orm";
import * as argon2 from "argon2";
/* eslint-disable prettier/prettier */
import {
    InjectDrizzle,
    type DatabaseProvider,
} from "../drizzle/drizzle.provider";
import { users } from "../drizzle/schema";
import type { ServerConfig, AuthConfig } from "../config/configuration";
import { Role } from "./roles";
import type { JwtPayload } from "../types/auth";

import { LoginRequestDto } from "../session/session.dto";
import { RegisterUserRequestDto } from "../users/dto/user.dto";
import type { User } from "../types/user";

@Injectable()
export class AuthService {
  constructor(
    @InjectDrizzle() private readonly db: DatabaseProvider,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<ServerConfig>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const authConfig = this.configService.get<AuthConfig>("auth")!;
    return argon2.hash(password, {
      type: argon2.argon2id,
      hashLength: authConfig.hashLength,
      timeCost: authConfig.timeCost,
      memoryCost: authConfig.memoryCost,
    });
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }

  private signJwt(user: User): string {
    return this.jwtService.sign({
      sub: user.id,
      email: user.email,
      roles: user.roles,
    });
  }

  async verifyJwt(token: string): Promise<JwtPayload> {
    const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
    if (!payload)
      throw new UnauthorizedException("Invalid authentication token");
    return payload;
  }

  async login({ email, password }: LoginRequestDto): Promise<string> {
    const user = await this.db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      throw new UnauthorizedException(
        "The given email and password do not match",
      );
    }

    const ok = await this.verifyPassword(password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException(
        "The given email and password do not match",
      );
    }

    return this.signJwt(user);
  }

  async register({
    name,
    email,
    phone,
    password,
  }: RegisterUserRequestDto): Promise<string> {
    const passwordHash = await this.hashPassword(password);

    const [newUser] = await this.db
      .insert(users)
      .values({
        name,
        email,
        phone,
        passwordHash,
        roles: [Role.USER],
      })
      .$returningId();

    const user = await this.db.query.users.findFirst({
      where: eq(users.id, newUser.id),
    });

    return this.signJwt(user!);
  }
}
