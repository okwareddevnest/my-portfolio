"use client";

import { useRef } from "react";
import type { JSX, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardContainerProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  onClick?: () => void;
}

export const CardContainer = ({
  children,
  className,
  containerClassName,
  onClick,
}: CardContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseEnter = () => {
    if (!containerRef.current) return;
    containerRef.current.style.transition = "";
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    containerRef.current.style.transition = "transform 0.5s ease";
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={cn(
        "relative group/card w-auto h-auto",
        containerClassName
      )}
    >
      <div className={cn("relative", className)}>
        {children}
      </div>
    </div>
  );
};

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export const CardBody = ({
  children,
  className,
}: CardBodyProps) => {
  return (
    <div
      className={cn(
        "h-full w-full p-4",
        className
      )}
    >
      {children}
    </div>
  );
};

interface CardItemProps {
  children: ReactNode;
  className?: string;
  translateZ?: number | string;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  as?: keyof JSX.IntrinsicElements;
}

export const CardItem = ({
  children,
  className,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  as: Component = "div",
}: CardItemProps) => {
  return (
    <motion.div
      className={cn("w-fit h-fit", className)}
      style={{
        transform: `perspective(1000px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
        transition: "transform 0.3s ease",
      }}
    >
      <Component>{children}</Component>
    </motion.div>
  );
};
