import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Legend, AreaChart, Area 
} from 'recharts';
import { 
  Dog, 
  Wind, 
  CheckSquare, 
  AlertTriangle, 
  ChevronRight,
  TrendingUp,
  Thermometer,
  Navigation
} from 'lucide-react';
import { CyberCard } from '../components/CyberCard';
import { cn } from '../utils';

const trendData = [
  { name: '05-24', tasks: 22, completed: 20, anomaly: 2 },
  { name: '05-25', tasks: 28, completed: 25, anomaly: 3 },
  { name: '05-26', tasks: 35, completed: 32, anomaly: 4 },
  { name: '05-27', tasks: 25, completed: 24, anomaly: 1 },
  { name: '05-28', tasks: 30, completed: 26, anomaly: 5 },
  { name: '05-29', tasks: 32, completed: 28, anomaly: 4 },
  { name: '05-30', tasks: 40, completed: 35, anomaly: 6 },
];

const tempTrendData = [
  { time: '00:00', f1: 22, f2: 25, f3: 30, f4: 24, f5: 27 },
  { time: '04:00', f1: 21, f2: 24, f3: 29, f4: 23, f5: 26 },
  { time: '08:00', f1: 24, f2: 26, f3: 32, f4: 25, f5: 28 },
  { time: '12:00', f1: 26, f2: 28, f3: 35, f4: 27, f5: 30 },
  { time: '16:00', f1: 25, f2: 27, f3: 33, f4: 26, f5: 29 },
  { time: '20:00', f1: 23, f2: 25, f3: 31, f4: 24, f5: 27 },
];

const robotStats = [
  { floor: '1F水泵房', progress: 100, status: '已完成', time: '10:18', color: 'bg-green-500' },
  { floor: '2F油压装置', progress: 100, status: '已完成', time: '10:15', color: 'bg-green-500' },
  { floor: '3F机组层', progress: 78, status: '巡检中', time: '10:28', color: 'bg-sky-500' },
  { floor: '4F中控通道', progress: 65, status: '巡检中', time: '10:25', color: 'bg-sky-500' },
  { floor: '5F电缆夹层', progress: 30, status: '巡检中', time: '10:22', color: 'bg-sky-500' },
  { floor: '6F配电室', progress: 0, status: '待开始', time: '--', color: 'bg-slate-500' },
];

const anomalyData = [
  { type: '渗漏疑似', location: '3F机组层-#2机组', confidence: '92%', status: '未处理', time: '10:24', priority: 'high' },
  { type: '仪表读数异常', location: '2F油压装置-压力表', confidence: '88%', status: '未处理', time: '10:21', priority: 'medium' },
  { type: '锈蚀识别', location: '5F电缆夹层-支架', confidence: '85%', status: '未处理', time: '10:19', priority: 'medium' },
  { type: '温度异常', location: '4F中控通道-配电柜', confidence: '83%', status: '处理中', time: '10:17', priority: 'medium' },
  { type: '渗漏疑似', location: '1F水泵房-伸缩缝', confidence: '77%', status: '已处理', time: '09:58', priority: 'low' },
];

export const Dashboard = () => {
  return (
    <div className="space-y-4 pb-10">
      {/* Top Header Stats */}
      <div className="grid grid-cols-4 gap-4">
        <CyberCard className="h-32 flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/30">
               <Dog className="w-10 h-10 text-blue-400" />
            </div>
            <div>
              <p className="text-slate-400 text-xs">机器人总数</p>
              <p className="text-3xl font-display font-bold text-white leading-none mt-1">6 <span className="text-sm font-normal text-slate-500">台</span></p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-slate-500 text-[10px] uppercase">在线状态</p>
            <div className="flex items-center gap-1.5 text-green-400 font-bold mt-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              6 / 6
            </div>
          </div>
        </CyberCard>

        <CyberCard className="h-32 flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/30">
               <Wind className="w-10 h-10 text-cyan-400" />
            </div>
            <div>
              <p className="text-slate-400 text-xs">无人机总数</p>
              <p className="text-3xl font-display font-bold text-white leading-none mt-1">2 <span className="text-sm font-normal text-slate-500">台</span></p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-slate-500 text-[10px] uppercase">在线状态</p>
            <div className="flex items-center gap-1.5 text-green-400 font-bold mt-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              2 / 2
            </div>
          </div>
        </CyberCard>

        <CyberCard className="h-32 flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/30">
               <CheckSquare className="w-10 h-10 text-amber-400" />
            </div>
            <div>
              <p className="text-slate-400 text-xs">今日巡检任务</p>
              <p className="text-3xl font-display font-bold text-white leading-none mt-1">28 <span className="text-sm font-normal text-slate-500">项</span></p>
            </div>
          </div>
          <div className="text-right">
             <button className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 p-2 rounded-lg border border-amber-500/20 transition-colors">
               <TrendingUp className="w-5 h-5" />
             </button>
          </div>
        </CyberCard>

        <CyberCard className="h-32 flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-red-500/10 rounded-xl flex items-center justify-center border border-red-500/30">
               <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
            <div>
              <p className="text-slate-400 text-xs">异常发现</p>
              <p className="text-3xl font-display font-bold text-white leading-none mt-1">7 <span className="text-sm font-normal text-slate-500">项</span></p>
            </div>
          </div>
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/5" />
              <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={175} strokeDashoffset={40} className="text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
            </svg>
            <span className="absolute text-xs font-bold text-red-400">7</span>
          </div>
        </CyberCard>
      </div>

      {/* Middle Content */}
      <div className="grid grid-cols-12 gap-4">
        <CyberCard title="厂房六层机器人巡检" className="col-span-4" headerAction={<ChevronRight className="w-4 h-4 text-slate-500" />}>
           <div className="space-y-4">
             <div className="grid grid-cols-5 text-[10px] text-slate-500 px-2 uppercase tracking-wider">
               <span className="col-span-1">楼层</span>
               <span className="col-span-2 text-center">巡检进度</span>
               <span className="col-span-1 text-center">状态</span>
               <span className="col-span-1 text-right">时间</span>
             </div>
             <div className="space-y-3">
               {robotStats.map((item, idx) => (
                 <div key={idx} className="grid grid-cols-5 items-center px-2 py-1 rounded hover:bg-white/5 transition-colors group">
                    <span className="col-span-1 text-xs font-medium text-slate-300 group-hover:text-cyan-400">{item.floor}</span>
                    <div className="col-span-2 px-4">
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                          className={cn("h-full", item.color)} 
                        />
                      </div>
                    </div>
                    <div className="col-span-1 flex items-center justify-center gap-1.5">
                       <span className={cn("w-1.5 h-1.5 rounded-full", item.color === 'bg-green-500' ? 'bg-green-400' : item.color === 'bg-sky-500' ? 'bg-sky-400 animate-pulse' : 'bg-slate-400')} />
                       <span className="text-[10px] text-slate-400">{item.status}</span>
                    </div>
                    <span className="col-span-1 text-[10px] text-slate-500 text-right">{item.time}</span>
                 </div>
               ))}
             </div>
           </div>
        </CyberCard>

        <CyberCard title="水库大坝无人机巡检" tag="巡检中" className="col-span-4 relative group overflow-hidden">
           <div className="w-full h-full min-h-[220px] rounded-lg bg-slate-900 relative overflow-hidden border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1544985367-1763351f08bd?auto=format&fit=crop&q=80&w=1200" 
                alt="Dam" 
                className="absolute inset-0 w-full h-full object-cover brightness-75"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg/95 via-transparent to-transparent" />
              
              {/* Path Animation */}
              <svg className="absolute inset-0 w-full h-full">
                <motion.path 
                  d="M 50,50 Q 150,20 250,100 T 350,150" 
                  fill="transparent" 
                  stroke="rgba(34,211,238,0.6)" 
                  strokeWidth="3" 
                  strokeDasharray="8,4"
                  animate={{ strokeDashoffset: -24 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <circle cx="50" cy="50" r="5" fill="#0ea5e9" className="shadow-[0_0_15px_#0ea5e9]" />
                <motion.circle 
                  cx="350" cy="150" r="8" fill="#22d3ee"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="shadow-[0_0_20px_#22d3ee]"
                />
              </svg>

              <div className="absolute bottom-4 left-4 flex gap-4 text-white">
                <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
                  <p className="text-[8px] text-slate-400 uppercase">航线</p>
                  <p className="text-xs font-bold">航线A-03</p>
                </div>
                <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
                  <p className="text-[8px] text-slate-400 uppercase">高度</p>
                  <p className="text-xs font-bold text-cyan-400">86m</p>
                </div>
                <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
                  <p className="text-[8px] text-slate-400 uppercase">速度</p>
                  <p className="text-xs font-bold text-cyan-400">8.2m/s</p>
                </div>
              </div>
           </div>
        </CyberCard>

        <CyberCard title="AI 异常识别" className="col-span-4" headerAction={<p className="text-[10px] text-cyan-400 cursor-pointer hover:underline flex items-center">更多 <ChevronRight className="w-3 h-3" /></p>}>
           <div className="space-y-1">
             {anomalyData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/5">
                   <div className={cn(
                     "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border",
                     item.priority === 'high' ? "bg-red-500/10 border-red-500/20 text-red-500" : 
                     item.priority === 'medium' ? "bg-amber-500/10 border-amber-500/20 text-amber-500" :
                     "bg-green-500/10 border-green-500/20 text-green-500"
                   )}>
                      {item.type.includes('漏') ? <TrendingUp className="w-5 h-5 rotate-180" /> : <TrendingUp className="w-5 h-5" />}
                   </div>
                   <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-slate-200 truncate">{item.type}</p>
                        <span className="text-[10px] text-slate-500">{item.time}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5">{item.location}</p>
                   </div>
                   <div className="text-right shrink-0">
                      <p className="text-[10px] font-bold text-cyan-400">{item.confidence}</p>
                      <p className={cn(
                        "text-[9px] px-1.5 py-0.5 rounded-full border mt-1 font-medium",
                        item.status === '未处理' ? "bg-red-500/10 border-red-500/20 text-red-400" : 
                        item.status === '处理中' ? "bg-amber-500/10 border-amber-500/20 text-amber-400" :
                        "bg-green-500/10 border-green-500/20 text-green-400"
                      )}>{item.status}</p>
                   </div>
                </div>
             ))}
           </div>
           <button className="w-full mt-4 py-2 text-[10px] text-slate-400 hover:text-cyan-400 transition-colors uppercase tracking-widest border-t border-white/5 font-bold">
             加载更多异常数据记录
           </button>
        </CyberCard>
      </div>

      {/* Bottom Area */}
      <div className="grid grid-cols-2 gap-4 h-80">
        <CyberCard title="巡检趋势" className="flex flex-col" headerAction={
          <div className="flex gap-2 text-[10px]">
            <button className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/30">近7天</button>
            <button className="px-3 py-1 hover:bg-white/5 text-slate-500 rounded-full">近30天</button>
          </div>
        }>
          <div className="w-full h-[220px] mt-2">
             <ResponsiveContainer width="99%" height="100%">
               <BarChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'rgba(148, 163, 184, 0.5)', fontSize: 10 }} />
                 <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(148, 163, 184, 0.5)', fontSize: 10 }} />
                 <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '10px' }}
                 />
                 <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                 <Bar dataKey="tasks" name="巡检任务数" fill="rgba(14, 165, 233, 0.8)" radius={[4, 4, 0, 0]} />
                 <Bar dataKey="completed" name="完成任务数" fill="rgba(34, 211, 238, 0.8)" radius={[4, 4, 0, 0]} />
                 <Bar dataKey="anomaly" name="异常发现数" fill="rgba(244, 63, 94, 0.8)" radius={[4, 4, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
          </div>
        </CyberCard>

        <CyberCard title="厂房楼层温度趋势" className="flex flex-col" headerAction={<p className="text-[10px] text-slate-500">单位: ℃</p>}>
           <div className="w-full h-[220px] mt-2">
             <ResponsiveContainer width="99%" height="100%">
                <LineChart data={tempTrendData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: 'rgba(148, 163, 184, 0.5)', fontSize: 10 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(148, 163, 184, 0.5)', fontSize: 10 }} />
                  <Tooltip 
                     contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '8px' }}
                     itemStyle={{ fontSize: '10px' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="f1" name="1F水泵房" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 3, fill: '#0ea5e9' }} />
                  <Line type="monotone" dataKey="f2" name="2F油压装置" stroke="#22d3ee" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="f3" name="3F机组层" stroke="#fbbf24" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="f4" name="4F中控通道" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="f5" name="5F电缆夹层" stroke="#ec4899" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
             </ResponsiveContainer>
           </div>
        </CyberCard>
      </div>
    </div>
  );
};
