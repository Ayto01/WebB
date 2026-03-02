import { Test, TestingModule } from "@nestjs/testing";
import { AppointmentsService } from "./appointments.service";
import { DrizzleAsyncProvider } from "../drizzle/drizzle.provider";
import { mockDrizzle } from "../test-utils/mock-drizzle.provider";

describe("AppointmentsService", () => {
  let service: AppointmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentsService,
        { provide: DrizzleAsyncProvider, useValue: mockDrizzle },
      ],
    }).compile();

    service = module.get<AppointmentsService>(AppointmentsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
