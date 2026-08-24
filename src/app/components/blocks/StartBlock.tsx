'use client';

import { motion } from 'framer-motion';
import { ComponentContainer } from '../../ui/layout/ComponentContainer';
import { beigeBg } from '@/app/consts/constColors.const';
import { LockKeyholeIcon, LockKeyholeOpenIcon } from 'lucide-react';

interface IProps {
    onUnlock: () => void;
    isUnlocked: boolean;
}

const VIDEO_URL =
    'https://b4701886-2e3c-4a60-9e9f-056bd416f1cc.selstorage.ru/pp.mp4';

export const StartBlock = ({ onUnlock, isUnlocked }: IProps) => {
    return (
        <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="w-full h-full"
        >
            <ComponentContainer className={beigeBg}>
                <div className="relative h-full w-full flex flex-col items-center justify-center gap-10 px-6">
                    <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 shrink-0">
                        {/* Видео расширяется во весь экран */}
                        <motion.div
                            layoutId="invite-square"
                            className="absolute inset-0 overflow-hidden rounded-2xl shadow-xl"
                            transition={{
                                duration: 1.2,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <video
                                src={VIDEO_URL}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>

                    {/* Обертка для кнопки и текста с анимацией исчезновения (scale + opacity) */}
                    <motion.div
                        className="flex flex-col items-center gap-3 z-10"
                        initial={false}
                        animate={
                            isUnlocked
                                ? {
                                      scale: 1.6,
                                      opacity: 0,
                                      filter: 'blur(4px)',
                                  }
                                : { scale: 1, opacity: 1, filter: 'blur(0px)' }
                        }
                        transition={{
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        <motion.button
                            type="button"
                            onClick={onUnlock}
                            disabled={isUnlocked}
                            aria-label="Разблокировать приглашение"
                            className="text-slate-800 cursor-pointer focus-visible:outline-none rounded-sm disabled:cursor-default"
                            whileHover={
                                isUnlocked ? undefined : { scale: 1.08 }
                            }
                            whileTap={isUnlocked ? undefined : { scale: 0.95 }}
                        >
                            {isUnlocked ? (
                                <LockKeyholeOpenIcon className="w-10 h-10" />
                            ) : (
                                <LockKeyholeIcon className="w-10 h-10" />
                            )}
                        </motion.button>

                        <p className="font-serif text-slate-700 text-lg tracking-wide select-none">
                            Разблокируйте приглашение
                        </p>
                    </motion.div>
                </div>
            </ComponentContainer>
        </motion.div>
    );
};
