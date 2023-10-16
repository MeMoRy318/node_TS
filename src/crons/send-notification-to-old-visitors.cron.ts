import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { userRepository } from "../repositories";

dayjs.extend(utc);

const sendEmail = async (): Promise<void> => {
  const previousTime = dayjs().utc().subtract(1, "day");
  const users = await userRepository.findWithoutActivityAfterDate(previousTime);
  console.log(users);
};

const sendNotificationToOldVisitorsCron = new CronJob(
  "* * * * * *",
  sendEmail,
  null,
  false,
  "Europe/Kiev",
);

export { sendNotificationToOldVisitorsCron };
