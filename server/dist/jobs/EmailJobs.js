import { Queue, Worker } from "bullmq";
import { defaultQueueOptions, redisConnection } from "../config/queue.js";
import { sendEMail } from "../config/mail.js";
export const emailQueueName = "emaulQueue";
export const emailQueue = new Queue(emailQueueName, {
    connection: redisConnection,
    defaultJobOptions: defaultQueueOptions,
});
export const queueWorker = new Worker(emailQueueName, async (job) => {
    const data = job.data;
    await sendEMail(data.to, data.subject, data.body);
}, {
    connection: redisConnection,
});