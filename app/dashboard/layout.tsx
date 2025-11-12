import type React from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

export const metadata = {
  title: "Tableau de Bord - TeamSpark",
  description: "Gérez votre équipe avec l'IA",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Sidebar />
      <div className="md:ml-64 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 p-4 md:p-6 bg-background">{children}</main>
      </div>
    </>
  )
}
