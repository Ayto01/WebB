import { Test, TestingModule } from "@nestjs/testing";
import { ServicesService } from "./services.service";
import { DrizzleAsyncProvider } from "../drizzle/drizzle.provider";
import { mockDrizzle } from "../test-utils/mock-drizzle.provider";

describe("ServicesService", () => {
  let service: ServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServicesService,
        { provide: DrizzleAsyncProvider, useValue: mockDrizzle },
      ],
    }).compile();

    service = module.get<ServicesService>(ServicesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
