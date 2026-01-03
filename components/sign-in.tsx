"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { signIn } from "next-auth/react";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const formSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

const SignIn = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const res = await signIn("credentials", {
      email: data.email.trim().toLowerCase(),
      password: data.password,
      redirect: false,
    });

    if (res?.error !== undefined) {
      toast.error("Invalid Login Credentials");
      return;
    }

    if (res?.ok) {
      toast.success("Login successful!");
      form.reset();
      router.push("/");
    }
  }

  return (
    <Card className="border border-white/10 bg-[#0C0F25]/80 backdrop-blur-xl shadow-2xl shadow-black/40">
      <CardHeader className="space-y-3 text-center">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full 
                     bg-linear-to-br from-[#EFDFAB] to-[#EFDFAB]/70 
                     shadow-lg shadow-[#EFDFAB]/30"
        >
          <Image
            alt="logo"
            src="/zlogo.jpg"
            width={100}
            height={100}
            className="h-14 w-14 rounded-full"
          />
        </motion.div>

        <div>
          <p className="text-xs uppercase tracking-[0.5em] text-[#EFDFAB]/70">
            Zylumine
          </p>
          <CardTitle className="mt-2 text-3xl text-white">
            Welcome Back
          </CardTitle>
          <CardDescription className="mt-2 text-slate-400">
            Sign in to access your Zylumine dashboard
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Form */}
        <form
          className="space-y-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup className="gap-3">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    placeholder="Email"
                    className="rounded-2xl border border-white/15 
                               bg-white/5 px-4 py-3 text-sm text-white
                               placeholder:text-slate-500
                               focus:border-[#EFDFAB]
                               focus:ring-2 focus:ring-[#EFDFAB]/20"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    type="password"
                    placeholder="********"
                    className="rounded-2xl border border-white/15 
                               bg-white/5 px-4 py-3 text-sm text-white
                               placeholder:text-slate-500
                               focus:border-[#EFDFAB]
                               focus:ring-2 focus:ring-[#EFDFAB]/20"
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
            className="w-full rounded-2xl 
                       bg-[#EFDFAB] text-[#0C0F25]
                       hover:bg-[#EFDFAB]/90
                       shadow-lg shadow-[#EFDFAB]/25"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <motion.div className="flex items-center gap-2">
                <Loader size={15} />
                <span>Signing in...</span>
              </motion.div>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#0C0F25] px-3 text-slate-500 tracking-[0.3em]">
              Or
            </span>
          </div>
        </div>

        {/* Google Button */}
        <Button
          type="button"
          variant="outline"
          disabled
          className="w-full border-white/15 bg-white/5 text-slate-300 hover:bg-white/10"
        >
          Sign in with Google
        </Button>
      </CardContent>
    </Card>
  );
};

export default SignIn;
