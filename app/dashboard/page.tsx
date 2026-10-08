import { connectDb } from "@/lib/db";
import { Board } from "@/lib/models";
import { getSession } from "@/lib/auth/auth";
import QuickInitBtn from "@/components/quickInitBtn";
import KanbanBoard from "@/components/kanbanBoard";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  await connectDb();
  const board = await Board.findOne({
    userId: session?.user.id,
    name: "Job Hunt",
  }).populate({
    path: "columns",
    populate: {
      path: "jobApplications",
    },
  });

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

          <KanbanBoard
            userId={session?.user.id}
            board={JSON.parse(JSON.stringify(board))}
          />
        </div>
      </div>
    </>
  );
}
