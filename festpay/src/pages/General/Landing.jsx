import React, { useContext, useEffect } from 'react';
import { Footer, TopBar } from '../../components';
import monkey from '../../assets/images/monkey.png';
import Button from '@mui/material/Button';
import heroBg from '../../assets/images/heroBg.png';
import { UserContext } from '../../context/UserContext';



export default function Landing() {
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
    return (
        <div className="bg-blue-800 text-white py-12 px-6" id='knowmore' style={{
            background: "radial-gradient(circle, #4992F2, #2A548C 80%)"
        }}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Side - Text */}
                <div className="space-y-6">
                    <h2 className="text-1xl sm:text-[30px] font-bold" style={{
                        fontFamily: 'Krona One',
                    }}>
                        Explore the powerful features that simplify event management and participation.
                    </h2>
                    <p className="text-sm sm:text-lg text-blue-300 leading-relaxed">
                        Discover user-friendly tools for seamless student registration, effortless club event management, secure payment processing, and real-time participant tracking—all in one place.
                    </p>
                </div>

                {/* Right Side - Fascinating Content */}
                <div className="gap-6 text-center flex items-center justify-center">
                    something random
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-32 w-full max-w-7xl mx-auto">
                <div>
                    <h3 className="text-2xl sm:text-3xl font-bold">2K+</h3>
                    <p className="text-sm sm:text-base text-blue-300">Total number of students who have registered on the platform.</p>
                </div>
                <div>
                    <h3 className="text-2xl sm:text-3xl font-bold">70+</h3>
                    <p className="text-sm sm:text-base text-blue-300">Organizations actively using the platform.</p>
                </div>
                <div>
                    <h3 className="text-2xl sm:text-3xl font-bold">1.5K+</h3>
                    <p className="text-sm sm:text-base text-blue-300">Total number of events successfully managed through the platform.</p>
                </div>
                <div>
                    <h3 className="text-2xl sm:text-3xl font-bold">98.2%</h3>
                    <p className="text-sm sm:text-base text-blue-300">
                        Highlight high user satisfaction, showcasing positive feedback.
                    </p>
                </div>
            </div>
        </div>
    );
};

const HeroSection = () => {
    return (
        <div>
            <div
                className="pt-10 h-screen overflow-y-scroll"
                style={{
                    backgroundImage: `url("${heroBg}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center bottom',
                    // backgroundAttachment: 'fixed',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    className="flex p-14 sm:gap-20 gap-10 sm:pr-32 flex-col-reverse sm:flex-row items-center justify-center"
                >
                    <div className="sm:w-1/2 sm:pt-14 sm:leading-[60px] leading-[30px]">
                        <span
                            className="sm:text-5xl text-xl"
                            style={{
                                fontFamily: 'Krona One',
                            }}
                        >
                            Effortless Event Management and Payments for <br />
                            <span className="text-[#1F4EB4]">Students and Clubs.</span>
                        </span>{' '}
                        <br />
                        <span className="sm:text-xl text-sm font-bold">Seamless | Unified | Engagement</span>
                        <br />
                        <br className="sm:hidden" />
                        <Button variant="contained">Get Started</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button color="secondary" href='#knowmore'>Know More</Button>
                    </div>
                    <img className="" src={monkey} alt="" />
                </div>
            </div>
        </div>
    );
}