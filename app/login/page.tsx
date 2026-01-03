import * as motion from "motion/react-client"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import SignIn from "@/components/sign-in"

export default async function LoginPage() {
  const session = await auth()

  if (session) {
    redirect("/")
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0C0F25] px-6 py-7 md:py-12">
      {/* Animated Background Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,223,171,0.18),transparent_45%)]" />

      {/* Floating Orbs */}
      <motion.div
        className="pointer-events-none absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-linear-to-r from-[#EFDFAB]/20 to-[#EFDFAB]/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="pointer-events-none absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-linear-to-r from-[#EFDFAB]/15 to-transparent blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.25, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full md:max-w-md"
      >
        <SignIn />
      </motion.div>
    </div>
  )
}
