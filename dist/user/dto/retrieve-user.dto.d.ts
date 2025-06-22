export declare class RetrieveUserDto {
    nationalId: string;
    fullName: string;
    phone: string;
    address: string | null;
    city: string | null;
    birthDate: Date | null;
    weight: number | null;
    height: number | null;
    chronicDiseases: string[];
    emergencyContacts: string[];
}
