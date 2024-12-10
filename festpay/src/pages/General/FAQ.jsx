import React from 'react'
import { Footer, TopBar } from '../../components'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

// Custom styled Accordion
const StyledAccordion = styled(Accordion)(({ theme }) => ({
    margin: '8px 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    '&:before': {
        display: 'none',
    },
    '&.Mui-expanded': {
        margin: '12px 0',
    },
}));

// Custom styled AccordionSummary
const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
    '& .MuiAccordionSummary-content': {
        fontWeight: 500,
    },
}));

const faqData = [
    {
        category: "General Information",
        questions: [
            {
                question: "What is this platform?",
                answer: "Our platform connects college students and their respective institutions to streamline payments for club activities, events, and other college-related expenses. Colleges can list items or events requiring payment, and students can easily manage their dues online."
            },
            {
                question: "Who can use this platform?",
                answer: "The platform is designed for college students and institutions. Students can register to make payments, while colleges can register as organizations to list payable items."
            },
            {
                question: "Is the platform secure?",
                answer: "Yes, we prioritize the security of user data and payment transactions. The platform complies with relevant privacy laws and employs secure payment gateways."
            }
        ]
    },
    {
        category: "User Accounts",
        questions: [
            {
                question: "How do I register as a student?",
                answer: "To register, you need to provide accurate and current information, including your college affiliation and contact details. Simply follow the prompts on the platform to create an account."
            },
            {
                question: "Can colleges manage their own listings?",
                answer: "Yes, colleges can register as organizations to create and manage listings for payments related to events, activities, or resources."
            },
            {
                question: "What happens if I forget my password?",
                answer: "You can reset your password by clicking the 'Forgot Password' link on the login page and following the instructions sent to your registered email."
            }
        ]
    },
    {
        category: "Payments",
        questions: [
            {
                question: "What payment methods are accepted?",
                answer: "We accept various payment methods, including Visa, Mastercard, American Express, Discover, and PayPal."
            },
            {
                question: "Are there any transaction fees?",
                answer: "While we aim to keep costs minimal, any applicable transaction fees will be displayed during the payment process."
            },
            {
                question: "Can I get a refund for payments made?",
                answer: "Refund policies depend on the college or club managing the listing. Please contact the respective organization for details."
            }
        ]
    },
    {
        category: "Compliance and Security",
        questions: [
            {
                question: "Is there an age restriction for using the platform?",
                answer: "Yes, users must be at least 13 years old. Minors under 18 must have parental or guardian consent to use the platform."
            },
            {
                question: "How is my data used?",
                answer: "Your data is used strictly to facilitate platform operations, such as managing accounts and processing payments. For detailed information, refer to our Privacy Policy."
            },
            {
                question: "What activities are prohibited on the platform?",
                answer: "Users may not engage in fraudulent activities, upload harmful content, or violate intellectual property rights. Please refer to the full terms and conditions for a complete list."
            }
        ]
    },
    {
        category: "Technical Support",
        questions: [
            {
                question: "What should I do if I experience technical issues?",
                answer: "For assistance, contact our support team at ayush2422005@gmail.com or call +918299797516."
            },
            {
                question: "Is the platform available globally?",
                answer: "While designed primarily for users in India, users from other regions can access the platform if compliant with local laws."
            },
            {
                question: "What happens if the platform undergoes maintenance?",
                answer: "We strive to minimize disruptions. Scheduled maintenance or service interruptions will be communicated in advance when possible."
            }
        ]
    }
    // Add more categories and questions as needed
];

export default function FAQ() {
    return (
        <>
            <TopBar />
            <div className='min-h-screen bg-gray-50 mt-14'>
                <div className='max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8'>
                    <div className='text-center mb-12'>
                        <h1 className='text-4xl font-bold text-gray-900 mb-4'>
                            Frequently Asked Questions
                        </h1>
                        <p className='text-lg text-gray-600'>
                            Find answers to common questions about our platform
                        </p>
                    </div>

                    <div className='space-y-12'>
                        {faqData.map((category, index) => (
                            <div key={index} className='bg-white rounded-lg p-6 shadow-sm'>
                                <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                                    {category.category}
                                </h2>
                                <div className='space-y-2'>
                                    {category.questions.map((faq, idx) => (
                                        <StyledAccordion key={idx}>
                                            <StyledAccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls={`panel${index}-${idx}-content`}
                                                id={`panel${index}-${idx}-header`}
                                            >
                                                <span className='text-gray-900 text-lg'>
                                                    {faq.question}
                                                </span>
                                            </StyledAccordionSummary>
                                            <AccordionDetails>
                                                <p className='text-gray-600 text-base leading-relaxed'>
                                                    {faq.answer}
                                                </p>
                                            </AccordionDetails>
                                        </StyledAccordion>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
