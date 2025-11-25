import React, { useState, useEffect } from 'react';
import { X, Search, Check, Square, CheckSquare, Ban } from 'lucide-react';
import { OptionData, OptionItem, OptionGroup } from '../types';

const SEPARATOR = '|';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: OptionData;
  onSelect: (value: string) => void;
  currentValue: string;
  multiSelect?: boolean;
  maxSelections?: number;
  lang: 'CN' | 'EN';
}

export const Modal: React.FC<Props> = ({ 
  isOpen, 
  onClose, 
  title, 
  data, 
  onSelect, 
  currentValue,
  multiSelect = false,
  maxSelections = 3,
  lang
}) => {
  const [activeTab, setActiveTab] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Helper to check if data is grouped
  const isGrouped = (data: OptionData): data is OptionGroup[] => {
    return 'groupNameCN' in data[0];
  };
  
  useEffect(() => {
    if (isOpen && isGrouped(data)) {
       // Default to first group if no tab selected
       if (!activeTab) setActiveTab(data[0].groupNameEN);
    }
    // Initialize selected items from PIPE-separated string
    if (isOpen) {
      if (multiSelect && currentValue) {
        setSelectedItems(currentValue.split(SEPARATOR).map(s => s.trim()).filter(Boolean));
      } else if (!multiSelect && currentValue) {
         // Handle single select initial value if present
         setSelectedItems([currentValue]);
      } else {
        setSelectedItems([]);
      }
    }
  }, [isOpen, data, currentValue, multiSelect, activeTab]);

  if (!isOpen) return null;

  const groupedData = isGrouped(data) ? data : [{ groupNameCN: '全部', groupNameEN: 'All', options: data as OptionItem[] }];
  
  // Filter logic: Search across CN and EN labels
  const filteredGroups = groupedData.map(group => ({
    ...group,
    options: group.options.filter(opt => 
      opt.labelCN.toLowerCase().includes(searchTerm.toLowerCase()) || 
      opt.labelEN.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (opt.descCN && opt.descCN.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })).filter(group => group.options.length > 0);

  // Get options for active tab
  const activeGroup = isGrouped(data) 
    ? filteredGroups.find(g => g.groupNameEN === activeTab) // Matching by EN name as ID
    : filteredGroups[0];
    
  const currentOptions = activeGroup?.options || [];

  const handleItemClick = (id: string) => {
    if (multiSelect) {
      if (selectedItems.includes(id)) {
        setSelectedItems(prev => prev.filter(item => item !== id));
      } else {
        if (selectedItems.length < (maxSelections || 1)) {
          setSelectedItems(prev => [...prev, id]);
        }
      }
    } else {
      onSelect(id);
      onClose();
    }
  };

  const handleConfirm = () => {
    if (selectedItems.length > 0) {
      onSelect(selectedItems.join(SEPARATOR));
    }
    onClose();
  };

  const handleClear = () => {
      onSelect(""); 
      onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Content Container */}
      <div className="relative w-full max-w-5xl h-[85vh] bg-[#0A0A0A] border border-lux-gold/20 rounded-2xl shadow-[0_0_50px_rgba(212,175,55,0.1)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-lux-charcoal/50 shrink-0">
          <div>
            <h2 className="text-2xl font-serif text-lux-gold tracking-wide">{title}</h2>
            <p className="text-xs text-gray-500 mt-1 font-mono uppercase tracking-widest">
              {multiSelect 
                ? (lang === 'CN' ? `最多选择 ${maxSelections} 项` : `Select up to ${maxSelections} options`)
                : (lang === 'CN' ? '选择一项应用' : 'Select an option to apply')}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Tabs (Wrapped) */}
        {isGrouped(data) && (
          <div className="flex flex-wrap items-center gap-2 px-8 py-4 border-b border-white/5 bg-black/40 shrink-0 max-h-[150px] overflow-y-auto custom-scrollbar">
            {groupedData.map(g => (
              <button
                key={g.groupNameEN}
                onClick={() => setActiveTab(g.groupNameEN)}
                className={`
                  px-4 py-2 text-sm rounded transition-all font-serif whitespace-nowrap
                  ${activeTab === g.groupNameEN 
                    ? 'bg-lux-gold/10 text-lux-gold border border-lux-gold/30' 
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent'}
                `}
              >
                {lang === 'CN' ? g.groupNameCN : g.groupNameEN}
              </button>
            ))}
          </div>
        )}

        {/* Search & Actions */}
        <div className="px-8 py-4 bg-black/20 flex gap-4 shrink-0">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                <input 
                    type="text" 
                    placeholder={lang === 'CN' ? "搜索..." : "Search presets..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-lux-charcoal border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-lux-gold/50 transition-colors placeholder-gray-700 font-sans"
                />
            </div>
            <button 
              onClick={handleClear}
              className="px-4 py-2 border border-white/10 rounded-lg text-gray-500 hover:text-red-400 hover:border-red-400/30 hover:bg-red-900/10 transition-all font-mono text-xs uppercase flex items-center gap-2"
            >
              <Ban size={14}/> N/A
            </button>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#050505]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentOptions.map((opt) => {
               const isSelected = selectedItems.includes(opt.id);
               
               return (
                <button
                  key={opt.id}
                  onClick={() => handleItemClick(opt.id)}
                  className={`
                    group relative p-4 rounded-xl border text-left transition-all duration-200 flex items-start gap-3
                    ${isSelected 
                      ? 'border-lux-gold bg-lux-gold/5 shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
                      : 'border-white/5 bg-lux-charcoal hover:border-lux-gold/30 hover:bg-lux-charcoal/80'}
                  `}
                >
                  {multiSelect && (
                    <div className={`mt-1 ${isSelected ? 'text-lux-gold' : 'text-gray-700 group-hover:text-gray-500'}`}>
                      {isSelected ? <CheckSquare size={16} /> : <Square size={16} />}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className={`font-serif font-medium mb-1 truncate ${isSelected ? 'text-lux-gold' : 'text-gray-200 group-hover:text-lux-gold-light'}`}>
                      {lang === 'CN' ? opt.labelCN : opt.labelEN}
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-gray-500 font-sans uppercase tracking-wider truncate">
                           {lang === 'CN' ? opt.labelEN : opt.labelCN}
                        </span>
                        {/* Show prompt snippet if available to confirm content visibility */}
                        <span className="text-[10px] text-gray-600 font-mono border-t border-white/5 pt-1 mt-1 line-clamp-2 leading-relaxed">
                            {opt.prompt}
                        </span>
                    </div>
                  </div>
                </button>
               )
            })}
            {currentOptions.length === 0 && (
                <div className="col-span-full text-center py-20 text-gray-700">
                    {lang === 'CN' ? '未找到结果' : 'No results found.'}
                </div>
            )}
          </div>
        </div>

        {/* Footer for Multi-Select */}
        {multiSelect && (
          <div className="p-6 border-t border-white/10 bg-[#080808] flex justify-between items-center shrink-0">
             <div className="text-gray-500 font-mono text-xs">
               {lang === 'CN' ? '已选' : 'SELECTED'}: <span className="text-lux-gold">{selectedItems.length}</span> / {maxSelections}
             </div>
             <button 
               onClick={handleConfirm}
               disabled={selectedItems.length === 0}
               className="bg-lux-gold text-black px-8 py-2 rounded font-mono text-sm uppercase font-bold tracking-wider hover:bg-[#E5C558] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
             >
               {lang === 'CN' ? '确认选择' : 'APPLY SELECTION'}
             </button>
          </div>
        )}

      </div>
    </div>
  );
};