"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Loader, RefreshCcw, Send } from "lucide-react";

import { useSession } from "next-auth/react";
import { SignOut } from "@/components/sign-out";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.email("Enter a valid email address."),
});

interface PurchaseData {
  code: string | null;
  name: string | null;
  email: string | null;
  timestamp: Date | null;
}
export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!purchaseData.code) {
      setStatusMsg("Generate a code first before sending.");
      return;
    }
    try {
      await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: data.email,
          subject: "Your Purchase Code from Zylumine",
          message: `
            <p>Dear ${data.name},</p>
            <p>Thank you for your purchase! Your unique purchase code is:</p>
            <h2 style="font-family: monospace; background-color: #f0f0f0; padding: 10px; display: inline-block;">${purchaseData.code}</h2>
            <p>Please keep this code safe as it will be required for future reference.</p>
            <p>Best regards,<br/>Zylumine Team</p>
          `,
        }),
      });

      // Do something with the form values.
      toast.success(data.email + " has been registered!");
    } catch (error) {
      toast.error("Failed to send email. Please try again.");
      console.error("Error sending email:", error);
    }
  }

  const [purchaseData, setPurchaseData] = useState<PurchaseData>({
    code: null,
    name: null,
    email: null,
    timestamp: null,
  });
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  // const [clientCode, setClientCode] = useState('')
  const [statusMsg, setStatusMsg] = useState("Awaiting action");
  // const [clientHint, setClientHint] = useState('Once verified, an artfully animated letter and care guide will appear.')
  // const [showLetter, setShowLetter] = useState(false)
  const generatePurchaseCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const timestamp = new Date();
    setPurchaseData({ ...purchaseData, code, timestamp });
    setStatusMsg("Code is ready. Register the client now.");
  };

  const sendConfirmation = () => {
    if (!purchaseData.code) {
      setStatusMsg("Generate a code first before sending.");
      return;
    }
    if (!buyerName.trim() || !buyerEmail.trim()) {
      setStatusMsg("Please enter both name and email.");
      return;
    }
    setPurchaseData({ ...purchaseData, name: buyerName, email: buyerEmail });
    setStatusMsg(`Code sent to ${buyerEmail}.`);
  };

  // const verifyCode = () => {
  //   if (clientCode.trim() === purchaseData.code) {
  //     setClientHint('Welcome! Your personalized letter awaits.')
  //     setShowLetter(true)
  //   } else {
  //     setClientHint('That code did not match. Please verify your email.')
  //   }
  // }
  // const formatDate = (date: Date | null) => {
  //   if (!date) return ''
  //   const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' }
  //   return date.toLocaleDateString(undefined, options)
  // }

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "unauthenticated") {
    return null;
  }

  if (status === "loading") {
    return <p className="text-white text-xl">Loading...</p>;
  }

  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.25),transparent_40%)]" />
      <div className="absolute right-10 top-5">
        <SignOut />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.5em] text-pink-300">
            Zylumine QRC
          </p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Register a new Purchase
          </h1>
          <p className="mt-3 text-sm text-slate-300 md:text-base">
            Generate, register, and deliver a bespoke post-purchase experience.
          </p>
        </header>

        <div className="max-w-2xl mx-auto">
          {/* Admin Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                    Admin Console
                  </p>
                  <CardTitle className="mt-2">Generate & Register</CardTitle>
                  <CardDescription>
                    Send curated letters directly to your client inboxes.
                  </CardDescription>
                </div>
                <div className="animate-pulse-ring rounded-full border border-white/40 p-2">
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Code Display */}
              <div className="rounded-2xl border border-white/10 bg-linear-to-br from-slate-900/40 to-slate-900/10 p-5">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                  Latest Code
                </p>
                <p className="mt-2 text-4xl font-bold tracking-[0.4em] text-white">
                  {purchaseData.code || "------"}
                </p>
                <div className="mt-4 text-sm text-slate-400">
                  Use this code for purchase validation and registration.
                </div>
              </div>
              {/* Actions */}
              <Button
                variant="default"
                onClick={generatePurchaseCode}
                className="w-full flex items-center justify-center gap-3"
              >
                {purchaseData.code && <RefreshCcw size={18} />}
                <span>
                  {!purchaseData.code ? "Generate Code" : "Regenerate code"}
                </span>
              </Button>

              <form
                id="purchase-form"
                className="space-y-3"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FieldGroup className="gap-3">
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <Input
                          {...field}
                          id="buyer-name"
                          aria-invalid={fieldState.invalid}
                          placeholder="Buyer's Name"
                          className="w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/20 transition-all"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <Input
                          {...field}
                          id="buyer-email"
                          aria-invalid={fieldState.invalid}
                          placeholder="Buyer's Email"
                          className="w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/20 transition-all"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
                <Button
                  variant="submit"
                  className="w-full mt-5 flex items-center justify-center gap-3"
                >
                  {form.formState.isSubmitting ? (
                    <Loader size={15} />
                  ) : (
                    <Send size={15} />
                  )}
                  <span>
                    {form.formState.isSubmitting ? "Sending" : "Send"}{" "}
                    Confirmation Mail
                  </span>
                </Button>
              </form>

              {/* Status */}
              <div className="rounded-2xl bg-white/5 p-4 text-sm text-slate-300">
                <p>
                  <span className="font-semibold text-white">Status:</span>{" "}
                  <span>{statusMsg}</span>
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  When you click send, the purchase code is delivered to the
                  buyer's email with a QR link to scan.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// import { auth } from "@/auth"
// import { redirect } from "next/navigation"

// export default async function DashboardPage() {
//   const session = await auth()

//   if (!session?.user) {
//     redirect("/login")
//   }

//   return (
//     <div>
//       <h1>Welcome, {session.user.name}!</h1>
//       {/* <img src={session.user.image} alt="Profile" /> */}
//       <p>Email: {session.user.email}</p>
//     </div>
//   )
// }
