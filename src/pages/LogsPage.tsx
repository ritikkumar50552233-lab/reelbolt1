import React, { useState } from 'react';
import { Search, Filter, CheckCircle2, MessageSquare, Send, Sparkles } from 'lucide-react';

interface LogsPageProps {
  logs: any[];
}

export function LogsPage({ logs }: LogsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = logs.filter(log => 
    log.commenterUsername.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.commentText.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.automationName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Activity Logs & History</h1>
          <p className="text-xs text-slate-400">Real-time audit log of every comment caught, public reply, and instant DM sent</p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search username or comment..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
          />
        </div>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-semibold">
                <th className="py-4 px-6">Time</th>
                <th className="py-4 px-6">User</th>
                <th className="py-4 px-6">Comment / Keyword</th>
                <th className="py-4 px-6">Automation</th>
                <th className="py-4 px-6">Public Reply</th>
                <th className="py-4 px-6">DM Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-6 text-slate-400 whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </td>
                  <td className="py-4 px-6 font-bold text-white whitespace-nowrap">
                    @{log.commenterUsername}
                  </td>
                  <td className="py-4 px-6 text-slate-300 max-w-xs truncate">
                    "{log.commentText}"
                  </td>
                  <td className="py-4 px-6 text-violet-400 font-medium">
                    {log.automationName}
                  </td>
                  <td className="py-4 px-6 text-slate-400 max-w-xs truncate">
                    "{log.publicReplyText}"
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-[10px] inline-flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Sent & Delivered
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
