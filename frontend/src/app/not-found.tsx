import { Footer } from "@/components/Home/Footer";
import { Header } from "@/components/Home/Header";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Header />
      <h1 className="text-4xl font-bold">404 - Not Found</h1>
      <Footer />
    </div>
  );
}

