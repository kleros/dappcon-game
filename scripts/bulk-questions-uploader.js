const fs = require("fs");
const csv = require("csv-parser");
const { createClient } = require("@supabase/supabase-js");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Please provide a SUPABASE_URL & SUPABASE_KEY in the .env file."
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function batchUpload() {
  try {
    const batchSize = 100; // Adjust batch size based on system or database's capabilities
    let chunk = [];
    fs.createReadStream(path.resolve(__dirname, "questions.csv"))
      .pipe(csv())
      .on("data", (data) => {
        chunk.push({
          question: data.question,
          answers: [data.option_1, data.option_2, data.option_3, data.option_4],
        });

        if (chunk.length === batchSize) {
          uploadData(chunk);
          chunk = [];
        }
      })
      .on("end", async () => {
        if (chunk.length > 0) {
          uploadData(chunk); // Upload any remaining rows
        }
        console.log("🔥 All Batch uploaded successfully 🔥");
      });
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function uploadData(records) {
  try {
    const { error } = await supabase.from("questions").insert(records);
    if (error) {
      console.error("Error uploading data:", error.message);
      return;
    }
    console.log("Batch uploaded ✅");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

batchUpload();
