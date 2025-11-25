import React, { useState, useRef, useEffect } from 'react';
import { Grid, X, Plus, Type, Edit3, Trash2 } from 'lucide-react';
import { OptionData } from '../types';
import { Modal } from './Modal';
import { optionMap } from '../data';

const SEPARATOR = '|';

interface Props {
  labelCN: string;
  labelEN: string;
  value: string; // PIPE separated IDs or custom text
  onChange: (value: string) => void;
  options: OptionData;
  placeholderCN?: string;
  placeholderEN?: string;
  large?: boolean;
  multiSelect?: boolean;
  maxSelections?: number;
  lang: 'CN' | 'EN';
}

export const CreativeInput: React.FC<Props> = ({ 
  labelCN, labelEN, value, onChange, options, placeholderCN, placeholderEN, large,
  multiSelect, maxSelections, lang
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const segments = value ? value.split(SEPARATOR).map(s => s.trim()).filter(Boolean) : [];

  const libraryIds = segments.filter(segment => {
      const opt = optionMap.get(segment);
      return !!opt; 
  });

  const customTexts = segments.filter(segment => !optionMap.has(segment));

  const handleRemove = (indexToRemove: number) => {
    const newSegments = segments.filter((_, i) => i !== indexToRemove);
    onChange(newSegments.join(SEPARATOR));
  };

  const handleAddCustom = () => {
    if (!inputValue.trim()) return;
    const newSegments = [...segments, inputValue.trim()];
    onChange(newSegments.join(SEPARATOR));
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustom();
    }
  };

  const handleModalSelect = (newIdsString: string) => {
    const newIds = newIdsString.split(SEPARATOR).map(s => s.trim()).filter(Boolean);
    let combined;
    if (multiSelect) {
        combined = [...customTexts, ...newIds];
    } else {
        combined = newIds;
    }
    onChange(combined.join(SEPARATOR));
  };

  const handleSegmentChange = (index: number, newValue: string) => {
      const newSegments = [...segments];
      newSegments[index] = newValue;
      onChange(newSegments.join(SEPARATOR));
  };

  const modalValue = libraryIds.join(SEPARATOR);

  return (
    <div className={`w-full group ${large ? 'col-span-full' : ''} animate-in fade-in duration-500`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
         <div className="flex items-baseline gap-4">
            <span className="text-base md:text-lg font-bold tracking-[0.15em] text-lux-gold font-serif uppercase opacity-90">
               {lang === 'CN' ? labelCN : labelEN}
            </span>
            <span className="text-xs text-gray-500 font-mono uppercase tracking-wider">
               {lang === 'CN' ? labelEN : labelCN}
            </span>
         </div>
         <div className="flex items-center gap-2">
            <button 
                onClick={() => onChange("")}
                className="text-gray-600 hover:text-red-400 p-1.5 rounded hover:bg-white/5 transition-colors"
                title={lang === 'CN' ? "清空" : "Clear"}
            >
                <Trash2 size={14} />
            </button>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-lux-gold flex items-center gap-2 transition-colors px-3 py-1.5 rounded hover:bg-white/5"
            >
                <Grid size={14} /> {lang === 'CN' ? '浏览库' : 'LIBRARY'}
            </button>
         </div>
      </div>

      {/* Visual Block Container */}
      <div className="bg-[#0D0D0D] border border-white/5 hover:border-white/10 rounded-xl min-h-[100px] p-5 flex flex-col gap-4 transition-all duration-300 focus-within:border-lux-gold/30 shadow-inner group-focus-within:bg-[#111]">
        
        {/* Render Visual Blocks (Chips) */}
        <div className="grid grid-cols-1 gap-3">
          {segments.map((segment, index) => {
            const isLibrary = optionMap.has(segment);
            const libraryItem = optionMap.get(segment);

            const displayLabel = isLibrary 
                ? (lang === 'CN' ? libraryItem.labelCN : libraryItem.labelEN)
                : (lang === 'CN' ? '自定义' : 'Custom');

            const displayValue = isLibrary ? libraryItem.prompt : segment;

            return (
              <div 
                key={index} 
                className={`
                  relative group/chip rounded-lg border overflow-hidden transition-all duration-300
                  ${isLibrary 
                    ? 'bg-[#141414] border-lux-gold/10 hover:border-lux-gold/30' 
                    : 'bg-[#1A1A1A] border-white/10 border-dashed hover:border-white/20'}
                `}
              >
                {/* Chip Header */}
                <div className={`px-4 py-2 flex justify-between items-center border-b ${isLibrary ? 'border-lux-gold/5 bg-lux-gold/5' : 'border-white/5 bg-white/5'}`}>
                   <div className="flex items-center gap-3">
                       {!isLibrary && <Edit3 size={12} className="text-gray-500"/>}
                       <span className={`font-serif text-sm tracking-wide font-medium ${isLibrary ? 'text-lux-gold' : 'text-gray-400'}`}>
                         {displayLabel}
                       </span>
                   </div>
                   <button 
                      onClick={() => handleRemove(index)}
                      className="text-gray-600 hover:text-red-400 transition-colors p-1 opacity-0 group-hover/chip:opacity-100"
                   >
                     <X size={14} />
                   </button>
                </div>
                
                {/* Chip Body */}
                <div className="p-0 bg-black/20">
                  <textarea
                    rows={2}
                    value={displayValue}
                    onChange={(e) => handleSegmentChange(index, e.target.value)}
                    className="w-full bg-transparent text-sm font-mono text-gray-300/90 leading-relaxed p-4 border-none focus:ring-0 focus:bg-[#080808] resize-none transition-colors placeholder-gray-700"
                    spellCheck={false}
                  />
                </div>
              </div>
            );
          })}
          
          {segments.length === 0 && (
             <div className="w-full py-8 text-center text-gray-600 text-sm font-mono italic opacity-40 pointer-events-none select-none">
                {lang === 'CN' ? '空 (点击右上角浏览库或下方输入)' : 'Empty (Browse Library or Type below)'}
             </div>
          )}
        </div>

        {/* Input Line */}
        <div className="mt-auto flex items-center gap-3 border-t border-white/5 pt-4">
           <Type size={16} className="text-gray-600 shrink-0" />
           <input 
             ref={inputRef}
             type="text"
             value={inputValue}
             onChange={(e) => setInputValue(e.target.value)}
             onKeyDown={handleKeyDown}
             placeholder={lang === 'CN' ? (placeholderCN || "输入自定义提示词，回车添加...") : (placeholderEN || "Type custom prompt and press Enter...")}
             className="bg-transparent border-none w-full text-base font-mono text-lux-white placeholder-gray-700 focus:outline-none focus:ring-0"
           />
           <button 
             onClick={handleAddCustom}
             disabled={!inputValue.trim()}
             className="text-gray-600 hover:text-lux-gold disabled:opacity-0 transition-all shrink-0 p-2 hover:bg-white/5 rounded-full"
           >
             <Plus size={18} />
           </button>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={lang === 'CN' ? labelCN : labelEN}
        data={options}
        onSelect={handleModalSelect}
        currentValue={modalValue}
        multiSelect={multiSelect}
        maxSelections={maxSelections}
        lang={lang}
      />
    </div>
  );
};