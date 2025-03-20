// components/CustomTextArea.jsx
import React, { useState, forwardRef, useImperativeHandle } from "react";

const CustomTextArea = forwardRef(({ label, name, placeholder, value, onChange, validator }, ref) => {
    const [error, setError] = useState(null);

    // Expose a validate() method to parent components.
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
        const newValue = e.target.value;
        onChange(name, newValue);
        if (error && validator) {
            const errorMsg = validator(newValue);
            setError(errorMsg);
        }
    };

    return (
        <div className="relative mb-6 font-headline">
            {label && <label className="block text-lg tracking-wider text-black mb-1">{label}</label>}
            <textarea
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                rows="4"
                className={`mt-1 block w-full p-4 border focus:ring-blue-500 focus:border-blue-500 ${
                    error ? "border-red-500" : "border-black"
                }`}
            />
            {error && <p className="mt-1 text-sm text-red-500 font-bold">{error}</p>}
        </div>
    );
});

export default CustomTextArea;
