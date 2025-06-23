export declare class CreateUserDto {
    nationalId: string;
    fullName: string;
    phone: string;
    address: string;
    city: string;
    password: string;
    weight?: number;
    height?: number;
    chronicDiseases?: string[];
    emergencyContacts?: string[];
}
