import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Trophy } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Subtle animated background pattern */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-50 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Navigation Header */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Trophy className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              TeamSpark
            </span>
          </div>
          <Link href="/signin">
            <Button variant="outline">Se connecter</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
        {/* Logo and Title */}
        <div className="flex flex-col items-center gap-8">
          {/* Icon */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
            <Trophy className="w-10 h-10 text-primary-foreground" />
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight">
              <span className="gradient-text">TeamSpark</span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
              Gestion d&apos;équipe axée sur l&apos;IA avec prédiction et optimisation de la performance
            </p>
          </div>

          {/* Features highlight */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-sm font-medium text-primary">IA Prédictive</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20">
              <span className="text-sm font-medium text-secondary">Optimisation Temps Réel</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <span className="text-sm font-medium text-accent">Analytics Avancées</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <Link href="/signup">
              <Button className="gap-2 h-12 px-6 text-base font-semibold group">
                Commencer l&apos;aventure
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/signin">
              <Button variant="outline" className="h-12 px-6 text-base font-semibold bg-transparent">
                Se connecter
              </Button>
            </Link>
          </div>
        </div>

        {/* Floating cards preview */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-xl bg-card border border-border/50 backdrop-blur-sm hover:border-primary/50 transition-colors group cursor-pointer">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Performance en Temps Réel</h3>
            <p className="text-sm text-muted-foreground">Suivi instantané des métriques clés de votre équipe</p>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border/50 backdrop-blur-sm hover:border-secondary/50 transition-colors group cursor-pointer">
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
              <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m0 0v2m0-6h2m-2 0H8"
                />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Insights IA Prédictive</h3>
            <p className="text-sm text-muted-foreground">Anticipez les défis avant qu&apos;ils ne surviennent</p>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border/50 backdrop-blur-sm hover:border-accent/50 transition-colors group cursor-pointer">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10h-2m0 0H8m4 0h2m0 0V8m0 4v2m8-11a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Culture Pulse</h3>
            <p className="text-sm text-muted-foreground">Mesurez et améliorez la culture d&apos;équipe</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>© 2025 TeamSpark. Tous droits réservés.</p>
        </div>
      </footer>
    </main>
  )
}
