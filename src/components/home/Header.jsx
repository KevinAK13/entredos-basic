import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FormattedMessage } from "react-intl";
import { FiDownload } from "react-icons/fi";
import "./HeaderHome.css";

const Header = () => {
  const canvasRef = useRef(null);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w, h, nt, x;

    const init = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      nt = 0;
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      const colors = ["#33A1FD", "#005EB8", "#00C6FF", "#009EE0"];
      const lineWidths = [20, 25, 20, 20];

      const frequency = 0.004;

      for (let i = 0; i < 4; i++) {
        const color = colors[i];
        const lineWidth = lineWidths[i];
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;

        for (x = 0; x < w; x += 1) {
          const y =
            Math.sin(x * (0.015 + frequency * i) + nt) * 90 +
            Math.sin(x * (0.025 + frequency * i) + nt) * 20;

          const amplitude = 25 * Math.sin(((mouseY + x) / h) * Math.PI);
          ctx.lineTo(x, y + h * (0.05 * i + 0.5) + amplitude);
        }
        ctx.stroke();
        ctx.closePath();
      }

      nt += 0.01;
      requestAnimationFrame(render);
    };

    init();
    const animationFrame = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animationFrame);
  }, [mouseY]);

  useEffect(() => {
    const moveWavesAutomatically = () => {
      setMouseY(window.innerHeight / 2);
    };

    const interval = setInterval(moveWavesAutomatically, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen relative overflow-hidden bg-black flex">
      <div className="absolute inset-0 z-0">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0"
          style={{ width: "100%", height: "100%" }}
        />
        <motion.div
          className="absolute inset-0 bg-transparent bg-opacity-50"
          style={{
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
          }}
        />
      </div>
      <motion.div
        className="z-10 flex flex-col items-center lg:items-start justify-center ml-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-[1100px] m-auto p-4">
          <h1 className="font-normal tracking-tighter text-center text-5xl md:text-6xl lg:text-9xl drop-shadow-2xl mb-8    lg:text-left">
            <a>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="gradient-text"
              >
                <span>
                  <FormattedMessage
                    id="header.title"
                    defaultMessage="Web Designer"
                  />
                </span>
                <br />
                <b className="font-thin text-2xl md:text-3xl lg:text-4xl mr-4">
                  <FormattedMessage id="header.title2" defaultMessage="&" />
                </b>
                <b className="font-normal text-5xl md:text-5xl lg:text-9xl">
                  <FormattedMessage
                    id="header.title3"
                    defaultMessage="Developer"
                  />
                </b>
              </motion.span>
            </a>
          </h1>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="shadow-3xl lg:ml-8 text-left py-2 text-sm md:text-base lg:text-lg lg:mx-80 text-gray-300 drop-shadow-2xl mb-8"
          >
            <FormattedMessage id="header.subtitle" defaultMessage="Services" />
          </motion.p>

          <div className="flex justify-center lg:justify-start">
            <div className="flex justify-center items-end absolute inset-x-0 bottom-10">
              <motion.button
                className="flex space-x-4 items-center justify-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <div className="flex overflow-hidden rounded-xl rtl:flex-row-reverse drop-shadow-2xl">
                  <motion.a
                    href="/services"
                    whileHover={{ scale: 1.05 }}
                    className="px-6 py-3 text-base md:text-lg lg:text-xl font-light tracking-wide text-white transition-colors duration-200 hover:text-gray-100 flex items-center"
                  >
                    <div className="bg-gray-900/40 rounded-full p-2 mr-1 hover:bg-slate-300 transition-all ease-in-out ">
                      <FiDownload className="text-white" />
                    </div>
                    <a
                      className="text-gray-300 hover:text-white transition-all ease-in-out"
                      href="https://drive.google.com/file/d/1PVZiaWv27FAhrYHEDlI90C7hf6j426KZ/view?usp=sharing"
                    >
                      <FormattedMessage
                        id="header.button1"
                        defaultMessage="Title"
                      />
                    </a>
                  </motion.a>
                </div>
              </motion.button>
            </div>
          </div>

          {/* Agregar la imagen en el centro */}
        </div>
      </motion.div>
    </div>
  );
};

export default Header;
