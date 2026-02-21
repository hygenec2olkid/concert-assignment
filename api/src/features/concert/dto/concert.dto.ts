export class ConcertDto {
  id: number;
  concertName: string;
  description: string;
  totalSeat: number;
  availableSeat: number;
  reservedSeat?: boolean;
}
