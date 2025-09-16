import { FaUserCircle } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { SignInButton, useUser, UserButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Home = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  const handleAssessmentClick = () => {
    if (isSignedIn) {
      navigate('/assessment');
    } else {
      // This will trigger the Clerk sign-in modal
      document.querySelector('[data-clerk-sign-in]')?.click();
    }
  };

  const features = [
    {
      title: "Connect with Counselor",
      desc: "Book a confidential session with a professional counselor.",
      icon: "👥",
      bg: "bg-white text-gray-700"
    },
    {
      title: "Saathi",
      desc: "Find a peer who understands.",
      icon: "😊",
      bg: "bg-white text-gray-700"
    },
    {
      title: "S.O.S",
      desc: "Immediate help.",
      icon: "🚨",
      bg: "bg-red-500 text-white"
    },
    {
      title: "Story Wall",
      desc: "Connect with others through shared stories.",
      icon: "📜",
      bg: "bg-white text-gray-700"
    },
    {
      title: "Chit-Chat",
      desc: "An AI Chat Bot, just for you.",
      icon: "🤖",
      bg: "bg-white text-gray-700"
    }
  ];

  const adventures = [
    {
      title: "Creative Break",
      desc: "Spend 20 minutes doing something creative – drawing, music, writing, etc.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmCnAp7oXWJlsI0Yb_UTNZPm58oWGI8-dYrU8_2zZ25QVfakkplk1xP6b7UZZftl3mpijU_hxh_hE6HAcLx5Sf44swyIYmNqZGTkVAe9rCUagb8rXucFIMQaEkSVGZuP-tNbsAvrX3nzNXnlvcD33wsqE6a7Tx-2T4HXmZz1fcfXiElQG9R6zJxem8TMKXmU2y_n0pzHBwQL-UEduHSn97sRH3E1Buujj44D8P8Mp2sHrgUxNUKNJ5zpD3-naVQjBcvlt-ttehvwBT",
      stars: 15
    },
    {
      title: "Listen to Music",
      desc: "Play your favorite song and take 5 minutes to just enjoy it.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqyreFvnClttmHButplHEQBYPLpXdpPaDrLiyBkARqMtVDeKKneSmKZi6yyu5WF5C3HLzKVBYeEvH6nVamknBt1BU_dxD75Ac8qp3A318f5hv4e2BfzGOZDURmy5f2ZWEk90o-BQOr5VP97i4dPFsXPM51C5s8FxbLVKfwv-rt3KKV83ACQpT0y2WXEj0svPEtdu-0FYv3Ji-NSbH3hQwZTDYcX4mRvpUi1SBSqZ2mhiKPfB-4O9DS-W22FKgWfWxi23PpCm67b6Dz",
      stars: 10
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F3E6FF] font-sans">
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <div className="flex items-center space-x-2">
          <div className="w-26 h-26 flex items-center justify-center mr-1">
            <img
              src="/logo.png"
              alt="DilTalks Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="font-bold text-xl">DilTalks</h1>
            <p className="text-sm text-gray-500">Your Journey, Our Support</p>
          </div>
        </div>
        <nav className="flex space-x-6 text-gray-600 font-medium">
          <Link to="/faq" className="hover:text-purple-600">FAQ's</Link>
          <Link to="/about" className="hover:text-purple-600">About us</Link>
          <a
            href="https://docs.google.com/forms/d/YOUR_FORM_ID/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-600"
          >
            Feedback
          </a>
          <Link to="/working" className="hover:text-purple-600">Working</Link>
        </nav>
        <div className="flex items-center space-x-4">
          {isSignedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                {user.username || 'Anonymous User'}
              </span>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: 'w-10 h-10',
                    userButtonTrigger: 'focus:shadow-none hover:opacity-75 transition'
                  }
                }}
                afterSignOutUrl="/"
              />
            </div>
          ) : (
            <SignInButton mode="modal">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition"
              >
                Sign in Anonymously
              </motion.button>
            </SignInButton>
          )}
        </div>
      </header>

      <main className="text-center flex-grow py-10 px-4">
        <motion.button
          onClick={handleAssessmentClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 transition"
        >
          Take Assessment
        </motion.button>

        <p className="mt-4 text-gray-600 italic text-sm max-w-xl mx-auto">
          "You, yourself, as much as anybody in the entire universe, deserve your love and affection." – Buddha
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-6 max-w-6xl mx-auto px-4 cursor-pointer">
          {features.map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
              className={`p-4 rounded-lg shadow-md text-center ${card.bg} transition`}
              onClick={() => {
                if (card.title === "Chit-Chat") {
                  navigate('/AIchat');
                }
                if (card.title === "Connect with Counselor") {
                  navigate('/withCounsellor');
                }
                if (card.title === "Saathi") {
                  navigate('/ebuddy');
                }
                if (card.title === "Story Wall") {
                  navigate('/storyWall');
                }
              }}
            >
              <div className="text-4xl mb-2">{card.icon}</div>
              <h3 className="font-semibold">{card.title}</h3>
              <p className="text-sm mt-2">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 px-4 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Adventure Time</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 cursor-pointer">
            {adventures.map((adv, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
                onClick={() => {
                  if (adv.title === "Creative Break") {
                    navigate('/breakPage');
                  }
                  if (adv.title === "Listen to Music") {
                    navigate('/musicPage');
                  }
                }}
              >
                <img src={adv.img} alt={adv.title} className="rounded-md w-full h-40 object-cover mb-4" />
                <h3 className="font-semibold text-lg mb-2">{adv.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{adv.desc}</p>
                <div className="flex items-center text-yellow-500">
                  <AiFillStar />
                  <span className="ml-1">{adv.stars}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mt-16 px-4 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-purple-700">Upcoming Events & Workshops</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Event 1 */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Mindfulness Workshop"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-purple-800">Mindfulness Workshop</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Learn practical mindfulness techniques to improve focus and reduce stress. Suitable for all experience levels.
                </p>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <span>📅 Sept 25, 2025</span>
                  <span>🕒 3:00 PM - 5:00 PM</span>
                </div>
              </div>
            </motion.div>

            {/* Event 2 */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src="https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Creative Writing Session"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-purple-800">Creative Writing Session</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Explore creative writing as a therapeutic outlet for emotions. Engage with prompts and exercises that unlock your inner voice.
                </p>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <span>📅 Oct 3, 2025</span>
                  <span>🕒 5:00 PM - 7:00 PM</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-16 px-4 max-w-6xl mx-auto text-center bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-8 shadow-md hover:shadow-lg transition">
          <h2 className="text-3xl font-bold mb-4 text-purple-700">Support Our Mission</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Help us provide accessible counseling, peer support, and mental wellness resources to everyone. Your contribution can make a real difference.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
            >
              Donate Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-purple-700 px-6 py-3 rounded-lg border border-purple-600 hover:bg-purple-50 transition font-semibold"
            >
              Volunteer
            </motion.button>
          </div>

          <div className="mt-8 flex justify-center space-x-6">
            <img
              src="https://images.unsplash.com/photo-1579208575657-c595a05383b7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Support illustration"
              className="w-24 h-24 rounded-full object-cover shadow-md hover:shadow-lg transition"
            />
            <img
              src="https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=100&q=60"
              alt="Community support"
              className="w-24 h-24 rounded-full object-cover shadow-md hover:shadow-lg transition"
            />
            <img
              src="https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=100&q=60"
              alt="Helping hands"
              className="w-24 h-24 rounded-full object-cover shadow-md hover:shadow-lg transition"
            />
          </div>
        </div>

      </main>
    </div>
  );
};

export default Home;

