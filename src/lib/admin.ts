import { auth } from "@clerk/nextjs/server";

const adminId = process.env.ADMIN_USER_ID as string;

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  return adminId.indexOf(userId) !== -1;
};
