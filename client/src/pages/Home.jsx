import { FaUserCircle } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { SignInButton, useUser, UserButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
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
      title: "E-Buddy",
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
    <div className="min-h-screen bg-[#F3E6FF] font-sans">
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
          <a href="#" className="hover:text-purple-600">FAQ's</a>
          <a href="#" className="hover:text-purple-600">About us</a>
          <a href="#" className="hover:text-purple-600">Feedback</a>
          <a href="#" className="hover:text-purple-600">Working</a>
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

      <main className="text-center py-10 px-4">
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

        <div className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-6 max-w-6xl mx-auto px-4">
          {features.map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
              className={`p-4 rounded-lg shadow-md text-center ${card.bg} transition`}
            >
              <div className="text-4xl mb-2">{card.icon}</div>
              <h3 className="font-semibold">{card.title}</h3>
              <p className="text-sm mt-2">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 px-4 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Adventure Time</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {adventures.map((adv, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
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
      </main>
    </div>
  );
};

export default Home;

