import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import LoginForm from "../../components/login/login";

function Login() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Alux Immo</title>
        <meta
          name="description"
          content="Bienes Raices en Playa del Carmen, México."
        />
        <meta
          name="keywords"
          content="arquitectura, real estate, inmobiliaria, bienes raices, construcción, construction, México, Playa del Carmen, Tulum, architect, mexico, Cancún"
        />
        <meta name="robots" content="all" />
        <link rel="canonical" href="https://aluximmo.com/" />
        <meta name="author" content="Alux Immo" />
        <meta name="publisher" content="Alux Immo" />

        {/* Facebook tags */}
        <meta property="og:title" content={"Alux Immo"} />
        <meta
          property="og:description"
          content={"Inmobiliaria en Playa del Carmen."}
        />
        <meta property="og:url" content={"https://aluximmo.com/"} />
        <meta property="og:image" content={"Alux Immo"} />
        {/* End Facebook tags */}
      </Helmet>
      <LoginForm/>

    </div>
  );
}

export default Login;
