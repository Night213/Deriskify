import { UUID } from 'node:crypto';
declare class EmergencyUnitDto {
    id: UUID;
    name: string;
}
export declare class RetrieveInstructionDto {
    id: UUID;
    title: string;
    description: string;
    emergencyUnit: EmergencyUnitDto;
    createdAt: Date;
    updatedAt: Date;
}
export {};
