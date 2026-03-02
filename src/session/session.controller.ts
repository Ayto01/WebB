import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { Public } from "../auth/decorators/public.decorator";
import { LoginRequestDto, LoginResponseDto } from "./session.dto";

@Public()
@Controller("sessions")
export class SessionsController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
    const token = await this.authService.login(dto);
    return { token };
  }
}
