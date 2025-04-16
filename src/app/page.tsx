import SobreMim from "@/components/SobreMim";
import Chat from "@/components/Chat";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-white">
        <SobreMim />
      </div>
      <div className="w-full md:w-1/2 bg-gray-50">
        <Chat />
      </div>
    </main>
  );
}
