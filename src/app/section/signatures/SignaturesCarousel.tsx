"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useAnimate, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import type { SignatureModel } from "./types";

const ModelViewer = dynamic(() => import("./ModelViewer"), { ssr: false });

interface SignaturesCarouselProps {
    models: SignatureModel[];
}

const SignaturesCarousel = ({ models }: SignaturesCarouselProps) => {
    const containerRef = useRef<HTMLElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "0px 0px 200px 0px" });

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const currentModel = models[currentIndex]!;
    const total = models.length;

    const [modelScope, animateModel] = useAnimate();

    const goTo = useCallback(
        async (dir: number) => {
            setDirection(dir);
            // Fade out
            await animateModel(modelScope.current, { opacity: 0, scale: 0.95 }, { duration: 0.2, ease: [0.22, 1, 0.36, 1] });
            // Swap model
            setCurrentIndex((prev) => {
                if (dir === 1) return prev === total - 1 ? 0 : prev + 1;
                return prev === 0 ? total - 1 : prev - 1;
            });
            // Fade in
            await animateModel(modelScope.current, { opacity: 1, scale: 1 }, { duration: 0.3, ease: [0.22, 1, 0.36, 1] });
        },
        [total, animateModel, modelScope]
    );

    // Aggressive preloading removed for performance. 
    // We strictly load models only when they are needed or slightly ahead if we wanted to (but for now, on-demand is safest for mobile).

    // const slideVariants = {
    //     enter: (dir: number) => ({
    //         x: dir > 0 ? 200 : -200,
    //         opacity: 0,
    //         scale: 0.9,
    //     }),
    //     center: {
    //         x: 0,
    //         opacity: 1,
    //         scale: 1,
    //     },
    //     exit: (dir: number) => ({
    //         x: dir > 0 ? -200 : 200,
    //         opacity: 0,
    //         scale: 0.9,
    //     }),
    // };

    const textVariants = {
        enter: (dir: number) => ({
            y: dir > 0 ? 20 : -20,
            opacity: 0,
        }),
        center: {
            y: 0,
            opacity: 1,
        },
        exit: (dir: number) => ({
            y: dir > 0 ? -20 : 20,
            opacity: 0,
        }),
    };

    return (
        <section ref={containerRef} className="relative w-full overflow-hidden bg-[#f6f1df] px-4 pt-8 pb-10 md:px-[150px] md:pt-4 md:pb-12">
            {isInView ? (
                <>
                    {/* Gradient ellipse — behind everything */}
            <div
                className="absolute top-[30%] left-1/2 h-[550px] w-[400px] -translate-x-1/2 rounded-[50%] md:top-[22%] md:h-[850px] md:w-[650px]"
                style={{
                    background: "linear-gradient(180deg, #F5F2D3 0%, #FFFDE8 45%, transparent 70%)",
                }}
            />

            {/* Title — outside padded container so it spans full width */}
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 font-canela w-[calc(100%+2rem)] -mx-4 md:w-[calc(100%+300px)] md:-mx-[150px] text-center leading-[1] font-[100] tracking-[-0.02em] text-[#1a2e1a]"
                style={{ fontSize: "clamp(5rem, 24vw, 30rem)" }}
            >
                signatures
            </motion.h2>

            <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center">
                {/* Model area */}
                <div className="relative mt-4 flex w-full flex-col items-center md:-mt-10">
                    {/* Desktop: 3-column layout with name | model | price */}
                    <div className="relative z-10 flex w-full flex-col items-center md:flex-row md:items-center md:justify-between">
                        {/* Name — desktop: left column */}
                        <div className="hidden w-[180px] shrink-0 md:block">
                            <AnimatePresence initial={false} custom={direction} mode="wait">
                                <motion.span
                                    key={`name-${currentIndex}`}
                                    custom={direction}
                                    variants={textVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    className="block text-sm font-medium tracking-[0.15em] text-[#1a2e1a] uppercase"
                                >
                                    {currentModel.displayName}
                                </motion.span>
                            </AnimatePresence>
                        </div>

                        {/* Center: 3D Model — persistent Canvas, imperative fade on swap */}
                        <div ref={modelScope} className="relative h-[280px] w-[340px] md:h-[380px] md:w-[500px]">
                            <ModelViewer glbUrl={currentModel.glbUrl} />
                        </div>

                        {/* Price — desktop: right column */}
                        <div className="hidden w-[180px] shrink-0 text-right md:block">
                            <AnimatePresence initial={false} custom={direction} mode="wait">
                                <motion.span
                                    key={`price-${currentIndex}`}
                                    custom={direction}
                                    variants={textVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    className="block text-sm font-medium tracking-[0.05em] text-[#1a2e1a]"
                                >
                                    ${currentModel.price}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Mobile only: name + price stacked centered below model */}
                    <div className="relative z-10 mt-4 w-full md:hidden">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={`mobile-info-${currentIndex}`}
                                custom={direction}
                                variants={textVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="flex flex-col items-center gap-1"
                            >
                                <span className="text-sm font-medium tracking-[0.15em] text-[#1a2e1a] uppercase">{currentModel.displayName}</span>
                                <span className="text-sm font-medium tracking-[0.05em] text-[#1a2e1a]">${currentModel.price}</span>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Navigation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-12 flex w-full items-center justify-center gap-0 md:mt-16"
                >
                    <button
                        type="button"
                        onClick={() => goTo(-1)}
                        className="cursor-pointer text-xs font-medium tracking-[0.15em] text-[#1a2e1a] uppercase transition-opacity hover:opacity-60"
                    >
                        PREV
                    </button>

                    <span className="mx-4 h-px w-16 bg-[#1a2e1a]/30 md:w-24" />

                    <div className="flex items-baseline gap-0">
                        <span className="font-canela text-2xl font-normal text-[#1a2e1a] md:text-3xl">{String(currentIndex + 1).padStart(2, "0")}</span>
                        <span className="font-canela text-sm text-[#1a2e1a]/50">/{String(total).padStart(2, "0")}</span>
                    </div>

                    <span className="mx-4 h-px w-16 bg-[#1a2e1a]/30 md:w-24" />

                    <button
                        type="button"
                        onClick={() => goTo(1)}
                        className="cursor-pointer text-xs font-medium tracking-[0.15em] text-[#1a2e1a] uppercase transition-opacity hover:opacity-60"
                    >
                        NEXT
                    </button>
                </motion.div>
            </div>
            </>
            ) : (
                <div className="h-[600px] w-full" /> // Placeholder to prevent layout shift
            )}
        </section>
    );
};

export default SignaturesCarousel;
