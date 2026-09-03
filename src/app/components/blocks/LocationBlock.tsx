'use client';

import { motion } from 'framer-motion';
import { ComponentContainer } from '../../ui/layout/ComponentContainer';
import { GlassPanel } from '../../ui/layout/GlassPanel';
import { Flower } from 'lucide-react';

export const LocationBlock = () => {
    const animateOnScroll = {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.8, ease: 'easeOut' as const },
    };

    return (
        <ComponentContainer className="relative flex items-center justify-center px-4 sm:px-6 py-12">
            <GlassPanel className="w-full max-w-lg p-8 sm:p-12 font-serif text-slate-900">
                <div className="flex flex-col gap-10 z-10">
                    <motion.div
                        {...animateOnScroll}
                        className="flex flex-col gap-2"
                    >
                        <h2 className="text-5xl sm:text-6xl flex items-center gap-3">
                            <motion.span
                                animate={{ rotate: [-12, 12, -12] }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                className="inline-flex items-center justify-center"
                            >
                                <Flower className="w-10 h-10 sm:w-12 sm:h-12" />
                            </motion.span>
                            <span>КОГДА?</span>
                        </h2>
                        <p className="text-xl sm:text-2xl">
                            Будем рады видеть вас 24 ноября в 15:00
                        </p>
                    </motion.div>

                    <motion.div
                        {...animateOnScroll}
                        className="flex flex-col gap-2"
                    >
                        <h2 className="text-5xl sm:text-6xl flex items-center justify-end gap-3">
                            <motion.span
                                animate={{ rotate: [-12, 12, -12] }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                className="inline-flex items-center justify-center"
                            >
                                <Flower className="w-10 h-10 sm:w-12 sm:h-12" />
                            </motion.span>
                            <span>ГДЕ?</span>
                        </h2>
                        <p className="text-xl sm:text-2xl text-end">
                            Ресторан{' '}
                            <a
                                href="https://leslis.ru/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#606c93] underline cursor-pointer"
                            >
                                «Лес и Лис»
                            </a>
                            , Белгород, ул.Волчанская 292Б
                        </p>
                    </motion.div>

                    <motion.button
                        {...animateOnScroll}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            window.open(
                                'https://yandex.ru/maps/-/CTwpEV7N',
                                '_blank',
                            );
                        }}
                        className="w-full px-4 py-4 border-2 border-black bg-transparent text-xl sm:text-2xl font-normal tracking-wider uppercase font-serif
                                   hover:bg-black hover:text-white text-slate-900 transition-all duration-300 ease-in-out"
                    >
                        открыть карту →
                    </motion.button>
                </div>
            </GlassPanel>
        </ComponentContainer>
    );
};
