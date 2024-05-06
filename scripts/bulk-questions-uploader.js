const fs = require("fs");
const csv = require("csv-parser");
const { createClient } = require("@supabase/supabase-js");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Please provide a SUPABASE_URL & SUPABASE_KEY in the .env file.");
    process.exit(1);
  }

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadData() {
  try {
    const results = [];
    fs.createReadStream("questions.csv")
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        const records = results.map((row) => ({
          question: row.question,
          answers: [row.option_1, row.option_2, row.option_3, row.option_4],
        }));

        // Insert records into Supabase
        const { data, error } = await supabase
          .from("questions")
          .insert(records);
        if (error) {
          console.error("Error uploading data:", error.message);
          return;
        }
        console.log("Data uploaded successfully");
      });
  } catch (error) {
    console.error("Error:", error.message);
  }
}

uploadData();
