import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Dog, 
  Wind, 
  AlertTriangle, 
  FileText, 
  Settings, 
  Activity,
  ChevronLeft, 
  ChevronRight,
  Bell,
  User,
  Search,
  Sun,
  Calendar,
  ChevronDown,
  CloudSun
} from 'lucide-react';
import { useAppStore } from '../store';
import { cn } from '../utils';

const SidebarItem = ({ to, icon: Icon, label, badge }: { to: string, icon: any, label: string, badge?: number }) => {
  const { isSidebarCollapsed } = useAppStore();
  
  return (
    <NavLink 
      to={to}
      className={({ isActive }) => cn(
        "flex items-center gap-3 px-4 py-3 transition-all duration-300 relative group",
        isActive 
          ? "bg-cyan-500/10 text-cyan-400" 
          : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
      )}
    >
      {({ isActive }) => (
        <>
          <Icon className={cn("w-5 h-5", isActive && "drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]")} />
          {!isSidebarCollapsed && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-medium text-sm whitespace-nowrap"
            >
              {label}
            </motion.span>
          )}
          {isActive && (
            <motion.div 
              layoutId="active-pill"
              className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 shadow-[2px_0_10px_rgba(34,211,238,0.5)]"
            />
          )}
          {badge !== undefined && (
            <div className={cn(
              "absolute right-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center min-w-[18px] h-[18px] px-1",
              isSidebarCollapsed && "top-1 right-1"
            )}>
              {badge}
            </div>
          )}
        </>
      )}
    </NavLink>
  );
};

export const Layout = () => {
  const { isSidebarCollapsed, toggleSidebar } = useAppStore();
  const location = useLocation();
  const [time, setTime] = useState(new Date());
  const [address, setAddress] = useState('正在获取位置...');
  const [weather, setWeather] = useState('20℃ 多云');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`, {
            headers: {
              'Accept-Language': 'zh-CN,zh;q=0.9'
            }
          });
          const data = await response.json();
          if (data && data.address) {
            const city = data.address.city || data.address.town || data.address.village || data.address.county || '';
            const province = data.address.province || data.address.state || '';
            setAddress(`${province} · ${city}`);
          } else {
            setAddress(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
          }
        } catch (error) {
          console.error("Error fetching location:", error);
          setAddress('位置获取失败');
        }
      }, (error) => {
        console.error("Geolocation error:", error);
        setAddress('定位权限未开启');
      });
    } else {
      setAddress('不支持定位');
    }
  }, []);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { hour12: false });
  };
  
  return (
    <div className="flex h-screen bg-cyber-bg overflow-hidden cyber-grid font-sans">
      {/* Sidebar */}
      <motion.aside 
        animate={{ width: isSidebarCollapsed ? 80 : 260 }}
        className="h-full bg-cyber-bg/80 backdrop-blur-xl border-r border-white/5 flex flex-col z-50 relative"
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center border border-cyan-500/30">
            <LayoutDashboard className="text-cyan-400 w-6 h-6" />
          </div>
          {!isSidebarCollapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col"
            >
              <h1 className="font-display text-lg font-bold cyber-gradient-text tracking-tighter">某某水电站</h1>
              <p className="text-[10px] text-slate-500 tracking-widest uppercase">智能巡检平台</p>
            </motion.div>
          )}
        </div>

        <nav className="flex-1 py-4 flex flex-col gap-1 overflow-y-auto scrollbar-hide">
          <SidebarItem to="/" icon={LayoutDashboard} label="首页驾驶舱" />
          <SidebarItem to="/robot" icon={Dog} label="机器人巡检" />
          <SidebarItem to="/drone" icon={Wind} label="无人机巡检" />
          <SidebarItem to="/alarms" icon={AlertTriangle} label="缺陷与报警" badge={7} />
          <SidebarItem to="/reports" icon={FileText} label="巡检报告" />
          <SidebarItem to="/settings" icon={Settings} label="系统设置" />
          <SidebarItem to="/health" icon={Activity} label="系统健康度" />
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={toggleSidebar}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-200 transition-colors"
          >
            {isSidebarCollapsed ? <ChevronRight className="mx-auto" /> : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm font-medium">收起菜单</span>
              </>
            )}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header */}
        <header className="h-20 bg-cyber-bg/40 backdrop-blur-md border-b border-white/5 px-8 flex items-center justify-between relative z-40">
          <div className="flex items-center gap-4">
             <div className="relative group">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
               <input 
                 type="text" 
                 placeholder="搜索资源、报警、报告..." 
                 className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all w-64"
               />
             </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-slate-300">
               <CloudSun className="w-5 h-5 text-yellow-400" />
               <div className="flex flex-col">
                  <span className="text-xs font-semibold">{weather}</span>
                  <span className="text-[10px] text-slate-500">{address}</span>
               </div>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
               <Calendar className="w-5 h-5 text-cyan-400" />
               <div className="flex flex-col items-end">
                  <span className="text-xs font-semibold">{formatDate(time)}</span>
                  <span className="text-[10px] text-slate-500">{formatTime(time)}</span>
               </div>
            </div>

            <div className="h-8 w-px bg-white/10" />

            <div className="flex items-center gap-3 cursor-pointer group">
               <div className="text-right">
                  <p className="text-xs font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">管理员</p>
                  <p className="text-[10px] text-slate-500">系统维护</p>
               </div>
               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20">
                  <div className="w-full h-full rounded-full bg-cyber-bg flex items-center justify-center overflow-hidden">
                    <User className="w-6 h-6 text-cyan-400" />
                  </div>
               </div>
               <ChevronDown className="w-4 h-4 text-slate-500" />
            </div>
          </div>
        </header>

        {/* Dynamic Page Title (Overlay) */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <h2 className="text-2xl font-display font-bold text-white tracking-[0.2em] relative">
            水电站智能巡检系统界面原型
            <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          </h2>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};
