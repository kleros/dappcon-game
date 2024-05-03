const fs = require("fs");
const jwt = require("jsonwebtoken");
const qr = require("qr-image");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const outputDirectory = "qr_codes";

if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory);
}

const SECRET_KEY = process.env.SECRET_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!SECRET_KEY || !BASE_URL) {
  console.error("Please provide a SECRET_KEY & BASE_URL in the .env file.");
  process.exit(1);
}

const amount = process.argv[2] ? parseInt(process.argv[2]) : 1;

for (let i = 1; i <= amount; i++) {
  const user_id = uuidv4();
  const payload = { user_id };
  const token = jwt.sign(payload, SECRET_KEY);
  const qr_png = qr.image(BASE_URL+"/auth?token=" + token, {
    type: "png",
  });
  qr_png.pipe(fs.createWriteStream(`${outputDirectory}/qr_token_${i}.png`));
}

console.log("QR codes generated successfully.");
