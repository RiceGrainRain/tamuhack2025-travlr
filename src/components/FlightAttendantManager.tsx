import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface Request {
  id: number;
  title: string;
  description: string;
}

const AttendantManager: React.FC = () => {
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

      {requests.length === 0 ? (
        <div className="flex items-center justify-center min-h-[50vh] text-center">
          <div>
            <h2 className="text-2xl font-semibold">All tasks complete</h2>
            <p className="text-4xl">😊</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
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
                    className="text-green-600 hover:text-green-800 focus:outline-none"
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
        </div>
      )}
    </div>
  );
};

export default AttendantManager;
