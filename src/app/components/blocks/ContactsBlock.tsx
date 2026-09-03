'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { ComponentContainer } from '../../ui/layout/ComponentContainer';
import { GlassPanel } from '../../ui/layout/GlassPanel';

export const ContactsBlock = () => {
    return (
        <ComponentContainer className="relative flex items-center justify-center px-4 sm:px-6 py-12">
            <GlassPanel className="w-full max-w-lg p-8 sm:p-12 font-serif text-slate-900 text-center">
                <div className="space-y-10 sm:space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="flex flex-col items-center space-y-4"
                    >
                        <h2 className="text-5xl sm:text-6xl md:text-7xl font-serif italic tracking-wide">
                            Контакты
                        </h2>

                        <div className="text-lg sm:text-xl md:text-2xl font-normal leading-relaxed">
                            <p>Наш организатор</p>
                            <p className="font-medium">Александра</p>
                        </div>

                        <a
                            href="tel:+79999999999"
                            className="text-lg sm:text-xl md:text-2xl tracking-wider hover:opacity-75 transition-opacity pt-1"
                        >
                            +7 999 999-99-99
                        </a>

                        <div className="pt-2">
                            <a
                                href="https://wa.me/79999999999"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-black text-white font-bold px-10 py-3.5 rounded-full text-lg sm:text-xl font-serif tracking-wide shadow-md hover:scale-105 active:scale-95 transition-transform duration-200"
                            >
                                WhatsApp
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{
                            duration: 0.6,
                            delay: 0.2,
                            ease: 'easeOut',
                        }}
                        className="flex flex-col items-center space-y-6 pt-2"
                    >
                        <h2 className="text-5xl sm:text-6xl md:text-7xl font-serif italic tracking-wide">
                            Чат гостей
                        </h2>

                        <div className="space-y-4 text-base sm:text-lg md:text-xl leading-relaxed text-slate-800 max-w-md">
                            <p>
                                Дорогие гости! Мы создали группу в Telegram, где
                                будет основная информация по торжеству. А также
                                можно будет добавлять фото и видео со свадьбы.
                            </p>
                            <p>
                                Давайте поделимся друг с другом счастливыми
                                моментами этого важного дня!
                            </p>
                        </div>
                        <div className="pt-2">
                            <a
                                href="https://wa.me/79999999999"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-black font-bold text-white px-10 py-3.5 rounded-full text-lg sm:text-xl font-serif tracking-wide shadow-md hover:scale-105 active:scale-95 transition-transform duration-200"
                            >
                                Присоединиться к чату
                            </a>
                        </div>
                    </motion.div>
                </div>
            </GlassPanel>
        </ComponentContainer>
    );
};
