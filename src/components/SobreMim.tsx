"use client";
import BackgroundImage from "./SobreMim/BackgroundImage";
import SobreContent from "./SobreMim/SobremContent";
import SobreLinks from "./SobreMim/SobremLinks";

const SobreMim = () => {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <BackgroundImage src="/universe_left_half.png" alt="Vinicius Monteiro" />
      <div className="sobre-content align-center flex flex-col justify-center items-center h-screen p-4">
        <SobreContent />
        <SobreLinks />
      </div>
    </div>
  );
};

export default SobreMim;
