// pages/api/send-email.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { formData } = req.body;

    // Create a transporter using environment variables for security
    let transporter = nodemailer.createTransport({
        host: process.env.NEXT_DEV === "true" ? "smtp.world4you.com" : "smtp.ionos.de",
        port: 587,
        secure: false,
        auth: {
            user: process.env.NEXT_DEV === "true" ? process.env.NEXT_W4YUSER : process.env.NEXT_W4YUSER,
            pass: process.env.NEXT_DEV === "true" ? process.env.NEXT_W4YPASSWORD : process.env.NEXT_W4YUSER,
        },
    });

    // Build a nicely formatted email content in HTML.
    // Only include fields if they have content.
    let emailContent = `<h1 style="font-size:1.5rem; margin-bottom:1rem;">Neue Bewerbung</h1><ul style="list-style:none; padding:0; font-size:1rem; line-height:1.4;">`;

    if (formData.job) {
        emailContent += `<li><strong>Stelle:</strong> ${formData.job}</li>`;
    }
    if (formData.vorname || formData.nachname) {
        emailContent += `<li><strong>Name:</strong> ${formData.vorname || ""} ${formData.nachname || ""}</li>`;
    }
    if (formData.geburtsjahr) {
        emailContent += `<li><strong>Geburtsjahr:</strong> ${formData.geburtsjahr}</li>`;
    }
    if (formData.email) {
        emailContent += `<li><strong>E-Mail:</strong> ${formData.email}</li>`;
    }
    if (formData.telefon) {
        emailContent += `<li><strong>Telefon:</strong> ${formData.telefon}</li>`;
    }
    if (formData.kontaktweg && Array.isArray(formData.kontaktweg) && formData.kontaktweg.length > 0) {
        emailContent += `<li><strong>Kontaktweg:</strong> ${formData.kontaktweg.join(", ")}</li>`;
    }
    if (formData.kontaktzeit) {
        emailContent += `<li><strong>Kontaktzeit:</strong> ${formData.kontaktzeit}</li>`;
    }
    if (formData.schulabschluss) {
        emailContent += `<li><strong>Schulabschluss:</strong> ${formData.schulabschluss}</li>`;
    }
    if (formData.qualifikation && Array.isArray(formData.qualifikation) && formData.qualifikation.length > 0) {
        emailContent += `<li><strong>Qualifikationen:</strong> ${formData.qualifikation.join(", ")}</li>`;
    }
    if (formData.erfahrung || formData.erfahrung === 0) {
        emailContent += `<li><strong>Erfahrung:</strong> ${formData.erfahrung} Jahre</li>`;
    }
    if (formData.gehalt) {
        emailContent += `<li><strong>Gehalt:</strong> ${formData.gehalt}</li>`;
    }
    if (formData.urlaub) {
        emailContent += `<li><strong>Urlaub:</strong> ${formData.urlaub}</li>`;
    }
    if (formData.beginn) {
        emailContent += `<li><strong>Eintrittstermin:</strong> ${formData.beginn}</li>`;
    }
    if (formData.zeitWunsch) {
        emailContent += `<li><strong>Zeitwunsch:</strong> ${formData.zeitWunsch}</li>`;
    }
    if (formData.zusatzinfo) {
        emailContent += `<li><strong>Zusatzinfo:</strong> ${formData.zusatzinfo}</li>`;
    }
    if (formData.downloadURLs && Array.isArray(formData.downloadURLs) && formData.downloadURLs.length > 0) {
        emailContent += `<li><strong>Dateien:</strong><br/>`;
        formData.downloadURLs.forEach((url) => {
            emailContent += `<a href="${url}" target="_blank" style="color:blue; text-decoration:underline;">${url}</a><br/>`;
        });
        emailContent += `</li>`;
    }
    emailContent += `</ul>`;

    try {
        let info = await transporter.sendMail({
            from: process.env.NEXT_DEV === "true" ? process.env.NEXT_W4YUSER : process.env.NEXT_W4YUSER,
            to: process.env.NEXT_DEV === "true" ? "office@atelierbuchner.at" : "th@praxis-dreieich.de",
            subject:
                "Neue Bewerbung als " +
                (formData.job || "unbekannt") +
                " von " +
                (formData.vorname || "") +
                " " +
                (formData.nachname || ""),
            html: emailContent,
        });

        return res.status(200).json({ message: "Email sent", info });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Email failed", error: error.message });
    }
}
