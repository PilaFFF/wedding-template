'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vercelHeroShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;

  varying vec2 vUv;

  vec3 spectralColor(float t) {
    t = fract(t);
    vec3 c0 = vec3(1.000, 0.271, 0.000); 
    vec3 c1 = vec3(1.000, 0.000, 0.498); 
    vec3 c2 = vec3(0.475, 0.157, 0.792); 
    vec3 c3 = vec3(0.000, 0.439, 0.953); 
    vec3 c4 = vec3(0.000, 0.875, 0.847); 

    float s = t * 5.0;
    float i = floor(s);
    float f = fract(s);
    f = f * f * (3.0 - 2.0 * f);

    if (i < 1.0) return mix(c0, c1, f);
    if (i < 2.0) return mix(c1, c2, f);
    if (i < 3.0) return mix(c2, c3, f);
    if (i < 4.0) return mix(c3, c4, f);
    return mix(c4, c0, f);
  }

  float sdCircle(vec2 p, float r) {
    return length(p) - r;
  }

  void main() {
    vec2 st = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
    vec2 mouse = (uMouse - 0.5 * uResolution.xy) / uResolution.y;

    vec2 dots[10];
    float spacing = 0.12;
    float startY = 0.18;

    dots[0] = vec2(0.0, startY);
    dots[1] = vec2(-spacing * 0.5, startY - spacing);
    dots[2] = vec2(spacing * 0.5, startY - spacing);
    dots[3] = vec2(-spacing, startY - spacing * 2.0);
    dots[4] = vec2(0.0, startY - spacing * 2.0);
    dots[5] = vec2(spacing, startY - spacing * 2.0);
    dots[6] = vec2(-spacing * 1.5, startY - spacing * 3.0);
    dots[7] = vec2(-spacing * 0.5, startY - spacing * 3.0);
    dots[8] = vec2(spacing * 0.5, startY - spacing * 3.0);
    dots[9] = vec2(spacing * 1.5, startY - spacing * 3.0);

    vec2 lightOrigin = mouse;
    vec2 ray = st - lightOrigin;
    float distToLight = length(ray);

    vec2 rayDir = distToLight > 0.0001 ? ray / distToLight : vec2(0.0, 1.0);

    float shadow = 1.0;
    float dotRadius = 0.038;

    for (int i = 0; i < 10; i++) {
      vec2 dotPos = dots[i];
      vec2 toDot = dotPos - lightOrigin;
      float proj = dot(toDot, rayDir);

      if (proj > 0.001) {
        vec2 closestPoint = lightOrigin + rayDir * proj;
        float distToRay = length(dotPos - closestPoint);
        
        float penumbra = dotRadius + proj * 0.05;
        float s = smoothstep(dotRadius * 0.15, penumbra, distToRay);

        // Плавная маска глубины: убирает ступенчатый артефакт среза тени на границе сферы
        float depthMask = smoothstep(-dotRadius, dotRadius * 1.5, distToLight - proj);

        float dotShadow = mix(1.0, s, depthMask);
        shadow = min(shadow, dotShadow);
      }
    }

    float angle = atan(ray.y, ray.x);
    float hue = (angle / 6.28318530718) + 0.5 + uTime * 0.03;
    vec3 glowColor = spectralColor(hue);

    float glow = exp(-distToLight * distToLight * 4.5);
    float core = exp(-distToLight * distToLight * 80.0);
    glowColor = mix(glowColor, vec3(1.0), core);

    vec3 finalBg = glowColor * glow * (0.15 + 0.85 * shadow);

    // Отрисовка чистых сфер
    vec3 dotsLayer = vec3(0.0);
    float alphaLayer = 0.0;

    for (int i = 0; i < 10; i++) {
      float d = sdCircle(st - dots[i], dotRadius);
      float distToMouse = length(dots[i] - mouse);
      float mouseIntensity = exp(-distToMouse * distToMouse * 45.0);

      float circleMask = 1.0 - smoothstep(0.0, 0.002, d);
      vec3 sphereColor = mix(vec3(0.18, 0.18, 0.22), vec3(1.0), mouseIntensity);

      if (d < 0.0) {
        dotsLayer = sphereColor;
        alphaLayer = circleMask;
      }
    }

    vec3 color = mix(finalBg, dotsLayer, alphaLayer);
    gl_FragColor = vec4(color, 1.0);
  }
`;

function VercelShaderQuad() {
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const targetMouse = useRef(new THREE.Vector2(0, 0));

    useFrame(({ clock, pointer, size }) => {
        const mat = materialRef.current;
        if (!mat) return;

        mat.uniforms.uTime.value = clock.getElapsedTime();
        mat.uniforms.uResolution.value.set(size.width, size.height);

        const mouseX = ((pointer.x + 1) / 2) * size.width;
        const mouseY = ((pointer.y + 1) / 2) * size.height;

        targetMouse.current.set(mouseX, mouseY);
        mat.uniforms.uMouse.value.lerp(targetMouse.current, 0.08);
    });

    return (
        <mesh>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position.xy, 0.0, 1.0);
          }
        `}
                fragmentShader={vercelHeroShader}
                uniforms={{
                    uTime: { value: 0 },
                    uMouse: { value: new THREE.Vector2(0, 0) },
                    uResolution: { value: new THREE.Vector2(1, 1) },
                }}
                depthWrite={false}
            />
        </mesh>
    );
}

export function VercelReactiveHero() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="h-screen w-full bg-[#050505]" />;
    }

    return (
        <div className="relative h-screen w-full overflow-hidden bg-[#050505]">
            <Canvas
                camera={{ position: [0, 0, 1] }}
                gl={{ antialias: true, alpha: false }}
                className="absolute inset-0 h-full w-full"
            >
                <VercelShaderQuad />
            </Canvas>
        </div>
    );
}
