'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import React, { useRef } from 'react';
import { ComponentContainer } from '../../ui/layout/ComponentContainer';
import { GlassPanel } from '../../ui/layout/GlassPanel';

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
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const x = useTransform(smoothProgress, [0, 1], ['0%', '-50%']);

    return (
        <ComponentContainer className="relative flex items-center justify-center px-4 sm:px-6 py-12 overflow-hidden">
            <GlassPanel className="w-full max-w-xl p-6 sm:p-10 font-serif overflow-hidden">
                <section ref={containerRef} className="w-full">
                    <div className="w-full overflow-hidden whitespace-nowrap mb-8 sm:mb-10 py-1 select-none">
                        <motion.div style={{ x }} className="inline-flex gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-8"
                                >
                                    <h2 className="text-4xl sm:text-5xl md:text-6xl text-slate-900 tracking-wide font-normal">
                                        Программа дня
                                    </h2>
                                    <span className="text-2xl text-slate-900/40">
                                        ✦
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <ol className="relative w-full list-none m-0 p-0">
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
            </GlassPanel>
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
            className={`relative pl-8 sm:pl-10 ${
                isLast ? '' : 'pb-10 sm:pb-12'
            }`}
        >
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 pb-2">
                <motion.time
                    dateTime={item.time}
                    className="text-5xl sm:text-6xl font-semibold text-slate-900 tracking-tight"
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
                    className="text-xl sm:text-2xl md:text-3xl text-slate-900 font-normal"
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
                    className="pt-3 text-lg sm:text-xl text-slate-700 leading-snug max-w-md"
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
