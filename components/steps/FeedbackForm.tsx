"use client";
import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const qualityOptions = ["Poor", "Fair", "Good", "Great", "Excellent"];

const FeedbackForm = ({ guestName }: { guestName: string }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [quality, setQuality] = useState("");
  const [recommend, setRecommend] = useState("");
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!rating || !quality || !recommend) {
      toast.error("Missing required fields");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: guestName,
          rating,
          quality,
          recommend,
          comments,
          submittedAt: new Date().toISOString(),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      console.log("Feedback sent successfully:", data);
      setIsSubmitted(true);
      toast.success("Feedback submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      if (error instanceof TypeError) {
        toast.error("Network error. Please check your connection.");
      } else if (error instanceof Error) {
        toast.error(`Failed to submit: ${error.message}`);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-br from-emerald-400 to-green-500 mb-6"
        >
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>
        <h3 className="text-2xl font-serif font-bold text-white mb-2">
          Thank You!
        </h3>
        <p className="text-slate-400 max-w-2xl text-center w-full mx-auto">
          Your feedback has been submitted successfully. We truly appreciate
          your time and honest thoughts.
        </p>
      </div>
    );
  }
  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-violet-400 to-purple-600 mb-4"
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
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </motion.div>
        <h2 className="text-3xl font-serif font-bold gradient-text mb-2">
          Share Your Experience
        </h2>
        <p className="text-slate-400">
          Your feedback helps us improve and serve you better
        </p>
      </div>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
        {/* Star Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6"
        >
          <label className="block text-sm font-semibold text-white mb-4">
            Overall Experience
          </label>
          <div className="flex gap-2 text-4xl">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className={`transition-colors cursor-pointer ${
                  star <= (hoveredRating || rating)
                    ? "text-yellow-400"
                    : "text-slate-600"
                } hover:text-yellow-400`}
              >
                ★
              </button>
            ))}
          </div>
        </motion.div>
        {/* Product Quality */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6"
        >
          <label className="block text-sm font-semibold text-white mb-4">
            Product Quality
          </label>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            {qualityOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setQuality(option)}
                className={`py-2 px-3 rounded-xl border text-xs transition-all cursor-pointer ${
                  quality === option
                    ? "border-fuchsia-400 text-fuchsia-400 bg-fuchsia-400/20"
                    : "border-white/10 text-slate-400 bg-white/5 hover:border-fuchsia-400 hover:text-fuchsia-400"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </motion.div>
        {/* Would Recommend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6"
        >
          <label className="block text-sm font-semibold text-white mb-4">
            Would you recommend us?
          </label>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => setRecommend("yes")}
              className={`flex-1 py-3 rounded-xl border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                recommend === "yes"
                  ? "border-emerald-400 text-emerald-400 bg-emerald-400/20"
                  : "border-white/10 text-slate-400 bg-white/5 hover:border-emerald-400 hover:text-emerald-400"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
              Yes, definitely!
            </button>
            <button
              type="button"
              onClick={() => setRecommend("no")}
              className={`flex-1 py-3 rounded-xl border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                recommend === "no"
                  ? "border-rose-400 text-rose-400 bg-rose-400/20"
                  : "border-white/10 text-slate-400 bg-white/5 hover:border-rose-400 hover:text-rose-400"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                />
              </svg>
              Not really
            </button>
          </div>
        </motion.div>
        {/* Comments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6"
        >
          <label className="block text-sm font-semibold text-white mb-4">
            Tell us more (optional)
          </label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={4}
            placeholder="Share your thoughts, suggestions, or anything else you'd like us to know..."
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/20 transition-all resize-none outline-none"
          />
        </motion.div>
        {/* Submit Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-2xl bg-linear-to-r from-violet-500 to-purple-600 text-white font-semibold text-sm uppercase tracking-wider hover:from-violet-600 hover:to-purple-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <div className="loader w-5 h-5"></div>
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Submit Feedback
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
};
export default FeedbackForm;
