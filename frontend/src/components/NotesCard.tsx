import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NotebookPen } from "lucide-react";

interface NotesCardProps {
  notes: string;
}

export function NotesCard({ notes }: NotesCardProps) {
  if (!notes) return null;

  return (
    <Card className="border-purple-500/30 bg-slate-800/50 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-50">
          <NotebookPen className="h-5 w-5 text-emerald-300" />
          Study Notes
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="max-h-[500px] overflow-y-auto rounded-lg border border-purple-500/20 bg-slate-900/50 p-4">
          <p className="whitespace-pre-wrap leading-7 text-slate-200">
            {notes}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
