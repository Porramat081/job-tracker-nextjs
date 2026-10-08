"use server";

import { getSession } from "@/lib/auth/auth";
import { initUserBoard } from "@/lib/init-user-board";
import { revalidatePath } from "next/cache";

export async function createUserBoard() {
  const session = await getSession();

  if (session?.user?.id) {
    await initUserBoard(session.user.id);
  }

  revalidatePath("/dashboard");
}
