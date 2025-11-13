import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

/**
 * GET /api/analytics - Obtenir les données d'analyse pour le tableau de bord
 */
export async function GET(request: Request) {
  try {
    // Vérifier l'authentification
    const session = await auth.api.getSession({
      headers: request.headers
    });
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    // Obtenir les données d'analyse
    // Pour l'instant, nous simulons des données, mais dans une vraie application,
    // vous récupéreriez ces données de votre base de données
    
    // Exemple de données d'analyse
    const analyticsData = {
      totalTeams: 5,
      totalMembers: 24,
      recentActivity: [
        {
          id: "1",
          action: "Nouvel utilisateur inscrit",
          target: "jean.dupont@example.com",
          timestamp: "Il y a 5 minutes"
        },
        {
          id: "2",
          action: "Équipe créée",
          target: "Équipe Marketing",
          timestamp: "Il y a 2 heures"
        },
        {
          id: "3",
          action: "Tâche complétée",
          target: "Mise à jour du design",
          timestamp: "Il y a 1 jour"
        },
        {
          id: "4",
          action: "Nouveau membre",
          target: "Marie Martin",
          timestamp: "Il y a 2 jours"
        }
      ]
    };

    return NextResponse.json(analyticsData);
  } catch (error: any) {
    console.error("Erreur lors de la récupération des données d'analyse:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error.message },
      { status: 500 }
    );
  }
}