import { PrismaClient } from '@prisma/client';
import { Storage } from '@google-cloud/storage';
export * from '@prisma/client';

export const prisma = new PrismaClient();

export const storage = new Storage({
  keyFilename:
    process.env.NODE_ENV === 'production'
      ? '/app/google-cloud-keys.json'
      : '/home/pankaj/practice/google-cloud-keys.json',
  projectId: process.env.GOOGLE_CLOUD_PROJECT,
});

export async function getBucket() {
  const bucketName = process.env.GOOGLE_CLOUD_BUCKET || 'bhumio-assignment';
  const availableBucket = await storage.bucket(bucketName);
  return availableBucket;
}
