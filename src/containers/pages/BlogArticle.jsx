import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Menu from "../../components/navbar/SidebarG";
import Footer from "../../components/home/Footer";
import { Helmet } from "react-helmet-async";
import blogPosts from "../../components/blog/DataBlog"; // Asegúrate de tener tus datos de artículos de blog

const BlogArticle = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return (
      <div className="text-center mt-24 text-2xl text-red-600">
        Artículo no encontrado.
      </div>
    );
  }

  const randomPosts = blogPosts
    .filter((p) => p.id !== parseInt(id))
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <div>
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      <section className="bg-white">
        <Menu />
        <section className="relative bg-white max-w-full">
          <img src={post.image} alt={post.title} className="w-full h-auto" />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 p-4">
            <p className="text-gray-300 mb-4">{post.date}</p>
            <h1 className="text-white text-4xl md:text-6xl font-bold text-center">{post.title}</h1>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="text-3xl text-gray-950 font-light leading-relaxed mb-8">{post.content}</div>
        </div>

        {/* Related Posts */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-lg lg:text-2xl font-medium  text-stone-900 mb-12">
              You may also like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {randomPosts.map((relatedPost) => (
                <Link to={`/blog/${relatedPost.id}`} key={relatedPost.id} className="p-4 hover:scale-105 transition-all ease-in-out">
                  <img src={relatedPost.image} alt={relatedPost.title} className="w-full h-40 object-cover mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{relatedPost.title}</h3>
                  <p className="text-gray-600">{relatedPost.excerpt}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/blog" className="text-gray-600">
                View all posts
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </section>
    </div>
  );
};

export default BlogArticle;
