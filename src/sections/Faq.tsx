import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqData = [
    {
        question: "Is GitVeilcy secure? Where are my tokens stored?",
        answer: "Yes! GitVeilcy is completely secure. All operations run on your local machine (client-side). Your GitHub and Gemini API keys are stored only in your browser's localStorage and are never sent to any server.",
        color: "bg-pink-300",
    },
    {
        question: "What are the main features of GitVeilcy?",
        answer: "GitVeilcy allows you to commit & push files, automatically generate README.md files using AI, manage repositories, and even delete files or folders directly from a mobile-friendly web interface.",
        color: "bg-orange-300",
    },
    {
        question: "Do I need a Gemini API Key to use it?",
        answer: "A Gemini API Key is required for AI-powered features like the README Generator and automatic commit message generation. Basic Git operations can be performed with just a GitHub token.",
        color: "bg-yellow-300",
    },
    {
        question: "How does the README Generator work?",
        answer: "The generator analyzes your repository's file structure, main language, and package.json dependencies. It then uses this context along with your specific instructions to ask an AI (Gemini) to write a comprehensive and professional README.md file for you.",
        color: "bg-cyan-300",
    },
];

const FaqItem = ({ faq, isOpen, onClick, color }) => (
    <div className={`relative rounded-lg text-black border-b-4 border-r-4 border-black ${color}`}>
        <button
            onClick={onClick}
            className="w-full flex justify-between items-center text-left p-6"
        >
            <span className="font-bold text-lg">{faq.question}</span>
            <ChevronDown
                className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
            />
        </button>
        <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
        >
            <div className="p-6 pt-0 text-black/80">
                <p>{faq.answer}</p>
            </div>
        </div>
    </div>
);

export default function Faq() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="bg-white text-black py-16 lg:py-24">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">                    
                    <div className="md:w-1/2 w-full order-2 md:order-1 text-left">
                        <div className="mb-10">
                            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-800">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl leading-relaxed">
                                Have questions? We've got answers. Here are some of the most common things we get asked.
                            </p>
                        </div>
                        <div className="space-y-6">
                            {faqData.map((faq, index) => (
                                <FaqItem
                                    key={index}
                                    faq={faq}
                                    color={faq.color}
                                    isOpen={openIndex === index}
                                    onClick={() => handleClick(index)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="md:w-1/2 w-full order-1 md:order-2 flex justify-center md:justify-end">
                         <img 
                            src="/faq.png" 
                            alt="FAQ Illustration" 
                            className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl h-auto rounded-lg"
                            onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x600/e5e7eb/1f2937?text=FAQ'; }}
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}