import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../../components/navbar/Navbar";
import { CompanyInfo } from "../../components/contact/CompanyInfo"; // Importar la información empresarial
import Section from "../../components/services/HeaderServices";
import HeaderTop from "../../components/services/HeaderSales";
import Footer from "../../components/home/Footer";
import MenuIcon from "../../components/navbar/Sidebar";
import ServicesHome from "../../components/home/ServicesHome";


function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Servicios | {CompanyInfo.companyName}</title>
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
              <MenuIcon/>

        <Navbar />
        <HeaderTop/>
        <ServicesHome/>
        <Footer/>
    </div>
  );
}

export default Services;
