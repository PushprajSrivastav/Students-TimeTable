import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
/* ---------- Timetable Data (B.Tech Only) ---------- */
const timetableData = {
  "Week 1": {
    Monday: [
      { time: "9:00 AM - 10:00 AM", subject: "Data Structures" },
      { time: "10:00 AM - 11:00 AM", subject: "Operating Systems" },
      { time: "11:00 AM - 12:00 PM", subject: "DBMS" },
      { time: "12:00 PM - 1:00 PM", subject: "OOPS" },
      { time: "1:00 PM - 2:00 PM", subject: "Lunch Break", isBreak: true },
      { time: "2:00 PM - 3:00 PM", subject: "Computer Networks" },
      { time: "3:00 PM - 4:00 PM", subject: "Web Technologies" },
    ],
    Tuesday: [
      { time: "9:00 AM - 10:00 AM", subject: "Computer Networks" },
      { time: "10:00 AM - 11:00 AM", subject: "Software Engineering" },
      { time: "11:00 AM - 12:00 PM", subject: "Operating Systems" },
      { time: "12:00 PM - 1:00 PM", subject: "DBMS" },
      { time: "1:00 PM - 2:00 PM", subject: "Lunch Break", isBreak: true },
      { time: "2:00 PM - 4:00 PM", subject: "DSA Lab", isLab: true },
    ],
    Wednesday: [
      { time: "9:00 AM - 10:00 AM", subject: "Data Structures" },
      { time: "10:00 AM - 11:00 AM", subject: "Computer Networks" },
      { time: "11:00 AM - 12:00 PM", subject: "Software Engineering" },
      { time: "12:00 PM - 1:00 PM", subject: "Web Technologies" },
      { time: "1:00 PM - 2:00 PM", subject: "Lunch Break", isBreak: true },
      { time: "2:00 PM - 4:00 PM", subject: "DBMS Lab", isLab: true },
    ],
    Thursday: [
      { time: "9:00 AM - 10:00 AM", subject: "Operating Systems" },
      { time: "10:00 AM - 11:00 AM", subject: "Data Structures" },
      { time: "11:00 AM - 12:00 PM", subject: "Computer Networks" },
      { time: "12:00 PM - 1:00 PM", subject: "OOPS" },
      { time: "1:00 PM - 2:00 PM", subject: "Lunch Break", isBreak: true },
      { time: "2:00 PM - 3:00 PM", subject: "Professional Ethics" },
      { time: "3:00 PM - 4:00 PM", subject: "AI Basics" },
    ],
    Friday: [
      { time: "9:00 AM - 10:00 AM", subject: "Software Engineering" },
      { time: "10:00 AM - 11:00 AM", subject: "DBMS" },
      { time: "11:00 AM - 12:00 PM", subject: "Web Technologies" },
      { time: "12:00 PM - 1:00 PM", subject: "Data Structures" },
      { time: "1:00 PM - 2:00 PM", subject: "Lunch Break", isBreak: true },
      { time: "2:00 PM - 4:00 PM", subject: "Computer Networks Lab", isLab: true },
    ],
    Saturday: [
      { time: "9:00 AM - 11:00 AM", subject: "Mini Project", isLab: true },
      { time: "11:00 AM - 12:00 PM", subject: "Technical Seminar" },
      { time: "12:00 PM - 1:00 PM", subject: "Lunch Break", isBreak: true },
      { time: "1:00 PM - 4:00 PM", subject: "Project / Hackathon Practice", isLab: true },
    ],
  },
};

/* 🔁 Copy Week 1 → Week 2–4 (ONLY ONCE) */
["Week 2", "Week 3", "Week 4"].forEach((week) => {
  timetableData[week] = JSON.parse(JSON.stringify(timetableData["Week 1"]));
});

/* ---------- Helpers ---------- */
const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const getDayFromDate = (date) => days[date.getDay()];

const formatDate = (date) =>
  date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

/* ---------- Component ---------- */
const WeeklyView = ({ academicYear, semester, section, mode }) => {
  const [selectedWeek, setSelectedWeek] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const currentDay = mode === "today" ? getDayFromDate(selectedDate) : selectedDay;
  const currentWeek = mode === "today" ? "Week 1" : selectedWeek;

  return (
    <div className="border rounded p-4 mb-6">

      <h2 className="text-xl font-semibold mb-1">
        {mode === "today" ? "Today's Timetable" : "Weekly Timetable"}
      </h2>

      <p className="text-sm mb-4">
        Academic Year {academicYear} | Semester {semester} | Section {section}
      </p>


     {/* Date Navigation */}
{mode === "today" && (
  <div className="flex justify-center items-center gap-6 mb-4">
    <button
      onClick={() =>
        setSelectedDate((prev) => {
          const newDate = new Date(prev);
          newDate.setDate(newDate.getDate() - 1);
          return newDate;
        })
      }
      className="border px-3 py-1 rounded flex justify-center items-center cursor-pointer"
    >
      <ChevronLeft /> Yesterday
    </button>

    <span className="font-semibold">
      {formatDate(selectedDate)}
    </span>

    <button
      onClick={() =>
        setSelectedDate((prev) => {
          const newDate = new Date(prev);
          newDate.setDate(newDate.getDate() + 1);
          return newDate;
        })
      }
      className="border px-3 py-1 flex justify-center items-center rounded cursor-pointer"
    >
      Tomorrow <ChevronRight />
    </button>
  </div>
)}

      {/* Week Selector */}
      {mode === "weekly" && (
        <div className="flex gap-3 mb-4 flex-wrap">
          {weeks.map((week) => (
            <button
              key={week}
              onClick={() => {
                setSelectedWeek(week);
                setSelectedDay("");
              }}
              className={`px-4 py-2 rounded-xl border ${
                selectedWeek === week ? "bg-blue-600 text-white" : ""
              }`}
            >
              {week}
            </button>
          ))}
        </div>
      )}

      {/* Day Selector */}
      {mode === "weekly" && selectedWeek && (
        <div className="flex flex-wrap gap-3 mb-6">
          {days.slice(1).map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-xl border ${
                selectedDay === day ? "bg-blue-600 text-white" : ""
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      )}

      {/* Timetable */}
      {currentDay === "Sunday" ? (
        <p className="text-center">No classes (Sunday)</p>
      ) : (
        timetableData[currentWeek][currentDay]?.length > 0 ? (
          <div className="border rounded">
            {timetableData[currentWeek][currentDay].map((item, index) => (
              <div
                key={index}
                className={`flex justify-between p-3 border-b last:border-b-0 ${
                  item.isBreak ? "font-semibold" : ""
                }`}
              >
                <span>{item.time}</span>
                <span>{item.subject}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No classes scheduled</p>
        )
      )}
    </div>
  );
};

export default WeeklyView;