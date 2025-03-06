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
        title: "Angenehmes Arbeitsklima",
        items: [
            "Kurze Entscheidungswege & flache Hierarchien",
            "Kollegiales Team & regelmäßige Mitarbeiterevents",
            "Krisensicherer Arbeitsplatz",
        ],
    },
    {
        icon: <FaGraduationCap size={64} />,
        title: "Entwicklung & Weiterbildung",
        items: [
            "Karriereperspektiven & interne Weiterbildungsmöglichkeiten",
            "Übernahme von Weiterbildungen & Fortbildungskosten",
        ],
    },
    {
        icon: <FaMoneyBillWave size={64} />,
        title: "Finanzielle Vorteile",
        items: [
            "Unbefristeter Arbeitsvertrag",
            "Urlaubsgeld & Weihnachtsgeld",
            "50 € steuerfrei extra zum Lohn (in Planung!)",
            "Inflationszuschuss & Erholungsbeihilfe (je nach Situation)",
        ],
    },
    {
        icon: <FaCoffee size={64} />,
        title: "Zusätzliche Annehmlichkeiten",
        items: [
            "Kostenlose Getränke",
            "Kostenfreier Parkplatz (3 Minuten von der Praxis entfernt)",
            "Sehr gute Anbindung aus Frankfurt & Umgebung",
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
                        <H1>Ihr Job mit echten Vorteilen!</H1>
                        <p className="text-lg tracking-wider mt-8">
                            Bei uns erwartet Sie mehr als nur ein Job! Wir legen großen Wert auf Fairness, Teamgeist und
                            echte Wertschätzung.
                        </p>
                        <p className="text-lg tracking-wider mt-4">
                            <strong>Hier sind einige unserer Benefits:</strong>
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 lg:p-12">
                            {benefitsData.map((benefit, index) => (
                                <Benefit key={index} icon={benefit.icon} title={benefit.title} items={benefit.items} />
                            ))}
                        </div>

                        <p className="text-lg tracking-wider mt-8 mb-16">
                            Bei uns treffen neue Kolleginnen & Kollegen auf ein berufliches Umfeld, in dem Fair Play,
                            Teamgeist und eine empathische, freundliche Chefin zusammenkommen. Wir fordern viel, aber
                            wir honorieren Leistung mit Benefits, Anerkennung und echtem Teamzusammenhalt.
                        </p>
                        <H1>Offene Stellen</H1>
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
