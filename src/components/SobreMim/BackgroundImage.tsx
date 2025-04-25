import Image from "next/image";
import "@/styles/home.css";

const BackgroundImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="inset-0 -z-10">
    <Image
      src={src}
      alt={alt}
      fill
      style={{ objectFit: "cover" }}
      className="opacity-25"
    />
  </div>
);

export default BackgroundImage;
