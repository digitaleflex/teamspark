"use client"

import { useState, useEffect } from "react"
import { Menu, LogOut, Settings, HelpCircle, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { Sidebar } from "./sidebar"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

// Define the user type based on what we know from the database schema and error message
interface User {
  id: string
  name: string
  email: string
  image?: string | null
  createdAt: Date
  updatedAt: Date
  emailVerified: boolean
  twoFactorEnabled: boolean | null | undefined
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const sessionResponse = await authClient.getSession()
        // Based on the error message, the user is nested within data property
        if ('data' in sessionResponse && sessionResponse.data && 'user' in sessionResponse.data && sessionResponse.data.user) {
          setUser(sessionResponse.data.user)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("Error fetching user session:", error)
        setUser(null)
      }
    }
    fetchUserSession()
  }, [])

  const handleSignOut = async () => {
    try {
      await authClient.signOut()
      router.push("/signin")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <header className="bg-card border-b border-border md:ml-64 sticky top-0 z-40">
      <div className="flex items-center justify-between p-4 md:px-6">
        {/* Mobile Menu Trigger */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar />
          </SheetContent>
        </Sheet>

        {/* Title */}
        <h1 className="text-lg font-semibold md:text-xl">Tableau de Bord</h1>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full p-0 h-10 w-10">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                  {user?.name ? user.name.charAt(0) : user?.email ? user.email.charAt(0).toUpperCase() : "JD"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {user ? (
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{user.name || "Utilisateur"}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            ) : (
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">Invité</p>
                <p className="text-xs text-muted-foreground">Non connecté</p>
              </div>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile" className="flex gap-2 cursor-pointer">
                <User className="w-4 h-4" />
                Profil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="flex gap-2 cursor-pointer">
                <Settings className="w-4 h-4" />
                Paramètres
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/support" className="flex gap-2 cursor-pointer">
                <HelpCircle className="w-4 h-4" />
                Support
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Se déconnecter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}