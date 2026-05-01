import CountrySearchBar from '../SearchMenu/Countrysearchbar/Countrysearchbar';
import BackgroundSlider from './BackgroundSlider';
import BottomCarousel from './BottomCarousel';
import TravelMenu from './TravelMenu';

const HeroSection = () => {
  return (
    <div className="relative w-full overflow-hidden font-sans">

      {/* ── HERO WRAPPER — height driven by TravelMenu content ── */}
      <div className="relative w-full flex flex-col">

        {/* BackgroundSlider stretches to match content height automatically */}
        <BackgroundSlider />

        {/* TravelMenu content defines the height — no fixed height set */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <TravelMenu />
        </div>

      </div>

      {/* Bottom carousel sits below the hero */}
      <CountrySearchBar />
      <BottomCarousel />

    </div>
  );
};

export default HeroSection;