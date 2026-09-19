import Features from "@/components/home/Features";
import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import TrustedTechnology from "@/components/home/TrustedTechnology";
import VideoShowcase from "@/components/home/VideoShowcase";

const Home = () => {
    return (
        <>
            <Header />
            <Hero />
            <Features />
            <VideoShowcase />
            <TrustedTechnology />
        </>
    );
};

export default Home;
