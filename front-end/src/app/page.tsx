"use client";
import { AppProvider } from "./AppContext";
import HowToBuild from "./components/HowToBuild";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomeFisrCompo from "./components/HomeFisrCompo";
import HomeSecondCompo from "./components/HomeSecondCompo";
import HometherdCompo from "./components/HometherdCompo";

export default function Home() {
  return (
    <AppProvider>
      <div className="">
        <Navbar />
        <HomeFisrCompo />
        <HomeSecondCompo />
        <HowToBuild />
        <HometherdCompo />
        <Footer />
      </div>
    </AppProvider>
  );
}
