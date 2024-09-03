import React from "react";
import { FormattedMessage } from "react-intl";

const PropertyDescription = ({ description }) => {
  return (
    <div className="bg-white p-9 mb-8">
      <h2 className="text-2xl secondary-font tracking-wider font-light text-gray-800 mb-4">
        <FormattedMessage id="project.description" defaultMessage="Descripción" />
      </h2>
      <p className="text-neutral-800 ter-font tracking-wide text-lg secondary-font font-extralight">
        {description}
      </p>
    </div>
  );
};

export default PropertyDescription;
