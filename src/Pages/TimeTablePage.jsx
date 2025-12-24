import { useState } from "react";
import WeeklyView from "../components/WeeklyView";
import MonthlyView from "../components/MonthlyView";
import DownloadButton from "../components/DownloadButton";
import WeekView from "../components/WeekView";
const TimetablePage = () => {
  const [academicYear, setAcademicYear] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [section, setSection] = useState("");
  // 🔑 view control
  const [view, setView] = useState("today"); // today | weekly | monthly
  const csBranches = [
    "Computer Science Engineering (CSE)",
    "CSE – Artificial Intelligence",
    "CSE – Data Science",
    "CSE – Machine Learning",
    "CSE – Cyber Security",
    "Information Technology (IT)",
  ];
  const isSelectionDone = academicYear && branch && semester && section;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-semibold m-4 text-center">Timetable</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6 justify-center flex-wrap">
        {/* Academic Year */}
        <select
          value={academicYear}
          onChange={(e) => setAcademicYear(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="" disabled>
            Select Academic Year
          </option>
          <option value="2023-2024">2023-2024</option>
          <option value="2024-2025">2024-2025</option>
          <option value="2025-2026">2025-2026</option>
        </select>
        {/* Branch */}
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="border p-2 rounded"
          disabled={!academicYear}
        >
          <option value="" disabled>
            Select Branch
          </option>

          {csBranches.map((br) => (
            <option key={br} value={br}>
              {br}
            </option>
          ))}
        </select>
        {/* Semester */}
        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="border p-2 rounded"
          disabled={!academicYear}
        >
          <option value="" disabled>
            Select Semester
          </option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <option key={sem} value={sem}>
              Semester {sem}
            </option>
          ))}
        </select>

        {/* Section */}
        <select
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="border p-2 rounded"
          disabled={!semester}
        >
          <option value="" disabled>
            Select Section
          </option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
          <option value="C">Section C</option>
          <option value="D">Section D</option>
        </select>
      </div>

      {!isSelectionDone && (
        <p className="text-center mb-6">
          Please select academic year, semester and section
        </p>
      )}

      {isSelectionDone && (
        <>
          {/* View Toggle (AFTER data loads) */}
          <div className="flex gap-4 mb-6 justify-center">
            <button
              onClick={() => setView("weekly")}
              className={`px-4 py-2 rounded-2xl ${
                view === "weekly" ? "bg-blue-600 text-white" : "border"
              }`}
            >
              Weekly View
            </button>

            <button
              onClick={() => setView("monthly")}
              className={`px-4 py-2 rounded-2xl ${
                view === "monthly" ? "bg-blue-600 text-white" : "border"
              }`}
            >
              Monthly View
            </button>
          </div>

          {/* Timetable Display */}
          {view === "today" && (
            <WeeklyView
              academicYear={academicYear}
              semester={semester}
              section={section}
              mode="today"
            />
          )}

          {view === "weekly" && (
            <WeekView
            academicYear={academicYear}
            branch={branch}
            semester={semester}
            section={section}
          />
          )}

          {view === "monthly" && (
            <MonthlyView
              academicYear={academicYear}
              semester={semester}
              section={section}
            />
          )}

          <DownloadButton />
        </>
      )}
    </div>
  );
};

export default TimetablePage;
