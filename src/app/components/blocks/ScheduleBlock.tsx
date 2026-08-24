import { motion } from 'framer-motion';
import React from 'react';
import { ComponentContainer } from '../../ui/layout/ComponentContainer';
import { beigeBg } from '@/app/consts/constColors.const';

export const ScheduleBlock = () => {
    return (
        <ComponentContainer className={beigeBg}>
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-center mb-16 z-10"
            >
                <span className="text-slate-900 text-lg">Расписание</span>
            </motion.section>
        </ComponentContainer>
    );
};
