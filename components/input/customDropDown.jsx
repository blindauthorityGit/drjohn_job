// components/CustomDropdown.jsx
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CustomDropdown = forwardRef(({ name, label, options, value, onChange, validator }, ref) => {
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

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

    const handleSelect = (selectedValue) => {
        onChange(name, selectedValue);
        setIsOpen(false);
        if (error) {
            setError(null);
        }
    };

    const selectedOption = options.find((option) => option.value === value);

    return (
        <div className="mb-6 relative">
            {label && (
                <label className=" text-lg tracking-wider text-black relative flex">
                    <div className="w-4 h-4 mr-2 bg-[#D9DED7]" />
                    {label}
                </label>
            )}
            <div
                className="border border-gray-300 rounded-md p-4 mt-4 cursor-pointer flex justify-between items-center"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <span className="text-lg tracking-wider">
                    {selectedOption ? selectedOption.label : "Bitte auswählen"}
                </span>
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        className="absolute left-0 right-0 mt-1 border border-gray-300 rounded-md bg-white z-10"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                    >
                        {options.map((option, index) => (
                            <motion.li
                                key={index}
                                onClick={() => handleSelect(option.value)}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm tracking-wider"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.1 }}
                            >
                                {option.label}
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
});

export default CustomDropdown;
