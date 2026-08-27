'use client';

import { motion } from 'framer-motion';
import React from 'react';
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
    return (
        <ComponentContainer
            className={`${beigeBg} min-h-screen py-12 flex flex-col justify-between`}
        >
            <motion.section
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

                {/* Кружки цветов на Tailwind */}
                <div className="bg-[#C2B4A3]/60 backdrop-blur-sm rounded-full px-6 py-3.5 flex items-center gap-3 sm:gap-4 shadow-sm">
                    {PALETTE_COLORS.map((bgClass, index) => (
                        <div
                            key={index}
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-inner border border-black/5 shrink-0 ${bgClass}`}
                        />
                    ))}
                </div>
            </motion.section>

            {/* Блок призыва, прижатый к низу страницы */}
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
