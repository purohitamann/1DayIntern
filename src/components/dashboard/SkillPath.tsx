import React, { useState, useEffect } from "react";

interface Role {
    id: number;
    title: string;
    description: string;
    xpRequired: number;
}

interface User {
    username: string;
    xp: number;
    unlockedRoles: string[];
}

const SkillPath = () => {
    const [user, setUser] = useState<User | null>(null);
    const [roles, setRoles] = useState<Role[]>([]);
    const [xpProgress, setXpProgress] = useState(0);
    const [nextMilestone, setNextMilestone] = useState<Role | null>(null);

    // Dummy data for testing
    const dummyUser: User = {
        username: "JohnDoe",
        xp: 120,
        unlockedRoles: ["Documentation Intern", "Junior Developer"],
    };

    const dummyRoles: Role[] = [
        { id: 1, title: "Documentation Intern", description: "Begin your journey.", xpRequired: 50 },
        {
            id: 2,
            title: "Junior Developer",
            description: "Take on small projects.",
            xpRequired: 100,
        },
        {
            id: 3,
            title: "Software Developer",
            description: "Handle complex projects.",
            xpRequired: 200,
        },
        {
            id: 4,
            title: "Senior Developer",
            description: "Lead teams and mentor others.",
            xpRequired: 300,
        },
    ];

    useEffect(() => {
        // Simulate fetching user and roles data
        setUser(dummyUser);
        setRoles(dummyRoles);

        // Find the next milestone based on user XP
        const nextRole = dummyRoles.find((role) => role.xpRequired > dummyUser.xp);
        setNextMilestone(nextRole);

        // Calculate XP progress
        if (nextRole) {
            const previousXp =
                dummyRoles.find(
                    (role) =>
                        role.xpRequired < nextRole.xpRequired &&
                        dummyUser.unlockedRoles.includes(role.title)
                )?.xpRequired || 0;

            setXpProgress(
                ((dummyUser.xp - previousXp) / (nextRole.xpRequired - previousXp)) * 100
            );
        } else {
            setXpProgress(100); // Max XP reached
        }
    }, []);

    if (!user || !roles.length) {
        return <p>Loading skill paths...</p>;
    }

    return (
        <div className="minecraft-panel p-6 rounded-lg text-pure-white space-y-6">
            <h1 className="text-2xl font-bold">Skill Path Progress</h1>

            {/* XP Progress Bar */}
            <div className="relative w-full h-6 bg-gray-800 rounded-full">
                <div
                    className="absolute top-0 left-0 h-6 bg-green-500 rounded-full transition-all duration-300"
                    style={{ width: `${xpProgress}%` }}
                ></div>
                <p className="absolute inset-0 flex justify-center items-center text-yellow-400 font-bold">
                    {user.xp} XP
                </p>
            </div>

            {/* Current and Next Milestone */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Next Milestone</h2>
                {nextMilestone ? (
                    <div className="p-4 bg-gray-800 rounded-lg shadow-md">
                        <h3 className="text-lg font-bold text-yellow-400">
                            {nextMilestone.title}
                        </h3>
                        <p>{nextMilestone.description}</p>
                        <p className="text-sm text-gray-300">
                            XP Required: {nextMilestone.xpRequired}
                        </p>
                    </div>
                ) : (
                    <p className="text-gray-300">You’ve unlocked all roles!</p>
                )}
            </div>

            {/* Unlocked Roles */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Unlocked Roles</h2>
                {user.unlockedRoles.length > 0 ? (
                    user.unlockedRoles.map((role) => (
                        <div
                            key={role}
                            className="p-4 bg-green-700 rounded-lg text-center text-yellow-300"
                        >
                            {role}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-300">No roles unlocked yet. Start earning XP!</p>
                )}
            </div>
        </div>
    );
};

export default SkillPath;
