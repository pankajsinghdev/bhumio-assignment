import { PrismaClient } from '@prisma/client';
import { Storage } from '@google-cloud/storage';
export * from '@prisma/client';

export const prisma = new PrismaClient();
export const storage = new Storage({
  keyFilename : '/home/pankaj/practice/google-cloud-keys.json'
});

export async function getBucket() {
  const availableBucket = await storage.bucket('bhumio-assignment');
  console.log('availableBucket', availableBucket);
  return availableBucket;
}
