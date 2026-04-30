import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  FilePlus, 
  Search, 
  Filter, 
  Calendar, 
  FileJson, 
  FileBarChart, 
  Printer, 
  Share2,
  CheckCircle,
  Clock,
  ChevronRight,
  MoreVertical,
  X,
  Layout,
  ExternalLink,
  Table
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line 
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { CyberCard } from '../components/CyberCard';
import { cn } from '../utils';

const reportList = [
  { id: 'RG-250520-0001', name: '机器人巡检日报', type: '日报', date: '2025-05-20', status: '已生成', owner: '张三' },
  { id: 'RG-250519-0003', name: '厂房重点区域周报', type: '周报', date: '2025-05-19', status: '已生成', owner: '李四' },
  { id: 'RG-250501-0001', name: '5月水电站度运行报告', type: '月报', date: '2025-05-01', status: '生成中', owner: '系统' },
  { id: 'RG-250520-0002', name: '无人机大坝巡检报告', type: '专项报告', date: '2025-05-20', status: '已生成', owner: '张三' },
  { id: 'RG-250520-0003', name: 'AI异常识别汇总月报', type: '月报', date: '2025-05-20', status: '已生成', owner: '系统' },
  { id: 'RG-250519-0004', name: '缺陷处理专题汇报', type: '专项报告', date: '2025-05-19', status: '已审批', owner: '王五' },
  { id: 'RG-250518-0001', name: '设备健康评估月报', type: '月报', date: '2025-05-18', status: '已生成', owner: '系统' },
];

const statData = [
  { month: '1月', count: 42 },
  { month: '2月', count: 35 },
  { month: '3月', count: 58 },
  { month: '4月', count: 48 },
  { month: '5月', count: 65 },
  { month: '6月', count: 55 },
];

const closeTrendData = [
  { month: '1月', rate: 78 },
  { month: '2月', rate: 82 },
  { month: '3月', rate: 85 },
  { month: '4月', rate: 89 },
  { month: '5月', rate: 92 },
  { month: '6月', rate: 95 },
];

const downloadLogs = [
  { time: '2025-05-20 08:35:12', type: '导出报告', format: 'PDF', size: '2.48 MB', user: '张三' },
  { time: '2025-05-19 17:21:06', type: '导出报告', format: 'WORD', size: '1.93 MB', user: '李四' },
  { time: '2025-05-19 09:14:55', type: '下载附件', format: 'ZIP', size: '523.66 MB', user: '赵六' },
  { time: '2025-05-18 16:40:33', type: '导出报告', format: 'PDF', size: '2.31 MB', user: '张三' },
  { time: '2025-05-18 10:05:28', type: '导出报告', format: 'WORD', size: '1.88 MB', user: '周七' },
];

export const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(reportList[0]);

  return (
    <div className="space-y-4 pb-10 h-full">
      {/* Top Quick Actions */}
      <div className="grid grid-cols-6 gap-4">
        {[
          { icon: FilePlus, label: '生成报告', color: 'bg-blue-500 text-white' },
          { icon: FileBarChart, label: '导出PDF', color: 'bg-white/5 border border-white/10 text-slate-300' },
          { icon: Table, label: '导出Word', color: 'bg-white/5 border border-white/10 text-slate-300' },
          { icon: Download, label: '下载附件', color: 'bg-white/5 border border-white/10 text-slate-300' },
        ].map((action, i) => (
          <button key={i} className={cn(
            "h-14 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all shadow-lg active:scale-95",
            action.color
          )}>
            <action.icon className="w-4 h-4" />
            {action.label}
          </button>
        ))}
        <div className="col-span-2 flex items-center gap-3 px-4 bg-white/5 border border-white/10 rounded-lg">
           <Calendar className="w-4 h-4 text-slate-500" />
           <p className="text-xs text-slate-400">日期筛选:</p>
           <div className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20">2025-05-01 至 2025-05-20</div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-4 flex-1">
        {/* Left: Report List */}
        <CyberCard title="报告列表" className="col-span-3 flex flex-col h-[520px]">
           <div className="p-2 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input type="text" placeholder="搜索报告名称..." className="w-full bg-white/5 border border-white/10 rounded-full py-1.5 pl-9 pr-8 text-[10px] focus:outline-none focus:border-cyan-500/50" />
              <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500 cursor-pointer hover:text-cyan-400" />
           </div>
           
           <div className="flex-1 overflow-y-auto mt-2 space-y-1 pr-1 scrollbar-hide">
              {reportList.map((rep, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedReport(rep)}
                  className={cn(
                    "p-3 rounded-lg border transition-all cursor-pointer group flex flex-col gap-2 relative overflow-hidden",
                    selectedReport.id === rep.id ? "bg-cyan-500/10 border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.05)]" : "bg-white/2 border-white/5 hover:bg-white/5"
                  )}
                >
                   <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded shrink-0 flex items-center justify-center",
                        selectedReport.id === rep.id ? "bg-cyan-500 text-white" : "bg-slate-800 text-slate-500"
                      )}>
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                         <h5 className="text-[10px] font-bold text-slate-200 truncate group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{rep.name}</h5>
                         <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[8px] text-slate-500 font-mono italic">{rep.date}</span>
                            <span className="text-[8px] px-1 py-0.5 rounded-sm bg-white/5 text-slate-400 capitalize">{rep.type}</span>
                         </div>
                      </div>
                   </div>
                   <div className="flex items-center justify-between pl-11">
                      <span className={cn(
                        "text-[9px] font-bold",
                        rep.status === '已生成' ? 'text-green-500' : rep.status === '生成中' ? 'text-cyan-400 animate-pulse' : 'text-amber-500'
                      )}>{rep.status}</span>
                      <MoreVertical className="w-3 h-3 text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                   </div>
                   {selectedReport.id === rep.id && <motion.div layoutId="active-indicator" className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400" />}
                </div>
              ))}
           </div>
           <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-600">
              <span>共 36 条</span>
              <div className="flex gap-2">
                 {[1,2,3,4].map(p => <button key={p} className={cn("w-5 h-5 rounded border", p === 1 ? 'border-cyan-500 text-cyan-400' : 'border-white/5 text-slate-700')}>{p}</button>)}
                 <ChevronRight className="w-4 h-4" />
              </div>
           </div>
        </CyberCard>

        {/* Center: Preview */}
        <CyberCard className="col-span-6 flex flex-col h-[520px] bg-cyber-dark/40 overflow-hidden relative group">
           <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 bg-black/60 rounded-full border border-white/10 pointer-events-auto hover:bg-black transition-colors"><ChevronRight className="w-4 h-4 rotate-180" /></button>
              <button className="p-2 bg-black/60 rounded-full border border-white/10 pointer-events-auto hover:bg-black transition-colors"><ChevronRight className="w-4 h-4" /></button>
           </div>

           <div className="flex-1 p-8 overflow-y-auto scrollbar-hide bg-white/5 rounded-t-lg mx-4 mt-4 overflow-x-hidden border-x border-t border-white/5">
              <div className="max-w-xl mx-auto space-y-10">
                 {/* Report Header */}
                 <div className="flex items-start justify-between border-b-2 border-slate-800 pb-6 relative">
                    <div className="flex items-center gap-3">
                       <Layout className="w-10 h-10 text-cyan-500" />
                       <p className="text-xl font-bold text-white tracking-widest uppercase">某某水电站 <br/><span className="text-sm font-normal text-slate-500 tracking-normal capitalize">智能巡检平台报告</span></p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] text-slate-500 font-mono">报告编号: {selectedReport.id}</p>
                       <p className="text-[10px] text-slate-500 font-mono">版本: V1.0</p>
                    </div>
                 </div>

                 {/* Report Title */}
                 <div className="text-center py-6">
                    <h1 className="text-3xl font-display font-bold text-white tracking-[0.2em]">{selectedReport.name}</h1>
                    <p className="text-slate-500 mt-2 font-mono italic">2025-05-20</p>
                 </div>

                 {/* Summary Section */}
                 <div className="space-y-4">
                    <div className="flex items-center gap-2 border-l-4 border-cyan-500 pl-3">
                       <h3 className="text-slate-200 font-bold text-sm tracking-widest uppercase">报告摘要</h3>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed indent-8">
                       本报告基于机器人与无人机巡检实时数据，覆盖了大坝、厂房、引水系统、开关站等关键区域。
                       今日巡检任务已全部完成，设备整体运行正常，但在3F机组层和6F配电室发现2项由于温升引起的异常及1处疑似渗漏，均已闭环或处理中。
                    </p>
                 </div>

                 {/* KPI Boxes */}
                 <div className="grid grid-cols-4 gap-4">
                    {[
                      { label: '巡检任务数', val: '28', unit: '项' },
                      { label: '巡检点位数', val: '126', unit: '个' },
                      { label: '巡检里程', val: '8.6', unit: 'km' },
                      { label: '异常发现数', val: '7', unit: '项' },
                    ].map((kpi, i) => (
                       <div key={i} className="flex flex-col items-center justify-center p-3 rounded-lg bg-cyber-dark/40 border border-white/5 relative group hover:border-cyan-500/30 transition-all">
                          <span className="text-[9px] text-slate-500 uppercase tracking-tighter mb-1 select-none">{kpi.label}</span>
                          <p className="text-stone-200 font-bold font-display text-lg tracking-tight">{kpi.val}<span className="text-[10px] font-normal ml-0.5 text-slate-500">{kpi.unit}</span></p>
                       </div>
                    ))}
                 </div>

                 {/* Coverage */}
                 <div className="space-y-4">
                    <div className="flex items-center gap-2 border-l-4 border-cyan-500 pl-3">
                       <h3 className="text-slate-200 font-bold text-sm tracking-widest uppercase">巡检区域覆盖情况</h3>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                       {[
                         { img: 'https://images.unsplash.com/photo-1541844053589-3462d48a74e5?auto=format&fit=crop&q=80&w=200', label: '大坝坝体', p: '100%', d: '32/32 点位' },
                         { img: 'https://images.unsplash.com/photo-1558231221-f92500c5cff1?auto=format&fit=crop&q=80&w=200', label: '厂房设备区', p: '93%', d: '28/30 点位' },
                         { img: 'https://plus.unsplash.com/premium_photo-1678116345864-4e2a8742fb6e?auto=format&fit=crop&q=80&w=200', label: '引水系统', p: '93%', d: '26/28 点位' },
                         { img: 'https://images.unsplash.com/photo-1504384308090-c89bfaad3830?auto=format&fit=crop&q=80&w=200', label: '开关站', p: '100%', d: '20/20 点位' },
                         { img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=200', label: '库区边坡', p: '75%', d: '12/16 点位' },
                       ].map((area, i) => (
                          <div key={i} className="flex flex-col gap-1.5 p-1 bg-white/5 rounded-lg border border-white/5 group-hover:border-white/10 transition-all">
                             <div className="aspect-video bg-slate-800 rounded-md overflow-hidden relative grayscale opacity-70 group-hover/area:grayscale-0 group-hover/area:opacity-100 transition-all duration-300">
                                <img src={area.img} className="w-full h-full object-cover" alt={area.label} />
                             </div>
                             <div className="px-1 py-0.5">
                                <p className="text-[10px] font-bold text-slate-300 truncate">{area.label}</p>
                                <p className="text-[8px] text-slate-600 truncate mt-0.5">{area.d}</p>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
           
           <div className="h-10 bg-black/40 backdrop-blur-md flex items-center justify-between px-6 border-t border-white/5 relative z-20">
              <div className="flex items-center gap-4">
                 <button className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-cyan-400"><Printer className="w-3.5 h-3.5" /> 打印</button>
                 <button className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-cyan-400"><Share2 className="w-3.5 h-3.5" /> 分享</button>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                   <div className="w-full h-full bg-cyan-500" />
                 </div>
                 <span className="text-[10px] font-mono text-slate-600">PAGE 1 / 18</span>
              </div>
              <button className="flex items-center gap-1 text-[10px] text-cyan-400 hover:underline uppercase font-bold"><ExternalLink className="w-3.5 h-3.5" /> 全屏查看</button>
           </div>
        </CyberCard>

        {/* Right Detail Stats */}
        <div className="col-span-3 flex flex-col gap-4">
           <CyberCard title="报告信息">
              <div className="space-y-4 pt-2">
                 <div className="grid grid-cols-2 gap-y-3 text-[10px]">
                    <div className="flex flex-col gap-0.5"><span className="text-slate-500 font-bold uppercase tracking-tighter">报告名称</span><span className="text-slate-200 font-bold">{selectedReport.name}</span></div>
                    <div className="flex flex-col gap-0.5"><span className="text-slate-500 font-bold uppercase tracking-tighter">报告类型</span><span className="text-slate-200">{selectedReport.type}</span></div>
                    <div className="flex flex-col gap-0.5"><span className="text-slate-500 font-bold uppercase tracking-tighter">生成时间</span><span className="text-slate-200">2025-05-20 08:30:12</span></div>
                    <div className="flex flex-col gap-0.5"><span className="text-slate-500 font-bold uppercase tracking-tighter">生成人员</span><span className="text-slate-200">系统自动生成</span></div>
                    <div className="flex flex-col gap-0.5"><span className="text-slate-500 font-bold uppercase tracking-tighter">负责人</span><span className="text-slate-200">张三</span></div>
                    <div className="flex flex-col gap-0.5"><span className="text-slate-500 font-bold uppercase tracking-tighter">数据范围</span><span className="text-slate-200 leading-tight">2025-05-20 00:00:00 ~ 23:59:59</span></div>
                 </div>
              </div>
           </CyberCard>

           <CyberCard title="审批流程">
              <div className="space-y-6 pt-2">
                 {[
                   { label: '已提交', sub: '提交人: 系统自动生成', time: '2025-05-20 08:30', active: true, done: true },
                   { label: '已审核', sub: '审核人: 李四 (运行值班长)', time: '2025-05-20 08:55', active: true, done: true },
                   { label: '待审批', sub: '审批人: 王五 (部门负责人)', time: '--', active: true, done: false },
                   { label: '未归档', sub: '预计归档后保留 5 年', time: '--', active: false, done: false },
                 ].map((step, i) => (
                    <div key={i} className="flex gap-4 group/step">
                       <div className="flex flex-col items-center">
                          <div className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center relative z-10 border transition-all",
                            step.done ? "bg-green-500 border-green-400 text-white shadow-[0_0_10px_#22c55e]" : 
                            step.active ? "bg-amber-500 border-amber-400 text-white animate-pulse" : "bg-slate-800 border-slate-700 text-slate-600"
                          )}>
                             {step.done ? <CheckCircle className="w-4 h-4" /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                          </div>
                          {i < 3 && <div className={cn("w-0.5 flex-1 border-l-2 my-1 transition-colors", step.done ? 'border-green-500/50' : 'border-slate-800')} />}
                       </div>
                       <div className="flex-1 pb-4">
                          <h6 className={cn("text-[10px] font-bold uppercase tracking-widest", step.done ? 'text-green-400' : step.active ? 'text-amber-400' : 'text-slate-600')}>{step.label}</h6>
                          <p className="text-[9px] text-slate-500 mt-0.5">{step.sub}</p>
                          <p className="text-[8px] text-slate-700 mt-1 font-mono">{step.time}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </CyberCard>
        </div>
      </div>

      {/* Bottom Area: Analytics Table */}
      <div className="grid grid-cols-12 gap-4 h-[300px]">
         <CyberCard title="报告生成统计 (按月)" className="col-span-3">
            <div className="h-full w-full pb-4 pt-2">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                       <linearGradient id="barColor" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0ea5e9" stopOpacity={1} />
                          <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.4} />
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'rgba(148, 163, 184, 0.5)', fontSize: 10 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(148, 163, 184, 0.5)', fontSize: 10 }} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid #1e293b', borderRadius: '8px', fontSize: '10px' }} />
                    <Bar dataKey="count" name="生成数量" fill="url(#barColor)" radius={[4, 4, 0, 0]} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </CyberCard>

         <CyberCard title="异常问题闭环率趋势" className="col-span-4" headerAction={<p className="text-[10px] text-slate-600">单位: %</p>}>
            <div className="h-full w-full pb-4 pt-4">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={closeTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                     <defs>
                        <linearGradient id="lineGlow" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.8} />
                           <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                     <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'rgba(148, 163, 184, 0.5)', fontSize: 10 }} />
                     <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(148, 163, 184, 0.5)', fontSize: 10 }} domain={[60, 100]} />
                     <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid #1e293b', borderRadius: '8px', fontSize: '10px' }} />
                     <Line type="monotone" dataKey="rate" name="闭环率" stroke="#22d3ee" strokeWidth={3} dot={{ r: 4, fill: '#22d3ee', strokeWidth: 2, stroke: '#020617' }} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </CyberCard>

         <CyberCard title="导出 / 下载记录" className="col-span-5 flex flex-col">
            <div className="flex-1 overflow-y-auto scrollbar-hide pr-1">
               <table className="w-full text-left">
                  <thead>
                     <tr className="text-[9px] text-slate-600 uppercase border-b border-white/5 pb-2">
                        <th className="font-bold py-2">时间</th>
                        <th className="font-bold py-2">操作类型</th>
                        <th className="font-bold py-2">格式</th>
                        <th className="font-bold py-2">文件大小</th>
                        <th className="font-bold py-2 text-right">操作人</th>
                     </tr>
                  </thead>
                  <tbody className="text-[9px] text-slate-400">
                     {downloadLogs.map((log, idx) => (
                       <tr key={idx} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                          <td className="py-2.5 font-mono">{log.time}</td>
                          <td className="py-2.5">{log.type}</td>
                          <td className="py-2.5">
                             <span className={cn(
                               "px-1.5 py-0.5 rounded-sm border text-[7px] font-bold shadow-sm",
                               log.format === 'PDF' ? 'bg-red-500/10 border-red-500/30 text-red-400' : 
                               log.format === 'WORD' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-slate-500/10 border-slate-500/30 text-slate-400'
                             )}>{log.format}</span>
                          </td>
                          <td className="py-2.5 italic text-slate-600">{log.size}</td>
                          <td className="py-2.5 text-right font-bold text-slate-300">{log.user}</td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </CyberCard>
      </div>
    </div>
  );
};
