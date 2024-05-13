"use server";
import crypto from "crypto";

const RAW_SECRET_KEY = process.env.CIPHER_KEY as string;

const generateIV = (): Buffer => {
  return crypto.randomBytes(16);
};

export const encrypt = (data: string): string => {
  const iv = generateIV();
  const secretKey = Buffer.from(RAW_SECRET_KEY, "hex");
  const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
  let encryptedData = cipher.update(data, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  return `${iv.toString("hex")}:${encryptedData}`;
};

export const decrypt = (encryptedData: string) => {
  const [raw_iv, cipherText] = encryptedData.split(":");
  const iv = Buffer.from(raw_iv, "hex");
  const secretKey = Buffer.from(RAW_SECRET_KEY, "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, iv);
  let decryptedData = decipher.update(cipherText, "hex", "utf-8");
  decryptedData += decipher.final("utf-8");
  return decryptedData;
};
