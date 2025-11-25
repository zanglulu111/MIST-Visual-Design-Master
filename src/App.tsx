import React, { useState, useRef, useEffect } from 'react';
import { User, Bug, Image as ImageIcon, ChevronRight, ChevronLeft, Wand2, Copy, Check, Circle, Disc, Aperture, Globe, Sparkles, Layers, Film, RotateCcw, Dice5, History } from 'lucide-react';
import { 
  DesignState, LayerStep, SubjectType, 
  HumanEngineState, CreatureEngineState, SceneState, GlobalFieldState, PostProcessState, HistoryItem, OptionItem, OptionData, MasterPromptResult
} from './types';
import { 
  globalOptions, humanOptions, creatureOptions, sceneOptions, postProcessOptions,
  initialGlobal, initialHuman, initialCreature, initialScene,
  getOptionPrompt, getOptionLabel
} from './data';
import { CreativeInput } from './components/CreativeInput';
import { SelectionCard } from './components/SelectionCard';
import { HistoryPanel } from './components/HistoryPanel';
import { MasterPromptGenerator } from './components/MasterPromptGenerator';

// --- INITIAL STATE ---
const initialPostProcess: PostProcessState = {
  cameraFX: "",
  screenFX: "",
  quality: ""
};

const initialState: DesignState = {
  global: initialGlobal,
  subjectType: null,
  human: initialHuman,
  creature: initialCreature,
  scene: initialScene,
  postProcess: initialPostProcess
};

const SEPARATOR = '|';

const App: React.FC = () => {
  const [lang, setLang] = useState<'CN' | 'EN'>('CN');
  const [step, setStep] = useState<LayerStep>(LayerStep.GLOBAL_FIELD);
  const [state, setState] = useState<DesignState>(initialState);
  
  // Generation & History
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [cnSummary, setCnSummary] = useState<string>("");
  const [copied, setCopied] = useState(false);
  
  // Lifted AI Result State (for persistence)
  const [masterResult, setMasterResult] = useState<MasterPromptResult | null>(null);
  
  const [history, setHistory] = useState<HistoryItem[]>(() => {
      try {
          const saved = localStorage.getItem('visionary_history');
          return saved ? JSON.parse(saved) : [];
      } catch {
          return [];
      }
  });
  
  // Track which history item is currently active/being viewed
  const [viewingHistoryId, setViewingHistoryId] = useState<string | null>(null);

  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [step]);

  useEffect(() => {
      localStorage.setItem('visionary_history', JSON.stringify(history));
  }, [history]);

  const t = (cn: string, en: string) => (lang === 'CN' ? cn : en);

  const updateGlobal = (k: keyof GlobalFieldState, v: string) => setState(s => ({ ...s, global: { ...s.global, [k]: v } }));
  const updateHuman = (k: keyof HumanEngineState, v: string) => setState(s => ({ ...s, human: { ...s.human, [k]: v } }));
  const updateCreature = (k: keyof CreatureEngineState, v: string) => setState(s => ({ ...s, creature: { ...s.creature, [k]: v } }));
  const updateScene = (k: keyof SceneState, v: string) => setState(s => ({ ...s, scene: { ...s.scene, [k]: v } }));
  const updatePostProcess = (k: keyof PostProcessState, v: string) => setState(s => ({ ...s, postProcess: { ...s.postProcess, [k]: v } }));

  const handleNext = () => {
    if (step === LayerStep.SUBJECT_SELECT) {
      if (!state.subjectType) return;
      if (state.subjectType === SubjectType.SCENE_ONLY) {
        setStep(LayerStep.SCENE_LAYER);
      } else {
        setStep(LayerStep.SUBJECT_DETAILS);
      }
    } else if (step === LayerStep.SCENE_LAYER) {
        setStep(LayerStep.POST_PROCESS);
    } else if (step === LayerStep.POST_PROCESS) {
       generate();
       setStep(LayerStep.SYNTHESIS);
    } else {
      setStep(s => s + 1);
    }
  };

  const handleBack = () => {
    if (step === LayerStep.SCENE_LAYER && state.subjectType === SubjectType.SCENE_ONLY) {
      setStep(LayerStep.SUBJECT_SELECT);
    } else {
      setStep(s => s - 1);
    }
  };

  const handleResetCurrentStep = () => {
      if (step === LayerStep.GLOBAL_FIELD) {
          setState(s => ({ ...s, global: initialGlobal }));
      } else if (step === LayerStep.SUBJECT_DETAILS) {
          if (state.subjectType === SubjectType.HUMAN) setState(s => ({ ...s, human: initialHuman }));
          if (state.subjectType === SubjectType.CREATURE) setState(s => ({ ...s, creature: initialCreature }));
      } else if (step === LayerStep.SCENE_LAYER) {
          setState(s => ({ ...s, scene: initialScene }));
      } else if (step === LayerStep.POST_PROCESS) {
          setState(s => ({ ...s, postProcess: initialPostProcess }));
      }
  };

  const handleNewCreation = () => {
       setStep(LayerStep.GLOBAL_FIELD);
       setViewingHistoryId(null);
       setState(initialState);
       setMasterResult(null);
       setGeneratedPrompt("");
       setCnSummary("");
  };

  const handleRandomize = () => {
    const pick = (data: OptionData, multi: boolean = false, max: number = 1): string => {
        let items: OptionItem[] = [];
        if (Array.isArray(data)) {
            if (data.length > 0 && ('groupNameCN' in data[0] || 'titleCN' in data[0])) {
                // OptionGroup[]
                (data as any[]).forEach((g: any) => {
                   if(g.options) items.push(...g.options);
                });
            } else {
                // OptionItem[]
                items = data as OptionItem[];
            }
        }
        
        if (items.length === 0) return "";
        
        if (!multi) {
            return items[Math.floor(Math.random() * items.length)].id;
        } else {
            const count = Math.floor(Math.random() * max) + 1;
            const shuffled = [...items].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count).map(i => i.id).join(SEPARATOR);
        }
    };

    if (step === LayerStep.GLOBAL_FIELD) {
       const newGlobal = { ...state.global };
       globalOptions.forEach(opt => {
           (newGlobal as any)[opt.id] = pick(opt.options, opt.multi, opt.max);
       });
       setState(s => ({ ...s, global: newGlobal }));
    }
    else if (step === LayerStep.SUBJECT_SELECT) {
        const types = [SubjectType.HUMAN, SubjectType.CREATURE, SubjectType.SCENE_ONLY];
        const t = types[Math.floor(Math.random() * types.length)];
        setState(s => ({ ...s, subjectType: t }));
    }
    else if (step === LayerStep.SUBJECT_DETAILS) {
        if (state.subjectType === SubjectType.HUMAN) {
            const newHuman = { ...state.human };
            const sections = [humanOptions.biology, humanOptions.profession, humanOptions.visuals, humanOptions.performance];
            sections.forEach(sec => {
                sec.forEach(field => {
                     (newHuman as any)[field.id] = pick(field.options, (field as any).multi, (field as any).max);
                });
            });
            setState(s => ({ ...s, human: newHuman }));
        } else if (state.subjectType === SubjectType.CREATURE) {
            const newCreature = { ...state.creature };
            const sections = [creatureOptions.blueprint, creatureOptions.integumentary, creatureOptions.anatomy, creatureOptions.performance];
             sections.forEach(sec => {
                sec.forEach(field => {
                     (newCreature as any)[field.id] = pick(field.options, (field as any).multi, (field as any).max);
                });
            });
            setState(s => ({ ...s, creature: newCreature }));
        }
    }
    else if (step === LayerStep.SCENE_LAYER) {
        const newScene = { ...state.scene };
        newScene.camera = pick(sceneOptions.camera, true, 3);
        newScene.lighting = pick(sceneOptions.lighting, true, 2);
        newScene.environment = pick(sceneOptions.environment, true, 1);
        newScene.props = pick(sceneOptions.props, true, 3);
        newScene.time = pick(sceneOptions.time, false);
        newScene.weather = pick(sceneOptions.weather, false);
        setState(s => ({ ...s, scene: newScene }));
    }
    else if (step === LayerStep.POST_PROCESS) {
        const newPP = { ...state.postProcess };
        newPP.cameraFX = pick(postProcessOptions.cameraFX, true, 2);
        newPP.screenFX = pick(postProcessOptions.screenFX, false);
        newPP.quality = pick(postProcessOptions.quality, true, 2);
        setState(s => ({ ...s, postProcess: newPP }));
    }
  };

  const generate = () => {
    // Note: We do NOT generate history here anymore.
    // History is only generated when the AI successfully returns the Master Prompts.
    
    setMasterResult(null);
    setViewingHistoryId(null); 

    const full = (id: string) => {
        if(!id || id === 'none') return '';
        return id.split(SEPARATOR).map(i => getOptionPrompt(i.trim())).filter(Boolean).join(', ');
    };
    
    const first = (id: string) => {
        if(!id || id === 'none') return '';
        const p = getOptionPrompt(id.split(SEPARATOR)[0]);
        return p.split(',')[0].trim();
    };

    const l = (id: string) => {
        if(!id || id === 'none') return '';
        return id.split(SEPARATOR).map(i => getOptionLabel(i.trim(), 'CN')).filter(Boolean).join(', ');
    };

    const clean = (text: string) => {
        return text.replace(/\s+/g, ' ').replace(/ ,/g, ',').replace(/,+/g, ',').replace(/^, /, '').replace(/, \./g, '.').trim();
    };

    const { global, human, creature, scene, subjectType, postProcess } = state;

    // --- MASTER PROMPT LOGIC v5.0 ---
    const cameraDesc = full(scene.camera);
    const lightDesc = full(scene.lighting);
    const shotInfo = [cameraDesc, lightDesc].filter(Boolean).join(", ");
    
    let pHeader = `(Masterpiece, Best Quality, 8k), ${full(global.medium)}, ${full(global.visualSoul)}`;
    if (shotInfo) pHeader += `, ${shotInfo}`;

    let pSubject = "";
    if (subjectType === SubjectType.HUMAN) {
        const profNoun = human.profession ? first(human.profession) : "";
        const skeleton = `A ${first(human.age)} ${first(human.gender)} ${first(human.ethnicity)} ${first(human.species)} ${profNoun}, ${first(human.body)} build.`;
        
        const detailsParts = [full(human.skin), full(human.hair), full(human.face), full(human.traits)].filter(Boolean).join(", ");
        const details = detailsParts ? `LOOKS: ${detailsParts}.` : "";

        const profDetails = full(human.profession);
        const fashionDesc = full(human.fashion);
        const attireParts = [profDetails, fashionDesc].filter(Boolean).join(", ");
        const fashion = attireParts ? `ATTIRE: ${attireParts}.` : "";

        const actionParts = [full(human.action), full(human.pose), full(human.expression), full(human.gaze)].filter(Boolean).join(", ");
        const action = actionParts ? `ACTION: ${actionParts}.` : "";
        
        pSubject = `${skeleton} ${details} ${fashion} ${action}`;

    } else if (subjectType === SubjectType.CREATURE) {
        const skeleton = `A ${first(creature.scale)} ${first(creature.class)} creature, ${first(creature.stance)}.`;
        const skin = `MATERIAL: ${full(creature.texture)} ${creature.element && creature.element !== 'elm_none' ? `, body made of ${full(creature.element)}` : ''}.`;
        const features = `FEATURES: ${full(creature.headFeatures)}, ${full(creature.bodyParts)}.`;
        const action = `ACTION: ${full(creature.action)}, looking ${full(creature.mood)}.`;
        pSubject = `${skeleton} ${skin} ${features} ${action}`;
    }

    let pScene = "";
    if (scene.environment) {
        pScene = `${full(scene.environment)}.`;
    }
    if (scene.props) {
        pScene += ` PROPS: ${full(scene.props)}.`;
    }

    let pContext = "";
    const atmosphere = [full(scene.time), full(scene.weather)].filter(Boolean).join(", ");
    const worldElements = [
        global.visualBase ? `WORLD: ${full(global.visualBase)}` : "",
        global.techOverlay ? `TECH: ${full(global.techOverlay)}` : "",
        global.entropy ? `MOOD: ${full(global.entropy)}` : ""
    ].filter(Boolean).join(". ");
    
    if (atmosphere || worldElements) {
        pContext = `${worldElements} ${atmosphere ? `ATMOSPHERE: ${atmosphere}.` : ""}`;
    }

    let pFX = "";
    const fxParts = [full(postProcess.cameraFX), full(postProcess.screenFX), full(postProcess.quality)].filter(Boolean).join(", ");
    if (fxParts) {
        pFX = `EFFECTS: ${fxParts}.`;
    }

    let pFooter = "--v 6.0 --style raw";
    const mediumPrompt = (getOptionPrompt(global.medium.split(SEPARATOR)[0]) || "").toLowerCase();
    if (
        mediumPrompt.includes("anime") || 
        mediumPrompt.includes("manga") || 
        mediumPrompt.includes("illustration") ||
        mediumPrompt.includes("2d") ||
        mediumPrompt.includes("comic")
    ) {
        pFooter = "--niji 6";
    }

    let finalPrompt = "";
    if (subjectType === SubjectType.SCENE_ONLY) {
        finalPrompt = `${pHeader} SCENE: ${pScene} ${pContext} ${pFX} ${pFooter}`;
    } else {
        finalPrompt = `${pHeader} SUBJECT: ${pSubject} SCENE: ${pScene} ${pContext} ${pFX} ${pFooter}`;
    }

    finalPrompt = clean(finalPrompt);
    setGeneratedPrompt(finalPrompt);

    // Summary for UI
    let summary = `[${l(global.medium)}] [${l(global.visualSoul)}] + [${l(global.visualBase)}]`;
    if(subjectType === SubjectType.HUMAN) summary += ` + ${l(human.gender)}/${l(human.age)}/${l(human.profession || 'N/A')}`;
    if(subjectType === SubjectType.CREATURE) summary += ` + ${l(creature.class)}/${l(creature.element)}`;
    summary += ` + ${l(scene.environment)}`;
    setCnSummary(summary);
  };

  // Called when AI Generation is successful
  const handleOnAIComplete = (result: MasterPromptResult | null) => {
      setMasterResult(result);
      if (result) {
          // Create History Item ONLY on successful AI generation
          const newId = Date.now().toString();
          const newItem: HistoryItem = {
              id: newId,
              timestamp: Date.now(),
              title: lang === 'CN' ? `创作 ${new Date().toLocaleTimeString('zh-CN', {hour:'2-digit', minute:'2-digit'})}` : `Creation ${new Date().toLocaleTimeString()}`,
              prompt: generatedPrompt,
              summary: cnSummary,
              designState: JSON.parse(JSON.stringify(state)),
              masterResult: result
          };
          setHistory(prev => [newItem, ...prev]);
          setViewingHistoryId(newId);
      }
  };

  const handleHistoryRestore = (item: HistoryItem) => {
      setState(item.designState);
      setGeneratedPrompt(item.prompt);
      setCnSummary(item.summary);
      setMasterResult(item.masterResult || null);
      setViewingHistoryId(item.id);
      setStep(LayerStep.SYNTHESIS);
  };

  const handleHistoryTitleUpdate = (id: string, newTitle: string) => {
      setHistory(prev => prev.map(item => item.id === id ? { ...item, title: newTitle } : item));
  };
  
  const handleDeleteHistory = (id: string) => {
      setHistory(prev => prev.filter(item => item.id !== id));
      if (viewingHistoryId === id) setViewingHistoryId(null);
  };

  const renderToolbar = () => (
      <div className="flex flex-col md:items-end items-center gap-2">
          {/* Top Row: Random | Reset */}
          <div className="flex gap-2">
             <button 
                onClick={handleRandomize}
                className="text-lux-gold hover:text-white transition-colors flex items-center gap-2 text-xs font-mono uppercase tracking-widest border border-lux-gold/30 hover:border-lux-gold/60 hover:bg-lux-gold/10 px-3 py-1.5 rounded-lg"
              >
                <Dice5 size={14} /> {t('随机', 'Random')}
              </button>
              <button 
                onClick={handleResetCurrentStep}
                className="text-gray-600 hover:text-red-400 transition-colors flex items-center gap-2 text-xs font-mono uppercase tracking-widest border border-transparent hover:border-red-900/30 hover:bg-red-900/10 px-3 py-1.5 rounded-lg"
              >
                <RotateCcw size={14} /> {t('重置', 'Reset')}
              </button>
          </div>
          {/* Bottom Row: New Creation */}
          <button 
            onClick={handleNewCreation}
            className="text-lux-gold/70 hover:text-lux-gold transition-colors flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest px-2"
          >
             {t('新创作', 'New Creation')} <Wand2 size={12} />
          </button>
      </div>
  );

  // Common Header Style
  const Header = ({ title, subtitle }: { title: string, subtitle: string }) => (
      <div className="text-center mb-16 relative w-full">
          <h2 className="text-5xl md:text-6xl font-serif text-lux-gold mb-4 tracking-tight">{title}</h2>
          <p className="text-gray-400 font-mono text-sm md:text-base uppercase tracking-[0.2em]">{subtitle}</p>
          <div className="absolute top-0 right-0 hidden md:block">
              {renderToolbar()}
          </div>
          <div className="md:hidden mt-6 flex justify-center">
              {renderToolbar()}
          </div>
      </div>
  );

  const renderGlobal = () => (
    <div className="space-y-12 animate-in slide-in-from-right duration-500 w-full relative">
       <Header 
          title={t('美学时空场域', 'Aesthetic Time-Space Field')}
          subtitle={t('Layer 0: 物理法则与美学基调', 'Layer 0: Physics & Aesthetic Axioms')}
       />
       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
          {globalOptions.map(opt => (
             <CreativeInput 
                key={opt.id}
                labelCN={opt.titleCN} labelEN={opt.titleEN}
                value={(state.global as any)[opt.id]}
                onChange={v => updateGlobal(opt.id as keyof GlobalFieldState, v)}
                options={opt.options} lang={lang}
                multiSelect={opt.multi} maxSelections={opt.max}
             />
          ))}
       </div>
    </div>
  );

  const renderSubjectSelect = () => (
    <div className="flex flex-col items-center justify-start gap-8 animate-in zoom-in-95 duration-500 w-full relative pt-12">
       {/* Replaced Custom Header with Standard Header for Consistency */}
       <Header 
          title={t('万物本体论', 'Ontology of All Things')}
          subtitle={t('Layer 1: 核心叙事锚点', 'Layer 1: The Narrative Anchor')}
       />
       
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {[
            { id: SubjectType.HUMAN, icon: User, label: t('人类/亚人', 'Humanoid'), desc: t('构建人物、超级英雄与类人角色', 'Build humans, superheroes, and androids') },
            { id: SubjectType.CREATURE, icon: Bug, label: t('生物/异种', 'Creature'), desc: t('创造野兽、怪物与神话生物', 'Create beasts, monsters, and myths') },
            { id: SubjectType.SCENE_ONLY, icon: ImageIcon, label: t('纯场景', 'Scene Only'), desc: t('仅描绘空镜头与环境艺术', 'Focus solely on environment art') },
          ].map((item) => (
            <SelectionCard
              key={item.id}
              label={item.label}
              subLabel={item.desc}
              icon={item.icon}
              selected={state.subjectType === item.id}
              onClick={() => setState(s => ({ ...s, subjectType: item.id as SubjectType }))}
            />
          ))}
       </div>
    </div>
  );

  const renderSubjectDetails = () => {
    if (state.subjectType === SubjectType.HUMAN) {
      return (
        <div className="space-y-16 animate-in slide-in-from-right duration-500 w-full relative">
           <Header 
              title={t('塑造角色', 'Sculpt Humanoid')}
              subtitle={t('Layer 1-A: 骨架 - 皮相 - 灵魂', 'Layer 1-A: Skeleton - Flesh - Soul')}
           />
           
           {/* 01 BIOLOGY */}
           <div className="space-y-6">
              <h3 className="text-xl font-mono text-lux-gold border-b border-lux-gold/20 pb-4 mb-6 flex items-center gap-2">
                  <span className="bg-lux-gold text-black px-2 py-0.5 text-sm font-bold rounded">01</span> BIOLOGY & IDENTITY
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {humanOptions.biology.map(opt => (
                    <CreativeInput
                        key={opt.id}
                        labelCN={opt.titleCN} labelEN={opt.titleEN}
                        value={(state.human as any)[opt.id]}
                        onChange={v => updateHuman(opt.id as keyof HumanEngineState, v)}
                        options={opt.options} lang={lang}
                    />
                ))}
              </div>
           </div>

           {/* 02 IDENTITY & OCCUPATION */}
           <div className="space-y-6">
               <h3 className="text-xl font-mono text-lux-gold border-b border-lux-gold/20 pb-4 mb-6 flex items-center gap-2">
                  <span className="bg-lux-gold text-black px-2 py-0.5 text-sm font-bold rounded">02</span> PROFESSION & ARCHETYPE
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {humanOptions.profession.map(opt => (
                     <CreativeInput
                        key={opt.id}
                        labelCN={opt.titleCN} labelEN={opt.titleEN}
                        value={(state.human as any)[opt.id]}
                        onChange={v => updateHuman(opt.id as keyof HumanEngineState, v)}
                        options={opt.options} lang={lang}
                        multiSelect={opt.multi} maxSelections={opt.max}
                        large 
                        placeholderCN="选择一个职业身份 (将自动关联服装与道具)..."
                     />
                  ))}
               </div>
           </div>

           {/* 03 PHYSICAL APPEARANCE */}
           <div className="space-y-6">
              <h3 className="text-xl font-mono text-lux-gold border-b border-lux-gold/20 pb-4 mb-6 flex items-center gap-2">
                  <span className="bg-lux-gold text-black px-2 py-0.5 text-sm font-bold rounded">03</span> VISUAL APPEARANCE
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                 {humanOptions.visuals.map(opt => (
                    <CreativeInput
                        key={opt.id}
                        labelCN={opt.titleCN} labelEN={opt.titleEN}
                        value={(state.human as any)[opt.id]}
                        onChange={v => updateHuman(opt.id as keyof HumanEngineState, v)}
                        options={opt.options} lang={lang}
                        multiSelect={opt.multi} maxSelections={opt.max}
                    />
                 ))}
              </div>
           </div>

           {/* 04 PERFORMANCE */}
           <div className="space-y-6">
              <h3 className="text-xl font-mono text-lux-gold border-b border-lux-gold/20 pb-4 mb-6 flex items-center gap-2">
                  <span className="bg-lux-gold text-black px-2 py-0.5 text-sm font-bold rounded">04</span> PERFORMANCE
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {humanOptions.performance.map(opt => (
                    <CreativeInput
                        key={opt.id}
                        labelCN={opt.titleCN} labelEN={opt.titleEN}
                        value={(state.human as any)[opt.id]}
                        onChange={v => updateHuman(opt.id as keyof HumanEngineState, v)}
                        options={opt.options} lang={lang}
                        multiSelect={(opt as any).multi} maxSelections={(opt as any).max}
                    />
                 ))}
              </div>
           </div>
        </div>
      );
    } else if (state.subjectType === SubjectType.CREATURE) {
      return (
        <div className="space-y-16 animate-in slide-in-from-right duration-500 w-full relative">
           <Header 
              title={t('创造生物', 'Design Creature')}
              subtitle={t('Layer 1-B: 构造 - 材质 - 行为', 'Layer 1-B: Anatomy - Texture - Action')}
           />
           
           <div className="space-y-6">
               <h3 className="text-xl font-mono text-lux-gold border-b border-lux-gold/20 pb-4 mb-6">BLUEPRINT</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {creatureOptions.blueprint.map(opt => (
                      <CreativeInput
                        key={opt.id}
                        labelCN={opt.titleCN} labelEN={opt.titleEN}
                        value={(state.creature as any)[opt.id]}
                        onChange={v => updateCreature(opt.id as keyof CreatureEngineState, v)}
                        options={opt.options} lang={lang}
                      />
                  ))}
               </div>
           </div>
           
           <div className="space-y-6">
               <h3 className="text-xl font-mono text-lux-gold border-b border-lux-gold/20 pb-4 mb-6">INTEGUMENTARY</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {creatureOptions.integumentary.map(opt => (
                      <CreativeInput
                        key={opt.id}
                        labelCN={opt.titleCN} labelEN={opt.titleEN}
                        value={(state.creature as any)[opt.id]}
                        onChange={v => updateCreature(opt.id as keyof CreatureEngineState, v)}
                        options={opt.options} lang={lang}
                        multiSelect={opt.multi} maxSelections={opt.max}
                      />
                  ))}
               </div>
           </div>

           <div className="space-y-6">
               <h3 className="text-xl font-mono text-lux-gold border-b border-lux-gold/20 pb-4 mb-6">ANATOMY</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {creatureOptions.anatomy.map(opt => (
                      <CreativeInput
                        key={opt.id}
                        labelCN={opt.titleCN} labelEN={opt.titleEN}
                        value={(state.creature as any)[opt.id]}
                        onChange={v => updateCreature(opt.id as keyof CreatureEngineState, v)}
                        options={opt.options} lang={lang}
                        multiSelect={opt.multi} maxSelections={opt.max}
                      />
                  ))}
               </div>
           </div>

           <div className="space-y-6">
               <h3 className="text-xl font-mono text-lux-gold border-b border-lux-gold/20 pb-4 mb-6">MOOD & ACTION</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {creatureOptions.performance.map(opt => (
                      <CreativeInput
                        key={opt.id}
                        labelCN={opt.titleCN} labelEN={opt.titleEN}
                        value={(state.creature as any)[opt.id]}
                        onChange={v => updateCreature(opt.id as keyof CreatureEngineState, v)}
                        options={opt.options} lang={lang}
                        multiSelect={opt.multi} maxSelections={opt.max}
                      />
                  ))}
               </div>
           </div>
        </div>
      );
    }
    return null;
  };

  const renderScene = () => (
    <div className="space-y-12 animate-in slide-in-from-right duration-500 w-full relative">
       <Header 
          title={t('场景与镜头引擎', 'Scene & Camera Engine')}
          subtitle={t('Layer 2: 摄影机 - 空间 - 氛围', 'Layer 2: Camera - Space - Atmosphere')}
       />
       
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Section 1: Camera & Lighting */}
          <div className="col-span-full space-y-8 border-b border-white/10 pb-8">
              <h3 className="text-xl font-mono text-lux-gold flex items-center gap-2">
                  <span className="bg-lux-gold text-black px-2 py-0.5 text-sm font-bold rounded">I</span> CAMERA & LIGHTING
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <CreativeInput 
                    labelCN="摄影机 (景别/焦段/角度)" labelEN="Camera Setup"
                    value={state.scene.camera} onChange={v => updateScene('camera', v)}
                    options={sceneOptions.camera} lang={lang}
                    multiSelect maxSelections={6} placeholderCN="如：大特写, 85mm, 荷兰角..."
                />
                <CreativeInput 
                    labelCN="专业布光" labelEN="Lighting"
                    value={state.scene.lighting} onChange={v => updateScene('lighting', v)}
                    options={sceneOptions.lighting} lang={lang}
                    multiSelect maxSelections={3}
                    placeholderCN="如：伦勃朗光, 赛博霓虹..."
                />
              </div>
          </div>

          {/* Section 2: Environment */}
          <div className="col-span-full space-y-8 border-b border-white/10 pb-8">
              <h3 className="text-xl font-mono text-lux-gold flex items-center gap-2">
                  <span className="bg-lux-gold text-black px-2 py-0.5 text-sm font-bold rounded">II</span> ENVIRONMENT
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <CreativeInput 
                    labelCN="环境空间" labelEN="Environment Container"
                    value={state.scene.environment} onChange={v => updateScene('environment', v)}
                    options={sceneOptions.environment} lang={lang}
                    multiSelect maxSelections={3}
                    placeholderCN="选择一个具体的物理场景或概念空间..."
                />
                <CreativeInput 
                    labelCN="叙事道具" labelEN="Props Warehouse"
                    value={state.scene.props} onChange={v => updateScene('props', v)}
                    options={sceneOptions.props} lang={lang}
                    multiSelect maxSelections={6}
                    placeholderCN="添加关键道具..."
                />
              </div>
          </div>

          {/* Section 3: Atmosphere */}
          <div className="col-span-full space-y-8">
              <h3 className="text-xl font-mono text-lux-gold flex items-center gap-2">
                  <span className="bg-lux-gold text-black px-2 py-0.5 text-sm font-bold rounded">III</span> ATMOSPHERE
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <CreativeInput 
                    labelCN="时间" labelEN="Time of Day"
                    value={state.scene.time} onChange={v => updateScene('time', v)}
                    options={sceneOptions.time} lang={lang}
                />
                <CreativeInput 
                    labelCN="天气与粒子" labelEN="Weather & Particles"
                    value={state.scene.weather} onChange={v => updateScene('weather', v)}
                    options={sceneOptions.weather} lang={lang}
                />
              </div>
          </div>
       </div>
    </div>
  );

  const renderPostProcess = () => (
      <div className="space-y-12 animate-in slide-in-from-right duration-500 w-full relative">
         <Header 
            title={t('后期与画质', 'Post-Process & Mastering')}
            subtitle={t('Layer 3: 模拟信号 - 特效 - 增强', 'Layer 3: Analog - FX - Quality')}
         />
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <CreativeInput 
                 labelCN="镜头特效" labelEN="Camera FX"
                 value={state.postProcess.cameraFX} onChange={v => updatePostProcess('cameraFX', v)}
                 options={postProcessOptions.cameraFX} lang={lang}
                 multiSelect maxSelections={3}
             />
             <CreativeInput 
                 labelCN="介质滤镜" labelEN="Screen FX"
                 value={state.postProcess.screenFX} onChange={v => updatePostProcess('screenFX', v)}
                 options={postProcessOptions.screenFX} lang={lang}
             />
             <CreativeInput 
                 labelCN="画质增强" labelEN="Quality Booster"
                 value={state.postProcess.quality} onChange={v => updatePostProcess('quality', v)}
                 options={postProcessOptions.quality} lang={lang}
                 multiSelect maxSelections={3}
             />
         </div>
      </div>
  );

  const renderSynthesis = () => (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 animate-in zoom-in-95 duration-500 w-full relative">
       {/* Applied Header component for toolbar availability */}
       <Header 
         title={t('灵感显化', 'VISION MANIFESTED')}
         subtitle={t('最终图层：指令合成与AI策展', 'Final Layer: Synthesis & AI Curation')}
       />

       {/* AI Master Prompt Generator Component with Lifted State */}
       <MasterPromptGenerator 
          rawPrompt={generatedPrompt} 
          summary={cnSummary} // Pass summary
          lang={lang}
          result={masterResult}
          onSetResult={handleOnAIComplete} // Pass wrapper function
       />
       
       {/* History Panel - Supports Restore */}
       <HistoryPanel 
          history={history} 
          currentId={viewingHistoryId || undefined}
          onUpdateTitle={handleHistoryTitleUpdate}
          onDelete={handleDeleteHistory}
          onRestore={handleHistoryRestore}
          lang={lang}
       />
    </div>
  );

  // --- MAIN RENDER ---
  return (
    <div className="min-h-screen bg-[#050505] text-[#EAEAEA] font-sans selection:bg-lux-gold selection:text-black overflow-x-hidden" ref={topRef}>
      
      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#080808]/90 backdrop-blur-md h-20 flex items-center">
         <div className="w-full px-8 md:px-12 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-lux-gold to-lux-gold-light flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                  <Wand2 size={20} className="text-black" />
               </div>
               <span className="font-serif text-2xl tracking-[0.15em] text-lux-white font-bold hidden md:block">VISIONARY <span className="text-lux-gold text-xs align-top opacity-80 font-mono">v5.0</span></span>
               <span className="font-serif text-xl tracking-widest text-lux-gold md:hidden">VISIONARY</span>
            </div>
            
            <div className="flex items-center gap-8">
                {/* Viewing History Indicator */}
                {viewingHistoryId && (
                    <div className="hidden md:flex items-center gap-2 bg-blue-900/20 border border-blue-500/30 px-3 py-1 rounded-full text-blue-300 text-xs font-mono animate-pulse">
                        <History size={12} />
                        {t('正在回溯历史记忆...', 'Accessing Memory...')}
                    </div>
                )}

                <button onClick={() => setLang(l => l === 'CN' ? 'EN' : 'CN')} className="text-xs font-mono text-gray-500 hover:text-white transition-colors flex items-center gap-2 border border-white/10 px-3 py-1 rounded hover:border-lux-gold">
                    <Globe size={12}/> {lang}
                </button>
                <div className="hidden xl:flex items-center gap-2">
                    {[
                      { s: LayerStep.GLOBAL_FIELD, l: 'Global' },
                      { s: LayerStep.SUBJECT_SELECT, l: 'Subject' },
                      { s: LayerStep.SUBJECT_DETAILS, l: 'Details' },
                      { s: LayerStep.SCENE_LAYER, l: 'Scene' },
                      { s: LayerStep.POST_PROCESS, l: 'Mastering' },
                      { s: LayerStep.SYNTHESIS, l: 'Export' }
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center">
                            <div className={`
                                flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all
                                ${step === item.s ? 'bg-lux-gold text-black font-bold' : step > item.s ? 'text-lux-gold' : 'text-gray-700'}
                            `}>
                                {step === item.s && <Circle size={6} fill="black" />}
                                {item.l}
                            </div>
                            {idx < 5 && <div className={`w-4 h-[1px] ${step > item.s ? 'bg-lux-gold/30' : 'bg-gray-800'}`} />}
                        </div>
                    ))}
                </div>
            </div>
         </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="pt-32 pb-40 w-full px-6 md:px-12 min-h-screen flex flex-col items-center">
         <div className="w-full max-w-[1800px]">
            {step === LayerStep.GLOBAL_FIELD && renderGlobal()}
            {step === LayerStep.SUBJECT_SELECT && renderSubjectSelect()}
            {step === LayerStep.SUBJECT_DETAILS && renderSubjectDetails()}
            {step === LayerStep.SCENE_LAYER && renderScene()}
            {step === LayerStep.POST_PROCESS && renderPostProcess()}
            {step === LayerStep.SYNTHESIS && renderSynthesis()}
         </div>
      </main>

      {/* FOOTER NAV */}
      <footer className="fixed bottom-0 w-full z-50 border-t border-white/5 bg-[#080808]/95 backdrop-blur-xl h-24 flex items-center">
         <div className="w-full px-8 md:px-12 flex items-center justify-between">
            <button 
              onClick={handleBack}
              disabled={step === LayerStep.GLOBAL_FIELD}
              className="flex items-center gap-3 text-gray-500 hover:text-white disabled:opacity-0 transition-all text-sm uppercase tracking-[0.2em] font-mono group"
            >
              <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform"/> {t('上一步', 'Back')}
            </button>

            <button 
              onClick={handleNext}
              disabled={step === LayerStep.SUBJECT_SELECT && !state.subjectType}
              className={`
                flex items-center gap-4 px-12 py-4 rounded-full font-serif text-base tracking-[0.2em] font-bold shadow-2xl transition-all duration-500
                ${step === LayerStep.SYNTHESIS 
                  ? 'bg-white/5 text-gray-600 cursor-not-allowed opacity-0 pointer-events-none' 
                  : (step === LayerStep.SUBJECT_SELECT && !state.subjectType)
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-50'
                    : 'bg-lux-gold text-black hover:bg-[#E5C558] hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.3)]'
                }
              `}
            >
               {step === LayerStep.POST_PROCESS ? t('生成指令', 'GENERATE PROMPT') : t('下一步', 'NEXT STEP')}
               {step !== LayerStep.POST_PROCESS && <ChevronRight size={18} />}
            </button>
            
            {step === LayerStep.SYNTHESIS && (
                 <button 
                   onClick={handleNewCreation}
                   className="flex items-center gap-3 text-lux-gold hover:text-white transition-all text-sm uppercase tracking-[0.2em] font-mono group"
                 >
                   {t('新创作', 'New Creation')} <Wand2 size={18} className="group-hover:rotate-90 transition-transform"/>
                 </button>
            )}
         </div>
      </footer>

    </div>
  );
}

export default App;