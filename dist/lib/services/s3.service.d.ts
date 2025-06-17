import { ConfigService } from '@nestjs/config';
export declare class S3Service {
    private configService;
    private s3Client;
    private bucketName;
    constructor(configService: ConfigService);
    uploadFile(file: Express.Multer.File, folder?: string): Promise<string>;
    uploadMultipleFiles(files: Express.Multer.File[], folder?: string): Promise<string[]>;
    deleteFile(fileUrl: string): Promise<void>;
    getSignedUploadUrl(fileName: string, contentType: string, folder?: string): Promise<string>;
}
