import React from 'react';
import { LucideIcon, Check } from 'lucide-react';

interface Props {
  label: string;
  subLabel?: string;
  icon: LucideIcon;
  selected: boolean;
  onClick: () => void;
}

export const SelectionCard: React.FC<Props> = ({ label, subLabel, icon: Icon, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        group relative p-12 border-2 rounded-3xl transition-all duration-300 flex flex-col items-center gap-6 text-center w-full
        ${selected 
          ? 'border-lux-gold bg-lux-gold/10 shadow-[0_0_40px_rgba(212,175,55,0.2)] scale-105' 
          : 'border-white/10 hover:border-lux-gold/50 hover:bg-white/5'}
      `}
    >
       <Icon size={80} className={`transition-colors duration-300 ${selected ? 'text-lux-gold' : 'text-gray-600 group-hover:text-gray-300'}`} />
       <div>
           <span className={`block text-3xl font-serif mb-2 ${selected ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>{label}</span>
           {subLabel && <span className="text-sm text-gray-500 font-mono">{subLabel}</span>}
       </div>
       {selected && (
           <div className="absolute top-4 right-4 bg-lux-gold text-black rounded-full p-1">
               <Check size={20} />
           </div>
       )}
    </button>
  );
};