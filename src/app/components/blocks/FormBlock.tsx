import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { ComponentContainer } from '../../ui/layout/ComponentContainer';
import { beigeBg, greenBg } from '@/app/consts/constColors.const';

export const FormBlock = () => {
    const [formData, setFormData] = useState({
        name: '',
        attending: true,
        drink: 'Вино',
    });

    return (
        <ComponentContainer className={greenBg}>
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-center mb-16 z-10"
            >
                <span className="text-slate-900 text-lg">Анкета</span>
            </motion.section>
        </ComponentContainer>
    );
};
