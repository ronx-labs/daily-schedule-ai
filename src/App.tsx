import { useState } from "react";
import "./App.css";
import { generateSchedule } from "./services";
import { ScheduleResponse } from "./types";

function App() {
  const [schedule, setSchedule] = useState("");
  const [generatedSchedule, setGeneratedSchedule] =
    useState<ScheduleResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      setError(null);
      const generatedSchedule = await generateSchedule(schedule);
      if (generatedSchedule) {
        setGeneratedSchedule(generatedSchedule);
      }
    } catch (error) {
      console.error("Failed to generate schedule:", error);
      setError("Failed to generate schedule. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setSchedule("");
    setGeneratedSchedule(null);
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-screen-lg mx-auto px-4 py-12 gap-4">
      <div className="flex flex-col w-full gap-4">
        <h1 className="text-3xl font-bold text-center">Daily Schedule AI</h1>
        <textarea
          className="w-full h-48 border-2 border-gray-300 rounded-md p-2"
          placeholder="Enter what you want to do today"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
        />
        <div className="flex gap-2 w-full">
          <button
            className="bg-blue-500 text-white flex-1 p-2 rounded-md cursor-pointer hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleGenerate}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent mx-auto" />
            ) : (
              "Generate"
            )}
          </button>
          <button
            className="bg-red-500 text-white flex-1 p-2 rounded-md cursor-pointer hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
      <div className="w-full border-2 border-gray-300 rounded-md p-4 min-h-96">
        <h2 className="text-xl font-bold mb-4 text-center">
          Generated Schedule
        </h2>
        <div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {generatedSchedule ? (
            <>
              <p className="text-sm sm:text-base">{generatedSchedule.reason}</p>
              <div className="flex flex-col gap-2 mt-4">
                {generatedSchedule.schedule.map((task) => (
                  <div
                    key={task.task}
                    className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-normal gap-2 text-sm sm:text-base"
                  >
                    <p className="italic w-24">- {task.time}</p>
                    <p className="font-bold">{task.task}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">
              No schedule generated yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
