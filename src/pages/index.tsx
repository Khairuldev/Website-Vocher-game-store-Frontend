// import { Inter } from "@next/font/google";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Navbar } from "components/organisms";
import MainBanner from "components/organisms/MainBanner";
import TransactionStep from "components/organisms/TransactionStep";
import FeatureGame from "components/organisms/FeatureGame";
import Reached from "components/organisms/Reached";
import StoryItem from "components/organisms/StoryItem";
import Footer from "components/organisms/Footer";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Navbar />
      <MainBanner />
      <TransactionStep />
      <FeatureGame />
      <Reached />
      <StoryItem />
      <Footer />
    </>
  );
}
