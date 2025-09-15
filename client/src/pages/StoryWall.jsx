import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@radix-ui/themes";
import { Plus, X } from "lucide-react";

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
    {
        id: 6,
        title: "Dealing with Burnout",
        content: "Taking small breaks, practicing gratitude, and talking to friends helped me bounce back from burnout.",
        author: "Sanjana Patel",
    },
    {
        id: 7,
        title: "Finding Confidence Again",
        content: "I rebuilt my self-confidence by focusing on my strengths and surrounding myself with supportive people.",
        author: "Vikram Singh",
    },
    {
        id: 8,
        title: "Balancing Work and Life",
        content: "Learning to say no and prioritizing what matters helped me maintain balance without guilt.",
        author: "Kavita Rao",
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
        <div className="min-h-screen bg-[#E6E6FA] p-6 sm:p-10">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Story Wall</h1>

                {/* Add New Story Button */}
                <div className="flex justify-end mb-8">
                    <Button
                        variant="solid"
                        color="indigo"
                        className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white hover:from-indigo-600 hover:to-indigo-800 shadow-lg hover:shadow-2xl transition-all rounded-xl duration-300 transform hover:scale-105 px-6 py-3 font-medium flex items-center"
                        onClick={() => setShowForm(true)}
                    >
                        <Plus className="mr-3 h-6 w-6 animate-pulse" />
                        Add New Story
                    </Button>
                </div>


                {/* Story Cards */}
                <div className="grid gap-6 sm:grid-cols-2">
                    <AnimatePresence>
                        {stories.map((story) => (
                            <motion.div
                                key={story.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                whileHover={{ scale: 1.03 }}
                                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                            >
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">{story.title}</h2>
                                <p className="text-gray-600 mb-4">{story.content}</p>
                                <div className="text-sm text-gray-500 text-right">- {story.author}</div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Modal Form */}
                {showForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="bg-white rounded-xl p-6 w-full max-w-md"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold">Add a New Story</h3>
                                <button onClick={() => setShowForm(false)}>
                                    <X className="h-6 w-6 text-gray-600 hover:text-gray-800" />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    value={newStory.title}
                                    onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                                />
                                <textarea
                                    placeholder="Content"
                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    rows="4"
                                    value={newStory.content}
                                    onChange={(e) => setNewStory({ ...newStory, content: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    value={newStory.author}
                                    onChange={(e) => setNewStory({ ...newStory, author: e.target.value })}
                                />
                                <Button variant="solid" color="indigo" type="submit" className="w-full">
                                    Post Story
                                </Button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StoryWall;

