"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "@/i18n";

// User-friendly documentation - focuses on WHAT, not HOW
const DOC_SECTIONS = {
   en: {
      title: "User Guide",
      subtitle: "Everything you need to know to get the most out of Vesslo",
      sections: [
         {
            id: "getting-started",
            title: "Getting Started",
            icon: "🚀",
            description: "Set up Vesslo and start managing your apps",
            content: [
               {
                  subtitle: "First Launch",
                  items: [
                     "Vesslo automatically scans all apps in your Applications folder",
                     "Initial scan may take a few minutes depending on how many apps you have",
                     "Apps are organized by update source for easy management"
                  ]
               },
               {
                  subtitle: "Understanding Badges",
                  items: [
                     "Sparkle: Apps that update themselves",
                     "Brew: Apps managed through Homebrew",
                     "App Store: Apps from the Mac App Store",
                     "Adoptable: Apps you can switch to Homebrew management"
                  ]
               }
            ]
         },
         {
            id: "checking-updates",
            title: "Checking for Updates",
            icon: "🔄",
            description: "Keep all your apps up to date",
            content: [
               {
                  subtitle: "Automatic Checks",
                  items: [
                     "Vesslo checks for updates when you launch the app",
                     "You can enable/disable this in Settings",
                     "Background checks run periodically if enabled"
                  ]
               },
               {
                  subtitle: "Manual Refresh",
                  items: [
                     "Click the refresh button to check all apps",
                     "Click on individual app to check just that app",
                     "Pull down on the list to refresh (trackpad gesture)"
                  ]
               }
            ]
         },
         {
            id: "updating-apps",
            title: "Updating Apps",
            icon: "⬆️",
            description: "Install updates with one click",
            content: [
               {
                  subtitle: "Single App Update",
                  items: [
                     "Click the Update button next to any app",
                     "Vesslo handles the download and installation",
                     "You'll be notified when the update is complete"
                  ]
               },
               {
                  subtitle: "Update All",
                  items: [
                     "Click 'Update All' to update everything at once",
                     "Watch progress in the timeline view",
                     "Failed updates can be retried individually"
                  ]
               }
            ]
         },
         {
            id: "homebrew-integration",
            title: "Homebrew Integration",
            icon: "🍺",
            description: "Seamless Homebrew cask management",
            content: [
               {
                  subtitle: "What is Homebrew?",
                  items: [
                     "A popular package manager for macOS",
                     "Allows managing apps from the command line",
                     "Vesslo provides a visual interface for Homebrew"
                  ]
               },
               {
                  subtitle: "Adoptable Apps",
                  items: [
                     "Some apps can be converted to Homebrew management",
                     "Look for the 'Adoptable' badge",
                     "Converting gives you more control over updates"
                  ]
               }
            ]
         },
         {
            id: "settings",
            title: "Settings & Preferences",
            icon: "⚙️",
            description: "Customize Vesslo to your needs",
            content: [
               {
                  subtitle: "Update Settings",
                  items: [
                     "Check for updates on launch: Auto-check when app opens",
                     "Show notifications: Get alerts for new updates",
                     "Update sources: Choose which sources to check"
                  ]
               },
               {
                  subtitle: "Display Options",
                  items: [
                     "Dark/Light mode follows system preference",
                     "Choose between grid, list, or table view",
                     "Sort by name, date, or update status"
                  ]
               }
            ]
         },
         {
            id: "faq",
            title: "FAQ",
            icon: "❓",
            description: "Frequently asked questions",
            content: [
               {
                  subtitle: "Common Questions",
                  items: [
                     "Q: Why is my app not showing? → Check if it's in /Applications",
                     "Q: Update failed? → Try closing the app first, then retry",
                     "Q: Wrong version shown? → Click refresh to re-scan",
                     "Q: How to exclude an app? → Right-click and select 'Hide'"
                  ]
               },
               {
                  subtitle: "Troubleshooting",
                  items: [
                     "Restart Vesslo if apps aren't refreshing",
                     "Go to System Settings > Privacy & Security > App Management and enable Vesslo",
                     "Go to System Settings > Privacy & Security > Full Disk Access and enable Vesslo",
                     "Both permissions are required for all features to work properly",
                     "After granting permissions, restart Vesslo"
                  ]
               }
            ]
         }
      ]
   },
   ko: {
      title: "사용자 가이드",
      subtitle: "Vesslo를 최대한 활용하는 데 필요한 모든 것",
      sections: [
         {
            id: "getting-started",
            title: "시작하기",
            icon: "🚀",
            description: "Vesslo 설정 및 앱 관리 시작",
            content: [
               {
                  subtitle: "첫 실행",
                  items: [
                     "Vesslo가 응용 프로그램 폴더의 모든 앱을 자동으로 스캔합니다",
                     "앱 개수에 따라 초기 스캔에 몇 분이 소요될 수 있습니다",
                     "앱은 업데이트 소스별로 정리되어 쉽게 관리할 수 있습니다"
                  ]
               },
               {
                  subtitle: "배지 이해하기",
                  items: [
                     "Sparkle: 자체 업데이트하는 앱",
                     "Brew: Homebrew로 관리되는 앱",
                     "App Store: Mac App Store에서 받은 앱",
                     "전환가능: Homebrew 관리로 전환할 수 있는 앱"
                  ]
               }
            ]
         },
         {
            id: "checking-updates",
            title: "업데이트 확인",
            icon: "🔄",
            description: "모든 앱을 최신 상태로 유지",
            content: [
               {
                  subtitle: "자동 확인",
                  items: [
                     "Vesslo는 앱 실행 시 업데이트를 확인합니다",
                     "설정에서 이 기능을 켜거나 끌 수 있습니다",
                     "활성화하면 백그라운드에서 주기적으로 확인합니다"
                  ]
               },
               {
                  subtitle: "수동 새로고침",
                  items: [
                     "새로고침 버튼을 클릭하여 모든 앱 확인",
                     "개별 앱을 클릭하여 해당 앱만 확인",
                     "목록을 아래로 당겨서 새로고침 (트랙패드 제스처)"
                  ]
               }
            ]
         },
         {
            id: "updating-apps",
            title: "앱 업데이트",
            icon: "⬆️",
            description: "한 번의 클릭으로 업데이트 설치",
            content: [
               {
                  subtitle: "단일 앱 업데이트",
                  items: [
                     "앱 옆의 업데이트 버튼을 클릭하세요",
                     "Vesslo가 다운로드 및 설치를 처리합니다",
                     "업데이트 완료 시 알림을 받습니다"
                  ]
               },
               {
                  subtitle: "모두 업데이트",
                  items: [
                     "'모두 업데이트'를 클릭하여 한 번에 모두 업데이트",
                     "타임라인 뷰에서 진행 상황 확인",
                     "실패한 업데이트는 개별적으로 다시 시도 가능"
                  ]
               }
            ]
         },
         {
            id: "homebrew-integration",
            title: "Homebrew 통합",
            icon: "🍺",
            description: "원활한 Homebrew cask 관리",
            content: [
               {
                  subtitle: "Homebrew란?",
                  items: [
                     "macOS용 인기 패키지 관리자",
                     "명령줄에서 앱 관리 가능",
                     "Vesslo는 Homebrew의 시각적 인터페이스 제공"
                  ]
               },
               {
                  subtitle: "전환 가능 앱",
                  items: [
                     "일부 앱은 Homebrew 관리로 전환할 수 있습니다",
                     "'전환가능' 배지를 찾아보세요",
                     "전환하면 업데이트를 더 잘 제어할 수 있습니다"
                  ]
               }
            ]
         },
         {
            id: "settings",
            title: "설정 및 환경설정",
            icon: "⚙️",
            description: "필요에 맞게 Vesslo 맞춤 설정",
            content: [
               {
                  subtitle: "업데이트 설정",
                  items: [
                     "실행 시 업데이트 확인: 앱 실행 시 자동 확인",
                     "알림 표시: 새 업데이트 알림 받기",
                     "업데이트 소스: 확인할 소스 선택"
                  ]
               },
               {
                  subtitle: "표시 옵션",
                  items: [
                     "다크/라이트 모드는 시스템 설정을 따릅니다",
                     "그리드, 목록 또는 테이블 뷰 중 선택",
                     "이름, 날짜 또는 업데이트 상태로 정렬"
                  ]
               }
            ]
         },
         {
            id: "faq",
            title: "자주 묻는 질문",
            icon: "❓",
            description: "자주 묻는 질문들",
            content: [
               {
                  subtitle: "일반적인 질문",
                  items: [
                     "Q: 앱이 안 보여요? → /Applications에 있는지 확인하세요",
                     "Q: 업데이트 실패? → 먼저 앱을 닫고 다시 시도하세요",
                     "Q: 잘못된 버전 표시? → 새로고침을 클릭하여 다시 스캔하세요",
                     "Q: 앱 제외하는 방법? → 오른쪽 클릭 후 '숨기기' 선택"
                  ]
               },
               {
                  subtitle: "문제 해결",
                  items: [
                     "앱이 새로고침되지 않으면 Vesslo를 재시작하세요",
                     "시스템 설정 > 개인 정보 보호 및 보안 > 앱 관리에서 Vesslo를 활성화하세요",
                     "시스템 설정 > 개인 정보 보호 및 보안 > 전체 디스크 접근 권한에서 Vesslo를 활성화하세요",
                     "모든 기능이 정상 작동하려면 두 권한 모두 필요합니다",
                     "권한 부여 후 Vesslo를 재시작하세요"
                  ]
               }
            ]
         }
      ]
   }
};

export default function Docs2Page() {
   const { i18n } = useTranslation();
   const [mounted, setMounted] = useState(false);
   const [activeSection, setActiveSection] = useState("getting-started");

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
                     {docData.sections
                        .filter((section) => section.id === activeSection)
                        .map((section) => (
                           <div key={section.id}>
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
                           </div>
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
