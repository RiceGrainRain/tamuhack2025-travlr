import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface Request {
  id: number;
  title: string;
  description: string;
}

const Dashboard: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([
    { id: 1, title: "Request 1", description: "Details for request 1" },
    { id: 2, title: "Request 2", description: "Details for request 2" },
    { id: 3, title: "Request 3", description: "Details for request 3" },
  ]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleComplete = (id: number) => {
    setRequests((prev) => prev.filter((request) => request.id !== id));
  };

  return (
    <div className="min-h-screen bg-white p-8 text-gray-900">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Flight Attendant Dashboard</h1>
      </header>

      <div className="flex space-x-4">
        <div className="flex-1 space-y-4">
          {requests.length === 0 ? (
            <div className="flex items-center justify-center min-h-[50vh] text-center">
              <div>
                <h2 className="text-2xl font-semibold">All tasks complete</h2>
                <p className="text-4xl">😊</p>
              </div>
            </div>
          ) : (
            <AnimatePresence>
              {requests.map((request) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-lg shadow-md border border-gray-200 overflow-hidden w-full"
                >
                  <div
                    className="flex items-center justify-between p-6 bg-gray-100 cursor-pointer"
                    onClick={() => handleExpand(request.id)}
                  >
                    <h2 className="text-xl font-semibold">{request.title}</h2>
                    <button
                      className="text-blue-500 hover:text-blue-600 focus:outline-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleComplete(request.id);
                      }}
                    >
                      <CheckCircle size={28} />
                    </button>
                  </div>
                  {expandedId === request.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 bg-white"
                    >
                      <p className="text-base text-gray-700">{request.description}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        <div
          className="w-1/3 bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 flex flex-col justify-between"
          style={{ minHeight: "80vh" }}
        >
          <h2 className="text-3xl font-bold mb-6">Flight</h2>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold">Attendant Name</h3>
            <p className="text-xl text-gray-700">John Doe</p>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold">Flight Details</h3>
            <p className="text-xl text-gray-700">Flight Number: AB1234</p>
            <p className="text-xl text-gray-700">Boarding Gate: B15</p>
            <p className="text-xl text-gray-700">Departure Time: 10:30 AM</p>
            <p className="text-xl text-gray-700">From: New York (JFK)</p>
            <p className="text-xl text-gray-700">To: Los Angeles (LAX)</p>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold">QR Code</h3>
            <img
              src="https://miro.medium.com/v2/resize:fit:789/1*A9YcoX1YxBUsTg7p-P6GBQ.png"
              alt="QR Code"
              className="w-80 h-80 object-cover"
            />
          </div>

          <div>
            <h3 className="text-2xl font-semibold">Additional Information</h3>
            <p className="text-xl text-gray-700">Have a safe flight!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
