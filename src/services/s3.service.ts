import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import * as crypto from "crypto";
import { UploadedFile } from "express-fileupload";
import path from "path";

import { configs } from "../configs";
import { configuration } from "../constans";
import { EFileType } from "../enums";

class S3Service {
  private s3Client;
  constructor() {
    this.s3Client = new S3Client(configuration);
  }

  public async uploadFile(
    file: UploadedFile,
    fileType: EFileType,
    fileId: string,
  ): Promise<string> {
    const filePath = this.buildPath(fileType, file.name, fileId);
    await this.s3Client.send(
      new PutObjectCommand({
        ContentType: file.mimetype,
        Body: file.data,
        Bucket: configs.AWS_S3_BUKET,
        ACL: "public-read",
        Key: filePath,
      }),
    );
    return filePath;
  }

  public async deleteFile(fileKey: string): Promise<void> {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: configs.AWS_S3_BUKET,
        Key: fileKey,
      }),
    );
  }

  public buildPath(fileType: string, fileName: string, fileId: string): string {
    return `${fileType}/${fileId}/${crypto.randomUUID()}${path.extname(
      fileName,
    )}`;
  }
}

const s3Service = new S3Service();

export { s3Service };
