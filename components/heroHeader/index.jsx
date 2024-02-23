'use client'
import  Image  from 'next/image';
import banner from './kitCreatinaFtw.webp'

export default function HeroHeader() {



  return (
    <div className='w-full h-[450px]  text-white relative'> 
      <Image src={banner} alt='' fill  />
      <p>testando </p>
    </div>
  )
}
