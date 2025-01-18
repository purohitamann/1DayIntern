import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default styles
import "./TaskCalendar.css"; // Optional: Custom styling for the calendar
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface Task {
    id: string;
    title: string;
    description: string;
    date: string; // Format: YYYY-MM-DD
}

const initialTasks: Task[] = [
    {
        id: "1",
        title: "Complete Portfolio Website",
        description: "Finish the design and coding for the portfolio.",
        date: "2025-01-19",
    },
    {
        id: "2",
        title: "Team Meeting",
        description: "Discuss project updates with the team.",
        date: "2025-01-20",
    },
    {
        id: "3",
        title: "Submit Assignment",
        description: "Submit the AI assignment to the professor.",
        date: "2025-01-22",
    },
];

const TaskCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
    };

    const tasksForSelectedDate = tasks.filter(
        (task) =>
            task.date === selectedDate.toISOString().split("T")[0] // Match tasks with the selected date
    );

    return (
        <Card className="minecraft-panel glass-effect rounded-lg shadow-lg p-6 text-pure-white">
            {/* Calendar Header */}
            <CardHeader className="border-b border-white/20 mb-4">
                <CardTitle className="heading-text text-lg text-center">
                    Task Calendar
                </CardTitle>
            </CardHeader>

            <CardContent>
                {/* Calendar */}
                <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    tileContent={({ date }) => {
                        const tasksOnDate = tasks.filter(
                            (task) => task.date === date.toISOString().split("T")[0]
                        );
                        return tasksOnDate.length > 0 ? (
                            <Badge className="bg-yellow-500 text-black px-2 py-1 mt-1">
                                {tasksOnDate.length} Task{tasksOnDate.length > 1 ? "s" : ""}
                            </Badge>
                        ) : null;
                    }}
                    className="bg-[#5c743c] text-white border-[#3d4a2e]"
                />

                {/* Task List for Selected Date */}
                <div className="mt-6 space-y-4">
                    {tasksForSelectedDate.length > 0 ? (
                        tasksForSelectedDate.map((task) => (
                            <div
                                key={task.id}
                                className="p-4 bg-[#4b694e] rounded-md shadow-md"
                            >
                                <h3 className="text-lg font-bold">{task.title}</h3>
                                <p className="text-sm">{task.description}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-400">No tasks for this date.</p>
                    )}
                </div>

                {/* Add Task Button */}
                <Button
                    className="minecraft-btn mt-4 w-full"
                    onClick={() =>
                        alert(
                            "Add task functionality can be implemented here!"
                        )
                    }
                >
                    Add Task
                </Button>
            </CardContent>
        </Card>
    );
};

export default TaskCalendar;
