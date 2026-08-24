'use client';

import React, { useSyncExternalStore } from 'react';

interface IProps {
    targetDate: string; // Формат ISO: '2027-11-24T16:00:00'
    isDarkText?: boolean;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const ZERO_TIME: TimeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
};

function getDeclension(
    number: number,
    titles: [string, string, string],
): string {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
        number % 100 > 4 && number % 100 < 20
            ? 2
            : cases[number % 10 < 5 ? number % 10 : 5]
    ];
}

function calculateTimeLeft(targetDate: string): TimeLeft {
    const difference = new Date(targetDate).getTime() - Date.now();

    if (difference <= 0) {
        return ZERO_TIME;
    }

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
}

function subscribeToSecond(onStoreChange: () => void) {
    const intervalId = window.setInterval(onStoreChange, 1000);
    return () => window.clearInterval(intervalId);
}

const snapshotCache = new Map<
    string,
    { fingerprint: string; value: TimeLeft }
>();

function getTimeLeftSnapshot(targetDate: string): TimeLeft {
    const next = calculateTimeLeft(targetDate);
    const fingerprint = `${next.days}:${next.hours}:${next.minutes}:${next.seconds}`;
    const cached = snapshotCache.get(targetDate);

    if (cached?.fingerprint === fingerprint) {
        return cached.value;
    }

    snapshotCache.set(targetDate, { fingerprint, value: next });
    return next;
}

export const CountdownTimer = ({ targetDate, isDarkText }: IProps) => {
    const timeLeft = useSyncExternalStore(
        subscribeToSecond,
        () => getTimeLeftSnapshot(targetDate),
        () => ZERO_TIME,
    );

    const timerItems = [
        {
            value: timeLeft.days,
            label: getDeclension(timeLeft.days, ['день', 'дня', 'дней']),
            progress: (timeLeft.days % 30) / 30,
        },
        {
            value: timeLeft.hours,
            label: getDeclension(timeLeft.hours, ['час', 'часа', 'часов']),
            progress: timeLeft.hours / 24,
        },
        {
            value: timeLeft.minutes,
            label: getDeclension(timeLeft.minutes, [
                'минута',
                'минуты',
                'минут',
            ]),
            progress: timeLeft.minutes / 60,
        },
        {
            value: timeLeft.seconds,
            label: getDeclension(timeLeft.seconds, [
                'секунда',
                'секунды',
                'секунд',
            ]),
            progress: timeLeft.seconds / 60,
        },
    ];

    return (
        <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 max-w-lg w-full">
            {timerItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-center">
                    {/* Круглая плашка (увеличен размер мобильной версии с 16 до 18-20, чтобы подпись комфортно влезала) */}
                    <div className="relative w-18 h-18 sm:w-22 sm:h-22 md:w-24 md:h-24 flex flex-col items-center justify-center">
                        <svg
                            className="absolute inset-0 w-full h-full -rotate-90"
                            viewBox="0 0 100 100"
                        >
                            {/* Фоновый тонкий круг */}
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                className={`stroke-${isDarkText ? 'slate-900/20' : 'white/20'}`}
                                strokeWidth="1.5"
                                fill="transparent"
                            />
                            {/* Динамическая активная дуга */}
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                className={`stroke-${isDarkText ? 'slate-900' : 'white'} transition-all duration-500 ease-out`}
                                strokeWidth="2"
                                fill="transparent"
                                strokeDasharray="283"
                                strokeDashoffset={
                                    283 - 283 * (item.progress || 1)
                                }
                                strokeLinecap="round"
                            />
                        </svg>

                        {/* Контент внутри круга: Число + Подпись */}
                        <div className="z-10 flex flex-col items-center justify-center leading-none">
                            <span
                                className={`text-xl sm:text-2xl md:text-3xl ${isDarkText ? 'text-slate-900' : 'text-white'} font-light`}
                            >
                                {item.value}
                            </span>
                            <span
                                className={`text-[10px] sm:text-xs ${isDarkText ? 'text-slate-800/80' : 'text-white/80'} font-light mt-1`}
                            >
                                {item.label}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
