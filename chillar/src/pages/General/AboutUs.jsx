import React from 'react'
import bg from '../../assets/images/aboutusBg.png'
import { Footer, TopBar } from '../../components'
export default function AboutUs() {
  return (
    <>
      <TopBar />
      <div style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 70%',
        fontFamily: 'Krona One'
      }}>
        <div className='max-w-7xl text-5xl mt-20 mx-auto pt-20 pb-5'>
          Who We Are?
        </div>
        <div className='max-w-7xl text-xl mx-auto'>
        At Chillar, we simplify event management and payments for students and clubs, creating a seamless experience for campus engagement.
        </div>
        <div className='max-w-7xl text-5xl mt-20 mx-auto pb-5'>
          Who We Are?
        </div>
        <div className='max-w-7xl text-xl mx-auto'>
        At Chillar, we simplify event management and payments for students and clubs, creating a seamless experience for campus engagement.
        </div>
      </div>
      <Footer />
    </>

  )
}
