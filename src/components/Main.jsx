import { useState, useEffect } from "react";

const DateDiffCalculator = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [timeDiff, setTimeDiff] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!selectedDate) return;

    const interval = setInterval(() => {
      const now = new Date();
      const target = new Date(selectedDate);
      const diff = target - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeDiff({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      setTimeDiff({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedDate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white  shadow-lg rounded-xl p-6 w-full max-w-md">
        <label className="block mb-2 text-lg font-semibold text-gray-800">Pilih Tanggal:</label>
        <input
          type="date"
          className="border border-gray-300 p-2 rounded w-full"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <div className="mt-4 text-lg text-gray-700">
          {selectedDate ? (
            <p>
              Menuju <b>{selectedDate}</b>:
              <br />
              {timeDiff.days} hari, {timeDiff.hours} jam, {timeDiff.minutes} menit, {timeDiff.seconds} detik
            </p>
          ) : (
            <p>Belum ada tanggal dipilih.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateDiffCalculator;
