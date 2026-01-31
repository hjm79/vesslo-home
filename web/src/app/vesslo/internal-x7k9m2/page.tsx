"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "@/i18n";

// Documentation sections
const DOC_SECTIONS = {
   en: {
      title: "Documentation",
      subtitle: "Learn how Vesslo detects and manages app updates",
      sections: [
         {
            id: "source-detection",
            title: "Source Detection",
            icon: "🔍",
            description: "How Vesslo identifies where your apps come from",
            content: [
               {
                  subtitle: "Sparkle (Self-Update)",
                  items: [
                     "Detects Sparkle.framework in app bundle",
                     "Checks for SUFeedURL in Info.plist",
                     "Supports DevMateKit, ShipKit, and other update frameworks"
                  ]
               },
               {
                  subtitle: "Homebrew",
                  items: [
                     "Checks brew list --cask for installed casks",
                     "Matches app Bundle ID with Homebrew cask database",
                     "Automatically discovers adoptable apps (can be converted to Homebrew)"
                  ]
               },
               {
                  subtitle: "Mac App Store",
                  items: [
                     "Verifies _MASReceipt/receipt file existence",
                     "Uses iTunes API for version checking",
                     "Filters iOS vs macOS apps with same Bundle ID"
                  ]
               }
            ]
         },
         {
            id: "adoptable",
            title: "Adoptable Apps",
            icon: "🔄",
            description: "Apps that can be converted to Homebrew management",
            content: [
               {
                  subtitle: "What is Adoptable?",
                  items: [
                     "App is NOT currently managed by Homebrew",
                     "A matching Homebrew cask exists for the app",
                     "Can be converted to Homebrew for easier updates"
                  ]
               },
               {
                  subtitle: "Benefits",
                  items: [
                     "Unified update management through Homebrew",
                     "Easy rollback and version control",
                     "Command-line automation support"
                  ]
               }
            ]
         },
         {
            id: "version-comparison",
            title: "Version Comparison",
            icon: "📊",
            description: "Intelligent version number parsing and comparison",
            content: [
               {
                  subtitle: "Normalization Rules",
                  items: [
                     "v1.2.3 → 1.2.3 (removes 'v' prefix)",
                     "7.1.1 (22340) → 7.1.1.22340 (converts parentheses)",
                     "4.0,17 → 4.0.17 (converts comma to dot)",
                     "1.2+metadata → 1.2 (removes metadata)"
                  ]
               },
               {
                  subtitle: "Comparison Order",
                  items: [
                     "Exact string match check",
                     "Build number in parentheses check",
                     "Cleaned version comparison",
                     "Pre-release tag comparison (alpha < beta < rc)"
                  ]
               }
            ]
         },
         {
            id: "update-sources",
            title: "Update Priority",
            icon: "⚡",
            description: "How updates from multiple sources are handled",
            content: [
               {
                  subtitle: "Priority System",
                  items: [
                     "Homebrew updates are checked first",
                     "Sparkle feeds are checked next",
                     "App Store availability verified last",
                     "Newest version from any source is displayed"
                  ]
               },
               {
                  subtitle: "Additive-Only Updates",
                  items: [
                     "Each source only sets updates if newer version found",
                     "Never clears updates set by other sources",
                     "Ensures no update information is lost"
                  ]
               }
            ]
         },
         {
            id: "cask-matching",
            title: "Cask Matching",
            icon: "🎯",
            description: "5-step strategy for accurate Homebrew cask matching",
            content: [
               {
                  subtitle: "Matching Priority",
                  items: [
                     "1. Bundle ID Match (100% confidence)",
                     "2. Exact Name + Bundle Domain (95% confidence)",
                     "3. Exact Name Only (70% confidence)",
                     "4. Fuzzy Match + Bundle Verification (80% confidence)",
                     "5. Manual Review Required"
                  ]
               },
               {
                  subtitle: "Safety Features",
                  items: [
                     "Bundle ID cross-validation prevents mismatches",
                     "Token normalization handles edge cases",
                     "Protected against name collisions (e.g., Eagle case)"
                  ]
               }
            ]
         },
         {
            id: "batch-updates",
            title: "Batch Updates",
            icon: "📦",
            description: "Update all apps at once with progress tracking",
            content: [
               {
                  subtitle: "Features",
                  items: [
                     "Timeline view shows each app's status",
                     "Estimated time remaining",
                     "Drag to reorder update queue",
                     "Individual retry for failed updates"
                  ]
               },
               {
                  subtitle: "Update States",
                  items: [
                     "Pending: Waiting in queue",
                     "In Progress: Currently updating",
                     "Completed: Successfully updated",
                     "Failed: Error occurred (can retry)",
                     "Skipped: User chose to skip"
                  ]
               }
            ]
         }
      ]
   },
   ko: {
      title: "문서",
      subtitle: "Vesslo가 앱 업데이트를 감지하고 관리하는 방법을 알아보세요",
      sections: [
         {
            id: "source-detection",
            title: "소스 감지",
            icon: "🔍",
            description: "Vesslo가 앱의 출처를 식별하는 방법",
            content: [
               {
                  subtitle: "Sparkle (자체 업데이트)",
                  items: [
                     "앱 번들 내 Sparkle.framework 감지",
                     "Info.plist에서 SUFeedURL 확인",
                     "DevMateKit, ShipKit 등 기타 업데이트 프레임워크 지원"
                  ]
               },
               {
                  subtitle: "Homebrew",
                  items: [
                     "brew list --cask로 설치된 Cask 확인",
                     "Bundle ID와 Homebrew cask 데이터베이스 매칭",
                     "전환 가능 앱 자동 발견 (Homebrew로 전환 가능)"
                  ]
               },
               {
                  subtitle: "Mac App Store",
                  items: [
                     "_MASReceipt/receipt 파일 존재 확인",
                     "iTunes API로 버전 확인",
                     "동일 Bundle ID의 iOS vs macOS 앱 필터링"
                  ]
               }
            ]
         },
         {
            id: "adoptable",
            title: "전환 가능 앱",
            icon: "🔄",
            description: "Homebrew 관리로 전환할 수 있는 앱",
            content: [
               {
                  subtitle: "전환 가능이란?",
                  items: [
                     "현재 Homebrew로 관리되지 않는 앱",
                     "해당 앱의 Homebrew cask가 존재함",
                     "쉬운 업데이트를 위해 Homebrew로 전환 가능"
                  ]
               },
               {
                  subtitle: "장점",
                  items: [
                     "Homebrew를 통한 통합 업데이트 관리",
                     "쉬운 롤백 및 버전 관리",
                     "명령줄 자동화 지원"
                  ]
               }
            ]
         },
         {
            id: "version-comparison",
            title: "버전 비교",
            icon: "📊",
            description: "지능형 버전 번호 파싱 및 비교",
            content: [
               {
                  subtitle: "정규화 규칙",
                  items: [
                     "v1.2.3 → 1.2.3 ('v' 접두어 제거)",
                     "7.1.1 (22340) → 7.1.1.22340 (괄호 변환)",
                     "4.0,17 → 4.0.17 (쉼표를 점으로 변환)",
                     "1.2+metadata → 1.2 (메타데이터 제거)"
                  ]
               },
               {
                  subtitle: "비교 순서",
                  items: [
                     "정확한 문자열 일치 확인",
                     "괄호 내 빌드 번호 확인",
                     "정리된 버전 비교",
                     "프리릴리스 태그 비교 (alpha < beta < rc)"
                  ]
               }
            ]
         },
         {
            id: "update-sources",
            title: "업데이트 우선순위",
            icon: "⚡",
            description: "여러 소스의 업데이트 처리 방법",
            content: [
               {
                  subtitle: "우선순위 시스템",
                  items: [
                     "Homebrew 업데이트 먼저 확인",
                     "Sparkle 피드 다음 확인",
                     "App Store 가용성 마지막 확인",
                     "모든 소스 중 최신 버전 표시"
                  ]
               },
               {
                  subtitle: "추가 전용 업데이트",
                  items: [
                     "각 소스는 더 새로운 버전을 찾은 경우에만 업데이트 설정",
                     "다른 소스가 설정한 업데이트를 지우지 않음",
                     "업데이트 정보 손실 방지"
                  ]
               }
            ]
         },
         {
            id: "cask-matching",
            title: "Cask 매칭",
            icon: "🎯",
            description: "정확한 Homebrew cask 매칭을 위한 5단계 전략",
            content: [
               {
                  subtitle: "매칭 우선순위",
                  items: [
                     "1. Bundle ID 매칭 (100% 확신도)",
                     "2. 정확한 이름 + Bundle 도메인 (95% 확신도)",
                     "3. 정확한 이름만 (70% 확신도)",
                     "4. 퍼지 매칭 + Bundle 검증 (80% 확신도)",
                     "5. 수동 검토 필요"
                  ]
               },
               {
                  subtitle: "안전 기능",
                  items: [
                     "Bundle ID 교차 검증으로 잘못된 매칭 방지",
                     "토큰 정규화로 엣지 케이스 처리",
                     "이름 충돌 방지 (예: Eagle 케이스)"
                  ]
               }
            ]
         },
         {
            id: "batch-updates",
            title: "일괄 업데이트",
            icon: "📦",
            description: "진행 상황 추적과 함께 모든 앱 한 번에 업데이트",
            content: [
               {
                  subtitle: "기능",
                  items: [
                     "타임라인 뷰로 각 앱 상태 표시",
                     "남은 예상 시간 표시",
                     "드래그로 업데이트 순서 변경",
                     "실패한 업데이트 개별 재시도"
                  ]
               },
               {
                  subtitle: "업데이트 상태",
                  items: [
                     "대기 중: 큐에서 대기",
                     "진행 중: 현재 업데이트 중",
                     "완료: 성공적으로 업데이트됨",
                     "실패: 오류 발생 (재시도 가능)",
                     "건너뜀: 사용자가 건너뛰기 선택"
                  ]
               }
            ]
         }
      ]
   }
};

export default function DocsPage() {
   const { i18n } = useTranslation();
   const [mounted, setMounted] = useState(false);
   const [activeSection, setActiveSection] = useState("source-detection");

   useEffect(() => {
      setMounted(true);
   }, []);

   if (!mounted) return null;

   const lang = i18n.language?.startsWith('ko') ? 'ko' : 'en';
   const docData = DOC_SECTIONS[lang as keyof typeof DOC_SECTIONS];

   return (
      <div className="min-h-screen bg-black text-white">
         <Navbar />

         {/* Hero Section */}
         <section className="pt-32 pb-16 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 text-center">
               <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-6xl font-bold mb-6"
               >
                  {docData.title}
               </motion.h1>
               <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl text-slate-400 max-w-2xl mx-auto"
               >
                  {docData.subtitle}
               </motion.p>
            </div>
         </section>

         {/* Main Content */}
         <section className="py-12 relative">
            <div className="container mx-auto px-6">
               <div className="flex flex-col lg:flex-row gap-12">

                  {/* Sidebar Navigation */}
                  <nav className="lg:w-64 flex-shrink-0">
                     <div className="sticky top-24 space-y-2">
                        {docData.sections.map((section) => (
                           <button
                              key={section.id}
                              onClick={() => setActiveSection(section.id)}
                              className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${activeSection === section.id
                                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                    : 'hover:bg-white/5 text-slate-400 hover:text-white'
                                 }`}
                           >
                              <span className="text-xl">{section.icon}</span>
                              <span className="font-medium">{section.title}</span>
                           </button>
                        ))}
                     </div>
                  </nav>

                  {/* Content Area */}
                  <main className="flex-1 min-w-0">
                     {docData.sections.map((section) => (
                        <motion.div
                           key={section.id}
                           initial={{ opacity: 0, y: 20 }}
                           animate={{
                              opacity: activeSection === section.id ? 1 : 0,
                              y: activeSection === section.id ? 0 : 20,
                              display: activeSection === section.id ? 'block' : 'none'
                           }}
                           transition={{ duration: 0.3 }}
                        >
                           <div className="mb-8">
                              <h2 className="text-3xl font-bold mb-3 flex items-center gap-3">
                                 <span className="text-4xl">{section.icon}</span>
                                 {section.title}
                              </h2>
                              <p className="text-slate-400 text-lg">{section.description}</p>
                           </div>

                           <div className="space-y-8">
                              {section.content.map((block, idx) => (
                                 <div
                                    key={idx}
                                    className="bg-white/5 rounded-2xl p-6 border border-white/10"
                                 >
                                    <h3 className="text-xl font-semibold mb-4 text-cyan-400">
                                       {block.subtitle}
                                    </h3>
                                    <ul className="space-y-3">
                                       {block.items.map((item, itemIdx) => (
                                          <li key={itemIdx} className="flex items-start gap-3">
                                             <span className="text-cyan-400 mt-1">•</span>
                                             <span className="text-slate-300">{item}</span>
                                          </li>
                                       ))}
                                    </ul>
                                 </div>
                              ))}
                           </div>
                        </motion.div>
                     ))}
                  </main>
               </div>
            </div>
         </section>

         {/* Back to Vesslo CTA */}
         <section className="py-16 text-center">
            <div className="container mx-auto px-6">
               <a
                  href="/vesslo"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 rounded-full font-medium transition-colors"
               >
                  ← {lang === 'ko' ? 'Vesslo로 돌아가기' : 'Back to Vesslo'}
               </a>
            </div>
         </section>
      </div>
   );
}
