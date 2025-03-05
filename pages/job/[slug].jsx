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
import Fuenf from "@/assets/5.jpg";
import Sechs from "@/assets/6.jpg";
import { H1, H3 } from "@/components/typography";

// Temporary local job data (later, replace with a headless CMS API fetch)
const jobs = [
    {
        id: 1,
        title: "ZMA",
        subTitle: "Zahnmedinische/r Fachangestellte/r",
        slug: "frontend-developer",
        description: "Build amazing UIs with React.",
    },
    {
        id: 2,
        title: "Backend Developer",
        slug: "backend-developer",
        description: "Build powerful APIs with Node.js.",
    },
];

const steps = [
    { id: 1, component: StepOne, image: Eins },
    { id: 2, component: StepTwo, image: Zwei },
    { id: 3, component: StepThree, image: Drei },
    { id: 4, component: StepFour, image: Vier },
    { id: 5, component: StepFive, image: Fuenf },
    { id: 5, component: StepSix, image: Sechs },
    // ... add additional steps here (up to 6 or more)
];

export default function JobDetail() {
    const router = useRouter();
    const { slug } = router.query;

    // Find job data based on slug
    const job = jobs.find((j) => j.slug === slug);
    if (!job) {
        return <p>Job not found!</p>;
    }

    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({});
    const stepRef = useRef();

    // Get the component and image for the current step
    const StepComponent = steps[currentStep].component;
    const currentImage = steps[currentStep].image;

    // When moving to the next step, merge data from the step into global formData.
    const handleNext = (data) => {
        setFormData((prev) => ({ ...prev, ...data }));
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    };

    const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

    // The parent's Next button triggers the step's validate method.
    const handleNextButton = () => {
        if (stepRef.current.validate()) {
            const data = stepRef.current.getData();
            handleNext(data);
            console.log(formData);
        }
    };

    // Define subtle hover and tap effects for the buttons
    const buttonMotionProps = {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
        transition: { duration: 0.15 },
    };

    return (
        <>
            <Menu />
            <div className="grid grid-cols-12 min-h-screen overflow-y-auto font-headline">
                <div className="col-span-6 p-16 pt-48 flex flex-col">
                    <div className="flex-1">
                        <H1>{job.title}</H1>
                        <H3>{job.subTitle}</H3>
                        <StepIndicator
                            steps={steps.map((step, index) => `Step ${index + 1}`)}
                            currentStep={currentStep}
                        />
                        <StepComponent
                            ref={stepRef}
                            formData={formData}
                            isLastStep={currentStep === steps.length - 1}
                        />
                    </div>
                    <div className="mt-8">
                        {currentStep === 0 ? (
                            <motion.button
                                {...buttonMotionProps}
                                onClick={handleNextButton}
                                className="w-full py-3 cursor-pointer bg-black uppercase text-lg tracking-wider text-white rounded"
                            >
                                Next
                            </motion.button>
                        ) : (
                            <div className="flex space-x-4">
                                <motion.button
                                    {...buttonMotionProps}
                                    onClick={handleBack}
                                    className="flex-1 py-3 cursor-pointer bg-black uppercase text-lg tracking-wider text-white rounded"
                                >
                                    Back
                                </motion.button>
                                <motion.button
                                    {...buttonMotionProps}
                                    onClick={handleNextButton}
                                    className="flex-1 py-3 cursor-pointer bg-black uppercase text-lg tracking-wider text-white rounded"
                                >
                                    Next
                                </motion.button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-span-6 relative overflow-hidden">
                    <div className="sticky top-0 h-screen">
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
            </div>
        </>
    );
}
