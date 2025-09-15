import { motion } from "framer-motion";
import { Button } from "@radix-ui/themes";
import { Coffee, Music, Book, Smile } from "lucide-react";

const tips = [
  { id: 1, icon: <Coffee className="h-6 w-6 text-indigo-600" />, text: "Grab a cup of coffee or tea." },
  { id: 2, icon: <Music className="h-6 w-6 text-indigo-600" />, text: "Listen to your favorite music." },
  { id: 3, icon: <Book className="h-6 w-6 text-indigo-600" />, text: "Read something inspiring." },
  { id: 4, icon: <Smile className="h-6 w-6 text-indigo-600" />, text: "Take a few deep breaths and smile." },
];

const BreakPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50 to-indigo-100 flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl"
      >
        <h1 className="text-4xl font-bold text-indigo-800 mb-4">Take a Break</h1>
        <p className="text-indigo-600 mb-8">
          It's important to pause and recharge. Even a few minutes can refresh your mind and boost creativity.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 mb-8">
          {tips.map((tip) => (
            <motion.div
              key={tip.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center space-x-3"
            >
              {tip.icon}
              <span className="text-indigo-700">{tip.text}</span>
            </motion.div>
          ))}
        </div>

        <Button
          variant="solid"
          color="indigo"
          className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white hover:from-indigo-600 hover:to-indigo-800 shadow-lg hover:shadow-xl transition-all rounded-xl px-8 py-3 transform hover:scale-105 duration-300"
          onClick={() => window.location.reload()}
        >
          I'm Ready
        </Button>
      </motion.div>
    </div>
  );
};

export default BreakPage;

