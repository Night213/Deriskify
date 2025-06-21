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

  @Expose()
  @Transform(({ obj }: { obj: User }) => obj.profile?.weight || null)
  weight: number | null;

  @Expose()
  @Transform(({ obj }: { obj: User }) => obj.profile?.height || null)
  height: number | null;

  @Expose()
  @Transform(({ obj }: { obj: User }) => obj.profile?.chronicDiseases || [])
  chronicDiseases: string[];

  @Expose()
  @Transform(({ obj }: { obj: User }) => obj.profile?.emergencyContacts || [])
  emergencyContacts: string[];
}
