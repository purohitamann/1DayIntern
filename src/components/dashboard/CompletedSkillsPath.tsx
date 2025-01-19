import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import SkillPath from "./SkillPath";

interface Task {
    id: string;
    description: string;
    completed: boolean;
    gameTitle: string;
    skillCategory: string;
}

interface CompletedSkillPathsProps {
    tasks: Task[];
}

// List of available badge filenames
const availableBadges = [
    "coin1.png",
    "coin2.png",
    "coin3.png",
    "pixel1.png",
    "pixel2.png",
    "pixel3.png",
    "trophy-bronze.png",
    "trophy-gold.png",
    "trophy-silver.png",
];

const CompletedSkillPaths = ({ tasks }: CompletedSkillPathsProps) => {
    const completedTasks = tasks.filter((task) => task.completed);

    const skillCategories = completedTasks.reduce<Record<string, Task[]>>(
        (acc, task) => {
            if (!acc[task.skillCategory]) {
                acc[task.skillCategory] = [];
            }
            acc[task.skillCategory].push(task);
            return acc;
        },
        {}
    );

    const getRandomBadge = () =>
        availableBadges[Math.floor(Math.random() * availableBadges.length)];

    const generateCertification = async () => {
        const certElement = document.getElementById("certification");
        if (!certElement) return;

        const canvas = await html2canvas(certElement);
        const imgData = canvas.toDataURL("image/png");

        // Generate PDF
        const pdf = new jsPDF("landscape", "mm", "a4");
        pdf.addImage(imgData, "PNG", 10, 10, 277, 190);
        pdf.save("Certification.pdf");
    };

    const shareOnLinkedIn = async () => {
        const certElement = document.getElementById("certification");
        if (!certElement) return;

        const canvas = await html2canvas(certElement);
        const imgData = canvas.toDataURL("image/png");

        // Create a blob for the image
        const blob = await fetch(imgData).then((res) => res.blob());
        const file = new File([blob], "Certification.png", { type: "image/png" });

        // Create a LinkedIn share link
        const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            window.location.href
        )}`;

        // Optionally, use a LinkedIn API to upload an image (requires API key)
        window.open(linkedInShareUrl, "_blank");
    };

    return (
        <div className="space-y-6">

            <div>
                <h2 className="text-2xl font-bold minecraft-text">
                    Your Skill Paths
                </h2>
                <div>
                    <SkillPath />
                </div>
            </div>
            <h2 className="text-2xl font-bold minecraft-text">
                Completed Skill Paths
            </h2>

            <div id="certification" className="p-6 bg-green-700 rounded-lg border-8 border-gray-800">
                <h3 className="text-xl font-bold mb-4 minecraft-text text-yellow-400">
                    Here's Your Trophies!
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Object.keys(skillCategories).map((category) => (
                        <div
                            key={category}
                            className="p-4 bg-green-900 rounded-lg text-center border-4 border-gray-700 shadow-lg"
                        >
                            <div className="flex justify-center mb-3">
                                <img
                                    src={`/assets/pixel-badges/${getRandomBadge()}`}
                                    alt={`${category} Badge`}
                                    className="w-12 h-12"
                                    style={{ imageRendering: "pixelated" }}
                                />
                            </div>
                            <h4 className="text-lg font-bold text-yellow-300 minecraft-text">
                                {category}
                            </h4>
                            <p className="text-gray-200 text-sm">
                                {skillCategories[category].length} Tasks Completed
                            </p>
                            <p className="text-gray-100 text-xs mt-2 italic">
                                Thank you for participating in {category} challenges!
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end space-x-4">
                <button
                    onClick={generateCertification}
                    className="minecraft-btn bg-green-300 hover:bg-green-400 border-4 border-gray-800 text-yellow-300"
                >
                    Download Certification
                </button>
                <button
                    onClick={shareOnLinkedIn}
                    className="minecraft-btn bg-blue-600 hover:bg-blue-700 border-4 border-gray-800 text-yellow-300"
                >
                    Share on LinkedIn
                </button>
            </div>
        </div>
    );
};

export default CompletedSkillPaths;
