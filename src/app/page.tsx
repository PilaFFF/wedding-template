'use client';

import { ScheduleBlock } from './components/blocks/ScheduleBlock';
import { DressCodeBlock } from './components/blocks/DressCodeBlock';
import { FormBlock } from './components/blocks/FormBlock';
import { ContactsBlock } from './components/blocks/ContactsBlock';
import { LocationBlock } from './components/blocks/LocationBlock';
import { HeroSection } from './components/blocks/HeroSection';

export default function Home() {
    return (
        <main className="w-full h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-[#FDFBF7]">
            {/* Первые два экрана (Замок -> Имена) */}
            <HeroSection />

            {/* Остальные блоки сайта */}
            <div className="w-full snap-start">
                <LocationBlock />
            </div>
            <div className="w-full snap-start">
                <ScheduleBlock />
            </div>
            <div className="w-full snap-start">
                <DressCodeBlock />
            </div>
            <div className="w-full snap-start">
                <FormBlock />
            </div>
            <div className="w-full snap-start">
                <ContactsBlock />
            </div>
        </main>
    );
}
