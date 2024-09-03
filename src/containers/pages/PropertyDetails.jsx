import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import properties from "../../components/plans/Data";
import RightSideGallery from "../../components/property/RightSideGallery";
import PropertyInfo from "../../components/property/PropertyInfo";
import { Helmet } from "react-helmet-async";
import MenuIcon from "../../components/navbar/SidebarG";

const PropertyGalleryContainer = () => {
  const { id } = useParams();
  const project = properties.find((prop) => prop.id === parseInt(id));

  useEffect(() => {
    // Desplazarse al principio de la página al cambiar de propiedad
    window.scrollTo(0, 0);
  }, [id]); // El efecto se ejecuta cada vez que el `id` cambia

  if (!project) {
    return (
      <div className="text-center mt-24 text-2xl text-red-600">
        Propiedad no encontrada.
      </div>
    );
  }

  // Concatenar la ciudad y el estado para la ubicación
  const location = `${project.location.municipality}, ${project.location.state}`;

  return (
    <div>
      <Helmet>
        <title>{`Propiedad - ${project.name || project.title}`}</title>
        <meta name="description" content="Mexico Real State." />
        <meta name="keywords" content="arquitectura, real estate, inmobiliaria, bienes raices, construcción, construction, México, Playa del Carmen, Tulum, architect, mexico, Cancún" />
        <meta name="robots" content="all" />
        <link rel="canonical" href="https://hauserland.com/" />
        <meta name="author" content="Häuser & Land" />
        <meta name="publisher" content="Häuser & Land" />
        <meta property="og:title" content={"Häuser & Land"} />
        <meta property="og:description" content={"Mexico Real State."} />
        <meta property="og:url" content={"https://hauserland.com/"} />
        <meta property="og:image" content={"https://hauserland.com/your-image-path.jpg"} />
      </Helmet>
      

      <div className="max-w-full mx-auto p-4 md:p-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Galería de lado izquierdo que se mantiene fija */}
          <div className="lg:w-1/2">
            <div className="lg:sticky mt-24 lg:mt-0 lg:top-4 "> {/* Ajuste de top */}
            <MenuIcon/>
              <RightSideGallery 
                mainImage={project.image} 
                location={location}  
                coordinates={project.coordinates}  
                gallery={project.gallery} 
                project={project} 
                description={project.description} 
              />
            </div>
          </div>

          {/* Información adicional con scroll */}
          <div className="lg:w-1/2 lg:pr-4">
            <PropertyInfo 
              project={project} 
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default PropertyGalleryContainer;
