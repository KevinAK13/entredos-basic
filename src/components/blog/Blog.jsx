import React, { useState, useRef } from "react";
import img1 from "../../assets/img/property/6/3.jpg";
import img2 from "../../assets/img/property/6/3.jpg";
import img3 from "../../assets/img/property/6/3.jpg";
import img4 from "../../assets/img/property/6/3.jpg";
import img5 from "../../assets/img/property/6/3.jpg";
import img6 from "../../assets/img/property/6/3.jpg";
import { FormattedMessage } from "react-intl";

const BlogSection = () => {
  const [expandedArticle, setExpandedArticle] = useState(null);
  const articleRefs = useRef({});

  const articles = [
    {
      id: 1,
      image: img1,
      date: "1 de julio de 2025",
      title: "Oportunidades de Inversión Inmobiliaria en Puebla para 2025",
      category: "Inversión Inmobiliaria",
      content:
        "Puebla se destaca como un excelente lugar para invertir en bienes raíces en 2025. Con un mercado en expansión y diversas oportunidades de desarrollo, los inversionistas pueden encontrar propiedades tanto residenciales como comerciales que prometen una alta rentabilidad. La estabilidad económica y el crecimiento urbano de Puebla la convierten en una de las mejores opciones para invertir en el sector inmobiliario en México. Además, el gobierno local ha implementado políticas que fomentan la inversión extranjera y la construcción de infraestructura moderna. Las áreas en crecimiento, como Lomas de Angelópolis y Sonata, ofrecen proyectos residenciales de alta gama que atraen a compradores nacionales e internacionales.",
    },
    {
      id: 2,
      image: img2,
      date: "5 de julio de 2025",
      title: "La Evolución de la Arquitectura en México",
      category: "Arquitectura",
      content:
        "La arquitectura en México ha evolucionado significativamente a lo largo de los siglos. Desde las imponentes pirámides aztecas y mayas hasta las estructuras coloniales y los modernos edificios contemporáneos, el país ofrece una rica historia arquitectónica. En la actualidad, la arquitectura en México se caracteriza por una mezcla de influencias tradicionales y modernas, con un creciente enfoque en la sostenibilidad y la innovación. Arquitectos como Luis Barragán han dejado una huella imborrable con su estilo único, combinando elementos tradicionales con la modernidad. Hoy en día, proyectos como el Nuevo Aeropuerto Internacional de la Ciudad de México y el Museo Soumaya en la Ciudad de México destacan por su diseño vanguardista y su compromiso con la sostenibilidad.",
    },
    {
      id: 3,
      image: img3,
      date: "10 de julio de 2025",
      title: "Tendencias en Remodelación de Hogares en Puebla",
      category: "Remodelación",
      content:
        "La remodelación de hogares en Puebla está en auge, impulsada por el deseo de modernizar y optimizar los espacios residenciales. Las tendencias actuales incluyen la incorporación de tecnologías inteligentes, el uso de materiales sostenibles y el diseño de espacios abiertos y multifuncionales. Estas renovaciones no solo mejoran la calidad de vida de los habitantes, sino que también aumentan el valor de las propiedades. Los propietarios están invirtiendo en cocinas gourmet, baños tipo spa y sistemas de energía solar para hacer sus hogares más eficientes y ecológicos. Además, el uso de elementos decorativos locales y artesanales está ganando popularidad, aportando un toque único y cultural a cada remodelación.",
    },
    {
      id: 4,
      image: img4,
      date: "15 de julio de 2025",
      title: "Historia Breve de la Arquitectura en México",
      category: "Historia de la Arquitectura",
      content:
        "La arquitectura mexicana tiene una historia rica y diversa que refleja las múltiples culturas que han influido en el país. Desde las antiguas civilizaciones prehispánicas, que construyeron monumentales pirámides y templos, hasta la época colonial, que introdujo el estilo barroco, y la modernidad, que trae consigo la innovación y el diseño vanguardista, México ofrece una fascinante evolución arquitectónica. Las pirámides de Teotihuacán y Chichén Itzá son ejemplos icónicos de la ingeniería avanzada de las civilizaciones antiguas. Durante la época colonial, la construcción de catedrales y conventos reflejó la influencia europea, mientras que el siglo XX vio el surgimiento de la arquitectura moderna mexicana, con obras emblemáticas como la Casa Estudio Luis Barragán y el campus de la UNAM, declarado Patrimonio de la Humanidad por la UNESCO.",
    },
    {
      id: 5,
      image: img5,
      date: "20 de julio de 2025",
      title: "Real Estate Investment Opportunities in Puebla for 2025",
      category: "Real Estate Investment",
      content:
        "Puebla stands out as an excellent place to invest in real estate in 2025. With a growing market and various development opportunities, investors can find both residential and commercial properties that promise high returns. The economic stability and urban growth of Puebla make it one of the best options for real estate investment in Mexico. Local government policies are encouraging foreign investment and modern infrastructure development. Growing areas like Lomas de Angelópolis and Sonata offer high-end residential projects that attract both national and international buyers. Additionally, Puebla's rich cultural heritage and strategic location make it a prime destination for tourism and commercial ventures.",
    },
    {
      id: 6,
      image: img6,
      date: "25 de julio de 2025",
      title: "The Evolution of Architecture in Mexico",
      category: "Architecture",
      content:
        "Architecture in Mexico has evolved significantly over the centuries. From the imposing Aztec and Mayan pyramids to colonial structures and contemporary modern buildings, the country offers a rich architectural history. Today, architecture in Mexico is characterized by a blend of traditional and modern influences, with an increasing focus on sustainability and innovation. Architects like Luis Barragán have left an indelible mark with their unique style, blending traditional elements with modernity. Current projects like the New International Airport in Mexico City and the Soumaya Museum in Mexico City stand out for their avant-garde design and commitment to sustainability. These projects reflect the dynamic and evolving nature of Mexican architecture.",
    },
  ];

  const toggleExpand = (id) => {
    setExpandedArticle((prevId) => (prevId === id ? null : id));
    setTimeout(() => {
      if (articleRefs.current[id]) {
        articleRefs.current[id].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 300);
  };

  return (
    <section className="container mx-auto mt-24 max-w-7xl px-4 py-12">
      <p className="text-xs font-bold uppercase text-white lg:text-lg tracking-tagline pb-4">
        <FormattedMessage
          id="blogSection.header"
          defaultMessage="Conoce Nuestro Blog"
        />
      </p>
      <h2 className="text-3xl font-semibold uppercase text-color-gold lg:text-5xl border-l-4 border-color-gold pl-4">
        <FormattedMessage
          id="blogSection.title"
          defaultMessage="Tendencias en Construcción y Diseño"
        />
      </h2>
      <p className="text-neutral-50 font-light lg:mt-4 mt-4 tracking-wider lg:text-xl mb-24">
        <FormattedMessage
          id="blogSection.description"
          defaultMessage="Descubre en nuestro blog las últimas novedades y tendencias en el ámbito de la construcción y el diseño arquitectónico. Ofrecemos artículos detallados, consejos prácticos y análisis profundos para mantenerte actualizado con lo más reciente del sector."
        />
      </p>

      <div className="grid gap-24 mx-auto max-w-6xl lg:grid-cols-1 md:grid-cols-2 sm:grid-cols-1 mb-24">
        {articles.map((article) => (
          <article
            key={article.id}
            className="overflow-hidden rounded-lg shadow-lg bg-white transition-all ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer"
            onClick={() => toggleExpand(article.id)}
            ref={(el) => (articleRefs.current[article.id] = el)}
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full lg:h-96 h-56 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <time
                  className="block text-xs text-gray-500"
                  dateTime={article.date}
                >
                  {article.date}
                </time>
                <span className="bg-color-gold text-white text-xs font-semibold px-2 py-1 rounded">
                  {article.category}
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-stone-800 mb-4">
                {article.title}
              </h3>
              <div
                className={`transition-all duration-700 ease-in-out overflow-hidden ${
                  expandedArticle === article.id ? "max-h-screen" : "max-h-0"
                }`}
              >
                <p
                  className={`text-gray-700 text-lg ${
                    expandedArticle === article.id ? "opacity-100" : "opacity-0"
                  } transition-opacity duration-700`}
                >
                  {article.content}
                </p>
                {expandedArticle === article.id && (
                  <a
                    href="#"
                    className="block mt-4 text-color-gold hover:text-color-gold uppercase font-semibold"
                  >
                    <FormattedMessage
                      id="blogSection.readLess"
                      defaultMessage="Leer menos"
                    />
                  </a>
                )}
              </div>
              {expandedArticle !== article.id && (
                <a
                  href="#"
                  className="block mt-4 text-color-gold hover:text-color-gold uppercase font-semibold"
                >
                  <FormattedMessage
                    id="blogSection.readMore"
                    defaultMessage="Leer más"
                  />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
