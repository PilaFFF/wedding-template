import React, { FC } from 'react';

interface IProps {
    children: React.ReactNode;
}

export const MainContainer: FC<IProps> = ({ children }) => {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
            {children}
        </main>
    );
};
