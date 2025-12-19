import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const TRACK_URL = "/ambient-tech.mp3"; // Local file

export const BackgroundMusic: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Attempt auto-play on mount
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = 0.5;

        const attemptPlay = () => {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setIsPlaying(true);
                        // Remove fallback listener if successful
                        document.removeEventListener('click', attemptPlay);
                    })
                    .catch((error) => {
                        console.log("Auto-play prevented, waiting for interaction:", error);
                        setIsPlaying(false);
                        // Add listener for first interaction
                        document.addEventListener('click', attemptPlay, { once: true });
                    });
            }
        };

        attemptPlay();

        return () => {
            document.removeEventListener('click', attemptPlay);
        };
    }, []);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play();
            setIsPlaying(true);
        }
    };

    return (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
            <audio ref={audioRef} src={TRACK_URL} loop />

            <button
                onClick={togglePlay}
                className={`group flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-white/20 rounded-full hover:bg-neutral-800 transition-all shadow-xl overflow-hidden ${!isPlaying ? 'animate-pulse' : ''}`}
                aria-label={isPlaying ? "Pause music" : "Play music"}
            >
                {/* Visualizer / Icon */}
                <div className="flex items-center gap-1 h-4">
                    {/* Animated Bars */}
                    {[1, 2, 3, 4].map((bar) => (
                        <motion.div
                            key={bar}
                            className="w-1 bg-white rounded-full"
                            animate={{
                                height: isPlaying ? [4, 16, 4] : 4,
                            }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                repeatType: "reverse",
                                delay: bar * 0.1,
                                ease: "easeInOut"
                            }}
                            style={{ height: 4 }}
                        />
                    ))}
                </div>

                {/* Text Label */}
                <span className="text-xs font-medium text-white uppercase tracking-widest block ml-1">
                    {isPlaying ? "Pause" : "Play"}
                </span>
            </button>
        </div>
    );
};
