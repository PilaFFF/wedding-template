'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ComponentContainer } from '../../ui/layout/ComponentContainer';
import { ChevronDown } from 'lucide-react';

// --- GLSL ШЕЙДЕР ДЛЯ ЖИДКОГО ФОНА ---
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uScroll;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // Создаем мягкие волны искажения
    float wave1 = sin(uv.x * 3.0 + uTime * 0.5 + uScroll * 2.0);
    float wave2 = cos(uv.y * 3.0 + uTime * 0.3 - uScroll * 1.5);
    float noise = wave1 * wave2;

    // Палитра бренда (Черный, Серо-голубой, Серый, Молочный)
    vec3 c1 = vec3(0.09, 0.09, 0.10); // #18181B
    vec3 c2 = vec3(0.58, 0.64, 0.72); // #94A3B8
    vec3 c3 = vec3(0.80, 0.84, 0.88); // #CBD5E1
    vec3 c4 = vec3(0.95, 0.96, 0.98); // #F1F5F9

    // Смешивание цветов по шуму и скроллу
    float mix1 = smoothstep(-1.0, 1.0, noise + sin(uScroll * 3.0));
    float mix2 = smoothstep(-0.5, 0.5, cos(noise + uTime * 0.2));

    vec3 color = mix(mix(c4, c3, mix1), mix(c2, c1, mix2), uv.y + noise * 0.3);

    gl_FragColor = vec4(color, 1.0);
  }
`;

// Компонент Mesh с шейдером внутри Canvas
const ShaderBackground = ({ scrollProgress }: { scrollProgress: number }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uScroll: { value: 0 },
        }),
        [],
    );

    useFrame((state) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.ShaderMaterial;
            material.uniforms.uTime.value = state.clock.getElapsedTime();
            material.uniforms.uScroll.value = scrollProgress;
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
};

const PALETTE_COLORS = [
    { bg: 'bg-[#18181B]', label: 'Графит' },
    { bg: 'bg-[#94A3B8]', label: 'Стальной' },
    { bg: 'bg-[#CBD5E1]', label: 'Серебро' },
    { bg: 'bg-[#F1F5F9]', label: 'Молочный' },
];

export const DressCodeBlock = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const smoothScroll = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 25,
    });

    const [scrollVal, setScrollVal] = React.useState(0);

    React.useEffect(() => {
        return smoothScroll.on('change', (latest) => setScrollVal(latest));
    }, [smoothScroll]);

    // Анимации проявления карточек
    const cardScale = useTransform(
        smoothScroll,
        [0.2, 0.5, 0.8],
        [0.9, 1, 0.9],
    );

    return (
        <ComponentContainer className="relative min-h-screen py-12 flex flex-col justify-between overflow-hidden">
            {/* 1. ФОНОВЫЙ ШЕЙДЕР */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <ShaderBackground scrollProgress={scrollVal} />
                </Canvas>
            </div>

            {/* 2. КОНТЕНТ БЛОКА */}
            <motion.section
                ref={sectionRef}
                style={{ scale: cardScale }}
                className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg mx-auto my-auto backdrop-blur-md bg-white/30 p-8 sm:p-12 rounded-3xl border border-white/40 shadow-2xl"
            >
                <h2 className="font-serif italic text-5xl md:text-6xl text-slate-900 tracking-wide mb-6 select-none">
                    Дресс-код
                </h2>

                <p className="text-slate-800 text-base md:text-lg font-light leading-relaxed mb-10">
                    Будем признательны, если при выборе нарядов вы придержитесь
                    цветовой палитры нашего праздника
                </p>

                {/* Сетка цветов палитры с Glassmorphism */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                    {PALETTE_COLORS.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/50"
                        >
                            <div
                                className={`w-12 h-12 rounded-full shadow-md border border-black/10 ${item.bg}`}
                            />
                            <span className="text-xs font-sans text-slate-700 tracking-wider uppercase">
                                {item.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Призыв к действию */}
            <div className="relative z-10 flex flex-col items-center gap-2 opacity-70 text-center pb-4">
                <span className="text-xs tracking-widest text-slate-800 uppercase font-light">
                    Пожалуйста, заполните анкету ниже
                </span>
                <ChevronDown className="w-5 h-5 text-slate-800 animate-bounce" />
            </div>
        </ComponentContainer>
    );
};
