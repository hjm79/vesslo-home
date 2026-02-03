"use client";

import { useEffect, useState } from "react";

interface Particle {
    id: number;
    angle: number;
    distance: number;
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

export default function ConvergingParticles({ count = 25 }: { count?: number }) {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const generated: Particle[] = [];
        for (let i = 0; i < count; i++) {
            generated.push({
                id: i,
                angle: Math.random() * 360,
                distance: 200 + Math.random() * 150, // Start from outer edge
                size: Math.random() * 3 + 2,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                duration: Math.random() * 8 + 6,
                delay: Math.random() * 5,
            });
        }
        setParticles(generated);
    }, [count]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {particles.map((p) => {
                const startX = Math.cos((p.angle * Math.PI) / 180) * p.distance;
                const startY = Math.sin((p.angle * Math.PI) / 180) * p.distance;

                return (
                    <div
                        key={p.id}
                        className="absolute rounded-full animate-converge-center"
                        style={{
                            left: "50%",
                            top: "50%",
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            backgroundColor: p.color,
                            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                            animationDuration: `${p.duration}s`,
                            animationDelay: `${p.delay}s`,
                            // @ts-ignore
                            "--start-x": `${startX}px`,
                            "--start-y": `${startY}px`,
                        }}
                    />
                );
            })}
        </div>
    );
}
