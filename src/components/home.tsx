import Navbar from './Navbar';
import Hero from './Hero';
import HowItWorks from './HowItWorks';
import Features from './Features';
import ProductPreview from './ProductPreview';
import Testimonials from './Testimonials';
import Pricing from './Pricing';
import FAQ from './FAQ';
import Footer from './Footer';

function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <ProductPreview />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}

export default Home
