require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongoDbStore = require("connect-mongo");
const passport = require("passport");
const Emitter = require("events");

// swagger import
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pizza application API",
      version: "1.0.0",
      description: "A simple Express Library API",
    },
    servers: [
      {
        url: "ec2-13-233-27-63.ap-south-1.compute.amazonaws.com",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const spes = swaggerJsDoc(options);

// using app
const app = express();

// Database connection
// const url =
//   "mongodb+srv://admin:sherlocked@cluster0.f3irk.mongodb.net/realtime-pizza?retryWrites=true&w=majority";
const url = process.env.MONGO_CONNECTION_URL;
let clientPromise = mongoose
  .connect(url)
  .then(() => {
    console.log("database connection successful");
  })
  .catch((err) => {
    console.log("database connection failed");
  });

// event emitter
const eventEmitter = new Emitter();
app.set("eventEmitter", eventEmitter);

// session config
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoDbStore.create({
      mongoUrl: process.env.MONGO_CONNECTION_URL,
      dbName: "pizza",
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //24 hours time
  })
);

app.use(flash());

// route to access the api documentation
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(spes));

// passport config
const passportInit = require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

// assets
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// global middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

// set template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

// import routes->web.js
require("./routes/web")(app);

// middleware to handle unknown routes
app.use((req, res) => {
  res.status(404).render("errors/404");
});

const server = app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});

// socket
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  // join client in a private room
  console.log(socket.id);
  socket.on("join", (orderId) => {
    console.log(orderId);
    socket.join(orderId);
  });
});

eventEmitter.on("orderUpdated", (data) => {
  io.to(`order_${data.id}`).emit("orderUpdated", data);
});

eventEmitter.on("orderPlaced", (data) => {
  io.to("adminRoom").emit("orderPlaced", data);
});
