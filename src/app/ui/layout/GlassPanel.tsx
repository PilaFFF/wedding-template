import React, { FC } from 'react';

interface IProps {
    children: React.ReactNode;
    className?: string;
}

/** Стеклянная карточка поверх шейдерного фона */
export const GlassPanel: FC<IProps> = ({ children, className = '' }) => {
    return (
        <div
            className={`backdrop-blur-md bg-white/30 rounded-3xl border border-white/40 shadow-2xl ${className}`}
        >
            {children}
        </div>
    );
};
