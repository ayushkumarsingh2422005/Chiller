import React from 'react'
import { Footer, TopBar } from '../components'
import collage from '../assets/images/collage.PNG'
import monkey from '../assets/images/monkey.png'
import Button from '@mui/material/Button';

export default function Landing() {
    return (
        <div>
            <TopBar />
            <div className="mt-10">
                <div className="" style={{
                    // backgroundImage: `url(${collage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    // height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundAttachment: 'fixed'
                }}>
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            // background: "radial-gradient(circle, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0.5) 100%)",
                            // backgroundColor: '#F0F0F0'

                        }}
                        className='flex p-14 sm:gap-20 gap-10 sm:pr-32 flex-col-reverse sm:flex-row items-center justify-center'
                    >
                        <div className='sm:w-1/2 sm:pt-14 sm:leading-[60px] leading-[30px]'>
                            <span className='sm:text-5xl text-xl' style={{
                                fontFamily: 'Krona One'
                            }}>
                                Effortless Event Management and Payments for <br />
                                <span className='text-[#1F4EB4]'>Students and Clubs.</span>
                            </span> <br />
                            {/* &nbsp;&nbsp; */}
                            <span className='sm:text-xl text-sm font-bold'>Seamless | Unified | Engagement</span>
                            <br /><br className='sm:hidden'/>
                            <Button variant="contained">Get Started</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button color="secondary">Know More</Button>
                        </div>
                        <img className='sm:h-1/2' src={monkey} alt="" />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}
