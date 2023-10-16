import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { actionTokenRepository, tokenRepository } from "../repositories";

dayjs.extend(utc);

const removeToken = async (): Promise<void> => {
  const previousMonth = dayjs().utc().subtract(1, "d");
  await Promise.all([
    tokenRepository.deleteManyByParams({
      createdAt: { $lte: previousMonth },
    }),
    actionTokenRepository.deleteManyByParams({
      createdAt: { $lte: previousMonth },
    }),
  ]);
};

const removeOldTokensCron = new CronJob(
  "0 59 23 * * *",
  removeToken,
  null,
  false,
  "Europe/Kiev",
);

export { removeOldTokensCron };
