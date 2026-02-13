import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Simple wireframe cube
const WireframeCube = () => {
    const meshRef = useRef();

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.003;
            meshRef.current.rotation.y += 0.005;
        }
    });

    return (
        <mesh ref={meshRef} scale={1.5}>
            <boxGeometry args={[2, 2, 2]} />
            <meshBasicMaterial color="#f97316" wireframe />
        </mesh>
    );
};

// Small floating shapes
const FloatingIcosahedron = ({ position, scale, color, speed = 1 }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5 * speed) * 0.3;
            meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3 * speed) * 0.2;
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 * speed) * 0.3;
        }
    });

    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            <icosahedronGeometry args={[1, 0]} />
            <meshBasicMaterial color={color} wireframe transparent opacity={0.6} />
        </mesh>
    );
};

// Grid plane
const GridPlane = () => {
    return (
        <gridHelper args={[20, 20, '#1e293b', '#1e293b']} position={[0, -2.5, 0]} />
    );
};

// Simple particles using instanced mesh
const SimpleParticles = ({ count = 80 }) => {
    const mesh = useRef();
    const dummy = new THREE.Object3D();
    
    const particles = useRef(
        Array.from({ length: count }, () => ({
            position: [
                (Math.random() - 0.5) * 12,
                (Math.random() - 0.5) * 12,
                (Math.random() - 0.5) * 12
            ],
            scale: Math.random() * 0.03 + 0.01
        }))
    );

    useFrame((state) => {
        if (mesh.current) {
            particles.current.forEach((particle, i) => {
                dummy.position.set(...particle.position);
                dummy.scale.setScalar(particle.scale);
                dummy.updateMatrix();
                mesh.current.setMatrixAt(i, dummy.matrix);
            });
            mesh.current.instanceMatrix.needsUpdate = true;
            mesh.current.rotation.y += 0.0005;
        }
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color="#f97316" transparent opacity={0.7} />
        </instancedMesh>
    );
};

// Scene content
const Scene = () => {
    return (
        <>
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={0.5} color="#f97316" />
            
            {/* Main Geometric Cube */}
            <WireframeCube />
            
            {/* Floating shapes */}
            <FloatingIcosahedron position={[-4, 2, -2]} scale={0.4} color="#f97316" speed={1} />
            <FloatingIcosahedron position={[4, -1, -3]} scale={0.3} color="#fb923c" speed={0.8} />
            <FloatingIcosahedron position={[-3, -2, 1]} scale={0.25} color="#fdba74" speed={1.2} />
            <FloatingIcosahedron position={[3, 2, -1]} scale={0.35} color="#ea580c" speed={0.9} />
            
            {/* Grid */}
            <GridPlane />
            
            {/* Particles */}
            <SimpleParticles count={80} />
            
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
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
        setIsClient(true);
    }, []);
    
    if (!isClient) {
        return <div className="absolute inset-0 z-0 bg-slate-950" data-testid="hero-3d-loading" />;
    }

    return (
        <div className="absolute inset-0 z-0" data-testid="hero-3d">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
                onCreated={({ gl }) => {
                    gl.setClearColor(0x000000, 0);
                }}
            >
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Hero3D;
