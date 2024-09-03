import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import UserProfile from "../../components/profile/ProfileUser";

function Profile() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen">
          <Helmet>
        <title>Häuser & Land</title>
        <meta name="description" content="Mexico Real State." />
        <meta name="keywords" content="arquitectura, real estate, inmobiliaria, bienes raices, construcción, construction, México, Playa del Carmen, Tulum, architect, mexico, Cancún" />
        <meta name="robots" content="all" />
        <link rel="canonical" href="https://hauserland.com/" />
        <meta name="author" content="Häuser & Land" />
        <meta name="publisher" content="Häuser & Land" />

        {/* Facebook tags */}
        <meta property="og:title" content={"Häuser & Land"} />
        <meta property="og:description" content={"Mexico Real State."} />
        <meta property="og:url" content={"https://hauserland.com/"} />
        <meta property="og:image" content={"Häuser & Land"} />
        {/* End Facebook tags */}
      </Helmet>
        <UserProfile />
    </div>
  );
}

export default Profile;
