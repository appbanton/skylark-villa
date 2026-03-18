"use client";
import React, { useId, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

export const SparklesCore = (props: ParticlesProps) => {
  const {
    id,
    className,
    background,
    minSize,
    maxSize,
    speed,
    particleColor,
    particleDensity,
  } = props;

  const [init, setInit] = useState(false);
  const [resolvedColor, setResolvedColor] = useState("#a0785a");
  const controls = useAnimation();
  const generatedId = useId();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  useEffect(() => {
    if (!particleColor) return;
    // If it's a CSS variable, resolve it
    if (particleColor.startsWith("var(")) {
      const varName = particleColor.replace("var(", "").replace(")", "").trim();
      const resolved = getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();
      if (resolved) setResolvedColor(resolved);
    } else {
      setResolvedColor(particleColor);
    }
  }, [particleColor]);

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      controls.start({
        opacity: 1,
        transition: { duration: 1 },
      });
    }
  };

  return (
    <motion.div animate={controls} className={cn("opacity-0", className)}>
      {init && (
        <Particles
          id={id || generatedId}
          className={cn("h-full w-full")}
          particlesLoaded={particlesLoaded}
          options={{
            background: {
              color: { value: background || "transparent" },
            },
            fullScreen: { enable: false, zIndex: 1 },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: { enable: false, mode: "push" },
                onHover: { enable: false, mode: "repulse" },
                resize: true as any,
              },
            },
            particles: {
              color: { value: resolvedColor },
              move: {
                direction: "none",
                enable: true,
                outModes: { default: "out" },
                random: false,
                speed: { min: 0.1, max: speed || 0.6 },
                straight: false,
              },
              number: {
                density: { enable: true, width: 400, height: 400 },
                value: particleDensity || 40,
              },
              opacity: {
                value: { min: 0.1, max: 0.8 },
                animation: {
                  count: 0,
                  enable: true,
                  speed: speed || 2,
                  decay: 0,
                  delay: 0,
                  sync: false,
                  mode: "auto",
                  startValue: "random",
                  destroy: "none",
                },
              },
              shape: { type: "circle" },
              size: {
                value: { min: minSize || 0.5, max: maxSize || 2 },
              },
              stroke: { width: 0 },
            },
            detectRetina: true,
          }}
        />
      )}
    </motion.div>
  );
};
