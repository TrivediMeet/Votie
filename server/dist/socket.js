// import {Server} from "socket.io";
// import { votingQueueName } from "./jobs/VotingJob.js";
import { votingQueue, votingQueueName } from "./jobs/VotingJob.js";
import { commentQueue, commentQueueName } from "./jobs/CommentJob.js";
// import { commentQueue, commentQueueName } from "./jobs/CommentQueue.js";
export function setupSocket(io) {
    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);
        socket.on("disconnect", () => {
            console.log("A user disconnected:", socket.id);
        });
        // * Listen every emit
        socket.onAny(async (eventName, data) => {
            if (eventName.startsWith("clashing-")) {
                await votingQueue.add(votingQueueName, data);
                socket.broadcast.emit(`clashing-${data?.clashId}`, data);
            }
            else if (eventName.startsWith("clashing_comment")) {
                await commentQueue.add(commentQueueName, data);
                socket.broadcast.emit(`clashing_comment-${data?.id}`, data);
                console.log("The data is", data);
            }
        });
    });
}
