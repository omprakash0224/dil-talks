import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@radix-ui/themes";
import { Play, Music } from "lucide-react";

const dummyMusic = [
  { id: 1, title: "Chill Vibes", artist: "DJ Aurora", duration: "3:45" },
  { id: 2, title: "Morning Motivation", artist: "Sunny Beats", duration: "4:12" },
  { id: 3, title: "Relax & Focus", artist: "Calm Waves", duration: "5:03" },
  { id: 4, title: "Evening Jazz", artist: "Jazz Masters", duration: "6:21" },
  { id: 5, title: "Upbeat Energy", artist: "Electro Pop", duration: "3:58" },
  { id: 6, title: "Classical Serenity", artist: "Beethoven Collection", duration: "7:10" },
];

const MusicPage = () => {
  const [playingId, setPlayingId] = useState(null);

  const handlePlay = (id) => {
    setPlayingId(id);
    setTimeout(() => setPlayingId(null), 2000); // simulate playing
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100 p-6 sm:p-10">
      <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">
        Listen to Music
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dummyMusic.map((song) => (
          <motion.div
            key={song.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center cursor-pointer"
          >
            <div className="bg-purple-100 p-4 rounded-full mb-4">
              <Music size={36} className="text-indigo-600" />
            </div>
            <h2 className="text-lg font-semibold text-indigo-900">{song.title}</h2>
            <p className="text-sm text-indigo-700 mb-2">{song.artist}</p>
            <p className="text-sm text-indigo-500 mb-4">{song.duration}</p>

            <Button
              variant="solid"
              color="indigo"
              className="flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => handlePlay(song.id)}
            >
              <Play className="mr-2 h-5 w-5" />
              {playingId === song.id ? "Playing..." : "Play"}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MusicPage;
