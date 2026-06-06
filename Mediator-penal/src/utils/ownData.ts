"use client";

export interface UserLocal {
  id: number;
  name: string;
  email: string;
  status: string;
}

const ownData = (blog: any) => {
  const userLocal = localStorage.getItem("user");

  if (!userLocal) return false;

  try {
    const user: UserLocal = JSON.parse(userLocal);

    return Number(user.id) === Number(blog.author?.id);
  } catch (error) {
    console.log("Invalid user in localStorage", error);
    return false;
  }
};

export default ownData;