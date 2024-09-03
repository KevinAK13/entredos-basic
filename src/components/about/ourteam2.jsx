import React from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../assets/img/t9.jpg";
import img2 from "../../assets/img/t4.jpg";
import img3 from "../../assets/img/t6.jpg";
import img4 from "../../assets/img/t3.jpg";
import img5 from "../../assets/img/t2.jpg";
import img6 from "../../assets/img/t1.jpg";
import img7 from "../../assets/img/t5.jpg";
import img8 from "../../assets/img/t7.jpg";
import img9 from "../../assets/img/t8.jpg";

const TeamMember = ({ name, role, email, description, imgSrc }) => {
  return (
    <motion.div
      className="group relative w-80 h-[500px] overflow-hidden rounded-xs shadow-sm mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={imgSrc}
        alt={name}
        className="w-full h-full object-cover rounded-xs transform transition-transform duration-300 group-hover:scale-110 grayscale"
      />
      <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center rounded-xs opacity-0 transition-opacity duration-300 group-hover:opacity-100 px-4 text-center">
        <h3 className="text-white text-4xl mx-20 uppercase font-normal">
          {name}
        </h3>
        <p className="text-stone-200 mb-3">{role}</p>
        <p className="text-stone-200 mt-2 text-sm">{description}</p>
        <p className="text-stone-200 mt-6">{email}</p>
      </div>
    </motion.div>
  );
};

const TeamCarousel = ({ teamMembers }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 768,
        settings: {
          autoplaySpeed: 3000,
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <motion.div
      className="container mx-auto px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Slider {...settings}>
        {teamMembers.map((member, index) => (
          <div className="py-12" key={index}>
            <TeamMember {...member} />
          </div>
        ))}
      </Slider>
    </motion.div>
  );
};

// Sample team members data
const Team = () => {
  const teamMembers = [
    {
      name: "Juan Pérez",
      role: "Arquitecto Senior",
      email: "juan.perez@example.com",
      description:
        "Apasionado por el diseño arquitectónico y la gestión de proyectos.",
      imgSrc: img1,
    },
    {
      name: "María García",
      role: "Ingeniera Civil",
      email: "maria.garcia@example.com",
      description: "Experta en estructuras y materiales de construcción.",
      imgSrc: img2,
    },
    {
      name: "Luis Hernández",
      role: "Gerente de Proyectos",
      email: "luis.hernandez@example.com",
      description:
        "Encargado de coordinar y supervisar todas las fases del proyecto.",
      imgSrc: img3,
    },
    {
      name: "Carlos Rodríguez",
      role: "Diseñador de Interiores",
      email: "carlos.rodriguez@example.com",
      description:
        "Especializado en crear espacios interiores funcionales y estéticamente atractivos.",
      imgSrc: img4,
    },
    {
      name: "Ana Flores",
      role: "Coordinadora de Ventas",
      email: "ana.flores@example.com",
      description:
        "Encargada de impulsar estrategias de ventas y satisfacción al cliente.",
      imgSrc: img5,
    },
    {
      name: "Angela Sánchez",
      role: "Ingeniera Estructural",
      email: "angela.sanchez@example.com",
      description:
        "Experta en diseño y supervisión de estructuras para garantizar su seguridad y estabilidad.",
      imgSrc: img6,
    },
    {
      name: "Laura Martínez",
      role: "Arquitecta Paisajista",
      email: "laura.martinez@example.com",
      description:
        "Apasionada por diseñar entornos exteriores armoniosos y sostenibles.",
      imgSrc: img7,
    },
    {
      name: "Luisa López",
      role: "Supervisora de Construcción",
      email: "luisa.lopez@example.com",
      description: "Responsable de garantizar la correcta ejecución de obras.",
      imgSrc: img8,
    },
    {
      name: "Alejandra Torres",
      role: "Analista de Proyectos",
      email: "alejandra.torres@example.com",
      description: "Encargada de evaluar la viabilidad de nuevos proyectos.",
      imgSrc: img9,
    },
  ];

  return (
    <section className="pt-20 py-40 pb-40  text-black w-full flex flex-col items-center">
      <motion.div
        className="flex flex-col text-center h-full w-full "
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="lg:text-7xl text-3xl font-medium tracking-wide title-font mb-2">
          Our Team
        </h1>
        <p className="lg:text-2xl text-lg font-extralight ">
Meet the people who make our success possible</p>
      </motion.div>
      <TeamCarousel teamMembers={teamMembers} />
    </section>
  );
};

export default Team;
