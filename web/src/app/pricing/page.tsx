"use client";

import { useTranslation } from "react-i18next";
import "@/i18n";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import Image from "next/image";

const PRICING_DATA = {
   en: {
      title: "Simple, One-Time Pricing",
      subtitle: "No subscriptions. Pay once, use forever.",
      apps: [
         {
            name: "Vesslo",
            price: "$9.99",
            icon: "/vesslo_icon.png",
            color: "#06b6d4",
            description: "The ultimate update manager for macOS",
            features: [
               "Unified update management",
               "Homebrew, Sparkle, App Store support",
               "Raycast extension included",
               "2 devices per license",
               "One-time purchase, no subscription"
            ]
         },
         {
            name: "KeyHarbor",
            price: "$6.99",
            icon: "/keyharbor-icon.png",
            color: "#3b82f6",
            description: "Secure license key management",
            features: [
               "All keys in one place",
               "Touch ID protection",
               "Expiration alerts",
               "Local storage only",
               "One-time purchase, no subscription"
            ]
         },
         {
            name: "SplitSwipe",
            price: "$5.99",
            icon: "/splitswipe-icon.png",
            color: "#8b5cf6",
            description: "Window management with gestures",
            features: [
               "Intuitive swipe gestures",
               "Snap grid system",
               "Keyboard shortcuts",
               "Custom layouts",
               "One-time purchase, no subscription"
            ]
         }
      ],
      faq: {
         title: "Frequently Asked Questions",
         items: [
            {
               q: "Is this a one-time purchase?",
               a: "Yes! Pay once for the current version. No subscriptions or recurring charges. Minor updates are included free."
            },
            {
               q: "How many devices can I use?",
               a: "Vesslo includes 2 device licenses per account. KeyHarbor and SplitSwipe are single-device licenses."
            },
            {
               q: "What payment methods are accepted?",
               a: "All payments are processed securely through Paddle. Credit cards, PayPal, and Apple Pay are accepted."
            },
            {
               q: "Is there a free trial?",
               a: "Yes! All apps offer a free trial period so you can test before purchasing."
            },
            {
               q: "What's the refund policy?",
               a: "We offer a 14-day money-back guarantee. If you're not satisfied, contact us for a full refund."
            }
         ]
      },
      paddle_notice: "All payments are securely processed by Paddle.com, our official Merchant of Record.",
      buy_button: "Buy Now"
   },
   ko: {
      title: "심플한 일회성 가격",
      subtitle: "구독 없음. 한 번 결제, 평생 사용.",
      apps: [
         {
            name: "Vesslo",
            price: "$9.99",
            icon: "/vesslo_icon.png",
            color: "#06b6d4",
            description: "macOS를 위한 궁극의 업데이트 관리자",
            features: [
               "통합 업데이트 관리",
               "Homebrew, Sparkle, App Store 지원",
               "Raycast 익스텐션 포함",
               "계정당 2대 기기 사용 가능",
               "1회성 결제, 구독 없음"
            ]
         },
         {
            name: "KeyHarbor",
            price: "$6.99",
            icon: "/keyharbor-icon.png",
            color: "#3b82f6",
            description: "안전한 라이선스 키 관리",
            features: [
               "모든 키를 한 곳에서",
               "Touch ID 보호",
               "만료 알림",
               "로컬 저장만 사용",
               "1회성 결제, 구독 없음"
            ]
         },
         {
            name: "SplitSwipe",
            price: "$5.99",
            icon: "/splitswipe-icon.png",
            color: "#8b5cf6",
            description: "제스처로 창 관리",
            features: [
               "직관적인 스와이프 제스처",
               "스냅 그리드 시스템",
               "키보드 단축키",
               "커스텀 레이아웃",
               "1회성 결제, 구독 없음"
            ]
         }
      ],
      faq: {
         title: "자주 묻는 질문",
         items: [
            {
               q: "일회성 구매인가요?",
               a: "네! 현재 버전을 한 번 결제하면 됩니다. 구독료 없이 마이너 업데이트는 무료로 포함됩니다."
            },
            {
               q: "몇 대의 기기에서 사용할 수 있나요?",
               a: "Vesslo는 계정당 2대까지 사용 가능합니다. KeyHarbor와 SplitSwipe는 1기기 라이선스입니다."
            },
            {
               q: "어떤 결제 방법을 지원하나요?",
               a: "모든 결제는 Paddle을 통해 안전하게 처리됩니다. 신용카드, PayPal, Apple Pay를 지원합니다."
            },
            {
               q: "무료 체험이 있나요?",
               a: "네! 모든 앱은 구매 전 테스트할 수 있는 무료 체험 기간을 제공합니다."
            },
            {
               q: "환불 정책은 어떻게 되나요?",
               a: "14일 환불 보증을 제공합니다. 만족하지 않으시면 전액 환불해 드립니다."
            }
         ]
      },
      paddle_notice: "모든 결제는 공식 판매 대행사인 Paddle.com을 통해 안전하게 처리됩니다.",
      buy_button: "지금 구매"
   }
};

export default function PricingPage() {
   const { i18n } = useTranslation();
   const lang = i18n.language?.startsWith('ko') ? 'ko' : 'en';
   const data = PRICING_DATA[lang as keyof typeof PRICING_DATA];

   return (
      <div className="min-h-screen bg-black text-white">
         <Navbar />

         {/* Hero */}
         <section className="pt-32 pb-16 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 text-center">
               <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-6xl font-bold mb-4"
               >
                  {data.title}
               </motion.h1>
               <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-slate-400"
               >
                  {data.subtitle}
               </motion.p>
            </div>
         </section>

         {/* Pricing Cards */}
         <section className="py-16">
            <div className="container mx-auto px-6">
               <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {data.apps.map((app, index) => (
                     <motion.div
                        key={app.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all group"
                     >
                        {/* App Icon */}
                        <div className="w-20 h-20 mb-6 relative">
                           <Image
                              src={app.icon}
                              alt={app.name}
                              fill
                              className="object-contain"
                           />
                        </div>

                        {/* App Name & Description */}
                        <h3 className="text-2xl font-bold mb-2">{app.name}</h3>
                        <p className="text-slate-400 text-sm mb-6">{app.description}</p>

                        {/* Price */}
                        <div className="mb-6">
                           <span className="text-4xl font-bold" style={{ color: app.color }}>
                              {app.price}
                           </span>
                           <span className="text-slate-500 ml-2">USD</span>
                        </div>

                        {/* Features */}
                        <ul className="space-y-3 mb-8">
                           {app.features.map((feature, i) => (
                              <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                 <svg className="w-5 h-5 flex-shrink-0" style={{ color: app.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                 </svg>
                                 {feature}
                              </li>
                           ))}
                        </ul>

                        {/* Buy Button */}
                        <button
                           className="w-full py-3 rounded-xl font-bold text-white transition-all hover:opacity-90"
                           style={{ backgroundColor: app.color }}
                        >
                           {data.buy_button}
                        </button>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* Paddle Notice */}
         <section className="py-8">
            <div className="container mx-auto px-6 text-center">
               <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10">
                  <span className="text-2xl">🛡️</span>
                  <p className="text-slate-400 text-sm">{data.paddle_notice}</p>
               </div>
            </div>
         </section>

         {/* FAQ */}
         <section className="py-24 relative overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black">
            <div className="container mx-auto px-6">
               <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{data.faq.title}</h2>

               <div className="max-w-3xl mx-auto space-y-6">
                  {data.faq.items.map((item, index) => (
                     <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-6"
                     >
                        <h3 className="text-lg font-bold mb-2">{item.q}</h3>
                        <p className="text-slate-400">{item.a}</p>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>
      </div>
   );
}
