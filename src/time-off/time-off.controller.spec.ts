import { Test, TestingModule } from "@nestjs/testing";
import { TimeOffController } from "./time-off.controller";
import { TimeOffService } from "./time-off.service";

describe("TimeOffController", () => {
  let controller: TimeOffController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeOffController],
      providers: [TimeOffService],
    }).compile();

    controller = module.get<TimeOffController>(TimeOffController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
