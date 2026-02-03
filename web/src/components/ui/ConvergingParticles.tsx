"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
    id: number;
    startX: number;
    startY: number;
    size: number;
    color: string;
    duration: number;
    delay: number;
}

const COLORS = [
    "rgba(59, 130, 246, 0.6)",  // blue
    "rgba(96, 165, 250, 0.5)",  // light blue
    "rgba(255, 255, 255, 0.4)", // white
    "rgba(147, 197, 253, 0.5)", // sky
];

export default function ConvergingParticles({ count = 15 }: { count?: number }) {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const generated: Particle[] = [];
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * 360;
            const distance = 300 + Math.random() * 200;
            generated.push({
                id: i,
                startX: Math.cos((angle * Math.PI) / 180) * distance,
                startY: Math.sin((angle * Math.PI) / 180) * distance,
                size: Math.random() * 3 + 2,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                duration: Math.random() * 8 + 6,
                delay: Math.random() * 5,
            });
        }
        setParticles(generated);
    }, [count]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        backgroundColor: p.color,
                        boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                    }}
                    initial={{
                        x: p.startX,
                        y: p.startY,
                        opacity: 0,
                    }}
                    animate={{
                        x: [p.startX, 0],
                        y: [p.startY, 0],
                        opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "linear",
                        times: [0, 0.2, 0.8, 1],
                    }}
                />
            ))}
        </div>
    );
}
