import React from 'react';
import { SlArrowRight } from 'react-icons/sl';
import DataBlog from '../../components/blog/DataBlog'; // Asegúrate de que la ruta sea correcta
import Footer from './Footer';
import { FormattedMessage } from 'react-intl';

const BlogPost = ({ image, altText, category, title, date, link }) => (
  <a
    href={link}
    className="block border-b border-stone-400 pb-4 mb-4 transition-all ease-in-out cursor-pointer hover:text-neutral-500 transform hover:translate-x-2 group"
    aria-label={altText}
  >
    <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0">
      <img
        src={image}
        alt={altText}
        className="w-full md:w-1/3 object-cover rounded-sm mb-4 md:mb-0 md:mr-8 transition duration-300 ease-in-out transform filter grayscale-0 group-hover:grayscale"
        loading="lazy" // Mejora el SEO con lazy loading
      />
      <div className="flex-1">
        <p className="uppercase mb-2 tracking-widest text-sm">{category}</p>
        <p className="text-2xl md:text-3xl lg:text-4xl font-light mb-2 leading-tight">{title}</p>
        <div className="flex items-center mt-4">
          <p className="text-sm md:text-base text-gray-100  group-hover:text-neutral-500 transition ease-in-out">{date}</p>
          <SlArrowRight className="ml-2 text-xl text-gray-100 group-hover:text-neutral-500 transition ease-in-out" />
        </div>
      </div>
    </div>
  </a>
);

const BlogHome = () => {
  // Ordena los artículos por fecha de forma descendente
  const sortedArticles = DataBlog.sort((a, b) => new Date(b.date) - new Date(a.date));
  // Selecciona los tres primeros artículos más recientes
  const latestArticles = sortedArticles.slice(0, 3);

  return (
    <div className="bg-gray-950 text-white  flex flex-col items-center justify-center py-12">
      {/* <div className="max-w-7xl lg:mx-20 mx-4 px-4 py-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight mb-16 text-center md:text-left">
          <FormattedMessage id="blogHome.featuredNews" defaultMessage="Featured News" />
        </h1>
        <div className="space-y-8">
          {latestArticles.map((article) => (
            <BlogPost
              key={article.id}
              image={article.image}
              altText={article.title}
              category={
                <FormattedMessage id={`blog.category.${article.category}`} defaultMessage={article.category} />
              }
              title={
                <FormattedMessage id={`blog.title.${article.id}`} defaultMessage={article.title} />
              }
              date={article.date}
              link={`/blog/${article.id}`}
            />
          ))}
        </div>
      </div> */}
      <Footer />
    </div>
  );
};

export default BlogHome;
