// components/CustomChoiceInput.jsx
import React, { useState, forwardRef, useImperativeHandle } from "react";

const CustomChoiceInput = forwardRef(({ name, options, value, onChange, validator, label }, ref) => {
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

    const handleSelect = (selectedValue) => {
        onChange(name, selectedValue);
        if (error) {
            setError(null);
        }
    };

    return (
        <div className="mb-6">
            {/* Render label above the options if provided */}
            {label && (
                <label className=" text-lg tracking-wider text-black relative flex">
                    <div className="w-4 h-4 mr-2 bg-[#D9DED7]" />
                    {label}
                </label>
            )}
            <div className="flex space-x-4 mt-4">
                {options.map((option, index) => {
                    const isActive = value === option.value;
                    return (
                        <div
                            key={index}
                            className={`cursor-pointer p-4 border rounded-md flex flex-col items-center justify-center w-48 h-48 transition-colors ${
                                isActive
                                    ? "bg-[#7D886E] border-[#7D886E] text-white"
                                    : "bg-white border-gray-300 text-gray-700"
                            }`}
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.icon && <div className={`mb-2 ${isActive ? "invert" : ""}`}>{option.icon}</div>}
                            <div className="text-lg tracking-wider">{option.label}</div>
                        </div>
                    );
                })}
            </div>
            {error && <p className="mt-1  text-red-500  tracking-wider">{error}</p>}
        </div>
    );
});

export default CustomChoiceInput;
