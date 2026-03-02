export class Appointment {
  id: number;
  customer_id: number;
  service_id: number;
  start_at: string;
  end_at?: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  created_at: string;
}
