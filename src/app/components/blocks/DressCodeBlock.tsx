'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { ComponentContainer } from '../../ui/layout/ComponentContainer';
import { GlassPanel } from '../../ui/layout/GlassPanel';
import { ChevronDown } from 'lucide-react';

const PALETTE_COLORS = [
    { bg: 'bg-[#18181B]', label: 'Графит' },
    { bg: 'bg-[#94A3B8]', label: 'Стальной' },
    { bg: 'bg-[#CBD5E1]', label: 'Серебро' },
    { bg: 'bg-[#F1F5F9]', label: 'Молочный' },
];

export const DressCodeBlock = () => {
    return (
        <ComponentContainer className="relative flex flex-col items-center justify-between px-4 sm:px-6 py-12">
            <div className="flex-1 flex items-center justify-center w-full">
                <GlassPanel className="w-full max-w-lg p-8 sm:p-12 text-center">
                    <h2 className="font-serif italic text-5xl md:text-6xl text-slate-900 tracking-wide mb-6 select-none">
                        Дресс-код
                    </h2>

                    <p className="text-slate-800 text-base md:text-lg font-light leading-relaxed mb-10 font-serif">
                        Будем признательны, если при выборе нарядов вы
                        придержитесь цветовой палитры нашего праздника
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                        {PALETTE_COLORS.map((item, index) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/50"
                            >
                                <div
                                    className={`w-12 h-12 rounded-full shadow-md border border-black/10 ${item.bg}`}
                                />
                                <span className="text-xs font-sans text-slate-700 tracking-wider uppercase">
                                    {item.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </GlassPanel>
            </div>

            <div className="flex flex-col items-center gap-2 opacity-70 text-center pb-2">
                <span className="text-xs tracking-widest text-slate-800 uppercase font-light">
                    Пожалуйста, заполните анкету ниже
                </span>
                <ChevronDown className="w-5 h-5 text-slate-800 animate-bounce" />
            </div>
        </ComponentContainer>
    );
};
