import React, { FC } from 'react';

interface IProps {
    children: React.ReactNode;
    className?: string;
}

export const ComponentContainer: FC<IProps> = ({ children, className }) => {
    return <div className={`h-screen w-full ${className}`}>{children}</div>;
};
