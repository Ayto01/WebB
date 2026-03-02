/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { and, eq, gte, lte } from "drizzle-orm";
import {
    InjectDrizzle,
    type DatabaseProvider,
} from "../drizzle/drizzle.provider";
import { workHours, timeOff, appointments, services } from "../drizzle/schema";

@Injectable()
export class AvailabilityService {
  constructor(@InjectDrizzle() private readonly db: DatabaseProvider) {}

  async getAvailableSlots(
    dateStr: string,
    serviceId: number,
  ): Promise<string[]> {
    const dateStart = new Date(`${dateStr}T00:00:00.000Z`);
    const dateEnd = new Date(`${dateStr}T23:59:59.999Z`);

    const service = await this.db.query.services.findFirst({
      where: eq(services.id, serviceId),
    });
    if (!service) return [];

    const weekday = this.jsWeekdayToYourDbWeekday(dateStart);

    const wh = await this.db.query.workHours.findFirst({
      where: eq(workHours.weekday, weekday),
    });
    if (!wh) return [];

    const offs = await this.db.query.timeOff.findMany({
      where: and(gte(timeOff.startAt, dateStart), lte(timeOff.endAt, dateEnd)),
    });

    const appts = await this.db.query.appointments.findMany({
      where: and(
        gte(appointments.startAt, dateStart),
        lte(appointments.endAt, dateEnd),
      ),
    });

    const [sh, sm] = wh.startTime.split(":").map(Number);
    const [eh, em] = wh.endTime.split(":").map(Number);

    const slots: string[] = [];
    const cur = new Date(dateStart);
    cur.setUTCHours(sh, sm, 0, 0);

    const end = new Date(dateStart);
    end.setUTCHours(eh, em, 0, 0);

    const stepMin = 30;

    while (cur < end) {
      const slotStart = new Date(cur);
      const slotEnd = new Date(cur);
      slotEnd.setUTCMinutes(
        slotEnd.getUTCMinutes() + Number(service.durationService),
      );

      if (slotEnd > end) break;

      const overlapsTimeOff = offs.some(
        (o) => slotStart < o.endAt && slotEnd > o.startAt,
      );
      const overlapsAppt = appts.some(
        (a) => slotStart < a.endAt && slotEnd > a.startAt,
      );

      if (!overlapsTimeOff && !overlapsAppt) {
        slots.push(slotStart.toISOString());
      }

      cur.setUTCMinutes(cur.getUTCMinutes() + stepMin);
    }

    return slots;
  }

  private jsWeekdayToYourDbWeekday(d: Date): number {
    const js = d.getUTCDay();
    return js === 0 ? 7 : js;
  }
}
