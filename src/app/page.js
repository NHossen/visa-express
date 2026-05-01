import HeroSection from '@/components/HeroSection/HeroSection'
import QuickAccessCards from '@/components/SearchMenu/QuickAccessCards/QuickAccessCards'
import VisaProcessingTime from '@/components/SearchMenu/VisaProcessingTime/VisaProcessingTime'
import React from 'react'

export default function page() {
  return (
    <div>
    
      <HeroSection />
      <VisaProcessingTime />
      <QuickAccessCards />
    </div>
  )
}
