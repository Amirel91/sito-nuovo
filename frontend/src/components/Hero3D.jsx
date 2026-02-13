import { motion } from 'framer-motion';

// CSS-based animated geometric hero
export const Hero3D = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden" data-testid="hero-3d">
            {/* Grid Background */}
            <div className="absolute inset-0 grid-background opacity-30" />
            
            {/* Animated orange glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
                <motion.div
                    className="absolute inset-0 rounded-full bg-orange-500/10 blur-[100px]"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            {/* Rotating cube wireframe - CSS version */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ perspective: '800px' }}>
                <motion.div
                    className="relative w-40 h-40"
                    animate={{ rotateY: 360, rotateX: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Cube faces */}
                    {[
                        { rotateY: 0, translateZ: 80 },
                        { rotateY: 180, translateZ: 80 },
                        { rotateY: 90, translateZ: 80 },
                        { rotateY: -90, translateZ: 80 },
                        { rotateX: 90, translateZ: 80 },
                        { rotateX: -90, translateZ: 80 },
                    ].map((face, index) => (
                        <div
                            key={index}
                            className="absolute w-40 h-40 border-2 border-orange-500/40"
                            style={{
                                transform: `rotateY(${face.rotateY || 0}deg) rotateX(${face.rotateX || 0}deg) translateZ(${face.translateZ}px)`,
                                backfaceVisibility: 'visible'
                            }}
                        />
                    ))}
                </motion.div>
            </div>

            {/* Floating geometric shapes */}
            {[
                { x: '15%', y: '20%', size: 40, delay: 0, color: 'border-orange-500/30' },
                { x: '80%', y: '25%', size: 30, delay: 1, color: 'border-orange-400/25' },
                { x: '10%', y: '70%', size: 35, delay: 2, color: 'border-orange-600/30' },
                { x: '85%', y: '65%', size: 25, delay: 0.5, color: 'border-orange-500/20' },
                { x: '25%', y: '80%', size: 20, delay: 1.5, color: 'border-orange-400/30' },
                { x: '70%', y: '15%', size: 28, delay: 2.5, color: 'border-orange-500/25' },
            ].map((shape, index) => (
                <motion.div
                    key={index}
                    className={`absolute border-2 ${shape.color}`}
                    style={{
                        left: shape.x,
                        top: shape.y,
                        width: shape.size,
                        height: shape.size,
                        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                    }}
                    animate={{
                        y: [0, -15, 0],
                        rotate: [0, 180, 360],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: 5,
                        delay: shape.delay,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}

            {/* Animated dots/particles */}
            {Array.from({ length: 30 }).map((_, index) => {
                const randomX = Math.random() * 100;
                const randomY = Math.random() * 100;
                const randomDelay = Math.random() * 3;
                const randomDuration = 3 + Math.random() * 2;
                
                return (
                    <motion.div
                        key={`particle-${index}`}
                        className="absolute w-1 h-1 bg-orange-500/40 rounded-full"
                        style={{
                            left: `${randomX}%`,
                            top: `${randomY}%`
                        }}
                        animate={{
                            opacity: [0, 0.6, 0],
                            scale: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: randomDuration,
                            delay: randomDelay,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                );
            })}

            {/* Horizontal lines */}
            {[20, 40, 60, 80].map((top, index) => (
                <motion.div
                    key={`line-${index}`}
                    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/10 to-transparent"
                    style={{ top: `${top}%` }}
                    animate={{
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                        duration: 3,
                        delay: index * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
};

export default Hero3D;
