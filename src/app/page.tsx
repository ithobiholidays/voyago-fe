import Image from "next/image";
import HeroView from "@/views/home/HeroView";
import WhyView from "@/views/home/WhyView";
import TopDestinationView from "@/views/home/TopDestinationView";
import AttractionProductCardView from "@/views/home/BestDealsView";
import FooterComp from "@/components/FooterComp";
import NavbarComp from "@/components/NavbarComp";
import BestDealsView from "@/views/home/BestDealsView";
import TravelersChoiceView from "@/views/home/TravelersChoiceView";

export default function Home() {
  return (
    <>
    <HeroView></HeroView>
    <WhyView></WhyView>
    <TravelersChoiceView></TravelersChoiceView>
    <BestDealsView></BestDealsView>
    <TopDestinationView></TopDestinationView>
    </>
  );
}
