"use server";
import crypto from "crypto";

const secretKey = process.env.CYPHER_KEY as string;

const generateIV = (): Buffer => {
  return crypto.randomBytes(16);
};

export const encrypt = (data: string): string => {
  const iv = generateIV();
  const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
  let encryptedData = cipher.update(data, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  return encryptedData;
};

// TODO: decrypt function