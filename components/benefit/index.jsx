// components/Benefit.jsx
import React from "react";
import { FaCheck } from "react-icons/fa";

const Benefit = ({ icon, title, items }) => {
    return (
        <div className="flex flex-col items-center p-4">
            {/* Centered Icon */}
            {icon && <div className="mb-4 text-[#7D886E] text-4xl">{icon}</div>}

            {/* Title */}
            {title && <h3 className="text-xl font-semibold mb-4 tracking-wider text-center lg:text-left">{title}</h3>}

            {/* List of Benefits */}
            {items && (
                <ul className="space-y-2">
                    {items.map((item, index) => (
                        <li key={index} className="flex items-start tracking-wider text-lg">
                            <div className="flex-shrink-0 mt-1">
                                <FaCheck size={16} className="text-[#7D886E] mr-2" />
                            </div>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Benefit;
