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

  // Индивидуальные цвета свечения для каждой буквы [D, v, G]
  vec3 getLetterColor(int index) {
    if (index == 0) return vec3(0.000, 0.700, 1.000); // D — Неоново-голубой
    if (index == 1) return vec3(0.700, 0.200, 1.000); // v — Пурпурно-фиолетовый
    return vec3(1.000, 0.250, 0.500);                 // G — Коралл/Пинк
  }

  float sdSegment(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h);
  }

  // SDF для буквы D
  float sdD(vec2 p) {
    float dStem = sdSegment(p, vec2(-0.035, -0.05), vec2(-0.035, 0.05));
    float dTop  = sdSegment(p, vec2(-0.035, 0.05), vec2(0.005, 0.05));
    float dBot  = sdSegment(p, vec2(-0.035, -0.05), vec2(0.005, -0.05));
    
    vec2 pArc = p - vec2(0.005, 0.0);
    float dArc = abs(length(pArc) - 0.05);
    if (p.x < 0.005) dArc = 1e5;

    return min(min(dStem, dTop), min(dBot, dArc));
  }

  // SDF для буквы v
  float sdV(vec2 p) {
    float d1 = sdSegment(p, vec2(-0.035, 0.032), vec2(0.0, -0.04));
    float d2 = sdSegment(p, vec2(0.035, 0.032), vec2(0.0, -0.04));
    return min(d1, d2);
  }

  // SDF для буквы G
  float sdG(vec2 p) {
    float dRing = abs(length(p) - 0.05);
    if (p.x > 0.01 && p.y > 0.005) {
      dRing = 1e5;
    }
    float dBar = sdSegment(p, vec2(0.00, 0.0), vec2(0.045, 0.0));
    float dLip = sdSegment(p, vec2(0.045, 0.0), vec2(0.045, -0.025));
    float dTopCap = length(p - vec2(0.01, 0.049));

    return min(min(dRing, dBar), min(dLip, dTopCap));
  }

  // Вычисление расстояния до контура буквы по индексу
  float getLetterSDF(int index, vec2 p) {
    float strokeWidth = 0.0085;
    if (index == 0) return sdD(p) - strokeWidth;
    if (index == 1) return sdV(p) - strokeWidth;
    return sdG(p) - strokeWidth;
  }

  void main() {
    vec2 st = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
    vec2 mouse = (uMouse - 0.5 * uResolution.xy) / uResolution.y;

    // Позиции букв D, v, G на экране
    vec2 letters[3];
    letters[0] = vec2(-0.16, 0.0);
    letters[1] = vec2(0.00, 0.0);
    letters[2] = vec2(0.16, 0.0);

    float objectRadius = 0.05;
    float activations[3];

    for (int i = 0; i < 3; i++) {
      float distToMouse = length(letters[i] - mouse);
      float act = exp(-distToMouse * distToMouse * 45.0);
      activations[i] = act > 0.01 ? act : 0.0;
    }

    vec3 totalLight = vec3(0.0);

    // Расчет света и теней от букв
    for (int i = 0; i < 3; i++) {
      float act = activations[i];
      if (act <= 0.0) continue;

      vec2 lightOrigin = letters[i];
      vec2 ray = st - lightOrigin;
      float distToLight = length(ray);
      vec2 rayDir = distToLight > 0.0001 ? ray / distToLight : vec2(0.0, 1.0);

      float shadow = 1.0;

      for (int j = 0; j < 3; j++) {
        if (i == j) continue;

        vec2 obstaclePos = letters[j];
        vec2 toObstacle = obstaclePos - lightOrigin;
        float proj = dot(toObstacle, rayDir);

        if (proj > 0.001) {
          vec2 closestPoint = lightOrigin + rayDir * proj;
          float distToRay = length(obstaclePos - closestPoint);
          
          float penumbra = objectRadius + proj * 0.08;
          float s = smoothstep(objectRadius * 0.15, penumbra, distToRay);
          
          float depthMask = smoothstep(-objectRadius, objectRadius * 1.5, distToLight - proj);
          float dotShadow = mix(1.0, s, depthMask);

          shadow = min(shadow, dotShadow);
        }
      }

      vec3 lightColor = getLetterColor(i);
      float glow = exp(-distToLight * distToLight * 30.0);
      float core = exp(-distToLight * distToLight * 300.0);
      
      lightColor = mix(lightColor, vec3(1.0), core * 0.2);
      totalLight += lightColor * glow * shadow * act * 0.55;
    }

    vec3 finalBg = totalLight;

    // Отрисовка букв с белой заливкой и внешним цветным контуром
    vec3 lettersLayer = vec3(0.0);
    float alphaLayer = 0.0;

    for (int i = 0; i < 3; i++) {
      vec2 localP = st - letters[i];
      float d = getLetterSDF(i, localP);

      float mask = 1.0 - smoothstep(-0.001, 0.001, d);
      float act = activations[i];

      // Белый цвет самой буквы по умолчанию
      vec3 letterColor = vec3(0.95, 0.95, 0.98);

      // Контурное свечение (rim glow) вокруг буквы того же оттенка
      float rim = exp(-max(0.0, d) * 110.0) * (0.05 + act * 0.95);
      vec3 rimColor = getLetterColor(i);

      if (d < 0.0) {
        lettersLayer = mix(lettersLayer, letterColor, mask);
        alphaLayer = max(alphaLayer, mask);
      } else {
        lettersLayer += rimColor * rim * act * 0.9;
        alphaLayer = max(alphaLayer, rim * act);
      }
    }

    vec3 color = mix(finalBg, lettersLayer, alphaLayer);
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
        [],
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
