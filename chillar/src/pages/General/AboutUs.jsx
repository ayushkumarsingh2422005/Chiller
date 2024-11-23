import React from 'react'
import bg from '../../assets/images/aboutusBg.png'
import { Footer, TopBar } from '../../components'
export default function AboutUs() {
  return (
    <>
      <TopBar />
      <img src={bg} alt="" className='mt-16' /> <br /><br />

      <div className='text-[56px] text-center' style={{
        fontFamily: "Krona One"
      }}>
        Who We Are <span className='text-[#1F4EB4]'>?</span>
        <div className='w-20 h-1 bg-[#1F4EB4] mx-auto rounded-lg'></div>
      </div> <br />
      <div className='max-w-4xl mx-auto text-center text-[32px] font-medium'>
        We are Chillar, a platform dedicated to simplifying event management and payments for students and clubs, fostering seamless campus engagement.
      </div> <br /><br /><br /><br />

      <div className='text-[56px] text-center' style={{
        fontFamily: "Krona One"
      }}>
        OUR <span className='text-[#1F4EB4]'>MISSION</span>
        <div className='w-20 h-1 bg-[#1F4EB4] mx-auto rounded-lg'></div>
      </div> <br />
      <div className='max-w-4xl mx-auto text-center text-[32px] font-medium'>
        We are Chillar, a platform dedicated to simplifying event management and payments for students and clubs, fostering seamless campus engagement.
      </div>
      <Footer />
    </>

  )
}
