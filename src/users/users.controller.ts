import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

import { UsersService } from "./users.service";
import { AuthService } from "../auth/auth.service";

import { Public } from "../auth/decorators/public.decorator";
import { Roles } from "../auth/decorators/roles.decorator";
import { Role } from "../auth/roles";

import { CheckUserAccessGuard } from "../auth/guards/userAccess.guard";
import { CurrentUser } from "../auth/decorators/currentUser.decorator";
import { ParseUserIdPipe } from "../auth/pipes/parseUserId.pipe";

import { PaginationQuery } from "../common/pagination.dto";
import type { Session } from "../types/auth";

import { LoginResponseDto } from "../session/session.dto";
import {
  RegisterUserRequestDto,
  UpdateUserRequestDto,
  UserListResponseDto,
  PublicUserResponseDto,
} from "./dto/user.dto";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: "Get all users (admin only)",
    type: UserListResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - you need to be signed in",
  })
  @ApiResponse({ status: 403, description: "Forbidden - admin role required" })
  @Get()
  @Roles(Role.ADMIN)
  async getAllUsers(
    @Query() pagination: PaginationQuery,
  ): Promise<UserListResponseDto> {
    return this.usersService.getAll(pagination);
  }

  @ApiResponse({
    status: 200,
    description: "Register user (public) -> returns JWT token",
    type: LoginResponseDto,
  })
  @ApiResponse({ status: 400, description: "Invalid input data" })
  @Post()
  @Public()
  async registerUser(
    @Body() dto: RegisterUserRequestDto,
  ): Promise<LoginResponseDto> {
    const token = await this.authService.register(dto);
    return { token };
  }

  @ApiBearerAuth()
  @ApiParam({
    name: "id",
    description: 'User id or "me"',
    example: "me",
  })
  @ApiResponse({
    status: 200,
    description: "Get user by id (or 'me')",
    type: PublicUserResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - you need to be signed in",
  })
  @ApiResponse({ status: 404, description: "No user with this id exists" })
  @Get(":id")
  @UseGuards(CheckUserAccessGuard)
  async getUserById(
    @Param("id", ParseUserIdPipe) id: "me" | number,
    @CurrentUser() user: Session,
  ): Promise<PublicUserResponseDto> {
    const userId = id === "me" ? user.id : id;
    return this.usersService.getById(userId);
  }

  @ApiBearerAuth()
  @ApiParam({ name: "id", description: 'User id or "me"', example: "me" })
  @ApiResponse({
    status: 200,
    description: "Update user by id (or 'me')",
    type: PublicUserResponseDto,
  })
  @ApiResponse({ status: 400, description: "Invalid input data" })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - you need to be signed in",
  })
  @ApiResponse({ status: 404, description: "No user with this id exists" })
  @Put(":id")
  @UseGuards(CheckUserAccessGuard)
  async updateUserById(
    @Param("id", ParseUserIdPipe) id: "me" | number,
    @CurrentUser() user: Session,
    @Body() dto: UpdateUserRequestDto,
  ): Promise<PublicUserResponseDto> {
    const userId = id === "me" ? user.id : id;
    return this.usersService.update(userId, dto);
  }

  @ApiBearerAuth()
  @ApiParam({ name: "id", description: 'User id or "me"', example: "me" })
  @ApiResponse({ status: 204, description: "Delete user by id (or 'me')" })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - you need to be signed in",
  })
  @ApiResponse({ status: 404, description: "No user with this id exists" })
  @Delete(":id")
  @UseGuards(CheckUserAccessGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserById(
    @Param("id", ParseUserIdPipe) id: "me" | number,
    @CurrentUser() user: Session,
  ): Promise<void> {
    const userId = id === "me" ? user.id : id;
    await this.usersService.delete(userId);
  }
}
