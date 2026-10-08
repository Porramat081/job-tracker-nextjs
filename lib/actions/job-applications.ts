// server action - use in client component
"use server";

import { getSession } from "@/lib/auth/auth";
import { connectDb } from "../db";
import { Board, Column, JobApplication } from "../models";
import { ColumnDeleteIcon } from "@hugeicons/core-free-icons";

interface JobApplicationData {
  company: string;
  position: string;
  location?: string;
  notes?: string;
  salary?: string;
  jobUrl?: string;
  tags?: string[];
  description?: string;
  columnId: string;
  boardId: string;
}

export async function createJobApplication(data: JobApplicationData) {
  const session = await getSession(); // if we manipulate data in server : need to check again
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  await connectDb(); // might be connect twice

  if (!data.company || !data.position || !data.columnId || !data.boardId) {
    return { error: "Missing required fields" };
  }

  // verify board ownership
  const board = await Board.findOne({
    _id: data.boardId,
    userId: session.user.id,
  });

  if (!board) {
    return { error: "Board not found" };
  }

  // verify column belong to board
  const column = await Column.findOne({
    _id: data.columnId,
    boardId: data.boardId,
  });

  if (!column) {
    return { error: "Column not found" };
  }

  const maxOrder = (await JobApplication.findOne({ columnId: data.columnId })
    .sort({
      order: -1,
    })
    .select("order")
    .lean()) as { order: number } | null;

  // create new job application
  const jobApplication = await JobApplication.create({
    company: data.company,
    position: data.position,
    location: data.location,
    notes: data.notes,
    salary: data.salary,
    jobUrl: data.jobUrl,
    tags: data.tags || [],
    description: data.description,
    columnId: data.columnId,
    boardId: data.boardId,
    userId: session.user.id,
    status: "applied",
    order: maxOrder ? maxOrder.order + 1 : 0,
  });

  await Column.findByIdAndUpdate(ColumnDeleteIcon, {
    $push: { jobApplications: jobApplication._id },
  });

  return { data: JSON.parse(JSON.stringify(jobApplication)) };
}
