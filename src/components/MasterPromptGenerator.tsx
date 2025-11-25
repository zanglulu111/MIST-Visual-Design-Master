import React, { useState } from 'react';
import { Sparkles, Copy, Check, Languages, Wand2, Loader2, Wrench, Palette, Clapperboard, ChevronDown, ChevronUp } from 'lucide-react';
import { generateMasterPrompts } from '../services/geminiService';
import { MasterPromptResult, AIPromptVariant } from '../types';

interface Props {
  rawPrompt: string;
  summary: string;
  lang: 'CN' | 'EN';
  // Lifted state props
  result: MasterPromptResult | null;
  onSetResult: (res: MasterPromptResult | null) => void;
}

export const MasterPromptGenerator: React.FC<Props> = ({ rawPrompt, summary, lang, result, onSetResult }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rawExpanded, setRawExpanded] = useState(false);
  const [rawCopied, setRawCopied] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await generateMasterPrompts(rawPrompt);
      onSetResult(data);
    } catch (e) {
      setError("AI Generation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyRaw = () => {
      navigator.clipboard.writeText(rawPrompt);
      setRawCopied(true);
      setTimeout(() => setRawCopied(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* 1. Context & Raw Data Pool (Minimized Top Bar) */}
      <div className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg overflow-hidden transition-all duration-300">
         <div className="flex items-center justify-between px-4 py-3 bg-white/5">
            <div 
                className="flex items-center gap-3 cursor-pointer select-none flex-1 min-w-0"
                onClick={() => setRawExpanded(!rawExpanded)}
            >
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest shrink-0">
                    {lang === 'CN' ? '创作语境' : 'CONTEXT'}
                </span>
                {rawExpanded ? <ChevronUp size={14} className="text-gray-600 shrink-0"/> : <ChevronDown size={14} className="text-gray-600 shrink-0"/>}
                {!rawExpanded && (
                    <span className="text-xs text-lux-gold font-mono truncate opacity-90">
                        {summary || rawPrompt}
                    </span>
                )}
            </div>
            <button 
                onClick={handleCopyRaw}
                className="ml-4 text-xs font-mono text-gray-500 hover:text-white flex items-center gap-2 px-3 py-1 rounded border border-white/10 hover:border-lux-gold/30 hover:bg-white/5 transition-colors shrink-0"
            >
                {rawCopied ? <Check size={12}/> : <Copy size={12}/>} {lang === 'CN' ? '复制原始指令' : 'COPY RAW'}
            </button>
         </div>
         
         {rawExpanded && (
             <div className="p-4 bg-[#050505] border-t border-white/5 space-y-3">
                 <div>
                     <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">SELECTED TAGS (CN)</div>
                     <p className="text-sm font-sans text-lux-gold/80 leading-relaxed">
                         {summary}
                     </p>
                 </div>
                 <div className="border-t border-white/5 pt-3">
                     <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">RAW PROMPT (EN)</div>
                     <p className="text-xs font-mono text-gray-400 break-words leading-relaxed select-all">
                         {rawPrompt}
                     </p>
                 </div>
             </div>
         )}
      </div>

      {/* 2. Main Controller & Error */}
      {!result && !isLoading && !error && (
         <div className="flex-1 flex flex-col items-center justify-center min-h-[40vh] gap-8">
            <button
              onClick={handleGenerate}
              className={`
                group relative px-16 py-8 rounded-full font-serif text-3xl tracking-[0.2em] font-bold shadow-[0_0_50px_rgba(212,175,55,0.15)] transition-all duration-500
                bg-gradient-to-r from-lux-gold to-[#F8E7B0] text-black hover:scale-105 hover:shadow-[0_0_80px_rgba(212,175,55,0.4)]
              `}
            >
              <span className="flex items-center gap-4 relative z-10">
                <Sparkles className="animate-pulse w-8 h-8" />
                {lang === 'CN' ? '灵感显化' : 'MANIFEST VISION'}
              </span>
              <div className="absolute inset-0 rounded-full bg-lux-gold blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            </button>
            <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">
                {lang === 'CN' ? 'AI 视觉导演准备就绪' : 'AI Visual Director Ready'}
            </p>
         </div>
      )}

      {isLoading && (
          <div className="flex-1 flex flex-col items-center justify-center min-h-[40vh] gap-6">
              <Loader2 className="w-16 h-16 text-lux-gold animate-spin" />
              <div className="text-xl font-serif text-lux-gold animate-pulse tracking-widest">
                  {lang === 'CN' ? '正在重构时空秩序...' : 'RECONSTRUCTING SPACETIME...'}
              </div>
          </div>
      )}

      {error && (
        <div className="text-red-400 bg-red-900/10 border border-red-900/30 p-6 rounded text-center font-mono text-lg flex flex-col items-center gap-4">
          <span>{error}</span>
          <button onClick={handleGenerate} className="text-white underline">{lang === 'CN' ? '重试' : 'Retry'}</button>
        </div>
      )}

      {/* 3. Results Grid (Consistent Size) */}
      {result && (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 w-full animate-in zoom-in-95 duration-700">
            <PromptCard 
                variant="purist"
                data={result.purist}
                icon={Wrench}
                color="text-blue-400"
                borderColor="border-blue-500/30"
                glowColor="shadow-blue-500/10"
                labelCN="逻辑修复"
                labelEN="LOGICAL FIX"
                descCN="保留全部元素，仅修复冲突"
                lang={lang}
            />
            <PromptCard 
                variant="aesthete"
                data={result.aesthete}
                icon={Palette}
                color="text-lux-gold"
                borderColor="border-lux-gold/50"
                glowColor="shadow-lux-gold/20"
                labelCN="艺术升华"
                labelEN="ARTISTIC SOUL"
                descCN="强化美学风格，弱化琐碎细节"
                lang={lang}
            />
            <PromptCard 
                variant="storyteller"
                data={result.storyteller}
                icon={Clapperboard}
                color="text-purple-400"
                borderColor="border-purple-500/30"
                glowColor="shadow-purple-500/10"
                labelCN="叙事重构"
                labelEN="CINEMATIC"
                descCN="强调光影氛围与故事张力"
                lang={lang}
            />
        </div>
      )}
      
      {result && (
         <div className="flex justify-center pt-2">
             <button 
                onClick={handleGenerate}
                className="text-gray-500 hover:text-white text-xs font-mono uppercase tracking-widest flex items-center gap-2 transition-colors border border-white/10 px-4 py-2 rounded hover:bg-white/5"
             >
                 <Wand2 size={14} /> {lang === 'CN' ? '再次显化 (Regenerate)' : 'Regenerate'}
             </button>
         </div>
      )}

    </div>
  );
};

// Sub-component for individual cards
const PromptCard: React.FC<{
    variant: string;
    data: AIPromptVariant;
    icon: React.ElementType;
    color: string;
    borderColor: string;
    glowColor: string;
    labelCN: string;
    labelEN: string;
    descCN: string;
    lang: 'CN' | 'EN';
}> = ({ data, icon: Icon, color, borderColor, glowColor, labelCN, labelEN, descCN, lang }) => {
    const [copied, setCopied] = useState(false);
    const [showTrans, setShowTrans] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(data.prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`
            relative flex flex-col bg-[#080808] border rounded-2xl overflow-hidden transition-all duration-300 group
            border-white/10 hover:border-white/30 hover:bg-[#0D0D0D] hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]
        `}>
            {/* Header */}
            <div className={`p-5 border-b border-white/5 flex items-start justify-between bg-gradient-to-b from-white/5 to-transparent`}>
                <div className="flex flex-col gap-1.5">
                    <div className={`flex items-center gap-3 font-serif text-xl tracking-wide font-bold ${color}`}>
                        <Icon size={20} />
                        {lang === 'CN' ? labelCN : labelEN}
                    </div>
                    <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">
                        {lang === 'CN' ? descCN : labelEN}
                    </div>
                </div>
            </div>

            {/* Prompt Content - Shorter fixed height */}
            <div className="p-5 flex-1 flex flex-col gap-4">
                <div className="relative h-[220px]">
                    <div className="font-mono text-sm text-gray-300 leading-relaxed h-full overflow-y-auto custom-scrollbar pr-2">
                        {data.prompt}
                    </div>
                    
                    {/* Translation Overlay */}
                    {showTrans && (
                        <div className="absolute inset-0 bg-[#0A0A0A]/95 backdrop-blur-sm p-3 text-gray-300 text-sm leading-relaxed overflow-y-auto custom-scrollbar animate-in fade-in z-20 border border-white/10 rounded-lg">
                           <div className={`mb-2 font-bold ${color} text-[10px] uppercase tracking-widest`}>Design Intent</div>
                           {data.translation}
                        </div>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-white/5 bg-[#050505] flex items-center justify-between gap-3">
                 <button 
                    onClick={() => setShowTrans(!showTrans)}
                    className={`px-3 py-2.5 rounded hover:bg-white/10 transition-colors flex items-center gap-2 text-[10px] font-mono uppercase font-bold tracking-wider ${showTrans ? 'text-white bg-white/10 ring-1 ring-white/20' : 'text-gray-500'}`}
                    title="Translation"
                 >
                     <Languages size={16} /> {lang === 'CN' ? '解读' : 'DECODE'}
                 </button>

                 <button 
                    onClick={handleCopy}
                    className={`
                        flex-1 py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.15em] transition-all
                        ${copied ? 'bg-green-900/30 text-green-400 border border-green-500/30' : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 hover:border-white/20 hover:text-white'}
                    `}
                 >
                     {copied ? <Check size={14}/> : <Copy size={14}/>} {copied ? (lang === 'CN' ? '已复制' : 'COPIED') : (lang === 'CN' ? '复制' : 'COPY')}
                 </button>
            </div>
        </div>
    );
};