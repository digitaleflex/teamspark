import { AuthForm } from "@/components/auth-form"
import { Trophy } from "lucide-react"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col items-center justify-center p-4">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-50 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 border-b border-border/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center gap-2 w-fit hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold gradient-text">TeamSpark</span>
          </Link>
        </div>
      </div>

      <div className="relative z-10 flex justify-center items-center w-full">
        <AuthForm mode="signup" />
      </div>
    </main>
  )
}
