import * as motion from "motion/react-client"
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import SignIn from '@/components/sign-in'


export default async function LoginPage() {
  const session = await auth()
  
  if (session) {
    redirect("/")
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-7 md:py-12">
      {/* Animated Background Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.25),transparent_40%)]" />
      
      {/* Floating Orbs */}
      <motion.div
        className="pointer-events-none absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-linear-to-r from-fuchsia-500/20 to-purple-500/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="pointer-events-none absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-linear-to-r from-cyan-500/20 to-blue-500/20 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
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
