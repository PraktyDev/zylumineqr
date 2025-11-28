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
      form.reset()
      router.push("/");
    }
  }

  const handleGoogleLogin = () => {
    // setIsLoading(true)
    // Simulate Google OAuth
    setTimeout(() => {
      //   setIsLoading(false)
      console.log("Google login initiated");
      // router.push("/");
    }, 1500);
  };

  return (
    <Card className="backdrop-blur-xl">
      <CardHeader className="space-y-3 text-center">
        {/* Logo/Brand */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-fuchsia-500 to-indigo-500 shadow-lg shadow-fuchsia-500/50"
        >
          <div className="h-8 w-8 rounded-full border-2 border-white/80" />
        </motion.div>
        <div>
          <p className="text-xs uppercase tracking-[0.5em] text-pink-300">
            Zylumine
          </p>
          <CardTitle className="mt-2 text-3xl">Welcome Back</CardTitle>
          <CardDescription className="mt-2">
            Sign in to access your Zylumine dashboard
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Email/Password Form */}
        <form
          id="purchase-form"
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
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Email"
                    className="w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/20 transition-all"
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
                    id="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="********"
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
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
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
            <span className="bg-slate-900/50 px-2 text-slate-400 tracking-[0.3em]">
              Or
            </span>
          </div>
        </div>
        {/* Google Sign In */}
        <Button
          type="button"
          variant="outline"
          className="w-full group"
          onClick={handleGoogleLogin}
          disabled={true}
        >
          <svg
            className="mr-3 h-5 w-5 transition-transform group-hover:scale-110"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Sign in with Google
        </Button>
      </CardContent>
    </Card>
  );
};

export default SignIn;
