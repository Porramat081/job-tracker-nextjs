"use client";

import { Board } from "@/lib/models/models.types";
import { Award, Calendar, CheckCircle2, Cross } from "lucide-react";
import DroppableColumn from "./droppable-column";

interface KanbanProps {
  userId: string;
  board: Board;
}

interface ColConfig {
  color: string;
  icon: React.ReactNode;
}

const COLUMN_CONFIG: Array<ColConfig> = [
  {
    color: "bg-cyan-500",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    color: "bg-purple-500",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  {
    color: "bg-green-500",
    icon: <Award className="h-4 w-4" />,
  },
  {
    color: "bg-red-500",
    icon: <Cross className="h-4 w-4" />,
  },
];

export default function KanbanBoard({ board, userId }: KanbanProps) {
  const columns = board.columns;
  const sortedColumns = columns?.sort((a, b) => a.order - b.order) || [];
  return (
    <>
      <div>
        <div>
          {columns.map((col, key) => {
            const config = COLUMN_CONFIG[key] || {
              color: "bg-gray-500",
              icon: <Calendar className="h-4 w-4" />,
            };
            return (
              <DroppableColumn
                key={key}
                column={col}
                config={config}
                boardId={board._id}
                sortedColumns={sortedColumns}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
