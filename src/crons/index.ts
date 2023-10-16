import { removeOldTokensCron } from "./remove-old-tokens.cron";
import { removeOldUsersCron } from "./remove-old-users.cron";
import { sendNotificationToOldVisitorsCron } from "./send-notification-to-old-visitors.cron";

const cronRunner = () => {
  sendNotificationToOldVisitorsCron.start();
  removeOldTokensCron.start();
  removeOldUsersCron.start();
};

export { cronRunner };
