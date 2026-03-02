import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTimeOffDto } from "./dto/create-time-off.dto";
import { UpdateTimeOffDto } from "./dto/update-time-off.dto";
import { TimeOff } from "./entities/time-off.entity";

@Injectable()
export class TimeOffService {
  private data: TimeOff[] = [
    {
      id: 1,
      start_at: "2025-10-20T13:00:00+02:00",
      end_at: "2025-10-20T15:00:00+02:00",
      reason: "Onderhoud",
    },
  ];
  private seq = this.data.length;

  findAll() {
    return this.data;
  }
  findOne(id: number) {
    const it = this.data.find((x) => x.id === id);
    if (!it) throw new NotFoundException("Time off not found");
    return it;
  }
  create(dto: CreateTimeOffDto) {
    const it = { id: ++this.seq, ...dto };
    this.data.push(it);
    return it;
  }
  update(id: number, dto: UpdateTimeOffDto) {
    const i = this.data.findIndex((x) => x.id === id);
    if (i === -1) throw new NotFoundException("Time off not found");
    this.data[i] = { ...this.data[i], ...dto };
    return this.data[i];
  }
  remove(id: number) {
    const i = this.data.findIndex((x) => x.id === id);
    if (i === -1) throw new NotFoundException("Time off not found");
    this.data.splice(i, 1);
  }
}
