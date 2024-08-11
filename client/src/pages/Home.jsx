import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SP from "./block.jpg";
import { Button } from "flowbite-react";

function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleclick = () => {
    navigate("/signin");
  };

  const handlesender = () => {
    navigate("/sender");
  };

  const handlereceiver = () => {
    navigate("/receiver");
  };

  return (
    <>
      {currentUser ? (
<<<<<<< HEAD
        <div
          className="min-h-screen flex items-center justify-center  bg-gray-100 bg-cover bg-center h-screen"
          style={{ backgroundImage: `url(${SP})`, backgroundSize: "cover" }}
        >
          <div className="bg-white bg-opacity-80 shadow-2xl rounded-lg p-8 max-w-md mx-auto">
            <Link
              to=""
              className="dark:text-white text-7xl  mb-12 text-center block"
            >
              <span className="px-2 py-1 rounded-lg shimmer">Dorm Drop</span>
            </Link>
            <div className="flex flex-col items-center justify-center gap-y-6">
              <Button
                gradientDuoTone="purpleToPink"
                className="rounded-md px-3.5 py-2.5 w-48  shadow-lg text-white hover:scale-105 transition-transform  "
                onClick={handlesender}
              >
                Want to Deliver?
              </Button>
              <Button
                gradientDuoTone="purpleToPink"
                className="rounded-md px-3.5 py-2.5 w-48  shadow-lg text-white hover:scale-105 transition-transform"
                onClick={handlereceiver}
              >
                Get Delivery!
              </Button>
=======
        <>
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <Link to="" className="font-bold dark:text-white text-4xl mb-12">
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Dorm
              </span>
              Drop
            </Link>

            <div className="max-w-lg bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100  shadow-lg rounded-lg p-6 text-center">
              <h1 className="text-3xl font-semibold mb-4">
                Welcome to Dorm Drop!
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Experience the convenience of modern delivery services with Dorm
                Drop. Join us today and let us take care of all your delivery
                needs!
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <button
                  href="#"
                  className="rounded-md px-3.5 py-2.5 hover:scale-105 transition-transform bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
                  onClick={handlesender}
                >
                  Want to Deliver?
                </button>
                <button
                  href="#"
                  className="rounded-md px-3.5 py-2.5 hover:scale-105 transition-transform bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
                  onClick={handlereceiver}
                >
                  Get Delivery!
                </button>
              </div>
>>>>>>> 29df0fd7b935199a45dfb4d590d35c11e8a7cd5b
            </div>
          </div>
        </>
      ) : (
<<<<<<< HEAD
        <div
          className="min-h-screen flex items-center justify-center "
          style={{ backgroundImage: `url(${SP})`, backgroundSize: "cover" }}
        >
          <div className="bg-white opacity-80 shadow-lg rounded-lg p-8 max-w-md mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Login to get Access
            </h2>
            <p className="text-lg mb-5 text-gray-600">
              Please log in to access the content and features.
            </p>
            <div className=" shadow-lg bg-white rounded-lg p-6 text-center">
              <h1 className="text-3xl font-semibold mb-4">
                Welcome to Dorm Drop!
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Experience the convenience of modern delivery services with Dorm
                Drop. Join us today and let us take care of all your delivery
                needs!
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <button
                  className="rounded-md px-3.5 py-2.5 w-48 bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-500 shadow-lg text-black hover:scale-105 transition-transform"
                  onClick={handlesender}
                >
                  Want to Deliver?
                </button>
                <button
                  className="rounded-md px-3.5 py-2.5 w-48  bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-500 shadow-lg text-black hover:scale-105 transition-transform"
                  onClick={handlereceiver}
                >
                  Get Delivery!
                </button>
              </div>
=======
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
            Login to get Access
          </h2>
          <p className="text-lg text-center mb-5 text-gray-600">
            Please log in to access the content and features.
          </p>
          <div className="max-w-lg bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100  shadow-lg rounded-lg p-6 text-center">
            <h1 className="text-3xl font-semibold mb-4">
              Welcome to Dorm Drop!
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Experience the convenience of modern delivery services with Dorm
              Drop. Join us today and let us take care of all your delivery
              needs!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                href="#"
                className="rounded-md px-3.5 py-2.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 transition-transform text-white"
                onClick={handlesender}
              >
                Want to Deliver?
              </button>
              <button
                href="#"
                className="rounded-md px-3.5 py-2.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 transition-transform text-white"
                onClick={handlereceiver}
              >
                Get Delivery!
              </button>
>>>>>>> 29df0fd7b935199a45dfb4d590d35c11e8a7cd5b
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
