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

const LandingPage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"monthly" | "yearly" | "lifetime">(
    "monthly"
  );
  const [paddleInstance, setPaddleInstance] = useState<Paddle | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
          environment: "sandbox", // or "production"
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

  const openPaddleCheckout = useCallback(
    (priceId: string): void => {
      if (!paddleInstance) {
        alert("Payment system is still loading, please try again in a moment.");
        return;
      }

      paddleInstance.Checkout.open({
        items: [{ priceId, quantity: 1 }],

        customData: {
          source: "website",
        },
      });
    },
    [paddleInstance]
  );

  const features: Feature[] = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "AI Chat Interface",
      description:
        "Create your entire manga through natural conversation. Describe characters, scenes, and dialogue - our AI understands your vision.",
    },
    {
      icon: <Book className="w-8 h-8" />,
      title: "Chapter Management",
      description:
        "Organize your story with intelligent chapter and scene structuring. Build complex narratives with seamless flow.",
    },
    {
      icon: <Frame className="w-8 h-8" />,
      title: "Panel Generation",
      description:
        "Generate professional webtoon panels with perfect composition, speech bubbles, and visual storytelling elements.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Character Designer",
      description:
        "Create consistent characters with unique personalities, expressions, and designs that stay true throughout your story.",
    },
    {
      icon: <Shirt className="w-8 h-8" />,
      title: "Outfit Creator",
      description:
        "Design custom outfits and accessories for your characters. Mix and match styles to create unique looks.",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Location Builder",
      description:
        "Craft immersive backgrounds and locations. From fantasy realms to modern cities, create the perfect setting.",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Local SQLite Storage",
      description:
        "All your work is stored securely on your device with SQLite database. No cloud dependency, complete privacy.",
    },
    {
      icon: <Key className="w-8 h-8" />,
      title: "Gemini API Integration",
      description:
        "Powered by Google's Gemini AI. Simply provide your API key and unlock unlimited creative possibilities.",
    },
  ];

  const stats: Stats[] = [
    { value: "50K+", label: "Manga Panels Created", color: "text-purple-400" },
    { value: "15K+", label: "Active Creators", color: "text-pink-400" },
    { value: "500+", label: "Completed Stories", color: "text-blue-400" },
    { value: "4.9/5", label: "Creator Rating", color: "text-green-400" },
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Yuki Tanaka",
      role: "Indie Manga Creator",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      content:
        "MangaAI completely transformed my workflow. I can now create full chapters in days instead of months. The character consistency is incredible!",
      rating: 5,
    },
    {
      name: "Sofia Rodriguez",
      role: "Webtoon Artist",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b1e5?w=100&h=100&fit=crop&crop=face",
      content:
        "The chat-based interface is genius! I just describe my scenes and the AI creates exactly what I envision. It's like having a whole art team.",
      rating: 5,
    },
    {
      name: "Alex Chen",
      role: "Digital Storyteller",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      content:
        "Finally, a tool that understands storytelling! The panel generation with speech bubbles saves me hours of work. Absolutely game-changing!",
      rating: 5,
    },
  ];

  const pricingPlans: Record<"monthly" | "yearly" | "lifetime", PricingPlan[]> =
    {
      monthly: [
        {
          name: "Free Trial",
          price: "0",
          period: "14 days",
          description: "Perfect for trying out MangaAI's capabilities",
          features: [
            "100 AI generations",
            "5 characters",
            "Basic panel layouts",
            "Community support",
            "Local SQLite storage",
          ],
          cta: "Start Free Trial",
          popular: false,
          paddlePriceId: "pri_01k65kfvna4cjae8a62n1gh7g3",
        },
        {
          name: "Creator",
          price: "29",
          period: "month",
          description: "For serious manga creators and storytellers",
          features: [
            "Unlimited AI generations",
            "Unlimited characters",
            "Advanced panel layouts",
            "Custom speech bubbles",
            "Chapter management",
            "Priority support",
            "Commercial license",
          ],
          cta: "Get Creator",
          popular: true,
          paddlePriceId: "pri_01k65kfvna4cjae8a62n1gh7g3", // Replace with actual Paddle price ID
        },
        {
          name: "Studio",
          price: "79",
          period: "month",
          description: "For teams and professional studios",
          features: [
            "Everything in Creator",
            "Team collaboration",
            "Advanced story tools",
            "Bulk operations",
            "Custom integrations",
            "Dedicated support",
            "White-label options",
          ],
          cta: "Get Studio",
          popular: false,
          paddlePriceId: "pri_01k65kfvna4cjae8a62n1gh7g3", // Replace with actual Paddle price ID
        },
      ],
      yearly: [
        {
          name: "Free Trial",
          price: "0",
          period: "14 days",
          description: "Perfect for trying out MangaAI's capabilities",
          features: [
            "100 AI generations",
            "5 characters",
            "Basic panel layouts",
            "Community support",
            "Local SQLite storage",
          ],
          cta: "Start Free Trial",
          popular: false,
          paddlePriceId: "pri_01k65kfvna4cjae8a62n1gh7g3",
        },
        {
          name: "Creator",
          price: "290",
          period: "year",
          originalPrice: "348",
          description: "For serious manga creators and storytellers",
          features: [
            "Unlimited AI generations",
            "Unlimited characters",
            "Advanced panel layouts",
            "Custom speech bubbles",
            "Chapter management",
            "Priority support",
            "Commercial license",
          ],
          cta: "Get Creator",
          popular: true,
          paddlePriceId: "pri_01k65kfvna4cjae8a62n1gh7g3", // Replace with actual Paddle price ID
        },
        {
          name: "Studio",
          price: "790",
          period: "year",
          originalPrice: "948",
          description: "For teams and professional studios",
          features: [
            "Everything in Creator",
            "Team collaboration",
            "Advanced story tools",
            "Bulk operations",
            "Custom integrations",
            "Dedicated support",
            "White-label options",
          ],
          cta: "Get Studio",
          popular: false,
          paddlePriceId: "pri_01k65kfvna4cjae8a62n1gh7g3", // Replace with actual Paddle price ID
        },
      ],
      lifetime: [
        {
          name: "Creator Lifetime",
          price: "499",
          period: "once",
          description: "One-time payment, lifetime access to Creator features",
          features: [
            "Unlimited AI generations",
            "Unlimited characters",
            "Advanced panel layouts",
            "Custom speech bubbles",
            "Chapter management",
            "Lifetime updates",
            "Priority support",
            "Commercial license",
          ],
          cta: "Get Lifetime Access",
          popular: true,
          paddlePriceId: "pri_01k65kfvna4cjae8a62n1gh7g3", // Replace with actual Paddle price ID
        },
      ],
    };

  const downloadLinks = {
    windows:
      "https://github.com/yourusername/manga-ai-releases/releases/latest/download/MangaAI-Setup.exe",
    mac: "https://github.com/yourusername/manga-ai-releases/releases/latest/download/MangaAI.dmg",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
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
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  MangaAI
                </span>
                <div className="text-xs text-gray-400">Desktop Edition</div>
              </div>
            </div>

            <div className="hidden md:flex space-x-8">
              <a
                href="#features"
                className="hover:text-purple-400 transition-all duration-300 flex items-center space-x-1"
              >
                <span>Features</span>
              </a>
              <a
                href="#pricing"
                className="hover:text-purple-400 transition-all duration-300 flex items-center space-x-1"
              >
                <span>Pricing</span>
              </a>
              <a
                href="#testimonials"
                className="hover:text-purple-400 transition-all duration-300 flex items-center space-x-1"
              >
                <span>Reviews</span>
              </a>
              <a
                href="#download"
                className="hover:text-purple-400 transition-all duration-300 flex items-center space-x-1"
              >
                <span>Download</span>
              </a>
              <a
                href="https://facebook.com/mangaaiapp"
                className="hover:text-blue-400 transition-all duration-300 flex items-center space-x-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-4 h-4" />
                <span>Contact</span>
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download</span>
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
                <Bot className="w-4 h-4 mr-2" />
                AI-Powered Manga Creation Studio
                <ChevronRight className="w-4 h-4 ml-2" />
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-none">
              <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent block">
                Create Epic
              </span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent block">
                Manga Stories
              </span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent block text-5xl md:text-6xl lg:text-7xl">
                with AI Chat
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              The first desktop app that lets you create complete manga stories
              through conversation. Design characters, build scenes, generate
              panels with speech bubbles - all powered by AI.
            </p>

            <div className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-16">
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={downloadLinks.windows}
                  className="group bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
                >
                  <Monitor className="w-6 h-6" />
                  <span>Windows (.exe)</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href={downloadLinks.mac}
                  className="group bg-gradient-to-r from-slate-600 to-slate-700 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-slate-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
                >
                  <Apple className="w-6 h-6" />
                  <span>macOS (.dmg)</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <button className="group border-2 border-white/20 hover:border-purple-400 px-8 py-4 rounded-2xl font-bold text-lg backdrop-blur-sm hover:bg-white/5 transition-all duration-300 flex items-center space-x-2">
                <Play className="w-6 h-6" />
                <span>Watch Demo</span>
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
              Everything You Need
              <span className="block text-4xl md:text-5xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                to Create Manga
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From story conception to final webtoon panels, MangaAI handles
              every aspect of manga creation
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
                <h3 className="text-xl font-bold">100% Private</h3>
                <p className="text-gray-300">
                  Your stories stay on your device with local SQLite storage
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Lightning Fast</h3>
                <p className="text-gray-300">
                  Generate complete panels with dialogue in seconds
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Your API Key</h3>
                <p className="text-gray-300">
                  Use your own Gemini API key - full control and transparency
                </p>
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
              Simple Pricing
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Start free, upgrade when you're ready to unlock unlimited
              creativity
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
                    <span className="capitalize">{tab}</span>
                    {tab === "yearly" && (
                      <span className="ml-2 bg-green-500 text-white px-2 py-1 rounded-lg text-xs">
                        Save 20%
                      </span>
                    )}
                    {tab === "lifetime" && (
                      <span className="ml-2 bg-yellow-500 text-black px-2 py-1 rounded-lg text-xs">
                        Best Deal
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
                      Most Popular
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
                  {isLoading ? "Loading..." : plan.cta}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400 flex items-center justify-center space-x-4 flex-wrap">
              <span className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>30-day money-back guarantee</span>
              </span>
              <span>•</span>
              <span>Cancel anytime</span>
              <span>•</span>
              <span>No hidden fees</span>
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
              Loved by Creators
            </h2>
            <p className="text-xl text-gray-300">
              Join thousands of manga artists who are revolutionizing their
              creative process
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

                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-white/20"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-slate-900"></div>
                  </div>
                  <div>
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
                  Available Now
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Download MangaAI Desktop
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Get the latest version with automatic updates. Available for
                Windows and macOS.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
              <a
                href={downloadLinks.windows}
                className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 px-8 py-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 flex items-center justify-center space-x-3"
              >
                <Monitor className="w-8 h-8" />
                <div className="text-left">
                  <div>Download for Windows</div>
                  <div className="text-sm opacity-75">MangaAI-Setup.exe</div>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={downloadLinks.mac}
                className="group bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 px-8 py-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-slate-500/25 flex items-center justify-center space-x-3"
              >
                <Apple className="w-8 h-8" />
                <div className="text-left">
                  <div>Download for macOS</div>
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
                    "YouTube tutorials coming soon! Follow us on Facebook for updates."
                  );
                }}
              >
                <Youtube className="w-5 h-5" />
                <span>Tutorials (Coming Soon)</span>
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-gray-400">
              <div className="flex items-center justify-center space-x-2">
                <Database className="w-4 h-4 text-purple-400" />
                <span>SQLite Storage</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Key className="w-4 h-4 text-pink-400" />
                <span>Gemini API</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>100% Private</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Real-time AI</span>
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
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Create professional manga in three simple steps
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
              <h3 className="text-2xl font-bold mb-4">Chat & Describe</h3>
              <p className="text-gray-300 leading-relaxed">
                Simply chat with the AI to describe your characters, scenes, and
                story. No complex interfaces - just natural conversation.
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
              <h3 className="text-2xl font-bold mb-4">AI Generates</h3>
              <p className="text-gray-300 leading-relaxed">
                Watch as the AI creates your characters, designs scenes, and
                builds complete manga panels with professional speech bubbles.
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
              <h3 className="text-2xl font-bold mb-4">Export & Share</h3>
              <p className="text-gray-300 leading-relaxed">
                Export your completed manga as high-resolution webtoon panels
                ready for publishing on any platform.
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
              Ready to Create Your Manga Masterpiece?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who are already building amazing
              stories with MangaAI's revolutionary chat-based interface.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href={downloadLinks.windows}
                className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3"
              >
                <Download className="w-6 h-6" />
                <span>Download Free Trial</span>
              </a>

              <a
                href="#pricing"
                className="border-2 border-white/20 hover:border-purple-400 px-8 py-4 rounded-2xl font-bold text-lg backdrop-blur-sm hover:bg-white/5 transition-all duration-300"
              >
                View Pricing Plans
              </a>
            </div>

            <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
              <span className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>Free 14-day trial</span>
              </span>
              <span className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>No credit card required</span>
              </span>
              <span className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>Cancel anytime</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    MangaAI
                  </span>
                  <div className="text-xs text-gray-400">Desktop Edition</div>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                The first AI-powered desktop application for creating complete
                manga stories through natural conversation. Transform your ideas
                into professional webtoon panels instantly.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#features"
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#download"
                    className="hover:text-white transition-colors"
                  >
                    Download
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <span className="opacity-50 cursor-not-allowed">
                    Documentation (Coming Soon)
                  </span>
                </li>
                <li>
                  <span className="opacity-50 cursor-not-allowed">
                    Tutorials (Coming Soon)
                  </span>
                </li>
                <li>
                  <span className="opacity-50 cursor-not-allowed">
                    Community (Coming Soon)
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
                    <span>Contact Us</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
            <div className="flex space-x-8 text-gray-400 mb-4 md:mb-0">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                License
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <a
                href="https://facebook.com/mangaaiapp"
                className="p-2 hover:bg-blue-600/20 rounded-lg transition-all duration-300 group"
                target="_blank"
                rel="noopener noreferrer"
                title="Contact us on Facebook"
              >
                <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-400 transition-colors group-hover:scale-110" />
              </a>
              <span className="text-gray-400">|</span>
              <span className="text-gray-400">
                © 2024 MangaAI. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Extend Window interface for Paddle
declare global {
  interface Window {
    Paddle?: Paddle;
  }
}

export default LandingPage;
