import { GlobeIcon, HeartHandshake, ShieldCheck } from 'lucide-react'
import React from 'react'
import { PiCertificateThin } from 'react-icons/pi'
import SpedEveryday from "../../assets/SpedEveryday.jpg"

const AboutUs = () => {
  return (
   <>
   <div className='p-5 bg-gradient-to-r from-brand-navy to-brand-sage w-full'>
   <div className=' w-full max-w-7xl mx-auto lg:h-[500px] px-2 lg:px-8 flex flex-col lg:flex-row '>
    {/* left side */}
    <div className='lg:w-1/2 w-full'>
    {/* header */}
    <div className='pt-[25px]'>
        <h1 className='text-white font-heading text-[20px] lg:text-[30px] sm:text-[35px] font-semibold' data-aos="fade-up">Why Choose SpedEveryday?</h1>
        {/* sub text */}
        <p className='text-[#cdcfd2] lg:text-[18px] text-[15px] px-2 font-sans pt-6' data-aos="fade-down">We combine clinical expertise with deep cultural understanding to provide autism support that truly resonates with Nigerian and diaspora families.</p>

        {/* sub text list */}
        <div className='pt-8 flex gap-6 flex-col lg:flex ' data-aos="fade-left">
            {/* text */}
            <div className='flex gap-4'>
                <div className='w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#2e4557]'>
                <HeartHandshake  className='w-6 h-6 text-brand-gold'/>
                </div>
                <div>
                    <h1 className='text-white text-[20px] font-heading font-semibold pt-1'>Family-Centered Care</h1>
                <p className='text-[#b7bbc2] font-sans font-thin text-[15px]'>Supporting the whole family unit with compassion and expertise.</p>
                </div>
            </div>
            {/* Culturally  */}
             <div className='flex gap-4'>
                <div className='w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#2e4557]'>
                <GlobeIcon  className='w-6 h-6 text-brand-gold'/>
                </div>
                <div>
                    <h1 className='text-white text-[20px] font-heading font-semibold pt-1'>Culturally Responsive</h1>
                <p className='text-[#b7bbc2] font-sans font-thin text-[15px]'>Understanding Nigerian family dynamics and diaspora experiences.</p>
                </div>
            </div>
            {/* Ethical & Professional  */}
             <div className='flex gap-4'>
                <div className='w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#2e4557]'>
                <ShieldCheck  className='w-6 h-6 text-brand-gold'/>
                </div>
                <div>
                    <h1 className='text-white text-[20px] font-heading font-semibold pt-1'>Ethical & Professional</h1>
                <p className='text-[#b7bbc2] font-sans font-thin text-[15px]'>Evidence-based practices with the highest integrity standards.</p>
                </div>
            </div>
        </div>
    </div>
    </div>

    {/* right side */}
     <div className='lg:w-1/2 w-full flex justify-center items-center' data-aos="fade-down">
     <img 
     src={SpedEveryday} 
     alt="why choose us"
     className='rounded-tl-3xl rounded-br-3xl rounded-lg lg:h-[400px] h-[300px] w-full border-[5px] border-brand-navy mt-5' 
     />
    </div>
   </div>
    </div>
   </>
  )
}

export default AboutUs
