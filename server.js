const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const express = require("express");
const formatMessages = require("./utils/messages");
const {userJoin,getCurrentUser,userLeave,getRoomUsers} = require("./utils/users");
const coctracker = require("./utils/coctracker");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const botName = "Chat Room Bot";
// Set static folder

// -------------------------------Set static folder -------------------------------
app.use(express.static(path.join(__dirname, "public")));

// ---------------------------------------------------------------------------SOCKET IO ----------------------------------------------------------------
// Run when client connects
io.on("connection", (socket) => {
  // Joint Room
  socket.on("joinRoom", userdetail => {
    const user = userJoin(socket.id,userdetail.username,userdetail.room);
    socket.join(user.room);
    socket.emit("roomJoin-message", formatMessages(userdetail.username, ` Hey ${userdetail.username} Welcome to Chat Room 🥳`)); // Only to client
    // Broadcast when a user connects
    socket.broadcast.to(user.room).emit("joinRoommessageothers",formatMessages(userdetail.username, `Folks ${userdetail.username} has Joined Chat Room 🚀`)
    ); // Except client

    io.to(user.room).emit('roomUsers', {
      room:user.room,
      users: getRoomUsers(user.room)
    });
  });



  // Run when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    if (user) {
    io.to(user.room).emit("roomleftmessage", formatMessages(user.username, `${user.username} has left the Chat Room 😢`));
    io.to(user.room).emit('roomUsers', {
      room:user.room,
      users: getRoomUsers(user.room)
    });
  }
});  

  // Listen to chatmessage
  socket.on("chatmessage", (msg) => {
    const user = getCurrentUser(socket.id);
    msg = coctracker(msg);
    io.emit("message", formatMessages(user.username,msg));
  });
});


// --------------------------------------------------------------------------------- SERVER-----------------------------------------------------------------
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
