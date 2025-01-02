export function setupSocket(io) {
    io.on("connection", (socket) => {
        console.log("a new client connected", socket.id);
        socket.on('disconnect', () => {
            console.log('a client disconnected');
        });
    });
    //*Listen
}
