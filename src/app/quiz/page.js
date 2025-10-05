"use client";
import dynamic from "next/dynamic";
import Navbar from "../Components/Navbar.js";
// import ISSQuiz from "../Components/QuizPage/ISSQuiz";
const QuizComponent = dynamic(() => import('../Components/QuizPage/ISSQuiz.js'), { ssr: false });

export default function page() {
    return (
        <>
            <Navbar />
            <QuizComponent />;
        </>
    );
}