"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 8 + 3;
      });
    }, 250);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 4300);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const colContainer = isDark ? "#60a5fa" : "#3b82f6";
  const colCabin = isDark ? "#fb923c" : "#f97316";
  const colWheel = isDark ? "#999" : "#333";
  const colHub = isDark ? "#ccc" : "#666";
  const colSmoke = isDark ? "#444" : "#ccc";
  const colLine = isDark ? "#93bbf5" : "#2563eb";
  const colWin = isDark ? "#6ab4ff" : "#1d4ed8";
  const colText = isDark ? "#e8e8e8" : "#1a1a1a";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="loading-screen"
        >
          <div className="flex flex-col items-center gap-8">
            {/* Truck SVG Animation */}
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <svg
                width="180"
                height="100"
                viewBox="0 0 180 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Container */}
                <motion.rect
                  x="10" y="20" width="100" height="50" rx="4"
                  fill={colContainer}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: "110px 45px" }}
                />
                {/* Container lines */}
                <motion.line
                  x1="40" y1="22" x2="40" y2="68"
                  stroke={colLine} strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                />
                <motion.line
                  x1="70" y1="22" x2="70" y2="68"
                  stroke={colLine} strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                />
                {/* Cabin */}
                <motion.path
                  d="M110 35 L110 70 L145 70 L145 48 L130 35 Z"
                  fill={colCabin}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
                {/* Cabin window */}
                <motion.path
                  d="M115 40 L128 40 L140 50 L140 55 L115 55 Z"
                  fill={colWin}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                />
                {/* Wheels */}
                <motion.circle
                  cx="40" cy="75" r="10" fill={colWheel}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6, type: "spring", stiffness: 300 }}
                />
                <motion.circle
                  cx="40" cy="75" r="5" fill={colHub}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.7, type: "spring", stiffness: 300 }}
                />
                <motion.circle
                  cx="130" cy="75" r="10" fill={colWheel}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.7, type: "spring", stiffness: 300 }}
                />
                <motion.circle
                  cx="130" cy="75" r="5" fill={colHub}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8, type: "spring", stiffness: 300 }}
                />
                {/* Exhaust smoke */}
                <motion.circle
                  cx="8" cy="65" r="3" fill={colSmoke}
                  initial={{ opacity: 0, x: 0, scale: 0.5 }}
                  animate={{
                    opacity: [0, 0.5, 0.3, 0],
                    x: [-5, -15, -25, -35],
                    scale: [0.5, 1, 1.5, 2],
                    y: [0, -5, -10, -18],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1, ease: "easeOut" }}
                />
                <motion.circle
                  cx="8" cy="65" r="2" fill={isDark ? "#555" : "#ddd"}
                  initial={{ opacity: 0, x: 0, scale: 0.5 }}
                  animate={{
                    opacity: [0, 0.4, 0.2, 0],
                    x: [-3, -12, -22, -30],
                    scale: [0.5, 0.8, 1.2, 1.5],
                    y: [0, -8, -15, -22],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 1.4, ease: "easeOut" }}
                />
              </svg>

              {/* Road */}
              <motion.div
                className="road-line mx-auto"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col items-center gap-3"
            >
              <h2 className="font-heading text-[22px] font-semibold tracking-wide" style={{ color: colText }}>
                ITRACKER
              </h2>
              <p className="text-[13px] text-[#999]">
                Carregando seu container...
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="w-48 overflow-hidden rounded-full"
              style={{ height: 3, background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: isDark ? "#60a5fa" : "#3b82f6" }}
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
