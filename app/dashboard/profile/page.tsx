import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profil</h1>
        <p className="text-muted-foreground">
          Gérez les informations de votre profil personnel
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Photo de profil</CardTitle>
          <CardDescription>
            Mettez à jour votre photo de profil
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <Button variant="outline">Changer d'image</Button>
            <p className="text-xs text-muted-foreground">
              JPG, GIF ou PNG. Taille max 5MB.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Détails du profil</CardTitle>
          <CardDescription>
            Mettez à jour vos informations personnelles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input id="firstName" placeholder="Votre prénom" defaultValue="Jean" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input id="lastName" placeholder="Votre nom" defaultValue="Dupont" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Votre email" defaultValue="jean.dupont@example.com" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Biographie</Label>
            <Input id="bio" placeholder="Décrivez-vous en quelques mots" />
          </div>
          
          <Button>Sauvegarder les changements</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Supprimer le compte</CardTitle>
          <CardDescription>
            Supprimez définitivement votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Une fois votre compte supprimé, toutes vos données seront définitivement effacées. 
              Cette action est irréversible.
            </p>
            <Button variant="destructive">Supprimer le compte</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}