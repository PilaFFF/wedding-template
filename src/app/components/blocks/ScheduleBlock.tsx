'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { ComponentContainer } from '../../ui/layout/ComponentContainer';
import { beigeBg, greenBg } from '@/app/consts/constColors.const';

interface ScheduleItem {
    time: string;
    title: string;
    description?: string;
}

const SCHEDULE: ScheduleItem[] = [
    {
        time: '15:00',
        title: 'Сбор гостей',
        description:
            'Собираясь на торжество, возьмите с собой улыбки и хорошее настроение',
    },
    {
        time: '16:00',
        title: 'Банкет',
        description: 'Время вкусной еды, танцев и развлечений',
    },
    {
        time: '00:00',
        title: 'Завершение',
        description:
            'К сожалению, даже такой волшебный вечер может подойти к концу',
    },
];

export const ScheduleBlock = () => {
    return (
        <ComponentContainer className={greenBg}>
            <section className="relative h-full w-full flex flex-col items-center px-6 sm:px-10 md:px-16 py-12 sm:py-16 font-serif">
                {/* --- Анимированный Заголовок --- */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-10 sm:mb-14"
                >
                    <span className="text-slate-800/70 tracking-[0.2em] uppercase text-xs sm:text-sm font-sans font-light block mb-2">
                        Тайминг
                    </span>
                    <h2 className="text-5xl sm:text-6xl md:text-8xl text-slate-900 font-normal tracking-wide">
                        Программа дня
                    </h2>
                </motion.div>

                {/* --- Список Таймлайна --- */}
                <ol className="relative w-full max-w-xl list-none m-0 p-0">
                    {/* Вертикальная пунктирная линия */}
                    <div
                        aria-hidden
                        className="absolute left-[5px] top-8 bottom-8 w-px border-l border-dashed border-slate-900/70"
                    />

                    {SCHEDULE.map((item, index) => (
                        <ScheduleEntry
                            key={item.time}
                            item={item}
                            index={index}
                            isLast={index === SCHEDULE.length - 1}
                        />
                    ))}
                </ol>
            </section>
        </ComponentContainer>
    );
};

interface ScheduleEntryProps {
    item: ScheduleItem;
    index: number;
    isLast: boolean;
}

const ScheduleEntry = ({ item, index, isLast }: ScheduleEntryProps) => {
    const delay = index * 0.2;

    return (
        <li
            className={`relative pl-8 sm:pl-10 ${isLast ? '' : 'pb-10 sm:pb-14'}`}
        >
            {/* Время + название — над линией */}
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 pb-2">
                <motion.time
                    dateTime={item.time}
                    className="text-6xl sm:text-7xl md:text-8xl font-semibold text-slate-900 tracking-tight"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.55 }}
                    transition={{
                        duration: 0.55,
                        delay,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {item.time}
                </motion.time>

                <motion.h3
                    className="text-2xl sm:text-3xl md:text-4xl text-slate-900 font-normal"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.55 }}
                    transition={{
                        duration: 0.55,
                        delay: delay + 0.1,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {item.title}
                </motion.h3>
            </div>

            {/* Точка + горизонтальная линия от точки вправо */}
            <div className="relative -ml-8 sm:-ml-10 mr-0 flex items-center h-px">
                <motion.span
                    aria-hidden
                    className="absolute left-0 z-10 block h-[11px] w-[11px] rounded-full bg-slate-900"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{
                        duration: 0.4,
                        delay: delay + 0.12,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                />

                <motion.div
                    aria-hidden
                    className="ml-[5px] h-px w-full origin-left bg-slate-900"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{
                        duration: 0.75,
                        delay: delay + 0.18,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                />
            </div>

            {item.description ? (
                <motion.p
                    className="pt-3 text-xl sm:text-2xl text-slate-700 leading-snug max-w-md"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                        duration: 0.55,
                        delay: delay + 0.32,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {item.description}
                </motion.p>
            ) : null}
        </li>
    );
};
