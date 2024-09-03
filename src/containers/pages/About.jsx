import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Footer from "../../components/home/Footer";
import About1 from "../../components/about/About1";
import Section from "../../components/about/SectionM";
import LogoSlider from "../../components/home/logoslider";
import { CompanyInfo } from "../../components/contact/CompanyInfo"; // Importa la información empresarial
import Navbar from "../../components/navbar/Navbar";
import MenuIcon from "../../components/navbar/Sidebar";
import HeaderTop from "../../components/services/HeaderTop";

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Empresa | {CompanyInfo.companyName}</title>
        <meta name="description" content={CompanyInfo.description} />
        <meta name="keywords" content={CompanyInfo.keywords} />
        <meta name="robots" content="all" />
        <link rel="canonical" href={CompanyInfo.websiteUrl} />
        <meta name="author" content={CompanyInfo.companyName} />
        <meta name="publisher" content={CompanyInfo.companyName} />

        {/* Facebook tags */}
        <meta property="og:title" content={CompanyInfo.companyName} />
        <meta property="og:description" content={CompanyInfo.description} />
        <meta property="og:url" content={CompanyInfo.websiteUrl} />
        <meta property="og:image" content={CompanyInfo.logo} />
        {/* End Facebook tags */}
      </Helmet>
      <div className="">
        <Navbar/>
        <MenuIcon/>
        <HeaderTop/>
        <About1 />
        <Section />
        <LogoSlider />
        <Footer />
      </div>
    </div>
  );
}

export default About;
