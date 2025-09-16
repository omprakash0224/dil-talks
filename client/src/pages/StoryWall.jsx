import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@radix-ui/themes";
import { Plus, X, Edit3 } from "lucide-react";

const initialStories = [
    {
        id: 1,
        title: "How I Overcame Anxiety",
        content: "It was a tough journey, but mindfulness and breathing exercises really helped me stay calm.",
        author: "Priya Sharma",
    },
    {
        id: 2,
        title: "Work From Home Tips",
        content: "Staying productive while working from home can be hard. I found routines and breaks essential.",
        author: "Arjun Mehta",
    },
    {
        id: 3,
        title: "Fitness Motivation",
        content: "Setting small achievable goals and tracking them daily helped me stay motivated on my fitness journey.",
        author: "Neha Kapoor",
    },
    {
        id: 4,
        title: "Managing Screen Time",
        content: "Limiting social media and setting digital detox hours gave me clarity and peace of mind.",
        author: "Rahul Verma",
    },
    {
        id: 5,
        title: "Healthy Eating on a Budget",
        content: "Preparing meals at home with seasonal vegetables saved money and improved my nutrition.",
        author: "Meera Joshi",
    },
];

const StoryWall = () => {
    const [stories, setStories] = useState(initialStories);
    const [showForm, setShowForm] = useState(false);
    const [newStory, setNewStory] = useState({ title: "", content: "", author: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newStory.title || !newStory.content || !newStory.author) return;
        const story = { ...newStory, id: Date.now() };
        setStories([story, ...stories]);
        setNewStory({ title: "", content: "", author: "" });
        setShowForm(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6 sm:p-10">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-10 text-indigo-800 tracking-wide">
                    Story Wall
                </h1>

                {/* Add New Story Button */}
                <div className="flex justify-end mb-8">
                    <Button
                        variant="solid"
                        color="indigo"
                        className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white hover:from-indigo-600 hover:to-indigo-800 shadow-lg hover:shadow-2xl transition-all rounded-xl duration-300 transform hover:scale-105 px-6 py-3 font-medium flex items-center gap-3"
                        onClick={() => setShowForm(true)}
                    >
                        <Plus className="h-6 w-6 animate-pulse" />
                        Add New Story
                    </Button>
                </div>

                {/* Story Cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence>
                        {stories.map((story) => (
                            <motion.div
                                key={story.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-200"
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <h2 className="text-lg font-semibold text-indigo-900">{story.title}</h2>
                                    <Edit3 className="h-5 w-5 text-indigo-500 hover:text-indigo-700 transition-colors" />
                                </div>
                                <p className="text-gray-600 mb-4">{story.content}</p>
                                <div className="text-sm text-gray-500 text-right">- {story.author}</div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Modal Form */}
                <AnimatePresence>
                    {showForm && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-2xl font-semibold text-indigo-900">Add a New Story</h3>
                                    <button onClick={() => setShowForm(false)}>
                                        <X className="h-6 w-6 text-gray-600 hover:text-indigo-600 transition-colors" />
                                    </button>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                                            value={newStory.title}
                                            onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <textarea
                                            placeholder="Content"
                                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                                            rows="4"
                                            value={newStory.content}
                                            onChange={(e) => setNewStory({ ...newStory, content: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                                            value={newStory.author}
                                            onChange={(e) => setNewStory({ ...newStory, author: e.target.value })}
                                        />
                                    </div>
                                    <Button
                                        variant="solid"
                                        color="indigo"
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white rounded-xl font-semibold transition-all duration-300"
                                    >
                                        Post Story
                                    </Button>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default StoryWall;


