import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import io from "socket.io-client";
import AnimatedHourglass from "../components/AnimatedHourglass";

const AfterPickingTimer = () => {
  const navigate = useNavigate();
  const { currentReceiver } = useSelector((state) => state.RECEIVER);
  const { currentOtp } = useSelector((state) => state.OTP);
  var time = 10;

  const [countdown, setCountdown] = useState(time);
  const [alreadyReached, setalreadyReached] = useState(false);

  const [otpData, setotpData] = useState();

  useEffect(() => {
    const storedCountdown = localStorage.getItem("countdown");
    const endTime = localStorage.getItem("endTime");

    if (time && storedCountdown && endTime) {
      const now = new Date().getTime();
      const remainingTime = endTime - now;
      if (remainingTime > 0) {
        setCountdown(Math.floor(remainingTime / 1000)); // Convert milliseconds to seconds
      } else {
        localStorage.removeItem("countdown");
        localStorage.removeItem("endTime");
      }
    } else if (time) {
      const endTime = new Date().getTime() + time * 60 * 1000; // Convert waitTime to milliseconds
      localStorage.setItem("endTime", endTime);
      setCountdown(time * 60); // Convert waitTime to seconds
    }
  }, [time]);

  useEffect(() => {
    if (countdown > 0) {
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          const newCountdown = Math.max(prevCountdown - 1, 0); // Ensure countdown never goes below 0
          localStorage.setItem("countdown", newCountdown);
          return newCountdown;
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    } else if (countdown === 0) {
      localStorage.removeItem("countdown");
      localStorage.removeItem("endTime");

      // navigate('/sendercountdown');
    }
  }, [countdown]);

  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 60000); // 60000 milliseconds = 1 minute

    return () => clearInterval(interval);
  }, []);

  // Convert total seconds into minutes and seconds
  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  const AlreadyReachedClicked = () => {
    setalreadyReached(true);
  };

  const handleChange = (e) => {
    setotpData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otpData) {
      console.log("enter otp");
    }
    if (otpData == currentOtp) {
      const socket = io.connect("http://localhost:3000"); //https://dormdrop.onrender.com
      socket.on("connect", () => {
        console.log("Connected to server");
        socket.emit("Verified", { message: "yes" });
      });
      toast.success("OTP verified SUCCESSFULLY");
      navigate("/successfullydelivered");
    } else {
      toast.error("invalid OTP");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${SP})` }}>
      {alreadyReached === true || countdown === 0 ? (
        <div className="flex items-center justify-center h-screen">
          <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Verify OTP</h2>
            <input
              type="text"
              placeholder="Enter OTP"
              className=" rounded-lg px-4 py-2 mb-4 w-full"
              onChange={handleChange}
            />
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 transition-transform text-white font-bold py-2 px-4 rounded w-full"
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center px-6 mb-8 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
    {/* Left side */}
    <div className="w-full my-4 sm:pt-12 sm:max-w-xl bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 shadow-md rounded-lg overflow-hidden">
      <h1 className="text-xl font-bold text-center mb-4">Time in which you have to deliver. </h1>
      <p className="text-center">Already reached? click on the button</p>
      
      <div className="flex items-center justify-center text-6xl sm:text-8xl font-bold">
        <div>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>
        <AnimatedHourglass />
      </div>
    </div>
    <div className="w-full my-4 sm:max-w-xl bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 shadow-md rounded-lg overflow-hidden">
      <div className="p-4 flex flex-col h-full">
        <h2 className="text-xl font-bold mb-2">Receiver Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
          <div className="flex flex-col">
            <p className="text-gray-700 font-semibold">Name:</p>
            <p className="text-gray-600">{currentReceiver.name}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-700 font-semibold">Registration Number:</p>
            <p className="text-gray-600">{currentReceiver.registrationNumber}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-700 font-semibold">Email:</p>
            <p className="text-gray-600">{currentReceiver.email}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-700 font-semibold">Mobile Number:</p>
            <p className="text-gray-600">{currentReceiver.mobileNumber}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-700 font-semibold">Block:</p>
            <p className="text-gray-600">{currentReceiver.block}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-700 font-semibold">Room:</p>
            <p className="text-gray-600">{currentReceiver.room}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-700 font-semibold">Wait Time:</p>
            <p className="text-gray-600">{currentReceiver.waitTime}</p>
          </div>
        </div>
      </div>
    </div>
          </div>
          <div className="flex justify-center mt-1 my-10">
            <button
              onClick={AlreadyReachedClicked}
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 transition-transform text-white font-bold py-2 px-4 rounded mt-4"
            >
              Already reached?
            </button>
          </div>
          </div>
        </>
      )}
    </div>
    
  );
};

export default AfterPickingTimer;
