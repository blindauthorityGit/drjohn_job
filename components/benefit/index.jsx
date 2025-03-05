// components/Benefit.jsx
import React from "react";
import { FaCheck } from "react-icons/fa";

const Benefit = ({ icon, title, items }) => {
    return (
        <div className="flex flex-col items-center p-4 ">
            {/* Centered Icon */}
            {icon && <div className="mb-4 text-[#7D886E] text-4xl">{icon}</div>}

            {/* Title */}
            {title && <h3 className="text-xl font-semibold mb-4 tracking-wider">{title}</h3>}

            {/* List of Benefits */}
            {items && (
                <ul className="space-y-2">
                    {items.map((item, index) => (
                        <li key={index} className="flex items-center tracking-wider text-lg">
                            <FaCheck className="text-[#7D886E] mr-2" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Benefit;
