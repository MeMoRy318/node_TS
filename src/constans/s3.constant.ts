import { configs } from "../configs";

const configuration = {
  region: configs.AWS_S3_REGION,
  credentials: {
    accessKeyId: configs.AWS_S3_ACCESS_KEY,
    secretAccessKey: configs.AWS_S3_SECRET_KEY,
  },
};

export { configuration };
