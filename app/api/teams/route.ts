import { NextResponse } from "next/server";
import { getTeamsByUserId, createTeam } from "@/lib/team-service";
import { auth } from "@/lib/auth";

// Supprimons le runtime edge car Prisma n'est pas compatible avec l'environnement Edge
// export const runtime = "edge";

/**
 * GET /api/teams - Obtenir toutes les équipes de l'utilisateur
 */
export async function GET(request: Request) {
  try {
    // Vérifier l'authentification
    const session = await auth.api.getSession({
      headers: request.headers
    });
    
    if (!session) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const teams = await getTeamsByUserId(session.user.id);
    return NextResponse.json(teams);
  } catch (error: any) {
    console.error("Erreur lors de la récupération des équipes:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/teams - Créer une nouvelle équipe
 */
export async function POST(request: Request) {
  try {
    // Vérifier l'authentification
    const session = await auth.api.getSession({
      headers: request.headers
    });
    
    if (!session) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const { name, description } = await request.json();

    // Validation
    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Le nom de l'équipe est requis" },
        { status: 400 }
      );
    }

    const team = await createTeam(name, description, session.user.id);
    return NextResponse.json(team, { status: 201 });
  } catch (error: any) {
    console.error("Erreur lors de la création de l'équipe:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error.message },
      { status: 500 }
    );
  }
}