import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface QuizCardProps {
  quiz: string;
}

export function QuizCard({ quiz }: QuizCardProps) {
  if (!quiz) return null;

  return (
    <Card className="border-purple-500/30 bg-slate-800/50 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-50">
          <BookOpen className="h-5 w-5 text-violet-300" />
          Quiz
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="max-h-[500px] overflow-y-auto rounded-lg border border-purple-500/20 bg-slate-900/50 p-4">
          <article
            className="
              prose prose-invert prose-slate max-w-none
              prose-headings:text-white
              prose-p:text-slate-200
              prose-strong:text-white
              prose-li:text-slate-200
              prose-code:text-blue-300
              prose-pre:bg-slate-950
              prose-blockquote:border-purple-500
              prose-a:text-blue-400
            "
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {quiz}
            </ReactMarkdown>
          </article>
        </div>
      </CardContent>
    </Card>
  );
}