import React from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import { CoverImage } from "@/components/images";
import Menu from "@/components/menu";
import { H1, H3 } from "@/components/typography";
import Thilo from "@/assets/thilo.jpg";
import Start from "@/assets/6.jpg";

import Benefit from "@/components/benefit";
import { FaBalanceScale, FaSmile, FaGraduationCap, FaMoneyBillWave, FaCoffee } from "react-icons/fa";

const benefitsData = [
    {
        icon: <FaBalanceScale size={64} />,
        title: "Work-Life Balance",
        items: ["Flexible Arbeitszeiten", "Rücksichtnahme auf persönliche Belange (z. B. für Mütter)"],
    },
    {
        icon: <FaSmile size={64} />,
        title: "Angenehmes Umfeld",
        items: [
            "Kurze Entscheidungswege & flache Hierarchien",
            "Kollegiales Team, welches zusammenhält",
            "Sicherer, konjunkturunabhängiger Arbeitsplatz",
            "Freude bei der Arbeit",
            "Eigenverantwortliches Handeln mit Entscheidungsfreiheit",
        ],
    },
    {
        icon: <FaGraduationCap size={64} />,
        title: "Entwicklung & Weiterbildung",
        items: ["Externe und interne Weiterbildungsmöglichkeiten", "Übernahme von Fortbildungskosten"],
    },
    {
        icon: <FaMoneyBillWave size={64} />,
        title: "Finanzielle Vorteile",
        items: [
            "Unbefristeter Arbeitsvertrag",
            "Steuer- und sozialversicherungsfreie Lohn-Ersatzleistungen wie z.B. Erholungsbeihilfe",
            "Arbeitgeberunterstützte betriebliche Altersvorsorge",
            "Vergünstigte Einkaufskonditionen über Corporate Benefits",
        ],
    },
    {
        icon: <FaCoffee size={64} />,
        title: "Zusätzliche Annehmlichkeiten",
        items: [
            "Kostenfreier Parkplatz (3 Minuten von der Praxis entfernt)",
            "Sehr gute Anbindung aus Frankfurt & Umgebung",
            "Arbeiten in der schönsten Straße von Dreieich (direkt neben dem Eiscafe….besonders vorteilhaft im Sommer)",
            "Chefin und Praxismanager bringen immer wieder Kuchen mit",
        ],
    },
];

const jobLinks = [
    { code: "ZMA", title: "Zahnmedinische/r Fachangestellte/r", link: "zma" },
    { code: "ZMF", title: "Zahnmedinische/r Fachassistent/in", link: "zmf" },
    { code: "DH", title: "Dentalhygieniker/in", link: "dh" },
    { code: "ZMP", title: "Zahnmedizinische/r Prophylaxeassistent/in", link: "zmp" },
    { code: "Angestellte", title: "Angestellte/r Zahnärztin / Zahnarzt", link: "zahnarzt" },
    { code: "Assistenz", title: "Assistenz-Zahnärztin, Assistenz-Zahnarzt", link: "assistenz-zahnarzt" },
    { code: "ZMV", title: "Zahnmedizinische/r Verwaltungsassistent/in", link: "zmv" },
    { code: "Bürokraft", title: "Bürokraft mit fundierten Microsoft-Office-Wissen", link: "buerokraft" },
    { code: "Auszubildende", title: "Auszubildende/r ZMA", link: "azubi" },
];

export default function Home() {
    const router = useRouter();

    return (
        <>
            <Menu />
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen font-headline">
                {/* Mobile: Image on top; Desktop: Content on left */}
                <div className="order-first lg:order-last relative overflow-hidden">
                    <div className="h-[50vh] lg:fixed lg:top-0 lg:right-0 lg:h-screen lg:w-[33.33%]">
                        <AnimatePresence exitBeforeEnter>
                            <motion.div
                                key={Start.src}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="h-full w-full"
                            >
                                <CoverImage
                                    src={Start.src}
                                    mobileSrc={Start.src}
                                    alt="Cover Background"
                                    klasse={"absolute "}
                                    className="h-full w-full object-cover"
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Content Section */}
                <div className="order-last lg:order-first lg:col-span-8 p-8 lg:p-16 lg:pt-64 flex flex-col">
                    <div className="flex-1">
                        <H1>Ihr Lächeln fehlt uns noch – bewerben Sie sich bei uns.</H1>
                        <p className="text-lg tracking-wider mt-8">
                            Sie wünschen sich in Ihrem Job echte Wertschätzung? Sie freuen sich über Teamgeist und gute
                            Laune? Sie möchten wieder Spaß an dem haben, was Sie täglich tun? Na dann bewerben Sie sich
                            doch bei uns!{" "}
                        </p>
                        <p className="text-lg tracking-wider mt-4">
                            Geht ganz einfach: nehmen Sie sich <strong>zwei bis drei Minuten</strong> Zeit, beantworten
                            im Folgenden ein paar wenige Fragen und schon werden Sie vielleicht Teil unseres tollen
                            Teams, mit welchem Sie in Zukunft für unsere netten Patienten da sein können.
                        </p>
                        <p className="text-lg tracking-wider mt-4">
                            <strong>Hier sind einige unserer Benefits:</strong>
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 lg:p-12">
                            {benefitsData.map((benefit, index) => (
                                <Benefit key={index} icon={benefit.icon} title={benefit.title} items={benefit.items} />
                            ))}
                        </div>

                        <p className="text-lg tracking-wider mt-8 mb-4">
                            Bei uns treffen neue Kolleginnen & Kollegen auf eine berufliche Atmosphäre, in welcher Fair
                            Play, Teamgeist und eine empathische, freundliche Chefin und ein gutgelaunter, organisierter
                            Praxismanager auf menschlich tolle Leute treffen.
                        </p>
                        <p className="text-lg tracking-wider mt-8 mb-16">
                            Wir fordern einiges, honorieren dafür Leistung mit Benefits, Anerkennung, echtem
                            Teamzusammenhalt und Freude beim Job. (Obwohl wir so ehrlich sind und zugeben, dass bei uns
                            – wie überall – auch nicht immer alles Gold ist was glänzt.)
                        </p>
                        <H1 klasse="hyphens-auto !text-4xl !normal-case" lang="de">
                            Ihre Job-Möglichkeiten bei uns
                        </H1>
                        <p className="text-lg tracking-wider mt-8 mb-4">
                            Einfach zwei Minuten Zeit nehmen, durch die folgenden Fragen klicken und dann lernen wir uns
                            vielleicht bald kennen.
                        </p>
                        <ul className="space-y-6 mt-8 mb-16">
                            {jobLinks.map((job) => (
                                <li key={job.code}>
                                    <Link
                                        href={`/job/${job.link}`}
                                        className="text-black text-2xl tracking-wider hover:underline"
                                    >
                                        {job.code} / {job.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
