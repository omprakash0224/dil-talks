import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@radix-ui/themes";
import { UserCircle, Loader2 } from "lucide-react";

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

  const handleConnect = (id) => {
    setLoadingId(id);
    setTimeout(() => {
      setLoadingId(null);
      alert("Connected successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#E6E6FA] p-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Connect With a Counsellor
      </h1>

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
                className={`w-full transition-colors duration-200 ${
                  loadingId === counsellor.id ? "bg-indigo-50" : "hover:bg-indigo-50"
                }`}
                onClick={() => handleConnect(counsellor.id)}
                disabled={loadingId === counsellor.id}
              >
                {loadingId === counsellor.id ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="animate-spin h-5 w-5 text-indigo-600" />
                    <span>Connecting...</span>
                  </div>
                ) : (
                  "Connect"
                )}
              </Button>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Counsellor;


