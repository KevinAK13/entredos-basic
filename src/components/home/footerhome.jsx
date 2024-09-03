import React from "react";
import { LiaInstagram, LiaLinkedinIn, LiaFacebookF } from "react-icons/lia";

const FooterHome = () => {
  return (
    <footer className="relative bottom-0 items-center w-full bg-black bg-opacity-50 py-2">
      <div className="container mx-auto flex  lg:flex-row justify-center items-center px-4">
        {/* Social Media Icons */}
        <div className="flex space-x-8  lg:mb-0">
          <a
            href="https://www.instagram.com/oqaconstrucciones/"
            target="_blank"
            rel="Instagram"
            className="text-white hover:text-gray-400"
          >
            <LiaInstagram size={20} />
          </a>

          <a
            href="https://www.facebook.com/oqaconstrucciones"
            target="_blank"
            rel="Facebook"
            className="text-white hover:text-gray-400"
          >
            <LiaFacebookF size={20} />
          </a>
          <a
            href="https://www.linkedin.com/company/oqa-construcciones-sa-de-cv/"
            target="_blank"
            rel="LinkedIn"
            className="text-white hover:text-gray-400"
          >
            <LiaLinkedinIn size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterHome;
