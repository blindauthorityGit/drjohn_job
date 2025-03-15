// components/steps/StepTwo.jsx
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import CustomDropdown from "@/components/input/customDropDown";
import CustomCheckboxGroup from "@/components/input/customCheckboxGroup";
import CustomSlider from "@/components/input/customSlider";

const StepTwo = forwardRef(({ formData }, ref) => {
    const [localData, setLocalData] = useState({
        schulabschluss: formData.schulabschluss || "",
        qualifikation: formData.qualifikation || [],
        erfahrung: formData.erfahrung || 0,
    });
    const dropdownRef = useRef();
    const checkboxRef = useRef();
    const sliderRef = useRef();

    // If formData changes, update localData so previously entered values appear
    useEffect(() => {
        setLocalData({
            schulabschluss: formData.schulabschluss || "",
            qualifikation: formData.qualifikation || [],
            erfahrung: formData.erfahrung || 0,
        });
    }, [formData]);

    const handleFieldChange = (name, value) => {
        setLocalData((prev) => ({ ...prev, [name]: value }));
    };

    // Validator for the dropdown: error if nothing is selected
    const validateJobType = (value) => {
        if (!value) {
            return "Bitte eine Auswahl treffen";
        }
        return null;
    };

    // Validator for the checkbox group: require at least one selection
    const validateInterests = (value) => {
        if (!value || value.length === 0) {
            return "Bitte eine Auswahl treffen";
        }
        return null;
    };

    // Validator for the slider – here we assume it's always valid (or you can add your logic)
    const validateSlider = (value) => {
        return null;
    };

    // Expose methods to the parent via the ref:
    // - validate: triggers validations for dropdown, checkbox group, and slider
    // - getData: returns the local form data for this step
    useImperativeHandle(ref, () => ({
        validate: () => {
            const dropdownValid = dropdownRef.current.validate();
            const checkboxValid = checkboxRef.current.validate();
            const sliderValid = sliderRef.current.validate();
            return dropdownValid && checkboxValid && sliderValid;
        },
        getData: () => localData,
    }));

    // Options for the dropdown
    const options = [
        { value: "Kein Schulabschluss", label: "Kein Schulabschluss" },
        { value: "Hauptschulabschluss", label: "Hauptschulabschluss" },
        {
            value: "Mittlerer Schulabschluss (Realschulabschluss)",
            label: "Mittlerer Schulabschluss (Realschulabschluss)",
        },
        { value: "Fachhochschulreife", label: "Fachhochschulreife" },
        { value: "Allgemeine Hochschulreife (Abitur)", label: "Allgemeine Hochschulreife (Abitur)" },
        // { value: "Berufsabschluss ohne Schulabschluss", label: "Berufsabschluss ohne Schulabschluss" },
        // { value: "Berufsabschluss mit Hauptschulabschluss", label: "Berufsabschluss mit Hauptschulabschluss" },
        // { value: "Berufsabschluss mit Realschulabschluss", label: "Berufsabschluss mit Realschulabschluss" },
        // { value: "Berufsabschluss mit Fachhochschulreife", label: "Berufsabschluss mit Fachhochschulreife" },
        // { value: "Berufsabschluss mit Abitur", label: "Berufsabschluss mit Abitur)" },
        { value: "Sonstiger Abschluss", label: "Sonstiger Abschluss)" },
    ];

    // Options for the checkbox group
    const options2 = [
        { value: "Keine abgeschlossene Berufsausbildung", label: "Keine abgeschlossene Berufsausbildung" },
        { value: "Abgeschlossene Berufsausbildung", label: "Abgeschlossene Berufsausbildung" },
        { value: "Meister/in oder Techniker/in", label: "Meister/in oder Techniker/in" },
        { value: "Studium (Bachelor)", label: "Studium (Bachelor)" },
        { value: "Studium (Master, Diplom, Staatsexamen)", label: "Studium (Master, Diplom, Staatsexamen)" },
        { value: "Sonstige", label: "Sonstige" },
    ];

    return (
        <div>
            <div className="lg:mt-8"></div>

            <CustomDropdown
                ref={dropdownRef}
                name="schulabschluss"
                label="Höchster Schulabschluss?"
                options={options}
                value={localData.schulabschluss}
                onChange={handleFieldChange}
                validator={validateJobType}
            />
            <div className="h-4"></div>
            <CustomCheckboxGroup
                ref={checkboxRef}
                name="qualifikation"
                label="Welche beruflichen Qualifikationen haben Sie? (Mehrfachauswahl möglich)"
                options={options2}
                value={localData.qualifikation}
                onChange={handleFieldChange}
                validator={validateInterests}
            />
            <div className="h-4"></div>

            <CustomSlider
                ref={sliderRef}
                name="erfahrung"
                label="Wie viele Jahre Berufserfahrung haben Sie?"
                min={0}
                max={30}
                step={1}
                value={localData.erfahrung}
                onChange={handleFieldChange}
                validator={validateSlider}
            />
        </div>
    );
});

export default StepTwo;
