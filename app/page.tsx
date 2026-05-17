'use client';
import { useState } from 'react';
import PromoBar from '@/components/PromoBar';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import ServicesSection from '@/components/ServicesSection';
import RecentlyServicedSection from '@/components/RecentlyServicedSection';
import ReviewsSection from '@/components/ReviewsSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ServiceRequestWizard from '@/components/ServiceRequestWizard';
import TrackMyCarModal from '@/components/TrackMyCarModal';
import InfoBar from '@/components/InfoBar';
import { useScrollReveal } from '@/lib/useScrollReveal';

export default function Home() {
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [trackOpen, setTrackOpen] = useState(false);
  useScrollReveal();

  return (
    <>
      <PromoBar />
      <Navbar onSchedule={() => setScheduleOpen(true)} onTrack={() => setTrackOpen(true)} />
      <HeroSection onSchedule={() => setScheduleOpen(true)} />
      <InfoBar />
      <StatsSection />
      <ServicesSection />
      <RecentlyServicedSection />
      <ReviewsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <ServiceRequestWizard open={scheduleOpen} onClose={() => setScheduleOpen(false)} />
      <TrackMyCarModal open={trackOpen} onClose={() => setTrackOpen(false)} />
    </>
  );
}
