const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs"); // Corrected typo

app.set(express.static(path.join(__dirname, "public"))); // Corrected use of static files
app.use(express.static("public"));

io.on("connection", function (socket){
    console.log("connected");
    socket.on("send-location", function(data){
        io.emit("receive-location",{
            id: socket.id,
            ...data,
        });
    });
    socket.on("dissconnect", function(){
        io.emit("user-dissconnected", socket.id)
    })
});



app.get("/", function (req, res) { // Corrected route path
    res.render("index");
});

server.listen(8000, () => {
    console.log("Server started on http://localhost:8000");
});
