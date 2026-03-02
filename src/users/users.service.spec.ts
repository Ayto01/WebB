import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { DrizzleAsyncProvider } from "../drizzle/drizzle.provider";
import { mockDrizzle } from "../test-utils/mock-drizzle.provider";

describe("UsersService", () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: DrizzleAsyncProvider, useValue: mockDrizzle },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
