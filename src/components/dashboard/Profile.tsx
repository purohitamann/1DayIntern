import React, { useState } from "react";
import CompletedSkillPaths from "./CompletedSkillsPath";

function ProfilePage() {
    // Imagine you store all tasks from multiple games in parent state
    const [allTasks, setAllTasks] = useState([
        {
            id: "1-4",
            description: "Test the security measures",
            completed: true,
            gameTitle: "Code Breaker",
            skillCategory: "Security",
        },
        {
            id: "2-3",
            description: "Debug the application",
            completed: true,
            gameTitle: "Debug Master",
            skillCategory: "Debugging",
        },
        {
            id: "2-5",
            description: "Write test cases",
            completed: false,
            gameTitle: "Debug Master",
            skillCategory: "Debugging",
        },
        // etc.
    ]);

    return (
        <div className="space-y-8 p-4">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <CompletedSkillPaths tasks={allTasks} />
        </div>
    );
}

export default ProfilePage;
