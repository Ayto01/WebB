import { Test, TestingModule } from "@nestjs/testing";
import { WorkHoursController } from "./work-hours.controller";
import { WorkHoursService } from "./work-hours.service";

describe("WorkHoursController", () => {
  let controller: WorkHoursController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkHoursController],
      providers: [WorkHoursService],
    }).compile();

    controller = module.get<WorkHoursController>(WorkHoursController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
