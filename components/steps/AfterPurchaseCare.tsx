"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
interface CareStep {
  icon: ReactNode;
  title: string;
  description: string;
  gradient: string;
  animate?: boolean;
}
const careSteps: CareStep[] = [
  {
    icon: (
      <svg
        className="w-7 h-7 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
    title: "Unboxing Ritual",
    description:
      "Carefully remove your product from its protective packaging. Take a moment to appreciate the craftsmanship before first use. Document this special moment!",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    icon: (
      <svg
        className="w-7 h-7 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
    title: "Initial Setup",
    description:
      "Follow the included quick-start guide. Ensure all components are present and properly assembled. Register your product for warranty benefits.",
    gradient: "from-emerald-400 to-green-500",
  },
  {
    icon: (
      <svg
        className="w-7 h-7 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    ),
    title: "Regular Maintenance",
    description:
      "Clean with a soft, dry cloth weekly. Avoid harsh chemicals and extreme temperatures. Store in a cool, dry place when not in use.",
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    title: "Handle with Love",
    description:
      "Treat your product with care and it will serve you faithfully. Avoid dropping or applying excessive force. Your mindful handling ensures longevity.",
    gradient: "from-pink-400 to-rose-500",
    animate: true,
  },
];
const proTips = [
  "Keep original packaging for safe storage during travel",
  "Take photos of serial numbers for warranty claims",
  "Join our community for exclusive tips and updates",
];
const AfterPurchaseCare = () => {
  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-cyan-400 to-blue-600 mb-4"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </motion.div>
        <h2 className="text-3xl font-serif font-bold gradient-text mb-2">
          After Purchase Care
        </h2>
        <p className="text-slate-400">
          Follow these steps to ensure your product serves you well for years
        </p>
      </div>
      {/* Care Steps Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {careSteps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="care-card glass-card rounded-2xl p-6"
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-14 h-14 rounded-2xl bg-linear-to-br ${step.gradient} flex items-center justify-center shrink-0 ${
                  step.animate ? "animate-heart-beat" : ""
                }`}
              >
                {step.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Pro Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 glass-card rounded-2xl p-6 border border-fuchsia-500/30"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-fuchsia-500/20 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-fuchsia-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-fuchsia-300">Pro Tips</h3>
        </div>
        <ul className="space-y-3 text-slate-300 text-sm">
          {proTips.map((tip) => (
            <li key={tip} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400"></span>
              {tip}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};
export default AfterPurchaseCare;