'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { NamesBlock } from './components/blocks/NamesBlock';
import { ScheduleBlock } from './components/blocks/ScheduleBlock';
import { MainContainer } from './ui/layout/MainContainer';
import { LocationBlock } from './components/blocks/LocationBlock';
import { DressCodeBlock } from './components/blocks/DressCodeBlock';
import { FormBlock } from './components/blocks/FormBlock';
import { ContactsBlock } from './components/blocks/ContactsBlock';
import { StartBlock } from './components/blocks/StartBlock';

export default function Home() {
    const [isUnlocked, setIsUnlocked] = useState(false);

    // Блокируем скролл страницы на уровне body
    useEffect(() => {
        if (!isUnlocked) {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
        } else {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        };
    }, [isUnlocked]);

    return (
        <MainContainer>
            {/* Первый экран */}
            <div className="grid grid-cols-1 grid-rows-1 w-full h-screen overflow-hidden">
                <LayoutGroup id="invite-unlock">
                    <div className="col-start-1 row-start-1 w-full h-full z-10">
                        <NamesBlock isUnlocked={isUnlocked} />
                    </div>

                    <AnimatePresence>
                        {!isUnlocked && (
                            <div className="col-start-1 row-start-1 w-full h-full z-20">
                                <StartBlock
                                    onUnlock={() => setIsUnlocked(true)}
                                    isUnlocked={isUnlocked}
                                />
                            </div>
                        )}
                    </AnimatePresence>
                </LayoutGroup>
            </div>

            {/* Остальные блоки: задаем w-full, чтобы они не сжимались, 
                и отключаем взаимодействие до клика */}
            <div
                className={`w-full ${
                    !isUnlocked
                        ? 'pointer-events-none select-none aria-hidden'
                        : ''
                }`}
            >
                <ScheduleBlock />
                <LocationBlock />
                <DressCodeBlock />
                <FormBlock />
                <ContactsBlock />
            </div>
        </MainContainer>
    );
}
