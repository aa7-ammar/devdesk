import FeaturesGrid from "@/components/Pages/FeatureGrid";
import Footer from "@/components/Pages/Footer";
import Hero from "@/components/Pages/Hero";
import Pricing from "@/components/Pages/Pricing";
import Testimonials from "@/components/Pages/Testimonials";
import TrustedBy from "@/components/Pages/TrustedBy";
import WhyDevDesk from "@/components/Pages/WhyDevDesk";



export default function Page(){
    
    return (

        <>
            <Hero/>
            <TrustedBy/>
            <FeaturesGrid/>
            <WhyDevDesk/>
            <Pricing/>
            <Testimonials/>
            <Footer/>
        </>
        
    )
}