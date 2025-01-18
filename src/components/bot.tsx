import React from "react";
import AIManagerChat from "./dashboard/AIManagerChat";
import TaskCalendar from "./dashboard/TaskCalendar";

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-[#5c743c] flex flex-col lg:flex-row gap-6 p-6">
            {/* Task Calendar */}
            <div className="flex-1 lg:max-w-[50%]">
                <TaskCalendar />
            </div>

            {/* AI Manager Chat */}
            <div className="flex-1 lg:max-w-[50%]">
                <AIManagerChat />
            </div>
        </div>
    );
};

export default Dashboard;
