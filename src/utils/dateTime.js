const KARACHI_TIME_ZONE = "Asia/Karachi";

const normalizeDate = (value) => {
  if (!value) return null;

  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const formatKarachiDateTime = (value) => {
  const date = normalizeDate(value);
  if (!date) return "N/A";

  return new Intl.DateTimeFormat("en-PK", {
    dateStyle: "medium",
    timeStyle: "medium",
    hour12: true,
    timeZone: KARACHI_TIME_ZONE,
  }).format(date);
};

export const formatKarachiDateTimeParts = (value) => {
  const date = normalizeDate(value);
  if (!date) {
    return { date: "N/A", time: "" };
  }

  const parts = new Intl.DateTimeFormat("en-PK", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: KARACHI_TIME_ZONE,
  }).formatToParts(date);

  const readPart = (type) => parts.find((part) => part.type === type)?.value || "";

  return {
    date: `${readPart("year")}-${readPart("month")}-${readPart("day")}`,
    time: `${readPart("hour")}:${readPart("minute")}:${readPart("second")} ${readPart("dayPeriod")}`.trim(),
  };
};
