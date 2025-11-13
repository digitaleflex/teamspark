import prisma from "@/lib/prisma";
import { Team, TeamMember, User } from "@prisma/client";

export interface TeamWithMembers extends Team {
  members: (TeamMember & {
    user: User;
  })[];
}

/**
 * Créer une nouvelle équipe
 */
export async function createTeam(
  name: string,
  description: string | null,
  ownerId: string
): Promise<Team> {
  return await prisma.team.create({
    data: {
      name,
      description,
      ownerId,
    },
  });
}

/**
 * Obtenir une équipe par ID
 */
export async function getTeamById(id: string): Promise<TeamWithMembers | null> {
  return await prisma.team.findUnique({
    where: { id },
    include: {
      members: {
        include: {
          user: true,
        },
      },
    },
  });
}

/**
 * Obtenir toutes les équipes d'un utilisateur
 */
export async function getTeamsByUserId(userId: string): Promise<TeamWithMembers[]> {
  return await prisma.team.findMany({
    where: {
      OR: [
        { ownerId: userId },
        { members: { some: { userId } } }
      ]
    },
    include: {
      members: {
        include: {
          user: true,
        },
      },
    },
  });
}

/**
 * Mettre à jour une équipe
 */
export async function updateTeam(
  id: string,
  data: Partial<Pick<Team, "name" | "description">>
): Promise<Team> {
  return await prisma.team.update({
    where: { id },
    data,
  });
}

/**
 * Supprimer une équipe
 */
export async function deleteTeam(id: string): Promise<Team> {
  return await prisma.team.delete({
    where: { id },
  });
}

/**
 * Ajouter un membre à une équipe
 */
export async function addTeamMember(
  teamId: string,
  userId: string,
  role: string = "member"
): Promise<TeamMember> {
  return await prisma.teamMember.create({
    data: {
      teamId,
      userId,
      role,
    },
  });
}

/**
 * Supprimer un membre d'une équipe
 */
export async function removeTeamMember(
  teamId: string,
  userId: string
): Promise<TeamMember> {
  return await prisma.teamMember.delete({
    where: {
      userId_teamId: {
        userId,
        teamId,
      },
    },
  });
}

/**
 * Mettre à jour le rôle d'un membre
 */
export async function updateTeamMemberRole(
  teamId: string,
  userId: string,
  role: string
): Promise<TeamMember> {
  return await prisma.teamMember.update({
    where: {
      userId_teamId: {
        userId,
        teamId,
      },
    },
    data: {
      role,
    },
  });
}