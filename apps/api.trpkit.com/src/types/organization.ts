export type Organization = {
  name: string;
  ownerId: string;
  members: OrganizationMember[];
  createdAt: Date;
  updatedAt: Date;
};

export type OrganizationMember = {
  userId: string;
  role: OrganizationRole;
  joinedAt: Date;
};

export type OrganizationRole = "owner" | "admin" | "member";
