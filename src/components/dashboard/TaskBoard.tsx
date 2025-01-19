import React from "react";
import TaskCard from "./TaskCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  rewards: number;
  progress: number;
  timeEstimate: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface TaskBoardProps {
  columns?: Column[];
}

const defaultTasks: Task[] = [
  {
    id: "1",
    title: "Build Portfolio Website",
    description:
      "Create a professional portfolio website to showcase your projects",
    difficulty: "Medium",
    rewards: 100,
    progress: 0,
    timeEstimate: "2-3 hours",
  },
  {
    id: "2",
    title: "Complete JavaScript Course",
    description: "Finish the advanced JavaScript programming course",
    difficulty: "Hard",
    rewards: 150,
    progress: 30,
    timeEstimate: "4-5 hours",
  },
  {
    id: "3",
    title: "Update LinkedIn Profile",
    description: "Refresh your LinkedIn profile with recent achievements",
    difficulty: "Easy",
    rewards: 50,
    progress: 70,
    timeEstimate: "1 hour",
  },
];

const defaultColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [defaultTasks[0]],
  },
  {
    id: "inProgress",
    title: "In Progress",
    tasks: [defaultTasks[1]],
  },
  {
    id: "completed",
    title: "Completed",
    tasks: [defaultTasks[2]],
  },
];

const TaskBoard = ({ columns = defaultColumns }: TaskBoardProps) => {
  const [boardColumns, setBoardColumns] = React.useState(columns);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // If the user drops outside the list or no movement
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Find source and destination columns
    const sourceColumn = boardColumns.find(
      (col) => col.id === source.droppableId
    );
    const destColumn = boardColumns.find(
      (col) => col.id === destination.droppableId
    );

    if (!sourceColumn || !destColumn) return;

    // Copy tasks
    const sourceTasks = [...sourceColumn.tasks];
    const destTasks =
      source.droppableId === destination.droppableId
        ? sourceTasks
        : [...destColumn.tasks];

    // Remove dragged item from source
    const [removed] = sourceTasks.splice(source.index, 1);
    // Add dragged item to destination
    destTasks.splice(destination.index, 0, removed);

    // Update columns
    const newColumns = boardColumns.map((col) => {
      if (col.id === source.droppableId) {
        return { ...col, tasks: sourceTasks };
      }
      if (col.id === destination.droppableId) {
        return { ...col, tasks: destTasks };
      }
      return col;
    });

    setBoardColumns(newColumns);
  };

  return (
    <div
      className="
        minecraft-panel
        card-hover
        w-full
        p-6
        rounded-lg
        text-pure-white
        space-y-6
      "
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col md:flex-row gap-6">
          {boardColumns.map((column) => (
            <div
              key={column.id}
              className="
                flex-1
                min-w-[300px]
                glass-effect
                p-4
                rounded-md
                shadow-md
                space-y-4
              "
            >
              <h3
                className="
                  font-silkscreen
                  text-lg
                  mb-2
                  tracking-wide
                  uppercase
                "
              >
                {column.title}
              </h3>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4 min-h-[100px]"
                  >
                    {column.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard
                              title={task.title}
                              description={task.description}
                              difficulty={task.difficulty}
                              rewards={task.rewards}
                              progress={task.progress}
                              timeEstimate={task.timeEstimate}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      <div>
        <h3 className="font-silkscreen text-lg mb-2 tracking-wide uppercase">
          More Tasks
        </h3>

      </div>
    </div>
  );
};

export default TaskBoard;
