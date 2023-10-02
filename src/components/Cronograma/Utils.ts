import { Task } from "gantt-task-react";

export const tasksCustom: Task[] = [
    {
      start: new Date(2023, 1, 1),
      end: new Date(2023, 1, 10),
      name: "Some Project",
      id: "ProjectSample",
      type: "project",
      hideChildren: false,
      progress: 25,
    },
    {
      start: new Date(2023, 1, 1),
      end: new Date(2023, 1, 5),
      name: "Idea1",
      id: "Task 0",
      type: "task",
      progress: 45,
      project: "ProjectSample",
    },
    {
      start: new Date(2023, 1, 5),
      end: new Date(2023, 1, 10),
      name: "Idea2",
      id: "Task 1",
      type: "task",
      progress: 25,
      project: "ProjectSample",
    },
  ];