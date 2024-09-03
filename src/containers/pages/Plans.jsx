import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Section from "../../components/plans/Propiedades";
import MenuIcon from "../../components/navbar/SidebarG";
import { CompanyInfo } from "../../components/contact/CompanyInfo"; // Asegúrate de tener la ruta correcta

function Plans() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Propiedades | {CompanyInfo.companyName}</title>
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

      <MenuIcon />
      <Section />
    </div>
  );
}

export default Plans;
