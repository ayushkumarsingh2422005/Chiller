import React, { useContext, useEffect } from 'react';
import { Footer, TopBar } from '../components';
import monkey from '../assets/images/monkey.png';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { UserContext } from '../context/UserContext';



export default function Landing() {
    const { userData, loading, isUserAvailable, fetchUserData } = useContext(UserContext);

    useEffect(() => {
        fetchUserData(); // Fetch user data on component mount
    }, []);

    const getInitials = (name) => {
        if (!name) return '?'; // Default for missing names
        const names = name.split(' ');
        return names.map((n) => n[0]?.toUpperCase()).join('').slice(0, 2);
    };

    return (
        <div>
            <TopBar>
                <div className="flex justify-end items-center">
                    {loading ? (
                        <span>Loading...</span>
                    ) : isUserAvailable && userData ? (
                        <div className="flex items-center gap-2">
                            <Avatar
                                alt={userData.name}
                                src={userData.profilePicture}
                                sx={{ bgcolor: '#1F4EB4' }}
                            >
                                {getInitials(userData.name)}
                            </Avatar>
                            <span>{userData.name}</span>
                        </div>
                    ) : (
                        <Button variant="contained" color="primary" href="/login">
                            Login
                        </Button>
                    )}
                </div>
            </TopBar>
            <HeroSection />
            <FeaturesSection />
            <Footer />
        </div>
    );
}


const FeaturesSection = () => {
    return (
        <div className="bg-blue-800 text-white py-12 px-6" id='knowmore'>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Side - Text */}
                <div className="space-y-6">
                    <h2 className="text-3xl sm:text-5xl font-bold">
                        Explore the powerful features that simplify event management and participation.
                    </h2>
                    <p className="text-sm sm:text-lg text-blue-300 leading-relaxed">
                        Discover user-friendly tools for seamless student registration, effortless club event management, secure payment processing, and real-time participant tracking—all in one place.
                    </p>
                </div>

                {/* Right Side - Fascinating Content */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
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
        </div>
    );
};

const HeroSection = () => {
    return (
        <div className="mt-10">
            <div
                className=""
                style={{
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundAttachment: 'fixed',
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
                    <img className="sm:h-1/2" src={monkey} alt="" />
                </div>
            </div>
        </div>
    );
}