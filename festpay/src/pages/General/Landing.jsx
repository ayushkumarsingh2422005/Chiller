import React, { useContext, useEffect } from 'react';
import { Footer, TopBar } from '../../components';
import monkey from '../../assets/images/monkey.png';
import Button from '@mui/material/Button';
import heroBg from '../../assets/images/heroBg.png';
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';



export default function Landing() {
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(structuredData);
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <TopBar />
            <HeroSection />
            <FeaturesSection />
            <Footer />
        </div>
    );
}


const FeaturesSection = () => {
    const features = [
        {
            title: "Easy Registration",
            description: "Simple and quick registration process for both students and organizations",
            icon: "🎯"
        },
        {
            title: "Secure Payments",
            description: "Integrated payment system with complete transaction security",
            icon: "🔒"
        },
        {
            title: "Event Analytics",
            description: "Detailed insights and analytics for event performance",
            icon: "📊"
        }
    ];

    return (
        <div className="bg-blue-800 text-white py-16 px-6" id='knowmore' style={{
            background: "radial-gradient(circle, #4992F2, #2A548C 80%)"
        }}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left Side - Text */}
                <div className="space-y-8">
                    <h2 className="text-2xl sm:text-[36px] font-bold leading-tight" style={{
                        fontFamily: 'Krona One',
                    }}>
                        Explore the powerful features that simplify event management and participation.
                    </h2>
                    <p className="text-lg sm:text-xl text-blue-200 leading-relaxed">
                        Discover user-friendly tools for seamless student registration, effortless club event management, secure payment processing, and real-time participant tracking—all in one place.
                    </p>
                </div>

                {/* Right Side - Feature Cards */}
                <div className="grid grid-cols-1 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <span className="text-4xl">{feature.icon}</span>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                    <p className="text-blue-200">{feature.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats section with improved styling */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-32 w-full max-w-7xl mx-auto">
                {[
                    { number: "2K+", text: "Total number of students registered" },
                    { number: "70+", text: "Organizations actively using the platform" },
                    { number: "1.5K+", text: "Events successfully managed" },
                    { number: "98.2%", text: "User satisfaction rate" }
                ].map((stat, index) => (
                    <div key={index} className="text-center p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300">
                        <h3 className="text-3xl sm:text-4xl font-bold mb-3">{stat.number}</h3>
                        <p className="text-sm sm:text-base text-blue-200">{stat.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const HeroSection = () => {
    return (
        <main>
            <div
                className="pt-10 h-screen overflow-y-scroll"
                style={{
                    backgroundImage: `url("${heroBg}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center bottom',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/5"></div>
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    className="flex p-14 sm:gap-20 gap-10 sm:pr-32 flex-col-reverse sm:flex-row items-center justify-center"
                >
                    <div className="sm:w-1/2 sm:pt-14 sm:leading-[60px] leading-[30px]">
                        <h1
                            className="sm:text-5xl text-xl"
                            style={{
                                fontFamily: 'Krona One',
                            }}
                        >
                            Effortless Event Management and Payments for{' '}
                            <span className="text-[#1F4EB4]">Students and Clubs.</span>
                        </h1>
                        <p className="sm:text-xl text-sm font-bold">Seamless | Unified | Engagement</p>
                        <div className="mt-6">
                            <Link to={"/account"} aria-label="Get Started with FestPay">
                                <Button variant="contained">Get Started</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                            </Link>
                            <Link to={"/user/dashboard"} aria-label="Learn more about FestPay">
                                <Button color="secondary">Know More</Button>
                            </Link>
                        </div>
                    </div>
                    <img 
                        className="h-2/3 text-center mx-auto" 
                        src={import.meta.env.VITE_INITIAL_LOGO_PATH} 
                        alt="FestPay Platform Interface" 
                    />
                </div>
            </div>
        </main>
    );
}

const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "FestPay",
    "applicationCategory": "Event Management Platform",
    "operatingSystem": "Web",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
    },
    "description": "A comprehensive platform for managing college events and payments, connecting students with campus organizations.",
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "2000"
    }
};