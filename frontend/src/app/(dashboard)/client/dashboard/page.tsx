'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  DollarSign, 
  Users, 
  Briefcase,  
  Star, 
  Eye,
  MessageSquare,
  TrendingUp,
  MapPin,
  Award,
  FileText,
  MoreVertical
} from 'lucide-react';
import { Footer } from "@/components/Home/Footer";
import { Header } from "@/components/Home/Header";
import Image from 'next/image';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function ClientDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with real API calls
  const [dashboardStats] = useState({
    totalProjects: 12,
    activeProjects: 4,
    totalSpent: 45000000, // Rp 45,000,000
    completedProjects: 8,
    pendingApplications: 23,
    averageRating: 4.8
  });

  const [recentProjects] = useState([
    {
      id: 1,
      title: "E-commerce Website Development",
      description: "Need a modern e-commerce platform with payment integration",
      budget: { min: 15000000, max: 25000000 },
      status: "open",
      category: "Web Development",
      applications: 8,
      createdAt: "2025-08-05",
      deadline: "2025-09-15"
    },
    {
      id: 2,
      title: "Mobile App UI/UX Design",
      description: "Design for a food delivery mobile application",
      budget: { min: 8000000, max: 12000000 },
      status: "in_progress",
      category: "Design",
      applications: 12,
      createdAt: "2025-07-28",
      deadline: "2025-08-25",
      assignedFreelancer: "Sarah Designer"
    },
    {
      id: 3,
      title: "Content Writing for Blog",
      description: "Need 20 SEO-optimized blog posts about technology",
      budget: { min: 3000000, max: 5000000 },
      status: "completed",
      category: "Writing",
      applications: 15,
      createdAt: "2025-07-15",
      deadline: "2025-08-10",
      assignedFreelancer: "Ahmad Writer",
      rating: 5
    }
  ]);

  const [availableFreelancers] = useState([
    {
      id: 1,
      name: "Budi Pratama",
      title: "Full Stack Developer",
      rating: 4.9,
      completedProjects: 45,
      hourlyRate: 150000,
      skills: ["React", "Node.js", "Python", "PostgreSQL"],
      location: "Jakarta",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      online: true,
      responseTime: "2 hours"
    },
    {
      id: 2,
      name: "Sari Indah",
      title: "UI/UX Designer",
      rating: 4.8,
      completedProjects: 32,
      hourlyRate: 120000,
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      location: "Bandung",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1bb?w=100&h=100&fit=crop&crop=face",
      online: false,
      responseTime: "4 hours"
    },
    {
      id: 3,
      name: "Andi Surya",
      title: "Mobile Developer",
      rating: 4.7,
      completedProjects: 28,
      hourlyRate: 140000,
      skills: ["Flutter", "React Native", "iOS", "Android"],
      location: "Surabaya",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      online: true,
      responseTime: "1 hour"
    }
  ]);

  const [recentApplications] = useState([
    {
      id: 1,
      freelancerName: "Maya Chen",
      freelancerTitle: "Frontend Developer",
      projectTitle: "E-commerce Website Development",
      appliedAt: "2025-08-10",
      status: "pending",
      coverLetter: "I have 5+ years of experience in e-commerce development...",
      proposedRate: 18000000,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      freelancerName: "Rio Fernandez",
      freelancerTitle: "Full Stack Developer",
      projectTitle: "E-commerce Website Development",
      appliedAt: "2025-08-09",
      status: "pending",
      coverLetter: "Specialized in React and Node.js with payment gateway experience...",
      proposedRate: 22000000,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    }
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-blue-600 bg-blue-50';
      case 'in_progress': return 'text-yellow-600 bg-yellow-50';
      case 'completed': return 'text-green-600 bg-green-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const StatCard = ({ Icon, title, value, subtitle, trend } : {
    Icon: React.ElementType;
    title: string;
    value: string | number;
    subtitle?: string;
    trend?: string;
  }) => (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
      variants={fadeInUp}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50`}>
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        {trend && (
          <div className="flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            {trend}
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
      {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
    </motion.div>
  );

  const ProjectCard = ({ project } : {
    project: {
        id: number;
        title: string;
        description: string;
        budget: { min: number; max: number };
        status: string;
        category: string;
        applications: number;
        createdAt: string;
        deadline: string;
        assignedFreelancer?: string;
    }
  }) => (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
      variants={fadeInUp}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <span className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              {formatCurrency(project.budget.min)} - {formatCurrency(project.budget.max)}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {project.applications} aplikasi
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(project.deadline).toLocaleDateString('id-ID')}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status === 'open' ? 'Terbuka' : 
             project.status === 'in_progress' ? 'Berlangsung' : 
             project.status === 'completed' ? 'Selesai' : 'Dibatalkan'}
          </span>
          <button className="p-2 hover:bg-gray-50 rounded-lg">
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
      
      {project.assignedFreelancer && (
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4">
          <span className="text-sm text-gray-600">Dikerjakan oleh:</span>
          <span className="text-sm font-medium text-gray-900">{project.assignedFreelancer}</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{project.category}</span>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <Eye className="w-4 h-4" />
            Lihat
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors">
            <MessageSquare className="w-4 h-4" />
            Chat
          </button>
        </div>
      </div>
    </motion.div>
  );

  const FreelancerCard = ({ freelancer } : {
    freelancer: {
      id: number;
      name: string;
      title: string;
      avatar: string;
      online: boolean;
      rating: number;
      completedProjects: number;
      location: string;
      skills: string[];
      hourlyRate: number;
      responseTime: string;
    }
  }) => (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
      variants={fadeInUp}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <Image
            src={freelancer.avatar}
            alt={freelancer.name}
            className="w-12 h-12 rounded-full object-cover"
            width={48}
            height={48}
          />
          {freelancer.online && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{freelancer.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{freelancer.title}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              {freelancer.rating}
            </span>
            <span className="flex items-center gap-1">
              <Award className="w-4 h-4" />
              {freelancer.completedProjects} proyek
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {freelancer.location}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex flex-wrap gap-1 mb-3">
          {freelancer.skills.slice(0, 3).map((skill, index) => (
            <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md">
              {skill}
            </span>
          ))}
          {freelancer.skills.length > 3 && (
            <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-md">
              +{freelancer.skills.length - 3} lainnya
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-900">{formatCurrency(freelancer.hourlyRate)}/jam</p>
          <p className="text-xs text-gray-500">Respon dalam {freelancer.responseTime}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm text-blue-600 border border-blue-200 hover:bg-blue-50 rounded-lg transition-colors">
            Lihat Profil
          </button>
          <button className="px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors">
            Hubungi
          </button>
        </div>
      </div>
    </motion.div>
  );

  const ApplicationCard = ({ application } : {
    application: {
      id: number;
      freelancerName: string;
      freelancerTitle: string;
      projectTitle: string;
      appliedAt: string;
      status: string;
      coverLetter: string;
      proposedRate: number;
      avatar: string;
    }
  }) => (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
      variants={fadeInUp}
    >
      <div className="flex items-start gap-4 mb-4">
        <Image
          src={application.avatar}
          alt={application.freelancerName}
          className="w-10 h-10 rounded-full object-cover"
            width={40}
            height={40}
        />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{application.freelancerName}</h3>
          <p className="text-sm text-gray-600 mb-1">{application.freelancerTitle}</p>
          <p className="text-sm text-gray-500 mb-2">Melamar untuk: {application.projectTitle}</p>
          <p className="text-sm text-gray-700 mb-3 line-clamp-2">{application.coverLetter}</p>
          
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-600">Penawaran: {formatCurrency(application.proposedRate)}</span>
            <span className="text-gray-500">
              {new Date(application.appliedAt).toLocaleDateString('id-ID')}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          application.status === 'pending' ? 'text-yellow-600 bg-yellow-50' :
          application.status === 'accepted' ? 'text-green-600 bg-green-50' :
          'text-red-600 bg-red-50'
        }`}>
          {application.status === 'pending' ? 'Menunggu' :
           application.status === 'accepted' ? 'Diterima' : 'Ditolak'}
        </span>
        
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm text-gray-600 border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors">
            Tolak
          </button>
          <button className="px-3 py-1.5 text-sm bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors">
            Terima
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      <Header />
      
      {/* Main Content */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Klien</h1>
                <p className="text-gray-600">Kelola proyek dan freelancer Anda dengan mudah</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  Posting Proyek Baru
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-gray-200 w-fit">
              {[
                { id: 'overview', label: 'Ringkasan', icon: Briefcase },
                { id: 'projects', label: 'Proyek Saya', icon: FileText },
                { id: 'freelancers', label: 'Freelancer', icon: Users },
                { id: 'applications', label: 'Aplikasi', icon: MessageSquare }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              className="space-y-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                  Icon={Briefcase}
                  title="Total Proyek"
                  value={dashboardStats.totalProjects}
                  subtitle="8 selesai, 4 aktif"
                  trend="+12%"
                />
                <StatCard
                  Icon={DollarSign}
                  title="Total Pengeluaran"
                  value={formatCurrency(dashboardStats.totalSpent)}
                  subtitle="Bulan ini"
                />
                <StatCard
                  Icon={Users}
                  title="Aplikasi Pending"
                  value={dashboardStats.pendingApplications}
                  subtitle="Perlu ditinjau"
                />
              </div>

              {/* Recent Activity & Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div className="space-y-6" variants={fadeInUp}>
                  <h2 className="text-xl font-semibold text-gray-900">Proyek Terbaru</h2>
                  <div className="space-y-4">
                    {recentProjects.slice(0, 2).map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </motion.div>

                <motion.div className="space-y-6" variants={fadeInUp}>
                  <h2 className="text-xl font-semibold text-gray-900">Aplikasi Terbaru</h2>
                  <div className="space-y-4">
                    {recentApplications.slice(0, 2).map((application) => (
                      <ApplicationCard key={application.id} application={application} />
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Semua Proyek</h2>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Cari proyek..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {recentProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Freelancers Tab */}
          {activeTab === 'freelancers' && (
            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Freelancer Tersedia</h2>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Cari freelancer..."
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {availableFreelancers.map((freelancer) => (
                  <FreelancerCard key={freelancer.id} freelancer={freelancer} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Applications Tab */}
          {activeTab === 'applications' && (
            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Aplikasi Masuk</h2>
                <div className="flex items-center gap-3">
                  <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="all">Semua Status</option>
                    <option value="pending">Menunggu</option>
                    <option value="accepted">Diterima</option>
                    <option value="rejected">Ditolak</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                {recentApplications.map((application) => (
                  <ApplicationCard key={application.id} application={application} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}