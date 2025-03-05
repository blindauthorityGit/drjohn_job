// components/CustomSlider.jsx
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";

const CustomSlider = forwardRef(({ name, label, min = 0, max = 30, step = 1, value, onChange, validator }, ref) => {
    const [error, setError] = useState(null);

    // Expose a validate() method to the parent
    useImperativeHandle(ref, () => ({
        validate: () => {
            if (validator) {
                const errorMsg = validator(value);
                setError(errorMsg);
                return !errorMsg;
            }
            return true;
        },
    }));

    const handleChange = (e) => {
        const newValue = Number(e.target.value);
        onChange(name, newValue);
        if (error && validator) {
            const errorMsg = validator(newValue);
            setError(errorMsg);
        }
    };

    // Calculate position percentage for the value label
    const percent = ((value - min) / (max - min)) * 100;

    return (
        <div className="mb-6">
            {label && (
                <label className="text-lg tracking-wider text-black relative flex">
                    <div className="w-4 h-4 mr-2 bg-[#D9DED7]" />
                    {label}
                </label>
            )}
            <div className="relative mt-2">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={handleChange}
                    className="w-full appearance-none bg-gray-200 h-2 rounded-lg outline-none"
                />
                {/* Value label above the slider handle */}
                <motion.div
                    className="absolute -bottom-8 tracking-wider"
                    style={{ left: `${percent}%`, transform: "translateX(-50%)" }}
                >
                    <div className="text-sm text-black">{value === 30 ? value + "+" : value} Jahre</div>
                </motion.div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2"></div>
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
            <style jsx>{`
                input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: black;
                    cursor: pointer;
                    margin-top: -9px; /* Adjust to center the thumb */
                }
                input[type="range"]::-moz-range-thumb {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: black;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
});

export default CustomSlider;
