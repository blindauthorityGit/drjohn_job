import React from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

import { CoverImage } from "@/components/images";
import Menu from "@/components/menu";
import { H1, H3 } from "@/components/typography";
import Thilo from "@/assets/thilo.jpg";

export default function Success() {
    const router = useRouter();

    return (
        <>
            <Menu />
            <div className="grid grid-cols-12 min-h-screen overflow-y-auto font-headline">
                <div className="col-span-6 p-16 pt-64 flex flex-col">
                    <div className="flex-1">
                        <H1>Vielen Dank für Ihre Bewerbung bei der Zahnarztpraxis Dreieich!</H1>
                        <p className="text-lg tracking-wider mt-8">
                            Herzlichen Dank für Ihre Bewerbung und Ihr Interesse an einer Mitarbeit in unserer Praxis!
                        </p>
                        <p className="text-lg tracking-wider mt-4">
                            Wir wissen Ihr Vertrauen und Ihre Zeit sehr zu schätzen. Unser Praxismanager{" "}
                            <strong>Thilo Höpfl</strong> wird sich innerhalb der{" "}
                            <strong>nächsten 48 Stunden per E-Mail oder Telefon</strong> bei Ihnen melden.
                        </p>
                        <p className="text-lg tracking-wider mt-4">
                            Sollten Sie in der Zwischenzeit Fragen haben, stehen wir Ihnen gerne unter{" "}
                            <strong>
                                06103-84466 oder <a href="mailto:th@praxis-dreieich.de">th@praxis-dreieich.de</a>
                            </strong>{" "}
                            zur Verfügung.
                        </p>
                        <p className="text-lg tracking-wider mt-4">
                            Wir freuen uns darauf, Sie bald näher kennenzulernen!
                        </p>
                    </div>
                    {/* Button to go back to start page */}
                    <div className="mt-8">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.15 }}
                            onClick={() => router.push("/")}
                            className="w-full py-3 cursor-pointer bg-black uppercase text-lg tracking-wider text-white rounded"
                        >
                            Zur Startseite
                        </motion.button>
                    </div>
                </div>
                <div className="col-span-6 relative overflow-hidden">
                    <div className="sticky top-0 h-screen">
                        <AnimatePresence exitBeforeEnter>
                            <motion.div
                                key={Thilo.src}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="h-full w-full"
                            >
                                <CoverImage
                                    src={Thilo.src}
                                    mobileSrc={Thilo.src}
                                    alt="Cover Background"
                                    klasse={"absolute "}
                                    className="h-full w-full object-cover"
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </>
    );
}
