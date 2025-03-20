import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
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

    // If formData changes, update localData so previously entered values appear
    useEffect(() => {
        setLocalData({
            gehalt: formData.gehalt || "",
            urlaub: formData.urlaub || "",
            beginn: formData.beginn || "",
        });
    }, [formData]);

    const handleFieldChange = (name, value) => {
        setLocalData((prev) => ({ ...prev, [name]: value }));
    };

    // Validator for the salary input – now mandatory.
    const validateGehalt = (value) => {
        if (!value.trim()) {
            return "Bitte geben Sie Ihr gewünschtes Gehalt ein";
        }
        return null;
    };

    // Validator for the vacation input – now mandatory.
    const validateUrlaub = (value) => {
        if (!value.trim()) {
            return "Bitte geben Sie Ihre Urlaubstage an";
        }
        return null;
    };

    // Validator for the dropdown – error if no option is selected.
    const validateJobType = (value) => {
        if (!value) {
            return "Bitte wählen Sie einen Beginn";
        }
        return null;
    };

    // Expose methods to the parent via the ref.
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
                validator={validateGehalt}
            />
            <div className="h-4"></div>
            <CustomTextInput
                ref={vacationRef}
                label="Wie viele Urlaubstage wünschen Sie sich pro Jahr?"
                name="urlaub"
                placeholder="z.B. 30 Tage / Jahr"
                value={localData.urlaub}
                onChange={handleFieldChange}
                validator={validateUrlaub}
            />
            <div className="h-4"></div>
            <CustomDropdown
                ref={dropdownRef}
                name="beginn"
                label="Wann möchten Sie bei uns loslegen und unser Team bereichern?"
                options={options}
                value={localData.beginn}
                onChange={handleFieldChange}
                validator={validateJobType}
            />
        </div>
    );
});

export default StepThree;
