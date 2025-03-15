// pages/api/send-email.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { formData } = req.body;

    // Create a transporter using environment variables for security
    let transporter = nodemailer.createTransport({
        host: process.env.NEXT_DEV === "true" ? "smtp.world4you.com" : "smtp.strato.de",
        port: 587,
        secure: false,
        auth: {
            user: process.env.NEXT_DEV === "true" ? process.env.NEXT_W4YUSER : process.env.NEXT_MAIL_BUCHUNG_LIVE,
            pass: process.env.NEXT_DEV === "true" ? process.env.NEXT_W4YPASSWORD : process.env.NEXT_MAIL_PW_LIVE,
        },
    });

    // Construct a nicely formatted email (HTML)
    let emailContent = `
    <h1>Neue Bewerbung</h1>
    <ul>
      <li><strong>Name:</strong> ${formData.vorname || ""} ${formData.nachname || ""}</li>
      <li><strong>Geburtsjahr:</strong> ${formData.geburtsjahr || ""}</li>
      <li><strong>E-Mail:</strong> ${formData.email || ""}</li>
      <li><strong>Telefon:</strong> ${formData.telefon || ""}</li>
      <li><strong>Kontaktweg:</strong> ${
          Array.isArray(formData.kontaktweg) ? formData.kontaktweg.join(", ") : formData.kontaktweg || ""
      }</li>
      <li><strong>Kontaktzeit:</strong> ${formData.kontaktzeit || ""}</li>
      <li><strong>Schulabschluss:</strong> ${formData.schulabschluss || ""}</li>
      <li><strong>Qualifikationen:</strong> ${
          Array.isArray(formData.qualifikation) ? formData.qualifikation.join(", ") : formData.qualifikation || ""
      }</li>
      <li><strong>Erfahrung:</strong> ${formData.erfahrung || 0} Jahre</li>
      <li><strong>Gehalt:</strong> ${formData.gehalt || ""}</li>
      <li><strong>Urlaub:</strong> ${formData.urlaub || ""}</li>
      <li><strong>Eintrittstermin:</strong> ${formData.beginn || ""}</li>
      <li><strong>Zeitwunsch:</strong> ${formData.zeitWunsch || ""}</li>
      ${
          formData.fileData && formData.fileData.length
              ? `<li><strong>Dateien:</strong> ${formData.fileData.map((file) => file.fileName).join(", ")}</li>`
              : ""
      }
    </ul>
  `;

    try {
        let info = await transporter.sendMail({
            from: process.env.NEXT_DEV === "true" ? process.env.NEXT_W4YUSER : process.env.NEXT_MAIL_BUCHUNG_LIVE,
            to: process.env.NEXT_DEV === "true" ? "office@atelierbuchner.at" : "th@praxis-dreieich.de",
            subject: "Neue Bewerbung von " + (formData.vorname || "") + " " + (formData.nachname || ""),
            html: emailContent,
        });

        return res.status(200).json({ message: "Email sent", info });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Email failed", error: error.message });
    }
}
