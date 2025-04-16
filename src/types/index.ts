// Schedule type
export type Schedule = {
  task: string;
  time: string;
}[];

// Schedule response type
export type ScheduleResponse = {
  schedule: Schedule;
  reason: string;
};
