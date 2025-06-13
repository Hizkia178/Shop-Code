const Footer = () => {
    return (
        <footer className="bg-gray-800 flex fixed w-full left-0 text-white z-50 justify-center bottom-0 shadow-lg text-sm items-center px-4 py-5">
            <p className="text-center w-full">
                &copy; {new Date().getFullYear()} HizkiaDev. All right reserved
            </p>
        </footer>
    )
};

export default Footer;