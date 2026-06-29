import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, NotebookPen, Sparkles } from "lucide-react";

interface StudyToolsProps {
  onGenerateSummary: () => Promise<void>;
  onGenerateQuiz: () => Promise<void>;
  onGenerateNotes: () => Promise<void>;
  summarizingLoading: boolean;
  generatingQuizLoading: boolean;
  generatingNotesLoading: boolean;
  paperId: string;
}

export function StudyTools({
  onGenerateSummary,
  onGenerateQuiz,
  onGenerateNotes,
  summarizingLoading,
  generatingQuizLoading,
  generatingNotesLoading,
  paperId,
}: StudyToolsProps) {
  const isDisabled = !paperId;

  return (
    <Card className="border-purple-500/30 bg-slate-800/50 backdrop-blur-sm shadow-lg hover:shadow-purple-500/20 transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-50">
          <Sparkles className="h-5 w-5 text-yellow-300" />
          AI Study Tools
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <Button
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium"
          disabled={summarizingLoading || isDisabled}
          onClick={onGenerateSummary}
        >
          <FileText className="mr-2 h-4 w-4" />
          Generate Summary
        </Button>

        <Button
          className="w-full bg-slate-700/60 hover:bg-slate-600 text-slate-50 border border-purple-500/30 font-medium"
          disabled={generatingQuizLoading || isDisabled}
          onClick={onGenerateQuiz}
        >
          <BookOpen className="mr-2 h-4 w-4" />
          Generate Quiz
        </Button>

        <Button
          className="w-full bg-slate-700/60 hover:bg-slate-600 text-slate-50 border border-purple-500/30 font-medium"
          disabled={generatingNotesLoading || isDisabled}
          onClick={onGenerateNotes}
        >
          <NotebookPen className="mr-2 h-4 w-4" />
          Generate Study Notes
        </Button>
      </CardContent>
    </Card>
  );
}
