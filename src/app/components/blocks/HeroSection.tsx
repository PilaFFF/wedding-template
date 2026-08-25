'use client';

import React, { useRef } from 'react';
import { ChevronDownIcon, LockKeyholeIcon } from 'lucide-react';
import { CountdownTimer } from '../CountdownTimer';

const VIDEO_URL =
    'https://b4701886-2e3c-4a60-9e9f-056bd416f1cc.selstorage.ru/pp.mp4';

export const HeroSection = () => {
    const nextSectionRef = useRef<HTMLDivElement>(null);

    const scrollToContent = () => {
        nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="w-full">
            {/* ЭКРАН 1: Обложка с видео и кнопкой-замком */}
            <section className="relative w-full h-[100dvh] bg-[#FDFBF7] flex flex-col items-center justify-center snap-start snap-always overflow-hidden select-none">
                {/* Карточка с видео */}
                <div className="relative w-60 h-60 sm:w-72 sm:h-72 rounded-3xl overflow-hidden shadow-2xl mb-8 border border-black/5">
                    <video
                        src={VIDEO_URL}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Интерактивная кнопка перехода */}
                <button
                    type="button"
                    onClick={scrollToContent}
                    className="flex flex-col items-center gap-3 bg-transparent border-none outline-none cursor-pointer p-4 active:scale-95 transition-transform"
                >
                    <div className="p-4 bg-white/90 backdrop-blur-md rounded-full border border-black/10 shadow-lg text-slate-800 animate-bounce">
                        <LockKeyholeIcon className="w-8 h-8" />
                    </div>
                    <div className="flex items-center gap-1 font-serif text-slate-900 font-medium text-base sm:text-lg tracking-wide bg-white/70 px-4 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
                        <span>Нажмите или скрольте вниз</span>
                        <ChevronDownIcon className="w-4 h-4" />
                    </div>
                </button>
            </section>

            {/* ЭКРАН 2: Приглашение (Сюда скроллит кнопка) */}
            <section
                ref={nextSectionRef}
                className="relative w-full h-[100dvh] bg-[#FDFBF7] flex flex-col items-center justify-center text-center px-4 snap-start snap-always overflow-hidden"
            >
                {/* Фоновое размытое видео */}
                <div className="absolute inset-0 z-0 opacity-40 blur-md pointer-events-none">
                    <video
                        src={VIDEO_URL}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Контент приглашения */}
                <div className="relative z-10 flex flex-col items-center">
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
                </div>
            </section>
        </div>
    );
};
