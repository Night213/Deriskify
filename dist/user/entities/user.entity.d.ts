import { UserType } from '../../shared/enums/user.enums';
import { UserProfile } from './profile.entity';
export declare class User {
    id: number;
    userType: UserType;
    nationalId: string;
    fullName: string;
    phone: string;
    password: string;
    profile: UserProfile;
    createdAt: Date;
    updatedAt: Date;
}
