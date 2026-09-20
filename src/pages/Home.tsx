import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import TrustedTechnology from "@/components/home/TrustedTechnology";
import VideoShowcase from "@/components/home/VideoShowcase";
import DocumentIntelligence from "@/components/home/DocumentIntelligence";
import Footer from "@/components/home/Footer";
import Features from "@/components/home/Features";

const Home = () => {
    return (
        <>
            <Header />
            <Hero />
            <Features />
            <VideoShowcase />
            <TrustedTechnology />
            <DocumentIntelligence />
            <Footer />
        </>
    );
};

export default Home;
