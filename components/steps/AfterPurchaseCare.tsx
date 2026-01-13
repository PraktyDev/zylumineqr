"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
interface CareStep {
  icon?: ReactNode;
  title: string;
  description: ReactNode;
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
    title: "1. Less Washing, More Preservation",
    description: (
      <p>
        Luxury garments are not meant to be washed after every wear.
        <br />
        Over-washing weakens fibers and dulls color.
        <br />
        Our recommendation:
        <br />
        Allow your garment to breathe after wear. Spot-clean when needed and
        wash only when truly necessary. This preserves both texture and tone.
      </p>
    ),
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
    title: "2. Always Turn the Garment Inside Out",
    description: (
      <p>
        Before washing, turn your piece inside out.
        <br />
        This discreet practice protects the surface, minimizes friction, and
        preserves detailing.
        <br />
        It is a quiet habit used in luxury fashion care.
      </p>
    ),
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
    title: "3.Cold Water Is a Form of Respect",
    description: (
      <p>
        Heat is harsh on fabric.
        <br />
        Cold water maintains color depth, prevents shrinkage, and protects
        structure across all materials.
        <br />
        When in doubt, choose cold.
      </p>
    ),
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    icon: (
      <svg
        className="w-7 h-7 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    title: "4. Space Is Essential",
    description: (
      <p>
        Garments require room to move freely.
        <br />
        Overcrowding a washing machine causes unnecessary stress on seams and
        silhouettes.
        <br />
        Wash fewer pieces at a time to maintain form.
      </p>
    ),
    gradient: "from-pink-400 to-rose-500",
    animate: true,
  },
  {
    icon: (
      <svg
        className="w-7 h-7 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    title: "5. Dry With Care, Not Force",
    description: (
      <p>
        Excessive sunlight fades color over time.
        <br />
        For best results:
        <br />
        Dry in shade or indirect light.
        <br />
        Avoid hanging heavy garments by the shoulders to prevent distortion.
      </p>
    ),
    gradient: "from-pink-400 to-rose-500",
    animate: true,
  },
  {
    icon: (
      <svg
        className="w-7 h-7 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    title: "6. Steam Over Iron",
    description: (
      <p>
        Steaming refreshes fabric, releases wrinkles gently, and restores
        natural drape.
        <br />
        If ironing is required, use moderate heat and a protective cloth.
        <br />
        Luxury lies in gentleness.
      </p>
    ),
    gradient: "from-pink-400 to-rose-500",
    animate: true,
  },
  {
    icon: (
      <svg
        className="w-7 h-7 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    title: "7. Allow the Garment to Rest",
    description: (
      <p>
        After wear, allow your piece at least 24 hours before re-wearing.
        <br />
        This enables the fabric to recover its natural structure and shape.
        <br />
        This practice extends the life of your wardrobe a detail often
        overlooked.
      </p>
    ),
    gradient: "from-pink-400 to-rose-500",
    animate: true,
  },
  {
    icon: (
      <svg
        className="w-7 h-7 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    title: "8. Store With Intention",
    description: (
      <p>
        Fold heavier pieces.
        <br />
        Hang structured garments properly.
        <br />
        Avoid thin wire hangers, as they distort shape over time.
        <br />
        Storage is part of care.
      </p>
    ),
    gradient: "from-pink-400 to-rose-500",
    animate: true,
  },
];
const proTips = [
"True luxury is not only worn it is preserved.",
"How you care for your garment reflects how you honour craftsmanship, detail, and self-expression.",
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
          THE ZYLUMINE CLOTHING CARE GUIDE
        </h2>
        <p className="text-slate-200">A Ritual of Preservation</p>
        <p className="text-slate-400">
          Every Zylumine piece is created with intention, detail, and respect
          for form. To maintain its beauty, structure, and longevity, we invite
          you to treat your garment as a luxury not just an outfit.
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
              {/* <div
                className={`w-14 h-14 rounded-2xl bg-linear-to-br ${
                  step.gradient
                } flex items-center justify-center shrink-0 ${
                  step.animate ? "animate-heart-beat" : ""
                }`}
              >
                {step.icon}
              </div> */}
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
          <h3 className="text-lg font-semibold text-fuchsia-300">THE ZYLUMINE PHILOSOPHY</h3>
        </div>
        <ul className="space-y-3 text-slate-300 text-sm">
          {proTips.map((tip) => (
            <li key={tip} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400"></span>
              {tip}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm">Thank you for choosing Zylumine.</p>
      </motion.div>
    </div>
  );
};
export default AfterPurchaseCare;



