// components/steps/StepOne.jsx
import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";
import CustomTextInput from "@/components/input/customTextInput";
import CustomChoiceInput from "@/components/input/customChoiceInput";

import Vollzeit from "@/assets/vollzeit.svg";
import Teilzeit from "@/assets/teilzeit.svg";

const StepOne = forwardRef(({ formData }, ref) => {
    const [localData, setLocalData] = useState({
        zeitWunsch: formData.zeitWunsch || "",
        Arbeitsumfang: formData.optionSelected || "",
    });
    const textInputRef = useRef();
    const choiceInputRef = useRef();

    const handleFieldChange = (name, value) => {
        setLocalData((prev) => ({ ...prev, [name]: value }));
    };

    // Optional validator for the text input (adjust as needed)
    const validateZeitWunsch = (value) => {
        // For example, this field could be optional, so no error is returned.
        return null;
    };

    // A simple validator for the choice input (error if nothing is selected)
    const validateChoice = (value) => {
        if (!value) {
            return "Bitte eine Option wählen";
        }
        return null;
    };

    // Expose methods to the parent via the ref:
    // - validate: triggers validation on both custom inputs
    // - getData: returns the local form data for this step
    useImperativeHandle(ref, () => ({
        validate: () => {
            const textValid = textInputRef.current.validate();
            const choiceValid = choiceInputRef.current.validate();
            return textValid && choiceValid;
        },
        getData: () => localData,
    }));

    // Example options for the custom choice component
    const options = [
        { value: "Vollzeit", label: "Vollzeit", icon: <img src={Vollzeit.src}></img> },
        { value: "Teilzeit", label: "Teilzeit", icon: <img src={Teilzeit.src}></img> },
    ];

    return (
        <div>
            <div className="mt-8"></div>
            {/* Text input field */}
            <CustomChoiceInput
                ref={choiceInputRef}
                label="Möchten Sie Voll- oder Teilzeit arbeiten?"
                name="Arbeitsumfang"
                options={options}
                value={localData.Arbeitsumfang}
                onChange={handleFieldChange}
                validator={validateChoice}
            />
            <div className="h-4"></div>

            <CustomTextInput
                ref={textInputRef}
                label="Wie viele Stunden und Tage pro Woche? (optional)"
                name="zeitWunsch"
                placeholder="z.B. 38h pro Woche"
                value={localData.zeitWunsch}
                onChange={handleFieldChange}
                validator={validateZeitWunsch}
            />
            {/* Custom choice input mapped out */}
        </div>
    );
});

export default StepOne;
