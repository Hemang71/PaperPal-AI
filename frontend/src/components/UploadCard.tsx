import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2, CheckCircle } from "lucide-react";

interface UploadCardProps {
  onUpload: (file: File) => Promise<void>;
  loading: boolean;
  file: File | null;
  onFileChange: (file: File | null) => void;
  message: string;
}

export function UploadCard({
  onUpload,
  loading,
  file,
  onFileChange,
  message,
}: UploadCardProps) {
  return (
    <Card className="border-purple-500/30 bg-slate-800/50 backdrop-blur-sm shadow-lg hover:shadow-purple-500/20 transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-50">
          <Upload className="h-5 w-5 text-blue-400" />
          Upload Paper
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Input
          type="file"
          accept=".pdf"
          onChange={(e) => {
            if (e.target.files?.length) {
              onFileChange(e.target.files[0]);
            }
          }}
          className="border-purple-500/30 bg-slate-900/80 text-slate-100 file:text-slate-100 focus:border-purple-400/60 focus:ring-purple-400/20"
        />

        {file && (
          <p className="text-sm text-emerald-400">
            ✓ Selected: {file.name}
          </p>
        )}

        <Button
          onClick={() => onUpload(file!)}
          disabled={loading || !file}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload Paper
            </>
          )}
        </Button>

        {message && (
          <div className="rounded-lg border border-emerald-500/40 bg-emerald-950/40 p-3 text-sm text-emerald-300 backdrop-blur-sm flex items-center gap-2">
            <CheckCircle className="h-4 w-4 flex-shrink-0" />
            {message}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
