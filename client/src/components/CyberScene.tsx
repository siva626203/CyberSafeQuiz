import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] = positions[i3 + 1] + Math.sin(state.clock.elapsedTime + i) * 0.002;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#00ffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function GridFloor() {
  const gridRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (gridRef.current) {
      const material = gridRef.current.material as THREE.ShaderMaterial;
      material.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        gridColor: { value: new THREE.Color(0x00ff88) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 gridColor;
        varying vec2 vUv;
        
        void main() {
          vec2 grid = abs(fract(vUv * 20.0 - 0.5) - 0.5) / fwidth(vUv * 20.0);
          float line = min(grid.x, grid.y);
          float gridPattern = 1.0 - min(line, 1.0);
          
          float pulse = sin(time * 2.0 + vUv.x * 10.0) * 0.3 + 0.7;
          
          vec3 color = gridColor * gridPattern * pulse;
          float alpha = gridPattern * 0.4;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  return (
    <mesh
      ref={gridRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -5, 0]}
      material={shaderMaterial}
    >
      <planeGeometry args={[100, 100]} />
    </mesh>
  );
}

function FloatingRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.3;
      ring1Ref.current.rotation.y = time * 0.2;
    }
    
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = time * -0.2;
      ring2Ref.current.rotation.z = time * 0.3;
    }
    
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = time * 0.4;
      ring3Ref.current.rotation.z = time * -0.2;
    }
  });

  return (
    <group position={[0, 0, -10]}>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[8, 0.1, 16, 100]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.3} />
      </mesh>
      
      <mesh ref={ring2Ref}>
        <torusGeometry args={[10, 0.08, 16, 100]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.2} />
      </mesh>
      
      <mesh ref={ring3Ref}>
        <torusGeometry args={[12, 0.06, 16, 100]} />
        <meshBasicMaterial color="#0088ff" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

function DataCubes() {
  const cubesData = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 40,
        Math.random() * 10 - 5,
        (Math.random() - 0.5) * 40
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ] as [number, number, number],
      speed: Math.random() * 0.5 + 0.2,
      color: i % 2 === 0 ? '#00ffff' : '#00ff88'
    }));
  }, []);

  return (
    <>
      {cubesData.map((cube, index) => (
        <DataCube key={index} {...cube} />
      ))}
    </>
  );
}

function DataCube({ 
  position, 
  rotation, 
  speed, 
  color 
}: { 
  position: [number, number, number]; 
  rotation: [number, number, number]; 
  speed: number; 
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed;
      meshRef.current.rotation.y += 0.01 * speed;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshBasicMaterial 
        color={color} 
        wireframe 
        transparent 
        opacity={0.4}
      />
    </mesh>
  );
}

export function CyberScene() {
  return (
    <>
      <color attach="background" args={['#0a0a1a']} />
      
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00ff88" />
      
      <FloatingParticles />
      <GridFloor />
      <FloatingRings />
      <DataCubes />
    </>
  );
}
