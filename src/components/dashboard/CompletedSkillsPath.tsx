import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import SkillPath from "./SkillPath";
import Confetti from "react-confetti";
import { Button } from "../ui/button";
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

    // const shareOnLinkedIn = async () => {
    //     const certElement = document.getElementById("certification");
    //     if (!certElement) return;

    //     const canvas = await html2canvas(certElement);
    //     const imgData = canvas.toDataURL("image/png");

    //     // Create a blob for the image
    //     const blob = await fetch(imgData).then((res) => res.blob());
    //     const file = new File([blob], "Certification.png", { type: "image/png" });

    //     // Create a LinkedIn share link
    //     const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    //         window.location.href
    //     )}`;

    //     // Optionally, use a LinkedIn API to upload an image (requires API key)
    //     window.open(linkedInShareUrl, "_blank");
    // };
    const shareOnLinkedIn = async () => {
        const certElement = document.getElementById("certification");
        if (!certElement) return;

        const canvas = await html2canvas(certElement);
        const imgData = canvas.toDataURL("image/png");

        // Generate LinkedIn post content
        const message = encodeURIComponent(
            `Hey! I just achieved a badge on my way to becoming a 1DayIntern at [Your Organization Name]! 🌟\n` +
            `Check out my progress and join me on this journey of skill-building and fun! 🏆\n` +
            `#1DayIntern #SkillPath #Achievements #LearningJourney`
        );

        // Share URL (you can optionally include a hosted certification link or image)
        const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            window.location.href
        )}&summary=${message}`;

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

            <div id="certification" className="minecraft-panel p-6 rounded-lg glass-effect pixel-cursor">
                <h3 className="game-title text-xl mb-4 text-sunny-yellow">
                    Here's Your Trophies!
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Object.keys(skillCategories).map((category) => (
                        <div
                            key={category}
                            className="glass-effect p-4 rounded-lg text-center shadow-lg hover:shadow-sunny transition-all duration-300 hover:scale-105 group"
                        >
                            <div className="flex justify-center mb-3 group-hover:animate-bounce">
                                <img
                                    src={`/assets/pixel-badges/${getRandomBadge()}`}
                                    alt={`${category} Badge`}
                                    className="w-12 h-12 pixelated"
                                />
                            </div>
                            <h4 className="text-lg font-bold text-sunny-yellow heading-text group-hover:scale-105 transition-transform">
                                {category}
                            </h4>
                            <p className="text-white/80 text-sm">
                                {skillCategories[category].length} Tasks Completed
                            </p>
                            <p className="text-white/60 text-xs mt-2 italic group-hover:text-white/80 transition-colors">
                                Thank you for participating in {category} challenges!
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end space-x-4">
                <Button
                    onClick={generateCertification}
                    className="minecraft-btn bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-sunny-yellow mr-4"
                >
                    Download Certification
                </Button>
                <Button
                    onClick={shareOnLinkedIn}
                    className="minecraft-btn bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-sunny-yellow"
                >
                    Share on LinkedIn
                </Button>
            </div>
        </div>
    );
};

export default CompletedSkillPaths;
