import { initializePaddle, type Paddle } from "@paddle/paddle-js";
import {
  Apple,
  ArrowRight,
  Book,
  Bot,
  Check,
  ChevronRight,
  Database,
  Download,
  Facebook,
  FileText,
  Frame,
  Globe,
  Key,
  Layers,
  MapPin,
  MessageSquare,
  Monitor,
  Play,
  Shield,
  Shirt,
  Sparkles,
  Star,
  Users,
  Youtube,
  Zap,
} from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  originalPrice?: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
  paddlePriceId: string | null;
}

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Stats {
  value: string;
  label: string;
  color: string;
}

type Language = "en" | "ar";

// Translation content
const translations = {
  en: {
    nav: {
      features: "Features",
      pricing: "Pricing",
      reviews: "Reviews",
      download: "Download",
      contact: "Contact",
    },
    hero: {
      tagline: "AI-Powered Manga Creation Studio",
      title1: "Create Epic",
      title2: "Manga Stories",
      title3: "with AI Chat",
      description:
        "The first desktop app that lets you create complete manga stories through conversation. Design characters, build scenes, generate panels with speech bubbles - all powered by AI.",
      windows: "Windows (.exe)",
      macos: "macOS (.dmg)",
      watchDemo: "Watch Demo",
    },
    features: {
      title1: "Everything You Need",
      title2: "to Create Manga",
      description:
        "From story conception to final webtoon panels, MangaAI handles every aspect of manga creation",
      aiChat: "AI Chat Interface",
      aiChatDesc:
        "Create your entire manga through natural conversation. Describe characters, scenes, and dialogue - our AI understands your vision.",
      chapterManagement: "Chapter Management",
      chapterManagementDesc:
        "Organize your story with intelligent chapter and scene structuring. Build complex narratives with seamless flow.",
      panelGeneration: "Panel Generation",
      panelGenerationDesc:
        "Generate professional webtoon panels with perfect composition, speech bubbles, and visual storytelling elements.",
      characterDesigner: "Character Designer",
      characterDesignerDesc:
        "Create consistent characters with unique personalities, expressions, and designs that stay true throughout your story.",
      outfitCreator: "Outfit Creator",
      outfitCreatorDesc:
        "Design custom outfits and accessories for your characters. Mix and match styles to create unique looks.",
      locationBuilder: "Location Builder",
      locationBuilderDesc:
        "Craft immersive backgrounds and locations. From fantasy realms to modern cities, create the perfect setting.",
      sqliteStorage: "Local SQLite Storage",
      sqliteStorageDesc:
        "All your work is stored securely on your device with SQLite database. No cloud dependency, complete privacy.",
      geminiIntegration: "Gemini API Integration",
      geminiIntegrationDesc:
        "Powered by Google's Gemini AI. Simply provide your API key and unlock unlimited creative possibilities.",
      private: "100% Private",
      privateDesc: "Your stories stay on your device with local SQLite storage",
      fast: "Lightning Fast",
      fastDesc: "Generate complete panels with dialogue in seconds",
      apiKey: "Your API Key",
      apiKeyDesc: "Use your own Gemini API key - full control and transparency",
    },
    pricing: {
      title: "Simple Pricing",
      description:
        "Start free, upgrade when you're ready to unlock unlimited creativity",
      monthly: "Monthly",
      yearly: "Yearly",
      lifetime: "Lifetime",
      save: "Save 20%",
      bestDeal: "Best Deal",
      guarantee: "30-day money-back guarantee",
      cancel: "Cancel anytime",
      noFees: "No hidden fees",
      freeTrial: "Free Trial",
      freeTrialDesc: "Perfect for trying out MangaAI's capabilities",
      creator: "Creator",
      creatorDesc: "For serious manga creators and storytellers",
      studio: "Studio",
      studioDesc: "For teams and professional studios",
      creatorLifetime: "Creator Lifetime",
      creatorLifetimeDesc:
        "One-time payment, lifetime access to Creator features",
    },
    testimonials: {
      title: "Loved by Creators",
      description:
        "Join thousands of manga artists who are revolutionizing their creative process",
    },
    download: {
      available: "Available Now",
      title: "Download MangaAI Desktop",
      description:
        "Get the latest version with automatic updates. Available for Windows and macOS.",
      windows: "Download for Windows",
      macos: "Download for macOS",
      tutorials: "Tutorials (Coming Soon)",
    },
    howItWorks: {
      title: "How It Works",
      description: "Create professional manga in three simple steps",
      step1: {
        title: "Chat & Describe",
        description:
          "Simply chat with the AI to describe your characters, scenes, and story. No complex interfaces - just natural conversation.",
      },
      step2: {
        title: "AI Generates",
        description:
          "Watch as the AI creates your characters, designs scenes, and builds complete manga panels with professional speech bubbles.",
      },
      step3: {
        title: "Export & Share",
        description:
          "Export your completed manga as high-resolution webtoon panels ready for publishing on any platform.",
      },
    },
    cta: {
      title: "Ready to Create Your Manga Masterpiece?",
      description:
        "Join thousands of creators who are already building amazing stories with MangaAI's revolutionary chat-based interface.",
      download: "Download Free Trial",
      viewPricing: "View Pricing Plans",
      freeTrial: "Free 14-day trial",
      noCard: "No credit card required",
      cancelAnytime: "Cancel anytime",
    },
    footer: {
      product: "Product",
      support: "Support",
      documentation: "Documentation (Coming Soon)",
      community: "Community (Coming Soon)",
      contact: "Contact Us",
      rights: "© 2024 MangaAI. All rights reserved.",
    },
  },
  ar: {
    nav: {
      features: "الميزات",
      pricing: "الأسعار",
      reviews: "التقييمات",
      download: "تحميل",
      contact: "اتصل بنا",
    },
    hero: {
      tagline: "استوديو إنشاء المانغا المدعوم بالذكاء الاصطناعي",
      title1: "أنشئ قصص",
      title2: "مانغا ملحمية",
      title3: "باستخدام الدردشة بالذكاء الاصطناعي",
      description:
        "أول تطبيق سطح مكتب يتيح لك إنشاء قصص مانغا كاملة من خلال المحادثة. صمم الشخصيات، ابني المشاهد، أنشئ لوحات بفقاعات الكلام - كل ذلك مدعوم بالذكاء الاصطناعي.",
      windows: "ويندوز (.exe)",
      macos: "ماك (.dmg)",
      watchDemo: "شاهد العرض",
    },
    features: {
      title1: "كل ما تحتاجه",
      title2: "لإنشاء المانغا",
      description:
        "من بداية القصة إلى لوحات الويب تون النهائية، MangaAI يتعامل مع كل جانب من إنشاء المانغا",
      aiChat: "واجهة الدردشة بالذكاء الاصطناعي",
      aiChatDesc:
        "أنشئ مانغاك الكاملة من خلال المحادثة الطبيعية. صف الشخصيات والمشاهد والحوار - ذكائنا الاصطناعي يفهم رؤيتك.",
      chapterManagement: "إدارة الفصول",
      chapterManagementDesc:
        "نظم قصتك مع هيكلة ذكية للفصول والمشاهد. ابني سرداً معقداً بتدفق سلس.",
      panelGeneration: "إنشاء اللوحات",
      panelGenerationDesc:
        "أنشئ لوحات ويب تون احترافية بتكوين مثالي، فقاعات كلام، وعناصر سرد بصري متقنة.",
      characterDesigner: "مصمم الشخصيات",
      characterDesignerDesc:
        "أنشئ شخصيات متسقة بشخصيات فريدة، تعبيرات، وتصاميم تبقى صحيحة طوال قصتك.",
      outfitCreator: "مصمم الملابس",
      outfitCreatorDesc:
        "صمم ملابس وإكسسوارات مخصصة لشخصياتك. اخلط وطابق الأنماط لإنشاء مظهر فريد.",
      locationBuilder: "باني المواقع",
      locationBuilderDesc:
        "اصنع خلفيات غامرة ومواقع. من عوالم خيالية إلى مدن حديثة، أنشئ الإعداد المثالي.",
      sqliteStorage: "تخزين SQLite محلي",
      sqliteStorageDesc:
        "يتم تخزين جميع عملك بأمان على جهازك مع قاعدة بيانات SQLite. لا تبعية للسحابة، خصوصية كاملة.",
      geminiIntegration: "دمج Gemini API",
      geminiIntegrationDesc:
        "مدعوم بذكاء Gemini الاصطناعي من جوجل. ما عليك سوى تقديم مفتاح API الخاص بك وافتح إمكانيات إبداعية غير محدودة.",
      private: "100% خاص",
      privateDesc: "تبقى قصصك على جهازك مع تخزين SQLite محلي",
      fast: "سريع جداً",
      fastDesc: "أنشئ لوحات كاملة مع حوار في ثوانٍ",
      apiKey: "مفتاح API الخاص بك",
      apiKeyDesc: "استخدم مفتاح Gemini API الخاص بك - تحكم كامل وشفافية",
    },
    pricing: {
      title: "أسعار بسيطة",
      description:
        "ابدأ مجاناً، وقم بالترقية عندما تكون جاهزاً لفتح الإبداع غير المحدود",
      monthly: "شهري",
      yearly: "سنوي",
      lifetime: "مدى الحياة",
      save: "وفر 20%",
      bestDeal: "أفضل عرض",
      guarantee: "ضمان استرداد الأموال لمدة 30 يوم",
      cancel: "ألغ في أي وقت",
      noFees: "لا توجد رسوم خفية",
      freeTrial: "تجربة مجانية",
      freeTrialDesc: "مثالي لتجربة قدرات MangaAI",
      creator: "المبدع",
      creatorDesc: "لمبدعي المانغا الجادين ورواة القصص",
      studio: "الاستوديو",
      studioDesc: "للفرق والاستوديوهات المحترفة",
      creatorLifetime: "المبدع مدى الحياة",
      creatorLifetimeDesc: "دفعة لمرة واحدة، وصول مدى الحياة لميزات المبدع",
    },
    testimonials: {
      title: "محبوب من المبدعين",
      description:
        "انضم إلى آلاف فنانين المانغا الذين يحدثون ثورة في عملية الإبداع الخاصة بهم",
    },
    download: {
      available: "متاح الآن",
      title: "حمّل MangaAI لسطح المكتب",
      description:
        "احصل على أحدث نسخة مع تحديثات تلقائية. متاح للويندوز والماك.",
      windows: "تحميل للويندوز",
      macos: "تحميل للماك",
      tutorials: "الدروس (قريباً)",
    },
    howItWorks: {
      title: "كيف يعمل",
      description: "أنشئ مانغا احترافية في ثلاث خطوات بسيطة",
      step1: {
        title: "دردش وصف",
        description:
          "ما عليك سوى الدردشة مع الذكاء الاصطناعي لوصف شخصياتك ومشاهدك وقصتك. لا توجد واجهات معقدة - فقط محادثة طبيعية.",
      },
      step2: {
        title: "الذكاء الاصطناعي ينشئ",
        description:
          "شاهد بينما ينشئ الذكاء الاصطناعي شخصياتك، ويصمم المشاهد، ويبني لوحات مانغا كاملة بفقاعات كلام احترافية.",
      },
      step3: {
        title: "صدّر وشارك",
        description:
          "قم بتصدير مانغاك المكتملة كلوحات ويب تون عالية الدقة جاهزة للنشر على أي منصة.",
      },
    },
    cta: {
      title: "مستعد لإنشاء تحفتك من المانغا؟",
      description:
        "انضم إلى آلاف المبدعين الذين يبنون بالفعل قصصاً مذهلة باستخدام واجهة الدردشة الثورية لـ MangaAI.",
      download: "حمّل النسخة التجريبية المجانية",
      viewPricing: "عرض خطط الأسعار",
      freeTrial: "تجربة مجانية 14 يوم",
      noCard: "لا حاجة لبطاقة ائتمان",
      cancelAnytime: "ألغ في أي وقت",
    },
    footer: {
      product: "المنتج",
      support: "الدعم",
      documentation: "الوثائق (قريباً)",
      community: "المجتمع (قريباً)",
      contact: "اتصل بنا",
      rights: "© 2024 MangaAI. جميع الحقوق محفوظة.",
    },
  },
};

const LandingPage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"monthly" | "yearly" | "lifetime">(
    "monthly"
  );
  const [paddleInstance, setPaddleInstance] = useState<Paddle | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [language] = useState<Language>("en");

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const initialize = async () => {
      try {
        const paddle = await initializePaddle({
          environment: "sandbox",
          token: "test_15203fea84a753f6514b479a062",
        });
        setPaddleInstance(paddle);
      } catch (error) {
        console.error("Failed to initialize Paddle:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  const isRTL = language === "ar";

  const openPaddleCheckout = useCallback(
    (priceId: string): void => {
      if (!paddleInstance) {
        alert(
          language === "en"
            ? "Payment system is still loading, please try again in a moment."
            : "نظام الدفع لا يزال قيد التحميل، يرجى المحاولة مرة أخرى بعد قليل."
        );
        return;
      }
      paddleInstance.Checkout.open({
        items: [{ priceId, quantity: 1 }],
        customData: { source: "website" },
      });
    },
    [paddleInstance, language]
  );

  const t = translations[language];

  const features: Feature[] = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: t.features.aiChat,
      description: t.features.aiChatDesc,
    },
    {
      icon: <Book className="w-8 h-8" />,
      title: t.features.chapterManagement,
      description: t.features.chapterManagementDesc,
    },
    {
      icon: <Frame className="w-8 h-8" />,
      title: t.features.panelGeneration,
      description: t.features.panelGenerationDesc,
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t.features.characterDesigner,
      description: t.features.characterDesignerDesc,
    },
    {
      icon: <Shirt className="w-8 h-8" />,
      title: t.features.outfitCreator,
      description: t.features.outfitCreatorDesc,
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: t.features.locationBuilder,
      description: t.features.locationBuilderDesc,
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: t.features.sqliteStorage,
      description: t.features.sqliteStorageDesc,
    },
    {
      icon: <Key className="w-8 h-8" />,
      title: t.features.geminiIntegration,
      description: t.features.geminiIntegrationDesc,
    },
  ];

  const stats: Stats[] = [
    {
      value: "50K+",
      label:
        language === "en" ? "Manga Panels Created" : "لوحات مانغا تم إنشاؤها",
      color: "text-purple-400",
    },
    {
      value: "15K+",
      label: language === "en" ? "Active Creators" : "مبدعين نشطين",
      color: "text-pink-400",
    },
    {
      value: "500+",
      label: language === "en" ? "Completed Stories" : "قصة مكتملة",
      color: "text-blue-400",
    },
    {
      value: "4.9/5",
      label: language === "en" ? "Creator Rating" : "تقييم المبدعين",
      color: "text-green-400",
    },
  ];

  const testimonials: Testimonial[] = [
    {
      name: language === "en" ? "Yuki Tanaka" : "يوكي تاناكا",
      role: language === "en" ? "Indie Manga Creator" : "مبدع مانغا مستقل",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      content:
        language === "en"
          ? "MangaAI completely transformed my workflow. I can now create full chapters in days instead of months. The character consistency is incredible!"
          : "MangaAI غيرت تماماً طريقة عملي. يمكنني الآن إنشاء فصول كاملة في أيام بدلاً من أشهر. اتساق الشخصيات لا يصدق!",
      rating: 5,
    },
    {
      name: language === "en" ? "Sofia Rodriguez" : "صوفيا رودريغيز",
      role: language === "en" ? "Webtoon Artist" : "فنان ويب تون",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b1e5?w=100&h=100&fit=crop&crop=face",
      content:
        language === "en"
          ? "The chat-based interface is genius! I just describe my scenes and the AI creates exactly what I envision. It's like having a whole art team."
          : "واجهة الدردشة عبقرية! أنا فقط أصف مشاهد وي والذكاء الاصطناعي ينشئ بالضبط ما أتخيله. يشبه وجود فريق فني كامل.",
      rating: 5,
    },
    {
      name: language === "en" ? "Alex Chen" : "أليكس تشين",
      role: language === "en" ? "Digital Storyteller" : "راوي قصص رقمي",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      content:
        language === "en"
          ? "Finally, a tool that understands storytelling! The panel generation with speech bubbles saves me hours of work. Absolutely game-changing!"
          : "أخيراً، أداة تفهم سرد القصص! إنشاء اللوحات مع فقاعات الكلام يوفر لي ساعات من العمل. تغيير قواعد اللعبة تماماً!",
      rating: 5,
    },
  ];

  const pricingPlans: Record<"monthly" | "yearly" | "lifetime", PricingPlan[]> =
    {
      monthly: [
        {
          name: t.pricing.freeTrial,
          price: "0",
          period: language === "en" ? "14 days" : "14 يوم",
          description: t.pricing.freeTrialDesc,
          features: [
            language === "en"
              ? "100 AI generations"
              : "100 عملية إنشاء بالذكاء الاصطناعي",
            language === "en" ? "5 characters" : "5 شخصيات",
            language === "en" ? "Basic panel layouts" : "تخطيطات لوحات أساسية",
            language === "en" ? "Community support" : "دعم المجتمع",
            language === "en" ? "Local SQLite storage" : "تخزين SQLite محلي",
          ],
          cta: language === "en" ? "Start Free Trial" : "ابدأ التجربة المجانية",
          popular: false,
          paddlePriceId: "pri_01k65kfvna4cjae8a62n1gh7g3",
        },
        {
          name: t.pricing.creator,
          price: "29",
          period: language === "en" ? "month" : "شهر",
          description: t.pricing.creatorDesc,
          features: [
            language === "en"
              ? "Unlimited AI generations"
              : "عمليات إنشاء غير محدودة بالذكاء الاصطناعي",
            language === "en" ? "Unlimited characters" : "شخصيات غير محدودة",
            language === "en"
              ? "Advanced panel layouts"
              : "تخطيطات لوحات متقدمة",
            language === "en" ? "Custom speech bubbles" : "فقاعات كلام مخصصة",
            language === "en" ? "Chapter management" : "إدارة الفصول",
            language === "en" ? "Priority support" : "دعم مميز",
            language === "en" ? "Commercial license" : "ترخيص تجاري",
          ],
          cta: language === "en" ? "Get Creator" : "احصل على المبدع",
          popular: true,
          paddlePriceId: "pri_01k65kfvna4cjae8a62n1gh7g3",
        },
        {
          name: t.pricing.studio,
          price: "79",
          period: language === "en" ? "month" : "شهر",
          description: t.pricing.studioDesc,
          features: [
            language === "en" ? "Everything in Creator" : "كل شيء في المبدع",
            language === "en" ? "Team collaboration" : "تعاون الفريق",
            language === "en" ? "Advanced story tools" : "أدوات قصة متقدمة",
            language === "en" ? "Bulk operations" : "عمليات مجمعة",
            language === "en" ? "Custom integrations" : "تكاملات مخصصة",
            language === "en" ? "Dedicated support" : "دعم مخصص",
            language === "en"
              ? "White-label options"
              : "خيارات بدون علامة تجارية",
          ],
          cta: language === "en" ? "Get Studio" : "احصل على الاستوديو",
          popular: false,
          paddlePriceId: "pri_01k65kfvna4cjae8a62n1gh7g3",
        },
      ],
      yearly: [
        {
          name: t.pricing.freeTrial,
          price: "0",
          period: language === "en" ? "14 days" : "14 يوم",
          description: t.pricing.freeTrialDesc,
          features: [
            language === "en"
              ? "100 AI generations"
              : "100 عملية إنشاء بالذكاء الاصطناعي",
            language === "en" ? "5 characters" : "5 شخصيات",
            language === "en" ? "Basic panel layouts" : "تخطيطات لوحات أساسية",
            language === "en" ? "Community support" : "دعم المجتمع",
            language === "en" ? "Local SQLite storage" : "تخزين SQLite محلي",
          ],
          cta: language === "en" ? "Start Free Trial" : "ابدأ التجربة المجانية",
          popular: false,
          paddlePriceId: "pri_01k65kfvna4cjae8a62n1gh7g3",
        },
        {
          name: t.pricing.creator,
          price: "290",
          period: language === "en" ? "year" : "سنة",
          originalPrice: "348",
          description: t.pricing.creatorDesc,
          features: [
            language === "en"
              ? "Unlimited AI generations"
              : "عمليات إنشاء غير محدودة بالذكاء الاصطناعي",
            language === "en" ? "Unlimited characters" : "شخصيات غير محدودة",
            language === "en"
              ? "Advanced panel layouts"
              : "تخطيطات لوحات متقدمة",
            language === "en" ? "Custom speech bubbles" : "فقاعات كلام مخصصة",
            language === "en" ? "Chapter management" : "إدارة الفصول",
            language === "en" ? "Priority support" : "دعم مميز",
            language === "en" ? "Commercial license" : "ترخيص تجاري",
          ],
          cta: language === "en" ? "Get Creator" : "احصل على المبدع",
          popular: true,
          paddlePriceId: "pri_01k65kfvna4cjae8a62n1gh7g3",
        },
        {
          name: t.pricing.studio,
          price: "790",
          period: language === "en" ? "year" : "سنة",
          originalPrice: "948",
          description: t.pricing.studioDesc,
          features: [
            language === "en" ? "Everything in Creator" : "كل شيء في المبدع",
            language === "en" ? "Team collaboration" : "تعاون الفريق",
            language === "en" ? "Advanced story tools" : "أدوات قصة متقدمة",
            language === "en" ? "Bulk operations" : "عمليات مجمعة",
            language === "en" ? "Custom integrations" : "تكاملات مخصصة",
            language === "en" ? "Dedicated support" : "دعم مخصص",
            language === "en"
              ? "White-label options"
              : "خيارات بدون علامة تجارية",
          ],
          cta: language === "en" ? "Get Studio" : "احصل على الاستوديو",
          popular: false,
          paddlePriceId: "pri_01k65kfvna4cjae8a62n1gh7g3",
        },
      ],
      lifetime: [
        {
          name: t.pricing.creatorLifetime,
          price: "499",
          period: language === "en" ? "once" : "مرة واحدة",
          description: t.pricing.creatorLifetimeDesc,
          features: [
            language === "en"
              ? "Unlimited AI generations"
              : "عمليات إنشاء غير محدودة بالذكاء الاصطناعي",
            language === "en" ? "Unlimited characters" : "شخصيات غير محدودة",
            language === "en"
              ? "Advanced panel layouts"
              : "تخطيطات لوحات متقدمة",
            language === "en" ? "Custom speech bubbles" : "فقاعات كلام مخصصة",
            language === "en" ? "Chapter management" : "إدارة الفصول",
            language === "en" ? "Lifetime updates" : "تحديثات مدى الحياة",
            language === "en" ? "Priority support" : "دعم مميز",
            language === "en" ? "Commercial license" : "ترخيص تجاري",
          ],
          cta:
            language === "en"
              ? "Get Lifetime Access"
              : "احصل على الوصول مدى الحياة",
          popular: true,
          paddlePriceId: "pri_01k65kfvna4cjae8a62n1gh7g3",
        },
      ],
    };

  const downloadLinks = {
    windows:
      "https://github.com/yourusername/manga-ai-releases/releases/latest/download/MangaAI-Setup.exe",
    mac: "https://github.com/yourusername/manga-ai-releases/releases/latest/download/MangaAI.dmg",
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden ${
        isRTL ? "rtl" : "ltr"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-slate-900/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
            : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex justify-between items-center py-4 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`flex items-center space-x-3 ${
                isRTL ? "space-x-reverse" : ""
              }`}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className={isRTL ? "text-right" : "text-left"}>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  MangaAI
                </span>
                <div className="text-xs text-gray-400">
                  {language === "en" ? "Desktop Edition" : "إصدار سطح المكتب"}
                </div>
              </div>
            </div>

            <div
              className={`hidden md:flex space-x-8 ${
                isRTL ? "space-x-reverse" : ""
              }`}
            >
              <a
                href="#features"
                className="hover:text-purple-400 transition-all duration-300 flex items-center space-x-1"
              >
                <span>{t.nav.features}</span>
              </a>
              <a
                href="#pricing"
                className="hover:text-purple-400 transition-all duration-300 flex items-center space-x-1"
              >
                <span>{t.nav.pricing}</span>
              </a>
              <a
                href="#testimonials"
                className="hover:text-purple-400 transition-all duration-300 flex items-center space-x-1"
              >
                <span>{t.nav.reviews}</span>
              </a>
              <a
                href="#download"
                className="hover:text-purple-400 transition-all duration-300 flex items-center space-x-1"
              >
                <span>{t.nav.download}</span>
              </a>
              <a
                href="https://facebook.com/mangaaiapp"
                className="hover:text-blue-400 transition-all duration-300 flex items-center space-x-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-4 h-4" />
                <span>{t.nav.contact}</span>
              </a>
            </div>

            <div
              className={`flex items-center space-x-4 ${
                isRTL ? "space-x-reverse" : ""
              }`}
            >
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>{t.nav.download}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="mb-8">
              <span className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-sm font-medium backdrop-blur-sm">
                <Bot className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                {t.hero.tagline}
                <ChevronRight
                  className={`w-4 h-4 ${isRTL ? "mr-2" : "ml-2"}`}
                />
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-none">
              <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent block">
                {t.hero.title1}
              </span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent block">
                {t.hero.title2}
              </span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent block text-5xl md:text-6xl lg:text-7xl">
                {t.hero.title3}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              {t.hero.description}
            </p>

            <div className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-16">
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={downloadLinks.windows}
                  className="group bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
                >
                  <Monitor className="w-6 h-6" />
                  <span>{t.hero.windows}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href={downloadLinks.mac}
                  className="group bg-gradient-to-r from-slate-600 to-slate-700 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-slate-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
                >
                  <Apple className="w-6 h-6" />
                  <span>{t.hero.macos}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <button className="group border-2 border-white/20 hover:border-purple-400 px-8 py-4 rounded-2xl font-bold text-lg backdrop-blur-sm hover:bg-white/5 transition-all duration-300 flex items-center space-x-2">
                <Play className="w-6 h-6" />
                <span>{t.hero.watchDemo}</span>
              </button>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div
                    className={`text-4xl font-bold ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {t.features.title1}
              <span className="block text-4xl md:text-5xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t.features.title2}
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.features.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-gradient-to-b hover:from-white/10 hover:to-white/5 hover:border-purple-500/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10"
              >
                <div className="text-purple-400 mb-6 group-hover:text-pink-400 transition-colors duration-300 group-hover:scale-110 transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm group-hover:text-gray-200 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Key Benefits */}
          <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-3xl p-12 border border-white/10 backdrop-blur-xl">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">{t.features.private}</h3>
                <p className="text-gray-300">{t.features.privateDesc}</p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">{t.features.fast}</h3>
                <p className="text-gray-300">{t.features.fastDesc}</p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">{t.features.apiKey}</h3>
                <p className="text-gray-300">{t.features.apiKeyDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {t.pricing.title}
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              {t.pricing.description}
            </p>

            {/* Enhanced Tab Navigation */}
            <div className="flex justify-center mb-12">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-2 border border-white/20">
                {(["monthly", "yearly", "lifetime"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{t.pricing[tab]}</span>
                    {tab === "yearly" && (
                      <span
                        className={`${
                          isRTL ? "mr-2" : "ml-2"
                        } bg-green-500 text-white px-2 py-1 rounded-lg text-xs`}
                      >
                        {t.pricing.save}
                      </span>
                    )}
                    {tab === "lifetime" && (
                      <span
                        className={`${
                          isRTL ? "mr-2" : "ml-2"
                        } bg-yellow-500 text-black px-2 py-1 rounded-lg text-xs`}
                      >
                        {t.pricing.bestDeal}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans[activeTab].map((plan, index) => (
              <div
                key={index}
                className={`relative bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-xl border rounded-3xl p-8 transition-all duration-500 transform hover:-translate-y-2 ${
                  plan.popular
                    ? "border-purple-500 shadow-2xl shadow-purple-500/25 scale-105 lg:scale-110"
                    : "border-white/10 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg">
                      {language === "en" ? "Most Popular" : "الأكثر شعبية"}
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-6">{plan.description}</p>

                  <div className="mb-4">
                    {plan.originalPrice && (
                      <span className="text-2xl text-gray-500 line-through mr-2">
                        ${plan.originalPrice}
                      </span>
                    )}
                    <span className="text-5xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                      ${plan.price}
                    </span>
                    <span className="text-gray-400">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start space-x-3"
                    >
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() =>
                    plan.paddlePriceId
                      ? openPaddleCheckout(plan.paddlePriceId)
                      : null
                  }
                  disabled={isLoading}
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-xl hover:shadow-purple-500/25 text-white"
                      : "border-2 border-white/20 hover:border-purple-400 hover:bg-white/5 text-white"
                  }`}
                >
                  {isLoading
                    ? language === "en"
                      ? "Loading..."
                      : "جاري التحميل..."
                    : plan.cta}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p
              className={`text-gray-400 flex items-center justify-center space-x-4 flex-wrap ${
                isRTL ? "space-x-reverse" : ""
              }`}
            >
              <span className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>{t.pricing.guarantee}</span>
              </span>
              <span>•</span>
              <span>{t.pricing.cancel}</span>
              <span>•</span>
              <span>{t.pricing.noFees}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {t.testimonials.title}
            </h2>
            <p className="text-xl text-gray-300">
              {t.testimonials.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-b from-white/10 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-gradient-to-b hover:from-white/15 hover:to-white/5 hover:border-purple-500/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10"
              >
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <p className="text-gray-200 mb-8 leading-relaxed italic text-lg">
                  "{testimonial.content}"
                </p>

                <div
                  className={`flex items-center space-x-4 ${
                    isRTL ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <div className="relative">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-white/20"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-slate-900"></div>
                  </div>
                  <div className={isRTL ? "text-right" : "text-left"}>
                    <div className="font-bold text-white text-lg">
                      {testimonial.name}
                    </div>
                    <div className="text-purple-400 text-sm font-medium">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 border border-purple-500/20 rounded-3xl p-12 backdrop-blur-xl text-center">
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Download className="w-8 h-8 text-purple-400" />
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {t.download.available}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {t.download.title}
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                {t.download.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
              <a
                href={downloadLinks.windows}
                className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 px-8 py-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 flex items-center justify-center space-x-3"
              >
                <Monitor className="w-8 h-8" />
                <div className={isRTL ? "text-right" : "text-left"}>
                  <div>{t.download.windows}</div>
                  <div className="text-sm opacity-75">MangaAI-Setup.exe</div>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={downloadLinks.mac}
                className="group bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 px-8 py-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-slate-500/25 flex items-center justify-center space-x-3"
              >
                <Apple className="w-8 h-8" />
                <div className={isRTL ? "text-right" : "text-left"}>
                  <div>{t.download.macos}</div>
                  <div className="text-sm opacity-75">MangaAI.dmg</div>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href="https://youtube.com/@mangaai"
                className="group border-2 border-white/20 hover:border-red-400 px-6 py-3 rounded-xl font-semibold backdrop-blur-sm hover:bg-white/5 transition-all duration-300 flex items-center space-x-2 opacity-50 cursor-not-allowed"
                onClick={(e) => {
                  e.preventDefault();
                  alert(
                    language === "en"
                      ? "YouTube tutorials coming soon! Follow us on Facebook for updates."
                      : "دروس اليوتيوب قريباً! تابعنا على الفيسبوك للتحديثات."
                  );
                }}
              >
                <Youtube className="w-5 h-5" />
                <span>{t.download.tutorials}</span>
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-gray-400">
              <div className="flex items-center justify-center space-x-2">
                <Database className="w-4 h-4 text-purple-400" />
                <span>
                  {language === "en" ? "SQLite Storage" : "تخزين SQLite"}
                </span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Key className="w-4 h-4 text-pink-400" />
                <span>{language === "en" ? "Gemini API" : "Gemini API"}</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>{language === "en" ? "100% Private" : "100% خاص"}</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>
                  {language === "en" ? "Real-time AI" : "ذكاء اصطناعي فوري"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {t.howItWorks.title}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.howItWorks.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300 shadow-2xl shadow-purple-500/25">
                  <MessageSquare className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                {t.howItWorks.step1.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {t.howItWorks.step1.description}
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300 shadow-2xl shadow-cyan-500/25">
                  <Layers className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                {t.howItWorks.step2.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {t.howItWorks.step2.description}
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300 shadow-2xl shadow-green-500/25">
                  <FileText className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                {t.howItWorks.step3.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {t.howItWorks.step3.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 border border-purple-500/30 rounded-3xl p-12 backdrop-blur-xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {t.cta.title}
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {t.cta.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href={downloadLinks.windows}
                className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3"
              >
                <Download className="w-6 h-6" />
                <span>{t.cta.download}</span>
              </a>

              <a
                href="#pricing"
                className="border-2 border-white/20 hover:border-purple-400 px-8 py-4 rounded-2xl font-bold text-lg backdrop-blur-sm hover:bg-white/5 transition-all duration-300"
              >
                {t.cta.viewPricing}
              </a>
            </div>

            <div
              className={`flex items-center justify-center space-x-6 text-sm text-gray-400 ${
                isRTL ? "space-x-reverse" : ""
              }`}
            >
              <span className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>{t.cta.freeTrial}</span>
              </span>
              <span className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>{t.cta.noCard}</span>
              </span>
              <span className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>{t.cta.cancelAnytime}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div
            className={`grid md:grid-cols-4 gap-8 mb-8 ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            <div className="col-span-2">
              <div
                className={`flex items-center space-x-3 mb-4 ${
                  isRTL ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div className={isRTL ? "text-right" : "text-left"}>
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    MangaAI
                  </span>
                  <div className="text-xs text-gray-400">
                    {language === "en" ? "Desktop Edition" : "إصدار سطح المكتب"}
                  </div>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                {language === "en"
                  ? "The first AI-powered desktop application for creating complete manga stories through natural conversation. Transform your ideas into professional webtoon panels instantly."
                  : "أول تطبيق سطح مكتب مدعوم بالذكاء الاصطناعي لإنشاء قصص مانغا كاملة من خلال المحادثة الطبيعية. حول أفكارك إلى لوحات ويب تون احترافية على الفور."}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">
                {t.footer.product}
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#features"
                    className="hover:text-white transition-colors"
                  >
                    {t.nav.features}
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-white transition-colors"
                  >
                    {t.nav.pricing}
                  </a>
                </li>
                <li>
                  <a
                    href="#download"
                    className="hover:text-white transition-colors"
                  >
                    {t.nav.download}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">
                {t.footer.support}
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <span className="opacity-50 cursor-not-allowed">
                    {t.footer.documentation}
                  </span>
                </li>
                <li>
                  <span className="opacity-50 cursor-not-allowed">
                    {t.download.tutorials}
                  </span>
                </li>
                <li>
                  <span className="opacity-50 cursor-not-allowed">
                    {t.footer.community}
                  </span>
                </li>
                <li>
                  <a
                    href="https://facebook.com/mangaaiapp"
                    className="hover:text-white transition-colors flex items-center space-x-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook className="w-4 h-4" />
                    <span>{t.footer.contact}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            className={`flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 ${
              isRTL ? "md:flex-row-reverse" : ""
            }`}
          >
            <div
              className={`flex space-x-8 text-gray-400 mb-4 md:mb-0 ${
                isRTL ? "space-x-reverse" : ""
              }`}
            >
              <a href="#" className="hover:text-white transition-colors">
                {language === "en" ? "Privacy Policy" : "سياسة الخصوصية"}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {language === "en" ? "Terms of Service" : "شروط الخدمة"}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {language === "en" ? "License" : "الترخيص"}
              </a>
            </div>

            <div
              className={`flex items-center space-x-4 ${
                isRTL ? "space-x-reverse" : ""
              }`}
            >
              <a
                href="https://facebook.com/mangaaiapp"
                className="p-2 hover:bg-blue-600/20 rounded-lg transition-all duration-300 group"
                target="_blank"
                rel="noopener noreferrer"
                title={t.footer.contact}
              >
                <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-400 transition-colors group-hover:scale-110" />
              </a>
              <span className="text-gray-400">|</span>
              <span className="text-gray-400">{t.footer.rights}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

declare global {
  interface Window {
    Paddle?: Paddle;
  }
}

export default LandingPage;
