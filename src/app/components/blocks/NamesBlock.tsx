'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { beigeBg } from '@/app/consts/constColors.const';
import { ComponentContainer } from '@/app/ui/layout/ComponentContainer';
import { CountdownTimer } from '../CountdownTimer';

interface IProps {
    isUnlocked: boolean;
}

const VIDEO_URL =
    'https://b4701886-2e3c-4a60-9e9f-056bd416f1cc.selstorage.ru/pp.mp4';

export const NamesBlock = ({ isUnlocked }: IProps) => {
    return (
        <ComponentContainer className={`relative ${beigeBg} h-full`}>
            <div className="relative h-full w-full overflow-hidden">
                {isUnlocked && (
                    <motion.div
                        layoutId="invite-square"
                        className="absolute inset-0 overflow-hidden"
                        transition={{
                            duration: 1.2,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        {/* Фоновое видео */}
                        <video
                            src={VIDEO_URL}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        />

                        {/* Слои блюра и легкого осветления под темный текст */}
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-md" />
                    </motion.div>
                )}

                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    animate={
                        isUnlocked
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 40 }
                    }
                    transition={{
                        duration: 1.2,
                        delay: isUnlocked ? 0.4 : 0,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
                >
                    <span className="text-slate-800/80 tracking-widest uppercase text-xs md:text-sm font-light">
                        Приглашение на свадьбу
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl mt-2 mb-8 text-slate-900">
                        Никита & Анна
                    </h1>

                    {/* Таймер с передачей флага для адаптации цвета */}
                    <CountdownTimer
                        targetDate="2026-11-24T16:00:00"
                        isDarkText
                    />
                </motion.section>
            </div>
        </ComponentContainer>
    );
};
