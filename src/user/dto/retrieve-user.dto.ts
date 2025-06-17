import { Expose, Transform } from 'class-transformer';
import { User } from '../entities/user.entity';

export class RetrieveUserDto {
  @Expose()
  nationalId: string;

  @Expose()
  fullName: string;

  @Expose()
  phone: string;

  @Expose()
  @Transform(({ obj }: { obj: User }) => obj.profile?.address || null)
  address: string | null;

  @Expose()
  @Transform(({ obj }: { obj: User }) => obj.profile?.city || null)
  city: string | null;

  @Expose()
  @Transform(({ obj }: { obj: User }) => obj.profile?.birthDate || null)
  birthDate: Date | null;
}
