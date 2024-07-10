import { TimePeriod } from "graphql/data/util";
import { atomWithStorage } from "jotai/utils";

export const pageTimePeriodAtom = atomWithStorage<TimePeriod>(
  "tokenDetailsTimePeriod",
  TimePeriod.DAY
);
