import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="stylesheet" href="https://use.typekit.net/kfk2cyx.css" />
                {/* Favicon */}
                <link rel="icon" href="/favicon.png" />
                {/* Standard SEO meta tags */}
                <title>Zahnärztin Dr. Katrin John • Zahnarztpraxis Dreieich</title>
                <meta
                    name="description"
                    content="Zahnarztpraxis Dr. Katrin John in Dreieich ➤ Ihre Praxis für Oralchirurgie & Implantologie. 100% Empfehlungen. Jetzt Termin vereinbaren!"
                />
                <meta name="keywords" content="keyword1, keyword2, keyword3" />
                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <body className="antialiased">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
