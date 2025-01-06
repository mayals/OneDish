// import logo from "../../assets/oneDishLogo.jpg";



import logo from "../../assets/oneDishLogo.jpg";



const Footer = () => {
  return (
    <footer className="bg-black text-gray-800 py-6 px-4 shadow-lg">
      <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            className="h-16 w-16 rounded-full border-2 border-gray-300 shadow-md"
            alt="OneDish Logo"
          />
          <span className="text-2xl font-bold text-gray-500 hover:text-yellow-500 transition duration-300">OneDish</span>
        </div>

        {/* Social Links */}
        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="text-gray-500 hover:text-yellow-500 transition duration-300"
            aria-label="Contact"
          >
            <i className="fas fa-envelope text-xl"></i>
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-yellow-500 transition duration-300"
            aria-label="Privacy Policy"
          >
            <i className="fas fa-lock text-xl"></i>
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-yellow-500 transition duration-300"
            aria-label="Terms of Use"
          >
            <i className="fas fa-file-alt text-xl"></i>
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-gray-300"></div>

      {/* Bottom Section */}
      <div className="flex flex-col items-center text-center space-y-2 md:flex-row md:justify-between md:space-y-0">
        <div className="text-sm text-gray-600">
          Copyright © 2025. Crafted with{" "}
          <span className="text-red-500 animate-pulse">♥</span> by{" "}
          <a
            href="https://github.com/mayals"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-yellow-500 hover:underline"
          >
            May
          </a>
        </div>

        <ul className="flex items-center space-x-4 text-sm text-gray-600">
          <li>
            <a
              href="#"
              className="hover:text-yellow-500 transition duration-300"
            >
              Contact
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-yellow-500 transition duration-300"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-yellow-500 transition duration-300"
            >
              Terms of Use
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

