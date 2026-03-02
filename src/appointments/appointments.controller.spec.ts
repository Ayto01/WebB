import { Test, TestingModule } from "@nestjs/testing";
import { AppointmentsController } from "./appointments.controller";
import { AppointmentsService } from "./appointments.service";
import { DrizzleAsyncProvider } from "../drizzle/drizzle.provider";
import { mockDrizzle } from "../test-utils/mock-drizzle.provider";

describe("AppointmentsController", () => {
  let controller: AppointmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentsController],
      providers: [
        AppointmentsService,
        { provide: DrizzleAsyncProvider, useValue: mockDrizzle },
      ],
    }).compile();

    controller = module.get<AppointmentsController>(AppointmentsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
