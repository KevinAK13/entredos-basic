import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import HeaderContact from "../../components/contact/HeaderContact";
import MenuIcon from "../../components/navbar/Sidebar";
import { CompanyInfo } from "../../components/contact/CompanyInfo"; // Importar la información empresarial
import Navbar from "../../components/navbar/Navbar";

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Contacto | {CompanyInfo.companyName}</title>
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
      <div className="bg-gray-950">
        <MenuIcon />
        <HeaderContact />
        <Navbar />
      </div>
    </div>
  );
}

export default Contact;
