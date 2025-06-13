import { useState, useEffect } from "react";

const Main = () => {
    const [now, setNow] = useState(new Date());
    const [isNotif, setIsNotif] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [targetTime, setTargetTime] = useState("22:00"); // Default 10 PM
    const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]); // Today
    const [isActive, setIsActive] = useState(false);

    // Create target datetime
    const createTarget = () => {
        const target = new Date(`${targetDate}T${targetTime}:00`);
        return target;
    };

    const target = createTarget();

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (isActive && !isNotif && now >= target) {
            // Request notification permission
            if (Notification.permission === "granted") {
                new Notification("⏰ Waktu Timer!", {
                    body: "Waktunya tiba broku! 🔔",
                    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='%23ff6b6b' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/></svg>"
                });
            }
            alert("⏰ Waktunya tiba broku! 🔔");
            setIsNotif(true);
        }
    }, [now, target, isNotif, isActive]);

    // Request notification permission
    const requestNotification = () => {
        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        }
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const getTimeRemaining = () => {
        const diff = target - now;
        if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        return { hours, minutes, seconds };
    };

    const timeRemaining = getTimeRemaining();

    const startTimer = () => {
        setIsActive(true);
        setIsNotif(false);
        requestNotification();
    };

    const stopTimer = () => {
        setIsActive(false);
        setIsNotif(false);
    };

    const resetTimer = () => {
        setIsActive(false);
        setIsNotif(false);
        setTargetDate(new Date().toISOString().split('T')[0]);
        setTargetTime("22:00");
    };

    return (
        <div className={`min-h-screen transition-all duration-300 ${
            isDark 
                ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white' 
                : 'bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 text-gray-800'
        }`}>
            {/* Header */}
            <div className="flex justify-between items-center p-6">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <i className='bx bx-time-five text-3xl'></i>
                    Smart Timer
                </h1>
                <button
                    onClick={() => setIsDark(!isDark)}
                    className={`p-3 rounded-full transition-all duration-300 ${
                        isDark 
                            ? 'bg-yellow-500 hover:bg-yellow-400 text-black' 
                            : 'bg-gray-800 hover:bg-gray-700 text-white'
                    }`}
                >
                    <i className={`bx ${isDark ? 'bx-sun' : 'bx-moon'} text-xl`}></i>
                </button>
            </div>

            <div className="flex flex-col justify-center items-center text-center p-4 min-h-[80vh]">
                {/* Current Time Display */}
                <div className={`p-8 rounded-3xl shadow-2xl mb-8 backdrop-blur-lg ${
                    isDark 
                        ? 'bg-white/10 border border-white/20' 
                        : 'bg-white/70 border border-white/40'
                }`}>
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <i className='bx bx-time text-4xl text-blue-500'></i>
                        <h2 className="text-2xl font-bold">Waktu Sekarang</h2>
                    </div>
                    <p className="text-lg mb-2">{formatDate(now)}</p>
                    <p className="text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">{formatTime(now)}</p>
                </div>

                {/* Timer Settings */}
                <div className={`p-6 rounded-2xl shadow-xl mb-6 w-full max-w-md backdrop-blur-lg ${
                    isDark 
                        ? 'bg-white/10 border border-white/20' 
                        : 'bg-white/70 border border-white/40'
                }`}>
                    <div className="flex items-center gap-2 mb-4">
                        <i className='bx bx-cog text-2xl text-green-500'></i>
                        <h3 className="text-xl font-semibold">Atur Timer</h3>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                <i className='bx bx-calendar mr-1'></i>
                                Tanggal Target
                            </label>
                            <input
                                type="date"
                                value={targetDate}
                                onChange={(e) => setTargetDate(e.target.value)}
                                className={`w-full p-3 rounded-lg border transition-all ${
                                    isDark 
                                        ? 'bg-gray-800 border-gray-600 text-white focus:border-blue-400' 
                                        : 'bg-white border-gray-300 text-gray-800 focus:border-blue-500'
                                } focus:ring-2 focus:ring-blue-200`}
                                disabled={isActive}
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                <i className='bx bx-time-five mr-1'></i>
                                Jam Target
                            </label>
                            <input
                                type="time"
                                value={targetTime}
                                onChange={(e) => setTargetTime(e.target.value)}
                                className={`w-full p-3 rounded-lg border transition-all ${
                                    isDark 
                                        ? 'bg-gray-800 border-gray-600 text-white focus:border-blue-400' 
                                        : 'bg-white border-gray-300 text-gray-800 focus:border-blue-500'
                                } focus:ring-2 focus:ring-blue-200`}
                                disabled={isActive}
                            />
                        </div>
                    </div>
                </div>

                {/* Countdown Display */}
                {isActive && (
                    <div className={`p-8 rounded-3xl shadow-2xl mb-6 backdrop-blur-lg ${
                        isDark 
                            ? 'bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30' 
                            : 'bg-gradient-to-r from-purple-100/80 to-pink-100/80 border border-purple-300/50'
                    }`}>
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <i className='bx bx-timer text-3xl text-purple-500'></i>
                            <h3 className="text-xl font-bold">Countdown Timer</h3>
                        </div>
                        
                        <div className="flex justify-center gap-4 text-center">
                            <div className={`p-4 rounded-xl ${isDark ? 'bg-white/10' : 'bg-white/60'}`}>
                                <div className="text-3xl font-mono font-bold text-purple-600">{String(timeRemaining.hours).padStart(2, '0')}</div>
                                <div className="text-sm opacity-75">JAM</div>
                            </div>
                            <div className={`p-4 rounded-xl ${isDark ? 'bg-white/10' : 'bg-white/60'}`}>
                                <div className="text-3xl font-mono font-bold text-purple-600">{String(timeRemaining.minutes).padStart(2, '0')}</div>
                                <div className="text-sm opacity-75">MENIT</div>
                            </div>
                            <div className={`p-4 rounded-xl ${isDark ? 'bg-white/10' : 'bg-white/60'}`}>
                                <div className="text-3xl font-mono font-bold text-purple-600">{String(timeRemaining.seconds).padStart(2, '0')}</div>
                                <div className="text-sm opacity-75">DETIK</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Control Buttons */}
                <div className="flex gap-4 flex-wrap justify-center">
                    {!isActive ? (
                        <button
                            onClick={startTimer}
                            className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                        >
                            <i className='bx bx-play text-xl'></i>
                            Mulai Timer
                        </button>
                    ) : (
                        <button
                            onClick={stopTimer}
                            className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                        >
                            <i className='bx bx-stop text-xl'></i>
                            Stop Timer
                        </button>
                    )}
                    
                    <button
                        onClick={resetTimer}
                        className={`px-8 py-4 font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                            isDark 
                                ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white' 
                                : 'bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white'
                        }`}
                    >
                        <i className='bx bx-reset text-xl'></i>
                        Reset
                    </button>
                </div>

                {/* Status Display */}
                <div className="mt-6 text-center">
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Target: {target.toLocaleString("id-ID")}
                    </p>
                    {isNotif && (
                        <div className="mt-4 p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg animate-pulse">
                            <div className="flex items-center justify-center gap-2">
                                <i className='bx bx-check-circle text-2xl'></i>
                                <p className="font-semibold">⏳ Waktunya telah tiba, bro! 🎉</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Main;