import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Trophy, User, Volume2, VolumeX } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
const LoginPage = () => {
    const { loginWithRedirect } = useAuth0();
    const [isMuted, setIsMuted] = useState(true);
    const [audioStarted, setAudioStarted] = useState(false);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

    const handleLogin = () => {
        clicked();
        loginWithRedirect();
    };

    const toggleMute = () => {
        if (audio) {
            audio.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const startAudio = () => {
        const audioElement = new Audio("/assets/audio/thanos.mp3");
        audioElement.volume = 0.2;
        audioElement.loop = true;
        audioElement.play();
        setAudio(audioElement);
        setAudioStarted(true);
    };

    const clicked = () => {
        const audioElement = new Audio("/assets/audio/click.ogg");
        audioElement.volume = 0.2;
        audioElement.play();
    };

    useEffect(() => {
        if (!audioStarted) {
            startAudio();
        }
        return () => {

            if (audio) {
                audio.pause();
                audio.src = "";
            }
        };
    }, [audioStarted]);

    return (
        <div className="minecraft-panel flex flex-col items-center justify-center min-h-screen text-center bg-gray-900 text-pure-white relative">
            <h1 className="game-title text-4xl font-bold text-sunny-yellow mb-4">
                Welcome to <span className="text-green-500">1DayIntern</span>
            </h1>
            <p className="text-lg mb-8">
                "Breaking blocks, building skills, and crafting your career... one day at a time!"
            </p>


            <Button
                onClick={handleLogin}
                className="minecraft-btn bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-sunny-yellow px-6 py-3 text-lg shadow-md hover:shadow-lg transform transition-transform hover:scale-105"
            >
                <User className="w-6 h-6 mr-2" />
                Start Your 1DayIntern Adventure
            </Button>


            <div className="flex items-center mt-8">
                <Trophy className="w-8 h-8 text-green-500 animate-pulse mr-3" />
                <p className="text-gray-300 italic">
                    Earn trophies, level up, and unlock your dream role!
                </p>
            </div>


        </div>
    );
};

export default LoginPage;
