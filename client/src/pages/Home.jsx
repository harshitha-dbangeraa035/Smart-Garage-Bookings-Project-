import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Feature from "../components/Feature";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-white">

      <Navbar />

      <Hero />

      <Feature />

      <Footer />

    </div>
  );
}

export default Home;