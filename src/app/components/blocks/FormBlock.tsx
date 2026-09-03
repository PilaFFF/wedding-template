'use client';

import { motion, Variants, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ComponentContainer } from '../../ui/layout/ComponentContainer';
import { GlassPanel } from '../../ui/layout/GlassPanel';
import { sendTelegramMessage } from '@/app/rsvp/route';

const blockVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: (customDelay: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
            delay: customDelay,
        },
    }),
};

const errorAnimation = {
    hidden: { opacity: 0, y: -5, height: 0 },
    visible: { opacity: 1, y: 0, height: 'auto' },
    exit: { opacity: 0, y: -5, height: 0 },
};

const ATTENDANCE_OPTIONS = [
    'Буду один / одна',
    'Буду с парой',
    'К сожалению, не смогу прийти',
    'Отвечу позже',
];

const DRINK_OPTIONS = [
    { label: 'Белое вино', id: 'white_wine' },
    { label: 'Красное вино', id: 'red_wine' },
    { label: 'Шампанское', id: 'champagne' },
    { label: 'Водка', id: 'vodka' },
    { label: 'Коньяк', id: 'cognac' },
    { label: 'Не пью алкоголь', id: 'non_alcoholic' },
];

interface FormErrors {
    fullName?: string;
    attendance?: string;
}

export const FormBlock = () => {
    const [fullName, setFullName] = useState('');
    const [attendance, setAttendance] = useState<string>('');
    const [drinks, setDrinks] = useState<string[]>([]);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const fireConfetti = () => {
        // Красивый двойной залп конфетти по бокам экрана
        confetti({
            particleCount: 80,
            spread: 60,
            origin: { x: 0.2, y: 0.6 },
            disableForReducedMotion: true,
        });
        confetti({
            particleCount: 80,
            spread: 60,
            origin: { x: 0.8, y: 0.6 },
            disableForReducedMotion: true,
        });
    };

    const handleDrinkToggle = (label: string) => {
        setDrinks((prev) =>
            prev.includes(label)
                ? prev.filter((item) => item !== label)
                : [...prev, label],
        );
    };

    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        if (!fullName.trim()) {
            newErrors.fullName = 'Пожалуйста, укажите ваши ФИО';
        }

        if (!attendance) {
            newErrors.attendance = 'Пожалуйста, выберите вариант присутствия';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setIsSubmitting(true);

        const success = await sendTelegramMessage({
            fullName: fullName.trim(),
            attendance,
            drinks,
        });

        setIsSubmitting(false);
        if (success) {
            setIsSent(true);
            fireConfetti(); // Запуск конфетти после успешной отправки
            setFullName('');
            setAttendance('');
            setDrinks([]);
            setErrors({});
        } else {
            setErrors({
                fullName: 'Не удалось отправить данные. Попробуйте позже.',
            });
        }
    };

    return (
        <ComponentContainer className="relative flex items-center justify-center px-4 sm:px-6 py-8">
            <GlassPanel className="w-full max-w-2xl p-6 sm:p-10 font-serif text-black overflow-y-auto max-h-[90vh]">
                {isSent ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-6"
                    >
                        <h3 className="text-3xl font-normal mb-4">Спасибо!</h3>
                        <p className="text-xl text-gray-800">
                            Ваш ответ успешно отправлен в Telegram.
                        </p>
                    </motion.div>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5 text-left"
                    >
                        {/* --- БЛОК 1: ФИО --- */}
                        <motion.div
                            custom={0.3}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            variants={blockVariants}
                            className="space-y-4"
                        >
                            <label className="block text-xl font-bold tracking-wide leading-tight">
                                Напишите, пожалуйста, Ваше ФИО
                            </label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => {
                                    setFullName(e.target.value);
                                    if (errors.fullName) {
                                        setErrors((prev) => ({
                                            ...prev,
                                            fullName: undefined,
                                        }));
                                    }
                                }}
                                placeholder="Человек-паук 🕷️"
                                className={`w-full p-4 border bg-none transition-colors outline-none focus:ring-1 font-sans text-lg ${
                                    errors.fullName
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-black focus:ring-black'
                                }`}
                            />
                            <AnimatePresence>
                                {errors.fullName && (
                                    <motion.p
                                        variants={errorAnimation}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="text-red-600 text-sm font-sans pt-1"
                                    >
                                        {errors.fullName}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* --- БЛОК 2: Присутствие --- */}
                        <motion.div
                            custom={0.5}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            variants={blockVariants}
                            className="space-y-5"
                        >
                            <h3 className="text-xl font-bold tracking-wide leading-tight">
                                Сможете ли присутствовать на нашем торжестве?
                            </h3>
                            <div className="space-y-4">
                                {ATTENDANCE_OPTIONS.map((option, index) => (
                                    <label
                                        key={index}
                                        className="flex items-center space-x-3 cursor-pointer select-none text-xl group"
                                    >
                                        <div className="relative flex items-center justify-center">
                                            <input
                                                type="radio"
                                                name="attendance"
                                                value={option}
                                                checked={attendance === option}
                                                onChange={(e) => {
                                                    setAttendance(
                                                        e.target.value,
                                                    );
                                                    if (errors.attendance) {
                                                        setErrors((prev) => ({
                                                            ...prev,
                                                            attendance:
                                                                undefined,
                                                        }));
                                                    }
                                                }}
                                                className={`peer appearance-none w-6 h-6 border-2 rounded-full cursor-pointer checked:bg-black transition-colors ${
                                                    errors.attendance
                                                        ? 'border-red-500'
                                                        : 'border-black'
                                                }`}
                                            />
                                            <div className="absolute w-2.5 h-2.5 bg-neutral-100 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                                        </div>
                                        <span className="group-hover:text-gray-700 transition-colors">
                                            {option}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            <AnimatePresence>
                                {errors.attendance && (
                                    <motion.p
                                        variants={errorAnimation}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="text-red-600 text-sm font-sans pt-1"
                                    >
                                        {errors.attendance}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* --- БЛОК 3: Напитки --- */}
                        <motion.div
                            custom={0.7}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={blockVariants}
                            className="space-y-5"
                        >
                            <h3 className="text-xl font-bold tracking-wide">
                                Что предпочитаете из напитков?
                            </h3>
                            <div className="space-y-2">
                                {DRINK_OPTIONS.map((option) => (
                                    <label
                                        key={option.id}
                                        className="flex items-center space-x-3 cursor-pointer select-none text-lg group"
                                    >
                                        <div className="relative flex items-center justify-center">
                                            <input
                                                type="checkbox"
                                                id={option.id}
                                                checked={drinks.includes(
                                                    option.label,
                                                )}
                                                onChange={() =>
                                                    handleDrinkToggle(
                                                        option.label,
                                                    )
                                                }
                                                className="peer appearance-none w-6 h-6 border-2 border-black rounded-none cursor-pointer checked:bg-black transition-colors"
                                            />
                                            <svg
                                                className="absolute w-4 h-4 text-neutral-100 opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                        <span className="group-hover:text-gray-700 transition-colors">
                                            {option.label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </motion.div>

                        {/* --- БЛОК 4: Кнопка --- */}
                        <motion.div
                            custom={0.9}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={blockVariants}
                            className="pt-0 text-center"
                        >
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-16 py-4 border-2 border-black bg-transparent text-2xl font-normal tracking-wider uppercase font-serif
                                         hover:bg-black hover:text-white transition-all duration-300 ease-in-out
                                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-black"
                            >
                                {isSubmitting ? 'Отправка...' : 'Отправить'}
                            </button>
                        </motion.div>
                    </form>
                )}
            </GlassPanel>
        </ComponentContainer>
    );
};
