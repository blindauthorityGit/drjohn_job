// components/CustomTextInput.jsx
import React, { useState, forwardRef, useImperativeHandle } from "react";

const CustomTextInput = forwardRef(
    (
        {
            label,
            name,
            placeholder,
            value,
            onChange,
            validator,
            // Optional secondary input props:
            secondName,
            secondPlaceholder,
            secondValue,
            secondOnChange,
            secondValidator,
        },
        ref
    ) => {
        const [error, setError] = useState(null);
        const [secondError, setSecondError] = useState(null);

        // Expose a validate() method to parent components.
        // It validates both the primary and (if provided) secondary input.
        useImperativeHandle(ref, () => ({
            validate: () => {
                let valid = true;
                if (validator) {
                    const errorMsg = validator(value);
                    setError(errorMsg);
                    if (errorMsg) valid = false;
                }
                if (secondValidator && secondName) {
                    const errorMsg2 = secondValidator(secondValue);
                    setSecondError(errorMsg2);
                    if (errorMsg2) valid = false;
                }
                return valid;
            },
        }));

        const handleInputChange = (e) => {
            const newValue = e.target.value;
            onChange(name, newValue);
            if (error && validator) {
                const errorMsg = validator(newValue);
                setError(errorMsg);
            }
        };

        const handleSecondInputChange = (e) => {
            const newValue = e.target.value;
            if (secondOnChange) {
                secondOnChange(secondName, newValue);
            }
            if (secondError && secondValidator) {
                const errorMsg2 = secondValidator(newValue);
                setSecondError(errorMsg2);
            }
        };

        return (
            <div className="relative mb-6 font-headline">
                {label && (
                    <label className="text-lg tracking-wider text-black relative flex">
                        <div className="w-4 h-4 mr-2 bg-[#D9DED7]" />
                        {label}
                    </label>
                )}
                {secondName ? (
                    // Responsive container: stacked on mobile, side-by-side on lg
                    <div className="flex flex-col lg:flex-row gap-4 mt-1">
                        <input
                            type="text"
                            name={name}
                            value={value}
                            onChange={handleInputChange}
                            placeholder={placeholder}
                            className={`block tracking-wider border p-4 focus:ring-blue-500 focus:border-blue-500 flex-1 ${
                                error ? "border-red-500" : "border-black"
                            }`}
                        />
                        <input
                            type="text"
                            name={secondName}
                            value={secondValue}
                            onChange={handleSecondInputChange}
                            placeholder={secondPlaceholder}
                            className={`block tracking-wider border p-4 focus:ring-blue-500 focus:border-blue-500 flex-1 ${
                                secondError ? "border-red-500" : "border-black"
                            }`}
                        />
                    </div>
                ) : (
                    <input
                        type="text"
                        name={name}
                        value={value}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        className={`mt-1 block tracking-wider w-full border p-4 focus:ring-blue-500 focus:border-blue-500 ${
                            error ? "border-red-500" : "border-black"
                        }`}
                    />
                )}
                {error && <p className="mt-1 text-sm text-red-500 font-bold">{error}</p>}
                {secondError && <p className="mt-1 text-sm text-red-500 font-bold">{secondError}</p>}
            </div>
        );
    }
);

export default CustomTextInput;
