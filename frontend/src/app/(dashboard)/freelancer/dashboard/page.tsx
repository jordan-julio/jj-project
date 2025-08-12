'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Calendar, 
  DollarSign, 
  Users, 
  Briefcase, 
  Clock, 
  Star, 
  Eye,
  MessageSquare,
  TrendingUp,
  CheckCircle,
  FileText,
  MoreVertical,
  Send,
  Bookmark,
  Target,
  PlusCircle,
  Bell,
  Settings,
  Wallet,
  BarChart3
} from 'lucide-react';
import { Footer } from "@/components/Home/Footer";
import { Header } from "@/components/Home/Header";

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

export default function FreelancerProjectsPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock freelancer data - replace with real API calls
  const [freelancerStats] = useState({
    totalEarnings: 85000000, // Rp 85,000,000
    completedProjects: 23,
    activeProjects: 3,
    averageRating: 4.9,
    clientSatisfaction: 98,
    responseTime: '2 jam',
    profileViews: 1250,
    savedJobs: 8
  });

  const [currentProjects] = useState([
    {
      id: 1,
      title: "E-commerce Website Development",
      client: "PT Digital Solusi",
      description: "Developing a complete e-commerce platform with payment integration",
      budget: 20000000,
      status: "in_progress",
      progress: 65,
      deadline: "2025-09-15",
      startDate: "2025-07-20",
      milestones: [
        { title: "UI/UX Design", status: "completed", amount: 5000000 },
        { title: "Frontend Development", status: "in_progress", amount: 8000000 },
        { title: "Backend & Integration", status: "pending", amount: 7000000 }
      ],
      lastActivity: "2 jam yang lalu"
    },
    {
      id: 2,
      title: "Mobile App UI Design",
      client: "Startup Foods",
      description: "Design mobile app interface for food delivery service",
      budget: 12000000,
      status: "in_progress",
      progress: 40,
      deadline: "2025-08-25",
      startDate: "2025-08-01",
      milestones: [
        { title: "Wireframes", status: "completed", amount: 4000000 },
        { title: "Visual Design", status: "in_progress", amount: 8000000 }
      ],
      lastActivity: "1 hari yang lalu"
    },
    {
      id: 3,
      title: "Logo & Brand Identity",
      client: "Cafe Nusantara",
      description: "Create complete brand identity including logo and guidelines",
      budget: 8000000,
      status: "in_review",
      progress: 90,
      deadline: "2025-08-20",
      startDate: "2025-08-05",
      milestones: [
        { title: "Logo Design", status: "completed", amount: 4000000 },
        { title: "Brand Guidelines", status: "in_review", amount: 4000000 }
      ],
      lastActivity: "3 jam yang lalu"
    }
  ]);

  const [availableJobs] = useState([
    {
      id: 4,
      title: "React Native Mobile App Development",
      client: "TechCorp Indonesia",
      description: "Build a cross-platform mobile app for inventory management with real-time sync capabilities",
      budget: { min: 25000000, max: 35000000 },
      category: "Mobile Development",
      skills: ["React Native", "Firebase", "API Integration"],
      postedAt: "2025-08-10",
      deadline: "2025-10-15",
      applicants: 12,
      clientRating: 4.8,
      verified: true,
      urgent: false
    },
    {
      id: 5,
      title: "WordPress E-commerce Redesign",
      client: "Batik Modern Store",
      description: "Redesign existing WordPress site with modern e-commerce features and better UX",
      budget: { min: 15000000, max: 20000000 },
      category: "Web Development",
      skills: ["WordPress", "WooCommerce", "PHP", "UI/UX"],
      postedAt: "2025-08-09",
      deadline: "2025-09-30",
      applicants: 8,
      clientRating: 4.6,
      verified: true,
      urgent: true
    },
    {
      id: 6,
      title: "Social Media Content Design",
      client: "Digital Agency Jakarta",
      description: "Create engaging social media graphics and content for multiple client accounts",
      budget: { min: 8000000, max: 12000000 },
      category: "Graphic Design",
      skills: ["Adobe Creative Suite", "Social Media", "Branding"],
      postedAt: "2025-08-08",
      deadline: "2025-09-08",
      applicants: 15,
      clientRating: 4.9,
      verified: false,
      urgent: false
    }
  ]);

  const [myApplications] = useState([
    {
      id: 1,
      projectTitle: "Vue.js Dashboard Development",
      client: "FinTech Startup",
      appliedAt: "2025-08-09",
      status: "pending",
      proposedRate: 18000000,
      coverLetter: "I have extensive experience in Vue.js and dashboard development...",
      clientResponse: undefined
    },
    {
      id: 2,
      projectTitle: "Brand Identity Design",
      client: "Green Energy Co",
      appliedAt: "2025-08-07",
      status: "accepted",
      proposedRate: 15000000,
      coverLetter: "I specialize in sustainable brand design with 5+ years experience...",
      clientResponse: "Great portfolio! Let's discuss the project details."
    },
    {
      id: 3,
      projectTitle: "Mobile App Backend",
      client: "Logistics Pro",
      appliedAt: "2025-08-05",
      status: "rejected",
      proposedRate: 22000000,
      coverLetter: "Expert in Node.js and database optimization...",
      clientResponse: "Thanks for your application. We chose someone with more specific experience."
    }
  ]);

  const [earnings] = useState([
    {
      month: "Agustus 2025",
      amount: 28000000,
      projects: 4,
      growth: 15
    },
    {
      month: "Juli 2025", 
      amount: 24000000,
      projects: 3,
      growth: 8
    },
    {
      month: "Juni 2025",
      amount: 22000000,
      projects: 3,
      growth: -5
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
      case 'in_progress': return 'text-blue-600 bg-blue-50';
      case 'in_review': return 'text-yellow-600 bg-yellow-50';
      case 'completed': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-orange-600 bg-orange-50';
      case 'accepted': return 'text-green-600 bg-green-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const ProjectCard = ({ project } : {
    project: {
      title: string,
      client: string,
      description: string,
      budget: number,
      status: string,
      progress: number,
      deadline: string,
      startDate: string,
      milestones: { title: string, status: string, amount: number }[],
      lastActivity: string
    }
  }) => (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
      variants={fadeInUp}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
              {project.status === 'in_progress' ? 'Berlangsung' : 
               project.status === 'in_review' ? 'Review' : 
               project.status === 'completed' ? 'Selesai' : 'Pending'}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">Klien: {project.client}</p>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium text-gray-900">{project.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <span className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              {formatCurrency(project.budget)}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Deadline: {new Date(project.deadline).toLocaleDateString('id-ID')}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {project.lastActivity}
            </span>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-50 rounded-lg">
          <MoreVertical className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Milestones */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Milestone</h4>
        <div className="space-y-2">
          {project.milestones.map((milestone, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  milestone.status === 'completed' ? 'bg-green-500' :
                  milestone.status === 'in_progress' ? 'bg-blue-500' :
                  milestone.status === 'in_review' ? 'bg-yellow-500' : 'bg-gray-300'
                }`}></div>
                <span className="text-gray-700">{milestone.title}</span>
              </div>
              <span className="font-medium text-gray-900">{formatCurrency(milestone.amount)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">Mulai: {new Date(project.startDate).toLocaleDateString('id-ID')}</span>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <Eye className="w-4 h-4" />
            Detail
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors">
            <MessageSquare className="w-4 h-4" />
            Chat
          </button>
        </div>
      </div>
    </motion.div>
  );

  const JobCard = ({ job } : {
    job: {
      title: string,
      client: string,
      description: string,
      budget: { min: number, max: number },
      category: string,
      skills: string[],
      postedAt: string,
      deadline: string,
      applicants: number,
      clientRating: number,
      verified: boolean,
      urgent?: boolean
    }
  }) => (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
      variants={fadeInUp}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
            {job.urgent && (
              <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-md">
                Urgent
              </span>
            )}
            {job.verified && (
              <CheckCircle className="w-4 h-4 text-green-500" />
            )}
          </div>
          <p className="text-sm text-gray-600 mb-2">Klien: {job.client}</p>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <span className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              {formatCurrency(job.budget.min)} - {formatCurrency(job.budget.max)}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {job.applicants} pelamar
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              {job.clientRating}
            </span>
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {job.skills.map((skill, index) => (
              <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <button className="p-2 hover:bg-gray-50 rounded-lg">
          <Bookmark className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>Diposting: {new Date(job.postedAt).toLocaleDateString('id-ID')}</span>
          <span className="text-gray-300">•</span>
          <span>Deadline: {new Date(job.deadline).toLocaleDateString('id-ID')}</span>
          <span className="text-gray-300">•</span>
          <span>{job.category}</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 border border-blue-200 hover:bg-blue-50 rounded-lg transition-colors">
            <Eye className="w-4 h-4" />
            Lihat
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors">
            <Send className="w-4 h-4" />
            Lamar
          </button>
        </div>
      </div>
    </motion.div>
  );

  const ApplicationCard = ({ application } : {
    application: {
      projectTitle: string,
      client: string,
      appliedAt: string,
      status: string,
      proposedRate: number,
      coverLetter: string,
      clientResponse?: string
    }
  }) => (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
      variants={fadeInUp}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{application.projectTitle}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
              {application.status === 'pending' ? 'Menunggu' :
               application.status === 'accepted' ? 'Diterima' : 'Ditolak'}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">Klien: {application.client}</p>
          <p className="text-sm text-gray-700 mb-3">Penawaran: {formatCurrency(application.proposedRate)}</p>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{application.coverLetter}</p>
          
          {application.clientResponse && (
            <div className="p-3 bg-gray-50 rounded-lg mb-3">
              <p className="text-sm text-gray-600 mb-1">Respon klien:</p>
              <p className="text-sm text-gray-800">{application.clientResponse}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          Dilamar: {new Date(application.appliedAt).toLocaleDateString('id-ID')}
        </span>
        <div className="flex items-center gap-2">
          {application.status === 'accepted' && (
            <button className="px-3 py-1.5 text-sm bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors">
              Mulai Proyek
            </button>
          )}
          {application.status === 'pending' && (
            <button className="px-3 py-1.5 text-sm text-blue-600 border border-blue-200 hover:bg-blue-50 rounded-lg transition-colors">
              Edit Lamaran
            </button>
          )}
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Freelancer</h1>
                <p className="text-gray-600">Kelola proyek dan temukan peluang baru</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Bell className="w-5 h-5" />
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Settings className="w-4 h-4" />
                  Profil
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <PlusCircle className="w-4 h-4" />
                  Update Portofolio
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-gray-200 w-fit">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                { id: 'projects', label: 'Proyek Aktif', icon: Briefcase },
                { id: 'jobs', label: 'Cari Proyek', icon: Search },
                { id: 'applications', label: 'Lamaran Saya', icon: FileText },
                { id: 'earnings', label: 'Pendapatan', icon: Wallet }
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

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <motion.div
              className="space-y-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {currentProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Find Jobs Tab */}
          {activeTab === 'jobs' && (
            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Cari Proyek</h2>
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
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Bookmark className="w-4 h-4" />
                    Tersimpan ({freelancerStats.savedJobs})
                  </button>
                </div>
              </div>
              
              {/* Job Categories */}
              <div className="flex items-center gap-3 flex-wrap">
                {['Semua', 'Web Development', 'Mobile Development', 'Design', 'Content Writing', 'Marketing'].map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      category === 'Semua'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {availableJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
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
                <h2 className="text-xl font-semibold text-gray-900">Lamaran Saya</h2>
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
                {myApplications.map((application) => (
                  <ApplicationCard key={application.id} application={application} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Earnings Tab */}
          {activeTab === 'earnings' && (
            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Pendapatan</h2>
                <div className="flex items-center gap-3">
                  <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="6months">6 Bulan Terakhir</option>
                    <option value="year">Tahun Ini</option>
                    <option value="all">Sepanjang Waktu</option>
                  </select>
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    <FileText className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>

              {/* Earnings Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white"
                  variants={fadeInUp}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Wallet className="w-8 h-8 text-green-100" />
                    <span className="text-green-100 text-sm">+12% dari bulan lalu</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{formatCurrency(freelancerStats.totalEarnings)}</h3>
                  <p className="text-green-100">Total Pendapatan</p>
                </motion.div>

                <motion.div
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                  variants={fadeInUp}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-blue-50">
                      <BarChart3 className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-green-600 text-sm">+8%</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{formatCurrency(28000000)}</h3>
                  <p className="text-gray-600">Bulan Ini</p>
                </motion.div>

                <motion.div
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                  variants={fadeInUp}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-purple-50">
                      <Target className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="text-purple-600 text-sm">Target</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{formatCurrency(35000000)}</h3>
                  <p className="text-gray-600">Target Bulan Ini</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </motion.div>
              </div>

              {/* Monthly Earnings */}
              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                variants={fadeInUp}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Pendapatan Bulanan</h3>
                <div className="space-y-4">
                  {earnings.map((earning, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{earning.month}</h4>
                          <p className="text-sm text-gray-600">{earning.projects} proyek selesai</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{formatCurrency(earning.amount)}</p>
                        <div className={`flex items-center gap-1 text-sm ${
                          earning.growth > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          <TrendingUp className={`w-4 h-4 ${earning.growth < 0 ? 'rotate-180' : ''}`} />
                          {Math.abs(earning.growth)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Payment Methods */}
              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                variants={fadeInUp}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Metode Pembayaran</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Bank Transfer</h4>
                      <p className="text-sm text-gray-600">BCA •••• 1234</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">E-Wallet</h4>
                      <p className="text-sm text-gray-600">GoPay •••• 5678</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}