import Faq from "../components/Faq";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Waitlist from "../components/Waitlist";

export default function Page() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <Faq />
      <Waitlist />
      <Footer />
    </>
  );
}
