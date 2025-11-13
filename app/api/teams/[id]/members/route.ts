import { NextResponse } from "next/server";
import { 
  getTeamById, 
  addTeamMember, 
  removeTeamMember, 
  updateTeamMemberRole 
} from "@/lib/team-service";
import { auth } from "@/lib/auth";

// Supprimons le runtime edge car Prisma n'est pas compatible avec l'environnement Edge
// export const runtime = "edge";

/**
 * POST /api/teams/[id]/members - Ajouter un membre à une équipe
 */
export async function POST(
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

    const { userId, role } = await request.json();

    // Validation
    if (!userId) {
      return NextResponse.json(
        { error: "L'ID de l'utilisateur est requis" },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur est déjà membre
    const isAlreadyMember = team.members.some(member => member.userId === userId);
    if (isAlreadyMember) {
      return NextResponse.json(
        { error: "L'utilisateur est déjà membre de cette équipe" },
        { status: 400 }
      );
    }

    const teamMember = await addTeamMember(params.id, userId, role || "member");
    return NextResponse.json(teamMember, { status: 201 });
  } catch (error: any) {
    console.error("Erreur lors de l'ajout d'un membre à l'équipe:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/teams/[id]/members - Supprimer un membre d'une équipe
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

    const { userId } = await request.json();

    // Validation
    if (!userId) {
      return NextResponse.json(
        { error: "L'ID de l'utilisateur est requis" },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur est le propriétaire (ne peut pas se supprimer lui-même)
    if (userId === team.ownerId) {
      return NextResponse.json(
        { error: "Le propriétaire ne peut pas se supprimer lui-même" },
        { status: 400 }
      );
    }

    const teamMember = await removeTeamMember(params.id, userId);
    return NextResponse.json(teamMember);
  } catch (error: any) {
    console.error("Erreur lors de la suppression d'un membre de l'équipe:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error.message },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/teams/[id]/members - Mettre à jour le rôle d'un membre
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

    const { userId, role } = await request.json();

    // Validation
    if (!userId || !role) {
      return NextResponse.json(
        { error: "L'ID de l'utilisateur et le rôle sont requis" },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur est le propriétaire (ne peut pas changer son propre rôle)
    if (userId === team.ownerId) {
      return NextResponse.json(
        { error: "Le propriétaire ne peut pas changer son propre rôle" },
        { status: 400 }
      );
    }

    const teamMember = await updateTeamMemberRole(params.id, userId, role);
    return NextResponse.json(teamMember);
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour du rôle d'un membre:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error.message },
      { status: 500 }
    );
  }
}