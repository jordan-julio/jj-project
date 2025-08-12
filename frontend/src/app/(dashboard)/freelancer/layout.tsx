//import { FreelancerSidebar } from '@/components/Freelancer/Sidebar';
import { Header } from '@/components/Home/Header';

export default function FreelancerLayout({
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