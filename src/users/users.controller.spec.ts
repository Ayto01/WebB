import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { DrizzleAsyncProvider } from "../drizzle/drizzle.provider";
import { mockDrizzle } from "../test-utils/mock-drizzle.provider";
import { AuthService } from "../auth/auth.service";

describe("UsersController", () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: DrizzleAsyncProvider, useValue: mockDrizzle },
        {
          provide: AuthService,
          useValue: {
            hashPassword: jest.fn(),
            comparePassword: jest.fn(),
            signToken: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
