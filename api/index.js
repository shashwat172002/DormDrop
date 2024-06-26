import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import senderRoutes from "./routes/sender.route.js";
import receiverRoutes from "./routes/receiver.route.js";
import otpRoutes from "./routes/otp.route.js";
import dashboardRoutes from "./routes/dashboard.route.js";
import yourOrdersRoutes from "./routes/yourOrders.route.js";
import senderendRoutes from "./routes/senderEnd.route.js";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import Receiver from "./models/receiver.model.js";
import Sender from "./models/sender.model.js";
import SenderEnd1 from "./models/senderEnd1.model.js";
import path from 'path';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const __dirname = path.resolve();

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("Verified", (data) => {
    console.log("Received message:", data);
    socket.broadcast.emit("sendMessageToClient2", data.message);
  });

  socket.on("picked", (data) => {
    console.log("Received message:", data);
    socket.broadcast.emit("sendMessageToRec1_5", data.message);
  });

  socket.on("receiverFormSubmitted", (data) => {
    console.log("Received message:", data);
    socket.broadcast.emit("sendMessageToReceiverPost", data.message);
  });

  socket.on("deleteInProcessReceiver", async (registrationNumber) => {
    try {
      const receiver = await Receiver.findOneAndDelete({ registrationNumber });
      if (!receiver) {
        console.log(`Receiver with registration number ${registrationNumber} not found.`);
        return;
      }
      console.log(`Receiver with registration number ${registrationNumber} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting receiver:", error.message);
    }
  });

  socket.on("deleteInProcessSender", async (senderRegistrationNumber) => {
    try {
      const sender = await Sender.findOneAndDelete({ registrationNumber: senderRegistrationNumber });
      if (!sender) {
        console.log(`Sender with registration number ${senderRegistrationNumber} not found.`);
        return;
      }
      console.log(`Sender with registration number ${senderRegistrationNumber} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting sender:", error.message);
    }
  });

  socket.on("deleteSenderend1model", async (senderEndModelId) => {
    try {
      const Senderend1 = await SenderEnd1.findOneAndDelete(senderEndModelId);
      if (!Senderend1) {
        console.log(`Senderend1 with ID ${senderEndModelId} not found.`);
        return;
      }
      console.log(`Senderend1 with ID ${senderEndModelId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting senderEnd1:", error.message);
    }
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/sender", senderRoutes);
app.use("/api/receiver", receiverRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/yourorders", yourOrdersRoutes);
app.use("/api/senderend", senderendRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
