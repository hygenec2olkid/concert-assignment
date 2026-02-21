export interface Concert {
  id: number;
  name: string;
  description?: string;
  total_seat: number;
  available_seat: number;
  createdAt: string;
  updatedAt: string;
}

export interface ConcertResponse {
  id: number;
  concertName: string;
  description: string;
  totalSeat: number;
  availableSeat: number;
  reservedSeat?: boolean;
}

export type CreateConcertRequest = {
  concertName: string;
  description: string;
  totalSeat: number;
};

export type ConcertUserRequest = {
  concertId: number;
  userId: number;
};

export type SummaryResponse = {
  totalSeat: number;
  reserve: number;
  cancel: number;
};
