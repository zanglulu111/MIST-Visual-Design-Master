import React, { useState } from 'react';
import { HistoryItem } from '../types';
import { Copy, Edit3, Check, Clock, Trash2, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

interface Props {
  history: HistoryItem[];
  currentId?: string;
  onUpdateTitle: (id: string, title: string) => void;
  lang: 'CN' | 'EN';
  onDelete?: (id: string) => void;
  onRestore?: (item: HistoryItem) => void;
}

export const HistoryPanel: React.FC<Props> = ({ history, currentId, onUpdateTitle, lang, onDelete, onRestore }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  if (history.length === 0) return null;

  const handleCopy = (e: React.MouseEvent, text: string, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const startEditing = (e: React.MouseEvent, item: HistoryItem) => {
    e.stopPropagation();
    setEditingId(item.id);
    setEditValue(item.title);
  };

  const saveTitle = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (editingId && editValue.trim()) {
      onUpdateTitle(editingId, editValue.trim());
    }
    setEditingId(null);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      onDelete?.(id);
  }

  const handleRestore = (item: HistoryItem) => {
      onRestore?.(item);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleString(lang === 'CN' ? 'zh-CN' : 'en-US', {
      hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric'
    });
  };

  return (
    <div className="w-full mt-4 border-t border-white/10 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div 
        className="flex items-center justify-between mb-6 cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
            <Clock className="text-lux-gold" size={20} />
            <h3 className="text-2xl font-serif text-lux-white tracking-wide">
                {lang === 'CN' ? '创作历史' : 'Creation History'}
            </h3>
            <span className="bg-white/10 text-xs px-2 py-0.5 rounded-full text-gray-400 font-mono">
                {history.length}
            </span>
        </div>
        <div className="p-2 rounded-full hover:bg-white/5 transition-colors text-gray-500 group-hover:text-white">
            {isExpanded ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
        </div>
      </div>

      {isExpanded && (
          <div className="grid grid-cols-1 gap-4">
            {history.map((item) => {
              const isCurrent = item.id === currentId;
              
              return (
                <div 
                    key={item.id} 
                    onClick={() => handleRestore(item)}
                    className={`
                        relative bg-[#0A0A0A] border rounded-xl p-6 transition-all duration-300 cursor-pointer group/card
                        ${isCurrent 
                            ? 'border-lux-gold/30 shadow-[0_0_20px_rgba(212,175,55,0.05)] bg-gradient-to-r from-lux-gold/5 to-transparent' 
                            : 'border-white/5 hover:border-white/20 hover:bg-[#111] hover:translate-x-1'}
                    `}
                >
                    {/* Header Row */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3 flex-1">
                            {editingId === item.id ? (
                                <div className="flex items-center gap-2 flex-1 max-w-md" onClick={e => e.stopPropagation()}>
                                    <input 
                                        type="text" 
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        onBlur={() => saveTitle()}
                                        onKeyDown={(e) => e.key === 'Enter' && saveTitle()}
                                        autoFocus
                                        className="bg-black border border-lux-gold/50 rounded px-2 py-1 text-lux-gold font-serif text-lg w-full focus:outline-none"
                                    />
                                    <button onClick={(e) => saveTitle(e)} className="text-green-400 hover:text-green-300"><Check size={18}/></button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3 group/title">
                                    <h4 className={`font-serif text-lg tracking-wide ${isCurrent ? 'text-lux-gold' : 'text-gray-200'} group-hover/card:text-lux-gold-light transition-colors`}>
                                        {item.title}
                                    </h4>
                                    <button 
                                        onClick={(e) => startEditing(e, item)} 
                                        className="text-gray-600 hover:text-white opacity-0 group-hover/title:opacity-100 transition-opacity"
                                    >
                                        <Edit3 size={14} />
                                    </button>
                                </div>
                            )}
                            <span className="text-xs font-mono text-gray-600">{formatDate(item.timestamp)}</span>
                            {isCurrent && <span className="text-[10px] bg-lux-gold/20 text-lux-gold px-2 rounded animate-pulse">ACTIVE</span>}
                        </div>
                        
                        <div className="flex items-center gap-2">
                            {/* Restore Button Indicator */}
                            <span className="text-xs text-gray-600 mr-4 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center gap-1">
                                <RotateCcw size={12}/> {lang === 'CN' ? '点击回溯' : 'Click to Restore'}
                            </span>

                            {onDelete && (
                                <button 
                                    onClick={(e) => handleDelete(e, item.id)}
                                    className="p-2 hover:bg-red-900/20 text-gray-600 hover:text-red-400 rounded transition-colors mr-2"
                                    title="Delete"
                                >
                                    <Trash2 size={16}/>
                                </button>
                            )}
                            <button 
                                onClick={(e) => handleCopy(e, item.prompt, `raw-${item.id}`)}
                                className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-xs font-mono text-gray-400 uppercase tracking-wider transition-colors border border-white/5"
                            >
                                {copiedId === `raw-${item.id}` ? <Check size={12}/> : <Copy size={12}/>} Copy
                            </button>
                        </div>
                    </div>

                    {/* Content Preview */}
                    <div className="text-sm font-mono text-gray-500 line-clamp-2 border-l-2 border-white/10 pl-4 mb-2 group-hover/card:border-lux-gold/30 group-hover/card:text-gray-400 transition-colors">
                        {item.summary}
                    </div>
                </div>
              );
            })}
          </div>
      )}
    </div>
  );
};