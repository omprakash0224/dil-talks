import { motion } from "framer-motion";
import { Button } from "@radix-ui/themes";
import { Headset, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EBuddy = () => {
  const navigate = useNavigate();

  const handleTalk = () => {
    navigate("/with-counsellor"); // Redirect to your talk page
  };

  const handleRegister = () => {
    window.open("https://forms.gle/your-google-form-link", "_blank"); // Redirect to Google Form
  };

  return (
    <div className="min-h-screen bg-[#E6E6FA] p-4 sm:p-8 flex flex-col items-center justify-center space-y-8">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        E-Buddy
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 w-full max-w-4xl">
        
        {/* Talk to a Volunteer Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          onClick={handleTalk}
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-indigo-100 p-4 rounded-full">
              <Headset size={48} className="text-indigo-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Talk to a Volunteer</h2>
            <p className="text-sm text-gray-600">
              Chat with our friendly volunteers who are ready to listen and support you.
            </p>
            <Button variant="ghost" color="indigo" className="mt-4 w-full hover:bg-indigo-50">
              Start Chat
            </Button>
          </div>
        </motion.div>

        {/* Register as a Volunteer Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          onClick={handleRegister}
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-indigo-100 p-4 rounded-full">
              <UserPlus size={48} className="text-indigo-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Register as a Volunteer</h2>
            <p className="text-sm text-gray-600">
              Join our community and help others by providing guidance and support.
            </p>
            <Button variant="ghost" color="indigo" className="mt-4 w-full hover:bg-indigo-50">
              Register Now
            </Button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default EBuddy;

