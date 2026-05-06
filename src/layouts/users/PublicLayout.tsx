import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import LightRays from "../../components/ui/light-rays/LightRaysHero";

export default function PublicLayout() {
  return (
    <div className="app-root">
      
      {/* BACKGROUND LAYER */}
      <div className="bg-layer">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.2}
          lightSpread={1.2}
          rayLength={2.2}
          followMouse={true}
          mouseInfluence={0.08}
          noiseAmount={0.15}
        />
      </div>

      {/* CONTENT LAYER */}
      <div className="content-layer">
        <Header />
        <main className="page-content">
          <Outlet />
        </main>
        <Footer />
      </div>

    </div>
  );
}
