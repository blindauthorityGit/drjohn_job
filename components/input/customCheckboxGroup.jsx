// components/CustomCheckboxGroup.jsx
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";

const CustomCheckboxGroup = forwardRef(({ name, options, value = [], onChange, validator, label }, ref) => {
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

    const handleToggle = (optionValue) => {
        let newValue;
        if (value.includes(optionValue)) {
            newValue = value.filter((val) => val !== optionValue);
        } else {
            newValue = [...value, optionValue];
        }
        onChange(name, newValue);
        if (error) {
            setError(null);
        }
    };

    return (
        <div className="mb-6">
            {label && (
                <label className=" text-lg tracking-wider text-black relative flex">
                    <div className="w-4 h-4 mr-2 bg-[#D9DED7]" />
                    {label}
                </label>
            )}
            <div className="space-y-2 mt-4">
                {options.map((option, index) => {
                    const isSelected = value.includes(option.value);
                    return (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            transition={{ duration: 0.1 }}
                            onClick={() => handleToggle(option.value)}
                            className="flex items-center cursor-pointer"
                        >
                            {/* Custom checkbox: box on the left */}
                            <div className="w-6 h-6 flex-shrink-0 border rounded flex items-center justify-center mr-2">
                                {isSelected && <div className="w-3 h-3 rounded-full bg-black"></div>}
                            </div>
                            {/* Option label on the right */}
                            <div className="text-sm tracking-wider">{option.label}</div>
                        </motion.div>
                    );
                })}
            </div>
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
});

export default CustomCheckboxGroup;
