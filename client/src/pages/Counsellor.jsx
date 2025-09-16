import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@radix-ui/themes";
import { UserCircle, Loader2, Calendar, X } from "lucide-react";

const Counsellor = () => {
  const [counsellors] = useState([
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialization: "Anxiety & Stress Management",
      experience: "5 years",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Dr. Arjun Mehta",
      specialization: "Depression & Mood Disorders",
      experience: "7 years",
      rating: 4.6,
    },
    {
      id: 3,
      name: "Dr. Neha Kapoor",
      specialization: "Relationship & Family Therapy",
      experience: "4 years",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Dr. Rahul Verma",
      specialization: "Career Counselling",
      experience: "6 years",
      rating: 4.5,
    },
    {
      id: 5,
      name: "Dr. Meera Joshi",
      specialization: "Self-Esteem & Confidence Building",
      experience: "3 years",
      rating: 4.7,
    },
  ]);

  const [loadingId, setLoadingId] = useState(null);
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpenBooking = (counsellor) => {
    setSelectedCounsellor(counsellor);
    setIsBookingOpen(true);
  };

  const handleConfirmBooking = () => {
    setIsBookingOpen(false);
    setMessage("Session request sent!");
    setTimeout(() => setMessage(""), 3000); // hide message after 3 sec
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] p-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Book a Session with a Counsellor
      </h1>

      {message && (
        <div className="max-w-md mx-auto mb-4 p-4 bg-green-100 text-green-700 rounded shadow-md text-center">
          {message}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {counsellors.map((counsellor) => (
          <motion.div
            key={counsellor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <UserCircle size={40} className="text-indigo-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {counsellor.name}
                </h2>
                <p className="text-sm text-gray-600">{counsellor.specialization}</p>
              </div>
            </div>

            <div className="text-sm text-gray-600 mb-4 space-y-1">
              <p>Experience: {counsellor.experience}</p>
              <p>Rating: {counsellor.rating} ⭐</p>
            </div>

            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                color="indigo"
                className="w-full px-4 py-2 text-white bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg font-semibold"
                onClick={() => handleOpenBooking(counsellor)}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Calendar size={16} />
                  <span>Book Session</span>
                </div>
              </Button>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Booking Popup */}
      {isBookingOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-80 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setIsBookingOpen(false)}
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Book Session
            </h2>
            <p className="text-center mb-4 text-gray-600">
              {selectedCounsellor?.name}
            </p>

            {/* Dummy Calendar Interface */}
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">
                Select Date
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">
                Select Time
              </label>
              <input
                type="time"
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>

            <Button
              variant="solid"
              color="indigo"
              className="w-full"
              onClick={handleConfirmBooking}
            >
              Confirm Booking
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Counsellor;




