import { useRouter } from "next/router";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { CoverImage } from "@/components/images";
import Menu from "@/components/menu";
import StepIndicator from "@/components/indicator";
import StepOne from "@/components/steps/stepOne";
import StepTwo from "@/components/steps/stepTwo";
import StepThree from "@/components/steps/stepThree";
import StepFour from "@/components/steps/stepFour";
import StepFive from "@/components/steps/stepFive";
import StepSix from "@/components/steps/stepSix";

import Eins from "@/assets/1.jpg";
import Zwei from "@/assets/2.jpg";
import Drei from "@/assets/3.jpg";
import Vier from "@/assets/4.jpg";
import VierNeu from "@/assets/4_neu.jpg";
import Fuenf from "@/assets/5.jpg";
import Sechs from "@/assets/6.jpg";
import { H1, H3 } from "@/components/typography";

import { uploadFileToStorage, saveDataToFirestore } from "@/firebase";

// Job list adapted to the links from the start page
const jobs = [
    {
        id: 1,
        title: "ZMA",
        subTitle: "Zahnmedinische/r Fachangestellte/r",
        slug: "zma",
        description: "Build amazing UIs with React.",
    },
    {
        id: 2,
        title: "ZMF",
        subTitle: "Zahnmedinische/r Fachassistent/in",
        slug: "zmf",
        description: "Build powerful APIs with Node.js.",
    },
    {
        id: 3,
        title: "DH",
        subTitle: "Dentalhygieniker/in",
        slug: "dh",
        description: "Job description for DH.",
    },
    {
        id: 4,
        title: "ZMP",
        subTitle: "Zahnmedizinische/r Prophylaxeassistent/in",
        slug: "zmp",
        description: "Job description for ZMP.",
    },
    {
        id: 5,
        title: "Angestellte",
        subTitle: "Angestellte/r Zahnärztin / Zahnarzt",
        slug: "zahnarzt",
        description: "Job description for Angestellte.",
    },
    {
        id: 6,
        title: "Assistenz",
        subTitle: "Assistenz-Zahnärztin, Assistenz-Zahnarzt",
        slug: "assistenz-zahnarzt",
        description: "Job description for Assistenz.",
    },
    {
        id: 7,
        title: "ZMV",
        subTitle: "Zahnmedizinische/r Verwaltungsassistent/in",
        slug: "zmv",
        description: "Job description for ZMV.",
    },
    {
        id: 8,
        title: "Bürokraft",
        subTitle: "Bürokraft mit fundierten Microsoft-Office-Wissen",
        slug: "buerokraft",
        description: "Job description for Bürokraft.",
    },
    {
        id: 9,
        title: "Auszubildende",
        subTitle: "Auszubildende/r ZMA",
        slug: "azubi",
        description: "Job description for Auszubildende.",
    },
];

const steps = [
    { id: 1, component: StepOne, image: Eins, title: "1. Zeit" },
    { id: 2, component: StepTwo, image: Zwei, title: "2. Qualifikation" },
    { id: 3, component: StepThree, image: Drei, title: "3. Gehalt" },
    { id: 4, component: StepFour, image: VierNeu, title: "4. Daten" },
    { id: 5, component: StepFive, image: Fuenf, title: "5. Unterlagen" },
    { id: 6, component: StepSix, image: Sechs, title: "Zusammenfassung" },
];

export default function JobDetail() {
    const router = useRouter();
    const { slug } = router.query;
    console.log(slug);

    // Look up job using the slug from our job list
    const job = jobs.find((j) => j.slug === slug);
    console.log(jobs.map((e) => e.slug));
    if (!job) {
        return <p>Job not found!</p>;
    }

    const [currentStep, setCurrentStep] = useState(0);
    const [maxStepReached, setMaxStepReached] = useState(0);
    const [formData, setFormData] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const stepRef = useRef();

    const StepComponent = steps[currentStep].component;
    const currentImage = steps[currentStep].image;

    const handleNext = (data) => {
        setFormData((prev) => ({ ...prev, ...data }));
        setCurrentStep((prev) => {
            const nextStep = Math.min(prev + 1, steps.length - 1);
            setMaxStepReached((prevMax) => Math.max(prevMax, nextStep));
            window.scrollTo({ top: 0, behavior: "smooth" });
            return nextStep;
        });
    };

    const handleBack = () => {
        setCurrentStep((prev) => {
            const newStep = Math.max(prev - 1, 0);
            window.scrollTo({ top: 0, behavior: "smooth" });
            return newStep;
        });
    };

    const handleNextButton = () => {
        if (stepRef.current.validate()) {
            const data = stepRef.current.getData();
            handleNext(data);
            console.log(formData);
        }
    };

    const handleFinalSubmit = async () => {
        if (stepRef.current.validate()) {
            // Get data from the final step (this should include zusatzinfo)
            const stepData = stepRef.current.getData();
            // Merge the final step data into your global formData
            handleNext(stepData);

            setSubmitting(true);
            // Use formData.email as uploader identifier.
            const uploaderId = formData.email || "anonymous";
            const files = formData.fileData ? formData.fileData : [];
            const downloadURLs = [];
            for (const fileData of files) {
                if (fileData.file) {
                    try {
                        const url = await uploadFileToStorage(fileData.file, uploaderId);
                        downloadURLs.push(url);
                    } catch (error) {
                        console.error("Error uploading file:", error);
                    }
                } else if (fileData.url) {
                    downloadURLs.push(fileData.url);
                }
            }
            // Merge the download URLs and job title into the final data,
            // and also merge the stepData to include zusatzinfo
            const completeData = { ...formData, ...stepData, downloadURLs, job: job.title };

            try {
                const docId = await saveDataToFirestore(completeData);
                console.log("Document saved with ID:", docId);
            } catch (error) {
                console.error("Firestore save failed:", error);
            }

            try {
                const response = await fetch("/api/send-email", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ formData: completeData }),
                });
                const result = await response.json();
                if (response.ok) {
                    router.push("/success");
                } else {
                    console.error("Email sending failed:", result.message);
                }
            } catch (error) {
                console.error("Error in email API call:", error);
            } finally {
                setSubmitting(false);
            }
        }
    };

    const handleStepClick = (index) => {
        if (index <= maxStepReached) {
            setCurrentStep(index);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const buttonMotionProps = {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
        transition: { duration: 0.15 },
    };

    return (
        <>
            <Menu showLink />
            {/* Overlay and Spinner */}
            <AnimatePresence>
                {submitting && (
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    >
                        <div className="loader"></div>
                    </motion.div>
                )}
            </AnimatePresence>
            <style jsx global>{`
                .loader {
                    border: 6px solid #f3f3f3;
                    border-top: 6px solid #3498db;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>

            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen font-headline">
                {/* Mobile: Image on top; Desktop: Content on left */}
                <div className="order-first lg:order-last relative overflow-hidden">
                    <div className="h-[25vh] lg:fixed lg:top-0 lg:right-0 lg:h-screen lg:w-[50%]">
                        <AnimatePresence exitBeforeEnter>
                            <motion.div
                                key={currentImage.src}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="h-full w-full"
                            >
                                <CoverImage
                                    src={currentImage.src}
                                    mobileSrc={currentImage.src}
                                    alt="Cover Background"
                                    klasse={"absolute "}
                                    className="h-full w-full object-cover"
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Content Section */}
                <div className="order-last lg:order-first lg:col-span-6 pt-0 lg:p-16 lg:pt-48 flex flex-col">
                    <div className="flex-1 flex flex-col">
                        <div className="order-1 lg:order-2">
                            <StepIndicator
                                steps={steps.map((step, index) => ({
                                    title: step.title || `Step ${index + 1}`,
                                }))}
                                currentStep={currentStep}
                                maxReachedStep={maxStepReached}
                                onStepClick={handleStepClick}
                            />
                        </div>
                        <div className="order-2 lg:order-1 p-4 lg:p-0">
                            <H1>{job.title}</H1>
                            <H3>{job.subTitle}</H3>
                        </div>
                        <div className="order-3 p-4 lg:p-0">
                            <StepComponent
                                ref={stepRef}
                                formData={formData}
                                isLastStep={currentStep === steps.length - 1}
                            />
                        </div>
                    </div>
                    <div className="mt-8 p-4 lg:p-0">
                        {currentStep === steps.length - 1 ? (
                            <div className="flex space-x-4">
                                <motion.button
                                    {...buttonMotionProps}
                                    onClick={handleBack}
                                    className="flex-1 py-3 cursor-pointer bg-black uppercase text-lg tracking-wider text-white rounded"
                                >
                                    zurück
                                </motion.button>
                                <motion.button
                                    {...buttonMotionProps}
                                    onClick={handleFinalSubmit}
                                    className="flex-1 py-3 cursor-pointer bg-[#7D886E] uppercase text-lg tracking-wider text-white rounded"
                                >
                                    Abschicken
                                </motion.button>
                            </div>
                        ) : currentStep === 0 ? (
                            <motion.button
                                {...buttonMotionProps}
                                onClick={handleNextButton}
                                className="w-full py-3 cursor-pointer bg-black uppercase text-lg tracking-wider text-white rounded"
                            >
                                WEITer
                            </motion.button>
                        ) : (
                            <div className="flex space-x-4">
                                <motion.button
                                    {...buttonMotionProps}
                                    onClick={handleBack}
                                    className="flex-1 py-3 cursor-pointer bg-black uppercase text-lg tracking-wider text-white rounded"
                                >
                                    zurück
                                </motion.button>
                                <motion.button
                                    {...buttonMotionProps}
                                    onClick={handleNextButton}
                                    className="flex-1 py-3 cursor-pointer bg-black uppercase text-lg tracking-wider text-white rounded"
                                >
                                    WEITer
                                </motion.button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
