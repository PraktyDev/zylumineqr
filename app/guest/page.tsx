"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { Loader } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import PersonalizedLetter from "@/components/steps/PersonalizedLetter";
import AfterPurchaseCare from "@/components/steps/AfterPurchaseCare";
import FeedbackForm from "@/components/steps/FeedbackForm";

const formSchema = z.object({
  email: z.email("Enter a valid email address."),
  code: z
    .string()
    .min(6, "Code must be 6 characters.")
    .max(6, "Code must be 6 characters."),
});

const page = () => {
  const [clientHint, setClientHint] = useState(
    "Once verified, an artfully animated letter and care guide will appear."
  );
  const [showLetter, setShowLetter] = useState(false);
  const [guestInfo, setGuestInfo] = useState({
    name: "",
    delivery: ""
  });
  const [currentStep, setCurrentStep] = useState(null as number | null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      code: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("/api/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email.trim().toLowerCase(),
          code: data.code.trim(),
        }),
      });

      if (!res.ok) {
        toast.error("Invalid code or email. Please try again.");
        setClientHint("Please check your code and email, then try again.");
        return;
      }

      const { name, createdAt } = await res.json();
      setGuestInfo({
        name,
        delivery: createdAt
      });

      // Do something with the form values.
      toast.success("Code verified!");
      setShowLetter(true);
      form.reset();
    } catch (error) {
      toast.error("Failed to verify code. Please try again.");
      console.error("Error verifying code:", error);
    }
  }

    const formatDate = (date: string | null) => {
      if (!date) return "";
      const options: Intl.DateTimeFormatOptions = {
        month: "long",
        day: "numeric",
        year: "numeric",
      };
      return new Date(date).toLocaleDateString(undefined, options);
    };

  return (
    <div className="max-w-lg mx-4 md:mx-auto h-screen flex items-center justify-center">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
      </div>
      <div>
        {/* Client Section */}
        <Card className="">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mb-2">
                  Client Journey
                </p>
                <CardTitle className="text-2xl md:text-3xl font-bold gradient-text">
                  Scan & Verify
                </CardTitle>
                <CardDescription className="text-slate-400 text-sm mt-2">
                  Enter the mailed code to unlock your care guide.
                </CardDescription>
              </div>
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center animate-pulse-glow">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Code Input & Verify */}
            <form
              id="purchase-form"
              className="space-y-3"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FieldGroup className="gap-3 mb-5">
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <Input
                        {...field}
                        id="email"
                        aria-invalid={fieldState.invalid}
                        placeholder="Email"
                        // className="w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/20 transition-all"
                        className="w-full rounded-2xl border border-white/20 bg-white/5 px-5 py-4 text-sm text-white placeholder:text-slate-400 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/20 transition-all outline-none"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="code"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <Input
                        {...field}
                        id="code"
                        aria-invalid={fieldState.invalid}
                        placeholder="******"
                        // className="w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/20 transition-all"
                        className="w-full rounded-2xl border border-white/20 bg-white/5 px-5 py-4 text-sm text-white placeholder:text-slate-400 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/20 transition-all tracking-[0.5em] text-center outline-none"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              <Button
                type="submit"
                className="w-full py-4 rounded-2xl bg-linear-to-r from-fuchsia-500 to-purple-600 text-white font-semibold text-sm uppercase tracking-wider hover:from-fuchsia-600 hover:to-purple-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {/* <motion.div
                      className="h-4 w-4 rounded-full border-2 border-white border-t-white"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    /> */}
                    <Loader size={15} />
                    <span>Verifying...</span>
                  </motion.div>
                ) : (
                  "Verify & Open Letter"
                )}
              </Button>
            </form>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mt-4 text-center">
              {clientHint}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Letter Modal */}
      <AnimatePresence>
        {showLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // className="fixed inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
            onClick={() => setShowLetter(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              // className="max-w-3xl rounded-3xl border border-white/10 bg-linear-to-br from-slate-900/90 to-slate-800/90 p-3 mb:p-6 shadow-2xl backdrop-blur-md"
              className="modal-content w-full max-w-4xl glass-card rounded-3xl p-4 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Letter Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                    Personalized Letter
                  </p>
                  <h3 className="text-2xl font-semibold">
                    Dear <span className="text-fuchsia-300">{guestInfo.name}</span>,
                  </h3>
                </div>
                <button
                  onClick={() => setShowLetter(false)}
                  className="text-3xl text-slate-300 transition hover:text-white"
                >
                  ×
                </button>
              </div>
              {/* Letter Content */}
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-200">
                <p>
                  We are delighted to welcome you into our curated experience.
                  This letter confirms your purchase and invites you to embrace
                  the next steps with joy.
                </p>
                <p>Expect the following:</p>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs uppercase tracking-[0.35em] text-slate-300">
                  Code Delivered • {formatDate(guestInfo.delivery)}
                </div>
                <p className="border-l-2 border-fuchsia-400 pl-4 text-sm text-slate-100">
                  Your purchase code unlocks a tailored guide that honors
                  attention to detail, craftsmanship, and aftercare.
                </p>
              </div>
              {/* Care Guide Steps */}
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  {
                    step: "1",
                    title: "Unbox with intention",
                    desc: "Capture the moment.",
                  },
                  {
                    step: "2",
                    title: "Calibrate with care",
                    desc: "Follow ritual instructions.",
                  },
                  {
                    step: "3",
                    title: "Share feedback",
                    desc: "Keep us inspired.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    onClick={()=>{setCurrentStep(Number(item.step))}}
                    className={`animate-float-step cursor-pointer rounded-2xl bg-white/5 p-4 text-sm ${currentStep === Number(item.step) ? "ring-fuchsia-500 ring" : "border-white/10 border"} `}
                  >
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                      Step {item.step}
                    </p>
                    <p className="mt-2 font-semibold text-white">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6">
                {currentStep === 1 && (
                  <PersonalizedLetter guestName={guestInfo.name} guestDelivery={guestInfo.delivery ? new Date(guestInfo.delivery) : null} />
                )}
                {currentStep === 2 && <AfterPurchaseCare />}
                {currentStep === 3 && <FeedbackForm guestName={guestInfo.name} />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default page;
