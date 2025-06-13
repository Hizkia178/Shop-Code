import { useState, useEffect } from "react";
import { navbarData } from "../data/navbar.jsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark")
  );
  const [activeId, setActiveId] = useState(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    const updateActive = () => {
      const hash = window.location.hash || "#home";
      const scrollActive = navbarData.find(({ href }) => {
        const el = document.querySelector(href);
        if (!el) return false;
        const { top, bottom } = el.getBoundingClientRect();
        return top <= 100 && bottom >= 100;
      });
      const active = navbarData.find(i => i.href === hash) || scrollActive;
      setActiveId(active?.id || null);
    };

    updateActive();
    window.addEventListener("hashchange", updateActive);
    window.addEventListener("scroll", updateActive);
    return () => {
      window.removeEventListener("hashchange", updateActive);
      window.removeEventListener("scroll", updateActive);
    };
  }, []);

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 overflow-hidden shadow-lg fixed py-1.5 w-full z-50" data-aos="fade-down">
        <div className="container">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <span className="text-2xl flex items-center font-bold text-gray-800 dark:text-white">
                  <i className="bx bx-code mr-0.5"></i> Shop Cart
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                {navbarData.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-200 ${
                      activeId === item.id
                        ? "bg-gray-800 text-white shadow-lg"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-800 dark:hover:bg-gray-700 hover:text-white hover:shadow-lg"
                    }`}
                  >
                    <i className={`${item.icon} mr-2`}></i>
                    {item.label}
                  </a>
                ))}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  <i className={`bx ${isDarkMode ? "bx-sun" : "bx-moon"} text-xl`}></i>
                </button>
              </div>
              <div className="md:hidden flex items-center">
                <button
                  onClick={toggleMenu}
                  className="inline-flex items-center justify-center text-3xl p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <i className={isOpen ? "bx bx-x" : "bx bx-menu"}></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 ${isOpen ? "block" : "hidden"}`}
        onClick={toggleMenu}
      ></div>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b-2 border-gray-200 dark:border-gray-700">
          <span className="font-semibold text-gray-800 dark:text-white">
            <i className="bx bx-code mr-1"></i>Shop Code
          </span>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <i className="bx bx-x text-xl text-gray-600 dark:text-gray-400"></i>
          </button>
        </div>

        <div className="p-4">
          {navbarData.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={toggleMenu}
              className={`flex items-center px-3 py-3 mb-2 rounded-md transition-colors duration-200 ${
                activeId === item.id
                  ? "bg-gray-800 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-800 dark:hover:bg-gray-700 hover:text-white"
              }`}
            >
              <i className={`${item.icon} mr-3`}></i>
              {item.label}
            </a>
          ))}
          <button
            onClick={toggleDarkMode}
            className="flex items-center px-3 py-3 mb-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-800 dark:hover:bg-gray-700 hover:text-white transition-colors duration-200 w-full"
          >
            <i className={`bx ${isDarkMode ? "bx-sun" : "bx-moon"} mr-3`}></i>
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;