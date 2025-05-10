export const extractTime = (isoString) => {
    if (!isoString) return "";
    try {
        const date = new Date(isoString);
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // Set to true if you want 12-hour format
        });
    } catch (error) {
        console.error("Invalid date format", error);
        return "Invalid date";
    }
};
