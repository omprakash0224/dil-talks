import { motion } from 'framer-motion'
import { Heart, Users, MessageCircle, Shield } from 'lucide-react'

const Home = () => {
  const services = [
    {
      icon: Users,
      title: "Connect with Counselor",
      description: "Book a confidential session with a professional counselor.",
      color: "bg-blue-500"
    },
    {
      icon: MessageCircle,
      title: "E-Buddy",
      description: "Find a peer who understands.",
      color: "bg-green-500"
    },
    {
      icon: Shield,
      title: "S.O.S",
      description: "Immediate help.",
      color: "bg-red-500"
    },
    {
      icon: Heart,
      title: "Chit-Chat",
      description: "An AI Chat Bot, just for you.",
      color: "bg-purple-500"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            DilTalks
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Your Journey, Our Support
          </motion.p>
          <motion.button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-lg px-8 py-3 transition-colors duration-200 shadow-md hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Take Assessment
          </motion.button>
          
          <motion.p 
            className="mt-6 text-gray-500 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            "You, yourself, as much as anybody in the entire universe, deserve your love and affection." - Buddha
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div 
                key={service.title}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`${service.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
