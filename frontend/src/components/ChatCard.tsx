import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatCardProps {
  question: string;
  onQuestionChange: (value: string) => void;
  onAskQuestion: () => Promise<void>;
  answer: string;
  loading: boolean;
  paperId: string;
}

export function ChatCard({
  question,
  onQuestionChange,
  onAskQuestion,
  answer,
  loading,
  paperId,
}: ChatCardProps) {
  return (
    <Card className="border-purple-500/30 bg-slate-800/50 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-50">
          <MessageSquare className="h-5 w-5 text-cyan-300" />
          Chat with your Paper
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Textarea
          placeholder="Ask anything about the uploaded research paper..."
          value={question}
          onChange={(e) => onQuestionChange(e.target.value)}
          className="min-h-[140px] border-purple-500/30 bg-slate-900/80 text-slate-100 placeholder:text-slate-400 focus:border-purple-400/60 focus:ring-purple-400/20"
        />

        <Button
          onClick={onAskQuestion}
          disabled={loading || !paperId}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Thinking...
            </>
          ) : (
            <>
              <MessageSquare className="mr-2 h-4 w-4" />
              Ask AI
            </>
          )}
        </Button>

        {answer && (
          <div className="rounded-xl border border-purple-500/30 bg-slate-900/50 backdrop-blur-sm p-5">
            <h3 className="mb-3 text-lg font-semibold text-slate-50">
              Answer
            </h3>

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
                {answer}
              </ReactMarkdown>
            </article>
          </div>
        )}
      </CardContent>
    </Card>
  );
}