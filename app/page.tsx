import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Trophy, Zap, Eye, Heart } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Subtle animated background pattern */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 animate-pulse" aria-hidden="true" />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-50 animate-pulse"
          style={{ animationDelay: "1s" }}
          aria-hidden="true"
        />
      </div>

      {/* Navigation Header */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center" aria-label="Logo TeamSpark">
              <Trophy className="w-6 h-6 text-primary-foreground" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              TeamSpark
            </span>
          </div>
          <Link href="/signin">
            <Button variant="outline" aria-label="Se connecter">Se connecter</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
        {/* Logo and Title */}
        <div className="flex flex-col items-center gap-8">
          {/* Icon */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow" aria-label="Logo principal">
            <Trophy className="w-10 h-10 text-primary-foreground" aria-hidden="true" />
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
              <Button className="gap-2 h-12 px-6 text-base font-semibold group" aria-label="Commencer l'aventure">
                Commencer l&apos;aventure
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Button>
            </Link>
            <Link href="/signin">
              <Button variant="outline" className="h-12 px-6 text-base font-semibold bg-transparent" aria-label="Se connecter">
                Se connecter
              </Button>
            </Link>
          </div>
        </div>

        {/* Floating cards preview */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-xl bg-card border border-border/50 backdrop-blur-sm hover:border-primary/50 transition-colors group cursor-pointer">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Zap className="w-6 h-6 text-primary" aria-hidden="true" />
            </div>
            <h3 className="font-semibold mb-2">Performance en Temps Réel</h3>
            <p className="text-sm text-muted-foreground">Suivez les KPIs de votre équipe en direct avec des alertes intelligentes</p>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border/50 backdrop-blur-sm hover:border-secondary/50 transition-colors group cursor-pointer">
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
              <Eye className="w-6 h-6 text-secondary" aria-hidden="true" />
            </div>
            <h3 className="font-semibold mb-2">Insights IA Prédictive</h3>
            <p className="text-sm text-muted-foreground">Anticipez les problèmes d'équipe avant qu'ils n'affectent la productivité</p>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border/50 backdrop-blur-sm hover:border-accent/50 transition-colors group cursor-pointer">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
              <Heart className="w-6 h-6 text-accent" aria-hidden="true" />
            </div>
            <h3 className="font-semibold mb-2">Culture Pulse</h3>
            <p className="text-sm text-muted-foreground">Mesurez le moral d'équipe et recevez des recommandations personnalisées</p>
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