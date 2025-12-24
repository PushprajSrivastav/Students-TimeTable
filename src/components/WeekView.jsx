import { useState } from "react";

/* ---------- B.Tech (CSE) Weekly Timetable ---------- */
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

/* Copy Week 1 → Week 2, 3, 4 */
["Week 2", "Week 3", "Week 4"].forEach((week) => {
  timetableData[week] = JSON.parse(
    JSON.stringify(timetableData["Week 1"])
  );
});

/* ---------- Constants ---------- */
const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/* ---------- Component ---------- */
const WeeklyView = ({ academicYear, semester, section }) => {
  const [week, setWeek] = useState("");
  const [day, setDay] = useState("");

  return (
    <div className="border rounded p-4 mb-6">
      <h2 className="text-xl font-semibold mb-1">Weekly Timetable</h2>

      <p className="text-sm mb-4">
        Academic Year {academicYear} | Semester {semester} | Section {section}
      </p>

      {/* Week & Day Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

        {/* Week */}
        <select
          value={week}
          onChange={(e) => {
            setWeek(e.target.value);
            setDay("");
          }}
          className="border p-2 rounded"
        >
          <option value="">Select Week</option>
          {weeks.map((w) => (
            <option key={w} value={w}>{w}</option>
          ))}
        </select>

        {/* Day */}
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          disabled={!week}
          className="border p-2 rounded"
        >
          <option value="">Select Day</option>
          {days.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Timetable */}
      {week && day && (
        timetableData[week][day]?.length > 0 ? (
          <div className="border rounded">
            {timetableData[week][day].map((item, index) => (
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
          <p className="text-center text-gray-500">
            No classes scheduled
          </p>
        )
      )}
    </div>
  );
};

export default WeeklyView;