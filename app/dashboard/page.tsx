import { connectDb } from "@/lib/db";
import { Board } from "@/lib/models";
import { getSession } from "@/lib/auth/auth";
import QuickInitBtn from "@/components/quickInitBtn";
import KanbanBoard from "@/components/kanbanBoard";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function getBoard(userId: string) {
  "use cache";
  // just turn this function into a cache component, so that it doesn't re-render on every request
  await connectDb();
  const boardDoc = await Board.findOne({
    userId: userId,
    name: "Job Hunt",
  }).populate({
    path: "columns",
    populate: {
      path: "jobApplications",
    },
  });

  if (!boardDoc) return null;

  const board = JSON.parse(JSON.stringify(boardDoc));

  return board;
}

async function Dashboard() {
  const session = await getSession();
  // cache component can't be used with headers access , so we don't need to turn entire page to cache component

  if (!session?.user) {
    redirect("/sign-in");
  }

  const board = await getBoard(session?.user.id);

  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="container mx-auto p-6">
          {!board ? (
            <div className="mt-6 flex flex-col items-center gap-4">
              <h2 className="text-3xl font-bold text-gray-500">
                You have not created any job board yet
              </h2>
              <div>
                <QuickInitBtn />
              </div>
            </div>
          ) : (
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-black">{board.name}</h1>
              <p className="text-gray-600">Track your job applications</p>
            </div>
          )}

          <KanbanBoard userId={session?.user.id} board={board} />
        </div>
      </div>
    </>
  );
}

export default async function DashboardWrapper() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      }
    >
      <Dashboard />
    </Suspense>
  );
}
