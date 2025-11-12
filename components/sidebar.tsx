"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Trophy, Home, Users, BarChart3, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", label: "Accueil", icon: Home },
    { href: "/dashboard/teams", label: "Équipes", icon: Users },
    { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/dashboard/settings", label: "Paramètres", icon: Settings },
  ]

  return (
    <aside className="hidden md:flex w-64 bg-sidebar border-r border-sidebar-border flex-col h-screen fixed left-0 top-0 z-50">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Trophy className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold gradient-text">TeamSpark</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}>
            <button
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                pathname === href
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent",
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Se déconnecter
        </Button>
      </div>
    </aside>
  )
}
