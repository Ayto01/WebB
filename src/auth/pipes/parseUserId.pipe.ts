import type { PipeTransform } from "@nestjs/common";
import { Injectable, BadRequestException } from "@nestjs/common";

@Injectable()
export class ParseUserIdPipe implements PipeTransform {
  transform(value: string) {
    if (value === "me") return "me";

    const parsedId = Number(value);
    if (Number.isNaN(parsedId)) {
      throw new BadRequestException('User ID must be a number or "me"');
    }
    return parsedId;
  }
}
