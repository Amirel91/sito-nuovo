import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Geometric wireframe cube
const WireframeCube = ({ position = [0, 0, 0], scale = 1 }) => {
    const meshRef = useRef();

    useFrame(() => {
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
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
        }
    });

    return (
        <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
            <icosahedronGeometry args={[1, 0]} />
            <meshBasicMaterial color={color} wireframe transparent opacity={0.6} />
        </mesh>
    );
};

// Grid plane component
const Grid = () => {
    const gridRef = useRef();
    
    return (
        <group ref={gridRef} position={[0, -2.5, 0]}>
            <gridHelper args={[20, 20, '#1e293b', '#1e293b']} />
        </group>
    );
};

// Particles
const Particles = ({ count = 100 }) => {
    const pointsRef = useRef();
    
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
        }
        return pos;
    }, [count]);

    useFrame(() => {
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
                    array={positions}
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

// Scene content
const Scene = () => {
    return (
        <>
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
            <Grid />
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
        </>
    );
};

// Main Hero3D Component
export const Hero3D = () => {
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);
    
    if (!mounted) {
        return <div className="absolute inset-0 z-0 bg-slate-950" data-testid="hero-3d-loading" />;
    }

    return (
        <div className="absolute inset-0 z-0" data-testid="hero-3d">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <Scene />
            </Canvas>
        </div>
    );
};

export default Hero3D;
