// components/StepIndicator.jsx
import React from "react";
import { motion } from "framer-motion";

const StepIndicator = ({ steps, currentStep }) => {
    // Calculate progress as a percentage based on the current step index
    const progress = (currentStep / (steps.length - 1)) * 100;

    return (
        <div className="w-full flex flex-col items-center bg-[#D9DED7] p-2">
            {/* Container for the step indicator */}
            <div className="relative w-full">
                {/* Background line */}
                <div className="absolute top-3 left-0 right-0 h-1 bg-gray-300" />
                {/* Animated progress line */}
                <motion.div
                    className="absolute top-3 left-0 h-1 bg-black"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                />
                {/* Step circles with labels */}
                <div className="relative flex justify-between">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <motion.div
                                initial={{ opacity: 0.5, scale: 0.9 }}
                                animate={{
                                    opacity: index <= currentStep ? 1 : 0.5,
                                    scale: index <= currentStep ? 1.0 : 0.9,
                                }}
                                transition={{ duration: 0.5 }}
                                className={`w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center bg-black ${
                                    index <= currentStep ? "text-white" : "text-gray-400 bg-gray-100"
                                }`}
                            >
                                <span className="text-xs">{index + 1}</span>
                            </motion.div>
                            <span
                                className={`mt-2 text-xs text-center ${
                                    index <= currentStep ? "text-black" : "text-gray-500"
                                }`}
                            >
                                {step.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StepIndicator;
