import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import CTAH from "../../components/home/CTAH";
import Section from "../../components/home/BlogHome";
import Carousel from "../../components/home/PropiedadesN";
import Header from "../../components/home/headerhome";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/navbar/Navbar";
import Features from "../../components/home/Features";
import CTA from "../../components/home/CarouselPro";
import MenuIcon from "../../components/navbar/Sidebar";
import { CompanyInfo } from "../../components/contact/CompanyInfo"; // Asegúrate de tener la ruta correcta
import ServicesHome from "../../components/home/ServicesHome";

function Home() {
  const { currentUser } = useContext(AuthContext);

  console.log(currentUser);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Helmet>
        <title>{CompanyInfo.companyName}</title>
        <meta
          name="description"
          content={CompanyInfo.description}
        />
        <meta
          name="keywords"
          content={CompanyInfo.keywords}
        />
        <meta name="robots" content="all" />
        <link rel="canonical" href={CompanyInfo.websiteUrl} />
        <meta name="author" content={CompanyInfo.companyName} />
        <meta name="publisher" content={CompanyInfo.companyName} />

        {/* Facebook tags */}
        <meta property="og:title" content={CompanyInfo.companyName} />
        <meta
          property="og:description"
          content={CompanyInfo.description}
        />
        <meta property="og:url" content={CompanyInfo.websiteUrl} />
        <meta property="og:image" content={CompanyInfo.logo} />
        {/* End Facebook tags */}
      </Helmet>
      <Header />
      <Navbar />
      <MenuIcon />
      <div className="">
        <CTAH />
        <Features />
      </div>
      <div className=" ">
        <Carousel />
      </div>
      <ServicesHome/>
      <div className=" pb-12">
        <CTA />
      </div>
      <Section />
    </div>
  );
}

export default Home;
