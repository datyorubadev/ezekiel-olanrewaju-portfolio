import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader: React.FC = () => {
    // Lazy init to avoid flash on reload
    const [isLoading, setIsLoading] = useState(() => {
        return !sessionStorage.getItem('hasLoaded');
    });
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        if (!isLoading) return;

        // Lock scroll
        document.body.style.overflow = 'hidden';

        const interval = setInterval(() => {
            setPercent(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Random "playful" increments
                const jump = Math.floor(Math.random() * 15) + 1;
                return Math.min(prev + jump, 100);
            });
        }, 120);

        const timeout = setTimeout(() => {
            setPercent(100);
            setTimeout(() => {
                setIsLoading(false);
                sessionStorage.setItem('hasLoaded', 'true');
                // Unlock scroll
                document.body.style.overflow = 'unset';
            }, 800);
        }, 2000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
            document.body.style.overflow = 'unset';
        };
    }, [isLoading]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
                    className="fixed inset-0 z-[100] bg-neutral-950 flex flex-col justify-end items-end p-6 md:p-12 text-white overflow-hidden cursor-wait"
                >
                    <div className="relative overflow-hidden">
                        <motion.div
                            className="text-[10vw] md:text-[6vw] font-bold leading-none tracking-tighter tabular-nums"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                        >
                            {percent}%
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
