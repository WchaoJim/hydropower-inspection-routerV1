import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Globe, 
  Users, 
  Zap, 
  ShieldCheck,
  RefreshCcw,
  Server
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { CyberCard } from '../components/CyberCard';
import { cn } from '../utils';

// Types for our health metrics
interface MetricData {
  time: string;
  cpu: number;
  memory: number;
  networkIn: number;
  networkOut: number;
}

export const SystemHealth: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [currentCpu, setCurrentCpu] = useState(42);
  const [currentMem, setCurrentMem] = useState(65);
  const [activeUsers, setActiveUsers] = useState(1284);
  const [uptime, setUptime] = useState("12d 04h 32m");

  // Simulate real-time data updates
  useEffect(() => {
    const generateInitialData = () => {
      const data: MetricData[] = [];
      const now = new Date();
      for (let i = 20; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 5000);
        data.push({
          time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          cpu: Math.floor(Math.random() * 30) + 30,
          memory: Math.floor(Math.random() * 10) + 60,
          networkIn: Math.floor(Math.random() * 500) + 100,
          networkOut: Math.floor(Math.random() * 300) + 50,
        });
      }
      return data;
    };

    setMetrics(generateInitialData());

    const interval = setInterval(() => {
      setMetrics(prev => {
        const nextTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const newMetric = {
          time: nextTime,
          cpu: Math.floor(Math.random() * 30) + 30,
          memory: Math.floor(Math.random() * 10) + 60,
          networkIn: Math.floor(Math.random() * 500) + 100,
          networkOut: Math.floor(Math.random() * 300) + 50,
        };
        const updated = [...prev.slice(1), newMetric];
        setCurrentCpu(newMetric.cpu);
        setCurrentMem(newMetric.memory);
        return updated;
      });
      
      // Slightly fluctuate user count
      setActiveUsers(prev => prev + (Math.floor(Math.random() * 5) - 2));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-6 h-full flex flex-col overflow-y-auto custom-scrollbar">
      {/* Header Stat Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={<Cpu className="w-5 h-5 text-cyan-400" />}
          label="CPU 负载"
          value={`${currentCpu}%`}
          trend="+1.2%"
          color="cyan"
          progress={currentCpu}
        />
        <StatCard 
          icon={<HardDrive className="w-5 h-5 text-purple-400" />}
          label="内存使用"
          value={`${currentMem}%`}
          trend="-0.5%"
          color="purple"
          progress={currentMem}
        />
        <StatCard 
          icon={<Users className="w-5 h-5 text-emerald-400" />}
          label="活跃用户"
          value={activeUsers.toLocaleString()}
          trend="+4"
          color="emerald"
        />
        <StatCard 
          icon={<Server className="w-5 h-5 text-amber-400" />}
          label="系统运行时间"
          value={uptime}
          color="amber"
        />
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
        {/* CPU & Memory Trends */}
        <CyberCard title="计算节点实时监控" className="col-span-12 lg:col-span-8 h-[400px]">
          <div className="h-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics}>
                <defs>
                  <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} hide />
                <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', fontSize: '10px' }}
                  itemStyle={{ fontSize: '10px' }}
                />
                <Area type="monotone" dataKey="cpu" name="CPU 使用率 (%)" stroke="#06b6d4" fillOpacity={1} fill="url(#colorCpu)" strokeWidth={2} />
                <Area type="monotone" dataKey="memory" name="内存使用率 (%)" stroke="#a855f7" fillOpacity={1} fill="url(#colorMem)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CyberCard>

        {/* Network Traffic */}
        <CyberCard title="网络流量控制台" className="col-span-12 lg:col-span-4 h-[400px]">
          <div className="h-full flex flex-col space-y-4 pt-2">
            <div className="flex justify-between px-2">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" /> 入站 (Inbound)
                </span>
                <p className="text-lg font-mono font-bold text-white tracking-wider">
                  {metrics[metrics.length-1]?.networkIn} <span className="text-xs text-slate-500">Mbps</span>
                </p>
              </div>
              <div className="space-y-1 text-right">
                <span className="text-[10px] text-slate-500 uppercase flex items-center justify-end gap-1">
                   出站 (Outbound) <div className="w-2 h-2 rounded-full bg-amber-500" />
                </span>
                <p className="text-lg font-mono font-bold text-white tracking-wider">
                  {metrics[metrics.length-1]?.networkOut} <span className="text-xs text-slate-500">Mbps</span>
                </p>
              </div>
            </div>
            
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={metrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', fontSize: '10px' }}
                  />
                  <Line type="stepAfter" dataKey="networkIn" name="入站" stroke="#10b981" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="stepAfter" dataKey="networkOut" name="出站" stroke="#f59e0b" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-lg">
               <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3" /> 安全防火墙状态
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded border border-emerald-500/20">ACTIVE</span>
               </div>
               <p className="text-[10px] text-slate-500 leading-relaxed">
                 正在监控 12,402 个并发连接。检测并拦截了 3 个潜在威胁。
               </p>
            </div>
          </div>
        </CyberCard>

        {/* Server Status Indicators */}
        <CyberCard title="服务器集群节点状态" className="col-span-12 h-[300px]">
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-4">
              {[1, 2, 3, 4, 5, 6].map((node) => (
                <div key={node} className="p-4 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all group">
                   <div className="flex items-center justify-between mb-3">
                      <Zap className={cn("w-4 h-4", node === 4 ? "text-amber-500" : "text-emerald-500")} />
                      <span className="text-[10px] font-mono text-slate-500">#NODE-0{node}</span>
                   </div>
                   <div className="space-y-1">
                      <p className="text-xs font-bold text-white">
                         {node === 4 ? "MAINTENANCE" : "OPERATIONAL"}
                      </p>
                      <div className="flex items-center gap-2">
                         <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: node === 4 ? '100%' : `${30 + node * 10}%` }}
                              className={cn("h-full", node === 4 ? "bg-amber-500" : "bg-cyan-500")}
                            />
                         </div>
                         <span className="text-[8px] text-slate-500">{node === 4 ? '100%' : `${30 + node * 10}%`}</span>
                      </div>
                   </div>
                </div>
              ))}
           </div>
           
           <div className="mt-6 p-4 border border-dashed border-white/10 rounded flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <RefreshCcw className="w-5 h-5 text-cyan-400 animate-spin-slow" />
                 </div>
                 <div>
                    <h4 className="text-sm font-bold text-white">自动扩展策略</h4>
                    <p className="text-xs text-slate-500">根据当前负载，已部署 2 个冗余实例。</p>
                 </div>
              </div>
              <button className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-bold border border-cyan-500/30 rounded transition-all">
                手动配置
              </button>
           </div>
        </CyberCard>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend?: string;
  color: 'cyan' | 'purple' | 'emerald' | 'amber';
  progress?: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, trend, color, progress }) => {
  const colors = {
    cyan: 'shadow-[0_0_15px_rgba(34,211,238,0.1)] border-cyan-500/20',
    purple: 'shadow-[0_0_15px_rgba(168,85,247,0.1)] border-purple-500/20',
    emerald: 'shadow-[0_0_15px_rgba(16,185,129,0.1)] border-emerald-500/20',
    amber: 'shadow-[0_0_15px_rgba(245,158,11,0.1)] border-amber-500/20'
  };

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className={cn(
        "p-5 rounded-xl bg-slate-900/40 border backdrop-blur-md relative overflow-hidden group",
        colors[color]
      )}
    >
      <div className="absolute top-0 right-0 p-2 opacity-5 scale-150 rotate-12 group-hover:scale-175 transition-transform duration-500">
        {icon}
      </div>
      
      <div className="flex items-center gap-3 mb-4">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center",
          `bg-${color}-500/10 border border-${color}-500/20`
        )}>
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{label}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-mono font-bold text-white tracking-tighter">{value}</h3>
            {trend && (
              <span className={cn(
                "text-[10px] font-bold px-1.5 py-0.5 rounded",
                trend.startsWith('+') ? "text-emerald-400 bg-emerald-500/10" : "text-red-400 bg-red-500/10"
              )}>
                {trend}
              </span>
            )}
          </div>
        </div>
      </div>

      {progress !== undefined && (
        <div className="space-y-2">
          <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className={cn(
                "h-full rounded-full shadow-[0_0_10px_currentColor]",
                color === 'cyan' && "bg-cyan-500 text-cyan-500",
                color === 'purple' && "bg-purple-500 text-purple-500"
              )}
            />
          </div>
          <div className="flex justify-between text-[8px] font-mono text-slate-600">
             <span>0%</span>
             <span>THRESHOLD: 80%</span>
             <span>100%</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};
