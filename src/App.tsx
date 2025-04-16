import { useState } from "react";
import "./App.css";
import { generateSchedule } from "./services";
import { ScheduleResponse } from "./types";

function App() {
  const [schedule, setSchedule] = useState("");
  const [generatedSchedule, setGeneratedSchedule] =
    useState<ScheduleResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    const generatedSchedule = await generateSchedule(schedule);
    if (generatedSchedule) {
      setGeneratedSchedule(generatedSchedule);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen max-w-screen-lg mx-auto p-4 gap-4">
      <div className="flex flex-col w-full gap-4">
        <h1 className="text-3xl font-bold text-center">Daily Schedule AI</h1>
        <textarea
          className="w-full h-48 border-2 border-gray-300 rounded-md p-2"
          placeholder="Enter what you want to do today"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={handleGenerate}
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate"}
        </button>
      </div>
      <div className="w-full border-2 border-gray-300 rounded-md p-4">
        <h2 className="text-xl font-bold mb-4">Generated Schedule</h2>
        <div className="overflow-auto">
          {generatedSchedule && (
            <>
              <p>{generatedSchedule.reason}</p>
              <div className="flex flex-col gap-2 mt-4">
                {generatedSchedule.schedule.map((task) => (
                  <div key={task.task} className="flex items-center gap-2">
                    <p className="italic text-sm">{task.time}</p>
                    <p className="font-bold">{task.task}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
