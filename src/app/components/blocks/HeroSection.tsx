'use client';

import React from 'react';
import { ChevronDownIcon, LockKeyholeIcon } from 'lucide-react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { CountdownTimer } from '../CountdownTimer';

const VIDEO_URL =
    'https://b4701886-2e3c-4a60-9e9f-056bd416f1cc.selstorage.ru/pp.mp4';

interface HeroSectionProps {
    isUnlocked: boolean;
    onUnlock: () => void;
}

export const HeroSection = ({ isUnlocked, onUnlock }: HeroSectionProps) => {
    return (
        <section className="relative w-full h-dvh bg-[#FDFBF7] snap-start snap-always overflow-hidden select-none">
            <LayoutGroup id="hero-layout">
                <AnimatePresence mode="wait">
                    {!isUnlocked ? (
                        /* ЭКРАН 1: Обложка с замком */
                        <motion.div
                            key="start-screen"
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                            className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4"
                        >
                            {/* Маленький квадрат с видео */}
                            <motion.div
                                layoutId="hero-video"
                                className="relative w-60 h-60 sm:w-72 sm:h-72 rounded-3xl overflow-hidden shadow-2xl mb-8 border border-black/5"
                                transition={{
                                    duration: 1,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <video
                                    src={VIDEO_URL}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>

                            <motion.button
                                type="button"
                                onClick={onUnlock}
                                className="flex flex-col items-center gap-3 bg-transparent border-none outline-none cursor-pointer p-4 z-30 relative"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="p-4 bg-white/90 backdrop-blur-md rounded-full border border-black/10 shadow-lg text-slate-800 animate-bounce">
                                    <LockKeyholeIcon className="w-8 h-8" />
                                </div>
                                <div className="flex items-center gap-1 font-serif text-slate-900 font-medium text-base sm:text-lg tracking-wide bg-white/70 px-4 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
                                    <span>Разблокируйте приглашение</span>
                                    <ChevronDownIcon className="w-4 h-4" />
                                </div>
                            </motion.button>
                        </motion.div>
                    ) : (
                        /* ЭКРАН 2: Приглашение (Видео расширилось) */
                        <div
                            key="unlocked-screen"
                            className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4"
                        >
                            {/* Видео распахнулось на весь экран с блюром */}
                            <motion.div
                                layoutId="hero-video"
                                className="absolute inset-0 overflow-hidden"
                                transition={{
                                    duration: 1,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <video
                                    src={VIDEO_URL}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-[#FDFBF7]/60 backdrop-blur-md" />
                            </motion.div>

                            {/* Контент приглашения */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="relative z-10 flex flex-col items-center"
                            >
                                <span className="text-slate-800/80 tracking-widest uppercase text-xs md:text-sm font-light">
                                    Приглашение на свадьбу
                                </span>
                                <h1 className="font-serif text-5xl md:text-7xl mt-2 mb-8 text-slate-900">
                                    Никита & Анна
                                </h1>

                                <CountdownTimer
                                    targetDate="2026-11-24T16:00:00"
                                    isDarkText
                                />
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </LayoutGroup>
        </section>
    );
};
