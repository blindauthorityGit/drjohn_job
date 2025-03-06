// components/steps/StepThree.jsx
import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";
import CustomTextInput from "@/components/input/customTextInput";
import CustomDropdown from "@/components/input/customDropDown";

const StepThree = forwardRef(({ formData }, ref) => {
    const [localData, setLocalData] = useState({
        gehalt: formData.gehalt || "",
        urlaub: formData.urlaub || "",
        beginn: formData.beginn || "",
    });

    // Create separate refs for each input field
    const salaryRef = useRef();
    const vacationRef = useRef();
    const dropdownRef = useRef();

    const handleFieldChange = (name, value) => {
        setLocalData((prev) => ({ ...prev, [name]: value }));
    };

    // Optional validator for the text inputs (if these fields are optional)
    const validateOptional = (value) => {
        return null;
    };

    // Validator for the dropdown – error if no option is selected
    const validateJobType = (value) => {
        if (!value) {
            return "Bitte wählen Sie einen Beginn";
        }
        return null;
    };

    // Expose methods to the parent via the ref:
    // - validate: triggers validation on each input field
    // - getData: returns the local form data for this step
    useImperativeHandle(ref, () => ({
        validate: () => {
            const salaryValid = salaryRef.current.validate();
            const vacationValid = vacationRef.current.validate();
            const dropdownValid = dropdownRef.current.validate();
            return salaryValid && vacationValid && dropdownValid;
        },
        getData: () => localData,
    }));

    // Options for the dropdown (when you can start)
    const options = [
        { value: "Sofort", label: "Sofort" },
        { value: "Innerhalb eines Monats", label: "Innerhalb eines Monats" },
        { value: "Innerhalb von drei Monaten", label: "Innerhalb von drei Monaten" },
        { value: "Nach Absprache", label: "Nach Absprache" },
    ];

    return (
        <div>
            <div className="lg:mt-8"></div>

            <CustomTextInput
                ref={salaryRef}
                label="Welches Bruttojahresgehalt stellen Sie sich vor?"
                name="gehalt"
                placeholder="z.B. EUR 40.000 brutto / Jahr"
                value={localData.gehalt}
                onChange={handleFieldChange}
                validator={validateOptional}
            />
            <div className="h-4"></div>
            <CustomTextInput
                ref={vacationRef}
                label="Wie viele Urlaubstage wünschen Sie sich pro Jahr?"
                name="urlaub"
                placeholder="z.B. 30 Tage / Jahr"
                value={localData.urlaub}
                onChange={handleFieldChange}
                validator={validateOptional}
            />
            <div className="h-4"></div>
            <CustomDropdown
                ref={dropdownRef}
                name="beginn"
                label="Wann könnten Sie bei uns anfangen?"
                options={options}
                value={localData.beginn}
                onChange={handleFieldChange}
                validator={validateJobType}
            />
        </div>
    );
});

export default StepThree;
