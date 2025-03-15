import React from "react";
import { motion } from "framer-motion";

const StepIndicator = ({ steps, currentStep, maxReachedStep, onStepClick }) => {
    const progress = (currentStep / (steps.length - 1)) * 100;

    return (
        <div className="fixed top-0 left-0 right-0 z-20 w-full flex flex-col items-center bg-[#D9DED7] p-2 lg:sticky lg:top-0">
            <div className="relative w-full">
                <div className="absolute top-3 left-0 right-0 h-1 bg-white w-[93%]" />
                <motion.div
                    className="absolute top-2 lg:top-3 left-0 h-1 bg-black"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                />
                <div className="relative flex justify-between">
                    {steps.map((step, index) => {
                        // A step is clickable if its index is <= maxReachedStep
                        const clickable = index <= maxReachedStep;
                        return (
                            <div key={index} className="flex flex-col items-center">
                                <motion.div
                                    onClick={() => clickable && onStepClick && onStepClick(index)}
                                    className={`w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center ${
                                        index <= currentStep ? "bg-black text-white" : "bg-white text-black"
                                    } ${clickable ? "cursor-pointer" : "cursor-default"}`}
                                    initial={{ opacity: 1, scale: 0.9 }}
                                    animate={{
                                        opacity: 1,
                                        scale: index <= currentStep ? 1.0 : 0.9,
                                    }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <span className="text-xs">{index + 1}</span>
                                </motion.div>
                                <span
                                    className={`mt-2 text-sm text-center hidden lg:block tracking-wider ${
                                        index <= currentStep ? "text-black" : "text-white"
                                    }`}
                                >
                                    {step.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default StepIndicator;
