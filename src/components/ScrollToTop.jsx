import { useState, useEffect } from "react";

const ScrollToTop = () => {
    const [showBtn, setshowBtn] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setshowBtn(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth"});
    };


    return (
        showBtn && (
            <button className="fixed bottom-6 right-6 bg-sky-800 dark:bg-gray-900 px-4 text-white py-2 rounded-full shadow-lg hover:bg-sky-700 transition-all" aria-label="Scroll to top" onClick={handleScrollToTop}>
                    ↑
            </button>
        )
    )
};

export default ScrollToTop;