import { motion } from 'framer-motion';

const AboutUs = () => {
  const teamMembers = [
    {
        name: "Vaibhav",
        role: "Team Lead",
        img: "/team/vaibhav.jpeg"
    },
    {
        name: "Om Prakash",
        role: "Lead Developer",
        img: "/team/om.png"
    },
    {
      name: "Saloni",
      role: "Vice Lead",
      img: "/team/saloni.jpeg"
    },
    {
      name: "Tanya",
      role: "Data Handling & Research",
      img: "/team/tanya.jpeg"
    },
    {
      name: "Udit",
      role: "UI/UX Designer",
      img: "/team/anshul.jpeg"
    },
    {
      name: "Aashu",
      role: "Technical Assests",
      img: "/team/aashu.png"
    }
  ];

  const missionPoints = [
    "Provide accessible mental health support to everyone.",
    "Build a safe space for sharing stories and experiences.",
    "Connect individuals with professional counselors and peers.",
    "Promote creative and fun ways to enhance mental well-being."
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F3E6FF] font-sans">
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="DilTalks Logo" className="w-12 h-12 object-contain" />
          <div>
            <h1 className="font-bold text-xl">DilTalks</h1>
            <p className="text-sm text-gray-500">Your Journey, Our Support</p>
          </div>
        </div>
      </header>

      <main className="flex-grow py-10 px-4 max-w-6xl mx-auto">
        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">About Us</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            At DilTalks, we believe that mental wellness is essential for everyone. 
            Our mission is to provide a safe and supportive environment where individuals 
            can connect, share, and receive professional guidance to improve their emotional well-being.
          </p>
        </section>

        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-purple-700 mb-6 text-center">Our Mission</h3>
          <ul className="list-disc list-inside text-gray-700 max-w-2xl mx-auto space-y-3">
            {missionPoints.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-purple-700 mb-6 text-center">Meet Our Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow-md p-6 text-center"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-md"
                />
                <h4 className="font-semibold text-lg">{member.name}</h4>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-purple-700 mb-4">Join Our Community</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Together, we can create a safe and supportive space for mental wellness. 
            Whether you want to connect with peers, share your story, or receive guidance 
            from professional counselors, DilTalks is here for you.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
          >
            Get Started
          </motion.button>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;
