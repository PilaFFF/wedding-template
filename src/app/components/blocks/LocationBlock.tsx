'use client';

import { motion } from 'framer-motion';
import { ComponentContainer } from '../../ui/layout/ComponentContainer';
import { beigeBg } from '@/app/consts/constColors.const';
import { Flower } from 'lucide-react';

export const LocationBlock = () => {
    // Настройки срабатывания для каждого блока
    const animateOnScroll = {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 }, // Сработает, когда элемент показался на 30%
        transition: { duration: 0.8, ease: 'easeOut' },
    };

    return (
        <ComponentContainer className={beigeBg}>
            <section className="relative h-full w-full flex flex-col items-center justify-center text-center px-6 py-12 sm:py-16 font-serif text-slate-900">
                <div className="flex flex-col justify-between h-full mb-16 z-10 font-serif">
                    {/* 1. Блок "КОГДА?" со своей анимацией */}
                    <motion.div
                        {...animateOnScroll}
                        className="flex flex-col gap-2 justify-start"
                    >
                        <h2 className="text-slate-900 text-6xl flex items-center gap-3">
                            <motion.span
                                animate={{ rotate: [-12, 12, -12] }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                className="inline-flex items-center justify-center"
                            >
                                <Flower className="w-12 h-12" />
                            </motion.span>
                            <span>КОГДА?</span>
                        </h2>
                        <p className="text-2xl text-slate-900">
                            Будем рады видеть вас 24 ноября в 15:00
                        </p>
                    </motion.div>

                    {/* 2. Блок "ГДЕ?" со своей анимацией */}
                    <motion.div
                        {...animateOnScroll}
                        className="flex flex-col gap-2 justify-end my-8"
                    >
                        <h2 className="text-slate-900 text-6xl flex items-center justify-end gap-3">
                            <motion.span
                                animate={{ rotate: [-12, 12, -12] }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                className="inline-flex items-center justify-center"
                            >
                                <Flower className="w-12 h-12" />
                            </motion.span>
                            <span>ГДЕ?</span>
                        </h2>
                        <p className="text-2xl text-slate-900 text-end">
                            Ресторан{' '}
                            <a
                                href="https://leslis.ru/"
                                target="_blank"
                                className="text-[#606c93] underline cursor-pointer"
                            >
                                «Лес и Лис»
                            </a>
                            , Белгород, ул.Волчанская 292Б
                        </p>
                    </motion.div>

                    {/* 3. Кнопка со своей анимацией */}
                    <motion.button
                        {...animateOnScroll}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            window.open(
                                'https://yandex.ru/maps/-/CTwpEV7N',
                                '_blank'
                            );
                        }}
                        className="px-0 py-4 border-2 border-black bg-transparent text-2xl font-normal tracking-wider uppercase font-serif
                                         hover:bg-black text-slate-900 transition-all duration-300 ease-in-out
                                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-black"
                    >
                        открыть карту →
                    </motion.button>
                </div>
            </section>
        </ComponentContainer>
    );
};
