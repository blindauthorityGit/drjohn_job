import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import CustomTextInput from "@/components/input/customTextInput";
import CustomChoiceInput from "@/components/input/customChoiceInput";

import Vollzeit from "@/assets/vollzeit.svg";
import Teilzeit from "@/assets/teilzeit.svg";

const StepOne = forwardRef(({ formData }, ref) => {
    const [localData, setLocalData] = useState({
        zeitWunsch: formData.zeitWunsch || "",
        Arbeitsumfang: formData.Arbeitsumfang || "",
    });
    const textInputRef = useRef();
    const choiceInputRef = useRef();

    // Update local state if formData changes (e.g. when user navigates back)
    useEffect(() => {
        setLocalData({
            zeitWunsch: formData.zeitWunsch || "",
            Arbeitsumfang: formData.Arbeitsumfang || "",
        });
    }, [formData]);

    const handleFieldChange = (name, value) => {
        setLocalData((prev) => ({ ...prev, [name]: value }));
    };

    // Optional validator for the text input (this field is optional)
    const validateZeitWunsch = (value) => {
        return null;
    };

    // Simple validator for the choice input (must choose something)
    const validateChoice = (value) => {
        if (!value) {
            return "Bitte eine Option wählen";
        }
        return null;
    };

    // Expose methods to the parent via the ref
    useImperativeHandle(ref, () => ({
        validate: () => {
            const choiceValid = choiceInputRef.current.validate();
            // Only validate text input if "Teilzeit" is chosen.
            let textValid = true;
            if (localData.Arbeitsumfang === "Teilzeit") {
                textValid = textInputRef.current.validate();
            }
            return choiceValid && textValid;
        },
        getData: () => localData,
    }));

    // Options for the custom choice component
    const options = [
        { value: "Vollzeit", label: "Vollzeit", icon: <img src={Vollzeit.src} alt="Vollzeit" /> },
        { value: "Teilzeit", label: "Teilzeit", icon: <img src={Teilzeit.src} alt="Teilzeit" /> },
    ];

    return (
        <div>
            <div className="lg:mt-8"></div>
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
            {localData.Arbeitsumfang === "Teilzeit" && (
                <CustomTextInput
                    ref={textInputRef}
                    label="Wie viele Stunden und Tage pro Woche? (optional)"
                    name="zeitWunsch"
                    placeholder="z.B. 38h pro Woche"
                    value={localData.zeitWunsch}
                    onChange={handleFieldChange}
                    validator={validateZeitWunsch}
                />
            )}
        </div>
    );
});

export default StepOne;
