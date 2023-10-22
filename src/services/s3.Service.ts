import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { UploadedFile } from "express-fileupload";

import { configs } from "../configs";
import { configuration } from "../constans";
import { EFile } from "../enums";

class S3Service {
  private s3Service;
  constructor() {
    this.s3Service = new S3Client(configuration);
  }

  public async uploadFile(
    file: UploadedFile,
    userId: string,
    fileType: EFile,
  ): Promise<string> {
    const filePath = this.buildPath(userId, file.name, fileType);
    await this.s3Service.send(
      new PutObjectCommand({
        Key: filePath,
        Bucket: configs.AWS_S3_BUKET,
        Body: file.data,
        ContentType: file.mimetype,
        ACL: "public-read",
      }),
    );
    return filePath;
  }

  public buildPath(fileId: string, fileName: string, fileType: EFile): string {
    return `${fileType}/${fileId}/${randomUUID()}/${fileName}`;
  }
}

const s3Service = new S3Service();

export { s3Service };
