import React from 'react';
import { 
  Dog, 
  Play, 
  Pause, 
  Map as MapIcon, 
  Video, 
  Thermometer, 
  Battery, 
  Signal, 
  Clock,
  ChevronRight,
  Maximize2,
  Camera
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { CyberCard } from '../components/CyberCard';
import { cn } from '../utils';

const batteryData = [
  { time: '00:00', r1: 95, r2: 88, r3: 72, r4: 90, r5: 65, r6: 40 },
  { time: '02:00', r1: 85, r2: 78, r3: 65, r4: 80, r5: 55, r6: 35 },
  { time: '04:00', r1: 75, r2: 68, r3: 58, r4: 70, r5: 45, r6: 30 },
  { time: '06:00', r1: 65, r2: 58, r3: 50, r4: 60, r5: 35, r6: 25 },
  { time: '08:00', r1: 55, r2: 48, r3: 42, r4: 50, r5: 25, r6: 20 },
  { time: '10:00', r1: 82, r2: 76, r3: 68, r4: 61, r5: 54, r6: 46 },
];

const robotQueue = [
  { id: 'R-01', floor: '6F 配电室', battery: '82%', status: '巡检中', signal: 4, update: '10:30:21' },
  { id: 'R-02', floor: '5F 电缆夹层', battery: '76%', status: '巡检中', signal: 5, update: '10:30:19' },
  { id: 'R-03', floor: '4F 中控通道', battery: '68%', status: '巡检中', signal: 3, update: '10:30:18' },
  { id: 'R-04', floor: '3F 机组层', battery: '61%', status: '巡检中', signal: 4, update: '10:30:17' },
  { id: 'R-05', floor: '1F 水泵房', battery: '54%', status: '巡检中', signal: 5, update: '10:30:16' },
  { id: 'R-06', floor: '1F 水泵房(待命区)', battery: '46%', status: '待命中', signal: 4, update: '10:30:15' },
];

const taskPoints = [
  { floor: '1F 水泵房', points: '水泵机组、阀门、管道', type: '设备点位', freq: '2次/天', status: '已完成', anomalies: 0 },
  { floor: '2F 油压装置', points: '油压站、蓄能器、阀组', type: '设备点位', freq: '2次/天', status: '已完成', anomalies: 0 },
  { floor: '3F 机组层', points: '发电机组、定子、转子', type: '设备点位', freq: '2次/天', status: '进行中', anomalies: 1 },
  { floor: '4F 中控通道', points: '控制柜、通信柜、照明', type: '环境点位', freq: '2次/天', status: '进行中', anomalies: 0 },
  { floor: '5F 电缆夹层', points: '电缆桥架、接头、支架', type: '设备点位', freq: '1次/天', status: '进行中', anomalies: 0 },
  { floor: '6F 配电室', points: '配电柜、断路器、母线', type: '设备点位', freq: '2次/天', status: '进行中', anomalies: 1 },
];

const RobotMarker = ({ id, color, isActive }: { id: string, color: 'green' | 'orange', isActive?: boolean }) => (
  <div className="flex flex-col items-center">
    <div className="relative">
      <div className={cn(
        "px-1.5 py-0.5 rounded text-[8px] font-bold text-white mb-1 shadow-lg border -translate-y-1",
        color === 'green' ? "bg-green-600 border-green-400" : "bg-orange-600 border-orange-400"
      )}>
        {id}
      </div>
      <div className="relative flex justify-center">
        <Dog className={cn(
          "w-6 h-6",
          color === 'green' ? "text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]",
          isActive && "animate-bounce"
        )} />
        {color === 'green' && <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-ping" />}
      </div>
    </div>
  </div>
);

export const RobotInspection = () => {
  return (
    <div className="space-y-4 pb-10 h-full">
      {/* Top Header Stats */}
      <div className="grid grid-cols-5 gap-4">
        <CyberCard className="h-28 flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-500/30">
                <Dog className="w-6 h-6 text-blue-400" />
             </div>
             <div>
               <p className="text-slate-400 text-[10px]">机器人总数</p>
               <p className="text-2xl font-display font-bold text-white">6 <span className="text-xs font-normal text-slate-500">台</span></p>
             </div>
          </div>
          <div className="text-right">
            <p className="text-slate-500 text-[8px] uppercase">在线状态</p>
            <div className="text-green-400 font-bold text-sm">6 / 6</div>
          </div>
        </CyberCard>

        <CyberCard className="h-28 flex items-center justify-between p-4">
           <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-sky-500/10 rounded-lg flex items-center justify-center border border-sky-500/30">
                <Play className="w-6 h-6 text-sky-400 fill-sky-400/20" />
             </div>
             <div>
               <p className="text-slate-400 text-[10px]">执行中</p>
               <p className="text-2xl font-display font-bold text-white">4 <span className="text-xs font-normal text-slate-500">台</span></p>
             </div>
          </div>
          <div className="w-12 h-1.5 bg-sky-500/20 rounded-full overflow-hidden">
             <div className="w-2/3 h-full bg-sky-400 animate-pulse" />
          </div>
        </CyberCard>

        <CyberCard className="h-28 flex items-center justify-between p-4">
           <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-slate-500/10 rounded-lg flex items-center justify-center border border-slate-500/30">
                <Pause className="w-6 h-6 text-slate-400 fill-slate-400/20" />
             </div>
             <div>
               <p className="text-slate-400 text-[10px]">待命中心</p>
               <p className="text-2xl font-display font-bold text-white">2 <span className="text-xs font-normal text-slate-500">台</span></p>
             </div>
          </div>
        </CyberCard>

        <CyberCard className="h-28 flex items-center justify-between p-4 bg-gradient-to-br from-cyber-card to-cyan-500/5">
           <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/30">
                <MapIcon className="w-6 h-6 text-cyan-400" />
             </div>
             <div>
               <p className="text-slate-400 text-[10px]">今日巡检点位</p>
               <p className="text-2xl font-display font-bold text-white">128 <span className="text-xs font-normal text-slate-500">个</span></p>
             </div>
          </div>
          <div className="text-right">
             <p className="text-slate-500 text-[8px] uppercase">里程</p>
             <p className="text-xs font-bold text-slate-300">12.6 km</p>
          </div>
        </CyberCard>

        <CyberCard className="h-28 flex flex-col justify-center gap-2 p-4">
           <div className="flex justify-between items-center px-1">
             <span className="text-[10px] text-slate-400">总体完成率</span>
             <span className="text-[10px] font-bold text-cyan-400">75%</span>
           </div>
           <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div initial={{ width: 0 }} animate={{ width: '75%' }} transition={{ duration: 1.5 }} className="h-full bg-gradient-to-r from-blue-500 to-cyan-400" />
           </div>
           <p className="text-[9px] text-slate-500 text-center tracking-tighter">完成 96 / 计划 128 点位</p>
        </CyberCard>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-4 flex-1">
        {/* Left: 3D Layout */}
        <CyberCard title="机器狗巡检总览 (厂房六层)" className="col-span-6 min-h-[500px] flex flex-col relative overflow-hidden">
           <div className="flex-1 relative bg-[#020617] rounded-lg border border-cyan-500/10 overflow-hidden shadow-inner">
              {/* Technical Decorative Background */}
              <div className="absolute inset-0 opacity-20" 
                   style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #0ea5e9 0%, transparent 70%)' }} />
              <div className="absolute inset-0 cyber-grid opacity-5" />
              
              {/* Left Floor Labels - Based on screenshot style */}
              <div className="absolute left-6 top-10 bottom-10 flex flex-col justify-between z-30 py-2">
                 {[6, 5, 4, 3, 2, 1].map((floor) => {
                   const labels: Record<number, string> = {
                     1: '水泵房', 2: '油压装置', 3: '机组层', 4: '中控通道', 5: '电缆夹层', 6: '配电室'
                   };
                   return (
                     <div key={floor} className="flex items-center gap-3 group cursor-pointer">
                       <div className="flex items-center gap-0">
                          <div className="w-10 h-7 bg-blue-600 rounded-l flex items-center justify-center border border-blue-400/50 shadow-[0_0_10px_rgba(37,99,235,0.4)]">
                             <span className="text-white text-xs font-bold font-mono">{floor}F</span>
                          </div>
                          <div className="px-3 h-7 bg-blue-900/40 backdrop-blur-md border border-l-0 border-blue-400/30 flex items-center rounded-r transition-all group-hover:bg-blue-600/30 min-w-[70px]">
                             <span className="text-slate-200 text-[10px] font-bold tracking-wider">{labels[floor]}</span>
                          </div>
                       </div>
                     </div>
                   );
                 })}
              </div>

              {/* 3D Visualizer Container - Improved Isometric Stack */}
              <div className="absolute inset-0 left-32 flex flex-col items-center justify-center -space-y-16 [perspective:1200px]">
                 {[6,5,4,3,2,1].map((floor) => (
                    <motion.div 
                      key={floor}
                      initial={{ rotateX: 60, y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: (6 - floor) * 0.1, duration: 0.8 }}
                      className="w-[85%] h-40 bg-cyan-500/5 border border-cyan-500/20 rounded-[4px] relative transition-all hover:bg-cyan-500/15 hover:border-cyan-400/60 cursor-pointer group/floor"
                      style={{ 
                        transformStyle: 'preserve-3d',
                        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(34, 211, 238, 0.05)'
                      }}
                    >
                       {/* Glassy Floor Surface */}
                       <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-black/20 rounded-[4px]" />
                       
                       {/* Subtle Grid on Floor */}
                       <div className="absolute inset-0 opacity-[0.03]" 
                            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                       {/* Larger Floor Indicator Background */}
                       <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                          <span className="text-cyan-400/5 font-display font-bold text-[140px] italic select-none">{floor}F</span>
                       </div>
                       
                       {/* Robot Pins with Labels exactly like screenshot */}
                       <div className="absolute inset-0">
                          {floor === 6 && (
                            <div className="absolute top-1/4 left-1/2 flex flex-col items-center">
                               <RobotMarker id="R-01" color="green" />
                               {/* Route Dotted Lines - Decorative */}
                               <div className="absolute -z-10 w-32 h-20 border-b-2 border-r-2 border-dashed border-cyan-400/30 -rotate-12 translate-x-4 translate-y-4" />
                            </div>
                          )}
                          {floor === 5 && (
                            <div className="absolute top-1/2 right-1/4 flex flex-col items-center">
                               <RobotMarker id="R-02" color="green" />
                               <div className="absolute -z-10 w-24 h-16 border-t-2 border-l-2 border-dashed border-cyan-400/30 rotate-45 -translate-x-8 translate-y-2" />
                            </div>
                          )}
                          {floor === 4 && (
                            <div className="absolute top-1/3 left-1/3 flex flex-col items-center">
                               <RobotMarker id="R-03" color="green" />
                            </div>
                          )}
                          {floor === 3 && (
                            <div className="absolute bottom-1/4 left-1/2 flex flex-col items-center">
                               <RobotMarker id="R-04" color="orange" isActive />
                            </div>
                          )}
                          {floor === 2 && (
                            <div className="absolute top-2/3 right-1/3 flex flex-col items-center">
                               <RobotMarker id="R-05" color="green" />
                            </div>
                          )}
                          {floor === 1 && (
                            <div className="absolute bottom-4 right-1/4 flex flex-col items-center">
                               <RobotMarker id="R-06" color="orange" />
                               <div className="absolute -z-10 w-40 h-10 border-b-2 border-dashed border-cyan-400/30 translate-x-[-20px] translate-y-4" />
                            </div>
                          )}
                       </div>
                    </motion.div>
                 ))}
              </div>

              {/* Legend - Following screenshot exactly */}
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-center gap-10 bg-black/40 backdrop-blur-md p-3 px-6 rounded-full border border-white/5 shadow-lg z-40">
                 <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00f3ff] shadow-[0_0_8px_#00f3ff]" />
                    <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">巡检路线</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e] shadow-[0_0_8px_#22c55e]" />
                    <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">在线巡检</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] shadow-[0_0_8px_#f59e0b]" />
                    <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">待命巡检</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-4 h-3 border-2 border-cyan-500 rounded-sm relative overflow-hidden">
                       <div className="absolute inset-0 bg-cyan-500/20" />
                    </div>
                    <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">充电位置</span>
                 </div>
              </div>
           </div>
        </CyberCard>

        {/* Right Top Column: Video & Thermal */}
        <div className="col-span-6 grid grid-rows-2 gap-4">
           <CyberCard title="实时视频 (R-01 · 6F 配电室)" tag="超清 LIVE" className="flex flex-col h-full bg-black relative">
              <div className="flex-1 relative rounded overflow-hidden group">
                 <img 
                   src="https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=1200" 
                   alt="Substation Live"
                   className="absolute inset-0 w-full h-full object-cover brightness-75"
                   referrerPolicy="no-referrer"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                 <div className="absolute top-2 right-2 flex items-center gap-2">
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-red-600 rounded text-[9px] font-bold text-white shadow-lg"><div className="w-1 h-1 rounded-full bg-white animate-pulse" /> REC</span>
                    <span className="px-2 py-0.5 bg-cyan-600/60 rounded text-[9px] font-bold text-white select-none border border-cyan-400/30">4K ULTRA HD</span>
                 </div>
                 
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-cyan-500/20 backdrop-blur-xl flex items-center justify-center text-cyan-400 cursor-pointer border border-cyan-400/30 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                       <Play className="fill-cyan-400 w-8 h-8 translate-x-1" />
                    </div>
                 </div>

                 <div className="absolute bottom-2 right-2 flex items-center gap-2">
                    <button className="p-1.5 bg-black/40 hover:bg-black/80 rounded text-slate-300 transition-colors"><Camera className="w-4 h-4" /></button>
                    <button className="p-1.5 bg-black/40 hover:bg-black/80 rounded text-slate-300 transition-colors"><Maximize2 className="w-4 h-4" /></button>
                 </div>
              </div>
           </CyberCard>
           
           <div className="grid grid-cols-2 gap-4">
              <CyberCard title="红外热成像 (异常点)" className="bg-black/20">
                 <div className="w-full aspect-video bg-gradient-to-br from-indigo-900 via-purple-700 to-red-500 rounded relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-dashed border-white/40 rounded-full animate-pulse" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                       <div className="p-1 bg-black/60 border border-red-500 rounded-sm text-[10px] text-red-500 font-bold">+ 58.6℃</div>
                    </div>
                 </div>
                 <div className="mt-2 space-y-1">
                   <p className="text-[10px] text-slate-300 flex justify-between"><span>位置: 6F 配电柜-2#断路器</span></p>
                   <p className="text-[10px] text-slate-500 flex justify-between"><span>时间: 10:29:58</span></p>
                 </div>
              </CyberCard>

              <CyberCard title="机器人队列状态">
                 <div className="space-y-1.5 h-full overflow-y-auto pr-2 scrollbar-hide">
                    {robotQueue.map((r, i) => (
                       <div key={i} className="flex items-center justify-between p-1.5 bg-white/5 rounded hover:bg-white/10 transition-colors cursor-pointer group">
                          <div className="flex items-center gap-2">
                             <span className="text-[10px] font-bold text-cyan-400 font-display">{r.id}</span>
                             <div className="flex flex-col">
                                <span className="text-[9px] text-slate-300 font-medium truncate max-w-[60px]">{r.floor}</span>
                             </div>
                          </div>
                          <div className="flex items-center gap-3">
                             <div className="flex flex-col items-end">
                                <span className={cn(
                                  "text-[8px] font-bold",
                                  parseInt(r.battery) > 50 ? "text-green-400" : "text-amber-400"
                                )}>{r.battery}</span>
                                <div className="flex gap-0.5">
                                   {[1,2,3,4,5].map(v => <div key={v} className={cn("w-0.5 h-1.5 rounded-full", v <= r.signal ? "bg-cyan-400" : "bg-slate-700")} />)}
                                </div>
                             </div>
                             <ChevronRight className="w-3 h-3 text-slate-700 group-hover:text-cyan-500 transition-colors" />
                          </div>
                       </div>
                    ))}
                 </div>
              </CyberCard>
           </div>
        </div>

        {/* Bottom Area */}
        <CyberCard title="巡检任务与点位" className="col-span-7" headerAction={
          <div className="flex items-center gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            <span>计划点位 <span className="text-white">128</span> 个</span>
            <span>已巡检 <span className="text-white">96</span> 个</span>
            <span>完成率 <span className="text-cyan-400">75%</span></span>
          </div>
        }>
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-b border-white/5 text-[10px] text-slate-500 uppercase font-bold">
                       <th className="py-2 pl-2">楼层</th>
                       <th className="py-2">巡检点位</th>
                       <th className="py-2">点位类型</th>
                       <th className="py-2">计划频次</th>
                       <th className="py-2">今日状态</th>
                       <th className="py-2 text-right pr-2">异常数量</th>
                    </tr>
                 </thead>
                 <tbody className="text-[10px] text-slate-300">
                    {taskPoints.map((row, idx) => (
                       <tr key={idx} className="border-b border-white/5 transition-colors hover:bg-white/5 group">
                          <td className="py-2.5 pl-2 font-medium">{row.floor}</td>
                          <td className="py-2.5 font-medium">{row.points}</td>
                          <td className="py-2.5">
                             <span className={cn(
                               "px-1.5 py-0.5 rounded border text-[8px]",
                               row.type === '设备点位' ? "bg-blue-500/10 border-blue-500/20 text-blue-400" : "bg-purple-500/10 border-purple-500/20 text-purple-400"
                             )}>{row.type}</span>
                          </td>
                          <td className="py-2.5">{row.freq}</td>
                          <td className="py-2.5">
                             <span className={cn(
                               "flex items-center gap-1 font-bold",
                               row.status === '已完成' ? "text-green-400" : "text-amber-400"
                             )}>
                               <div className={cn("w-1 h-1 rounded-full", row.status === '已完成' ? "bg-green-400" : "bg-amber-400 animate-pulse")} />
                               {row.status}
                             </span>
                          </td>
                          <td className="py-2.5 text-right pr-2">
                             <span className={cn(
                               "font-bold",
                               row.anomalies > 0 ? "text-red-500" : "text-slate-500 text-opacity-50"
                             )}>{row.anomalies}</span>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </CyberCard>

        <CyberCard title="机器人巡检电量趋势 (今日)" className="col-span-5 h-[280px]">
           <div className="w-full h-[180px] pb-4">
              <ResponsiveContainer width="99%" height="100%">
                 <LineChart data={batteryData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: 'rgba(148, 163, 184, 0.5)', fontSize: 10 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(148, 163, 184, 0.5)', fontSize: 10 }} domain={[0, 100]} />
                    <Tooltip 
                       contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '8px' }}
                       itemStyle={{ fontSize: '10px' }}
                    />
                    <Line type="monotone" dataKey="r1" name="R-01" stroke="#0ea5e9" strokeWidth={1.5} dot={false} />
                    <Line type="monotone" dataKey="r2" name="R-02" stroke="#22d3ee" strokeWidth={1.5} dot={false} />
                    <Line type="monotone" dataKey="r6" name="R-06" stroke="#f43f5e" strokeWidth={2} dot={{ r: 2 }} />
                 </LineChart>
              </ResponsiveContainer>
              <div className="mt-2 space-y-1">
                 <div className="flex items-center justify-between text-[10px] p-2 bg-red-600/10 border border-red-500/20 rounded">
                    <div className="flex items-center gap-2 text-red-500">
                       <Battery className="w-4 h-4 animate-pulse" />
                       <span className="font-bold">低电量预警</span>
                    </div>
                    <span className="text-red-400 font-bold">R-06 电量 46%</span>
                 </div>
              </div>
           </div>
        </CyberCard>
      </div>
    </div>
  );
};
