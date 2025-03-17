import { DateTime } from "luxon";

export const isDate = (value) => {
  if (!value) {
    return false;
  }

  const date = DateTime.fromISO(value);

  if (date.isValid) {
    return true;
  } else {
    return false;
  }
};
