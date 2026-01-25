import { getPostData } from "@/lib/markdown";
import ReactMarkdown from "react-markdown";
import Link from 'next/link';
import ViewWrapper from "@/components/canvas/ViewWrapper";
import FeatureRow from "@/components/ui/FeatureRow";

// Map slugs to filenames
const SLUG_TO_FILE: Record<string, string> = {
   "vesslo": "vesslo.md",
   "keyharbor": "keyharbor.md",
   "splitswipe": "splitswipe.md",
};

const APPS: Record<string, {
   title: string,
   color: string,
   icon: string,
   screenshots?: string[],
   video?: { mp4: string, webm: string }, // Added video support
   features?: { title: string, desc: string, image: string }[]
}> = {
   "vesslo": {
      title: "Vesslo",
      color: "#a855f7",
      icon: "/vesslo_icon.png",
      screenshots: ["/vesslo-preview.png"],
      features: [
         {
            title: "직관적인 3D 인터페이스",
            desc: "복잡한 메뉴 대신, 마치 게임을 하듯 자연스럽게 앱을 탐색하세요. Vesslo의 3D 공간 인터페이스는 당신의 Mac 경험을 완전히 새로운 차원으로 끌어올립니다.",
            image: "/vesslo-preview.png"
         },
         {
            title: "강력한 보안, 완벽한 프라이버시",
            desc: "당신의 모든 데이터는 로컬에 안전하게 저장됩니다. 클라우드 업로드 없이, 오직 당신만이 접근할 수 있는 강력한 암호화 기술을 경험해보세요.",
            image: "/vesslo_icon.png"
         },
         {
            title: "생산성의 한계를 넘어서",
            desc: "단축키 하나로 모든 작업 공간을 제어하세요. 멀티태스킹이 그 어느 때보다 빠르고, 유려하고, 즐거워집니다.",
            image: "/vesslo-preview.png"
         }
      ]
   },
   "keyharbor": {
      title: "KeyHarbor",
      color: "#ef4444",
      icon: "/keyharbor-icon.png",
      screenshots: ["/keyharbor-preview.png"],
      features: [
         {
            title: "모든 키, 하나의 항구",
            desc: "분산된 라이선스 키들을 KeyHarbor 한 곳에서 안전하게 관리하세요. 더 이상 이메일을 뒤질 필요가 없습니다.",
            image: "/keyharbor-preview.png"
         }
      ]
   },
   "splitswipe": {
      title: "SplitSwipe",
      color: "#3b82f6",
      icon: "/splitswipe-icon.png",
      screenshots: ["/splitswipe-preview.png"],
      video: { // SplitSwipe Video
         mp4: "/splitswipe/splitswipe_move.mp4",
         webm: "/splitswipe/splitswipe_move.webm"
      },
      features: [
         {
            title: "화면 분할의 재정의",
            desc: "직관적인 스와이프 제스처로 창을 완벽하게 분할하세요. 복잡한 단축키 없이도 전문가처럼 화면을 관리할 수 있습니다.",
            image: "/splitswipe-preview.png"
         }
      ]
   },
};

interface AppPageProps {
   params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
   return [
      { slug: "vesslo" },
      { slug: "keyharbor" },
      { slug: "splitswipe" },
   ];
}

export default async function AppPage({ params }: AppPageProps) {
   const { slug } = await params;
   const filename = SLUG_TO_FILE[slug];

   if (!filename) {
      return <div className="p-10 text-center">App not found</div>
   }

   // Note: In a real multi-lang setup with markdown, we might fetch `vesslo소개.ko.md` vs `vesslo소개.en.md` based on a lang param, 
   // but Next.js App Router i18n usually involves a [lang] segment. 
   // Given current structure is [slug], we will display the Korean markdown for now as requested ("문서는 모두 한국어로...").

   const { content } = getPostData(filename);
   const appData = APPS[slug] || { title: slug, color: '#333', icon: '' };

   return (
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
         {/* Navigation / Back Button */}
         <nav className="absolute top-0 left-0 w-full z-40 p-6 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
            {/* ... link ... */}
         </nav>

         {/* Hero Section */}
         <section className="min-h-[70vh] w-full bg-slate-950 relative overflow-hidden flex flex-col md:flex-row items-center justify-center pt-20 pb-10 px-6">
            {/* Background Gradient Blob */}
            <div
               className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[100px] opacity-30 pointer-events-none"
               style={{ backgroundColor: appData.color }}
            />

            {/* Content Container */}
            <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-12 z-10">

               {/* Left: Text Content */}
               <div className="flex-1 text-center md:text-left space-y-8">
                  <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight">
                     {appData.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-slate-300 font-light max-w-xl mx-auto md:mx-0">
                     생산성을 극대화하는 가장 강력한 방법. <br className="hidden md:block" />
                     지금 바로 경험해보세요.
                  </p>
                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                     <button className="px-8 py-4 bg-white text-black rounded-full text-lg font-bold hover:bg-slate-200 transition-transform hover:scale-105 active:scale-95 shadow-xl">
                        Download Free Trial
                     </button>
                     <button className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-full text-lg font-medium hover:bg-white/20 transition-colors backdrop-blur-sm">
                        Purchase License
                     </button>
                  </div>
               </div>

               {/* Right: 3D Icon Viewer */}
               <div className="flex-1 w-full h-[400px] md:h-[500px] relative">
                  <ViewWrapper iconUrl={appData.icon} color={appData.color} />
               </div>
            </div>
         </section>

         {/* Video Introduction Section (NEW) */}
         {appData.video && (
            <section className="w-full bg-slate-900 py-16">
               <div className="container mx-auto px-6 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">In Action</h2>
                  <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                     <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-auto"
                     >
                        <source src={appData.video.webm} type="video/webm" />
                        <source src={appData.video.mp4} type="video/mp4" />
                        Your browser does not support the video tag.
                     </video>
                     {/* Optional Overlay/Play Icon could go here */}
                  </div>
               </div>
            </section>
         )}

         {/* Features Section (NEW) */}
         {appData.features && appData.features.length > 0 && (
            <div className="bg-slate-950/50">
               {appData.features.map((feature, i) => (
                  <FeatureRow
                     key={i}
                     title={feature.title}
                     description={feature.desc}
                     image={feature.image}
                     index={i}
                  />
               ))}
            </div>
         )}


         {/* Screenshots Gallery Section */}
         {appData.screenshots && appData.screenshots.length > 0 && (
            <section className="bg-slate-950 py-24">
               <div className="container mx-auto px-6">
                  <h3 className="text-3xl font-bold text-white mb-12 text-center">App Screenshots</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {appData.screenshots.map((shot, i) => (
                        <div key={i} className="rounded-xl overflow-hidden shadow-2xl border border-white/10 hover:border-white/20 transition-all group">
                           <img
                              src={shot}
                              alt={`${appData.title} Screenshot ${i + 1}`}
                              className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                           />
                        </div>
                     ))}
                  </div>
               </div>
            </section>
         )}

         {/* Markdown Content Section */}
         <section className="bg-background py-24">
            <div className="container mx-auto px-6 max-w-4xl">
               <h3 className="text-2xl font-bold mb-8 text-slate-400 border-b border-slate-800 pb-4">상세 스펙 및 릴리스 노트</h3>
               <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-500 hover:prose-a:text-blue-400 transition-colors prose-img:rounded-xl prose-img:shadow-lg">
                  <ReactMarkdown>{content}</ReactMarkdown>
               </article>
            </div>
         </section>
      </div>
   );
}
