export function prismaDateToIsoString(
  incomingPrismaDate: any,
  stripTimezoneOffset = false,
) {
  try {
    const startTimeLocal = new Date(incomingPrismaDate);
    let offset = startTimeLocal.getTimezoneOffset() * 60000; // Convert offset to milliseconds
    const adjustedDate = new Date(startTimeLocal.getTime() - offset); // Add the offset

    return stripTimezoneOffset
      ? adjustedDate.toISOString().slice(0, 16)
      : adjustedDate.toISOString();
  } catch (e) {
    console.log("prismaDateToIsoString: Error converting date:", e);
    const errorDate = new Date();
    return stripTimezoneOffset
      ? errorDate.toISOString().slice(0, 16)
      : errorDate.toISOString();
  }
}

export function isoStringDateToPrismaDate(incomingDate: string | Date) {
  try {
    return typeof incomingDate === "string"
      ? new Date(incomingDate)
      : incomingDate;
  } catch (error) {
    console.log("Error converting date:", error);
    return incomingDate;
  }
}
