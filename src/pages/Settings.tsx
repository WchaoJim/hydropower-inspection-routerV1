import React, { useState } from 'react';
import { 
  Users, 
  Cpu, 
  MapPin, 
  ClipboardList, 
  Brain, 
  ShieldAlert, 
  Bell, 
  Database,
  Plus,
  Upload,
  Download,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  MinusCircle,
  MoreVertical,
  Activity,
  HardDrive,
  CloudLightning,
  Workflow
} from 'lucide-react';
import { motion } from 'motion/react';
import { CyberCard } from '../components/CyberCard';
import { cn } from '../utils';

const configMenu = [
  { icon: Users, label: '用户与角色', sub: '用户管理与权限分配', id: 'users' },
  { icon: Cpu, label: '设备接入', sub: '设备注册与状态监控', id: 'devices' },
  { icon: MapPin, label: '巡检点位', sub: '地图点位与路径规划', id: 'points' },
  { icon: ClipboardList, label: '巡检模板', sub: '任务模板与调度策略', id: 'templates' },
  { icon: Brain, label: 'AI识别阈值', sub: '算法灵敏度与逻辑', id: 'ai' },
  { icon: ShieldAlert, label: '报警规则', sub: '触发条件与分级管理', id: 'alerts' },
  { icon: Bell, label: '通知方式', sub: '多渠道消息推送设置', id: 'notif' },
  { icon: Database, label: '数据备份', sub: '存储管理与灾难恢复', id: 'backup' },
];

const devices = [
  { name: '机器人-01', model: '机器狗', sn: 'RDOG-001', status: '在线', time: '10:30:12', version: 'v2.1.3' },
  { name: '机器人-02', model: '机器狗', sn: 'RDOG-002', status: '在线', time: '10:30:09', version: 'v2.1.3' },
  { name: '机器人-03', model: '机器狗', sn: 'RDOG-003', status: '在线', time: '10:30:10', version: 'v2.1.3' },
  { name: '机器人-04', model: '机器狗', sn: 'RDOG-004', status: '在线', time: '10:30:08', version: 'v2.1.3' },
  { name: '机器人-05', model: '机器狗', sn: 'RDOG-005', status: '在线', time: '10:30:07', version: 'v2.1.3' },
  { name: '机器人-06', model: '机器狗', sn: 'RDOG-006', status: '在线', time: '10:30:11', version: 'v2.1.3' },
  { name: '无人机-01', model: '无人机', sn: 'DRONE-001', status: '在线', time: '10:30:13', version: 'v3.2.0' },
  { name: '无人机-02', model: '无人机', sn: 'DRONE-002', status: '在线', time: '10:30:14', version: 'v3.2.0' },
];

const permissionMatrix = [
  { role: '管理员', sys: true, dev: true, task: true, report: true, alarm: true, data: true, maint: true },
  { role: '运维人员', sys: false, dev: true, task: true, report: true, alarm: true, data: true, maint: true },
  { role: '巡检员', sys: false, dev: false, task: false, report: true, alarm: true, data: false, maint: false },
  { role: '访客', sys: false, dev: false, task: false, report: false, alarm: false, data: false, maint: false },
];

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('devices');

  return (
    <div className="space-y-4 pb-10">
      {/* Top Menu Cards */}
      <div className="grid grid-cols-8 gap-4">
        {configMenu.map((item, i) => (
           <button 
             key={i} 
             onClick={() => setActiveTab(item.id)}
             className={cn(
               "h-24 p-3 rounded-lg border flex flex-col items-center justify-center gap-2 transition-all group active:scale-95",
               activeTab === item.id 
                 ? "bg-cyan-500/10 border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.1)]" 
                 : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20"
             )}
           >
              <item.icon className={cn(
                "w-6 h-6 transition-colors",
                activeTab === item.id ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-300"
              )} />
              <div className="text-center">
                 <p className={cn(
                   "text-[10px] font-bold uppercase tracking-tight",
                   activeTab === item.id ? "text-cyan-400" : "text-slate-400"
                 )}>{item.label}</p>
                 <p className="text-[8px] text-slate-600 mt-0.5 truncate max-w-[80px]">{item.sub}</p>
              </div>
           </button>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Left Side: System Config Form */}
        <div className="col-span-3 space-y-4">
           <CyberCard title="系统配置中心">
              <div className="flex flex-col gap-1 pr-4">
                 {[
                   '系统配置概览',
                   '巡检参数配置',
                   '告警规则配置',
                   '网络与安全',
                   '数据存储管理',
                   'API接口配置',
                   '系统日志审计',
                 ].map((nav, idx) => (
                    <button key={idx} className={cn(
                      "text-left px-4 py-2.5 rounded-lg text-xs transition-all border border-transparent",
                      idx === 0 ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400 font-bold" : "text-slate-500 hover:bg-white/5 hover:text-slate-300"
                    )}>
                      {nav}
                    </button>
                 ))}
              </div>
           </CyberCard>

           <CyberCard title="运行参数配置">
              <div className="space-y-4 pt-2">
                 <div className="space-y-1.5 px-1">
                    <div className="flex justify-between items-center text-[10px]">
                       <span className="text-slate-500 font-bold uppercase">巡检周期</span>
                       <select className="bg-white/5 border border-white/10 rounded px-2 py-0.5 text-[10px] focus:outline-none">
                          <option>每日</option>
                          <option>每周</option>
                       </select>
                    </div>
                    <div className="flex justify-between items-center text-[10px] mt-2">
                       <span className="text-slate-500 font-bold uppercase">默认路线</span>
                       <select className="bg-white/5 border border-white/10 rounded px-2 py-0.5 text-[10px] focus:outline-none w-32">
                          <option>大坝周边巡检-01</option>
                          <option>厂房深度巡检-02</option>
                       </select>
                    </div>
                 </div>

                 <div className="space-y-3 pt-2 border-t border-white/5">
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px]"><span className="text-slate-500">低电量预警</span><span className="text-cyan-400 font-mono">20%</span></div>
                       <input type="range" className="w-full accent-cyan-500 h-1" />
                    </div>
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px]"><span className="text-slate-500">AI识别阈值</span><span className="text-cyan-400 font-mono">0.75</span></div>
                       <input type="range" className="w-full accent-cyan-500 h-1" />
                    </div>
                 </div>

                 <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] text-slate-500">自动生成日报</span>
                       <div className="w-8 h-4 bg-cyan-500/40 rounded-full relative p-0.5"><div className="w-3 h-3 bg-white rounded-full ml-auto" /></div>
                    </div>
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] text-slate-500">异常自动派单</span>
                       <div className="w-8 h-4 bg-slate-800 rounded-full relative p-0.5"><div className="w-3 h-3 bg-slate-600 rounded-full" /></div>
                    </div>
                 </div>

                 <button className="w-full py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-[10px] rounded active:scale-95 transition-all mt-6 uppercase tracking-widest">保存配置</button>
              </div>
           </CyberCard>
        </div>

        {/* Center: Table View */}
        <div className="col-span-6 space-y-4">
           <CyberCard title="设备接入管理" className="flex-1" headerAction={
             <div className="flex gap-2">
                <button className="flex items-center gap-1 px-3 py-1 bg-cyan-500 text-white rounded text-[10px] font-bold"><Plus className="w-3 h-3" /> 添加设备</button>
                <button className="flex items-center gap-1 px-3 py-1 bg-white/5 border border-white/10 text-slate-400 rounded text-[10px] font-bold hover:bg-white/10"><Upload className="w-3 h-3" /> 导入</button>
             </div>
           }>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="text-[10px] text-slate-500 uppercase border-b border-white/5">
                          <th className="py-2.5 font-bold pl-2">设备名称</th>
                          <th className="py-2.5 font-bold">类型</th>
                          <th className="py-2.5 font-bold">SN编号</th>
                          <th className="py-2.5 font-bold">状态</th>
                          <th className="py-2.5 font-bold">版本</th>
                          <th className="py-2.5 font-bold pr-2 text-right">操作</th>
                       </tr>
                    </thead>
                    <tbody className="text-[10px] text-slate-400">
                       {devices.map((dev, i) => (
                         <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-3 pl-2 font-bold text-slate-200">{dev.name}</td>
                            <td className="py-3">{dev.model}</td>
                            <td className="py-3 font-mono text-slate-500">{dev.sn}</td>
                            <td className="py-3">
                               <div className="flex items-center gap-1.5 text-green-400 font-bold">
                                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_10px_#22c55e]" />
                                  {dev.status}
                               </div>
                            </td>
                            <td className="py-3 font-mono">{dev.version}</td>
                            <td className="py-3 pr-2 text-right space-x-3">
                               <button className="text-cyan-400 hover:underline">编辑</button>
                               <button className="text-red-500 hover:underline">删除</button>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </CyberCard>

           <CyberCard title="权限配对矩阵" className="h-[250px]">
              <div className="overflow-x-auto">
                 <table className="w-full text-center border-collapse">
                    <thead>
                       <tr className="text-[10px] text-slate-500 uppercase border-b border-white/5">
                          <th className="py-3 text-left pl-4 w-24">角色 / 功能</th>
                          <th className="py-3">系统</th>
                          <th className="py-3">巡检</th>
                          <th className="py-3">报警</th>
                          <th className="py-3">报告</th>
                          <th className="py-3">数据</th>
                          <th className="py-3">维护</th>
                       </tr>
                    </thead>
                    <tbody className="text-[10px]">
                       {permissionMatrix.map((role, idx) => (
                         <tr key={idx} className="border-b border-white/5 hover:bg-white/2">
                            <td className="py-4 text-left pl-4 font-bold text-slate-300">{role.role}</td>
                            <td className="py-4"><div className="flex justify-center">{role.sys ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500/30" />}</div></td>
                            <td className="py-4"><div className="flex justify-center">{role.dev ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500/30" />}</div></td>
                            <td className="py-4"><div className="flex justify-center">{role.alarm ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500/30" />}</div></td>
                            <td className="py-4"><div className="flex justify-center">{role.report ? <CheckCircle className="w-4 h-4 text-green-500" /> : <MinusCircle className="w-4 h-4 text-amber-500/40" />}</div></td>
                            <td className="py-4"><div className="flex justify-center">{role.data ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500/30" />}</div></td>
                            <td className="py-4"><div className="flex justify-center">{role.maint ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500/30" />}</div></td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </CyberCard>
        </div>

        {/* Right Side: System Health */}
        <div className="col-span-3 space-y-4">
           <CyberCard title="当前运行健康度" headerAction={<p className="text-[9px] text-slate-600 font-mono italic uppercase">REFRESHED 10:30:45</p>}>
              <div className="space-y-5 pt-3">
                 {[
                   { icon: Activity, label: '服务器集群状态', val: '运行正常', sub: '23天 5小时 无暇故障', color: 'text-green-400' },
                   { icon: HardDrive, label: '存储资源池', val: '正常 (23%)', sub: '已用 2.36 TB / 总计 10 TB', color: 'text-green-400' },
                   { icon: CloudLightning, label: 'API 接口可用率', val: '99.8%', sub: '24h 内请求数: 12,482', color: 'text-cyan-400' },
                   { icon: Workflow, label: '系统架构完整性', val: '冗余模式开启', sub: '备份节点在线 (西宁 02 区域)', color: 'text-blue-400' },
                 ].map((h, i) => (
                    <div key={i} className="flex gap-4 group">
                       <div className="w-10 h-10 rounded-lg bg-cyber-bg border border-white/5 flex items-center justify-center shrink-0 group-hover:border-cyan-500/30 transition-all">
                          <h.icon className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                       </div>
                       <div className="flex-1">
                          <div className="flex items-center justify-between">
                             <h4 className="text-[10px] font-bold text-slate-400 uppercase">{h.label}</h4>
                             <span className={cn("text-[10px] font-bold", h.color)}>{h.val}</span>
                          </div>
                          <p className="text-[9px] text-slate-600 mt-0.5 italic">{h.sub}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </CyberCard>

           <CyberCard title="数据安全与备份" className="flex-1">
              <div className="space-y-4 pt-2">
                 <div className="p-3 bg-cyan-500/5 rounded-lg border border-cyan-500/10">
                    <div className="flex justify-between items-center mb-2">
                       <p className="text-[10px] font-bold text-slate-300">自动离线备份</p>
                       <span className="text-[10px] text-green-500 px-2 rounded-full border border-green-500/30 font-bold uppercase">SECURED</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[9px] text-slate-500">
                       <div className="flex flex-col gap-1 items-start">
                          <span>最后备份日期</span>
                          <span className="text-white font-mono">2025-05-20</span>
                       </div>
                       <div className="flex flex-col gap-1 items-end">
                          <span>下次计划备份</span>
                          <span className="text-white font-mono">2025-05-21</span>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-1.5 px-1 py-2">
                    <p className="text-[8px] text-slate-600 font-bold uppercase tracking-widest flex items-center gap-2 mb-2">
                       <Database className="w-3 h-3 text-cyan-400" /> 存储分级管理
                    </p>
                    <div className="space-y-2">
                       {['关键异常日志 - 本地 (5年)', '常规巡检影像 - 对象存储 (1年)', '传感器时序数据 - 内存数据库 (30天)'].map((p, i) => (
                          <div key={i} className="flex flex-col gap-1">
                             <div className="flex justify-between text-[9px]"><span className="text-slate-400">{p}</span><span className="text-slate-600">正常</span></div>
                             <div className="h-0.5 bg-slate-800 w-full rounded-full overflow-hidden">
                                <div className={cn("h-full", i===0 ? 'bg-cyan-500 w-3/4' : i===1 ? 'bg-blue-500 w-1/2' : 'bg-slate-600 w-1/4')} />
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>

                 <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-[10px] rounded transition-all active:scale-95 border border-white/5">
                    <Download className="w-3.5 h-3.5" /> 导出加密全量备份
                 </button>
              </div>
           </CyberCard>
        </div>
      </div>
    </div>
  );
};
