import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { userRepository } from "../repositories";

dayjs.extend(utc);

const removeOldUsers = async () => {
  const previousMonth = dayjs().utc().subtract(1, "day");
  await userRepository.deleteManyByParams({
    createdAt: { $lte: previousMonth },
  });
};

const removeOldUsersCron = new CronJob(
  "0 59 23 * * *",
  removeOldUsers,
  null,
  false,
  "Europe/Kiev",
);

export { removeOldUsersCron };
