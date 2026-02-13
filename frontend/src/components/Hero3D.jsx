import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Geometric wireframe cube
const WireframeCube = ({ position = [0, 0, 0], scale = 1 }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.003;
            meshRef.current.rotation.y += 0.005;
        }
    });

    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            <boxGeometry args={[2, 2, 2]} />
            <meshBasicMaterial color="#f97316" wireframe />
        </mesh>
    );
};

// Floating geometric shape
const FloatingShape = ({ position, rotation, scale, color }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
            meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
                <icosahedronGeometry args={[1, 0]} />
                <meshBasicMaterial color={color} wireframe opacity={0.6} transparent />
            </mesh>
        </Float>
    );
};

// Grid plane
const GridPlane = () => {
    return (
        <gridHelper 
            args={[20, 20, '#1e293b', '#1e293b']} 
            position={[0, -2.5, 0]}
            rotation={[0, 0, 0]}
        />
    );
};

// Particles
const Particles = ({ count = 100 }) => {
    const points = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
        }
        return positions;
    }, [count]);

    const pointsRef = useRef();

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += 0.0005;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={points}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial 
                size={0.03} 
                color="#f97316" 
                transparent 
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
};

// Main Hero3D Component
export const Hero3D = () => {
    return (
        <div className="absolute inset-0 z-0" data-testid="hero-3d">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={0.5} color="#f97316" />
                
                {/* Main Geometric Cube */}
                <WireframeCube position={[0, 0, 0]} scale={1.5} />
                
                {/* Floating smaller shapes */}
                <FloatingShape position={[-4, 2, -2]} rotation={[0, 0, 0]} scale={0.4} color="#f97316" />
                <FloatingShape position={[4, -1, -3]} rotation={[0.5, 0.5, 0]} scale={0.3} color="#fb923c" />
                <FloatingShape position={[-3, -2, 1]} rotation={[0, 0.3, 0]} scale={0.25} color="#fdba74" />
                <FloatingShape position={[3, 2, -1]} rotation={[0.2, 0, 0.2]} scale={0.35} color="#ea580c" />
                
                {/* Grid and Particles */}
                <GridPlane />
                <Particles count={150} />
                
                {/* Controls */}
                <OrbitControls 
                    enableZoom={false} 
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 3}
                />
            </Canvas>
        </div>
    );
};

export default Hero3D;
