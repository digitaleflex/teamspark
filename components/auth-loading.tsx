import { Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function AuthLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border/50">
        <CardHeader className="flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">Chargement en cours...</p>
        </CardContent>
      </Card>
    </div>
  )
}