import { Header } from '@/components/Home/Header';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex my-12">
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}