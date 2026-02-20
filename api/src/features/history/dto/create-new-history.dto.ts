import { Concert } from 'src/features/concert/entities/concert.entity';
import { User } from 'src/features/user/user.entity';

export class CreateNewHistoryDto {
  concert: Concert;
  user: User;
  action: string;
}
