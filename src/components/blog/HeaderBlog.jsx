import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import DataBlog from "../../components/blog/DataBlog"; // Asegúrate de que la ruta sea correcta

const BlogCard = ({ date, title, imgSrc, imgAlt, link }) => {
  return (
    <Link to={link} className="relative overflow-hidden cursor-pointer rounded-xs shadow-xs transform ease-in-out transition-all hover:shadow-xs group">
      <div className="h-80 overflow-hidden">
        <img
          src={imgSrc}
          alt={imgAlt}
          className="w-full h-full object-cover filter grayscale duration-300 transition-all ease-in-out transform group-hover:filter-none"
        />
      </div>
      <div className="px-1 py-7 bg-white">
        <p className="text-xs text-gray-500 uppercase">{date}</p>
        <h3 className="text-4xl font-light mt-2 mb-12 text-gray-900">{title}</h3>
      </div>
      <div className="absolute bottom-4 right-4 flex items-center text-gray-700 text-xs uppercase">
        <span className="mr-2">Read More</span>
        <FaArrowRight />
      </div>
    </Link>
  );
};

const BlogSection = () => {
  return (
    <section className="container mx-auto mt-24 max-w-7xl px-4 py-12">
      <p className="text-xs font-bold uppercase text-black lg:text-lg tracking-tagline pb-4">
        Explore Our Stories and Upcoming Events
      </p>
      <h2 className="text-3xl font-semibold uppercase text-color-gold lg:text-5xl border-l-4 border-black pl-4">
        Discover with us
      </h2>
      <p className="text-black font-light lg:mt-4 mt-4 tracking-wider lg:text-xl mb-24">
        Dive into vibrant tales of real estate adventures, savor culinary delights, and embrace the cultural richness of Mexico. At Häuser & Land, we curate unique insights, expert tips, and engaging narratives on exciting events, unforgettable experiences, and the latest happenings, just for you.
      </p>

      <div className="grid gap-12 mx-auto max-w-9xl lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 mb-24">
        {DataBlog.map((article) => (
          <BlogCard
            key={article.id}
            date={article.date}
            title={article.title}
            imgSrc={article.image}
            imgAlt={article.title}
            link={`/blog/${article.id}`}
          />
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
