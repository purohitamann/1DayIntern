import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Star } from "lucide-react";

interface CompletedTask {
    id: string;
    description: string;
    completed: boolean;
    gameTitle: string;
    skillCategory: string;  // e.g., "Security", "Debugging", "Algorithms", etc.
}

interface CompletedSkillPathsProps {
    /** All tasks across various games; only the completed ones will be displayed. */
    tasks: CompletedTask[];
}

const CompletedSkillPaths: React.FC<CompletedSkillPathsProps> = ({ tasks }) => {
    // 1) Filter to only show completed tasks.
    const completedTasks = tasks.filter((task) => task.completed);

    // 2) Group tasks by their skill category (e.g., "Security", "Debugging").
    const skillGroups = completedTasks.reduce<Record<string, CompletedTask[]>>(
        (acc, task) => {
            const category = task.skillCategory || "General";
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(task);
            return acc;
        },
        {}
    );

    // 3) Render each skill category with its tasks.
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Your Completed Skill Paths</h2>
            {Object.entries(skillGroups).map(([category, catTasks]) => (
                <Card key={category} className="p-4 glass-effect">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2 heading-text">
                            <Star className="text-sunny-yellow w-5 h-5" />
                            <span>{category}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5">
                            {catTasks.map((task) => (
                                <li key={task.id} className="mb-1">
                                    <strong className="text-sunny-yellow">{task.gameTitle}</strong>
                                    {": "}
                                    {task.description}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ))}

            {/* If no tasks are completed, show a friendly message */}
            {completedTasks.length === 0 && (
                <p className="text-gray-300 italic">No completed tasks yet.</p>
            )}
        </div>
    );
};

export default CompletedSkillPaths;
