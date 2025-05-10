import csv
import json

# Input data file in the provided format
input_file = "airports.dat"
output_file = "us_airports.json"

# Define the column names based on the data structure
columns = [
    "id", "airportName", "city", "country", "IATA", "ICAO", "latitude", "longitude",
    "altitude", "timezone", "DST", "tzDatabase", "type", "source"
]

# Filter criteria
allowed_countries = {"United States", "America", "USA"}

# Read the data and filter for US/America airports
us_airports = []
with open(input_file, "r", encoding="utf-8") as file:
    reader = csv.reader(file)
    for row in reader:
        airport = {columns[i]: row[i] for i in range(len(columns))}
        if airport["country"] in allowed_countries:
            us_airports.append(airport)

# Save the filtered data to a JSON file
with open(output_file, "w", encoding="utf-8") as json_file:
    json.dump(us_airports, json_file, indent=4)

print(f"Filtered data has been saved to {output_file}")
