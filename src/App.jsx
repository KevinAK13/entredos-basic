import { BrowserRouter as Router } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import AnimatedRoutes from "./AnimatedRoutes";
import { NextUIProvider } from "@nextui-org/react";
import { FavoritesProvider } from "./context/FavoritesContext";

const App = () => {
  return (
    <NextUIProvider>
      <HelmetProvider>
        <Helmet>
          <title>Häuser & Land</title>
          <meta name="description" content="Mexico Real Estate." />
          <meta
            name="keywords"
            content="arquitectura, real estate, inmobiliaria, bienes raices, construcción, construction, México, Playa del Carmen, Tulum, architect, mexico, Cancún"
          />
          <meta name="robots" content="all" />
          <link rel="canonical" href="https://hauserland.com/" />
          <meta name="author" content="Häuser & Land" />
          <meta name="publisher" content="Häuser & Land" />

          {/* Facebook tags */}
          <meta property="og:title" content={"Häuser & Land"} />
          <meta property="og:description" content={"Mexico Real Estate."} />
          <meta property="og:url" content={"https://hauserland.com/"} />
          <meta property="og:image" content={"https://hauserland.com/image.jpg"} />
          {/* End Facebook tags */}
        </Helmet>
        <Router>
          <FavoritesProvider>
              <AnimatedRoutes />
          </FavoritesProvider>
        </Router>
      </HelmetProvider>
    </NextUIProvider>
  );
};

export default App;
