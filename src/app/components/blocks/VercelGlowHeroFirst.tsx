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

  // Чистые насыщенные цвета для каждой точки
  vec3 getDotColor(int index) {
    if (index == 0) return vec3(1.000, 0.271, 0.000); // Оранжевый
    if (index == 1) return vec3(1.000, 0.000, 0.498); // Пинковый
    if (index == 2) return vec3(0.800, 0.100, 0.900); // Пурпурный
    if (index == 3) return vec3(0.475, 0.157, 0.792); // Фиолетовый
    if (index == 4) return vec3(0.000, 0.439, 0.953); // Синий
    if (index == 5) return vec3(0.000, 0.875, 0.847); // Бирюзовый
    if (index == 6) return vec3(0.000, 0.850, 0.450); // Зеленый
    if (index == 7) return vec3(1.000, 0.750, 0.000); // Желтый
    if (index == 8) return vec3(1.000, 0.200, 0.400); // Коралловый
    return vec3(0.200, 0.600, 1.000);                 // Лазурный
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

    float dotRadius = 0.038;
    float activations[10];

    for (int i = 0; i < 10; i++) {
      float distToMouse = length(dots[i] - mouse);
      float act = exp(-distToMouse * distToMouse * 55.0);
      activations[i] = act > 0.01 ? act : 0.0;
    }

    vec3 totalLight = vec3(0.0);

    for (int i = 0; i < 10; i++) {
      float act = activations[i];
      if (act <= 0.0) continue;

      vec2 lightOrigin = dots[i];
      vec2 ray = st - lightOrigin;
      float distToLight = length(ray);
      vec2 rayDir = distToLight > 0.0001 ? ray / distToLight : vec2(0.0, 1.0);

      float shadow = 1.0;

      for (int j = 0; j < 10; j++) {
        if (i == j) continue;

        vec2 obstaclePos = dots[j];
        vec2 toObstacle = obstaclePos - lightOrigin;
        float proj = dot(toObstacle, rayDir);

        if (proj > 0.001) {
          vec2 closestPoint = lightOrigin + rayDir * proj;
          float distToRay = length(obstaclePos - closestPoint);
          
          float penumbra = dotRadius + proj * 0.06;
          float s = smoothstep(dotRadius * 0.15, penumbra, distToRay);
          
          float depthMask = smoothstep(-dotRadius, dotRadius * 1.5, distToLight - proj);
          float dotShadow = mix(1.0, s, depthMask);

          shadow = min(shadow, dotShadow);
        }
      }

      vec3 lightColor = getDotColor(i);

      // Увеличенный множитель (38.0) делает ареал света меньше и более аккуратным
      float glow = exp(-distToLight * distToLight * 38.0);
      float core = exp(-distToLight * distToLight * 350.0);
      
      // Мягкое подмешивание белого в центре без ослепления
      lightColor = mix(lightColor, vec3(1.0), core * 0.25);

      // Сниженная общая интенсивность (0.45)
      totalLight += lightColor * glow * shadow * act * 0.45;
    }

    vec3 finalBg = totalLight;

    // Отрисовка сфер
    vec3 dotsLayer = vec3(0.0);
    float alphaLayer = 0.0;

    for (int i = 0; i < 10; i++) {
      float d = sdCircle(st - dots[i], dotRadius);
      float circleMask = 1.0 - smoothstep(0.0, 0.002, d);

      vec3 baseDotColor = vec3(0.14, 0.14, 0.17);
      vec3 activeDotColor = mix(getDotColor(i), vec3(1.0), 0.3);
      vec3 sphereColor = mix(baseDotColor, activeDotColor, activations[i]);

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
    const targetMouse = useRef(new THREE.Vector2(-999, -999));

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(-999, -999) },
            uResolution: { value: new THREE.Vector2(1, 1) },
        }),
        []
    );

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
                uniforms={uniforms}
                depthWrite={false}
            />
        </mesh>
    );
}

export function VercelReactiveHeroFirst() {
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
