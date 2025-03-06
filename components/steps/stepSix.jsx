// components/steps/StepSummary.jsx
import React, { forwardRef, useImperativeHandle } from "react";
import Eins from "@/assets/1.jpg"; // optional final image

// A lookup table for friendlier field names
const fieldLabels = {
    vorname: "Vorname",
    nachname: "Nachname",
    email: "E-Mail",
    telefon: "Telefon",
    kontaktweg: "Bevorzugter Kontaktweg",
    kontaktzeit: "Bevorzugte Kontaktzeit",
    schulabschluss: "Höchster Schulabschluss",
    qualifikation: "Berufliche Qualifikationen",
    erfahrung: "Jahre Berufserfahrung",
    gehalt: "Gewünschtes Gehalt",
    urlaub: "Urlaubstage",
    beginn: "Gewünschter Eintrittstermin",
    zeitWunsch: "Zeitwunsch",
};

const StepSix = forwardRef(({ formData }, ref) => {
    useImperativeHandle(ref, () => ({
        validate: () => true, // No validation needed on the summary step
        getData: () => formData,
    }));

    // Ensure fileData is an array even if formData.fileData is an object
    const fileData = formData.fileData && Array.isArray(formData.fileData) ? formData.fileData : [];

    // Remove fileData from otherFields so we don't try to render it in the dynamic map
    const { fileData: _, ...otherFields } = formData || {};

    return (
        <div className="lg:mt-8">
            <div className="flex flex-col">
                <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider">ZUSAMMENFASSUNG</h2>

                <div className="space-y-6">
                    {Object.entries(otherFields).map(([key, value]) => {
                        // Skip empty or undefined values, or empty arrays
                        if (
                            value === undefined ||
                            value === null ||
                            (typeof value === "string" && value.trim() === "") ||
                            (Array.isArray(value) && value.length === 0)
                        ) {
                            return null;
                        }

                        // If it's an object (and not an array), skip it so we don't render [object Object]
                        if (typeof value === "object" && !Array.isArray(value)) {
                            return null;
                        }

                        // For arrays, join with commas; otherwise, use the raw value
                        const displayValue = Array.isArray(value) ? value.join(", ") : value;

                        // Use a friendly label if available, else the key
                        const label = fieldLabels[key] || key;

                        return (
                            <div key={key} className="text-sm text-gray-700">
                                <p className="mb-1">
                                    <span className="font-semibold">{label}:</span> {displayValue}
                                </p>
                            </div>
                        );
                    })}

                    {/* Render uploaded files if any */}
                    {fileData.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Hochgeladene Bewerbungsunterlagen</h3>
                            <div className="flex flex-wrap gap-4">
                                {fileData.map((file, index) => (
                                    <div key={index} className="flex flex-col items-center">
                                        {file.type?.startsWith("image/") ? (
                                            <img
                                                src={file.url}
                                                alt={file.name}
                                                className="w-20 h-20 object-cover rounded"
                                            />
                                        ) : (
                                            <div className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded">
                                                <span className="text-3xl">📄</span>
                                            </div>
                                        )}
                                        <p className="text-sm mt-1">{file.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

export default StepSix;
