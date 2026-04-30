import React from 'react';
import { 
  Wind, 
  Map as MapIcon, 
  Navigation, 
  Video, 
  Shield, 
  AlertCircle, 
  ChevronRight,
  Plane,
  Signal,
  Battery,
  Cloud,
  Eye,
  Camera,
  Layers,
  Settings2,
  Clock,
  Maximize2
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell 
} from 'recharts';
import { motion } from 'motion/react';
import { CyberCard } from '../components/CyberCard';
import { cn } from '../utils';

const flightData = [
  { name: '05-14', time: 40, images: 120 },
  { name: '05-15', time: 55, images: 180 },
  { name: '05-16', time: 30, images: 90 },
  { name: '05-17', time: 45, images: 150 },
  { name: '05-18', time: 60, images: 210 },
  { name: '05-19', time: 50, images: 170 },
  { name: '05-20', time: 65, images: 268 },
];

const taskStatData = [
  { name: '已完成', value: 7, color: '#22d3ee' },
  { name: '进行中', value: 3, color: '#fbbf24' },
  { name: '未执行', value: 2, color: '#64748b' },
];

const droneTasks = [
  { id: 'TASK-20250520-01', route: 'D-01 航线', type: '常规巡检', status: '执行中', progress: 68, back: '11:25' },
  { id: 'TASK-20250520-02', route: 'D-02 航线', type: '重点巡检', status: '执行中', progress: 41, back: '11:40' },
];

const recognitionResults = [
  { type: '裂缝识别', loc: '坝体右岸 0+125', conf: '92%', priority: 'high', time: '10:28' },
  { type: '渗漏疑似', loc: '坝体右岸 0+185', conf: '88%', priority: 'medium', time: '10:27' },
  { type: '异物识别', loc: '坝顶公路段', conf: '75%', priority: 'low', time: '10:26' },
  { type: '坡面异常', loc: '下游护坡 0+320', conf: '82%', priority: 'medium', time: '10:24' },
];

export const DroneInspection = () => {
  return (
    <div className="space-y-4 pb-10">
      {/* Top Header Stats */}
      <div className="grid grid-cols-5 gap-4">
        <CyberCard className="h-28 flex items-center justify-between p-4">
           <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-500/30">
                <Wind className="w-6 h-6 text-blue-400" />
             </div>
             <div>
               <p className="text-slate-400 text-[10px]">无人机总数</p>
               <p className="text-2xl font-display font-bold text-white">2 <span className="text-xs font-normal text-slate-500">台</span></p>
             </div>
          </div>
        </CyberCard>

        <CyberCard className="h-28 flex items-center justify-between p-4">
           <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center border border-green-500/30">
                <Signal className="w-6 h-6 text-green-400" />
             </div>
             <div>
               <p className="text-slate-400 text-[10px]">在线状态</p>
               <p className="text-2xl font-display font-bold text-white">2 <span className="text-xs font-normal text-slate-500">/ 2</span></p>
             </div>
          </div>
        </CyberCard>

        <CyberCard className="h-28 flex items-center justify-between p-4">
           <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center border border-amber-500/30">
                <Plane className="w-6 h-6 text-amber-400" />
             </div>
             <div>
               <p className="text-slate-400 text-[10px]">飞行任务</p>
               <p className="text-2xl font-display font-bold text-white">2 <span className="text-xs font-normal text-slate-500">个</span></p>
             </div>
          </div>
        </CyberCard>

        <CyberCard className="h-28 flex items-center justify-between p-4">
           <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/30">
                <Camera className="w-6 h-6 text-cyan-400" />
             </div>
             <div>
               <p className="text-slate-400 text-[10px]">今日采集影像</p>
               <p className="text-2xl font-display font-bold text-white">268 <span className="text-xs font-normal text-slate-500">张</span></p>
             </div>
          </div>
        </CyberCard>

        <CyberCard className="h-28 flex items-center justify-between p-4">
           <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center border border-indigo-500/30">
                <Clock className="w-6 h-6 text-indigo-400" />
             </div>
             <div>
               <p className="text-slate-400 text-[10px]">今日飞行时长</p>
               <p className="text-2xl font-display font-bold text-white">1<span className="text-xs font-normal text-slate-500">h</span> 38<span className="text-xs font-normal text-slate-500">m</span></p>
             </div>
          </div>
        </CyberCard>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-4">
        {/* Left: Map */}
        <CyberCard title="水库大坝无人机巡检" className="col-span-8 h-[550px] relative overflow-hidden bg-slate-950 border-none">
           <div className="absolute inset-0">
             <img 
                src="https://images.unsplash.com/photo-1541829070764-84a7d30dee62?auto=format&fit=crop&q=80&w=2000"
                alt="Atmospheric Dam Reservoir Cinematic"
                className="w-full h-full object-cover brightness-[0.4] contrast-[1.2] saturate-[0.8]"
                referrerPolicy="no-referrer"
             />
             <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />
             <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg/80 via-transparent to-transparent" />
           </div>
           
           {/* UI Overlays on Map - Legend (Left) */}
           <div className="absolute top-10 left-6 p-4 space-y-4 bg-black/40 backdrop-blur-md rounded-lg border border-white/5 shadow-2xl z-20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-1 bg-cyan-400 rounded-full" />
                <span className="text-xs text-slate-200 font-bold tracking-wider">D-01 航线</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-1 bg-green-400 rounded-full" />
                <span className="text-xs text-slate-200 font-bold tracking-wider">D-02 航线</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-5 bg-red-500/20 border border-red-500/40 relative overflow-hidden flex items-center justify-center">
                   <div className="absolute inset-0" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(239, 68, 68, 0.4) 2px, rgba(239, 68, 68, 0.4) 4px)'}} />
                </div>
                <span className="text-xs text-slate-200 font-bold tracking-wider">禁飞区</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-5 bg-amber-500/20 border border-amber-500/40 relative overflow-hidden flex items-center justify-center">
                   <div className="absolute inset-0" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(245, 158, 11, 0.4) 2px, rgba(245, 158, 11, 0.4) 4px)'}} />
                </div>
                <span className="text-xs text-slate-200 font-bold tracking-wider">警戒区</span>
              </div>
           </div>

           {/* Map Controls (Right) */}
           <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-1 z-20">
              <div className="flex flex-col bg-black/60 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden shadow-2xl">
                 <button className="p-3 hover:bg-white/10 text-white transition-colors border-b border-white/5"><span className="text-xl font-bold">+</span></button>
                 <button className="p-3 hover:bg-white/10 text-white transition-colors border-b border-white/5"><span className="text-xl font-bold">−</span></button>
                 <button className="p-3 hover:bg-white/10 text-cyan-400 transition-colors border-b border-white/5 flex items-center justify-center">
                   <Navigation className="w-5 h-5 -rotate-45" />
                 </button>
                 <button className="p-3 hover:bg-white/10 text-slate-400 transition-colors flex flex-col items-center">
                   <span className="text-[10px] font-bold">3D</span>
                 </button>
              </div>
           </div>

           {/* Drone Path Points & Paths */}
           <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
              <defs>
                 <pattern id="hatch-red" patternUnits="userSpaceOnUse" width="4" height="4">
                    <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" stroke="#ef4444" strokeWidth="1" />
                 </pattern>
                 <pattern id="hatch-yellow" patternUnits="userSpaceOnUse" width="4" height="4">
                    <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" stroke="#eab308" strokeWidth="1" />
                 </pattern>
              </defs>

              {/* No-Fly Zones */}
              <circle cx="300" cy="150" r="40" fill="url(#hatch-red)" fillOpacity="0.4" stroke="#ef4444" strokeWidth="1" strokeDasharray="4,2" />
              <circle cx="700" cy="750" r="50" fill="url(#hatch-red)" fillOpacity="0.4" stroke="#ef4444" strokeWidth="1" strokeDasharray="4,2" />
              
              {/* Warning Zone */}
              <path d="M 800,250 L 950,280 L 900,550 L 820,480 Z" fill="url(#hatch-yellow)" fillOpacity="0.3" stroke="#eab308" strokeWidth="1" strokeDasharray="4,2" />

              {/* D-01 Path (Cyan) */}
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d="M 150,450 Q 250,400 350,320 T 550,220 Q 650,150 750,200" 
                fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="6,4"
              />

              {/* D-01 Waypoints */}
              {[
                { x: 150, y: 450, n: 6 },
                { x: 210, y: 410, n: 2 },
                { x: 270, y: 410, n: 1 },
                { x: 350, y: 320, n: 4 },
                { x: 460, y: 280, n: 3 },
                { x: 550, y: 220, n: 7 },
              ].map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r="10" fill="#22d3ee" className="shadow-lg" />
                  <text x={p.x} y={p.y + 4} textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold">{p.n}</text>
                </g>
              ))}

              {/* D-02 Path (Green) */}
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                d="M 180,850 Q 300,820 400,750 T 600,600 Q 700,550 820,720" 
                fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="6,4"
              />

              {/* D-02 Waypoints */}
              {[
                { x: 300, y: 820, n: 4 },
                { x: 400, y: 750, n: 4 },
                { x: 520, y: 680, n: 8 },
                { x: 600, y: 600, n: 3 },
                { x: 740, y: 650, n: 6 },
              ].map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r="10" fill="#22c55e" className="shadow-lg" />
                  <text x={p.x} y={p.y + 4} textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold">{p.n}</text>
                </g>
              ))}
           </svg>

           {/* Drone D-01 Position */}
           <div className="absolute left-[550px] top-[220px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-30">
              <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="relative">
                 <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_20px_#22d3ee] border-2 border-white/40">
                    <Plane className="w-6 h-6 text-white" />
                 </div>
                 <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full animate-ping" />
              </motion.div>
              <div className="mt-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-cyan-500/30 flex flex-col items-center">
                 <span className="text-[10px] font-bold text-cyan-400 tracking-wider">D-01</span>
                 <span className="text-[10px] text-white font-mono">86m</span>
              </div>
           </div>

           {/* Drone D-02 Position */}
           <div className="absolute left-[600px] top-[600px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-30">
              <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="relative">
                 <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_20px_#22c55e] border-2 border-white/40">
                    <Plane className="w-6 h-6 text-white" />
                 </div>
              </motion.div>
              <div className="mt-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-green-500/30 flex flex-col items-center">
                 <span className="text-[10px] font-bold text-green-400 tracking-wider">D-02</span>
                 <span className="text-[10px] text-white font-mono">92m</span>
              </div>
           </div>
        </CyberCard>


        {/* Right Detail */}
        <div className="col-span-4 flex flex-col gap-4">
           <CyberCard title="当前无人机状态" headerAction={<div className="text-[10px] px-2 py-0.5 bg-white/5 rounded border border-white/10 text-slate-300">D-01</div>}>
              <div className="grid grid-cols-2 gap-4">
                 {[
                   { icon: Plane, label: '飞行高度', val: '86', unit: 'm', color: 'text-white' },
                   { icon: Navigation, label: '飞行速度', val: '8.2', unit: 'm/s', color: 'text-white' },
                   { icon: Battery, label: '电池电量', val: '76', unit: '%', color: 'text-green-400' },
                   { icon: Signal, label: '信号强度', val: '强', unit: '', color: 'text-cyan-400' },
                   { icon: Wind, label: '风速', val: '4.6', unit: 'm/s', color: 'text-white' },
                   { icon: Camera, label: '云台角度', val: '-12° / 5°', unit: '', color: 'text-white' },
                   { icon: Shield, label: '相机模式', val: '自动拍照', unit: '', color: 'text-white' },
                   { icon: Settings2, label: '存储空间', val: '62', unit: '%', color: 'text-white' },
                 ].map((stat, i) => (
                    <div key={i} className="flex flex-col items-center p-2 rounded bg-white/5 border border-white/5">
                       <stat.icon className="w-4 h-4 text-slate-500 mb-1" />
                       <span className="text-[8px] text-slate-500 uppercase tracking-tighter">{stat.label}</span>
                       <p className={cn("text-xs font-bold font-display mt-0.5", stat.color)}>{stat.val}<span className="text-[8px] ml-0.5 font-normal">{stat.unit}</span></p>
                    </div>
                 ))}
              </div>
           </CyberCard>

           <CyberCard title="缺陷识别结果 (D-01)" headerAction={<p className="text-[10px] text-cyan-400 cursor-pointer">更多</p>}>
              <div className="space-y-2 overflow-y-auto max-h-[160px] pr-1 scrollbar-hide">
                 {recognitionResults.map((item, idx) => (
                    <div key={idx} className="flex gap-2 p-1.5 rounded bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-white/10 group">
                       <div className="w-16 h-10 bg-slate-800 rounded relative overflow-hidden shrink-0 border border-white/5">
                          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541844053589-3462d48a74e5?auto=format&fit=crop&q=80&w=200')] bg-cover bg-center grayscale" />
                          <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-4 h-4 border border-red-500/50 rounded-sm" />
                          </div>
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                             <p className="text-[10px] font-bold text-slate-200 truncate">{item.type}</p>
                             <span className={cn(
                               "text-[8px] px-1 rounded-sm border font-bold shrink-0",
                               item.priority === 'high' ? "bg-red-500/10 border-red-500/30 text-red-500" : 
                               item.priority === 'medium' ? "bg-amber-500/10 border-amber-500/30 text-amber-500" : "bg-blue-500/10 border-blue-500/30 text-blue-500"
                             )}>{item.priority === 'high' ? '高' : item.priority === 'medium' ? '中' : '低'}</span>
                          </div>
                          <p className="text-[8px] text-slate-500 truncate mt-0.5">{item.loc}</p>
                          <div className="flex items-center justify-between mt-1">
                             <span className="text-[9px] text-cyan-400/80">置信度: {item.conf}</span>
                             <span className="text-[9px] text-slate-600">{item.time}</span>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </CyberCard>
        </div>
      </div>

      {/* Bottom Area */}
      <div className="grid grid-cols-12 gap-4">
         <CyberCard title="报警趋势 (近7天)" className="col-span-5 h-[280px]">
            <div className="w-full h-[220px] pt-2">
               <ResponsiveContainer width="99%" height="100%">
                  <AreaChart data={[
                     { name: '05-24', val: 5 }, { name: '05-25', val: 8 }, { name: '05-26', val: 6 },
                     { name: '05-27', val: 12 }, { name: '05-28', val: 9 }, { name: '05-29', val: 15 }, { name: '05-30', val: 10 }
                  ]}>
                  <defs>
                     <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                     </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={9} axisLine={false} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={9} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', fontSize: '10px' }} />
                  <Area type="monotone" dataKey="val" name="报警数" stroke="#06b6d4" strokeWidth={2} fill="url(#colorVal)" />
               </AreaChart>
            </ResponsiveContainer>
         </div>
      </CyberCard>

         <CyberCard title="实时影像 (D-01)" className="col-span-3 h-[280px] bg-black">
            <div className="h-full bg-[url('https://images.unsplash.com/photo-1544985350-0968940c6e03?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center rounded overflow-hidden relative">
               <div className="absolute inset-0 bg-black/20" />
               <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/60 px-2 py-1 rounded text-[9px] font-bold text-white uppercase"><div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" /> REC</div>
               <div className="absolute bottom-2 flex w-full justify-between px-3">
                  <div className="flex gap-1.5">
                    <button className="p-1.5 bg-black/40 hover:bg-black/60 rounded"><Camera className="w-3.5 h-3.5 text-white" /></button>
                    <button className="p-1.5 bg-black/40 hover:bg-black/60 rounded"><Video className="w-3.5 h-3.5 text-white" /></button>
                  </div>
                  <button className="p-1.5 bg-black/40 hover:bg-black/60 rounded"><Maximize2 className="w-3.5 h-3.5 text-white" /></button>
               </div>
            </div>
         </CyberCard>

         <CyberCard title="报警分布 (近7天)" className="col-span-2 h-[280px]">
            <div className="h-full flex flex-col pt-2">
               <div className="flex-1 w-full min-h-[140px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie 
                          data={[
                            { name: '裂缝', value: 45, color: '#06b6d4' },
                            { name: '渗漏', value: 25, color: '#3b82f6' },
                            { name: '异物', value: 20, color: '#10b981' },
                            { name: '其他', value: 10, color: '#64748b' }
                          ]} 
                          innerRadius={40} 
                          outerRadius={55} 
                          paddingAngle={5} 
                          dataKey="value"
                        >
                           <Cell fill="#06b6d4" />
                           <Cell fill="#3b82f6" />
                           <Cell fill="#10b981" />
                           <Cell fill="#64748b" />
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px', fontSize: '10px' }} />
                     </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                     <span className="text-[8px] text-slate-500 uppercase">总报警</span>
                     <span className="text-sm font-bold text-white">23</span>
                  </div>
               </div>
               <div className="space-y-1.5 mt-2">
                  {[
                     { name: '裂缝', val: 10, color: '#06b6d4' },
                     { name: '渗漏', val: 6, color: '#3b82f6' },
                     { name: '异物', val: 4, color: '#10b981' },
                     { name: '其他', val: 3, color: '#64748b' }
                  ].map((item, i) => (
                     <div key={i} className="flex items-center justify-between text-[9px]">
                        <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} /><span className="text-slate-400">{item.name}</span></div>
                        <span className="text-slate-200 font-bold">{item.val}</span>
                     </div>
                  ))}
               </div>
            </div>
         </CyberCard>

         <CyberCard title="数据统计 (近7天)" className="col-span-2 h-[280px]">
            <div className="space-y-3 pt-2">
               {[
                 { icon: Clock, label: '飞行总时长', val: '9h 46m', color: 'text-blue-400' },
                 { icon: Camera, label: '采集影像总数', val: '1628 张', color: 'text-cyan-400' },
                 { icon: AlertCircle, label: '识别缺陷总数', val: '23 项', color: 'text-red-400' },
               ].map((item, i) => (
                  <div key={i} className="p-2.5 rounded bg-white/5 border border-white/5 flex flex-col gap-1">
                     <div className="flex items-center gap-2 text-slate-500"><item.icon className="w-3.5 h-3.5" /><span className="text-[10px] uppercase font-bold">{item.label}</span></div>
                     <p className={cn("text-sm font-bold font-display ml-5.5", item.color)}>{item.val}</p>
                  </div>
               ))}
            </div>
         </CyberCard>
      </div>
    </div>
  );
};
