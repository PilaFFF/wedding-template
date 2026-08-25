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
        <div className="w-full h-full relative">
            <ComponentContainer className={`${beigeBg} h-full`}>
                <div className="relative h-full w-full flex flex-col items-center justify-center gap-8 px-6">
                    {/* Видео-плашка с layoutId */}
                    <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 shrink-0 pointer-events-none">
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

                    {/* Кнопка анлока */}
                    <motion.button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onUnlock();
                        }}
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
                        className="flex flex-col items-center gap-3 cursor-pointer p-6 border-none bg-transparent outline-none active:scale-95 transition-transform"
                    >
                        <div className="text-slate-800">
                            {isUnlocked ? (
                                <LockKeyholeOpenIcon className="w-10 h-10" />
                            ) : (
                                <LockKeyholeIcon className="w-10 h-10" />
                            )}
                        </div>

                        <span className="font-serif text-slate-700 text-lg tracking-wide select-none">
                            Разблокируйте приглашение
                        </span>
                    </motion.button>
                </div>
            </ComponentContainer>
        </div>
    );
};
