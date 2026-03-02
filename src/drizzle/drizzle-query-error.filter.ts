import type { ExceptionFilter } from "@nestjs/common";
import { Catch, ConflictException, NotFoundException } from "@nestjs/common";
import { DrizzleQueryError } from "drizzle-orm";

@Catch(DrizzleQueryError)
export class DrizzleQueryErrorFilter implements ExceptionFilter {
  catch(error: DrizzleQueryError) {
    if (
      !error.cause ||
      typeof error.cause !== "object" ||
      !("code" in error.cause)
    ) {
      throw new Error(error.message || "Unknown database error");
    }

    const cause = error.cause as { code?: string; message?: string };
    const code = cause.code ?? "";
    const message = cause.message ?? "";

    switch (code) {
      case "ER_DUP_ENTRY": {
        if (message.includes("idx_users_email_unique")) {
          throw new ConflictException(
            "There is already a user with this email address",
          );
        }

        if (message.includes("idx_transactions_appointment_unique")) {
          throw new ConflictException(
            "This appointment already has a transaction",
          );
        }

        throw new ConflictException("This item already exists");
      }

      case "ER_NO_REFERENCED_ROW_2": {
        if (message.includes("transactions_user_id_users_id_fk")) {
          throw new NotFoundException("No user with this id exists");
        }

        if (
          message.includes("transactions_appointment_id_appointments_id_fk")
        ) {
          throw new NotFoundException("No appointment with this id exists");
        }

        throw new NotFoundException("Referenced item does not exist");
      }
    }

    throw error;
  }
}
