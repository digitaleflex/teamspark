import { NextResponse } from "next/server";
import { getTeamById, updateTeam, deleteTeam } from "@/lib/team-service";
import { auth } from "@/lib/auth";

export const runtime = "edge";

/**
 * GET /api/teams/[id] - Obtenir une équipe par ID
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Vérifier l'authentification
    const session = await auth.api.getSession({
      headers: request.headers
    });
    
    if (!session) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const team = await getTeamById(params.id);
    
    // Vérifier si l'équipe existe
    if (!team) {
      return NextResponse.json({ error: "Équipe non trouvée" }, { status: 404 });
    }

    // Vérifier si l'utilisateur a accès à cette équipe
    const isMember = team.members.some(member => member.userId === session.user.id);
    const isOwner = team.ownerId === session.user.id;
    
    if (!isMember && !isOwner) {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    return NextResponse.json(team);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'équipe:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/teams/[id] - Mettre à jour une équipe
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Vérifier l'authentification
    const session = await auth.api.getSession({
      headers: request.headers
    });
    
    if (!session) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const team = await getTeamById(params.id);
    
    // Vérifier si l'équipe existe
    if (!team) {
      return NextResponse.json({ error: "Équipe non trouvée" }, { status: 404 });
    }

    // Vérifier si l'utilisateur est le propriétaire de l'équipe
    if (team.ownerId !== session.user.id) {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    const { name, description } = await request.json();

    // Validation
    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Le nom de l'équipe est requis" },
        { status: 400 }
      );
    }

    const updatedTeam = await updateTeam(params.id, { name, description });
    return NextResponse.json(updatedTeam);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'équipe:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/teams/[id] - Supprimer une équipe
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Vérifier l'authentification
    const session = await auth.api.getSession({
      headers: request.headers
    });
    
    if (!session) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const team = await getTeamById(params.id);
    
    // Vérifier si l'équipe existe
    if (!team) {
      return NextResponse.json({ error: "Équipe non trouvée" }, { status: 404 });
    }

    // Vérifier si l'utilisateur est le propriétaire de l'équipe
    if (team.ownerId !== session.user.id) {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    const deletedTeam = await deleteTeam(params.id);
    return NextResponse.json(deletedTeam);
  } catch (error) {
    console.error("Erreur lors de la suppression de l'équipe:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}