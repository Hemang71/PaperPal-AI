import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface SummaryCardProps {
  summary: string;
}

export function SummaryCard({ summary }: SummaryCardProps) {
  if (!summary) return null;

  return (
    <Card className="mt-6 border-purple-500/30 bg-slate-800/50 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-50">
          <FileText className="h-5 w-5 text-blue-300" />
          Executive Summary
        </CardTitle>
      </CardHeader>

      <CardContent>
        <article className="prose prose-invert prose-slate max-w-none
          prose-headings:text-white
          prose-p:text-slate-200
          prose-strong:text-white
          prose-li:text-slate-200
          prose-code:text-blue-300
          prose-pre:bg-slate-900
          prose-blockquote:border-purple-500
          prose-a:text-blue-400">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {summary}
          </ReactMarkdown>
        </article>
      </CardContent>
    </Card>
  );
}