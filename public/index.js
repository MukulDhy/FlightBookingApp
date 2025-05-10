import fs from "fs";

// Read the file
fs.readFile("./locations.json", "utf8", (err, jsonData) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  try {
    // Parse the JSON data
    const data = JSON.parse(jsonData);

    // Filter out records with any field containing "\N"
    const cleanedData = data.filter((item) => {
      return !Object.values(item).includes("\\N");
    });

    // Save the cleaned data back to the same file
    fs.writeFile("locations.json", JSON.stringify(cleanedData, null, 2), (err) => {
      if (err) {
        console.error("Error writing file:", err);
      } else {
        console.log("File successfully updated with cleaned data!");
      }
    });
  } catch (parseErr) {
    console.error("Error parsing JSON:", parseErr);
  }
});
