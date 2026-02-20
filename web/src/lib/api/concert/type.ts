export interface Concert {
  id: number;
  name: string;
  description?: string;
  total_seat: number;
  available_seat: number;
  createdAt: string;
  updatedAt: string;
}

export type CreateConcertRequest = {
  concertName: string;
  description: string;
  totalSeat: number;
};
