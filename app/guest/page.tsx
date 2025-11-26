'use client'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'motion/react'


// Input component (shadcn-style)
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        "w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/20 transition-all",
        className
      )}
      {...props}
    />
  )
}
interface PurchaseData {
  code: string | null
  name: string | null
  email: string | null
  timestamp: Date | null
}


const page = () => {
    const [clientCode, setClientCode] = useState('')
  const [clientHint, setClientHint] = useState('Once verified, an artfully animated letter and care guide will appear.')
  const [showLetter, setShowLetter] = useState(false)
    const [buyerName, setBuyerName] = useState("");
    const [buyerEmail, setBuyerEmail] = useState("");

    const sendConfirmation = () => {
    //   if (!purchaseData.code) {
    //     setStatusMsg("Generate a code first before sending.");
    //     return;
    //   }
    //   if (!buyerName.trim() || !buyerEmail.trim()) {
    //     setStatusMsg("Please enter both name and email.");
    //     return;
    //   }
    //   setPurchaseData({ ...purchaseData, name: buyerName, email: buyerEmail });
    //   setStatusMsg(`Code sent to ${buyerEmail}.`);
    };

  const verifyCode = () => {
    // if (clientCode.trim() === purchaseData.code) {
    //   setClientHint('Welcome! Your personalized letter awaits.')
    //   setShowLetter(true)
    // } else {
    //   setClientHint('That code did not match. Please verify your email.')
    // }
  }

  const formatDate = (date: Date | null) => {
    if (!date) return ''
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' }
    return date.toLocaleDateString(undefined, options)
  }

  return (
    <div className='max-w-lg mx-auto h-screen flex items-center justify-center'>
        <div>
        {/* Client Section */}
          <Card className=''>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Client Journey</p>
                  <CardTitle className="mt-2">Scan & Verify</CardTitle>
                  <CardDescription>Enter the mailed code to unlock your care guide.</CardDescription>
                </div>
                {/* <div className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-300">
                  ZY
                </div> */}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* QR Simulation
              <div className="rounded-2xl border border-dashed border-white/30 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Simulated QR Scan</p>
                <div className="mt-3 flex items-center justify-between text-sm text-slate-300">
                  <span>Purchase Link</span>
                  <span className="text-pink-300">portal/scan</span>
                </div>
                <div className="mt-4 flex h-28 w-full items-center justify-center rounded-2xl bg-white/5">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-slate-400">[ QR CODE ]</p>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500">
                      Scan to enter purchase code
                    </p>
                  </div>
                </div>
              </div> */}
              {/* Code Input & Verify */}
              <div className="space-y-3 pt-3 pb-5">
                <Input
                  type="text"
                  placeholder="Enter purchase code"
                  value={clientCode}
                  onChange={(e) => setClientCode(e.target.value)}
                />
                <Button variant="verify" onClick={verifyCode} className="w-full">
                  Verify & Open Letter
                </Button>
              </div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{clientHint}</p>
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
            className="fixed inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowLetter(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="mx-4 max-w-3xl rounded-3xl border border-white/10 bg-linear-to-br from-slate-900/90 to-slate-800/90 p-6 shadow-2xl backdrop-blur-md"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Letter Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Personalized Letter</p>
                  <h3 className="text-2xl font-semibold">
                    Dear <span className="text-fuchsia-300">{'Guest'}</span>,
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
                  We are delighted to welcome you into our curated experience. This letter confirms your purchase
                  and invites you to embrace the next steps with joy.
                </p>
                <p>Expect the following:</p>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs uppercase tracking-[0.35em] text-slate-300">
                  Code Verified • 
                  {/* {formatDate(purchaseData.timestamp)} */}
                </div>
                <p className="border-l-2 border-fuchsia-400 pl-4 text-sm text-slate-100">
                  Your purchase code unlocks a tailored guide that honors attention to detail, craftsmanship, and
                  aftercare.
                </p>
              </div>
              {/* Care Guide Steps */}
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  { step: '1', title: 'Unbox with intention', desc: 'Capture the moment.' },
                  { step: '2', title: 'Calibrate with care', desc: 'Follow ritual instructions.' },
                  { step: '3', title: 'Share feedback', desc: 'Keep us inspired.' },
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="animate-float-step rounded-2xl border border-white/10 bg-white/5 p-4 text-sm"
                  >
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Step {item.step}</p>
                    <p className="mt-2 font-semibold text-white">{item.title}</p>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default page