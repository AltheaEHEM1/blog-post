"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimationProps {
	children: ReactNode;
	delay?: number;
	duration?: number;
	className?: string;
}

export function FadeInUp({
	children,
	delay = 0,
	duration = 0.5,
	className = "",
}: AnimationProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 15 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration,
				delay,
				ease: [0.215, 0.61, 0.355, 1], // easeOutCubic
			}}
			className={className}
		>
			{children}
		</motion.div>
	);
}

export function ScaleIn({
	children,
	delay = 0,
	duration = 0.5,
	className = "",
}: AnimationProps) {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{
				duration,
				delay,
				ease: [0.215, 0.61, 0.355, 1],
			}}
			className={className}
		>
			{children}
		</motion.div>
	);
}

interface StaggerContainerProps {
	children: ReactNode;
	delay?: number;
	staggerChildren?: number;
	className?: string;
}

export function StaggerContainer({
	children,
	delay = 0,
	staggerChildren = 0.05,
	className = "",
}: StaggerContainerProps) {
	return (
		<motion.div
			initial="hidden"
			animate="show"
			variants={{
				hidden: {},
				show: {
					transition: {
						delayChildren: delay,
						staggerChildren,
					},
				},
			}}
			className={className}
		>
			{children}
		</motion.div>
	);
}

export function StaggerItem({
	children,
	className = "",
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, y: 12 },
				show: {
					opacity: 1,
					y: 0,
					transition: {
						duration: 0.4,
						ease: [0.215, 0.61, 0.355, 1],
					},
				},
			}}
			className={className}
		>
			{children}
		</motion.div>
	);
}
