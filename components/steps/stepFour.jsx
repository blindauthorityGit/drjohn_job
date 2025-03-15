import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import CustomTextInput from "@/components/input/customTextInput";
import CustomCheckboxGroup from "@/components/input/customCheckboxGroup";
import CustomDropdown from "@/components/input/customDropDown";

const StepFour = forwardRef(({ formData }, ref) => {
    const [localData, setLocalData] = useState({
        vorname: formData.vorname || "",
        nachname: formData.nachname || "",
        geburtsjahr: formData.geburtsjahr || "",
        email: formData.email || "",
        telefon: formData.telefon || "",
        kontaktweg: formData.kontaktweg || [],
        kontaktzeit: formData.kontaktzeit || "",
    });

    // Create separate refs for each group of fields.
    const personalDataRef = useRef();
    const birthYearRef = useRef();
    const contactInfoRef = useRef();
    const checkboxRef = useRef();
    const dropdownRef = useRef();

    // Update localData if formData changes (e.g. when the user navigates back)
    useEffect(() => {
        setLocalData({
            vorname: formData.vorname || "",
            nachname: formData.nachname || "",
            geburtsjahr: formData.geburtsjahr || "",
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

    // Nachname is optional.
    const validateOptional = () => null;

    // Mandatory validator for Geburtsjahr.
    const validateGeburtsjahr = (value) => {
        if (!value.trim()) {
            return "Bitte geben Sie Ihr Geburtsjahr ein";
        }
        if (!/^\d{4}$/.test(value.trim())) {
            return "Bitte geben Sie ein gültiges Geburtsjahr ein (z.B. 1980)";
        }
        return null;
    };

    const validateEmail = (value) => {
        if (!value.trim()) {
            return "Bitte geben Sie Ihre E-Mail-Adresse ein";
        }
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

    // Expose validate() and getData() methods.
    useImperativeHandle(ref, () => ({
        validate: () => {
            const personalValid = personalDataRef.current.validate();
            const birthYearValid = birthYearRef.current.validate();
            const contactValid = contactInfoRef.current.validate();
            const checkboxValid = checkboxRef.current.validate();
            const dropdownValid = dropdownRef.current.validate();
            return personalValid && birthYearValid && contactValid && checkboxValid && dropdownValid;
        },
        getData: () => localData,
    }));

    return (
        <div>
            <div className="lg:mt-8"></div>
            {/* Personal Data: Vorname and Nachname */}
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

            {/* Geburtsjahr Field */}
            <div className="mt-4">
                <CustomTextInput
                    ref={birthYearRef}
                    label="Geburtsjahr"
                    name="geburtsjahr"
                    placeholder="z.B. 1980"
                    value={localData.geburtsjahr}
                    onChange={handleFieldChange}
                    validator={validateGeburtsjahr}
                />
            </div>

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
