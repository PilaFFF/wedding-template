'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import React, { useRef } from 'react';
import { ComponentContainer } from '../../ui/layout/ComponentContainer';
import { beigeBg } from '@/app/consts/constColors.const';
import { ChevronDown } from 'lucide-react';

const PALETTE_COLORS = [
    'bg-[#18181B]', // Черный
    'bg-[#94A3B8]', // Серо-голубой
    'bg-[#CBD5E1]', // Светло-серый
    'bg-[#F1F5F9]', // Молочный/бежевый
];

export const DressCodeBlock = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    // Следим за прокруткой блока
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    // Добавляем пружинную физику для плавности
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Трансформации для кружков (крайние разъезжаются/сдвигаются, центральные меняются местами)
    const moveLeft = useTransform(smoothProgress, [0, 0.5, 1], [-30, 0, 30]);
    const moveRight = useTransform(smoothProgress, [0, 0.5, 1], [30, 0, -30]);
    const scaleCenter = useTransform(
        smoothProgress,
        [0, 0.5, 1],
        [0.8, 1.15, 0.8],
    );
    const paletteRotate = useTransform(smoothProgress, [0, 0.5, 1], [-6, 0, 6]);

    // Массив анимаций для каждого из 4 кружков
    const circleTransforms = [
        { x: moveLeft, scale: 1 },
        { x: moveRight, scale: scaleCenter },
        { x: moveLeft, scale: scaleCenter },
        { x: moveRight, scale: 1 },
    ];

    return (
        <ComponentContainer
            className={`${beigeBg} min-h-screen py-12 flex flex-col justify-between`}
        >
            <motion.section
                ref={sectionRef}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center text-center px-4 max-w-md mx-auto my-auto"
            >
                {/* Заголовок */}
                <h2 className="font-serif italic text-5xl md:text-6xl text-slate-800 tracking-wide mb-6 select-none">
                    Дресс-код
                </h2>

                {/* Подпись */}
                <p className="text-slate-700 text-base md:text-lg font-light leading-relaxed mb-8 max-w-xs md:max-w-sm">
                    Вы будете украшением вечера, если в вашем наряде будут
                    присутствовать оттенки нашей цветовой гаммы
                </p>

                {/* Анимированная палитра цветов */}
                <motion.div
                    style={{ rotate: paletteRotate }}
                    className="bg-[#C2B4A3]/60 backdrop-blur-sm rounded-full px-6 py-3.5 flex items-center gap-3 sm:gap-4 shadow-sm overflow-hidden"
                >
                    {PALETTE_COLORS.map((bgClass, index) => (
                        <motion.div
                            key={index}
                            style={{
                                x: circleTransforms[index].x,
                                scale: circleTransforms[index].scale,
                            }}
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-inner border border-black/5 shrink-0 ${bgClass}`}
                        />
                    ))}
                </motion.div>
            </motion.section>

            {/* Блок призыва */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col items-center gap-3 opacity-60 text-center pb-4"
            >
                <span className="text-xs md:text-sm tracking-widest text-slate-700 uppercase font-light max-w-[250px]">
                    Просим ответить на несколько вопросов ниже
                </span>
                <ChevronDown className="w-5 h-5 text-slate-700 animate-bounce" />
            </motion.div>
        </ComponentContainer>
    );
};
