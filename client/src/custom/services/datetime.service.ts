import { DateTime } from "luxon";

export default class DateTimeService {
  static format_DateTimeFull(date: DateTime | string) {
    return date instanceof DateTime
      ? date.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)
      : DateTime.fromISO(date).toLocaleString(
          DateTime.DATETIME_MED_WITH_WEEKDAY
        );
  }
}
