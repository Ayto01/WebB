import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateWorkHourDto } from "./dto/create-work-hour.dto";
import { UpdateWorkHourDto } from "./dto/update-work-hour.dto";
import { WorkHour } from "./entities/work-hour.entity";

@Injectable()
export class WorkHoursService {
  private data: WorkHour[] = [
    { id: 1, weekday: 1, start_time: "09:00", end_time: "18:00" },
    { id: 2, weekday: 2, start_time: "09:00", end_time: "18:00" },
  ];
  private seq = this.data.length;

  findAll() {
    return this.data;
  }
  findOne(id: number) {
    const it = this.data.find((x) => x.id === id);
    if (!it) throw new NotFoundException("Work hour not found");
    return it;
  }
  create(dto: CreateWorkHourDto) {
    const it = { id: ++this.seq, ...dto };
    this.data.push(it);
    return it;
  }
  update(id: number, dto: UpdateWorkHourDto) {
    const i = this.data.findIndex((x) => x.id === id);
    if (i === -1) throw new NotFoundException("Work hour not found");
    this.data[i] = { ...this.data[i], ...dto };
    return this.data[i];
  }
  remove(id: number) {
    const i = this.data.findIndex((x) => x.id === id);
    if (i === -1) throw new NotFoundException("Work hour not found");
    this.data.splice(i, 1);
  }
}
