import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  Calendar, 
  ChevronRight, 
  MoreHorizontal,
  CheckCircle2,
  Clock,
  Send,
  Eye,
  Thermometer,
  ShieldAlert,
  ArrowUpRight,
  User,
  X
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell 
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { CyberCard } from '../components/CyberCard';
import { cn } from '../utils';

const alarmStats = [
  { label: '总报警数', val: 128, diff: '+18', color: 'text-white', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  { label: '高风险', val: 7, diff: '+2', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30' },
  { label: '中风险', val: 32, diff: '+5', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  { label: '已处理', val: 89, diff: '+11', color: 'text-cyan-500', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
  { label: '待派单', val: 21, diff: '+3', color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/30' },
];

const alarmList = [
  { id: 'AL250520-001', type: '渗漏疑似', source: '渗漏相机', loc: '大坝-右岸廊道', conf: '92%', risk: '高风险', status: '待派单', owner: '--', time: '10:24' },
  { id: 'AL250520-002', type: '温度异常', source: '温度传感器', loc: '3#机组轴承座', conf: '88%', risk: '高风险', status: '处理中', owner: '张伟', time: '10:17' },
  { id: 'AL250520-003', type: '仪表读数异常', source: '监控系统', loc: '2#压力表', conf: '85%', risk: '中风险', status: '待派单', owner: '--', time: '09:58' },
  { id: 'AL250520-004', type: '锈蚀识别', source: 'AI视觉识别', loc: '5#闸门支座', conf: '80%', risk: '中风险', status: '已处理', owner: '李强', time: '09:41' },
  { id: 'AL250520-005', type: '渗漏疑似', source: '渗漏相机', loc: '厂房尾水洞', conf: '77%', risk: '中风险', status: '处理中', owner: '王磊', time: '09:12' },
  { id: 'AL250520-006', type: '温度异常', source: '温度传感器', loc: '1#机组定子绕组', conf: '93%', risk: '高风险', status: '待派单', owner: '--', time: '08:51' },
  { id: 'AL250520-007', type: '仪表读数异常', source: '监控系统', loc: '4#尾水位计', conf: '70%', risk: '中风险', status: '已派单', owner: '陈工', time: '08:32' },
  { id: 'AL250520-008', type: '锈蚀识别', source: 'AI视觉识别', loc: '6#拦污栅框体', conf: '65%', risk: '低风险', status: '已处理', owner: '赵明', time: '07:56' },
];

const trendData = [
  { name: '05-14', total: 15, high: 2, medium: 8, low: 5 },
  { name: '05-15', total: 18, high: 3, medium: 10, low: 5 },
  { name: '05-16', total: 12, high: 1, medium: 7, low: 4 },
  { name: '05-17', total: 22, high: 5, medium: 12, low: 5 },
  { name: '05-18', total: 16, high: 2, medium: 9, low: 5 },
  { name: '05-19', total: 25, high: 6, medium: 14, low: 5 },
  { name: '05-20', total: 28, high: 7, medium: 16, low: 5 },
];

const alarmTypeDistribution = [
  { name: '渗漏疑似', value: 42, color: '#0ea5e9' },
  { name: '温度异常', value: 28, color: '#f43f5e' },
  { name: '仪表读数异常', value: 27, color: '#fbbf24' },
  { name: '锈蚀识别', value: 19, color: '#22d3ee' },
  { name: '其他', value: 12, color: '#64748b' },
];

export const Alarms = () => {
  const [selectedAlarm, setSelectedAlarm] = useState(alarmList[0]);

  return (
    <div className="space-y-4 pb-10">
      {/* Top Stats */}
      <div className="grid grid-cols-5 gap-4">
        {alarmStats.map((stat, i) => (
          <CyberCard key={i} className={cn("h-28 flex flex-col justify-center p-5 group", stat.bg, stat.border)}>
             <div className="flex justify-between items-start">
               <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{stat.label}</p>
               <span className={cn("text-[9px] flex items-center gap-0.5", stat.diff.startsWith('+') ? 'text-red-400' : 'text-green-400')}>
                 较昨日 {stat.diff} {stat.diff.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <div className="w-3 h-3 border-b border-r rotate-45" />}
               </span>
             </div>
             <p className={cn("text-3xl font-display font-bold mt-2", stat.color)}>{stat.val} <span className="text-xs font-normal text-slate-500">项</span></p>
          </CyberCard>
        ))}
      </div>

      {/* Filter Bar */}
      <CyberCard className="py-3 px-6 flex items-center justify-between">
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
               <span className="text-[10px] text-slate-500 font-bold uppercase">类型</span>
               <select className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs focus:outline-none focus:border-cyan-500/50">
                  <option>全部</option>
                  <option>渗漏疑似</option>
                  <option>温度异常</option>
               </select>
            </div>
            <div className="flex items-center gap-3">
               <span className="text-[10px] text-slate-500 font-bold uppercase">等级</span>
               <select className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs focus:outline-none focus:border-cyan-500/50">
                  <option>全部</option>
                  <option>高风险</option>
                  <option>中风险</option>
               </select>
            </div>
            <div className="flex items-center gap-3">
               <span className="text-[10px] text-slate-500 font-bold uppercase">状态</span>
               <select className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs focus:outline-none focus:border-cyan-500/50">
                  <option>全部</option>
                  <option>待处理</option>
                  <option>处理中</option>
               </select>
            </div>
            <div className="flex items-center gap-3 border-l border-white/10 pl-6">
               <Calendar className="w-4 h-4 text-slate-500" />
               <span className="text-xs text-slate-300">2025-05-13 ~ 2025-05-20</span>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
               <input type="text" placeholder="关键字搜索..." className="bg-white/5 border border-white/10 rounded py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:border-cyan-500/50 w-48" />
            </div>
            <button className="bg-white/5 border border-white/10 hover:bg-white/10 px-3 py-1.5 rounded text-xs text-slate-400 transition-colors">重置</button>
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-1.5 rounded text-xs transition-colors shadow-lg shadow-cyan-500/20">查询</button>
         </div>
      </CyberCard>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-4">
        {/* Left: Alarm List */}
        <CyberCard title="缺陷与报警中心" className="col-span-8 overflow-hidden flex flex-col">
           <div className="flex-1 overflow-x-auto scrollbar-hide">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-b border-white/5 text-[10px] text-slate-500 uppercase font-bold bg-white/2">
                       <th className="py-3 px-4"><div className="w-4 h-4 border border-white/20 rounded" /></th>
                       <th className="py-3">编号</th>
                       <th className="py-3">异常类型</th>
                       <th className="py-3">来源</th>
                       <th className="py-3">位置</th>
                       <th className="py-3">等级</th>
                       <th className="py-3">状态</th>
                       <th className="py-3 pr-4">发现时间</th>
                    </tr>
                 </thead>
                 <tbody className="text-[11px] text-slate-300">
                    {alarmList.map((alarm, idx) => (
                       <tr 
                         key={idx} 
                         onClick={() => setSelectedAlarm(alarm)}
                         className={cn(
                           "border-b border-white/5 transition-all cursor-pointer",
                           selectedAlarm.id === alarm.id ? "bg-cyan-500/10 border-l-2 border-l-cyan-500" : "hover:bg-white/5"
                         )}
                       >
                          <td className="py-3 px-4"><div className="w-4 h-4 border border-white/20 rounded" /></td>
                          <td className="py-3 font-mono text-slate-500">{alarm.id}</td>
                          <td className="py-3 font-bold">{alarm.type}</td>
                          <td className="py-3 text-slate-400">{alarm.source}</td>
                          <td className="py-3 text-slate-400 max-w-[120px] truncate">{alarm.loc}</td>
                          <td className="py-3">
                             <div className="flex items-center gap-1.5">
                                <div className={cn("w-1.5 h-1.5 rounded-full", alarm.risk === '高风险' ? 'bg-red-500' : alarm.risk === '中风险' ? 'bg-amber-500' : 'bg-blue-500')} />
                                <span className={cn(alarm.risk === '高风险' ? 'text-red-400' : alarm.risk === '中风险' ? 'text-amber-400' : 'text-blue-400')}>{alarm.risk}</span>
                             </div>
                          </td>
                          <td className="py-3">
                             <span className={cn(
                               "px-2 py-0.5 rounded-full border text-[9px] font-bold",
                               alarm.status === '待派单' ? "bg-slate-500/10 border-slate-500/20 text-slate-400" : 
                               alarm.status === '处理中' ? "bg-amber-500/10 border-amber-500/20 text-amber-500" :
                               alarm.status === '已处理' ? "bg-green-500/10 border-green-500/20 text-green-500" : "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
                             )}>{alarm.status}</span>
                          </td>
                          <td className="py-3 font-mono text-slate-500 pr-4">{`2025-05-20 ${alarm.time}`}</td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           <div className="p-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] text-slate-500">共 128 条记录</span>
              <div className="flex items-center gap-2">
                 {[1,2,3,4,5].map(p => (
                   <button key={p} className={cn(
                     "w-6 h-6 rounded flex items-center justify-center text-[10px] border transition-all",
                     p === 1 ? "bg-cyan-500 border-cyan-500 text-white" : "border-white/10 hover:bg-white/5 text-slate-500"
                   )}>{p}</button>
                 ))}
                 <span className="text-slate-700 mx-1">...</span>
                 <button className="w-10 h-6 rounded border border-white/10 hover:bg-white/5 text-slate-500 text-[10px]">13</button>
              </div>
           </div>
        </CyberCard>

        {/* Right Detail Pane */}
        <div className="col-span-4 flex flex-col gap-4">
           <CyberCard title={`告警详情 | ${selectedAlarm.id}`} className="border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.05)]">
              <div className="space-y-4">
                 <div>
                    <h4 className="text-[10px] text-slate-500 uppercase font-bold mb-3 flex items-center gap-2">
                       <Eye className="w-3.5 h-3.5 text-cyan-400" />
                       异常快照
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                       <div className="aspect-video bg-slate-900 rounded border border-white/10 overflow-hidden relative group">
                          <img src="https://images.unsplash.com/photo-1541844053589-3462d48a74e5?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-500" alt="Snapshot 1" />
                          <div className="absolute inset-0 border-[0.5px] border-cyan-400/30 pointer-events-none" />
                          <div className="absolute bottom-1 right-1 text-[8px] bg-black/60 px-1 text-white">2025-05-20 10:24:11</div>
                       </div>
                       <div className="aspect-video bg-gradient-to-br from-indigo-950 to-red-950 rounded border border-white/10 overflow-hidden relative">
                          <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                          <div className="absolute inset-0 flex items-center justify-center">
                             <ShieldAlert className="w-8 h-8 text-red-500 opacity-30 animate-pulse" />
                          </div>
                          <div className="absolute top-1 right-1 text-[8px] bg-black/60 px-1 text-red-400 border border-red-500/20">92% CONF</div>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-4 text-[11px]">
                    <div className="grid grid-cols-2 gap-y-3">
                       <div><p className="text-slate-500 mb-0.5 uppercase tracking-tighter text-[9px]">异常类型</p><p className="font-bold text-slate-200">{selectedAlarm.type}</p></div>
                       <div><p className="text-slate-500 mb-0.5 uppercase tracking-tighter text-[9px]">等级</p><p className={cn("font-bold", selectedAlarm.risk === '高风险' ? 'text-red-500' : 'text-amber-500')}>{selectedAlarm.risk}</p></div>
                       <div><p className="text-slate-500 mb-0.5 uppercase tracking-tighter text-[9px]">来源</p><p className="font-bold text-slate-200">{selectedAlarm.source}</p></div>
                       <div><p className="text-slate-500 mb-0.5 uppercase tracking-tighter text-[9px]">位置</p><p className="font-bold text-slate-200 break-words">{selectedAlarm.loc}</p></div>
                    </div>

                    <div className="bg-white/5 border border-white/5 p-3 rounded">
                       <p className="text-[9px] text-slate-500 uppercase mb-1.5 font-bold">异常描述</p>
                       <p className="text-slate-400 leading-relaxed italic">
                         右岸廊道渗漏量较昨日增大15%，水流沿廊道壁面流淌，局部伴有白色析出物。系统识别置信度92%，建议立即核查。
                       </p>
                    </div>

                    <div>
                       <p className="text-[9px] text-cyan-400 uppercase mb-2 font-bold flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3" />
                          推荐处置
                       </p>
                       <p className="text-slate-300 text-[10px] bg-cyan-500/5 border border-cyan-500/10 p-2 rounded">
                         建议派发给维护组王工，评估渗漏量，必要时封堵或导排处理。
                       </p>
                    </div>
                 </div>

                 <div className="pt-4 border-t border-white/5 flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-white/5 hover:bg-white/10 rounded transition-all text-xs font-bold text-slate-400">
                       <Eye className="w-3.5 h-3.5" /> 忽略记录
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded transition-all text-xs font-bold shadow-lg shadow-cyan-500/20">
                       <Send className="w-3.5 h-3.5" /> 派发工单
                    </button>
                 </div>

                 <div>
                    <h4 className="text-[10px] text-slate-500 uppercase font-bold mb-4 flex items-center gap-2">
                       <Clock className="w-3.5 h-3.5" />
                       工单流转
                    </h4>
                    <div className="flex justify-between relative px-2">
                       <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10 -translate-y-1/2 z-0" />
                       {[
                         { label: '待派单', time: '10:24', active: true },
                         { label: '已派单', time: '--', active: false },
                         { label: '处理中', time: '--', active: false },
                         { label: '已关闭', time: '--', active: false },
                       ].map((step, i) => (
                          <div key={i} className="flex flex-col items-center gap-1 relative z-10">
                             <div className={cn(
                               "w-4 h-4 rounded-full border-2",
                               step.active ? "bg-cyan-500 border-white/20 shadow-[0_0_8px_#0ea5e9]" : "bg-cyber-dark border-white/10"
                             )} />
                             <span className={cn("text-[8px] font-bold", step.active ? "text-cyan-400" : "text-slate-600")}>{step.label}</span>
                             <span className="text-[7px] text-slate-700">{step.time}</span>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           </CyberCard>
        </div>
      </div>

      {/* Bottom Area: Statistics */}
      <div className="grid grid-cols-2 gap-4 h-[300px]">
         <CyberCard title="报警趋势 (近7天)" headerAction={
           <div className="flex gap-4">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-cyan-500" /><span className="text-[9px] text-slate-500">总报数</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500" /><span className="text-[9px] text-slate-500">高风险</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500" /><span className="text-[9px] text-slate-500">中风险</span></div>
           </div>
         }>
            <div className="h-full w-full pb-4 pt-2">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                     <defs>
                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                           <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'rgba(148, 163, 184, 0.5)', fontSize: 10 }} />
                     <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(148, 163, 184, 0.5)', fontSize: 10 }} />
                     <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px', fontSize: '10px' }} />
                     <Area type="monotone" dataKey="total" name="总报数" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorTotal)" strokeWidth={2} />
                     <Area type="monotone" dataKey="high" name="高风险" stroke="#ef4444" fillOpacity={1} fill="url(#colorHigh)" strokeWidth={2} />
                     <Area type="monotone" dataKey="medium" name="中风险" stroke="#fbbf24" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </CyberCard>

         <CyberCard title="报警分布 (按类型)">
            <div className="h-full flex items-center pr-10">
               <div className="flex-1 h-full min-h-[200px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie 
                          data={alarmTypeDistribution} 
                          innerRadius={60} 
                          outerRadius={90} 
                          paddingAngle={3} 
                          dataKey="value"
                        >
                           {alarmTypeDistribution.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                           ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px', fontSize: '10px' }} />
                     </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                     <span className="text-[10px] text-slate-500 uppercase font-bold">报警总计</span>
                     <span className="text-3xl font-display font-bold text-white">128</span>
                  </div>
               </div>
               <div className="w-1/2 space-y-3">
                  {alarmTypeDistribution.map((item, i) => (
                    <div key={i} className="flex flex-col gap-1.5">
                       <div className="flex justify-between items-center text-[10px]">
                          <div className="flex items-center gap-2">
                             <div className="w-2.5 h-1 rounding-full" style={{ backgroundColor: item.color }} />
                             <span className="text-slate-400 font-bold">{item.name}</span>
                          </div>
                          <span className="text-slate-200 font-display font-bold">{item.value} <span className="text-slate-500 font-sans text-[8px] uppercase">项</span></span>
                       </div>
                       <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${item.value/128*100}%` }} className="h-full" style={{ backgroundColor: item.color }} />
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </CyberCard>
      </div>
    </div>
  );
};
