"use client";
import { useState, useRef } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import Image from "next/image";

interface PersonalizedLetterProps {
  guestName: string;
  guestDelivery: Date | string | null;
}

const PersonalizedLetter = ({
  guestName,
  guestDelivery,
}: PersonalizedLetterProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);
  const deliveryDate = guestDelivery ? new Date(guestDelivery) : null;

  const formattedDate =
    deliveryDate && !isNaN(deliveryDate.getTime())
      ? deliveryDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "No date provided";

  const downloadPDF = async () => {
    if (!letterRef.current) return;
    setIsDownloading(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const opt = {
        margin: 0.5,
        filename: `Thank_You_Letter_${guestName.replace(/\s+/g, "_")}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
        },
        jsPDF: {
          unit: "in",
          format: "letter",
          orientation: "portrait" as const,
        },
      } as const;
      await html2pdf().set(opt).from(letterRef.current).save();
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  // Using inline styles with hex colors to avoid html2canvas "lab" color parsing error
  // html2canvas doesn't support modern CSS color functions (lab, oklch, lch) used by Tailwind v4
  const styles = {
    letterPaper: {
      background:
        "linear-gradient(145deg, #fffbf5 0%, #fff9f0 50%, #fffdf8 100%)",
      borderRadius: "1rem",
      padding: "2.5rem",
      color: "#1e293b",
      maxWidth: "42rem",
      margin: "0 auto",
    },
    letterhead: {
      textAlign: "center" as const,
      borderBottom: "2px solid #e2e8f0",
      paddingBottom: "1.5rem",
      marginBottom: "2rem",
    },
    logo: {
      width: "4rem",
      height: "4rem",
      margin: "0 auto 1rem",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #e879f9 0%, #9333ea 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    companyName: {
      fontSize: "1.5rem",
      fontFamily: "Georgia, 'Times New Roman', serif",
      fontWeight: "bold",
      color: "#334155",
    },
    tagline: {
      fontSize: "0.75rem",
      textTransform: "uppercase" as const,
      letterSpacing: "0.3em",
      color: "#94a3b8",
      marginTop: "0.25rem",
    },
    letterBody: {
      color: "#334155",
      lineHeight: 1.75,
    },
    date: {
      fontSize: "0.875rem",
      color: "#94a3b8",
      marginBottom: "1.5rem",
    },
    greeting: {
      fontSize: "1.5rem",
      fontFamily: "Georgia, 'Times New Roman', serif",
      marginBottom: "1.5rem",
    },
    guestName: {
      color: "#c026d3",
      fontWeight: 600,
    },
    paragraph: {
      marginBottom: "2.5rem",
    },
    quoteBox: {
      background: "linear-gradient(90deg, #fdf4ff 0%, #faf5ff 100%)",
      borderRadius: "0.75rem",
      padding: "1.25rem",
      borderLeft: "4px solid #d946ef",
      marginBottom: "1.5rem",
    },
    quoteText: {
      fontStyle: "italic",
      color: "#475569",
    },
    signatureSection: {
      paddingTop: "1.5rem",
      borderTop: "1px solid #e2e8f0",
    },
    regards: {
      color: "#475569",
    },
    signatureName: {
      fontFamily: "Georgia, 'Times New Roman', serif",
      fontSize: "1.25rem",
      color: "#334155",
      fontStyle: "italic",
      marginTop: "1rem",
    },
    signatureSubtitle: {
      fontSize: "0.75rem",
      color: "#94a3b8",
      marginTop: "0.25rem",
    },
    decorativeFooter: {
      marginTop: "2rem",
      paddingTop: "1.5rem",
      borderTop: "1px solid #e2e8f0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    dots: {
      display: "flex",
      gap: "0.5rem",
    },
    dot: {
      width: "0.5rem",
      height: "0.5rem",
      borderRadius: "50%",
    },
    certificateText: {
      fontSize: "0.75rem",
      color: "#94a3b8",
    },
    downloadButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.75rem",
      padding: "1rem 2rem",
      borderRadius: "1rem",
      background: "linear-gradient(90deg, #10b981 0%, #0d9488 100%)",
      color: "white",
      fontWeight: 600,
      fontSize: "1rem",
      border: "none",
      cursor: "pointer",
      boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.4)",
      transition: "all 0.2s ease",
    },
  };

  return (
    <div>
      {/* PDF Content - Using inline styles with hex colors for html2canvas compatibility */}
      <div ref={letterRef} style={styles.letterPaper}>
        {/* Letterhead */}
        <div style={styles.letterhead}>
          <div style={styles.logo}>
              <Image
                alt='logo'
                src='/z-logo.jpg'
                width={50}
                height={50}
                className="h-7 w-7 rounded-full text-[#cca666] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
              />
          </div>
          <h2 style={styles.companyName}>Zylumine</h2>
          <p style={styles.tagline}>Crafted with Excellence</p>
        </div>

        {/* Letter Body */}
        <div style={styles.letterBody}>
          <p style={styles.date}>{formattedDate}</p>

          <h3 style={styles.greeting}>
            Dear <span style={styles.guestName}>{guestName}</span>,
          </h3>

          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            style={styles.paragraph}
          >
            You didn’t just pick this piece, it found you. Long before this
            moment, intention was already at work. Nothing about you is
            accidental, not your story, not your timing, not even your becoming.
          </motion.p>

          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            style={styles.paragraph}
          >
            This piece was created with intention, just like you were. Not
            rushed, but chosen. Wherever life finds you right now, whether you
            feel full of confidence or facing life’s challenges, you are seen,
            with love from the very beginning, and without condition.
          </motion.p>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.3 }}
            style={styles.quoteBox}
          >
            <p style={styles.quoteText}>
              &quot;There is light around you, and starting today, it will feel
              clearer and closer to you. There is purpose woven into you, and
              you will walk your path with clarity. And there is peace available
              to you, and your seasons are guided with certainty.&quot;
            </p>
          </motion.div>

          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.4 }}
            style={styles.paragraph}
          >
            May this piece rest on you as a reminder: there is a light that
            knows your name, a peace that doesn’t rush you, a purpose unfolding
            gently, step by step, and you are allowed to become who you were
            always meant to be.
          </motion.p>

          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.5 }}
            style={styles.paragraph}
          >
            Let it sit on your body like reassurance. Let it speak to your heart
            on days words feel heavy. Thank you for choosing something made with
            care, depth, and meaning.
          </motion.p>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.6 }}
            style={styles.signatureSection}
          >
            <p style={styles.regards}>
              Thank you for choosing Zylumine. Wear this knowing that light
              recognizes light, and you were never created to live without it.
              With warmest regards and heartfelt gratitude,
            </p>
            <p style={styles.signatureName}>The Zylumine Team</p>
            <p style={styles.signatureSubtitle}>
              Creating Excellence, One Product at a Time
            </p>
          </motion.div>
        </div>

        {/* Decorative Footer */}
        <div style={styles.decorativeFooter}>
          <div style={styles.dots}>
            <div style={{ ...styles.dot, background: "#e879f9" }}></div>
            <div style={{ ...styles.dot, background: "#a855f7" }}></div>
            <div style={{ ...styles.dot, background: "#6366f1" }}></div>
          </div>
          {/* <p style={styles.certificateText}>Certificate of Authenticity</p> */}
        </div>
      </div>

      {/* Download Button - Can use Tailwind here since it's not rendered to PDF */}
      <div className="text-center mt-6">
        <button
          onClick={downloadPDF}
          disabled={isDownloading}
          style={styles.downloadButton}
          className="hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isDownloading ? (
            <>
              <div className="w-5 h-5 border-2 border-transparent border-t-white rounded-full animate-spin" />
              <span>Generating PDF...</span>
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
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Download Letter as PDF</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PersonalizedLetter;
