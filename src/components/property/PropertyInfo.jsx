import React from "react";
import { Helmet } from "react-helmet-async";
import PropertyFeatures from "./PropertyFeatures";
import RelatedProperties from "./RelatedProperties";
import MinimalistNavbar from "./MinimalistNavbar"; // Importa el componente navbar
import { CompanyInfo } from "../contact/CompanyInfo";
import { FormattedMessage } from "react-intl";


const PropertyInfo = ({ project }) => {
  // Formatear el precio a MXN
  const formattedPrice = project.price.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0, // O puedes usar 2 si deseas incluir los centavos
  });

  return (
    <div className="flex flex-col justify-end">
      {/* Helmet para SEO, Google Ads, Meta Ads y Social Media */}
      <Helmet>
        <title>{`${project.title.props.defaultMessage} | ${CompanyInfo.companyName}`}</title>
        <meta
          name="description"
          content={`Descubre esta propiedad en ${project.location.city}, ${project.location.state} por ${formattedPrice}.`}
        />
        <meta
          name="keywords"
          content={`propiedad, bienes raíces, inmobiliaria, ${project.location.city}, ${project.location.state}, ${CompanyInfo.keywords}`}
        />
        <meta name="robots" content="all" />
        <link rel="canonical" href={`${CompanyInfo.websiteUrl}/properties/${project.id}`} />
        <meta name="author" content={CompanyInfo.companyName} />
        <meta name="publisher" content={CompanyInfo.companyName} />

        {/* Meta Ads & Open Graph tags */}
        <meta property="og:title" content={`${project.title.props.defaultMessage} - ${CompanyInfo.companyName}`} />
        <meta
          property="og:description"
          content={`Descubre esta propiedad en ${project.location.city}, ${project.location.state} por ${formattedPrice}.`}
        />
        <meta property="og:url" content={`${CompanyInfo.websiteUrl}/properties/${project.id}`} />
        <meta property="og:image" content={project.image} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={CompanyInfo.companyName} />
        <meta property="fb:app_id" content="YOUR_FACEBOOK_APP_ID" /> {/* Reemplazar con el ID de tu app de Facebook */}
        
        {/* Google Ads tags */}
        <meta name="google" content="nositelinkssearchbox" />
        <meta name="google" content="notranslate" />
        <meta name="adwords" content={`propiedad en ${project.location.city}, ${project.location.state}, venta, renta, ${CompanyInfo.companyName}`} />

        {/* Meta Verification */}
        <meta name="facebook-domain-verification" content="YOUR_FACEBOOK_DOMAIN_VERIFICATION_CODE" />
        <meta name="google-site-verification" content="YOUR_GOOGLE_SITE_VERIFICATION_CODE" />
      </Helmet>

      {/* Navbar minimalista importada */}
      <MinimalistNavbar />

      {/* Títulos y Precio */}
      <div className="mt-6 sm:mt-10">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl third-font font-medium ml-4 mb-4">
          {project.title.props.defaultMessage}
        </h2>
        <p className="text-2xl sm:text-3xl lg:text-4xl mx-5 font-thin tracking-wide third-font text-gray-900 mb-6">
          {formattedPrice} MXN
                {project.landpermt === true && (
                  <span className="md:text-lg text-xs uppercase ml-1">
                    <FormattedMessage id="property.perSquareMeter" defaultMessage="/ por m²" />
                  </span>
                )}
        </p>
                   
      </div>
      
      {/* Características de la Propiedad */}
      <PropertyFeatures project={project} />

      {/* Propiedades Relacionadas */}
      <RelatedProperties currentProjectId={project.id} />
    </div>
  );
};

export default PropertyInfo;
