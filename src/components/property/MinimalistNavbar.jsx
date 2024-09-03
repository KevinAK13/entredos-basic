import React from "react";
import { FormattedMessage } from "react-intl";
import { CompanyInfo } from "../contact/CompanyInfo"; // Ensure the path is correct

const MinimalistNavbar = () => {
  const navItems = [
    { id: "navbar.properties", defaultMessage: "Properties", href: "/properties" },
    { id: "navbar.contact", defaultMessage: "Contact", href: "/contact" },
  ];

  return (
    <nav className="hidden lg:flex bg-white py-4 justify-between items-center">
      <div className="ml-4">
        <a href="/" className="transition-transform transform hover:scale-105">
          <img
            src={CompanyInfo.logo2}
            alt="Company Logo"
            className="h-8 sm:h-10 object-contain"
          />
        </a>
      </div>
      <ul className="flex justify-end space-x-6 text-base sm:text-lg third-font font-light text-gray-700 mr-4">
        {navItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <li>
              <a
                href={item.href}
                className="relative group hover:text-gray-900 transition-colors duration-300"
              >
                <FormattedMessage id={item.id} defaultMessage={item.defaultMessage} />
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            {index < navItems.length - 1 && <span className="text-gray-300">|</span>}
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
};

export default MinimalistNavbar;
