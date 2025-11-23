"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
    className,
    containerClassName,
    colors,
    waveWidth,
    backgroundFill,
    blur = 10,
    speed = "fast",
    waveOpacity = 0.5,
}: {
    className?: string;
    containerClassName?: string;
    colors?: string[];
    waveWidth?: number;
    backgroundFill?: string;
    blur?: number;
    speed?: "slow" | "fast";
    waveOpacity?: number;
}) => {
    const noise = createNoise3D();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const mouse = useRef({ x: 0, y: 0 });

    const waveColors = colors ?? [
        "#38bdf8",
        "#818cf8",
        "#c084fc",
        "#e879f9",
        "#22d3ee",
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let w = ctx.canvas.width = window.innerWidth;
        let h = ctx.canvas.height = window.innerHeight;
        ctx.filter = `blur(${blur}px)`;

        let nt = 0;
        let animationId: number;

        const getSpeed = () => {
            switch (speed) {
                case "slow":
                    return 0.001;
                case "fast":
                    return 0.002;
                default:
                    return 0.001;
            }
        };

        const drawWave = (n: number) => {
            nt += getSpeed();
            for (let i = 0; i < n; i++) {
                ctx.beginPath();
                ctx.lineWidth = waveWidth || 50;
                ctx.strokeStyle = waveColors[i % waveColors.length];
                for (let x = 0; x < w; x += 5) {
                    let y = noise(x / 800, 0.3 * i, nt) * 100;

                    // Mouse disturbance
                    const dx = x - mouse.current.x;
                    const dy = (h * 0.5) - mouse.current.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 300) {
                        const force = (300 - dist) / 300;
                        y += Math.sin(dist * 0.1 - nt * 10) * force * 50;
                    }

                    ctx.lineTo(x, y + h * 0.5);
                }
                ctx.stroke();
                ctx.closePath();
            }
        };

        const render = () => {
            if (backgroundFill) {
                ctx.fillStyle = backgroundFill;
                ctx.globalAlpha = waveOpacity || 0.5;
                ctx.fillRect(0, 0, w, h);
            } else {
                ctx.clearRect(0, 0, w, h);
            }
            drawWave(5);
            animationId = requestAnimationFrame(render);
        };

        const handleResize = () => {
            w = ctx.canvas.width = window.innerWidth;
            h = ctx.canvas.height = window.innerHeight;
            ctx.filter = `blur(${blur}px)`;
        };

        render();
        window.addEventListener("resize", handleResize);

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                mouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, [blur, speed, waveWidth, waveColors, waveOpacity, backgroundFill, noise]);

    const [isSafari, setIsSafari] = useState(false);
    useEffect(() => {
        setIsSafari(
            typeof window !== "undefined" &&
            navigator.userAgent.includes("Safari") &&
            !navigator.userAgent.includes("Chrome")
        );
    }, []);

    return (
        <div
            className={cn(
                "fixed inset-0 -z-10 h-full w-full overflow-hidden",
                className,
                containerClassName
            )}
        >
            <canvas
                className="absolute inset-0 z-0"
                ref={canvasRef}
                id="canvas"
                style={{
                    ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
                }}
            ></canvas>
        </div>
    );
};
