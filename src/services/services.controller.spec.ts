import { Test, TestingModule } from "@nestjs/testing";
import { ServicesController } from "./services.controller";
import { ServicesService } from "./services.service";
import { DrizzleAsyncProvider } from "../drizzle/drizzle.provider";
import { mockDrizzle } from "../test-utils/mock-drizzle.provider";

describe("ServicesController", () => {
  let controller: ServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicesController],
      providers: [
        ServicesService,
        { provide: DrizzleAsyncProvider, useValue: mockDrizzle },
      ],
    }).compile();

    controller = module.get<ServicesController>(ServicesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
