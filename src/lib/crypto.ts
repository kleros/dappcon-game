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
  return `${iv.toString("hex")}:${encryptedData}`;
};

export const decrypt = (encryptedData: string) => {
  const components = encryptedData.split(":");
  const iv = Buffer.from(components[0], "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, iv);
  let decryptedData = decipher.update(components[1], "hex", "utf8");
  decryptedData += decipher.final("utf8");
  return decryptedData;
};