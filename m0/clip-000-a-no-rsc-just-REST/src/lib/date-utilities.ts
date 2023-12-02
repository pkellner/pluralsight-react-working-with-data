export function prismaDateToIsoString(
  incomingPrismaDate: any,
  stripTimezoneOffset = false,
) {
  //console.log("prismaDateToIsoString:incomingPrismaDate", incomingPrismaDate);

  const startTimeLocal = new Date(incomingPrismaDate);
  //console.log("prismaDateToIsoString:startTimeLocal", startTimeLocal);

  let offset = startTimeLocal.getTimezoneOffset() * 60000; // Convert offset to milliseconds
  //console.log("prismaDateToIsoString:offset", offset, "hours", offset / 3600000);

  const adjustedDate = new Date(startTimeLocal.getTime() - offset); // Add the offset
  //console.log("prismaDateToIsoString:adjustedDate", adjustedDate);

  return stripTimezoneOffset
    ? adjustedDate.toISOString().slice(0, 16)
    : adjustedDate.toISOString();
}

export function isoStringDateToPrismaDate(incomingDate: string | Date) {
  //console.log("isoStringDateToPrismaDate:incomingDate", incomingDate);
  return typeof incomingDate === "string"
    ? new Date(incomingDate)
    : incomingDate;
}
