'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { ComponentContainer } from '../../ui/layout/ComponentContainer';

export const ContactsBlock = () => {
    return (
        <ComponentContainer className="bg-[#FDFBF7]">
            <section className="relative h-full w-full flex flex-col items-center justify-center text-center px-6 py-12 sm:py-16 font-serif text-slate-900">
                <div className="w-full max-w-lg mx-auto space-y-10 sm:space-y-12">
                    {/* --- БЛОК 1: КОНТАКТЫ --- */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="flex flex-col items-center space-y-4"
                    >
                        {/* Каллиграфический заголовок */}
                        <h2 className="text-5xl sm:text-6xl md:text-7xl font-serif italic tracking-wide">
                            Контакты
                        </h2>

                        <div className="text-lg sm:text-xl md:text-2xl font-normal leading-relaxed text-slate-900">
                            <p>Наш организатор</p>
                            <p className="font-medium">Александра</p>
                        </div>

                        {/* Телефон */}
                        <a
                            href="tel:+79999999999"
                            className="text-lg sm:text-xl md:text-2xl tracking-wider hover:opacity-75 transition-opacity pt-1"
                        >
                            +7 999 999-99-99
                        </a>

                        {/* Кнопка WhatsApp */}
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

                    {/* --- БЛОК 2: ЧАТ ГОСТЕЙ --- */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{
                            duration: 0.6,
                            delay: 0.2,
                            ease: 'easeOut',
                        }}
                        className="flex flex-col items-center space-y-6 pt-4"
                    >
                        {/* Каллиграфический заголовок */}
                        <h2 className="text-5xl sm:text-6xl md:text-7xl font-serif italic tracking-wide">
                            Чат гостей
                        </h2>

                        {/* Описание */}
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
            </section>
        </ComponentContainer>
    );
};
