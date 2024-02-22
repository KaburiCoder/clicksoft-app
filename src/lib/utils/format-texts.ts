import dayjs from "dayjs";

export function formatYmdToShort(ymd: string | undefined | null) {
  if (!ymd) return;
  try {
    return dayjs(ymd, "YYYYMMDD").format("YYYY-MM-DD");
  } catch {
    return;
  }
}

export function extractNumbersFromString(text: string) {
  let numbersArray = text.match(/\d+/g);
  let numbersText = numbersArray ? numbersArray.join("") : "";

  return numbersText;
}
