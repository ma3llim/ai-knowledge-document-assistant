import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import TrustedTechnology from "@/components/home/TrustedTechnology";
import VideoShowcase from "@/components/home/VideoShowcase";
import DocumentIntelligence from "@/components/home/DocumentIntelligence";
import Footer from "@/components/home/Footer";
import Features from "@/components/home/Features";
import { Element } from "react-scroll";

const Home = () => {
    return (
        <>
            <Header />
            <Element name="hero">
                <Hero />
            </Element>
            <Element name="features">
                <Features />
            </Element>
            <Element name="product-demo">
                <VideoShowcase />
            </Element>
            <Element name="technology">
                <TrustedTechnology />
            </Element>
            <Element name="document-intelligence">
                <DocumentIntelligence />
            </Element>
            <Footer />
        </>
    );
};

export default Home;
