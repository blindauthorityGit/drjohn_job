// components/steps/StepFour.jsx
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import CustomTextInput from "@/components/input/customTextInput";
import CustomCheckboxGroup from "@/components/input/customCheckboxGroup";
import CustomDropdown from "@/components/input/customDropDown";

const StepFour = forwardRef(({ formData }, ref) => {
    const [localData, setLocalData] = useState({
        vorname: formData.vorname || "",
        nachname: formData.nachname || "",
        email: formData.email || "",
        telefon: formData.telefon || "",
        kontaktweg: formData.kontaktweg || [],
        kontaktzeit: formData.kontaktzeit || "",
    });

    // Create separate refs for each custom input group
    const personalDataRef = useRef();
    const contactInfoRef = useRef();
    const checkboxRef = useRef();
    const dropdownRef = useRef();

    // If formData changes, update localData so previously entered values appear
    useEffect(() => {
        setLocalData({
            vorname: formData.vorname || "",
            nachname: formData.nachname || "",
            email: formData.email || "",
            telefon: formData.telefon || "",
            kontaktweg: formData.kontaktweg || [],
            kontaktzeit: formData.kontaktzeit || "",
        });
    }, [formData]);

    const handleFieldChange = (name, value) => {
        setLocalData((prev) => ({ ...prev, [name]: value }));
    };

    // Validators
    const validateVorname = (value) => {
        if (!value.trim()) {
            return "Bitte geben Sie Ihren Vornamen ein";
        }
        return null;
    };

    // Nachname is optional; no validation needed.
    const validateOptional = () => null;

    const validateEmail = (value) => {
        if (!value.trim()) {
            return "Bitte geben Sie Ihre E-Mail-Adresse ein";
        }
        // Simple email check
        if (!value.includes("@")) {
            return "Bitte geben Sie eine gültige E-Mail-Adresse ein";
        }
        return null;
    };

    const validateTelefon = (value) => {
        if (!value.trim()) {
            return "Bitte geben Sie Ihre Telefonnummer ein";
        }
        return null;
    };

    // For the checkbox group, require exactly one selection.
    const validateKontaktweg = (value) => {
        if (!value || value.length !== 1) {
            return "Bitte wählen Sie einen bevorzugten Kontaktweg";
        }
        return null;
    };

    const validateKontaktzeit = (value) => {
        if (!value) {
            return "Bitte wählen Sie eine Kontaktzeit";
        }
        return null;
    };

    // Expose a combined validate() and getData() to the parent.
    useImperativeHandle(ref, () => ({
        validate: () => {
            const personalValid = personalDataRef.current.validate();
            const contactValid = contactInfoRef.current.validate();
            const checkboxValid = checkboxRef.current.validate();
            const dropdownValid = dropdownRef.current.validate();
            return personalValid && contactValid && checkboxValid && dropdownValid;
        },
        getData: () => localData,
    }));

    return (
        <div>
            <div className="lg:mt-8"></div>

            {/* Personal Data */}
            <CustomTextInput
                ref={personalDataRef}
                label="Bitte geben Sie Ihre persönlichen Daten an."
                name="vorname"
                placeholder="Vorname"
                value={localData.vorname}
                onChange={handleFieldChange}
                validator={validateVorname}
                secondName="nachname"
                secondPlaceholder="Nachname (optional)"
                secondValue={localData.nachname}
                secondOnChange={handleFieldChange}
                secondValidator={validateOptional}
            />

            {/* Contact Information */}
            <CustomTextInput
                ref={contactInfoRef}
                label="Wie können wir Sie erreichen?"
                name="email"
                placeholder="E-Mail"
                value={localData.email}
                onChange={handleFieldChange}
                validator={validateEmail}
                secondName="telefon"
                secondPlaceholder="Telefon"
                secondValue={localData.telefon}
                secondOnChange={handleFieldChange}
                secondValidator={validateTelefon}
            />

            {/* Preferred Contact Method */}
            <CustomCheckboxGroup
                ref={checkboxRef}
                name="kontaktweg"
                label="Bevorzugter Kontaktweg"
                options={[
                    { value: "Mail", label: "E-Mail" },
                    { value: "Telefon", label: "Telefon" },
                    { value: "Email & Telefon", label: "Email & Telefon" },
                ]}
                value={localData.kontaktweg}
                onChange={handleFieldChange}
                validator={validateKontaktweg}
            />

            {/* Preferred Contact Time */}
            <CustomDropdown
                ref={dropdownRef}
                name="kontaktzeit"
                label="Bevorzugte Kontaktzeit"
                options={[
                    { value: "Vormittags (08:00–12:00 Uhr)", label: "Vormittags (08:00–12:00 Uhr)" },
                    { value: "Nachmittags (12:00–18:00 Uhr)", label: "Nachmittags (12:00–18:00 Uhr)" },
                    { value: "Abends (18:00–20:00 Uhr)", label: "Abends (18:00–20:00 Uhr)" },
                    { value: "Jederzeit", label: "Jederzeit" },
                    { value: "Nach Absprache", label: "Nach Absprache" },
                ]}
                value={localData.kontaktzeit}
                onChange={handleFieldChange}
                validator={validateKontaktzeit}
            />
        </div>
    );
});

export default StepFour;
