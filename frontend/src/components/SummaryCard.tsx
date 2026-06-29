import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

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
        <p className="whitespace-pre-wrap leading-7 text-slate-200">
          {summary}
        </p>
      </CardContent>
    </Card>
  );
}
