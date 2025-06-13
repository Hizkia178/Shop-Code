const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white text-sm px-4 py-3 flex justify-center items-center">
            <p className="text-center w-full">
                &copy; {new Date().getFullYear()} HizkiaDev. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
