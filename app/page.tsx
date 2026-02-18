import { Header, HeroSection, Services, About, CtaSection, Portifolio, 
  Testimonials, ContactForm, Footer, Chat} from './components';

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <HeroSection />

        {/* Services Section */}
        <Services />

        {/* About Section */}
        <About />

        {/* Final CTA Section */}
        <CtaSection />

        {/* Portfolio Section */}
        <Portifolio />

        {/* Stats Section */}
        {/* <StatsSection /> */}

        {/* Testimonials Section */}
        <Testimonials />

        {/* Contact Form Section */}
        <ContactForm />

        {/* Final CTA Section */}

       <Chat />
        {/* <FinalCTA /> */}
      </main>
      <Footer />
      
      {/* WhatsApp Floating Button */}
      {/* <WhatsAppButton /> */}
    </>
  );
}





