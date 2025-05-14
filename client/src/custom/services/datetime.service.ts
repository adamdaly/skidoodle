import { DateTime } from "luxon";

export default class DateTimeService {
  static convertToDateTime(date: string | Date | DateTime) {
    if (typeof date === "string") {
      const dateTime = DateTime.fromISO(date);
      if (!DateTime.isDateTime(dateTime)) {
        throw new Error("Invalid date string, ISO format is expected");
      }
      return dateTime;
    } else if (date instanceof Date) {
      return DateTime.fromJSDate(date);
    }

    return date;
  }

  static format_DateTimeFull(date: DateTime | string) {
    return this.convertToDateTime(date)
      .setLocale("en-gb")
      .toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
  }
}
