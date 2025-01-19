import React, { useState } from "react";
import CompletedSkillPaths from "./CompletedSkillsPath";

function ProfilePage() {
    const [allTasks] = useState([
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
    ]);

    return (
        <div className="space-y-8 p-4 pixel-cursor">
            <h1 className="game-title text-3xl">My Profile</h1>
            <CompletedSkillPaths tasks={allTasks} />
        </div>
    );
}

export default ProfilePage;
