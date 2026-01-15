import { MessageCircle, PhoneCallIcon } from 'lucide-react'
import React from 'react'
import CoverImg from '../../assets/coverImg.jpg'
const HeroSection = () => {
  return (
   <>
   <div className='lg:mb-[135px] mb-16 lg:mt-20 mt-4 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row' data-aos="fade-in">
    {/* left side */}
    <div className='pt-2 lg:w-1/2 w-full' data-aos="fade-right" data-aos-duration="1000">
    {/* top text */}
    <div className='flex items-center justify-center font-sans text-[15px] bg-[#eaf1ee] border-brand-sage rounded-full h-[36px] w-full max-w-[320px]' data-aos="fade-down" data-aos-delay="200">
        <div className='w-[8px] h-[8px] rounded-full bg-brand-gold flex mr-1 ml-[-20px] font-sans'></div>
        <p className='text-[12px] lg:text-[14px]'>Supporting Families in USA & Diaspora</p>
    </div>
     
     {/* Main text */}
     <div className='mt-7' data-aos="fade-up" data-aos-delay="400">
        <p className='text-[20px] lg:text-6xl md:text-4xl sm:text-4xl leading-[1.1] font-heading font-semibold lg:text-start text-center'>Autism Support for Families in <span className='text-brand-sage'>WORLDWIDE</span></p> 

        {/* sub text  */}
        <p className='lg:mt-8 mt-4 font-sans text-gray-500 text-[16px] sm:text-[17px] lg:text-start text-center '>Professional guidance, education, and parent coaching designed to bring clarity, confidence, and progress to your family's autism journey.</p>
     </div>

     {/* buttons */}
     <div className='mt-9 gap-3 flex items-center flex-col sm:flex-row justify-center lg:justify-start' data-aos="zoom-in" data-aos-delay="600">
        <button className='lg:w-[200px] w-[300px] px-4 py-3 rounded-tl-3xl rounded-br-3xl bg-[#1F2A44] text-white font-heading rounded-[6px] hover:bg-[#6FAF9E] transition shadow-lg'> 
           Book Consultation
            </button>
              <button className='lg:w-[200px] w-[300px] border-2 border-brand-navy px-4 py-3 rounded-tl-3xl rounded-br-3xl bg-white font-heading rounded-[6px] hover:bg-[#c5c9c8] transition shadow-lg'> 
          Join Parent Program
            </button>
     </div>

     {/* join whatsapp button  */}
     <div className='pt-10 flex justify-center lg:justify-start' data-aos="slide-up" data-aos-delay="800">
        <button className='flex gap-3 text-white px-8 py-3 rounded-tl-3xl rounded-bl-3xl rounded-br-sm rounded-tr-3xl bg-green-500 font-heading rounded-[6px] hover:bg-green-600 transition shadow-lg'>
              <MessageCircle className="w-5 h-5" /> 
          Join WhatsApp Support Group
            </button>
     </div>
    </div>
    {/* right side  */}
    <div className='flex items-center justify-center w-full lg:w-1/2 mt-8 lg:mt-0' data-aos="fade-left" data-aos-duration="1000">
    <img 
    src={CoverImg}
    alt="" 
    className='w-full lg:h-[570px] h-[400px] rounded-[2rem] shadow-card object-cover max-h-[500px] drop-shadow-[10px_15px_10px_rgba(141,155,158,0.5)]'
    />
    </div>
   </div>
   </>
  )
}

export default HeroSection
