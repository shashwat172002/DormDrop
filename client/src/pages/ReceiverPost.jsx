import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';





 const ReceiverPost=()=>{
  const [receiverData,setreceiverData]=useState([]);

  useEffect(()=>{
    const fetchReceiverPost=async()=>{
      try {
        const res=await fetch('/api/receiver/receiverpost');
        const data=await res.json();

        if(res.ok)
        {
          setreceiverData(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchReceiverPost();
  },[setreceiverData])



  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {receiverData.map(receiver => (
      <div key={receiver._id} className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800">{receiver.name}</h3>
        <p className="text-gray-600 mt-2">Registration Number: {receiver.registrationNumber}</p>
        <p className="text-gray-600">Phone Number: {receiver.mobileNumber}</p>
        <p className="text-gray-600">Block: {receiver.block}</p>
        <p className="text-gray-600">Room: {receiver.room}</p>
        <p className="text-gray-600">Wait Time: {receiver.waitTime}</p>
        <Link to="/sender">
        <button className="bg-green-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mt-4 transition duration-300 ease-in-out">
          Confirm to Proceed
        </button>
        </Link>
      </div>
    ))}
  </div>
  )
}


export default ReceiverPost;