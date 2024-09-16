import { S3Client } from "@aws-sdk/client-s3";

let _r2: S3Client | null = null;

export async function r2(): Promise<S3Client> {
  if (!_r2) {
    if (
      !process.env.R2_ACCOUNT ||
      !process.env.R2_ACCESS_ID ||
      !process.env.R2_ACCESS_KEY
    ) {
      throw new Error(
        "@trpkit/storage: Missing required environment variables R2_ACCOUNT, R2_ACCESS_ID and R2_ACCESS_KEY"
      );
    }

    _r2 = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.R2_ACCOUNT}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_ID,
        secretAccessKey: process.env.R2_ACCESS_KEY,
      },
    });
  }

  return _r2;
}
