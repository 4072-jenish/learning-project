export const canManageBlog = (
  blogAuthorId: number,
  currentUserId: number,
  currentUserRole: string
) => {
  const isOwner =
    blogAuthorId === currentUserId;

  const isAdmin =
    currentUserRole === "admin";

  return isOwner || isAdmin;
};