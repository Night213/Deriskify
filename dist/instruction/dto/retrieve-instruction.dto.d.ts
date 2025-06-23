import { UUID } from 'node:crypto';
export declare class RetrieveInstructionDto {
    id: UUID;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
