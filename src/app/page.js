import HeroSection from '@/components/HeroSection/HeroSection'
import QuickAccessCards from '@/components/SearchMenu/QuickAccessCards/QuickAccessCards'
import VisaProcessingTime from '@/components/SearchMenu/VisaProcessingTime/VisaProcessingTime'
import React from 'react'

// SEO Metadata for Visa Express Hub
export const metadata = {
  title: 'Visa Express Hub | Your Global Visa Information Center',
  description: 'Get expert help with all kinds of visas at Visa Express Hub. From tourist to student visas, we provide comprehensive processing times and guidance.',
  keywords: ['visa express hub', 'visa information center', 'visa help', 'visa processing time', 'travel visa assistance'],
  openGraph: {
    title: 'Visa Express Hub - Fast & Reliable Visa Guidance',
    description: 'The ultimate destination for all your visa needs. Explore processing times and expert resources.',
    url: 'https://visaexpresshub.com', // Replace with your actual domain
    siteName: 'Visa Express Hub',
    images: [
      {
        url: '/og-image.png', // Place a representative image in your public folder
        width: 1200,
        height: 630,
        alt: 'Visa Express Hub Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visa Express Hub | Professional Visa Assistance',
    description: 'Expert help for all types of visas worldwide.',
    images: ['/og-image.png'],
  },
};

export default function page() {
  return (
    <div>
      <HeroSection />
      <VisaProcessingTime />
      <QuickAccessCards />
    </div>
  )
}