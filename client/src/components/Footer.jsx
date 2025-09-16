import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-purple-800 text-white py-10 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* About Section */}
                <div>
                    <h3 className="text-xl font-bold mb-4">DilTalks</h3>
                    <p className="text-gray-300 text-sm">
                        Empowering you on your mental wellness journey. Find support, connect with others, and discover tools for better living.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li><a href="#" className="hover:text-white transition">FAQ’s</a></li>
                        <li><a href="#" className="hover:text-white transition">About Us</a></li>
                        <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-white transition">Contact</a></li>
                    </ul>
                </div>

                {/* Connect Section */}
                <div>
                    <h3 className="text-xl font-bold mb-4">Connect with us</h3>
                    <div className="flex space-x-4 mb-4">
                        <motion.a whileHover={{ scale: 1.1 }} href="#" className="p-2 bg-purple-600 rounded-full hover:bg-purple-700 transition">
                            <FaFacebookF />
                        </motion.a>
                        <motion.a whileHover={{ scale: 1.1 }} href="#" className="p-2 bg-purple-600 rounded-full hover:bg-purple-700 transition">
                            <FaTwitter />
                        </motion.a>
                        <motion.a whileHover={{ scale: 1.1 }} href="#" className="p-2 bg-purple-600 rounded-full hover:bg-purple-700 transition">
                            <FaInstagram />
                        </motion.a>
                        <motion.a whileHover={{ scale: 1.1 }} href="#" className="p-2 bg-purple-600 rounded-full hover:bg-purple-700 transition">
                            <FaLinkedinIn />
                        </motion.a>
                    </div>
                    <p className="text-gray-300 text-sm">support@diltalks.com</p>
                    <p className="text-gray-300 text-sm">+91 98765 43210</p>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-purple-700 mt-8 pt-4 text-center text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} DilTalks. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
