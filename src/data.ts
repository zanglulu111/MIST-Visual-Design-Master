
import { OptionItem, OptionGroup, GlobalFieldState, HumanEngineState, CreatureEngineState, SceneState, PostProcessState } from './types';

// --- HELPERS ---
const opt = (id: string, labelCN: string, labelEN: string, prompt: string, assetTags: string[] = []): OptionItem => ({
  id, labelCN, labelEN, prompt, descCN: prompt, descEN: prompt, assetTags
});

const simpleOpt = (id: string, labelCN: string, labelEN: string, promptValue?: string): OptionItem => ({
  id, labelCN, labelEN, prompt: promptValue || id, 
});

// --- LAYER 0: GLOBAL OPTIONS ---

// 1. Medium
const grpMedPhoto: OptionGroup = {
  groupNameCN: "摄影与写实", groupNameEN: "Photography",
  options: [
    opt("med_cine", "电影级实拍", "Cinematic Shot", "Cinematic Shot, Movie Still, Live Action, Color Graded, ARRI Alexa, 35mm lens"),
    opt("med_film", "胶片摄影", "Analog Film", "Analog Film Photography, Film Grain, Vintage Texture, Kodak Portra 400, Fujifilm"),
    opt("med_studio", "影棚/广告", "Studio Photography", "Studio Photography, Commercial Look, Softbox Lighting, Clean Background, High Key, Sharp Focus"),
    opt("med_docu", "新闻纪实", "Documentary Photo", "Documentary Photography, Raw Style, Journalism, Candid, Leica M6, Natural Light"),
    opt("med_polaroid", "拍立得", "Polaroid", "Polaroid Photo, Instant Film, Flash Photography, Vignette, Soft focus, Imperfect"),
    opt("med_wetplate", "古法湿版", "Wet Plate", "Wet Plate Collodion, Tintype, 19th Century Photo, Scratched Texture, Black and White, Long Exposure"),
    opt("med_cctv", "监控/低清", "CCTV / Low Res", "CCTV Footage, Security Camera, Low Resolution, Glitchy, Night Vision, Grainy"),
    opt("med_drone", "航拍", "Drone View", "Drone Photography, Aerial View, Top-down Angle, High Altitude, DJI"),
  ]
};
const grpMed3D: OptionGroup = {
  groupNameCN: "三维与数字", groupNameEN: "3D & CGI",
  options: [
    opt("med_ue5", "虚幻引擎5", "Unreal Engine 5", "Unreal Engine 5 Render, 3D CGI, Ray Tracing, Lumen Global Illumination, 8k resolution, Hyper-realistic"),
    opt("med_octane", "Octane渲染", "Octane Render", "Octane Render, 3D Art, Path Tracing, Glass and Chrome Materials, Cinema4D, Redshift"),
    opt("med_clay", "黏土定格", "Claymation", "Claymation, Stop Motion Animation, Plasticine Texture, Fingerprints, Aardman style, Tilt-shift"),
    opt("med_iso", "等轴/微缩", "Isometric 3D", "Isometric 3D, Orthographic View, Miniature Diorama, Tilt-shift, Blender 3D, Clean background"),
    opt("med_lowpoly", "低多边形", "Low Poly", "Low Poly 3D, Geometric Facets, Minimalist Game Art, Flat Shading, PS1 graphics, Retro gaming"),
    opt("med_voxel", "体素/像素3D", "Voxel Art", "Voxel Art, Minecraft Style, Blocky, 3D Pixel Art, MagicaVoxel, Lego style"),
    opt("med_sculpt", "数字雕刻", "Digital Sculpt", "ZBrush Sculpt, Digital Clay, Grey Model, High Poly Detail, Matcap grey, Work in progress"),
  ]
};
const grpMed2D: OptionGroup = {
  groupNameCN: "插画与动漫", groupNameEN: "2D Illustration & Anime",
  options: [
    opt("med_anime_90", "90s赛璐璐", "90s Anime", "90s Anime Style, Cel Shaded, Retro Anime, Hand Drawn, VHS glitch, Cowboy Bebop style"),
    opt("med_anime_mod", "现代二次元", "Modern Anime", "Modern Anime Style, Clean Lines, Vibrant Colors, Kyoto Animation style, High resolution, Detailed eyes"),
    opt("med_vector", "矢量插画", "Vector Art", "Vector Art, Adobe Illustrator, Flat Design, Solid Colors, No outlines, Minimalist"),
    opt("med_concept", "概念设计稿", "Concept Art", "Concept Art, Digital Painting, Speedpaint, Rough Brushstrokes, ArtStation Trending, Fantasy"),
    opt("med_comic", "美漫风格", "Comic Book", "Comic Book Art, Bold Outlines, Halftone Dots, Ink Lines, Graphic Novel, Marvel style"),
    opt("med_manga", "黑白日漫", "Manga B&W", "Manga Style, Black and White, Screen Tones, Ink Pen, Junji Ito style, Berserk style"),
    opt("med_pixel", "2D像素画", "Pixel Art", "Pixel Art, 16-bit Graphics, Retro Game Sprite, SNES style, Dithering"),
  ]
};
const grpMedTrad: OptionGroup = {
  groupNameCN: "传统手绘", groupNameEN: "Traditional Art",
  options: [
    opt("med_oil", "古典油画", "Oil Painting", "Oil Painting, Thick Impasto, Canvas Texture, Visible Brushstrokes, Classical, Masterpiece"),
    opt("med_water", "水彩画", "Watercolor", "Watercolor Painting, Wet-on-wet, Paper Texture, Soft Bleed, Pastel colors, Artistic"),
    opt("med_ink", "水墨/素描", "Ink / Sketch", "Ink Wash Painting, Sumi-e, Charcoal Sketch, Graphite Pencil, Black and white, Rough"),
    opt("med_print", "木刻版画", "Woodblock Print", "Woodblock Print, Linocut, Ukiyo-e Style, Stamp Texture, Bold lines, Limited palette"),
    opt("med_crayon", "蜡笔/儿童画", "Crayon Drawing", "Crayon Drawing, Child's Drawing, Scribbles, Rough Texture, Naive art, Colorful"),
    opt("med_blueprint", "工程蓝图", "Blueprint", "Blueprint Schematic, Technical Drawing, White Lines on Blue, Diagram, Architectural, Precise"),
  ]
};
const mediumOptions: OptionGroup[] = [grpMedPhoto, grpMed3D, grpMed2D, grpMedTrad];

// 2. Visual Soul
const soulCult: OptionGroup = {
  groupNameCN: "邪典与新浪潮", groupNameEN: "Cult & New Wave",
  options: [
    opt("soul_jodorowsky", "佐杜洛夫斯基", "Jodorowsky", "Alejandro Jodorowsky, Holy Mountain aesthetic, Surreal rituals, Tarot symbolism, Vibrant colors"),
    opt("soul_terayama", "寺山修司", "Shuji Terayama", "Shuji Terayama, Pastoral Noir, Painted faces, White makeup, Surreal Japanese theater, Avant-garde"),
    opt("soul_miike", "三池崇史", "Takashi Miike", "Takashi Miike, Yakuza aesthetic, Hyper-violence, Absurdist humor, Neon blood, Gritty textured"),
    opt("soul_tarantino", "昆汀", "Tarantino", "Quentin Tarantino, Nonlinear narrative vibe, Feet focus, Trunk shot, Retro 70s aesthetic, Yellow subtitles"),
    opt("soul_russell", "肯·罗素", "Ken Russell", "Ken Russell, Altered States, Hallucinogenic visual effects, Biological horror transformation"),
    opt("soul_noe", "加斯帕·诺", "Gaspar Noé", "Gaspar Noé, Enter the Void, Neon strobe lights, Overhead spinning camera, Disorienting colors"),
    opt("soul_cronenberg", "柯南伯格", "Cronenberg", "David Cronenberg, Body Horror, Flesh technology, Videodrome aesthetic, Visceral transformation"),
    opt("soul_waters", "约翰·沃特斯", "John Waters", "John Waters, Camp aesthetic, Trash culture, Exaggerated makeup, Kitsch"),
    opt("soul_angelopoulos", "安哲罗普洛斯", "Angelopoulos", "Theo Angelopoulos, Long takes, Misty landscapes, Melancholic blue hour, Silhouettes"),
    opt("soul_von_trier", "拉斯·冯·提尔", "Lars von Trier", "Lars von Trier, Handheld camera, Dogme 95, Raw realism, Bleak tones"),
    opt("soul_newwave", "法国新浪潮", "French New Wave", "French New Wave, Godard style, Jump cuts, Black and white, Handheld, Parisian street"),
    opt("soul_giallo", "铅黄恐怖", "Giallo", "Giallo Horror, Dario Argento, Vivid red blood, Stylized lighting, Black gloves, Mystery"),
    opt("soul_pinku", "粉红暴力", "Pinku Eiga", "Japanese Pinku Eiga, Soft focus, Retro 70s Japan, Exploitation aesthetic"),
    opt("soul_midnight", "午夜电影", "Midnight Movie", "Midnight Movie aesthetic, Grindhouse, Film grain, B-Movie charm, Low budget creative"),
    opt("soul_psychedelic", "迷幻摇滚", "Psychedelic", "Psychedelic Rock Poster style, Liquid light show, Swirling colors, 60s Acid trip"),
  ]
};
const soulDesign: OptionGroup = {
  groupNameCN: "构图与设计", groupNameEN: "Composition & Design",
  options: [
    opt("soul_wes", "韦斯·安德森", "Wes Anderson", "Wes Anderson Style, Symmetrical Composition, Pastel Palette, Flat Lighting, Whimsical"),
    opt("soul_kubrick", "库布里克", "Stanley Kubrick", "Stanley Kubrick, One-point Perspective, Clinical Coldness, The Shining Carpet Pattern, Unsettling"),
    opt("soul_wong", "王家卫", "Wong Kar-wai", "Wong Kar-wai, Step Printing, Neon Green and Red, Cinematic Blur, Intimate, Melancholic"),
    opt("soul_lynch", "大卫·林奇", "David Lynch", "David Lynch, Red Room, Dreamlike, Uncanny Valley, Flashbulb lighting"),
    opt("soul_hopper", "爱德华·霍普", "Edward Hopper", "Edward Hopper, Urban Solitude, Geometric Shadows, Window Light, Melancholic"),
    opt("soul_mondrian", "蒙德里安", "Piet Mondrian", "Piet Mondrian Style, De Stijl, Primary Colors (Red Blue Yellow), Black Grid Lines, Flat"),
    opt("soul_bauhaus", "包豪斯", "Bauhaus", "Bauhaus Style, Form Follows Function, Geometric Shapes, Minimalist, Concrete and Glass"),
    opt("soul_memphis", "孟菲斯设计", "Memphis Design", "Memphis Design, 80s Postmodernism, Squiggly Lines, Clashing Colors, Geometric Patterns"),
    opt("soul_vapor_aest", "蒸汽美学", "Vaporwave Aesthetic", "Vaporwave Aesthetic, Roman Busts, Grid Background, Pink and Teal, 90s Web"),
    opt("soul_scandi", "北欧极简", "Scandinavian Design", "Scandinavian Design, Hygge, Minimalist Wood, White Interiors, Natural Light, Cozy"),
    opt("soul_brutalist", "野兽派", "Brutalist", "Brutalist Architecture, Raw Concrete, Massive Scale, Blocky Shapes, Monochromatic Grey"),
    opt("soul_isometric", "等轴视角", "Isometric View", "Isometric View, Orthographic Projection, 3D Diorama, Clean Background, Miniature"),
  ]
};
const soulDark: OptionGroup = {
  groupNameCN: "黑暗与恐怖", groupNameEN: "Dark, Horror & Noir",
  options: [
    opt("soul_fincher", "大卫·芬奇", "David Fincher", "David Fincher, Low-key Lighting, Green-Yellow Grading, Clinical, High Contrast"),
    opt("soul_giger", "H.R. 吉格尔", "H.R. Giger", "H.R. Giger, Biomechanical, Xenomorph Style, Ribs and Bones, Monochromatic Grey"),
    opt("soul_beksinski", "贝克辛斯基", "Zdzisław Beksiński", "Zdzisław Beksiński, Nightmare Surrealism, Skeletal Structures, Rusty Orange fog"),
    opt("soul_burton", "蒂姆·波顿", "Tim Burton", "Tim Burton, Gothic Whimsy, Pale Skin, Dark Stripes, Twisted Trees, Spooky"),
    opt("soul_lovecraft", "洛夫克拉夫特", "Lovecraftian", "Lovecraftian Horror, Cthulhu Mythos, Tentacles, Cosmic Dread, Non-Euclidean"),
    opt("soul_junji", "伊藤润二", "Junji Ito", "Junji Ito, Body Horror, Spirals, Black and White Manga, Unsettling Eyes"),
    opt("soul_noir", "黑色电影", "Film Noir", "Classic Film Noir, Chiaroscuro Lighting, Venetian Blinds Shadows, Black and White, Detective"),
    opt("soul_hitchcock", "希区柯克", "Alfred Hitchcock", "Alfred Hitchcock, Suspense, Vertigo Effect, Sharp Shadows, 50s Technicolor"),
    opt("soul_del_toro", "德尔·托罗", "Guillermo del Toro", "Guillermo del Toro, Dark Fairy Tale, Clockwork Mechanisms, Amber Lighting, Monsters"),
    opt("soul_silenthill", "寂静岭", "Silent Hill", "Silent Hill Aesthetic, Heavy Fog, Rusty Metal, Decay, Ash Falling, Psychological Horror"),
    opt("soul_souls", "魂系(宫崎英高)", "Dark Souls", "Dark Souls Style, FromSoftware, Decaying Kingdom, Medieval Ruin, Fog Gates, Despair"),
    opt("soul_bloodborne", "血源诅咒", "Bloodborne", "Bloodborne Style, Victorian Gothic Horror, Lovecraftian Beasts, Blood Moon, Cobblestones"),
    opt("soul_sin_city", "罪恶之城", "Sin City", "Sin City Style, Frank Miller, High Contrast B&W with Splash of Red, Comic Noir"),
    opt("soul_midsommar", "仲夏夜(阿里)", "Midsommar", "Ari Aster, Midsommar, Bright Horror, Daylight Nightmare, Flower Crowns, Unsettling"),
  ]
};
const soulNeon: OptionGroup = {
  groupNameCN: "霓虹与情绪", groupNameEN: "Neon, Color & Mood",
  options: [
    opt("soul_blade", "银翼杀手", "Blade Runner", "Blade Runner, Cyberpunk Noir, Rain and Neon, Holograms, Blue and Orange"),
    opt("soul_refn", "雷弗恩", "Nicolas Winding Refn", "Nicolas Winding Refn, Neon Demon, High Contrast Neon, Red and Blue, Glossy"),
    opt("soul_tron", "创:战纪", "Tron Legacy", "Tron Legacy Style, Glowing Grid, Black Background, Neon Lines, Digital World"),
    opt("soul_euphoria", "亢奋(美剧)", "Euphoria", "Euphoria HBO Style, Glitter, Purple and Blue Lighting, Bokeh, Gen Z Aesthetic"),
    opt("soul_moonlight", "月光男孩", "Moonlight", "Moonlight Movie, Rich Skin Tones, High Contrast Blue and Purple, Intimate"),
    opt("soul_miami", "迈阿密风云", "Miami Vice", "Miami Vice 80s, Pink and Teal, Palm Trees, Sunset, Synthwave, Grainy"),
    opt("soul_cyber2077", "赛博朋克2077", "Cyberpunk 2077", "Cyberpunk 2077, Night City, Trash and Tech, Kitsch and Neokitsch, Glitch"),
    opt("soul_matrix", "黑客帝国", "The Matrix", "The Matrix, Green Tint, Code Rain, Late 90s Cyber, Black Leather, Bullet Time"),
    opt("soul_shinkai", "新海诚", "Makoto Shinkai", "Makoto Shinkai, Hyper-realistic Sky, Lens Flare, Vibrant Blue, Emotional"),
    opt("soul_ghibli", "宫崎骏", "Studio Ghibli", "Studio Ghibli, Hayao Miyazaki, Lush Nature, Fluffy Clouds, Watercolor Backgrounds"),
    opt("soul_paprika", "红辣椒(今敏)", "Paprika", "Paprika Anime, Satoshi Kon, Dream Parade, Riot of Colors, Confetti, Surreal"),
    opt("soul_akira", "阿基拉", "Akira", "Akira Anime, Katsuhiro Otomo, Cyberpunk Tokyo, Red Bike, Light Trails, Detailed Debris"),
    opt("soul_ghost", "攻壳机动队", "Ghost in the Shell", "Ghost in the Shell (1995), Mamoru Oshii, City Reflections, Philosophic Mood, Greenish Haze"),
    opt("soul_spider", "蜘蛛侠平行宇宙", "Spider-Verse", "Into the Spider-Verse, Halftone Dots, Chromatic Aberration, Glitch, Graffiti"),
    opt("soul_arcane", "双城之战", "Arcane", "Arcane League of Legends, Fortiche Style, Painted Textures, Steampunk/Zaun, Dynamic Lighting"),
  ]
};
const soulEpic: OptionGroup = {
  groupNameCN: "史诗与科幻", groupNameEN: "Epic, Scale & Scifi",
  options: [
    opt("soul_denis", "维伦纽瓦", "Denis Villeneuve", "Denis Villeneuve, Dune Style, Brutalism, Monochromatic Sand, Megalophobia"),
    opt("soul_nolan", "诺兰", "Christopher Nolan", "Christopher Nolan, IMAX Scale, Practical Effects, Cold Tones, Sharp Focus"),
    opt("soul_lucas", "星球大战", "Star Wars", "Star Wars Aesthetic, Ralph McQuarrie, Space Opera, Used Future, Lightsabers"),
    opt("soul_trek", "星际迷航", "Star Trek", "Star Trek Aesthetic, Clean Futurism, Starship Bridge, Lens Flares (JJ Abrams), Utopia"),
    opt("soul_cameron", "阿凡达", "Avatar", "James Cameron, Avatar Pandora, Bioluminescent Jungle, Floating Mountains, Blue Aliens"),
    opt("soul_jackson", "指环王", "Lord of the Rings", "Peter Jackson, Lord of the Rings, New Zealand Landscape, High Fantasy, Epic Battle"),
    opt("soul_stalenhag", "斯塔伦海格", "Simon Stålenhag", "Simon Stålenhag, Tales from the Loop, Swedish Rural 80s + Robots, Foggy"),
    opt("soul_mead", "席德·米德", "Syd Mead", "Syd Mead, Futurist Concept Art, Sleek Vehicles, Neo-Futurism, Clean Lines"),
    opt("soul_moebius", "墨必斯", "Moebius", "Moebius (Jean Giraud), Ligne Claire, Sci-Fi Desert, Pastel Colors, Surreal Creatures"),
    opt("soul_frazetta", "弗雷泽塔", "Frank Frazetta", "Frank Frazetta, Conan Style, Muscular Heroes, Dark Fantasy, Oil Painting, Dynamic"),
    opt("soul_dore", "多雷(版画)", "Gustave Doré", "Gustave Doré, Wood Engraving, Dante's Inferno, Biblical Epic, Dramatic Light beams"),
    opt("soul_martin", "约翰·马丁", "John Martin", "John Martin, Apocalyptic Landscapes, Tiny Figures, Massive Destruction, Romanticism"),
    opt("soul_friedrich", "弗里德里希", "Caspar David Friedrich", "Caspar David Friedrich, Wanderer above the Sea of Fog, Romanticism, Sublime Nature"),
    opt("soul_madmax", "疯狂的麦克斯", "Mad Max", "Mad Max Fury Road, George Miller, Wasteland, High Saturation Orange and Teal, Explosions"),
  ]
};
const soulSurreal: OptionGroup = {
  groupNameCN: "超现实与抽象", groupNameEN: "Surreal & Abstract",
  options: [
    opt("soul_dali", "达利", "Salvador Dali", "Salvador Dali, Melting Clocks, Surreal Desert, Dream Logic, Long Shadows"),
    opt("soul_magritte", "马格利特", "René Magritte", "René Magritte, Surrealism, Bowler Hat, Green Apple, Floating Rocks, Blue Sky with Clouds"),
    opt("soul_escher", "埃舍尔", "M.C. Escher", "M.C. Escher, Impossible Geometry, Infinite Staircase, Tessellation, Black and White Sketch"),
    opt("soul_kusama", "草间弥生", "Yayoi Kusama", "Yayoi Kusama, Polka Dots, Infinity Mirrors, Vibrant Pumpkins, Psychedelic"),
    opt("soul_murakami", "村上隆", "Takashi Murakami", "Takashi Murakami, Superflat, Smiling Flowers, Anime Pop, Psychedelic Colors"),
    opt("soul_bosch", "博斯", "Hieronymus Bosch", "Hieronymus Bosch, Garden of Earthly Delights, Chaos, Strange Hybrid Creatures, Medieval Surrealism"),
    opt("soul_alice", "爱丽丝幻境", "Alice in Wonderland", "Alice in Wonderland Aesthetic, Mushroom Forest, Checkerboard, Mad Hatter, Fantasy"),
    opt("soul_inception", "盗梦空间", "Inception", "Inception Style, Folding Cities, Gravity Defying, Architectural Paradox"),
    opt("soul_drstrange", "奇异博士", "Doctor Strange", "Doctor Strange Style, Fractal Geometry, Mirror Dimension, Kaleidoscope effect"),
    opt("soul_tool", "Tool乐队MV", "Tool Music Video", "Tool Band Video Style, Stop Motion, Dark Surrealism, Eyes, Flesh textures"),
  ]
};
const soulPaint: OptionGroup = {
  groupNameCN: "画家与插画", groupNameEN: "Painters & Illustration",
  options: [
    opt("soul_vangogh", "梵高", "Vincent van Gogh", "Vincent van Gogh, Starry Night Style, Swirling Brushstrokes, Thick Impasto, Vibrant Yellow and Blue"),
    opt("soul_monet", "莫奈", "Claude Monet", "Claude Monet, Impressionism, Water Lilies, Soft Dappled Light, Garden Atmosphere"),
    opt("soul_rembrandt", "伦勃朗", "Rembrandt", "Rembrandt, Baroque, Chiaroscuro (Light and Shadow), Dark Background, Emotional Portrait"),
    opt("soul_klimt", "克里姆特", "Gustav Klimt", "Gustav Klimt, The Kiss Style, Gold Leaf, Decorative Patterns, Art Nouveau, Erotic"),
    opt("soul_picasso", "毕加索", "Pablo Picasso", "Pablo Picasso, Cubism, Fragmented Faces, Abstract Geometric, Blue Period"),
    opt("soul_basquiat", "巴斯奎特", "Basquiat", "Jean-Michel Basquiat, Neo-expressionism, Graffiti, Crown Motif, Chaotic Scribbles"),
    opt("soul_banksy", "班克西", "Banksy", "Banksy Style, Stencil Art, Graffiti, Black and White with Red, Satirical"),
    opt("soul_rockwell", "洛克威尔", "Norman Rockwell", "Norman Rockwell, Americana, Idealized Realism, Storybook Illustration, Warm Expressions"),
    opt("soul_mucha", "穆夏", "Alphonse Mucha", "Alphonse Mucha, Art Nouveau Poster, Flowing Hair, Halo, Pastel Colors"),
    opt("soul_leyendecker", "莱恩德克", "J.C. Leyendecker", "J.C. Leyendecker, Sharp Brushstrokes, Elegant Men, Golden Age Illustration"),
    opt("soul_ghirlandaio", "文艺复兴肖像", "Renaissance Portrait", "Domenico Ghirlandaio, Quattrocento Style, Profile Portrait, Tempera Paint"),
    opt("soul_waterhouse", "前拉斐尔派", "Pre-Raphaelite", "John William Waterhouse, Pre-Raphaelite, Mythological, Romantic, Detailed Nature"),
  ]
};
const soulLens: OptionGroup = {
  groupNameCN: "摄影与镜头", groupNameEN: "Photography & Lens",
  options: [
    opt("lens_35mm", "35mm 胶片", "35mm Film", "Shot on 35mm Film, Kodak Portra 400, Film Grain, Analog Texture, Warm Tones"),
    opt("lens_imax", "IMAX 70mm", "IMAX 70mm", "IMAX 70mm, Shot on Arri Alexa 65, Incredible Detail, Epic Scale, Shallow Depth of Field"),
    opt("lens_leica", "徕卡黑白", "Leica B&W", "Shot on Leica M6, Kodak Tri-X 400, High Contrast B&W, Street Photography"),
    opt("lens_polaroid", "拍立得", "Polaroid", "Polaroid Photo, Vintage aesthetic, Flash photography, Soft vignetting, Imperfect"),
    opt("lens_drone", "无人机上帝视角", "Drone View", "Drone Photography, Top-down View, God's Eye View, High Altitude, Geometric Landscape"),
    opt("lens_gopro", "GoPro/鱼眼", "GoPro / Fisheye", "GoPro Footage, Fisheye Lens, Wide Angle Distortion, Action Cam, First Person View"),
    opt("lens_bokeh", "极致虚化", "Bokeh / Macro", "f/1.2 Aperture, Shallow Depth of Field, Bokeh Background, Macro Lens, Sharp Eyes"),
    opt("lens_editorial", "时尚杂志", "Vogue Editorial", "Vogue Editorial, Studio Lighting, Softbox, High Fashion Pose, Retouched"),
    opt("lens_natgeo", "国家地理", "National Geographic", "National Geographic Style, Steve McCurry, Steve Winter, Vivid Colors, Human Interest"),
    opt("lens_cctv", "监控录像", "CCTV", "CCTV Footage, Security Camera, Low Resolution, Grainy, Night Vision Green"),
    opt("lens_thermal", "热成像", "Thermal", "Thermal Imaging, Heat Map, Infrared Camera, Predator Vision"),
    opt("lens_wetplate", "湿版摄影", "Wet Plate", "Wet Plate Collodion, Tin Type Photography, 19th Century, Scratched Texture, Long Exposure"),
  ]
};
const visualSoulOptions: OptionGroup[] = [soulCult, soulDesign, soulDark, soulNeon, soulEpic, soulSurreal, soulPaint, soulLens];

// 3. Visual Base
const grpMythic: OptionGroup = {
  groupNameCN: "远古与神话", groupNameEN: "Prehistoric & Mythic",
  options: [
    opt("base_iceage", "冰河时代", "Ice Age", "Ice Age, Pleistocene, Woolly Mammoths, Glaciers, Cave painting style"),
    opt("myth_cn_classic", "中国神话(正统)", "Chinese Mythology (Classic)", "Chinese Mythology, Taoist Pantheon, Dunhuang Mural Style, Divine Golden Clouds, Majestic, Sacred"),
    opt("myth_cn_wuxia", "中国武侠(江湖)", "Wuxia / Martial Arts", "Wuxia Aesthetic, Jianghu, Martial Arts Motion, Bamboo Forest, Ink Wash Atmosphere, Heroic"),
    opt("myth_cn_xianxia", "中国仙侠(修真)", "Xianxia / Cultivation", "Xianxia Fantasy, Cultivation World, Ethereal Floating Mountains, Flying Swords, Pastel Aura, Immortal"),
    opt("myth_in", "印度神话", "Indian Mythology", "Indian Mythology, Vedic Fantasy, Vibrant Saturation, Golden Light, Mandala Patterns"),
    opt("myth_gr", "希腊神话", "Greek Mythology", "Greek Mythology, Mount Olympus, White Marble, Ambrosia Light, Divine Blue Sky"),
    opt("myth_rm", "罗马神话", "Roman Mythology", "Roman Mythology, Imperial Grandeur, Red and Gold, Mars Aesthetic, Epic Scale"),
    opt("myth_nr", "北欧神话", "Norse Mythology", "Norse Mythology, Yggdrasil, Magical Runes, Cold Mist, Bifrost Colors"),
    opt("base_jurassic", "侏罗纪/蛮荒", "Jurassic / Primeval", "Prehistoric, Primeval Jungle, Volumetric Mist, Savage Nature, Giant Ferns"),
    opt("base_atlantis", "亚特兰蒂斯", "Atlantis", "Atlantis Ruins, Underwater, Bioluminescent Blue, Ancient Tech, Wet Marble"),
  ]
};
const grpAncient: OptionGroup = {
  groupNameCN: "古典文明", groupNameEN: "Ancient Civilizations",
  options: [
    opt("civ_pre_qin", "华夏(先秦)", "Pre-Qin / Bronze Age", "Pre-Qin Dynasty, Bronze Age China, Sanxingdui aesthetic, Oracle bone script, Ritual bronze ware"),
    opt("civ_egypt", "古埃及", "Ancient Egypt", "Ancient Egypt, Pharaonic, Desert Sunlight, Sandstone, Lapis Lazuli"),
    opt("civ_greece", "古希腊", "Ancient Greece", "Ancient Greece, Acropolis, Mediterranean Blue, Olive Groves, White Stone"),
    opt("civ_rome", "古罗马", "Ancient Rome", "Ancient Rome, Roman Empire, Colosseum, Military Order, Marble and Silk, Grandeur"),
    opt("civ_han_tang", "华夏(汉唐)", "Ancient China (Han/Tang)", "Ancient China, Han Dynasty, Grand Palace, Vermilion Walls, Epic History"),
    opt("civ_qing", "华夏(清朝)", "Ancient China (Qing)", "Qing Dynasty, Manchu Architecture, Intricate Embroidery, Indigo Patterns, Forbidden City"),
    opt("civ_japan", "日本(江户)", "Feudal Japan (Edo)", "Feudal Japan, Edo Period, Wabi-sabi Wood, Paper Lanterns, Cherry Blossoms"),
    opt("civ_aztec", "玛雅/阿兹特克", "Maya / Aztec", "Aztec, Maya, Deep Jungle, Step Pyramids, Stone Carvings, Mystical Green"),
  ]
};
const grpMedieval: OptionGroup = {
  groupNameCN: "中世纪与前现代", groupNameEN: "Medieval & Pre-Modern",
  options: [
    opt("base_medieval", "欧洲中世纪", "Medieval Europe", "Medieval Europe, Stone Castle, Torchlight, Cold Grey, Gritty Realism"),
    opt("base_gothic", "哥特宗教", "Gothic / Religious", "Gothic Architecture, Stained Glass Light, Spire, Dark Atmosphere, Fog"),
    opt("base_renaissance", "文艺复兴", "Renaissance", "Renaissance Art, Florence, Oil Painting Texture, Soft Window Light, Velvet"),
    opt("base_arabian", "阿拉伯之夜", "Arabian Nights", "Islamic Golden Age, Geometric Patterns, Warm Desert Dusk, Oasis, Grand Bazaar"),
    opt("base_pirate", "大航海时代", "Age of Discovery", "Pirate Era, Nautical, Worn Wood, Ocean Mist, Salt Water, Adventure"),
  ]
};
const grpRetro: OptionGroup = {
  groupNameCN: "复古怀旧", groupNameEN: "Retro & Nostalgia",
  options: [
    opt("retro_victorian", "维多利亚", "Victorian Era", "Victorian London, Industrial Smog, Gaslight, Brick Texture, Sepia Tone"),
    opt("retro_west", "美国西部", "Wild West", "Wild West, Golden Hour, Dusty Desert, Warm Orange, Frontier"),
    opt("retro_noir", "黑色电影", "Film Noir", "Film Noir, High Contrast B&W, Chiaroscuro Shadows, Rain-slicked"),
    opt("retro_hippie", "嬉皮士", "Hippie 60s", "1960s Hippie, Psychedelic Colors, Tie-dye, Film Grain, Flower Power"),
    opt("retro_hk", "港风复古", "Hong Kong 90s", "90s Hong Kong, Wong Kar-wai Vibe, Neon Green and Red, Nostalgic Haze"),
    opt("retro_jp_80s", "日系泡沫", "Japan 80s City Pop", "80s Japan City Pop, Bright City Lights, Anime Realism, Glossy, Summer"),
    opt("retro_vapor", "蒸汽波", "Vaporwave", "Vaporwave, 90s CGI, Pastel Gradients, Lo-fi, Surreal Dream"),
    opt("retro_synth", "合成汽波", "Synthwave", "Synthwave, Retrowave, Neon Grid, Magenta and Cyan, High Contrast"),
    opt("retro_y2k", "千禧年", "Y2K Aesthetic", "Y2K Aesthetic, Metallic Sheen, Matrix Green, Wide Angle Fisheye"),
  ]
};
const grpModern: OptionGroup = {
  groupNameCN: "现代地缘", groupNameEN: "Modern Geo-Context",
  options: [
    opt("mod_cn", "现代中国", "Modern China", "Modern China, Massive Infrastructure, Humid Atmosphere, Mix of Old and New"),
    opt("mod_jp", "现代日本", "Modern Japan", "Modern Japan, Clean Sharp Focus, Cool Blue Tones, Transparent Air, Orderly"),
    opt("mod_usa", "现代美国", "Modern USA", "Modern USA, Urban Realism, Concrete and Glass, Cinematic Lighting, Diverse"),
    opt("mod_eu", "现代欧洲", "Modern Europe", "Modern Europe, Historic Architecture mixed with Modern, Overcast Light, Elegant"),
    opt("mod_south", "全球南方", "Global South", "Global South, Vibrant Colors, High Density, Warm Sunlight, Raw Texture"),
  ]
};

const grpSubculture: OptionGroup = {
  groupNameCN: "亚文化与时尚", groupNameEN: "Subcultures & Fashion",
  options: [
    opt("sub_hiphop", "嘻哈", "Hip-Hop 90s", "90s Hip Hop aesthetic, Boombox, Graffiti background, Oversized clothes"),
    opt("sub_hype", "潮流Hypebeast", "Hypebeast", "Modern Hypebeast, Street fashion, Limited edition sneakers, Brand logos, Clean urban"),
    opt("sub_gangsta", "匪帮说唱", "Gangsta Rap", "Gangsta Rap aesthetic, West Coast, Lowriders, Bandanas, Gold chains"),
    opt("sub_mumble", "墨菲斯说唱", "Mumble Rap", "SoundCloud Rapper aesthetic, Face tattoos, Dyed dreads, Colorful grills, Druggy vibe"),
    opt("sub_dopamine", "多巴胺穿搭", "Dopamine", "Dopamine Dressing, Rainbow bright colors, Clashing patterns, Joyful maximalism"),
    opt("sub_goth", "哥特/暗黑", "Goth", "Goth Subculture, Dark Romanticism, Black Lace, Pale Skin, Melancholic"),
    opt("sub_punk", "朋克", "Punk", "70s Punk, Anarchist, Safety Pins, Gritty Dirty, Graffiti Background"),
    opt("sub_grunge", "垃圾摇滚", "Grunge", "90s Grunge, Flannel Textures, Messy, Dark Moody Lighting"),
    opt("sub_techwear", "机能", "Techwear", "Techwear Fashion, Urban Ninja, Matte Black, Straps and Buckles"),
    opt("sub_highfashion", "高定时尚", "High Fashion", "High Fashion Editorial, Avant-garde, Studio Lighting, Exquisite Fabric"),
  ]
};

const grpFuture: OptionGroup = {
  groupNameCN: "未来与异界", groupNameEN: "Future & Otherworldly",
  options: [
    opt("fut_mars", "火星殖民地", "Mars Colony", "Mars Colony, Red dust, Domed cities, Terraforming"),
    opt("fut_moon", "月球基地", "Lunar Base", "Lunar Base, Grey crater landscape, Black sky, Earthrise"),
    opt("fut_station", "空间站", "Space Station", "Space Station Interior, Zero gravity, White padded walls, Porthole view"),
    opt("fut_near", "近未来", "Near Future", "Near Future, Augmented Reality glasses, Subtle tech integration, Realistic 2030s"),
    opt("fut_post_human", "后人类纪元", "Post-Human", "Post-Human Era, AI civilization, Dyson Sphere, Matrioshka Brain, Abstract tech"),
    opt("fut_bio_ship", "生物飞船", "Bio-Ship", "Living Spaceship, Organic walls, Veins and pulses, Giger-esque interior"),
    opt("fut_dystopia", "反乌托邦", "Dystopia", "Near-Future Dystopia, Surveillance State, Cold concrete, Oppressive Grey"),
    opt("fut_solarpunk", "太阳朋克", "Solarpunk", "Solarpunk, Eco-Futurism, Bright Sunlight, White and Green, Clean"),
    opt("fut_waste", "废土末世", "Wasteland", "Post-Apocalyptic, Ruins, Overgrown, Rusty Texture, Dusty"),
    opt("fut_space", "太空歌剧", "Space Opera", "Space Opera, Galactic Scale, Starry Void, High Tech Metal, Cinematic"),
    opt("fut_void", "虚空/梦核", "Void / Liminal", "Liminal Space, Dreamcore, Abstract Void, Unsettling Silence, Flat Light"),
  ]
};

const visualBaseOptions: OptionGroup[] = [
  grpMythic, grpAncient, grpMedieval, grpRetro, grpModern, grpSubculture, grpFuture
];

// 4. Tech Overlay
const grpTechMech: OptionGroup = {
  groupNameCN: "模拟与机械", groupNameEN: "Analog & Mechanical",
  options: [
    opt("tech_steam", "蒸汽朋克", "Steampunk", "Steampunk, Brass Gears, Copper Pipes, Steam Powered, Victorian Engineering, Clockwork"),
    opt("tech_clock", "发条/钟表", "Clockpunk", "Clockpunk, Intricate Clockwork, Golden Gears, Wind-up Mechanisms, Precision Engineering"),
    opt("tech_diesel", "柴油朋克", "Dieselpunk", "Dieselpunk, Heavy Rusty Steel, Black Smoke, Internal Combustion, Riveted Armor"),
    opt("tech_atom", "原子朋克", "Atompunk", "Atompunk, 1950s Retro-Futurism, Vacuum Tubes, Chrome and Plastic, Nuclear Power"),
  ]
};
const grpTechDigi: OptionGroup = {
  groupNameCN: "数字与能量", groupNameEN: "Digital & Energy",
  options: [
    opt("tech_cyber", "赛博朋克", "Cyberpunk", "Cyberpunk, Advanced Circuitry, Neon Holograms, Chrome Prosthetics, Data Cables, LED Displays"),
    opt("tech_crystal", "晶体/光棱", "Crystal Tech", "Crystal Technology, Glowing Prisms, Refractive Light Energy, Floating Shards, Translucent Geometry"),
    opt("tech_glitch", "故障/数据", "Glitch Art", "Glitch Art, Datamoshing, Pixel Sorting, Broken Digital Screen, RGB Split, Visual Distortion"),
    opt("tech_nanotech", "纳米/流体", "Nanotech", "Nanotech, Liquid Metal, Morphing Shapes, Grey Goo, Seamless Tech, Swarm Intelligence"),
  ]
};
const grpTechBio: OptionGroup = {
  groupNameCN: "生物与有机", groupNameEN: "Biological & Organic",
  options: [
    opt("tech_bio", "生物朋克", "Biopunk", "Biopunk, Genetically Modified Flesh, Organic Technology, Pulsating Veins, Wet Texture"),
    opt("tech_insect", "虫群科技", "Insectoid Tech", "Insectoid Tech, Chitinous Armor, Amber Resin, Hexagonal Hive Structure, Organic Curves"),
    opt("tech_botanic", "植物共生", "Botanical Tech", "Botanical Technology, Solarpunk Tech, Living Wood Architecture, Bioluminescent Flora, Photosynthesis"),
    opt("tech_scavenge", "拾荒/拼凑", "Scavenger Tech", "Scavenger Tech, Makeshift Engineering, Duct Tape and Wire, Repurposed Junk, Rusty Scrap"),
  ]
};
const grpTechArcane: OptionGroup = {
  groupNameCN: "秘术与超自然", groupNameEN: "Arcane & Anomalous",
  options: [
    opt("tech_arcane", "高魔奥术", "Arcane Magic", "Arcane Magic, Glowing Runes, Floating Magic Circles, Mana Energy, Enchanted Gold"),
    opt("tech_alchemy", "炼金术", "Alchemy", "Alchemy, Transmutation Circles, Glass Flasks, Mercury and Gold, Occult Symbols"),
    opt("tech_eldritch", "克苏鲁/虚空", "Eldritch Tech", "Eldritch Tech, Alien Geometry, Non-Euclidean, Dark Purple Energy, Whispering Shadows"),
    opt("tech_steammag", "魔导蒸汽", "Magitech", "Magitech, Steam and Magic, Glowing Crystals in Brass, Fantasy Engineering"),
  ]
};
const techOverlayOptions: OptionGroup[] = [grpTechMech, grpTechDigi, grpTechBio, grpTechArcane];

// 5. Entropy
const grpEntOrder: OptionGroup = {
  groupNameCN: "低熵：秩序", groupNameEN: "Order & Perfection",
  options: [
    opt("ent_clinic", "临床无菌", "Clinical Sterile", "Clinical Sterile, White Lab Aesthetic, Dust--free, Stainless Steel, Cold Lighting"),
    opt("ent_divine", "神圣秩序", "Divine Purity", "Divine Purity, Angelic Atmosphere, Perfect Symmetry, Soft Golden Light, Untouched"),
    opt("ent_utopia", "乌托邦", "Utopian", "Utopian, Minimalist Architecture, Harmonious, Clean Lines, Bright Natural Light"),
    opt("ent_new", "崭新出厂", "Brand New", "Brand New, Pristine Condition, Factory Fresh, Glossy Surface, Unblemished"),
  ]
};
const grpEntBalance: OptionGroup = {
  groupNameCN: "平衡熵：生活", groupNameEN: "Life & Reality",
  options: [
    opt("ent_livedin", "生活气息", "Lived-in", "Lived-in, Warm Clutter, Personal Items, Authentic Texture, Cozy Atmosphere"),
    opt("ent_bustling", "繁华喧闹", "Bustling", "Bustling Atmosphere, Crowded, Visual Noise, Vibrant Colors, Street Dust"),
    opt("ent_worn", "陈旧怀旧", "Worn Texture", "Worn Texture, Faded Colors, Peeling Paint, Dusty Corners, Nostalgic Lighting"),
    opt("ent_nature", "自然风化", "Weathered", "Weathered by Nature, Sun-bleached, Mossy, Eroded Stone, Earthy Texture"),
  ]
};
const grpEntChaos: OptionGroup = {
  groupNameCN: "高熵：混乱", groupNameEN: "Chaos & Decay",
  options: [
    opt("ent_gritty", "脏乱/油污", "Gritty", "Gritty, Heavy Pollution, Grease and Grime, Wet Trash, Dark Shadows, Unsafe"),
    opt("ent_ruin", "废墟/遗弃", "Abandoned Ruins", "Abandoned Ruins, Decaying Structures, Overgrown Weeds, Broken Glass, Silent"),
    opt("ent_destruct", "毁灭/战损", "Destroyed", "Destroyed, War-torn, Bombardment Aftermath, Fire and Ash, Tragic"),
    opt("ent_rot", "腐烂/瘟疫", "Rotting", "Rotting, Decaying Organic Matter, Moldy, Sickly Green Atmosphere, Flies"),
  ]
};
const grpEntAbnormal: OptionGroup = {
  groupNameCN: "异常熵：扭曲", groupNameEN: "Abnormal & Distortion",
  options: [
    opt("ent_horror", "心理恐怖", "Psychological Horror", "Psychological Horror, Silent Hill Vibe, Heavy Fog, Rusty Blood, Unsettling Silence"),
    opt("ent_void", "虚无/阈限", "Liminal Space", "Liminal Space, Dreamcore, Uncanny Valley, Empty and Endless, Artificial Flat Light"),
    opt("ent_surreal", "超现实", "Surrealism", "Surrealism, Dream Logic, Floating Objects, Melting Textures, Distorted Perspective"),
  ]
};
const entropyOptions: OptionGroup[] = [grpEntOrder, grpEntBalance, grpEntChaos, grpEntAbnormal];

// Export Global Options Array for Layout
export const globalOptions = [
  { id: 'medium', titleCN: '渲染媒介', titleEN: 'Rendering Medium', options: mediumOptions },
  { id: 'visualSoul', titleCN: '视觉灵魂', titleEN: 'Visual Soul', options: visualSoulOptions },
  { id: 'visualBase', titleCN: '时空基底', titleEN: 'Visual Base', options: visualBaseOptions, multi: true, max: 3 },
  { id: 'techOverlay', titleCN: '科技动力', titleEN: 'Tech Overlay', options: techOverlayOptions },
  { id: 'entropy', titleCN: '环境熵值', titleEN: 'Entropy', options: entropyOptions },
];

// --- LAYER 1A: HUMAN ENGINE ---

// --- PROFESSION OPTIONS (NEW 120+ Items) ---

// A. Corporate & Elite
const grpProfCorp: OptionGroup = {
  groupNameCN: "商务与精英", groupNameEN: "Corporate & Elite",
  options: [
    simpleOpt("job_ceo", "CEO/霸总", "CEO", "CEO, Business Executive, Power Suit, Luxury Watch, High-rise Office background"),
    simpleOpt("job_banker", "银行家/华尔街", "Banker", "Wall Street Banker, Pinstripe Suit, Suspenders, Cigar, Greed"),
    simpleOpt("job_lawyer", "律师", "Lawyer", "Professional Lawyer, Sharp Suit, Holding Briefcase, Courtroom setting"),
    simpleOpt("job_detective", "侦探", "Detective", "Private Detective, Trench Coat, Fedora Hat, Smoking, Film Noir vibe"),
    simpleOpt("job_politician", "政客", "Politician", "Politician, Formal wear, American Flag pin, Speaking at podium"),
    simpleOpt("job_secretary", "秘书", "Secretary", "Secretary, Pencil Skirt, Blouse, Glasses, Holding clipboard"),
    simpleOpt("job_architect", "建筑师", "Architect", "Architect, Black Turtleneck, Holding Blueprints, Creative professional"),
    simpleOpt("job_professor", "教授", "Professor", "University Professor, Tweed Jacket, Elbow patches, Chalkboard background"),
    simpleOpt("job_journalist", "记者", "Journalist", "Journalist, Press Pass, Holding Microphone, Camera crew"),
  ]
};

// B. Blue Collar & Service
const grpProfLabor: OptionGroup = {
  groupNameCN: "蓝领与服务", groupNameEN: "Blue Collar & Service",
  options: [
    simpleOpt("job_mech", "机械师", "Mechanic", "Mechanic, Coveralls, Grease stains, Holding Wrench, Garage background"),
    simpleOpt("job_const", "建筑工", "Construction Worker", "Construction Worker, High-vis vest, Hard Hat, Safety gear"),
    simpleOpt("job_chef", "厨师", "Chef", "Head Chef, Chef's Whites uniform, Apron, Toque hat, Kitchen fire"),
    simpleOpt("job_waiter", "服务员", "Waiter/Waitress", "Waiter/Waitress, Uniform with Apron, Holding Tray with drinks"),
    simpleOpt("job_driver", "卡车司机", "Truck Driver", "Truck Driver, Flannel shirt, Mesh Cap, Truck cab interior"),
    simpleOpt("job_farmer", "农夫", "Farmer", "Farmer, Overalls, Straw Hat, Pitchfork, Rural field"),
    simpleOpt("job_miner", "矿工", "Miner", "Miner, Headlamp, Coal dust on face, Pickaxe, Underground"),
    simpleOpt("job_cleaner", "清洁工", "Cleaner", "Janitor, Jumpsuit, Mop and Bucket, Keys on belt"),
    simpleOpt("job_butcher", "屠夫", "Butcher", "Butcher, Blood-stained Apron, Cleaver, Meat market"),
    simpleOpt("job_fire", "消防员", "Firefighter", "Firefighter, Fire Turnout Gear, Helmet, Soot on face, Holding Axe"),
  ]
};

// C. Medical & Science
const grpProfMed: OptionGroup = {
  groupNameCN: "医疗与科研", groupNameEN: "Medical & Science",
  options: [
    simpleOpt("job_doctor", "医生", "Doctor", "Doctor, White Coat, Stethoscope around neck, Hospital setting"),
    simpleOpt("job_surgeon", "外科医生", "Surgeon", "Surgeon, Blue Scrubs, Surgical Mask, Surgical Cap, Operating Theater"),
    simpleOpt("job_nurse", "护士", "Nurse", "Nurse, Medical Scrubs or Uniform, Clipboard, Caring expression"),
    simpleOpt("job_scientist", "科学家", "Scientist", "Mad Scientist, Lab Coat, Goggles, Holding Test Tube, Bubbling liquid"),
    simpleOpt("job_astro", "宇航员", "Astronaut", "Astronaut, NASA Space Suit, Helmet reflection, Zero gravity"),
    simpleOpt("job_hacker", "黑客/极客", "Hacker", "Computer Hacker, Hoodie, Dark room, Multiple Monitors, Matrix code"),
    simpleOpt("job_engineer", "工程师", "Engineer", "Engineer, Safety Helmet, Blueprint, Industrial background"),
    simpleOpt("job_biologist", "生物学家", "Biologist", "Biologist, Field Gear, Exploring Jungle, Magnifying glass"),
  ]
};

// D. Law & Military
const grpProfLaw: OptionGroup = {
  groupNameCN: "军警与执法", groupNameEN: "Law & Military",
  options: [
    simpleOpt("job_police", "警察", "Police Officer", "Police Officer, Police Uniform, Badge, Utility Belt, Cap"),
    simpleOpt("job_swat", "特警/SWAT", "SWAT", "SWAT Team Member, Tactical Gear, Helmet, Vest, Rifle"),
    simpleOpt("job_soldier", "士兵", "Soldier", "Soldier, Military Camouflage, Combat Helmet, War torn background"),
    simpleOpt("job_sniper", "狙击手", "Sniper", "Sniper, Ghillie Suit, Long Range Rifle, Camouflage"),
    simpleOpt("job_spy", "间谍/特工", "Spy", "Secret Agent, Tuxedo or Tactical Turtleneck, Silenced Pistol"),
    simpleOpt("job_pilot", "飞行员", "Pilot", "Fighter Pilot, Flight Suit, G-Suit, Aviator Helmet, Oxygen mask"),
    simpleOpt("job_guard", "皇家卫兵", "Royal Guard", "Royal Guard, Red Uniform, Bearskin Hat, Stoic"),
    simpleOpt("job_yakuza", "黑帮/极道", "Yakuza", "Yakuza Member, Suit with open shirt, Tattoos visible, Sunglasses"),
  ]
};

// E. Art & Performance
const grpProfArt: OptionGroup = {
  groupNameCN: "艺术与表演", groupNameEN: "Art & Performance",
  options: [
    simpleOpt("job_painter", "画家", "Painter", "Artist Painter, Paint-splattered Overalls, Holding Palette and Brush"),
    simpleOpt("job_rockstar", "摇滚巨星", "Rockstar", "Rockstar, Leather pants, Electric Guitar, Long hair, Stage lights"),
    simpleOpt("job_ballet", "芭蕾舞者", "Ballerina", "Ballerina, Tutu dress, Pointe shoes, Graceful pose, Stage"),
    simpleOpt("job_clown", "小丑", "Clown", "Circus Clown, Colorful makeup, Red Nose, Ruffled collar"),
    simpleOpt("job_mime", "默剧演员", "Mime", "Mime Artist, Striped shirt, White face paint, Beret, Invisible box"),
    simpleOpt("job_dj", "DJ", "DJ", "Club DJ, Headphones around neck, Mixing deck, Laser lights"),
    simpleOpt("job_model", "超模", "Model", "Fashion Model, High Fashion Outfit, Runway walk, Flash photography"),
    simpleOpt("job_director", "导演", "Director", "Film Director, Holding Megaphone, Wearing Cap, Film Set"),
    simpleOpt("job_geisha", "艺伎", "Geisha", "Traditional Geisha, Kimono, White Makeup, Heavy Hair Ornaments, Pipe"),
  ]
};

// F. Sports & Action
const grpProfSport: OptionGroup = {
  groupNameCN: "竞技与运动", groupNameEN: "Sports & Action",
  options: [
    simpleOpt("job_boxer", "拳击手", "Boxer", "Boxer, Boxing Gloves, Shorts, Sweat, Bruised face, Ring"),
    simpleOpt("job_racer", "赛车手", "Racer", "F1 Driver, Racing Suit, Helmet under arm, Pit lane background"),
    simpleOpt("job_diver", "潜水员", "Diver", "Scuba Diver, Wetsuit, Oxygen Tank, Diving Mask, Underwater"),
    simpleOpt("job_samurai_s", "武士(现代)", "Samurai", "Samurai, Traditional Armor, Katana, Topknot hair"),
    simpleOpt("job_ninja_s", "忍者(现代)", "Ninja", "Ninja, Black Shinobi Shozoku, Mask, Katana on back"),
    simpleOpt("job_cowboy_s", "牛仔(现代)", "Cowboy", "Cowboy, Stetson Hat, Leather Vest, Revolver, Lasso"),
    simpleOpt("job_knight_s", "骑士(现代)", "Knight", "Medieval Knight, Shining Plate Armor, Sword, Heraldry"),
    simpleOpt("job_viking_s", "维京(现代)", "Viking", "Viking Warrior, Fur and Leather, War Paint, Axe and Shield"),
  ]
};

// G. Fantasy & Supernatural (General)
const grpProfFanGen: OptionGroup = {
  groupNameCN: "奇幻与超凡", groupNameEN: "Fantasy & Supernatural",
  options: [
    simpleOpt("job_wizard", "法师/巫师", "Wizard", "Wizard, Robes with stars, Pointy Hat, Magic Staff, Glowing orb"),
    simpleOpt("job_witch", "女巫", "Witch", "Witch, Black Dress, Broomstick, Cauldron, Black Cat"),
    simpleOpt("job_priest", "牧师/神父", "Priest", "Catholic Priest, Cassock, White Collar, Holding Bible, Rosary"),
    simpleOpt("job_monk", "僧侣/武僧", "Monk", "Shaolin Monk, Orange Robes, Bald head, Prayer beads, Kung Fu pose"),
    simpleOpt("job_nun", "修女", "Nun", "Nun, Habit and Veil, Cross necklace, Praying"),
    simpleOpt("job_druid", "德鲁伊", "Druid", "Druid, Wearing Animal Pelts and Leaves, Antler headdress, Staff"),
    simpleOpt("job_necro", "死灵法师", "Necromancer", "Necromancer, Tattered Black Robes, Bone Jewelry, Green Ghostly Fire, Skulls"),
    simpleOpt("job_hunt", "怪物猎人", "Monster Hunter", "Monster Hunter, Leather Trench Coat, Crossbow, Hat, Van Helsing style"),
  ]
};

// H. Outlaw & Underground
const grpProfOutlaw: OptionGroup = {
  groupNameCN: "非法与边缘", groupNameEN: "Outlaw & Underground",
  options: [
    simpleOpt("job_thief", "小偷/盗贼", "Thief", "Cat Burglar, Tight black clothes, Balaclava mask, Bag of loot"),
    simpleOpt("job_pirate", "海盗", "Pirate", "Pirate Captain, Tricorn Hat, Eye Patch, Parrot, Hook hand"),
    simpleOpt("job_gang", "帮派分子", "Gangster", "Street Gangster, Hoody, Bandana mask, Tattoos, Graffiti background"),
    simpleOpt("job_assassin", "刺客", "Assassin", "Assassin, Hooded Cloak, Hidden Blade, Shadowy"),
    simpleOpt("job_beggar", "流浪汉", "Beggar", "Homeless Beggar, Tattered rags, Dirty face, Cardboard sign"),
    simpleOpt("job_cult", "邪教徒", "Cultist", "Cultist, Red Robes, Hood covering face, Dagger, Ritual"),
    simpleOpt("job_runner", "赛博黑客", "Edgerunner", "Cyberpunk Edgerunner, Tech jacket, Glowing implants, Weapon"),
  ]
};

// G1. Oriental Wuxia & Xianxia
const grpProfEast: OptionGroup = {
  groupNameCN: "东方武侠与仙侠", groupNameEN: "Oriental Wuxia & Xianxia",
  options: [
    simpleOpt("job_swordsman", "剑客/侠客", "Swordsman", "Chinese Swordsman, Wuxia Style, Hanfu Robes, Holding Jian (Sword), Bamboo Hat (Douli), Wind blowing"),
    simpleOpt("job_cultivator", "修仙者", "Cultivator", "Xianxia Cultivator, Flowing White Robes, Floating Flying Swords, Ethereal Aura, Long Hair"),
    simpleOpt("job_general_cn", "古代将军", "General", "Ancient Chinese General, Ming/Tang Dynasty Armor, Scale Mail, Red Cape, Holding Spear"),
    simpleOpt("job_empress", "皇后/太后", "Empress", "Chinese Empress, Phoenix Crown, Golden Hairpin, Luxurious Silk Hanfu, Long Nails"),
    simpleOpt("job_scholar", "书生/秀才", "Scholar", "Chinese Scholar, Ancient Student, Robes, Holding Scroll or Fan, Bamboo Forest background"),
    simpleOpt("job_taoist", "道士", "Taoist", "Taoist Priest, Bagua Robes, Holding Fly-whisk (Fuchen), Wooden Sword, Talisman"),
    simpleOpt("job_monk_cn", "武僧", "Shaolin Monk", "Shaolin Monk, Orange Robes, Bald Head, Prayer Beads, Kung Fu Stance, Staff"),
    simpleOpt("job_assassin_cn", "刺客/死士", "Assassin", "Chinese Assassin, Black Night Clothing, Face Mask, Hidden Blade, Roof top"),
    simpleOpt("job_eunuch", "东厂/太监", "Eunuch", "Eunuch Official, Embroidered Python Robe, Black Hat, Sinister expression"),
    simpleOpt("job_beggar_k", "丐帮/游侠", "Beggar Hero", "Beggar Sect Hero, Tattered Clothes, Holding Gourd of Wine, Green Dog Stick"),
    simpleOpt("job_fox", "狐妖/妖女", "Fox Spirit", "Fox Spirit Humanoid, Huli Jing, Seductive Hanfu, Nine Tails visible, Makeup"),
  ]
};

// G2. Japanese Tradition
const grpProfJp: OptionGroup = {
  groupNameCN: "日本传统与神话", groupNameEN: "Japanese Tradition",
  options: [
    simpleOpt("job_samurai_jp", "武士/浪人", "Samurai/Ronin", "Samurai, Ronin, Traditional Armor (O-Yoroi), Katana on hip, Topknot"),
    simpleOpt("job_ninja_jp", "忍者", "Ninja", "Ninja, Shinobi, Black Shozoku outfit, Face Mask, Throwing Stars (Shuriken)"),
    simpleOpt("job_geisha_jp", "艺伎/花魁", "Oiran/Geisha", "Oiran / Geisha, Elaborate Kimono, White Face Makeup, Heavy Hair Ornaments, Pipe"),
    simpleOpt("job_miko", "巫女", "Miko", "Miko Shrine Maiden, Red Hakama pants, White Kimono top, Holding Gohei wand"),
    simpleOpt("job_onmyoji", "阴阳师", "Onmyoji", "Onmyoji, Heian Period Robes, Tall Hat (Eboshi), Paper Talisman (Ofuda), Pentagram"),
    simpleOpt("job_sohei", "僧兵", "Sohei", "Sohei Warrior Monk, White Cowl, Robes, Holding Naginata (Glaive)"),
    simpleOpt("job_yokai", "妖怪/鬼", "Yokai/Oni", "Humanoid Yokai, Oni Mask, Tiger skin loincloth, Iron Club (Kanabo)"),
    simpleOpt("job_school_jp", "不良少年", "Yankee", "Japanese Delinquent (Yankee), School Uniform (Gakuran), Pompadour hair, Bat"),
  ]
};

// G3. Western High Fantasy
const grpProfHighFan: OptionGroup = {
  groupNameCN: "西方奇幻 (D&D)", groupNameEN: "Western High Fantasy",
  options: [
    simpleOpt("job_paladin", "圣骑士", "Paladin", "Paladin, Shining Silver Plate Armor, Gold Trim, Holy Aura, Hammer/Sword"),
    simpleOpt("job_ranger", "游侠/猎人", "Ranger", "Ranger, Hooded Green Cloak, Leather Armor, Longbow, Forest background"),
    simpleOpt("job_barbarian", "野蛮人", "Barbarian", "Barbarian, Conan style, Bare Chest, Fur Loincloth, Muscles, Battle Axe"),
    simpleOpt("job_druid_fan", "德鲁伊", "Druid", "Druid, Wearing Animal Skulls and Leaves, Wooden Staff, Nature Magic"),
    simpleOpt("job_rogue", "盗贼/刺客", "Rogue", "Rogue, Tight Leather Armor, Daggers, Hood, Shadowy atmosphere"),
    simpleOpt("job_sorcerer", "术士/法师", "Sorcerer", "Sorcerer, Robes with star patterns, Glowing Magic Staff, Arcane Energy"),
    simpleOpt("job_bard", "吟游诗人", "Bard", "Bard, Colorful Clothes, Feathered Hat, Playing Lute, Charismatic"),
    simpleOpt("job_necro_fan", "死灵法师", "Necromancer", "Necromancer, Tattered Black Robes, Bone Jewelry, Green Ghostly Fire, Skulls"),
    simpleOpt("job_king", "国王/领主", "King", "Medieval King, Gold Crown, Fur-trimmed Cape, Holding Scepter, Throne"),
    simpleOpt("job_jester", "宫廷小丑", "Jester", "Court Jester, Motley Costume, Bells on hat, Creepy or Funny makeup"),
  ]
};

// G4. Ancient Mythology
const grpProfAncient: OptionGroup = {
  groupNameCN: "古典神话", groupNameEN: "Ancient Mythology",
  options: [
    simpleOpt("job_spartan", "斯巴达战士", "Spartan", "Spartan Hoplite, Bronze Helmet with Red Crest, Round Shield, Red Cape, Abs"),
    simpleOpt("job_senator", "罗马元老", "Senator", "Roman Senator, White Toga with Purple sash, Laurel Wreath, Marble background"),
    simpleOpt("job_gladiator", "角斗士", "Gladiator", "Gladiator, Leather straps, Shoulder Armor, Helmet, Holding Sword and Net, Arena"),
    simpleOpt("job_oracle", "神谕/祭司", "Oracle", "Greek Oracle Priestess, White draped dress, Veil, Smoke, Temple background"),
    simpleOpt("job_pharaoh", "法老", "Pharaoh", "Egyptian Pharaoh, Nemes Headdress, False Beard, Gold jewelry, Scepter"),
    simpleOpt("job_anubis", "阿努比斯卫", "Anubis Guard", "Anubis Guard, Jackal Mask, Gold Armor, Egyptian Skirt, Khopesh Sword"),
    simpleOpt("job_cleo", "埃及艳后", "Cleopatra", "Cleopatra style, Black Bob hair with Gold beads, Heavy Eyeliner, Snake jewelry"),
  ]
};

// G5. Tribal & Shamanic
const grpProfTribal: OptionGroup = {
  groupNameCN: "原始与萨满", groupNameEN: "Tribal & Shamanic",
  options: [
    simpleOpt("job_viking_t", "维京海盗", "Viking", "Viking Warrior, Chainmail and Fur, War Paint on face, Bearded, Axe"),
    simpleOpt("job_shaman", "萨满/巫医", "Shaman", "Tribal Shaman, Animal Skull Mask, Feathers, Bone Necklace, Ritual Staff"),
    simpleOpt("job_aztec", "美洲豹战士", "Jaguar Warrior", "Aztec Jaguar Warrior, Jaguar Skin suit, Obsidian Sword (Macuahuitl)"),
    simpleOpt("job_amazon", "亚马逊女战", "Amazonian", "Amazonian Warrior, Leather Bikini Armor, Spear, Jungle background"),
    simpleOpt("job_caveman", "原始人", "Caveman", "Prehistoric Caveman, Animal Pelt, Club, Messy Hair, Dirt"),
  ]
};

// G6. Victorian & Gothic
const grpProfVictorian: OptionGroup = {
  groupNameCN: "维多利亚与哥特", groupNameEN: "Victorian & Gothic",
  options: [
    simpleOpt("job_plague", "瘟疫医生", "Plague Doctor", "Plague Doctor, Beak Mask, Black Leather Coat, Wide Brim Hat, Lantern"),
    simpleOpt("job_inventor", "蒸汽发明家", "Inventor", "Steampunk Inventor, Brass Goggles, Leather Apron, Mechanical Tools, Gloves"),
    simpleOpt("job_vamp_lord", "吸血鬼伯爵", "Vampire Lord", "Vampire Lord, Victorian Suit, High Collar, Red lined Cape, Pale skin"),
    simpleOpt("job_hunter_v", "怪物猎人", "Hunter", "Van Helsing style Hunter, Leather Trench Coat, Crossbow, Hat, Holy Water"),
    simpleOpt("job_detective_v", "福尔摩斯", "Detective", "Sherlock Holmes style, Tweed Coat, Deerstalker Hat, Pipe, Magnifying Glass"),
    simpleOpt("job_maid", "女仆", "Maid", "Victorian Maid, Black Dress with White Apron, Bonnet, Feather Duster"),
    simpleOpt("job_pirate_c", "海盗船长", "Pirate Captain", "Pirate Captain, Tricorn Hat, Frock Coat, Hook Hand, Parrot"),
  ]
};

// Define Groups for Human Sub-modules

// Skin
const grpSkinTone: OptionGroup = {
  groupNameCN: "肤色", groupNameEN: "Skin Tone",
  options: [
    simpleOpt("skin_pale", "苍白", "Pale", "Pale Porcelain Skin, Translucent Veins"),
    simpleOpt("skin_fair", "白皙", "Fair", "Fair Skin Tone"),
    simpleOpt("skin_tan", "古铜/小麦", "Tan", "Sun-kissed Tan Skin, Bronzed"),
    simpleOpt("skin_olive", "橄榄色", "Olive", "Olive Skin Tone"),
    simpleOpt("skin_brown", "棕色", "Brown", "Rich Brown Skin"),
    simpleOpt("skin_black", "黝黑", "Ebony", "Dark Ebony Skin"),
    simpleOpt("skin_blue", "蓝皮", "Blue", "Blue Skin pigment"),
    simpleOpt("skin_green", "绿皮", "Green", "Green Skin pigment"),
    simpleOpt("skin_red", "红皮", "Red", "Red Skin pigment"),
    simpleOpt("skin_grey", "灰皮", "Grey", "Grey Skin pigment"),
    simpleOpt("skin_gold", "金色", "Gold", "Golden Skin"),
  ]
};
const grpSkinMaterial: OptionGroup = {
  groupNameCN: "材质", groupNameEN: "Material",
  options: [
    simpleOpt("skin_default", "默认", "Default", "Natural Skin Texture"),
    simpleOpt("skin_oil", "油亮/汗湿", "Oily", "Oily Skin, Sweaty Sheen"),
    simpleOpt("skin_scales", "鳞片覆盖", "Scales", "Reptilian Scales texture, Iridescent"),
    simpleOpt("skin_stone", "岩石/石肤", "Stone", "Cracked Stone Texture, Granite Flesh"),
    simpleOpt("skin_metal", "金属/液态", "Metal", "Chrome Flesh, Liquid Mercury Texture"),
    simpleOpt("skin_magma", "熔岩/燃烧", "Magma", "Magma Skin, Cracks glowing with fire"),
    simpleOpt("skin_bark", "树皮/木质", "Bark", "Bark Skin, Wooden Texture, Mossy"),
    simpleOpt("skin_porcelain", "陶瓷", "Porcelain", "Cracked Porcelain Doll Texture"),
    simpleOpt("skin_glass", "玻璃", "Glass", "Translucent Glass Skin"),
    simpleOpt("skin_holo", "全息", "Holographic", "Holographic Digital Skin"),
  ]
};

// Hair
const grpHairLength: OptionGroup = {
  groupNameCN: "长度", groupNameEN: "Length",
  options: [
    simpleOpt("hair_bald", "光头/寸头", "Bald/Buzz", "Bald head, Buzz Cut"),
    simpleOpt("hair_pixie", "精灵短发", "Pixie", "Short Pixie Cut"),
    simpleOpt("hair_bob", "波波头", "Bob", "Bob Cut"),
    simpleOpt("hair_shoulder", "齐肩", "Shoulder Length", "Shoulder-length Hair"),
    simpleOpt("hair_long", "长直发", "Long Straight", "Long Straight Hair"),
    simpleOpt("hair_waist", "齐腰长发", "Waist Length", "Waist Length Flowing Hair"),
  ]
};
const grpHairStyle: OptionGroup = {
  groupNameCN: "发型", groupNameEN: "Style",
  options: [
    simpleOpt("hair_messy", "凌乱/刚睡醒", "Messy", "Messy Bedhead, Unkempt"),
    simpleOpt("hair_bun", "丸子头", "Bun", "Messy Bun, Updo"),
    simpleOpt("hair_twin", "双马尾", "Twin Tails", "Twin Tails, Pigtails"),
    simpleOpt("hair_ponytail", "高马尾", "High Ponytail", "High Ponytail"),
    simpleOpt("hair_braid", "麻花辫", "Braids", "Braided Hair"),
    simpleOpt("hair_dread", "脏辫", "Dreadlocks", "Dreadlocks"),
    simpleOpt("hair_cornrow", "地垄沟", "Cornrows", "Cornrows"),
    simpleOpt("hair_afro", "爆炸头", "Afro", "Afro Hairstyle"),
    simpleOpt("hair_finger", "手推波纹(20s)", "Finger Waves", "Vintage Finger Waves"),
    simpleOpt("hair_pomp", "庞巴度(50s)", "Pompadour", "Pompadour Hairstyle"),
    simpleOpt("hair_mullet", "狼尾(80s)", "Mullet", "Mullet Hairstyle"),
    simpleOpt("hair_liberty", "自由女神刺头", "Liberty Spikes", "Punk Liberty Spikes"),
    simpleOpt("hair_mohawk", "莫霍克", "Mohawk", "Mohawk Hairstyle"),
    simpleOpt("hair_undercut", "铲青", "Undercut", "Undercut Hairstyle"),
    simpleOpt("hair_hime", "公主切", "Hime Cut", "Hime Cut"),
    simpleOpt("hair_wolf", "鲻鱼头", "Wolf Cut", "Wolf Cut"),
    simpleOpt("hair_curtain", "八字刘海", "Curtain Bangs", "Curtain Bangs"),
    simpleOpt("hair_wet", "湿发", "Wet Look", "Wet Look Hair"),
    simpleOpt("hair_slick", "大背头", "Slicked Back", "Slicked Back Hair"),
    simpleOpt("hair_wind", "风吹", "Windblown", "Windblown Hair"),
    simpleOpt("hair_top_knot", "顶髻", "Top Knot", "Top Knot hairstyle"),
    simpleOpt("hair_french_braid", "法式辫", "French Braid", "French Braid"),
    simpleOpt("hair_dutch_braid", "荷兰辫", "Dutch Braid", "Dutch Braid"),
    simpleOpt("hair_fishtail", "鱼骨辫", "Fishtail Braid", "Fishtail Braid"),
    simpleOpt("hair_crown_braid", "皇冠辫", "Crown Braid", "Crown Braid"),
    simpleOpt("hair_beehive", "蜂巢头(60s)", "Beehive", "60s Beehive hairstyle"),
    simpleOpt("hair_quiff", "飞机头", "Quiff", "Quiff hairstyle"),
    simpleOpt("hair_bowl_cut", "碗盖头", "Bowl Cut", "Bowl Cut"),
    simpleOpt("hair_jheri_curl", "杰瑞卷(80s)", "Jheri Curl", "80s Jheri Curl"),
    simpleOpt("hair_spiky", "尖刺头(90s)", "Spiky Hair", "90s Spiky Hair"),
    simpleOpt("hair_shag", "shag发型", "Shag", "Shag haircut"),
    simpleOpt("hair_odango", "团子头", "Odango", "Odango (Sailor Moon) buns"),
    simpleOpt("hair_side_shave", "侧削", "Side Shave", "Side Shave hairstyle"),
    simpleOpt("hair_tonsure", "修士发型", "Tonsure", "Monk Tonsure hairstyle"),
    simpleOpt("hair_victory_rolls", "胜利卷(40s)", "Victory Rolls", "40s Victory Rolls"),
    simpleOpt("hair_chignon", "发髻", "Chignon", "Elegant Chignon"),
    simpleOpt("hair_bouffant", "蓬松发型", "Bouffant", "Bouffant hairstyle"),
    simpleOpt("hair_asymmetrical", "不对称发型", "Asymmetrical", "Asymmetrical haircut"),
    simpleOpt("hair_feathered", "羽毛剪", "Feathered", "Feathered hairstyle (70s)"),
    simpleOpt("hair_perms", "烫发", "Perms", "Permed hair"),
    simpleOpt("hair_rattail", "鼠尾辫", "Rattail", "Rattail hairstyle"),
    simpleOpt("hair_devillock", "恶魔锁", "Devillock", "Misfits Devillock hairstyle"),
    simpleOpt("hair_queue", "清朝辫子", "Queue", "Manchu Queue hairstyle"),
    simpleOpt("hair_bettie", "贝蒂刘海", "Bettie Bangs", "Bettie Page Bangs"),
    simpleOpt("hair_chelsea", "切尔西头", "Chelsea Cut", "Skinhead Chelsea Cut"),
  ]
};
const grpHairColor: OptionGroup = {
  groupNameCN: "发色", groupNameEN: "Color",
  options: [
    simpleOpt("col_black", "黑", "Jet Black", "Jet Black Hair"),
    simpleOpt("col_blonde", "金", "Platinum Blonde", "Platinum Blonde Hair"),
    simpleOpt("col_brown", "棕", "Chestnut Brown", "Chestnut Brown Hair"),
    simpleOpt("col_red", "姜红", "Ginger Red", "Ginger Red Hair"),
    simpleOpt("col_silver", "银白", "Silver/White", "Silver White Hair"),
    simpleOpt("col_grey", "灰", "Grey", "Grey Hair"),
    simpleOpt("col_pink", "粉彩", "Pastel Pink", "Pastel Pink Hair"),
    simpleOpt("col_blue", "电光蓝", "Electric Blue", "Electric Blue Hair"),
    simpleOpt("col_green", "霓虹绿", "Neon Green", "Neon Green Hair"),
    simpleOpt("col_purple", "紫", "Purple", "Purple Hair"),
    simpleOpt("col_lavender", "薰衣草", "Lavender", "Lavender Hair"),
    simpleOpt("col_turq", "绿松石", "Turquoise", "Turquoise Hair"),
    simpleOpt("col_ombre", "渐变", "Ombre", "Ombre Gradient Hair"),
    simpleOpt("col_rainbow", "彩虹", "Rainbow", "Rainbow Colored Hair"),
    simpleOpt("col_split", "阴阳染", "Split Dye", "Split Dye (Cruella style) Hair"),
    simpleOpt("col_highlight", "挑染", "Highlights", "Hair with Highlights"),
    simpleOpt("col_root", "布丁头", "Dark Roots", "Visible Dark Roots"),
  ]
};

// Face
const grpFaceVibe: OptionGroup = {
  groupNameCN: "气质", groupNameEN: "Vibe",
  options: [
    simpleOpt("face_beauty", "美丽", "Beautiful", "Beautiful Face"),
    simpleOpt("face_cute", "可爱", "Cute", "Cute, Adorable Face"),
    simpleOpt("face_kind", "慈祥", "Kind", "Kind, Gentle Face"),
    simpleOpt("face_noble_v", "尊贵", "Noble", "Noble, Aristocratic Face"),
    simpleOpt("face_ugly_v", "丑陋", "Ugly", "Ugly, Repulsive Face"),
    simpleOpt("face_scary", "恐怖", "Scary", "Scary, Terrifying Face"),
    simpleOpt("face_disgust", "恶心", "Disgusting", "Disgusting, Gross Face"),
    simpleOpt("face_weird", "怪诞", "Weird", "Weird, Strange Face"),
    simpleOpt("face_melancholic", "忧郁", "Melancholic", "Melancholic, Sad eyes"),
    simpleOpt("face_fierce", "凶猛", "Fierce", "Fierce, Intense gaze"),
    simpleOpt("face_ethereal", "空灵", "Ethereal", "Ethereal, Otherworldly beauty"),
  ]
};
const grpFacePreset: OptionGroup = {
  groupNameCN: "预设", groupNameEN: "Preset",
  options: [
    simpleOpt("face_insta", "网红脸", "Insta-Glam", "Insta-Glam Face, Perfect Symmetry, Heavy Contour"),
    simpleOpt("face_kpop", "偶像脸", "K-Pop Idol", "K-Pop Idol Face, Glass Skin, V-line Jaw"),
    simpleOpt("face_model", "超模脸", "Model", "High Fashion Model Face, Sharp Cheekbones"),
    simpleOpt("face_classic", "古典脸", "Classic", "Classic Cinematic Beauty, Timeless features"),
    simpleOpt("face_baby", "童颜", "Baby Face", "Baby Face, Youthful features"),
    simpleOpt("face_andro", "雌雄莫辨", "Androgynous", "Androgynous Face"),
    simpleOpt("face_chiseled", "雕刻般", "Chiseled", "Chiseled Jawline, Strong features"),
    simpleOpt("face_feral", "野性", "Feral", "Feral, Wild eyes"),
    simpleOpt("face_doll", "像娃娃", "Doll-like", "Doll-like, Large eyes"),
    simpleOpt("face_alien", "外星感", "Alien", "Alien-like features, Wide set eyes"),
    simpleOpt("face_noble_p", "贵族气", "Noble", "Noble, Aristocratic features"),
    simpleOpt("face_plain", "普通人", "Plain", "Plain Face, Average Features, Realistic"),
    simpleOpt("face_rugged", "粗犷", "Rugged", "Rugged Face, Weathered Texture, Strong Jaw"),
    simpleOpt("face_weathered", "风霜", "Weathered", "Weathered Face, Sun damage"),
    simpleOpt("face_villain", "反派", "Villain", "Villainous Features, Sharp Nose, Sinister"),
    simpleOpt("face_heroic", "英雄脸", "Heroic", "Heroic, Strong Jaw, Confident expression"),
    simpleOpt("face_wise", "智慧长者", "Wise", "Wise, Wrinkled, Knowing eyes"),
    simpleOpt("face_tired_p", "疲惫社畜", "Tired", "Tired Face, Dark eye bags, Stressed look"),
    simpleOpt("face_sickly", "病态", "Sickly", "Sickly, Gaunt, Pale, Sunken eyes"),
  ]
};
const grpMakeup: OptionGroup = {
  groupNameCN: "妆容", groupNameEN: "Makeup",
  options: [
    simpleOpt("mu_none", "素颜", "No Makeup", "No Makeup, Raw Skin Texture, Fresh Faced"),
    simpleOpt("mu_natural", "淡妆", "Natural", "Natural No-Makeup Look"),
    simpleOpt("mu_glam", "浓妆", "Glam", "Heavy Glam Makeup, Winged Eyeliner"),
    simpleOpt("mu_goth", "烟熏/哥特", "Goth", "Smokey Eyes, Black Lipstick"),
    simpleOpt("mu_clown", "小丑妆", "Clown", "Clown Makeup, Messy"),
    simpleOpt("mu_geisha", "艺伎", "Geisha", "Geisha Makeup, White face"),
    simpleOpt("mu_kabuki", "歌舞伎", "Kabuki", "Kabuki Makeup"),
    simpleOpt("mu_corpse", "尸脸(黑金属)", "Corpse Paint", "Corpse Paint, Black Metal style"),
    simpleOpt("mu_glitter", "闪粉泪妆", "Glitter Tears", "Glitter Tears, Euphoria style"),
    simpleOpt("mu_war", "战纹/迷彩", "War Paint", "War Paint, Camouflage Grease"),
    simpleOpt("mu_art", "艺术面绘", "Face Paint", "Avant-garde Face Paint"),
  ]
};

// Traits
const grpMutations: OptionGroup = {
  groupNameCN: "非人特征", groupNameEN: "Mutations",
  options: [
    simpleOpt("mut_succubus", "魅魔角/尾", "Succubus", "Succubus Horns, Heart-shaped Tail"),
    simpleOpt("mut_ram", "盘羊角", "Ram Horns", "Curved Ram Horns"),
    simpleOpt("mut_uni", "独角兽", "Unihorn", "Unicorn Horn"),
    simpleOpt("mut_elf", "精灵耳", "Elf Ears", "Pointed Elf Ears"),
    simpleOpt("mut_fin", "鱼鳍耳", "Fin Ears", "Aquatic Fin Ears"),
    simpleOpt("mut_fangs", "吸血鬼牙", "Fangs", "Sharp Vampire Fangs"),
    simpleOpt("mut_tusks", "獠牙", "Tusks", "Large Orc Tusks"),
    simpleOpt("mut_tongue", "蛇信", "Split Tongue", "Split Serpent Tongue"),
    simpleOpt("mut_cateye", "竖瞳", "Cat Eyes", "Slit Cat Eyes"),
    simpleOpt("mut_blackeye", "全黑眼", "Black Sclera", "All Black Sclera"),
    simpleOpt("mut_thirdeye", "三只眼", "Third Eye", "Third Eye on forehead"),
    simpleOpt("mut_cyclops", "独眼", "Cyclops", "Single Cyclops Eye"),
    simpleOpt("mut_gills", "鱼鳃", "Gills", "Gills on neck"),
    simpleOpt("mut_web", "蹼", "Webbed", "Webbed Fingers"),
    simpleOpt("mut_wings_f", "羽翼", "Feathered Wings", "Large White Feathered Wings"),
    simpleOpt("mut_wings_b", "蝠翼", "Bat Wings", "Leathery Bat Wings"),
    simpleOpt("mut_wings_m", "机械翼", "Mech Wings", "Mechanical Metal Wings"),
    simpleOpt("mut_halo", "光环", "Halo", "Glowing Halo"),
    simpleOpt("mut_crown", "浮空冠", "Floating Crown", "Floating Energy Crown"),
    simpleOpt("mut_tail", "尾巴", "Tail", "Long Tail"),
  ]
};
const grpImperfections: OptionGroup = {
  groupNameCN: "瑕疵与印记", groupNameEN: "Imperfections",
  options: [
    simpleOpt("imp_freckle", "雀斑", "Freckles", "Heavy Freckles"),
    simpleOpt("imp_acne", "痘印", "Acne", "Acne, Textured skin"),
    simpleOpt("imp_rosacea", "酒糟鼻", "Rosacea", "Rosacea, Red cheeks"),
    simpleOpt("imp_mole", "泪痣", "Mole", "Beauty Mark, Mole under eye"),
    simpleOpt("imp_vitiligo", "白斑", "Vitiligo", "Vitiligo skin patterns"),
    simpleOpt("imp_darkcircle", "黑眼圈", "Dark Circles", "Heavy Dark Circles"),
    simpleOpt("imp_tat_face", "面部纹身", "Face Tattoo", "Face Tattoo"),
    simpleOpt("imp_tat_neck", "颈部纹身", "Neck Tattoo", "Neck Tattoo"),
    simpleOpt("imp_tat_sleeve", "花臂", "Sleeve Tattoo", "Full Sleeve Tattoo"),
    simpleOpt("imp_tat_yakuza", "日式纹身", "Yakuza Tattoo", "Yakuza Irezumi Tattoo"),
    simpleOpt("imp_scar_eye", "眼部刀疤", "Eye Scar", "Vertical Scar over eye"),
    simpleOpt("imp_scar_burn", "烧伤", "Burn Mark", "Burn Marks"),
    simpleOpt("imp_scar_stitch", "缝合线", "Stitches", "Stitched Wound"),
    simpleOpt("imp_cyb_larm", "左机械臂", "L-Mech Arm", "Cybernetic Left Arm"),
    simpleOpt("imp_cyb_rarm", "右机械臂", "R-Mech Arm", "Cybernetic Right Arm"),
    simpleOpt("imp_cyb_eye", "义眼", "Cyber Eye", "Glowing Cybernetic Eye"),
    simpleOpt("imp_cyb_skin", "机械露肌", "Exposed Mech", "Synthetic Skin Peeling revealing metal"),
    simpleOpt("imp_bandage", "绷带", "Bandages", "Wrapped in Bandages"),
    simpleOpt("imp_eyepatch", "眼罩", "Eyepatch", "Wearing Eyepatch"),
    simpleOpt("imp_mask", "医用口罩", "Mask", "Wearing Medical Mask"),
    simpleOpt("imp_dirt", "污垢", "Dirt", "Dirty face, Grime"),
  ]
};

// Fashion 120+ Items Extension
const grpFashHigh: OptionGroup = {
  groupNameCN: "高定与先锋", groupNameEN: "High Fashion & Avant-Garde",
  options: [
    simpleOpt("fash_haute", "高定秀场", "Haute Couture", "Haute Couture, Runway Fashion, Intricate embroidery, Hand-crafted details"),
    simpleOpt("fash_sculpt", "雕塑感/异形", "Sculptural", "Iris van Herpen Style, 3D Printed Fabric, Sculptural silhouette, Organic shapes, Flowing lines"),
    simpleOpt("fash_mcqueen", "暗黑浪漫", "McQueen Style", "Alexander McQueen Style, Dark Romanticism, Skulls and Roses, Dramatic feathers, Victorian Goth influence"),
    simpleOpt("fash_minimal", "极简奢华", "Minimalist Luxury", "Minimalist Luxury, Jil Sander / The Row Style, Clean lines, Monochromatic, High-end Cashmere"),
    simpleOpt("fash_balen", "末世廓形", "Balenciaga Style", "Balenciaga Aesthetic, Oversized Silhouette, Post-Apocalyptic Chic, Black mask, Baggy layers"),
    simpleOpt("fash_gucci", "复古极繁", "Maximalist/Gucci", "Gucci Aesthetic, Maximalist, Clashing Patterns, Floral and Plaid, Vintage Geek Chic, Wes Anderson vibe"),
    simpleOpt("fash_gala", "MetGala礼服", "Met Gala Look", "Met Gala Red Carpet Look, Massive train, Sequins and Jewels, Theatrical grandeur"),
    simpleOpt("fash_avant", "解构主义", "Deconstructivism", "Deconstructivism Fashion, Yohji Yamamoto / Comme des Garçons, Asymmetrical, Raw edges, Layered Black"),
    simpleOpt("fash_glass", "玻璃/透明装", "Glass Fashion", "Translucent Plastic Fashion, Glass Fabric, Holographic Sheen, Futurewear"),
    simpleOpt("fash_metal", "金属织物", "Chainmail/Metal", "Paco Rabanne Style, Chainmail Dress, Metal discs, Reflective Silver"),
  ]
};

const grpFashStreet: OptionGroup = {
  groupNameCN: "街头与潮流", groupNameEN: "Streetwear & Urban",
  options: [
    simpleOpt("fash_hype", "美式潮牌", "Hypebeast", "Hypebeast Style, Supreme Aesthetic, Oversized Hoodie, Logo graphics, Baggy Jeans, Sneakers"),
    simpleOpt("fash_skate", "滑板风格", "Skater", "Skater Style, Thrasher Aesthetic, Beanie, Vans shoes, Flannel shirt tied around waist"),
    simpleOpt("fash_y2k", "千禧辣妹", "Y2K", "Y2K Fashion, Low-rise Jeans, Baby Tee, Velour Tracksuit, Rhinestones, Pink aesthetics"),
    simpleOpt("fash_ath", "运动休闲", "Athleisure", "Athleisure, Yoga Pants, Crop Top, Bomber Jacket, Nike Aesthetic, Sporty"),
    simpleOpt("fash_norm", "性冷淡/工装", "Normcore", "Normcore, Carhartt Workwear, Beanie, Plain T-shirt, Straight leg denim, Utilitarian"),
    simpleOpt("fash_hiphop", "嘻哈/Oversize", "90s Hip Hop", "90s Hip Hop Fashion, Baggy Jersey, Gold Chains, Timberland Boots, Bucket Hat"),
    simpleOpt("fash_tech", "机能忍者", "Techwear", "Techwear, Acronym Style, Urban Ninja, Matte Black, Multi-pocket Cargo Pants, Straps"),
    simpleOpt("fash_gorp", "户外山系", "Gorpcore", "Gorpcore, North Face Jacket, Hiking Boots, Fleece Vest, Functional Outdoor gear"),
    simpleOpt("fash_block", "多巴胺穿搭", "Dopamine", "Dopamine Dressing, Color Blocking, Vibrant Primary Colors, Playful, Kidcore"),
    simpleOpt("fash_grunge", "垃圾摇滚", "Grunge", "90s Grunge, Kurt Cobain Style, Distressed Sweater, Ripped Jeans, Converse"),
  ]
};

const grpFashSub: OptionGroup = {
  groupNameCN: "亚文化", groupNameEN: "Subculture & Alternative",
  options: [
    simpleOpt("fash_goth_tr", "传统哥特", "Trad Goth", "Trad Goth, Siouxsie Sioux Style, Teased Hair, Black Lace, Fishnets, Heavy Eyeliner"),
    simpleOpt("fash_cyberg", "赛博哥特", "Cybergoth", "Cybergoth, Neon Hair falls, Gas mask, UV reactive clothing, Platform boots, Industrial Dance"),
    simpleOpt("fash_punk", "70s朋克", "70s Punk", "70s Punk Rock, Vivienne Westwood Style, Safety Pins, Tartan Bondage trousers, Mohawk"),
    simpleOpt("fash_emo", "Emo/情绪", "Emo", "2000s Emo Style, Side bangs, Skinny Jeans, Band T-shirt, Studded Belt, Converse"),
    // Fixed: Removed duplicate "Lolita" argument to match simpleOpt signature (4 args max)
    simpleOpt("fash_lolita", "洛丽塔", "Lolita", "Gothic Lolita Fashion, Frilly Dress, Bonnet, Lace Parasol, Victorian Doll aesthetic"),
    simpleOpt("fash_scene", "Scene风格", "Scene Kid", "Scene Kid Aesthetic, Neon hair extensions, Kandi bracelets, Gloomy Bear, Chaotic colors"),
    simpleOpt("fash_steam", "蒸汽朋克", "Steampunk", "Steampunk Fashion, Corset, Goggles, Brass Accessories, Brown Leather, Victorian Sci-fi"),
    simpleOpt("fash_pastel", "粉彩哥特", "Pastel Goth", "Pastel Goth, Creepy Cute, Spikes and Bows, Pink and Black, Bat wings"),
    simpleOpt("fash_visual", "视觉系", "Visual Kei", "Visual Kei, Glam Rock, Elaborate Hair, Androgynous, Leather and Lace mix"),
    simpleOpt("fash_biker", "机车党", "Biker", "Biker Gang, Leather Jacket with patches, Bandana, Heavy Boots, Denim Vest"),
  ]
};

const grpFashProf: OptionGroup = {
  groupNameCN: "职业与制服", groupNameEN: "Professional & Uniform",
  options: [
    simpleOpt("fash_suit", "商务精英", "Business Suit", "Italian Tailored Suit, Pinstripe, White Collar, Power Tie, Wolf of Wall Street vibe"),
    simpleOpt("fash_tux", "晚宴燕尾", "Tuxedo", "Black Tie Tuxedo, Bow tie, Formal Evening wear, James Bond aesthetic"),
    simpleOpt("fash_lab", "科研/医疗", "Lab Coat", "White Lab Coat, Scrubs, Stethoscope, Sterile aesthetics, Scientist look"),
    simpleOpt("fash_mili", "现代战术", "Tactical Gear", "Tactical Military Gear, Camouflage, Bulletproof Vest, Combat Helmet, Special Forces"),
    simpleOpt("fash_pilot", "飞行员", "Pilot", "Fighter Pilot Suit, G-Suit, Aviator Sunglasses, Bomber Jacket, Patches"),
    simpleOpt("fash_police", "警服/特警", "Police/SWAT", "Police Uniform, SWAT Team gear, Badge, Utility Belt, Dark Blue"),
    simpleOpt("fash_school", "日系校服", "School Uniform", "Japanese School Uniform, Sailor Suit (Seifuku), Pleated Skirt, Loafers, High Socks"),
    simpleOpt("fash_ivy", "常春藤/学院", "Ivy League", "Ivy League Style, Preppy, Tweed Blazer, Sweater Vest, Polo Shirt, Ralph Lauren vibe"),
    simpleOpt("fash_chef", "厨师服", "Chef", "Chef's Whites, Apron, Toque hat, Professional Kitchen attire"),
    simpleOpt("fash_priest", "神职长袍", "Priest/Nun", "Priest Cassock, Nun Habit, Religious Vestments, Gold embroidery, Solemn"),
  ]
};

const grpFashTrad: OptionGroup = {
  groupNameCN: "民族与古风", groupNameEN: "Traditional & Cultural",
  options: [
    simpleOpt("fash_hanfu", "汉服(仙气)", "Hanfu", "Traditional Chinese Hanfu, Flowing Silk Robes, Wide Sleeves, Celestial embroidery, Wuxia style"),
    simpleOpt("fash_qipao", "旗袍", "Qipao", "Cheongsam / Qipao, Silk Brocade, High collar, Form fitting, Wong Kar-wai aesthetic"),
    simpleOpt("fash_kimono", "和服", "Kimono", "Formal Kimono, Obi Sash, Floral Patterns, Traditional Japanese, Geta sandals"),
    simpleOpt("fash_sari", "印度纱丽", "Saree", "Indian Saree, Silk and Gold thread, Vibrant Colors, Bindi, Jewelry"),
    simpleOpt("fash_vic_d", "维多利亚裙", "Victorian Dress", "Victorian Ballgown, Corset, Crinoline cage, Lace collar, 19th Century"),
    simpleOpt("fash_ren", "文艺复兴", "Renaissance", "Renaissance Velvet Robes, Fur trim, Gold chains, Tudor style, Shakespearean"),
    simpleOpt("fash_egypt", "古埃及", "Egyptian", "Ancient Egyptian Shendyt, Gold Collars, Pleated White Linen, Lapis Jewelry"),
    simpleOpt("fash_greek", "希腊长袍", "Greek Toga", "Greco-Roman Toga, Draped White Fabric, Gold Laurel Wreath, Sandals"),
    simpleOpt("fash_viking", "维京皮草", "Viking", "Viking Fur Cloak, Leather Armor, Runes, Rugged textures, Layers"),
    simpleOpt("fash_arab", "阿拉伯长袍", "Arabian", "Bedouin Robes, Turban, Flowing fabric, Desert attire, Layers"),
  ]
};

const grpFashScifi: OptionGroup = {
  groupNameCN: "科幻与未来", groupNameEN: "Sci-Fi & Future",
  options: [
    simpleOpt("fash_space", "宇航服", "Space Suit", "NASA Space Suit, Bulky Helmet, Life Support System, White and Orange"),
    simpleOpt("fash_scifi", "紧身战斗服", "Plugsuit", "Sci-Fi Plugsuit, Spandex, Evangelion Style, Glowing lines, Interface ports"),
    simpleOpt("fash_cyber_j", "赛博夹克", "Cyberpunk Jacket", "Cyberpunk Bomber Jacket, High collar, LED lights, Patches, Holographic material"),
    simpleOpt("fash_dune", "蒸馏服(沙丘)", "Stillsuit", "Dune Stillsuit, Desert Survival Gear, Nose tube, Weathered, Tactical"),
    simpleOpt("fash_jedi", "绝地长袍", "Jedi Robes", "Jedi Robes, Hooded Cloak, Layered Earth tones, Star Wars aesthetic"),
    simpleOpt("fash_android", "仿生皮肤", "Android Skin", "Synthetic Android Skin, White Panel lines, Exposed joints, Minimalist Future"),
    simpleOpt("fash_mech", "外骨骼", "Exoskeleton", "Exoskeleton Armor, Hydraulic pistons, Industrial Frame, Heavy Duty"),
    simpleOpt("fash_holo", "全息服装", "Holographic", "Clothing made of Holographic Light, Digital Glitch fabric, Translucent"),
    simpleOpt("fash_chrome", "液态金属", "Liquid Chrome", "Liquid Chrome Outfit, T-1000 texture, Reflective Silver body"),
    simpleOpt("fash_neo", "黑客皮衣", "Neo/Matrix", "Matrix Style, Black Latex Trench Coat, Sunglasses, Combat Boots"),
  ]
};

const grpFashFantasy: OptionGroup = {
  groupNameCN: "奇幻与盔甲", groupNameEN: "Fantasy & Armor",
  options: [
    simpleOpt("fash_plate", "板甲骑士", "Plate Armor", "Full Plate Steel Armor, Shining Knight, Helmet with Visor, Engraved details"),
    simpleOpt("fash_rogue", "盗贼皮甲", "Rogue Leather", "Leather Rogue Armor, Hooded, Daggers, Dark colors, Stealth gear"),
    simpleOpt("fash_mage", "法师长袍", "Mage Robes", "Wizard Robes, Starry patterns, Glowing Runes, Mystical Fabric, Hood"),
    simpleOpt("fash_barb", "野蛮人", "Barbarian", "Barbarian Loincloth, Fur boots, Leather straps, Bare chest, Conan style"),
    simpleOpt("fash_elf_a", "精灵轻甲", "Elven Armor", "Elven Mithril Armor, Leaf motifs, Elegant design, Silver and Green"),
    simpleOpt("fash_necro", "死灵法师", "Necromancer", "Necromancer Robes, Tattered black cloth, Bone accessories, Green fog"),
    simpleOpt("fash_dark_k", "黑骑士", "Dark Knight", "Dark Knight Armor, Spiked Pauldrons, Sauron aesthetic, Black Metal"),
    simpleOpt("fash_hunt", "恶魔猎人", "Demon Hunter", "Demon Hunter Gear, Long Coat, Crossbows, Hat, Bloodborne style"),
    simpleOpt("fash_druid", "德鲁伊", "Druid", "Druid Garb, Antlers, Leaves and Vines, Animal pelts, Nature texture"),
    simpleOpt("fash_valk", "女武神", "Valkyrie", "Valkyrie Armor, Winged Helmet, Silver Breastplate, Divine aesthetic"),
  ]
};

const grpFashVintage: OptionGroup = {
  groupNameCN: "年代秀", groupNameEN: "Vintage Eras",
  options: [
    simpleOpt("fash_20s", "20s爵士", "20s Flapper", "1920s Flapper Dress, Pearls, Feathers, Art Deco patterns, Great Gatsby"),
    simpleOpt("fash_50s", "50s画报", "50s Pin-up", "1950s Pin-up Style, Polka Dot Dress, High Waisted Shorts, Bandana, Rockabilly"),
    simpleOpt("fash_60s", "60s摩登", "60s Mod", "1960s Mod Fashion, Color block mini dress, Go-go boots, Twiggy style"),
    simpleOpt("fash_70s", "70s迪斯科", "70s Disco", "1970s Disco Fashion, Bell Bottoms, Wide Collar Shirt, Sequins, Afro"),
    simpleOpt("fash_80s", "80s权力", "80s Power", "1980s Power Suit, Shoulder Pads, Neon Windbreaker, Leg warmers, Perm hair"),
    simpleOpt("fash_90s", "90s极简", "90s Minimalist", "1990s Minimalist, Slip Dress, Kate Moss Heroin Chic, Calvin Klein aesthetic"),
    simpleOpt("fash_cowboy", "西部牛仔", "Cowboy", "Cowboy Outfit, Stetson Hat, Leather Chaps, Spurs, Bandana, Dust"),
    simpleOpt("fash_noir", "风衣侦探", "Film Noir", "Film Noir Detective, Beige Trench Coat, Fedora Hat, Cigarette smoke"),
  ]
};

const grpFashMaterial: OptionGroup = {
  groupNameCN: "特殊材质", groupNameEN: "Special Materials",
  options: [
    simpleOpt("fash_latex", "全黑乳胶", "Latex", "Tight Black Latex Catsuit, High Shine, Fetish Fashion aesthetics"),
    simpleOpt("fash_pvc", "透明PVC", "PVC", "Transparent Plastic Clothing, Clear PVC Raincoat, Futuristic"),
    simpleOpt("fash_lace", "全身蕾丝", "Lace Bodysuit", "Intricate Black Lace Bodysuit, See-through, Delicate patterns"),
    simpleOpt("fash_shib", "绳艺束缚", "Shibari", "Shibari Rope aesthetics, Artistic rope binding over clothes"),
    simpleOpt("fash_gold", "黄金甲", "Solid Gold", "Outfit made of Solid Gold, Golden Foil texture, Opulent"),
    simpleOpt("fash_bio", "生物膜", "Bio-Membrane", "Clothing made of Organic Membrane, Slimy texture, Alien fashion"),
    simpleOpt("fash_fire", "火焰衣", "Fire Dress", "Dress made of Living Fire, Burning fabric, Ember particles"),
    simpleOpt("fash_water", "水流衣", "Water Dress", "Dress made of Flowing Water, Liquid form, Splash shape"),
    simpleOpt("fash_smoke", "烟雾衣", "Smoke Outfit", "Outfit made of Black Smoke, Ethereal, Formless, Shadowy"),
    simpleOpt("fash_nude", "原始/无衣", "Primal/Nude", "No Clothing, Artistic Nude, Natural State, Strategically covered by shadow/hair"),
  ]
};

// Performance Groups (New from v4.2 PRD)

// 5.1 Micro-Expressions
const grpExpPos: OptionGroup = {
    groupNameCN: "快乐与狂喜", groupNameEN: "Positive & High Energy",
    options: [
        simpleOpt("exp_smile_gentle", "温柔浅笑", "Gentle Smile", "Soft gentle smile, Warm expression, Kind eyes, Relaxed features"),
        simpleOpt("exp_smile_bright", "灿烂笑容", "Bright Smile", "Bright beaming smile, Showing teeth, Radiating happiness, Crow's feet"),
        simpleOpt("exp_laugh", "开怀大笑", "Laughing", "Laughing hysterically, Head thrown back, Tears of joy, Mouth wide open"),
        simpleOpt("exp_excited", "兴奋/期待", "Excited", "Wide-eyed excitement, Dilated pupils, Eager expression, Mouth slightly open"),
        simpleOpt("exp_ecstasy", "狂喜/极乐", "Ecstasy", "Expression of pure ecstasy, Euphoric, Eyes rolling back, Blissful"),
        simpleOpt("exp_relief", "如释重负", "Relieved", "Sigh of relief, Relaxed brow, exhale, Contented"),
    ]
};
const grpExpNegLow: OptionGroup = {
    groupNameCN: "悲伤与抑郁", groupNameEN: "Negative & Low Energy",
    options: [
        simpleOpt("exp_sad", "忧郁/感伤", "Melancholic", "Melancholic expression, Downturned mouth, Sad eyes, Gloomy atmosphere"),
        simpleOpt("exp_cry_silent", "无声流泪", "Silent Crying", "Silent crying, Single tear rolling down cheek, Glassy eyes, Red nose"),
        simpleOpt("exp_cry_ugly", "痛哭流涕", "Ugly Crying", "Ugly crying, Sobbing uncontrollably, Scrunched face, Streaming tears, Grief"),
        simpleOpt("exp_disappoint", "失望/沮丧", "Disappointed", "Deeply disappointed, Looking down, Defeated expression, Sighing"),
        simpleOpt("exp_numb", "麻木/空洞", "Numb", "Numb expression, Thousand-yard stare, Hollow eyes, Traumatized, PTSD look"),
        simpleOpt("exp_pout", "委屈/嘟嘴", "Pouting", "Pouting, Quivering lip, Puppy dog eyes, Sulking"),
    ]
};
const grpExpNegHigh: OptionGroup = {
    groupNameCN: "愤怒与惊恐", groupNameEN: "Negative & High Energy",
    options: [
        simpleOpt("exp_frown", "皱眉/不悦", "Frowning", "Furrowed brows, Frowning, Displeased, Stern look"),
        simpleOpt("exp_angry", "愤怒/瞪视", "Angry", "Angry glare, Intense staring, Teeth clenched, Flared nostrils"),
        simpleOpt("exp_rage", "暴怒/嘶吼", "Rage", "Screaming in blind rage, Veins popping on forehead, Ferocious, Mouth wide open"),
        simpleOpt("exp_scared", "惊恐/畏惧", "Terrified", "Terrified expression, Pale face, Eyes wide open in shock, Sweating"),
        simpleOpt("exp_scream", "尖叫/恐惧", "Screaming", "Screaming in terror, Mouth agape, Horror movie expression"),
        simpleOpt("exp_pain", "痛苦/呻吟", "Pain", "Grimacing in agony, Gritting teeth, Eyes squeezed shut, Suffering"),
    ]
};
const grpExpComplex: OptionGroup = {
    groupNameCN: "复杂与社交", groupNameEN: "Complex & Social",
    options: [
        simpleOpt("exp_stoic", "冷漠/扑克脸", "Stoic", "Stoic, Deadpan, Emotionless, Poker face, Cool attitude"),
        simpleOpt("exp_smirk", "坏笑/得意", "Smirking", "Smirking, Cocky expression, One corner of mouth raised, Arrogant"),
        simpleOpt("exp_seduce", "魅惑/挑逗", "Seductive", "Seductive gaze, Bedroom eyes, Biting lower lip, Flirty"),
        simpleOpt("exp_doubt", "怀疑/挑眉", "Skeptical", "Skeptical, One eyebrow raised, Suspicious side-eye, Judging"),
        simpleOpt("exp_disgust", "厌恶/鄙视", "Disgusted", "Look of disgust, Sneering, Wrinkled nose, Revulsion"),
        simpleOpt("exp_crazy", "疯狂/病娇", "Crazy", "Psychotic break, Manic wide eyes, Creepy smile, Unhinged"),
        simpleOpt("exp_focus", "极度专注", "Focused", "Intense focus, Concentrating, Narrowed eyes, Studying"),
        simpleOpt("exp_drunk", "微醺/迷离", "Drunk", "Drunk expression, Flushed cheeks, Hazy unfocused eyes, Dazed"),
    ]
};

// 5.2 Static Poses
const grpPoseStand: OptionGroup = {
    groupNameCN: "站姿", groupNameEN: "Standing",
    options: [
        simpleOpt("pose_stand_hero", "英雄站姿", "Heroic Stance", "Heroic Power Stance, Legs apart, Hands on hips, Chest out, Low angle"),
        simpleOpt("pose_stand_cross", "抱臂/防御", "Arms Crossed", "Standing with arms crossed over chest, Defensive posture, Lean back"),
        simpleOpt("pose_stand_lean", "靠墙/慵懒", "Leaning", "Leaning casually against a wall, One leg up, Relaxed slouch"),
        simpleOpt("pose_stand_back", "背对/回眸", "Back Turned", "Standing with back to camera, Looking over shoulder, Mysterious silhouette"),
        simpleOpt("pose_stand_sexy", "S型/超模", "Model Pose", "Contrapposto pose, S-curve body line, Fashion model stance, Hip popped"),
        simpleOpt("pose_stand_hands", "插兜/耍帅", "Hands in Pockets", "Hands in pockets, Hunched shoulders, Cool vibe, Street style"),
    ]
};
const grpPoseSit: OptionGroup = {
    groupNameCN: "坐姿", groupNameEN: "Sitting",
    options: [
        simpleOpt("pose_sit_throne", "王座/霸气", "Throne Sitting", "Sitting on a throne, Manspreading, Dominant posture, Hands on armrests"),
        simpleOpt("pose_sit_cross", "二郎腿/优雅", "Legs Crossed", "Sitting with legs crossed, Elegant posture, Hands resting on knee"),
        simpleOpt("pose_sit_slump", "瘫坐/葛优躺", "Slumped", "Slumped in chair, Sprawled out, Total exhaustion, Melted posture"),
        simpleOpt("pose_sit_fetal", "抱膝/孤独", "Hugging Knees", "Sitting on floor hugging knees to chest, Fetal sitting, Vulnerable"),
        simpleOpt("pose_sit_squat", "亚洲蹲/街头", "Squatting", "Squatting low, Slavic squat, Heels on ground, Street thug vibe"),
        simpleOpt("pose_sit_zen", "打坐/冥想", "Meditating", "Lotus position, Meditating, Straight back, Hands in Mudra"),
        simpleOpt("pose_sit_desk", "伏案/工作", "Desk Sitting", "Sitting at a desk, Leaning forward, Elbows on table, Head in hands"),
    ]
};
const grpPoseLie: OptionGroup = {
    groupNameCN: "躺与地面", groupNameEN: "Lying & Ground",
    options: [
        simpleOpt("pose_lie_back", "大字仰卧", "Lying Back", "Lying on back, Sprawled out, Staring at ceiling, Defeated or Relaxed"),
        simpleOpt("pose_lie_side", "侧卧/美人", "Lying Side", "Lying on side, Propped up on one elbow, Romantic pose"),
        simpleOpt("pose_lie_fetal", "蜷缩/恐惧", "Fetal Floor", "Curled up in fetal position on the ground, Protecting head, Scared"),
        simpleOpt("pose_kneel", "跪地/祈祷", "Kneeling", "Kneeling on both knees, Upright posture, Submissive or Religious"),
        simpleOpt("pose_crawl", "爬行/求生", "Crawling", "Crawling on hands and knees, Dragging body, Desperate"),
        simpleOpt("pose_fall", "倒地/死亡", "Collapsed", "Collapsed on the floor, Unconscious pose, Twisted limbs"),
    ]
};
const grpPoseFantasy: OptionGroup = {
    groupNameCN: "特殊/超能", groupNameEN: "Fantasy & Dynamic",
    options: [
        simpleOpt("pose_float", "悬浮/神性", "Levitating", "Levitating in mid-air, Zero gravity pose, Body arched, Toes pointed"),
        simpleOpt("pose_upside", "倒吊", "Upside Down", "Hanging upside down, Spider-man pose, Hair hanging down"),
        simpleOpt("pose_fall_air", "高空坠落", "Free Falling", "Free falling through the air, Limbs flailing, Wind resistance"),
        simpleOpt("pose_landing", "超级英雄落地", "Superhero Landing", "Three-point landing pose, One fist on ground, Looking up, Dynamic"),
        simpleOpt("pose_contort", "扭曲/非人", "Contorted", "Contorted body, Unnatural joint angles, Exorcist style, Horror pose"),
    ]
};

// 5.3 Dynamic Actions
const grpActCombat: OptionGroup = {
    groupNameCN: "战斗", groupNameEN: "Combat & Violence",
    options: [
        simpleOpt("act_punch", "出拳/攻击", "Punching", "Throwing a punch, Dynamic motion blur, Fist connecting, Action shot"),
        simpleOpt("act_kick", "踢腿/飞踢", "Kicking", "High kick, Martial arts move, Leg extended, Dynamic composition"),
        simpleOpt("act_sword", "挥剑/斩击", "Sword Swinging", "Swinging a sword, Blade blur, Attack stance, Warrior scream"),
        simpleOpt("act_gun", "举枪/射击", "Shooting", "Firing a gun, Muzzle flash, Recoil, Aiming down sights"),
        simpleOpt("act_dodge", "闪避/格挡", "Dodging", "Dodging an attack, Blocking with arms, Defensive maneuver"),
        simpleOpt("act_choke", "掐脖/压制", "Choking", "Choking someone (off-camera), Aggressive grip, Dominating"),
        simpleOpt("act_explode", "爆破背景", "Walking from Explosion", "Walking away from explosion, Cool guys don't look at explosions"),
    ]
};
const grpActMove: OptionGroup = {
    groupNameCN: "移动", groupNameEN: "Movement",
    options: [
        simpleOpt("act_run", "冲刺/奔跑", "Sprinting", "Sprinting towards camera, Hair flying back, Intense speed, Motion blur"),
        simpleOpt("act_walk", "走秀/漫步", "Strutting", "Walking confidently, Strutting, Fashion runway walk, Long strides"),
        simpleOpt("act_jump", "跳跃/跑酷", "Jumping", "Jumping over obstacle, Parkour move, Mid-air suspension"),
        simpleOpt("act_dance", "舞蹈/旋转", "Dancing", "Dancing, Twirling, Ballet move or Club dancing, Flowing motion"),
        simpleOpt("act_climb", "攀爬", "Climbing", "Climbing a wall/cliff, Hanging by fingertips, Strain"),
    ]
};
const grpActLife: OptionGroup = {
    groupNameCN: "生活与嗜好", groupNameEN: "Daily Life",
    options: [
        simpleOpt("act_smoke", "吸烟/吐雾", "Smoking", "Smoking a cigarette, Exhaling thick smoke cloud, Holding lit cigarette"),
        simpleOpt("act_drink", "饮酒/喝水", "Drinking", "Drinking from a glass, Sipping coffee/cocktail, Holding cup"),
        simpleOpt("act_eat", "进食", "Eating", "Eating food, Biting into fruit/burger, Messy eating"),
        simpleOpt("act_phone", "看手机/自拍", "Using Phone", "Looking at smartphone screen, Taking a selfie, Face illuminated by screen"),
        simpleOpt("act_read", "阅读", "Reading", "Reading a book/newspaper, Turned pages, Focused eyes"),
        simpleOpt("act_write", "书写/绘图", "Writing", "Writing in a notebook, Drawing, Holding pen"),
        simpleOpt("act_makeup", "化妆/照镜", "Applying Makeup", "Applying lipstick/makeup, Looking in handheld mirror"),
    ]
};
const grpActTech: OptionGroup = {
    groupNameCN: "科技与魔法", groupNameEN: "Tech & Magic",
    options: [
        simpleOpt("act_type", "黑客/打字", "Typing", "Typing furiously on keyboard, Hacker aesthetic, Multiple screens"),
        simpleOpt("act_holo", "全息操作", "Holographic Interface", "Interacting with holographic interface, Touching floating UI elements"),
        simpleOpt("act_fix", "修理/焊接", "Fixing", "Fixing machinery, Wielding a wrench/welder, Sparks flying"),
        simpleOpt("act_cast", "施法/结印", "Casting Spell", "Casting a magic spell, Glowing hands, Arcane energy flowing"),
        simpleOpt("act_summon", "召唤仪式", "Summoning", "Summoning ritual, Hands raised to sky, Chanting"),
        simpleOpt("act_card", "占卜/玩牌", "Card Reading", "Holding Tarot cards, Shuffling poker cards, Magician gesture"),
    ]
};

// 5.4 Gaze (Single Group)
const grpGaze: OptionGroup = {
    groupNameCN: "视线与连接", groupNameEN: "Gaze & Connection",
    options: [
        simpleOpt("gaze_cam", "直视镜头", "At Camera", "Looking directly at camera, Intense Eye Contact, Breaking the 4th wall"),
        simpleOpt("gaze_away", "看向画外", "Looking Away", "Looking away from camera, Staring into distance, Profile view"),
        simpleOpt("gaze_up", "仰望", "Looking Up", "Looking up at sky, Hopeful or Desperate gaze, Chin up"),
        simpleOpt("gaze_down", "俯视/低头", "Looking Down", "Looking down, Chin to chest, Shame or Shyness or God-like view"),
        simpleOpt("gaze_side", "斜眼/瞥视", "Side-Eye", "Side-eye glance, Suspicious look, Peek"),
        simpleOpt("gaze_close", "闭眼", "Closed Eyes", "Eyes closed, Sleeping, Dead, or Meditating"),
        simpleOpt("gaze_obs", "遮挡/无视", "Obscured", "Eyes obscured by hair/shadow/sunglasses, Faceless"),
        simpleOpt("gaze_crazy", "库布里克凝视", "Kubrick Stare", "The Kubrick Stare, Head tilted down but eyes looking up, Menacing"),
        simpleOpt("gaze_roll", "翻白眼", "Eye Roll", "Rolling eyes, Annoyed expression"),
    ]
};

export const humanOptions = {
  biology: [
    { 
      id: 'species', 
      titleCN: '物种原型', titleEN: 'Species', 
      options: [
        simpleOpt("spec_human", "人类(智人)", "Human", "Human, Homo Sapiens"),
        simpleOpt("spec_elf", "精灵", "Elf", "Elf, Elven, Pointed Ears, Elegant Features"),
        simpleOpt("spec_orc", "兽人/奥克", "Orc", "Orc, Green Skin, Tusks, Muscular, Brutish"),
        simpleOpt("spec_vampire", "吸血鬼", "Vampire", "Vampire, Pale Skin, Fangs, Red Eyes, Gothic Aura"),
        simpleOpt("spec_demon", "恶魔/提夫林", "Demon", "Demon, Tiefling, Horns, Red Skin, Tail"),
        simpleOpt("spec_angel", "天使/天族", "Angel", "Angel, Celestial, Wings, Halo, Divine"),
        simpleOpt("spec_cyborg", "赛博格", "Cyborg", "Cyborg, Mechanical Joints, Panel Lines, Half-Human"),
        simpleOpt("spec_android", "仿生人", "Android", "Android, Synthetic Skin, Ball Jointed Doll, Artificial Perfection"),
        simpleOpt("spec_alien", "类人外星人", "Alien", "Humanoid Alien, Exotic Features, Star Trek Style"),
        simpleOpt("spec_werewolf", "狼人(直立)", "Werewolf", "Werewolf, Lycanthrope, Wolf Head, Fur Covered Body, Claws"),
        simpleOpt("spec_undead", "丧尸/亡灵", "Undead", "Undead, Zombie, Rotting Flesh, Hollow Eyes"),
      ] 
    },
    { 
      id: 'gender', 
      titleCN: '性别', titleEN: 'Gender', 
      options: [
        simpleOpt("gen_male", "男性", "Male", "Male, Masculine features"),
        simpleOpt("gen_female", "女性", "Female", "Female, Feminine features"),
        simpleOpt("gen_andro", "中性", "Androgynous", "Androgynous, Non-binary, Ambiguous Gender"),
        simpleOpt("gen_trans", "跨性别", "Transgender", "Transgender, Soft Masculinity/Femininity mix"),
      ] 
    },
    { 
      id: 'age', 
      titleCN: '年龄', titleEN: 'Age', 
      options: [
        simpleOpt("age_infant", "婴幼儿 (1-3)", "Infant/Toddler", "Toddler, 2 years old, Baby features, Chubby cheeks"),
        simpleOpt("age_kid", "幼童 (3-6)", "Young Kid", "Preschooler, 5 years old, Small child, Innocent look"),
        simpleOpt("age_child", "儿童 (6-12)", "Child", "Child, 10 years old, Youthful"),
        simpleOpt("age_teen", "少年 (13-19)", "Teenager", "Teenager, 18 years old, Adolescent"),
        simpleOpt("age_young", "青年 (20-29)", "Young Adult", "Young Adult, 25 years old"),
        simpleOpt("age_adult", "成年 (30-45)", "Adult", "Adult, 35 years old, Mature"),
        simpleOpt("age_middle", "中年 (46-60)", "Middle-aged", "Middle-aged, 50 years old, Mature lines"),
        simpleOpt("age_elder", "老年 (60-80)", "Elderly", "Elderly, 70 years old, Wrinkled"),
        simpleOpt("age_ancient", "极老 (80+)", "Ancient", "Ancient, 90 years old, Deeply weathered"),
      ] 
    },
    { 
      id: 'ethnicity', 
      titleCN: '族裔/血统', titleEN: 'Ethnicity', 
      options: [
        simpleOpt("eth_east_asia", "东亚", "East Asian", "East Asian, Chinese/Japanese/Korean descent"),
        simpleOpt("eth_se_asia", "东南亚", "SE Asian", "Southeast Asian, Thai/Vietnamese descent"),
        simpleOpt("eth_south_asia", "南亚/印度", "South Asian", "South Asian, Indian descent"),
        simpleOpt("eth_caucasian", "高加索(白人)", "Caucasian", "Caucasian, European descent"),
        simpleOpt("eth_black", "非裔(黑人)", "Black", "Black, African descent, Dark Ebony Skin"),
        simpleOpt("eth_latino", "拉丁/西班牙", "Latino", "Hispanic, Latino"),
        simpleOpt("eth_middle_east", "中东", "Middle Eastern", "Middle Eastern, Arab/Persian descent"),
        simpleOpt("eth_fantasy", "幻想种", "Fantasy", "Exotic Fantasy Features, Unearthly"),
      ] 
    },
    { 
      id: 'body', 
      titleCN: '身材', titleEN: 'Body Silhouette', 
      options: [
        simpleOpt("body_skinny", "消瘦", "Skinny", "Emaciated, Skinny, Visible bones"),
        simpleOpt("body_slim", "纤细", "Slim", "Slim build, Slender, Petite"),
        simpleOpt("body_fit", "匀称", "Fit", "Fit body, Athletic Toned"),
        simpleOpt("body_muscle", "肌肉", "Muscular", "Muscular, Ripped, Bodybuilder physique"),
        simpleOpt("body_curvy", "丰满", "Curvy", "Curvy figure, Voluptuous, Hourglass"),
        simpleOpt("body_allure", "性感/惹火", "Voluptuous", "Voluptuous, Hourglass figure, Curvy and Fit, Pin-up physique"),
        simpleOpt("body_chubby", "微胖", "Chubby", "Chubby, Soft body, Plus size"),
        simpleOpt("body_heavy", "魁梧/肥胖", "Heavy", "Heavily built, Obese, Massive frame"),
      ] 
    },
  ],

  // Profession Group (Consolidated)
  profession: [
      {
          id: 'profession',
          titleCN: '职业与身份', titleEN: 'Profession & Archetype',
          options: [
              grpProfCorp, grpProfLabor, grpProfMed, grpProfLaw, grpProfArt, grpProfSport, 
              grpProfFanGen, grpProfOutlaw,
              grpProfEast, grpProfJp, grpProfHighFan, grpProfAncient, grpProfTribal, grpProfVictorian
          ],
          multi: false, max: 1
      }
  ],

  // New Consolidated Visual Modules (5 items matching 5 Biology items)
  visuals: [
    { 
      id: 'skin', 
      titleCN: '皮肤', titleEN: 'Skin', 
      options: [grpSkinTone, grpSkinMaterial],
      multi: true, max: 2 
    },
    { 
      id: 'hair', 
      titleCN: '毛发', titleEN: 'Hair', 
      options: [grpHairLength, grpHairStyle, grpHairColor],
      multi: true, max: 4
    },
    { 
      id: 'face', 
      titleCN: '面容', titleEN: 'Face', 
      options: [grpFaceVibe, grpFacePreset, grpMakeup],
      multi: true, max: 4
    },
    { 
      id: 'traits', 
      titleCN: '特征', titleEN: 'Traits', 
      options: [grpMutations, grpImperfections],
      multi: true, max: 5
    },
    { 
      id: 'fashion', 
      titleCN: '服饰', titleEN: 'Fashion', 
      options: [
        grpFashHigh, grpFashStreet, grpFashSub, grpFashProf, 
        grpFashTrad, grpFashScifi, grpFashFantasy, grpFashVintage, grpFashMaterial
      ],
      multi: true, max: 3
    }
  ],

  performance: [
    { 
      id: 'expression', 
      titleCN: '表情', titleEN: 'Expression', 
      options: [grpExpPos, grpExpNegLow, grpExpNegHigh, grpExpComplex],
      multi: true, max: 2
    },
    { 
      id: 'pose', 
      titleCN: '静态姿态', titleEN: 'Pose', 
      options: [grpPoseStand, grpPoseSit, grpPoseLie, grpPoseFantasy]
    },
    { 
      id: 'action', 
      titleCN: '动态交互', titleEN: 'Action', 
      options: [grpActCombat, grpActMove, grpActLife, grpActTech]
    },
    { 
      id: 'gaze', 
      titleCN: '视线', titleEN: 'Gaze', 
      options: [grpGaze]
    },
  ]
};

// --- CREATURE OPTIONS (Layer 1-B Ultimate Expansion v4.2) ---

// 1. Blueprint
const grpBioClass: OptionGroup = {
  groupNameCN: "纲目/原型", groupNameEN: "Class & Archetype",
  options: [
    simpleOpt("cls_feline", "猫科 (虎/豹)", "Feline", "Feline Beast, Tiger anatomy, Lion features, Agile body, Predatory"),
    simpleOpt("cls_canine", "犬科 (狼/狐)", "Canine", "Canine Beast, Wolf anatomy, Fox features, Snout, Furry"),
    simpleOpt("cls_ursine", "熊科 (巨兽)", "Ursine", "Ursine Beast, Grizzly Bear anatomy, Massive muscular build, Heavy paws"),
    simpleOpt("cls_primate", "灵长类 (猿)", "Primate", "Primate Beast, Gorilla anatomy, Long arms, Human-like hands, Hunchback"),
    simpleOpt("cls_reptile", "爬行类 (蜥蜴)", "Reptile", "Reptilian Beast, Komodo Dragon anatomy, Scaled body, Cold-blooded"),
    simpleOpt("cls_avian", "鸟纲 (猛禽)", "Avian", "Avian Creature, Eagle anatomy, Large Wings, Talons, Beak"),
    simpleOpt("cls_insect", "昆虫纲 (甲虫)", "Insectoid", "Insectoid Creature, Arthropod, Hard Exoskeleton, Mantis/Beetle anatomy"),
    simpleOpt("cls_arachnid", "蛛形纲 (蜘蛛)", "Arachnid", "Arachnid Creature, Spider anatomy, Multiple eyes, 8 legs, Web"),
    simpleOpt("cls_dragon", "真龙 (西方)", "Dragon", "Majestic Western Dragon, Dinosaur body, Bat wings, Long neck"),
    simpleOpt("cls_loong", "神龙 (东方)", "Loong", "Eastern Loong Dragon, Serpentine body, Antlers, Floating, No wings"),
    simpleOpt("cls_aquatic", "水生 (深海)", "Aquatic", "Aquatic Sea Monster, Shark anatomy, Fins, Gills, Streamlined"),
    simpleOpt("cls_cephalo", "头足纲 (触手)", "Cephalopod", "Cephalopod, Octopus anatomy, Tentacled Horror, Squid-like, Soft body"),
    simpleOpt("cls_worm", "蠕虫 (沙丘)", "Worm", "Giant Worm, Segmented body, Lamprey mouth, No limbs, Burrower"),
    simpleOpt("cls_slime", "软体/史莱姆", "Slime", "Amorphous Slime, Gelatinous Cube, Blob Monster, Translucent, Shapeless"),
    simpleOpt("cls_plant", "植物怪 (树人)", "Plant/Treant", "Botanical Creature, Treant, Living Wood, Vines and Roots anatomy"),
    simpleOpt("cls_construct", "构装体 (魔像)", "Construct", "Construct Golem, Artificial Life, Animated Statue, Robot"),
    simpleOpt("cls_undead", "亡灵生物", "Undead", "Undead Creature, Zombie Beast, Skeleton anatomy, Rotting"),
  ]
};

const grpBioStance: OptionGroup = {
  groupNameCN: "姿态/体型", groupNameEN: "Stance & Posture",
  options: [
    simpleOpt("stn_quad", "四足着地", "Quadruped", "Quadrupedal stance, On all fours, Stable posture"),
    simpleOpt("stn_biped", "双足 (霸王龙)", "Bipedal", "Bipedal Theropod stance, Hunched forward, T-Rex posture, Tail balance"),
    simpleOpt("stn_humanoid", "类人直立", "Humanoid", "Humanoid stance, Upright, Two legs two arms, Werewolf posture"),
    simpleOpt("stn_tripod", "三足 (异星)", "Tripodal", "Tripodal stance, Three legs, Alien biology, War of the Worlds style"),
    simpleOpt("stn_multi", "多足 (蜈蚣)", "Multi-legged", "Multi-legged, Centipede locomotion, Skittering posture"),
    simpleOpt("stn_slither", "盘踞/蛇行", "Slithering", "Coiled posture, Slithering on ground, S-shape body"),
    simpleOpt("stn_hover", "反重力/悬浮", "Hovering", "Levitating, Hovering in mid-air, Psionic float, No contact with ground"),
    simpleOpt("stn_fly", "飞行/滞空", "Flying", "Flying, Wings fully spread, Aerial dynamic pose"),
    simpleOpt("stn_swim", "游动", "Swimming", "Swimming underwater, Fin propulsion, Weightless"),
    simpleOpt("stn_burrow", "掘地/潜伏", "Burrowing", "Burrowing, Half-buried in ground, Erupting from earth"),
  ]
};

const grpBioScale: OptionGroup = {
  groupNameCN: "体型量级", groupNameEN: "Scale",
  options: [
    simpleOpt("scl_micro", "微观 (细胞级)", "Microscopic", "Microscopic scale, Cellular level details, Visible only under microscope, Bio-luminescent specks"),
    simpleOpt("scl_tiny", "微型 (指尖)", "Tiny", "Tiny scale, Miniature creature, Fitting in palm of hand, Macro photography perspective"),
    simpleOpt("scl_small", "小型 (膝高)", "Small", "Small scale, Knee-high, Pet sized, Lightweight frame, Low angle shot"),
    simpleOpt("scl_med", "中型 (人高)", "Medium", "Medium scale, Human height, Average biological size, Eye-level view"),
    simpleOpt("scl_large", "大型 (载具级)", "Large", "Large scale, Massive build, Heavyweight, Size of a car, Imposing bulk"),
    simpleOpt("scl_giant", "巨型 (楼层级)", "Giant", "Giant scale, Multi-story tall, Massive height, Shaking the ground, Looming over humans"),
    simpleOpt("scl_colossal", "超巨 (地标级)", "Colossal", "Colossal scale, Towering over buildings, Skyscraper height, Megalophobia, Epic scale"),
    simpleOpt("scl_cosmic", "星环 (神级)", "Cosmic", "Cosmic scale, Celestial body size, Larger than worlds, Nebula background, World-eater"),
  ]
};

// 2. Integumentary
const grpBioTexture: OptionGroup = {
  groupNameCN: "表皮材质", groupNameEN: "Texture",
  options: [
    simpleOpt("tex_fur_s", "短绒毛", "Short Fur", "Velvet Short Fur, Soft texture, Sleek"),
    simpleOpt("tex_fur_l", "长鬃毛", "Long Fur", "Shaggy Long Fur, Matted hair, Wild mane"),
    simpleOpt("tex_scale_h", "硬鳞 (龙/鳄)", "Hard Scales", "Hard Armored Scales, Plate armor skin, Rough texture"),
    simpleOpt("tex_scale_s", "软鳞 (蛇/鱼)", "Soft Scales", "Smooth Iridescent Scales, Wet shine, Glistening"),
    simpleOpt("tex_skin", "皮革/无毛", "Leathery", "Leathery Hide, Wrinkled Elephant skin, Rhino texture"),
    simpleOpt("tex_chitin", "甲壳 (光泽)", "Chitin", "Hard Chitin Exoskeleton, Beetle Shell, Glossy black"),
    simpleOpt("tex_feather", "羽毛", "Feathers", "Covered in Feathers, Plumage, Bird-like texture"),
    simpleOpt("tex_slime", "粘液", "Slime", "Slimy Mucus, Dripping wet, Gooey, Translucent"),
    simpleOpt("tex_rot", "腐肉/骨骼", "Rotting", "Rotting Flesh, Exposed Bone, Decaying, Zombie texture"),
    simpleOpt("tex_bark", "树皮/苔藓", "Bark", "Wooden Bark texture, Covered in Moss and Lichen"),
    simpleOpt("tex_rock", "岩石/花岗", "Rock", "Living Rock, Granite texture, Cracked Stone surface"),
    simpleOpt("tex_metal", "机械/金属", "Metal", "Chrome Metal plating, Rusted Iron, Robotic parts, Cables"),
  ]
};

const grpBioElement: OptionGroup = {
  groupNameCN: "元素属性", groupNameEN: "Element",
  options: [
    simpleOpt("elm_fire", "火焰/熔岩", "Fire", "Body made of Fire and Magma, Burning Ember skin, Smoke trails"),
    simpleOpt("elm_ice", "冰霜/水晶", "Ice", "Body made of Ice Crystals, Glacial blue, Translucent, Frozen"),
    simpleOpt("elm_thunder", "雷电/能量", "Thunder", "Body made of Lightning, Electrical sparks, Crackling energy"),
    simpleOpt("elm_shadow", "暗影/虚空", "Shadow", "Body made of Black Smoke, Shadow particles, Void texture"),
    simpleOpt("elm_light", "神圣/光辉", "Light", "Body made of Pure Light, Glowing Aura, Celestial gold"),
    simpleOpt("elm_galaxy", "星空/宇宙", "Galaxy", "Body made of Stars and Nebula, Galaxy texture, Cosmic"),
    simpleOpt("elm_water", "水流/液体", "Water", "Body made of Flowing Water, Liquid form, Bubbles"),
    simpleOpt("elm_tech", "数据/全息", "Holographic", "Holographic Body, Digital Glitch, Matrix Code texture"),
  ]
};

// 3. Anatomy
const grpBioHead: OptionGroup = {
  groupNameCN: "头部特征", groupNameEN: "Head Features",
  options: [
    simpleOpt("hd_horns", "巨角", "Large Horns", "Large Curved Ram Horns, Antlers, Demonic Horns"),
    simpleOpt("hd_fangs", "獠牙", "Fangs", "Long Sharp Fangs, Sabertooth, Rows of Shark Teeth"),
    simpleOpt("hd_beak", "鸟喙", "Beak", "Sharp Hooked Beak, Raptor Beak"),
    simpleOpt("hd_mandible", "昆虫口器", "Mandibles", "Insect Mandibles, Pincers, Alien mouth"),
    simpleOpt("hd_multi_eye", "复眼/多眼", "Multi-Eyes", "Cluster of Spider Eyes, Compound Eyes, Many eyes"),
    simpleOpt("hd_cyclops", "独眼", "Cyclops", "Single Cyclops Eye, Glowing eye"),
    simpleOpt("hd_no_face", "无面/盲视", "Faceless", "Faceless, Smooth blank head, Eyeless, Xenomorph style"),
    simpleOpt("hd_mane", "雄狮鬃毛", "Mane", "Thick Lion Mane, Neck Frill"),
    simpleOpt("hd_skull", "外露头骨", "Skull", "Exposed Skull face, Bone mask"),
    simpleOpt("hd_tentacle", "面部触须", "Tentacles", "Cthulhu style Tentacle beard, Feelers"),
  ]
};

const grpBioBody: OptionGroup = {
  groupNameCN: "身体部件", groupNameEN: "Body Parts",
  options: [
    simpleOpt("bod_wing_bat", "恶魔翼", "Bat Wings", "Large Leathery Bat Wings, Dragon Wings"),
    simpleOpt("bod_wing_fea", "天使翼", "Feathered Wings", "Massive Feathered Wings, Eagle Wings"),
    simpleOpt("bod_wing_ins", "昆虫翼", "Insect Wings", "Translucent Dragonfly Wings, Beetle Wings"),
    simpleOpt("bod_tail", "长尾", "Tail", "Long Whip-like Tail, Prehensile Tail"),
    simpleOpt("bod_spines", "背刺", "Spines", "Sharp Spines along back, Stegosaurus plates, Razor fin"),
    simpleOpt("bod_arms", "多臂", "Multi-Arms", "Multiple extra arms, Four arms, Shiva style"),
    simpleOpt("bod_tentacle", "背部触手", "Back Tentacles", "Wriggling Tentacles sprouting from back"),
    simpleOpt("bod_claw", "利爪", "Claws", "Razor sharp Claws, Massive Talons"),
    simpleOpt("bod_vents", "生物喷口", "Vents", "Bioluminescent Vents, Gas pores, Alien texture"),
    simpleOpt("bod_udder", "囊肿/卵", "Sacks", "Alien Egg Sacks, Gross biological texture"),
  ]
};

// 4. Soul & Action
const grpBioMood: OptionGroup = {
  groupNameCN: "情绪状态", groupNameEN: "Mood / State",
  options: [
    simpleOpt("md_fierce", "凶猛/狂暴", "Fierce", "Fierce, Predatory, Aggressive, Dangerous, Enraged"),
    simpleOpt("md_noble", "高贵/神性", "Noble", "Noble, Majestic, Divine Guardian, Proud, Stoic"),
    simpleOpt("md_scary", "恐怖/惊悚", "Scary", "Terrifying, Nightmarish, Unsettling, Eldritch Horror"),
    simpleOpt("md_cute", "可爱/萌系", "Cute", "Cute, Adorable, Chibi proportions, Big round eyes, Fluffy"),
    simpleOpt("md_sad", "悲伤/垂死", "Sad", "Wounded, Dying, Sad expression, Weak, Suffering"),
    simpleOpt("md_sleep", "休眠/沉睡", "Sleeping", "Dormant, Sleeping, Hibernating, Peaceful"),
    simpleOpt("md_alien", "未知/冷漠", "Alien", "Alien, Unknowable, Insect-like intelligence, Cold"),
  ]
};

const grpBioAction: OptionGroup = {
  groupNameCN: "动态行为", groupNameEN: "Action",
  options: [
    simpleOpt("act_roar", "咆哮/嘶吼", "Roaring", "Roaring towards camera, Mouth wide open, Baring teeth"),
    simpleOpt("act_hunt", "潜行/狩猎", "Hunting", "Stalking prey, Low to ground, Ready to pounce"),
    simpleOpt("act_attack", "扑咬/攻击", "Attacking", "Mid-air pounce, Biting, Attacking, Dynamic blur"),
    simpleOpt("act_eat", "进食/吞噬", "Eating", "Eating prey, Chewing, Blood on mouth"),
    simpleOpt("act_fly", "飞行/俯冲", "Flying", "Diving through air, Gliding, Wings spread"),
    simpleOpt("act_swim", "游动", "Swimming", "Swimming gracefully, Propelling through water"),
    simpleOpt("act_emerge", "破土/浮现", "Emerging", "Emerging from the ground/water, Bursting out"),
    simpleOpt("act_hatch", "孵化", "Hatching", "Hatching from an egg, Gooey, Newborn"),
    simpleOpt("act_perch", "栖息/蹲伏", "Perching", "Perched on a high point, Gargoyle pose, Observing"),
    simpleOpt("act_howl", "长啸", "Howling", "Howling at the moon, Head tilted back"),
  ]
};

export const creatureOptions = {
  blueprint: [
    {
       id: 'class', titleCN: '生物纲目', titleEN: 'Class',
       options: grpBioClass.options
    },
    {
       id: 'stance', titleCN: '姿态/体型', titleEN: 'Stance',
       options: grpBioStance.options
    },
    {
       id: 'scale', titleCN: '体型量级', titleEN: 'Scale',
       options: grpBioScale.options
    },
  ],
  integumentary: [
    {
       id: 'texture', titleCN: '表皮材质', titleEN: 'Texture',
       options: grpBioTexture.options,
       multi: true, max: 3
    },
    {
       id: 'element', titleCN: '元素属性', titleEN: 'Element',
       options: grpBioElement.options,
       multi: true, max: 6
    }
  ],
  anatomy: [
    {
       id: 'headFeatures', titleCN: '头部特征', titleEN: 'Head Features',
       options: grpBioHead.options,
       multi: true, max: 6
    },
    {
       id: 'bodyParts', titleCN: '身体部件', titleEN: 'Body Parts',
       options: grpBioBody.options,
       multi: true, max: 6
    }
  ],
  performance: [
    {
       id: 'mood', titleCN: '情绪/状态', titleEN: 'Mood',
       options: grpBioMood.options,
       multi: true, max: 2
    },
    {
       id: 'action', titleCN: '动作', titleEN: 'Action',
       options: grpBioAction.options,
       multi: true, max: 2
    }
  ]
};

// --- SCENE OPTIONS (Layer 2 Ultimate v5.0) ---

// 1. Camera & Lighting
const grpShot: OptionGroup = {
  groupNameCN: "景别", groupNameEN: "Shot Size",
  options: [
    simpleOpt("shot_ecu", "大特写 (ECU)", "Extreme Close-up", "Extreme Close-up, Macro focus, Iris detail, Skin texture"),
    simpleOpt("shot_cu", "近景 (CU)", "Close-up", "Close-up shot, Face focus, Emotional expression"),
    simpleOpt("shot_mcu", "中近景 (MCU)", "Medium Close-up", "Medium Close-up, Chest up, Portrait composition"),
    simpleOpt("shot_med", "中景 (MS)", "Medium Shot", "Medium shot, Waist up, Cowboy shot"),
    simpleOpt("shot_full", "全景/全身 (FS)", "Full Body", "Full Body shot, Head to toe, Showing outfit"),
    simpleOpt("shot_wide", "远景 (WS)", "Wide Shot", "Wide shot, Environmental portrait, Character in context"),
    simpleOpt("shot_ext", "大远景 (EWS)", "Extreme Wide Shot", "Extreme Wide shot, Epic scale, Tiny figure in landscape"),
  ]
};

const grpLens: OptionGroup = {
  groupNameCN: "焦段", groupNameEN: "Focal Length",
  options: [
    simpleOpt("len_14mm", "14mm (超广角)", "14mm Ultra-Wide", "14mm lens, Ultra-Wide Angle, Distorted perspective, Epic scope"),
    simpleOpt("len_24mm", "24mm (广角)", "24mm Wide", "24mm lens, Wide Angle, Dynamic composition"),
    simpleOpt("len_35mm", "35mm (人文)", "35mm Street", "35mm lens, Street photography style, Documentary feel"),
    simpleOpt("len_50mm", "50mm (人眼)", "50mm Standard", "50mm lens, Natural perspective, Standard lens"),
    simpleOpt("len_85mm", "85mm (人像)", "85mm Portrait", "85mm lens, Portrait lens, Compression, Flattering face"),
    simpleOpt("len_100mm", "100mm (微距)", "100mm Macro", "100mm Macro lens, Extreme detail, Insect scale"),
    simpleOpt("len_200mm", "200mm (长焦)", "200mm Telephoto", "200mm Telephoto lens, Background compression, Flat perspective"),
  ]
};

const grpAngle: OptionGroup = {
  groupNameCN: "机位角度", groupNameEN: "Camera Angle",
  options: [
    simpleOpt("ang_eye", "平视", "Eye-Level", "Eye-Level angle, Neutral perspective"),
    simpleOpt("ang_low", "低角度 (仰视)", "Low Angle", "Low Angle shot, Worm's Eye view, Looking up, Imposing"),
    simpleOpt("ang_high", "高角度 (俯视)", "High Angle", "High Angle shot, Looking down, Vulnerable subject"),
    simpleOpt("ang_top", "上帝视角 (顶视)", "Top-down / Aerial", "Top-down view, Aerial angle, Drone shot, Map view"),
    simpleOpt("ang_dutch", "荷兰角 (倾斜)", "Dutch Angle", "Dutch Angle, Tilted camera, Unease, Dynamic tension"),
    simpleOpt("ang_pov", "第一人称 (POV)", "POV", "POV Shot, First Person perspective, Handheld camera"),
    simpleOpt("ang_shoulder", "过肩镜头", "Over-the-Shoulder", "Over-the-Shoulder shot, Behind the back"),
  ]
};

const grpCamFX: OptionGroup = {
  groupNameCN: "镜头特效", groupNameEN: "Camera FX",
  options: [
    simpleOpt("fx_bokeh", "大光圈虚化", "Bokeh", "Bokeh, Shallow Depth of Field, f/1.2, Blurry background"),
    simpleOpt("fx_swirly", "旋焦 (老镜头)", "Swirly Bokeh", "Swirly Bokeh, Petzval lens effect, Vintage distortion"),
    simpleOpt("fx_tilt", "移轴 (微缩)", "Tilt-shift", "Tilt-shift lens, Miniature effect, Blurry top and bottom"),
    simpleOpt("fx_motion", "动态模糊", "Motion Blur", "Motion Blur, Speed lines, Long Exposure, Dragging shutter"),
    simpleOpt("fx_prism", "棱镜/重影", "Prism Effect", "Prism photography, Fractal glass effect, Kaleidoscopic split"),
    simpleOpt("fx_double", "双重曝光", "Double Exposure", "Double Exposure, Superimposed images, Silhouette overlay"),
    simpleOpt("fx_fish", "鱼眼畸变", "Fisheye", "Fisheye lens distortion, Sphere perspective, GoPro style"),
    simpleOpt("fx_chromatic", "色差/故障", "Chromatic Aberration", "Chromatic Aberration, RGB shift, Glitch edge"),
    simpleOpt("fx_vignette", "暗角", "Vignette", "Heavy Vignette, Spotlight center, Dark corners"),
  ]
};

const grpLighting: OptionGroup = {
  groupNameCN: "专业布光", groupNameEN: "Lighting",
  options: [
    simpleOpt("lit_rem", "伦勃朗光", "Rembrandt", "Rembrandt Lighting, Chiaroscuro, Triangle light on cheek, Moody"),
    simpleOpt("lit_butter", "蝴蝶光", "Butterfly", "Butterfly Lighting, Paramount lighting, Shadow under nose, Glamour"),
    simpleOpt("lit_split", "侧逆光/阴阳脸", "Split Lighting", "Split Lighting, Side lighting, Half face in shadow, High contrast"),
    simpleOpt("lit_rim", "轮廓光", "Rim Lighting", "Rim Lighting, Backlight, Halo effect, Separated from background"),
    simpleOpt("lit_sil", "剪影", "Silhouette", "Silhouette, Backlit, Dark figure against bright background"),
    simpleOpt("lit_soft", "柔光箱", "Softbox", "Softbox Lighting, Diffuse light, Soft shadows, Studio look"),
    simpleOpt("lit_hard", "硬光", "Hard Light", "Hard Light, Sharp shadows, High contrast, Noir style"),
    simpleOpt("lit_vol", "体积光/丁达尔", "Volumetric", "Volumetric Lighting, God Rays, Shafts of light, Dusty air"),
    simpleOpt("lit_cine", "电影感布光", "Cinematic", "Cinematic Lighting, Teal and Orange, Dramatic atmosphere"),
    simpleOpt("lit_neon", "霓虹光", "Neon", "Neon Lighting, Cyan and Magenta glow, Cyberpunk vibe"),
    simpleOpt("lit_bio", "生物荧光", "Bioluminescence", "Bioluminescence, Glowing blue/green organic light, Ethereal"),
    simpleOpt("lit_candle", "烛光", "Candlelight", "Candlelight, Warm flickering glow, Firelight, Intimate"),
    simpleOpt("lit_fire", "火光", "Bonfire", "Bonfire lighting, Dynamic orange glow, Dancing shadows"),
    simpleOpt("lit_strobe", "频闪", "Strobe", "Strobe Light, Flashing, Club lighting, Frozen motion"),
    simpleOpt("lit_gobo", "百叶窗/投影", "Gobo", "Gobo Lighting, Window blind shadows, Projected patterns"),
    simpleOpt("lit_under", "底光 (恐怖)", "Under-lighting", "Under-lighting, Horror lighting, Flashlight under chin"),
    simpleOpt("lit_top", "顶光 (审讯)", "Top Light", "Overhead spotlight, Skull shadows, Interrogation room style"),
    simpleOpt("lit_nat", "自然窗光", "Natural Window", "Natural Window Light, Soft daylight, Vermeer style"),
    simpleOpt("lit_gold", "金时 (黄昏)", "Golden Hour", "Golden Hour lighting, Warm orange sun, Long shadows"),
    simpleOpt("lit_blue", "蓝调 (黎明)", "Blue Hour", "Blue Hour lighting, Cold twilight, Melancholic"),
  ]
};

// 2. Environment
const grpRes: OptionGroup = {
  groupNameCN: "居住空间", groupNameEN: "Residential",
  options: [
    simpleOpt("loc_bed", "卧室", "Bedroom", "Bedroom, Unmade bed, Personal items, Cozy"),
    simpleOpt("loc_bath", "浴室", "Bathroom", "Bathroom, Tiled walls, Bathtub, Mirror reflection"),
    simpleOpt("loc_kitchen", "厨房", "Kitchen", "Kitchen, Stove, Cooking utensils, Steam"),
    simpleOpt("loc_living", "客厅", "Living Room", "Living Room, Sofa, TV, Carpet, Sunlight"),
    simpleOpt("loc_attic", "阁楼", "Attic", "Dusty Attic, Wooden beams, Old boxes, Light rays"),
    simpleOpt("loc_mansion", "豪宅", "Mansion", "Luxury Mansion Hall, Chandelier, Marble floor"),
    simpleOpt("loc_cyber", "黑客据点", "Cyberpunk Apartment", "Cyberpunk Apartment, Server racks, Multiple screens, Messy"),
  ]
};

const grpUrban: OptionGroup = {
  groupNameCN: "城市街头", groupNameEN: "Urban & Street",
  options: [
    simpleOpt("loc_street", "繁华街道", "City Street", "Busy City Street, Traffic, Neon signs, Crosswalk"),
    simpleOpt("loc_alley", "后巷", "Back Alley", "Dark Alleyway, Trash cans, Puddles, Steam vents"),
    simpleOpt("loc_roof", "天台", "Rooftop", "Rooftop edge, City skyline background, Water tower"),
    simpleOpt("loc_subway", "地铁站", "Subway Station", "Subway Station, Tiles, Train tracks, Commuters"),
    simpleOpt("loc_slum", "贫民窟", "Slums", "Slums, Favela, Corrugated iron shacks, Wires"),
    simpleOpt("loc_ruin", "城市废墟", "Urban Ruins", "Post-apocalyptic Ruins, Collapsed buildings, Overgrown"),
    simpleOpt("loc_cyber_c", "赛博都市", "Neo-Tokyo", "Neo-Tokyo, Flying cars, Holographic ads, Rain"),
  ]
};

const grpComm: OptionGroup = {
  groupNameCN: "商业公共", groupNameEN: "Commercial & Public",
  options: [
    simpleOpt("loc_bar", "酒吧", "Bar", "Bar counter, Bottles, Dim atmosphere, Neon sign"),
    simpleOpt("loc_cafe", "咖啡馆", "Cafe", "Coffee Shop, Wooden tables, Espresso machine"),
    simpleOpt("loc_diner", "美式餐厅", "Diner", "Retro Diner, Red booths, Checkered floor"),
    simpleOpt("loc_store", "便利店", "Convenience Store", "Convenience Store, Shelves, Fluorescent light"),
    simpleOpt("loc_club", "夜店", "Nightclub", "Nightclub, Dance floor, Lasers, Fog"),
    simpleOpt("loc_library", "图书馆", "Library", "Grand Library, Bookshelves, Silence, Dust motes"),
    simpleOpt("loc_hospital", "医院", "Hospital", "Hospital Corridor, Sterile white, Wheelchair"),
    simpleOpt("loc_office", "办公室", "Office", "Office Cubicle, Computer, Papers, Mundane"),
  ]
};

const grpInd: OptionGroup = {
  groupNameCN: "工业科幻", groupNameEN: "Industrial & Sci-Fi",
  options: [
    simpleOpt("loc_lab", "实验室", "Laboratory", "Science Lab, Glassware, Microscopes, White"),
    simpleOpt("loc_factory", "工厂", "Factory", "Factory Floor, Heavy machinery, Sparks, Industrial"),
    simpleOpt("loc_ship", "飞船驾驶舱", "Spaceship Bridge", "Spaceship Bridge, Control panels, Starry void view"),
    simpleOpt("loc_mecha", "机甲库", "Mecha Hangar", "Mecha Hangar, Giant robots, Cables, Mechanics"),
    simpleOpt("loc_station", "空间站", "Space Station", "Space Station Corridor, Airlock, Zero gravity"),
  ]
};

const grpNature: OptionGroup = {
  groupNameCN: "自然景观", groupNameEN: "Nature",
  options: [
    simpleOpt("loc_forest", "森林", "Forest", "Dense Forest, Tall trees, Ferns, Moss"),
    simpleOpt("loc_jungle", "雨林", "Jungle", "Tropical Jungle, Vines, Humid mist, Exotic plants"),
    simpleOpt("loc_desert", "沙漠", "Desert", "Desert Dunes, Rippled sand, Heat haze, Cactus"),
    simpleOpt("loc_ocean", "海洋", "Ocean", "Open Ocean, Waves, Horizon, Dark water"),
    simpleOpt("loc_beach", "海滩", "Beach", "Sandy Beach, Shoreline, Palm trees"),
    simpleOpt("loc_snow", "雪原", "Snowy Tundra", "Snowy Tundra, White landscape, Frozen trees"),
    simpleOpt("loc_mount", "山巅", "Mountain Peak", "Mountain Peak, Rocky cliffs, Clouds below"),
    simpleOpt("loc_cave", "洞穴", "Cave", "Deep Cave, Stalactites, Rock walls, Darkness"),
    simpleOpt("loc_under", "水下", "Underwater", "Underwater, Coral reef, Bubbles, Light rays"),
  ]
};

// Section 6: Conceptual Set Styles (Ultimate Expansion)
const grpSetAbstract: OptionGroup = {
  groupNameCN: "A. 抽象与几何", groupNameEN: "A. Abstract & Geometry",
  options: [
    opt("set_memphis", "孟菲斯几何", "Memphis Geometry", "Memphis Design Set, Squiggly lines, Polka dots, Pop pastel colors, 80s abstract"),
    opt("set_bauhaus", "包豪斯舞台", "Bauhaus Theater", "Bauhaus Theater Set, Triadic Ballet style, Primary colors (Red Blue Yellow), Geometric costumes"),
    opt("set_opart", "欧普艺术", "Op Art", "Op Art Room, Black and White optical illusion, Moire pattern, Dizzying spirals, Bridget Riley style"),
    opt("set_color", "特瑞尔光域", "Turrell Skyspace", "James Turrell Skyspace, Ganzfeld effect, Pure solid color light, No corners, Infinite depth"),
    opt("set_monolith", "巨物崇拜", "Monolith Set", "Brutalist Set, Massive Concrete Monolith in center, Tiny human scale, Grey tones, Villeneuve vibe"),
    opt("set_grid", "无限网格", "Neon Grid", "Tron Legacy Grid, Neon Laser floor, Infinite Horizon, Wireframe landscape, Retro-future"),
    opt("set_stairs", "埃舍尔阶梯", "Escher Stairs", "M.C. Escher Stairs, Impossible architecture, Penrose steps, Gravity defying, Infinite loops"),
  ]
};

const grpSetSurreal: OptionGroup = {
  groupNameCN: "B. 超现实与梦境", groupNameEN: "B. Surreal & Dream",
  options: [
    opt("set_magritte", "马格利特天空", "Magritte Sky", "René Magritte style, Room with Clouds wallpaper, Floating Green Apple, Surreal daylight"),
    opt("set_dali", "融化荒原", "Dali Landscape", "Salvador Dali Set, Melting Clocks, Long Shadows, Desert horizon, Crutches holding up objects"),
    opt("set_water", "水没都市", "Flooded Room", "Flooded Room, Shallow Water on floor, Reflections, Stillness, Tarkovsky Stalker vibe"),
    opt("set_float", "反重力/失重", "Zero Gravity", "Zero Gravity Room, Furniture floating in air, Suspended objects, Dream logic, Inception style"),
    opt("set_door", "门之迷宫", "Door Maze", "Field of freestanding Doors, Monsters Inc style, Portals, Stairs to nowhere, Surreal choice"),
    opt("set_scale", "爱丽丝变身", "Alice Scale", "Alice in Wonderland Room, Oversized furniture, Tiny door, Distorted perspective, Shrinking feeling"),
    opt("set_sky", "云端筑梦", "Cloud Room", "Room positioned high in clouds, Floor made of clouds, Heavenly, Ethereal white"),
  ]
};

const grpSetMaterial: OptionGroup = {
  groupNameCN: "C. 材质包裹", groupNameEN: "C. Material & Texture",
  options: [
    opt("set_soft", "软体空间", "Soft Room", "Softroom aesthetic, Entire room covered in Pink Fur/Velvet, Plush texture, Rounded corners"),
    opt("set_plastic", "真空包裹", "Vacuum Wrapped", "Wrapped in Plastic, Vacuum sealed room, Transparent PVC textures, Dexter style, Suffocating"),
    opt("set_foil", "银色工厂", "Silver Factory", "Silver Aluminum Foil room, Andy Warhol Factory, Metallic reflection, Space age, Crumpled texture"),
    opt("set_mirror", "无限镜屋", "Infinity Mirror", "Infinity Mirror Room, Kusama style, Multiple reflections, LED dots, Disorienting"),
    opt("set_ice", "冰封密室", "Ice Room", "Room made of solid Ice, Translucent Blue walls, Frozen furniture, Sub-zero atmosphere"),
    opt("set_gold", "黄金屋", "Gold Room", "Room entirely made of Gold, Gold leaf walls, Golden floor, Opulent, Blinding reflection"),
    opt("set_balloon", "气球装置", "Balloon Room", "Room filled with thousands of Balloons, Rubber texture, Claustrophobic fun"),
  ]
};

const grpSetNature: OptionGroup = {
  groupNameCN: "D. 自然入侵", groupNameEN: "D. Nature & Overgrowth",
  options: [
    opt("set_flower", "花卉爆炸", "Flower Explosion", "Room exploding with Flowers, Overgrown floral installation, Bloom, Gucci ad style, Pollen"),
    opt("set_forest", "室内森林", "Indoor Forest", "Forest growing inside a room, Trees breaking through floor, Mossy furniture, Abandoned"),
    opt("set_sand", "沙丘入侵", "Sand Dunes", "Room filled with Sand dunes, Desert taking over, Tame Impala album cover style"),
    opt("set_snow", "室内降雪", "Indoor Snow", "Snow falling inside a room, Snow piles on furniture, Surreal winter"),
    opt("set_grass", "草地野餐", "Indoor Grass", "Floor covered in lush green grass, Picnic indoors, Artificial nature"),
  ]
};

const grpSetSymbolic: OptionGroup = {
  groupNameCN: "E. 符号与仪式", groupNameEN: "E. Symbolic & Ritual",
  options: [
    opt("set_jodo", "神圣之山", "Holy Mountain", "Holy Mountain aesthetic, White room, Tarot symbols, Altar, Mystical geometry, Cult vibe"),
    opt("set_red", "红色帷幕", "Red Curtains", "Twin Peaks Red Room, Zigzag floor, Heavy Velvet Curtains, Spotlight, Lynchian nightmare"),
    opt("set_eye", "全视之眼", "Eye Watching", "Room full of Eyeballs, Giant Eye watching, Illuminati symbolism, Paranoia"),
    opt("set_chess", "命运棋盘", "Chessboard", "Giant Chessboard floor, Checkered Black and White, Human size chess pieces, Strategic"),
    opt("set_candle", "千烛之屋", "Candle Room", "Room filled with thousands of melted candles, Wax floor, Flickering light, Seance atmosphere"),
    opt("set_circle", "召唤法阵", "Summoning Circle", "Magic Circle painted on floor, Runes, Salt lines, Occult ritual setup"),
  ]
};

const grpSetLight: OptionGroup = {
  groupNameCN: "F. 光影与装置", groupNameEN: "F. Light & Tech",
  options: [
    opt("set_neon", "灯管丛林", "Neon Forest", "Forest of Vertical Neon Tubes, Dan Flavin art, Colored light space, Minimalist"),
    opt("set_laser", "激光网", "Laser Grid", "Laser Grid, Security beams, Red laser lines cutting through smoke, High tech trap"),
    opt("set_screen", "屏幕墙", "Screen Wall", "Wall of TV screens, Glitch art, Static noise, Surveillance monitors, Nam June Paik style"),
    opt("set_proj", "投影空间", "Projection Map", "Projection Mapping room, Digital patterns on walls, Immersive art teamLab style"),
  ]
};

// Section 7: Prop Warehouse (New)
const grpPropFurniture: OptionGroup = {
  groupNameCN: "7.1 叙事家具", groupNameEN: "7.1 Narrative Furniture",
  options: [
    opt("prop_chair", "孤椅", "Lonely Chair", "A single ornate Chair in center"),
    opt("prop_throne", "王座", "Throne", "Elaborate Throne"),
    opt("prop_bed", "凌乱的床", "Unmade Bed", "Unmade Bed with white sheets"),
    opt("prop_tub", "猫脚浴缸", "Clawfoot Tub", "Vintage Clawfoot Bathtub"),
    opt("prop_ladder", "通天梯", "Tall Ladder", "Tall Ladder reaching nowhere"),
    opt("prop_mirror", "落地古镜", "Antique Mirror", "Large Antique Mirror"),
    opt("prop_tv", "老电视堆", "TV Stack", "Stack of CRT TVs with static noise"),
    opt("prop_lamp", "落地灯", "Floor Lamp", "Vintage Floor Lamp"),
  ]
};

const grpPropArt: OptionGroup = {
  groupNameCN: "7.2 艺术符号", groupNameEN: "7.2 Art Symbols",
  options: [
    opt("prop_bust", "破碎石膏", "Broken Busts", "Broken Greek Marble Busts"),
    opt("prop_frame", "空画框", "Empty Frames", "Floating Empty Gold Frames"),
    opt("prop_skull", "头骨", "Skull", "Human Skull / Vanitas theme"),
    opt("prop_globe", "地球仪", "Globe", "Vintage Globe"),
    opt("prop_clock", "融化时钟", "Melting Clock", "Melting Clock"),
    opt("prop_mask", "戏剧面具", "Porcelain Masks", "Floating Porcelain Masks"),
    opt("prop_cage", "鸟笼", "Birdcage", "Empty Birdcage"),
    opt("prop_manne", "塑料模特", "Mannequin", "Shop Mannequin"),
  ]
};

const grpPropNature: OptionGroup = {
  groupNameCN: "7.3 自然静物", groupNameEN: "7.3 Nature Items",
  options: [
    opt("prop_apple", "红苹果", "Red Apple", "Floating Green/Red Apple"),
    opt("prop_flower", "枯萎花朵", "Wilted Flower", "Wilted Rose in vase"),
    opt("prop_tree", "枯树", "Dead Tree", "Dead Tree inside the room"),
    opt("prop_cloud", "室内云朵", "Indoor Clouds", "Fluffy Clouds floating indoors"),
    opt("prop_fire", "篝火", "Bonfire", "Bonfire burning on the floor"),
    opt("prop_water", "静水池", "Reflecting Pool", "Reflecting Pool of water"),
    opt("prop_bfly", "蝴蝶群", "Butterflies", "Swarm of Butterflies"),
    opt("prop_snake", "盘蛇", "Coiled Snake", "Coiled Snake"),
  ]
};

const grpPropShape: OptionGroup = {
  groupNameCN: "7.4 几何体", groupNameEN: "7.4 Abstract Shapes",
  options: [
    opt("prop_sphere", "铬球", "Chrome Spheres", "Floating Chrome Spheres"),
    opt("prop_cube", "发光立方", "Glowing Cube", "Glowing Cube / Tesseract"),
    opt("prop_pyra", "金字塔", "Pyramid", "Crystal Pyramid"),
    opt("prop_mono", "黑石碑", "Monolith", "Black Monolith slab"),
    opt("prop_ring", "霓虹光环", "Neon Ring", "Giant Neon Ring light"),
    opt("prop_blob", "液态球", "Liquid Blob", "Floating Liquid Mercury Blob"),
  ]
};

const grpPropInd: OptionGroup = {
  groupNameCN: "7.5 工业与医疗", groupNameEN: "7.5 Industrial & Medical",
  options: [
    opt("prop_iv", "输液架", "IV Drip", "Medical IV Drip stand"),
    opt("prop_fan", "工业风扇", "Industrial Fan", "Large Industrial Fan"),
    opt("prop_cam", "三脚架相机", "Tripod Camera", "Vintage Camera on Tripod"),
    opt("prop_mic", "麦克风", "Microphone", "Vintage Microphone on stand"),
    opt("prop_phone", "红色电话", "Red Phone", "Vintage Red Telephone"),
    opt("prop_chain", "悬挂锁链", "Chains", "Hanging Rusty Chains"),
  ]
};

// 3. Atmosphere
const grpTime: OptionGroup = {
  groupNameCN: "时间", groupNameEN: "Time",
  options: [
    simpleOpt("tm_dawn", "黎明/日出", "Dawn", "Dawn, Sunrise, Soft morning light, Dew"),
    simpleOpt("tm_noon", "正午", "Noon", "High Noon, Bright overhead sun, Hard shadows"),
    simpleOpt("tm_gold", "金时 (黄昏)", "Golden Hour", "Golden Hour, Sunset, Warm orange glow, Long shadows"),
    simpleOpt("tm_blue", "蓝调 (入夜)", "Blue Hour", "Blue Hour, Twilight, Cold tones, Fading light"),
    simpleOpt("tm_night", "深夜", "Night", "Midnight, Dark sky, Moonlight, Stars"),
    simpleOpt("tm_eclipse", "日食/异象", "Eclipse", "Solar Eclipse lighting, Unnatural dark sky, Ring of fire"),
  ]
};

const grpWeather: OptionGroup = {
  groupNameCN: "天气与粒子", groupNameEN: "Weather & Particles",
  options: [
    simpleOpt("wea_sun", "晴朗", "Sunny", "Sunny, Clear Sky, Azure blue"),
    simpleOpt("wea_cloud", "多云/阴天", "Overcast", "Overcast, Cloudy sky, Diffuse soft light"),
    simpleOpt("wea_rain", "雨天", "Rain", "Raining, Raindrops, Wet surfaces, Puddles"),
    simpleOpt("wea_storm", "暴风雨", "Thunderstorm", "Thunderstorm, Lightning bolts, Dark ominous clouds, Heavy rain"),
    simpleOpt("wea_snow", "下雪", "Snow", "Snowing, Falling snowflakes, White out, Cold"),
    simpleOpt("wea_fog", "大雾", "Fog", "Heavy Fog, Mist, Low visibility, Atmospheric"),
    simpleOpt("wea_sand", "沙尘暴", "Sandstorm", "Sandstorm, Dust in air, Orange haze, Windy"),
    simpleOpt("wea_wind", "大风", "Windy", "Windy, Blowing hair/clothes, Leaves flying"),
    simpleOpt("wea_ash", "飘灰/余烬", "Ash", "Falling Ash, Ember particles, Post-fire atmosphere"),
    simpleOpt("wea_pollen", "花粉/光尘", "Pollen/Dust", "Floating Dust Motes, Pollen, Magical sparkles in air"),
  ]
};

export const sceneOptions = {
    camera: [grpShot, grpLens, grpAngle, grpCamFX],
    lighting: [grpLighting],
    environment: [
      grpRes, grpUrban, grpComm, grpInd, grpNature, 
      grpSetAbstract, grpSetSurreal, grpSetMaterial, grpSetNature, grpSetSymbolic, grpSetLight
    ],
    props: [grpPropFurniture, grpPropArt, grpPropNature, grpPropShape, grpPropInd],
    time: [grpTime],
    weather: [grpWeather],
};

// --- POST PROCESS OPTIONS ---
export const postProcessOptions = {
    cameraFX: [
        simpleOpt("fx_blur", "运动模糊", "Motion Blur", "Motion Blur"),
        simpleOpt("fx_dof", "景深", "Depth of Field", "Depth of Field"),
        simpleOpt("fx_chroma", "色差", "Chromatic", "Chromatic Aberration"),
        simpleOpt("fx_vig", "暗角", "Vignette", "Vignette"),
        simpleOpt("fx_grain", "颗粒", "Film Grain", "Film Grain"),
        simpleOpt("fx_flare", "光晕", "Lens Flare", "Lens Flare"),
        simpleOpt("fx_bloom", "柔光", "Bloom", "Bloom Effect"),
    ],
    screenFX: [
        simpleOpt("sfx_none", "无", "None", ""),
        simpleOpt("sfx_glitch", "故障", "Glitch", "Glitch Effect, Datamoshing"),
        simpleOpt("sfx_scan", "扫描线", "Scanlines", "CRT Scanlines"),
        simpleOpt("sfx_half", "半调", "Halftone", "Halftone Dots"),
        simpleOpt("sfx_vhs", "VHS", "VHS", "VHS Tape Artifacts"),
        simpleOpt("sfx_holo", "全息", "Hologram", "Hologram Effect"),
    ],
    quality: [
        simpleOpt("ql_4k", "4K", "4K", "4K Resolution"),
        simpleOpt("ql_8k", "8K", "8K", "8K Resolution"),
        simpleOpt("ql_master", "杰作", "Masterpiece", "Masterpiece"),
        simpleOpt("ql_best", "最佳画质", "Best Quality", "Best Quality"),
        simpleOpt("ql_ultra", "超细节", "Ultra Detailed", "Ultra Detailed"),
        simpleOpt("ql_hdr", "HDR", "HDR", "HDR"),
        simpleOpt("ql_rt", "光追", "Ray Tracing", "Ray Tracing"),
    ]
};

// --- INITIAL STATES ---
export const initialGlobal: GlobalFieldState = {
  visualBase: "", techOverlay: "", entropy: "", visualSoul: "", medium: ""
};


export const initialHuman: HumanEngineState = {
  species: "spec_human", gender: "gen_female", age: "age_young", ethnicity: "eth_caucasian", body: "body_fit",
  profession: "",
  // New Consolidated Fields
  skin: "skin_fair", 
  hair: "col_blonde|hair_long", 
  face: "face_classic|mu_natural", 
  traits: "", 
  fashion: "fash_haute", 
  
  expression: "exp_smile_gentle", pose: "pose_stand_hero",
  action: "act_walk", gaze: "gaze_cam"
};

export const initialCreature: CreatureEngineState = {
  class: "", stance: "", scale: "", texture: "", element: "",
  headFeatures: "", bodyParts: "", mood: "", action: ""
};

export const initialScene: SceneState = {
  camera: "", lighting: "", environment: "", props: "", time: "", weather: ""
};

// --- OPTION MAP & HELPERS ---
export const optionMap = new Map<string, OptionItem>();

const register = (data: any) => {
    if (Array.isArray(data)) {
        if (data.length > 0 && ('groupNameCN' in data[0] || 'titleCN' in data[0])) {
             (data as any[]).forEach(g => {
                 if(g.options) {
                    // Check if it's OptionGroup[] or just OptionItem[] that happens to have group props (unlikely overlap in this schema)
                    if(Array.isArray(g.options)) {
                        const opts = g.options;
                        if(opts.length > 0 && 'groupNameCN' in opts[0]) {
                            // It is OptionGroup[]
                            (opts as OptionGroup[]).forEach(subG => {
                                subG.options.forEach(o => optionMap.set(o.id, o));
                            });
                        } else {
                            // It is OptionItem[]
                            (opts as OptionItem[]).forEach(o => optionMap.set(o.id, o));
                        }
                    }
                 }
             });
        } else {
             (data as OptionItem[]).forEach(o => optionMap.set(o.id, o));
        }
    } else if (typeof data === 'object') {
        Object.values(data).forEach(val => register(val));
    }
};

register(globalOptions);
register(humanOptions);
register(creatureOptions);
register(sceneOptions);
register(postProcessOptions);

export const getOptionPrompt = (id: string): string => {
  const item = optionMap.get(id);
  return item ? item.prompt : id; 
};

export const getOptionLabel = (id: string, lang: 'CN' | 'EN'): string => {
  const item = optionMap.get(id);
  return item ? (lang === 'CN' ? item.labelCN : item.labelEN) : id;
};
