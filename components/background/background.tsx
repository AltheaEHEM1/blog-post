"use client";

import type React from "react";
import { useEffect, useState } from "react";

interface LeafConfig {
	id: number;
	left: string;
	size: string;
	duration: string;
	delay: string;
	color: string;
	rotateStart: number;
	sway: string;
}

export default function Background() {
	// Start with no leaves on the server to avoid mismatched random values
	const [leaves, setLeaves] = useState<LeafConfig[]>([]);

	// Populate leaves only on the client after the component mounts
	useEffect(() => {
		const leafCount = 20;
		const leafColors: string[] = [
			"var(--color-teal, #0d9488)",
			"var(--color-teal-light, #5eead4)",
			"var(--color-teal-dark, #134e4a)",
			"rgba(13, 148, 136, 0.3)",
		];
		const generated = Array.from({ length: leafCount }).map((_, i) => ({
			id: i,
			left: `${Math.random() * 100}%`,
			size: `${10 + Math.random() * 12}px`,
			duration: `${10 + Math.random() * 8}s`,
			delay: `${Math.random() * -18}s`,
			color: leafColors[Math.floor(Math.random() * leafColors.length)],
			rotateStart: Math.random() * 360,
			sway: `${30 + Math.random() * 50}px`,
		}));
		setLeaves(generated);
	}, []);

	return (
		<div className="fixed inset-0 z-[-2] pointer-events-none overflow-hidden bg-background perspective:1000px">
			<div className="absolute inset-0 bg-linear-to-b from-teal-50/20 via-transparent to-transparent" />
			<div className="absolute inset-0 bg-radial-[circle_at_50%_30%] from-transparent via-transparent to-teal-pale/40 mix-blend-multiply" />

			<style>{`
                @keyframes realistic-fall {
                    0% {
                        transform: translateY(-12vh) translateX(0)
                            rotate(var(--leaf-rotate-start, 0deg)) rotateX(0deg) rotateY(0deg);
                        opacity: 0;
                    }
                    5% { opacity: 0.6; }
                    20% {
                        transform: translateY(15vh) translateX(calc(var(--leaf-sway, 30px) * 1.2))
                            rotate(calc(var(--leaf-rotate-start, 0deg) + 45deg)) rotateX(50deg) rotateY(20deg);
                    }
                    40% {
                        transform: translateY(42vh) translateX(calc(var(--leaf-sway, 30px) * -1.4))
                            rotate(calc(var(--leaf-rotate-start, 0deg) + 110deg)) rotateX(130deg) rotateY(-40deg);
                    }
                    60% {
                        transform: translateY(68vh) translateX(calc(var(--leaf-sway, 30px) * 1.5))
                            rotate(calc(var(--leaf-rotate-start, 0deg) + 190deg)) rotateX(210deg) rotateY(50deg);
                    }
                    80% {
                        transform: translateY(92vh) translateX(calc(var(--leaf-sway, 30px) * -1.1))
                            rotate(calc(var(--leaf-rotate-start, 0deg) + 280deg)) rotateX(290deg) rotateY(-30deg);
                    }
                    95% { opacity: 0.5; }
                    100% {
                        transform: translateY(115vh) translateX(calc(var(--leaf-sway, 30px) * 0.6))
                            rotate(calc(var(--leaf-rotate-start, 0deg) + 360deg)) rotateX(360deg) rotateY(10deg);
                        opacity: 0;
                    }
                }
            `}</style>

			{leaves.map((leaf) => {
				const leafStyle: React.CSSProperties & {
					"--leaf-rotate-start"?: string;
					"--leaf-sway"?: string;
				} = {
					left: leaf.left,
					width: leaf.size,
					height: leaf.size,
					animationDuration: leaf.duration,
					animationDelay: leaf.delay,
					"--leaf-rotate-start": `${leaf.rotateStart}deg`,
					"--leaf-sway": leaf.sway,
					animationName: "realistic-fall",
					animationTimingFunction: "ease-in-out",
					animationIterationCount: "infinite",
					transformStyle: "preserve-3d",
				};

				return (
					<svg
						key={leaf.id}
						className="absolute top-0 pointer-events-none drop-shadow-[0_4px_6px_rgba(13,148,136,0.08)]"
						style={leafStyle}
						viewBox="0 0 24 24"
						fill={leaf.color}
						aria-hidden="true"
					>
						<path d="M 2,22 C 1,15 5,5 12,3 C 18,2 22,7 22,12 C 22,18 14,23 2,22 Z" />
						<path
							d="M 2,22 C 7,16 14,9 22,3"
							stroke="rgba(255,255,255,0.3)"
							strokeWidth="1"
							strokeLinecap="round"
							fill="none"
						/>
					</svg>
				);
			})}
		</div>
	);
}
