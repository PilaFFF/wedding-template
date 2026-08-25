'use client';

import { useEffect, useState } from 'react';
import { ScheduleBlock } from './components/blocks/ScheduleBlock';
import { DressCodeBlock } from './components/blocks/DressCodeBlock';
import { FormBlock } from './components/blocks/FormBlock';
import { ContactsBlock } from './components/blocks/ContactsBlock';
import { LocationBlock } from './components/blocks/LocationBlock';
import { HeroSection } from './components/blocks/HeroSection';

export default function Home() {
    const [isUnlocked, setIsUnlocked] = useState(false);

    // Пока замок закрыт — скролл заблокирован
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
        <main
            className={`w-full bg-[#FDFBF7] ${
                isUnlocked
                    ? 'min-h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth'
                    : 'h-screen overflow-hidden'
            }`}
        >
            {/* Первый экран с анимацией замочка и приглашения */}
            <HeroSection
                isUnlocked={isUnlocked}
                onUnlock={() => setIsUnlocked(true)}
            />

            {/* Блоки сайта появляются и становятся доступны только после клика */}
            {isUnlocked && (
                <div className="w-full">
                    <div className="w-full snap-start snap-always">
                        <LocationBlock />
                    </div>
                    <div className="w-full snap-start snap-always">
                        <ScheduleBlock />
                    </div>
                    <div className="w-full snap-start snap-always">
                        <DressCodeBlock />
                    </div>
                    <div className="w-full snap-start snap-always">
                        <FormBlock />
                    </div>
                    <div className="w-full snap-start snap-always">
                        <ContactsBlock />
                    </div>
                </div>
            )}
        </main>
    );
}
