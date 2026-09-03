'use client';

import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useScroll, useSpring } from 'framer-motion';
import * as THREE from 'three';

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

    float wave1 = sin(uv.x * 3.0 + uTime * 0.5 + uScroll * 2.0);
    float wave2 = cos(uv.y * 3.0 + uTime * 0.3 - uScroll * 1.5);
    float noise = wave1 * wave2;

    vec3 c1 = vec3(0.09, 0.09, 0.10);
    vec3 c2 = vec3(0.58, 0.64, 0.72);
    vec3 c3 = vec3(0.80, 0.84, 0.88);
    vec3 c4 = vec3(0.95, 0.96, 0.98);

    float mix1 = smoothstep(-1.0, 1.0, noise + sin(uScroll * 3.0));
    float mix2 = smoothstep(-0.5, 0.5, cos(noise + uTime * 0.2));

    vec3 color = mix(mix(c4, c3, mix1), mix(c2, c1, mix2), uv.y + noise * 0.3);

    gl_FragColor = vec4(color, 1.0);
  }
`;

const ShaderMesh = ({ scrollProgress }: { scrollProgress: number }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uScroll: { value: 0 },
        }),
        [],
    );

    useFrame((state) => {
        if (!meshRef.current) return;
        const material = meshRef.current.material as THREE.ShaderMaterial;
        material.uniforms.uTime.value = state.clock.getElapsedTime();
        material.uniforms.uScroll.value = scrollProgress;
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

/** Фиксированный жидкий фон на всю страницу, реагирует на скролл */
export const ShaderPageBackground = () => {
    const { scrollYProgress } = useScroll();
    const smoothScroll = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 25,
    });
    const [scrollVal, setScrollVal] = useState(0);

    useEffect(() => {
        return smoothScroll.on('change', (latest) => setScrollVal(latest));
    }, [smoothScroll]);

    return (
        <div
            aria-hidden
            className="fixed inset-0 z-0 pointer-events-none"
        >
            <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]}>
                <ShaderMesh scrollProgress={scrollVal} />
            </Canvas>
        </div>
    );
};
