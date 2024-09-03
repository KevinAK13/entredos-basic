import React from "react";
import nov5 from "../../assets/img/int15.jpg";

const HeaderSales = () => {
  return (
    <section className="text-gray-600 body-font">
      <section
        className="text-gray-800 body-font relative w-full h-[900px]"
        style={{
          backgroundImage: `url(${nov5})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-neutral-900/70 flex items-center justify-center">
          <div className="mx-auto px-4 md:px-8">
            <div className="max-w-full w-full h-full p-8 text-center text-stone-50">
              <h2 className="text-4xl lg:text-8xl tracking-widest  uppercase font-light mb-4">
                Acerca de nosotros{" "}
              </h2>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default HeaderSales;
