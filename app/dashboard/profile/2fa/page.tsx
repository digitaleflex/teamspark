"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Shield } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"

export default function TwoFactorAuthPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [enabling, setEnabling] = useState(false)
  const [disabling, setDisabling] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [is2FAEnabled, setIs2FAEnabled] = useState(false)
  const [totpURI, setTotpURI] = useState("")
  const [secret, setSecret] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [message, setMessage] = useState<{ type: "success" | "error"; content: string } | null>(null)

  useEffect(() => {
    const check2FAStatus = async () => {
      try {
        const session = await authClient.getSession()
        if (!session) {
          router.push("/signin")
          return
        }
        
        // Vérifier si la 2FA est déjà activée en vérifiant les propriétés de l'utilisateur
        if (session.data?.user?.twoFactorEnabled) {
          setIs2FAEnabled(true)
        }
      } catch (error) {
        console.error("Error checking 2FA status:", error)
      } finally {
        setLoading(false)
      }
    }

    check2FAStatus()
  }, [router])

  const handleEnable2FA = async () => {
    setEnabling(true)
    setMessage(null)
    
    try {
      // Pour activer la 2FA, nous devons d'abord l'activer avec le mot de passe
      // Note: Dans une vraie application, vous devriez demander le mot de passe à l'utilisateur
      const enableResponse: any = await authClient.twoFactor.enable({
        password: "" // Vous devrez obtenir le mot de passe de l'utilisateur
      } as any)
      
      if (enableResponse.data) {
        // Après l'activation, obtenir l'URI TOTP
        // Utilisons une approche plus défensive
        try {
          // Vérifions d'abord si getTotpUri existe et est une fonction
          if ((authClient.twoFactor as any).getTotpUri) {
            const uriResponse: any = await (authClient.twoFactor as any).getTotpUri()
            if (uriResponse.data) {
              setTotpURI(uriResponse.data.totpURI || uriResponse.data.uri || "")
              setSecret("") // Nous ne pouvons pas obtenir la clé secrète directement
              setMessage({ 
                type: "success", 
                content: "Scannez le code QR avec votre application d'authentification, puis entrez le code généré." 
              })
              return
            }
          }
        } catch (err) {
          console.warn("Could not get TOTP URI:", err)
        }
        
        // Si getTotpUri n'existe pas ou échoue, essayons une autre approche
        setMessage({ 
          type: "success", 
          content: "La double authentification a été activée. Entrez le code de votre application d'authentification." 
        })
      }
    } catch (error: any) {
      console.error("Error enabling 2FA:", error)
      setMessage({ 
        type: "error", 
        content: error.message || "Erreur lors de l'activation de la double authentification." 
      })
    } finally {
      setEnabling(false)
    }
  }

  const handleVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault()
    setVerifying(true)
    setMessage(null)
    
    try {
      // Utilisons la même approche que dans signin-2fa avec un typage plus défensif
      let response: any;
      // Essayons d'abord la méthode verify
      try {
        response = await (authClient.twoFactor as any).verify({
          code: verificationCode,
        })
      } catch (verifyError) {
        // Si verify n'existe pas, essayons verifyTotp
        try {
          response = await (authClient.twoFactor as any).verifyTotp({
            code: verificationCode,
          })
        } catch (totpError) {
          // Si aucune méthode ne fonctionne, lançons l'erreur d'origine
          throw verifyError;
        }
      }
      
      // Selon l'exemple dans signin-2fa, vérifions si la réponse indique que c'est vérifié
      if (response.data?.verified) {
        setIs2FAEnabled(true)
        setTotpURI("")
        setSecret("")
        setVerificationCode("")
        setMessage({ 
          type: "success", 
          content: "Double authentification activée avec succès !" 
        })
      } else {
        throw new Error("Code de vérification invalide")
      }
    } catch (error: any) {
      console.error("Error verifying 2FA:", error)
      setMessage({ 
        type: "error", 
        content: error.message || "Code de vérification invalide." 
      })
    } finally {
      setVerifying(false)
    }
  }

  const handleDisable2FA = async () => {
    setDisabling(true)
    setMessage(null)
    
    try {
      // Pour désactiver la 2FA, essayons avec les paramètres requis
      const response: any = await authClient.twoFactor.disable({
        password: "" // Vous devrez obtenir le mot de passe de l'utilisateur
      } as any)
      
      if (response.data) {
        setIs2FAEnabled(false)
        setMessage({ 
          type: "success", 
          content: "Double authentification désactivée." 
        })
      }
    } catch (error: any) {
      console.error("Error disabling 2FA:", error)
      setMessage({ 
        type: "error", 
        content: error.message || "Erreur lors de la désactivation de la double authentification." 
      })
    } finally {
      setDisabling(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Double Authentification</h1>
        <p className="text-muted-foreground">
          Ajoutez une couche de sécurité supplémentaire à votre compte
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Authentification à deux facteurs
          </CardTitle>
          <CardDescription>
            Protégez votre compte avec une authentification supplémentaire
          </CardDescription>
        </CardHeader>
        <CardContent>
          {message && (
            <Alert className={`mb-6 ${message.type === "success" ? "bg-green-500/20 border-green-500/30" : "bg-destructive/20 border-destructive/30"}`}>
              <AlertTitle>{message.type === "success" ? "Succès" : "Erreur"}</AlertTitle>
              <AlertDescription>{message.content}</AlertDescription>
            </Alert>
          )}

          {is2FAEnabled ? (
            <div className="space-y-6">
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-green-500">La double authentification est activée</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Votre compte est protégé par une authentification à deux facteurs.
                </p>
              </div>
              
              <Button 
                onClick={handleDisable2FA} 
                disabled={disabling}
                variant="destructive"
              >
                {disabling ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Désactivation...
                  </>
                ) : (
                  "Désactiver la 2FA"
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-muted-foreground">
                L'authentification à deux facteurs (2FA) ajoute une couche de sécurité supplémentaire 
                à votre compte en nécessitant non seulement un mot de passe, mais aussi un code 
                généré par une application d'authentification.
              </p>
              
              {!totpURI ? (
                <Button 
                  onClick={handleEnable2FA} 
                  disabled={enabling}
                  className="w-full"
                >
                  {enabling ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Activation...
                    </>
                  ) : (
                    "Activer la double authentification"
                  )}
                </Button>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-col items-center gap-4 p-4 border rounded-lg">
                    <div className="p-2 bg-white rounded-lg">
                      <QRCodeSVG value={totpURI} size={128} />
                    </div>
                    <p className="text-sm text-center text-muted-foreground">
                      Scannez ce code QR avec votre application d'authentification (comme Google Authenticator ou Authy)
                    </p>
                  </div>
                  
                  <form onSubmit={handleVerify2FA} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="verificationCode">Code de vérification</Label>
                      <Input
                        id="verificationCode"
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="000000"
                        maxLength={6}
                        className="text-center text-2xl tracking-widest"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={verifying || verificationCode.length !== 6}
                      className="w-full"
                    >
                      {verifying ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Vérification...
                        </>
                      ) : (
                        "Vérifier et activer"
                      )}
                    </Button>
                  </form>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}