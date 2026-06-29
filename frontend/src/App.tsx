import { useState } from "react";
import {
  uploadPaper,
  getSummary,
  getQuiz,
  getNotes,
  askPaper,
} from "@/services/api";

import { getErrorMessage } from "@/utils/errorHandler";
import { validatePdf } from "@/utils/fileValidation";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { UploadCard } from "@/components/UploadCard";
import { StudyTools } from "@/components/StudyTools";
import { SummaryCard } from "@/components/SummaryCard";
import { ChatCard } from "@/components/ChatCard";
import { QuizCard } from "@/components/QuizCard";
import { NotesCard } from "@/components/NotesCard";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [paperId, setPaperId] = useState("");
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [quiz, setQuiz] = useState("");
  const [notes, setNotes] = useState("");

  const [uploadingLoading, setUploadingLoading] = useState(false);
  const [summarizingLoading, setSummarizingLoading] = useState(false);
  const [generatingQuizLoading, setGeneratingQuizLoading] = useState(false);
  const [generatingNotesLoading, setGeneratingNotesLoading] = useState(false);
  const [askingLoading, setAskingLoading] = useState(false);
  const [error, setError] = useState("");


  const uploadFile = async (uploadFile: File | null) => {
    setError("");
    setMessage("");

    const validationError = validatePdf(uploadFile);

    if (validationError) {
      setError(validationError);
      setFile(null);
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadFile);

    try {
      setUploadingLoading(true);

      const response = await uploadPaper(formData);

      setPaperId(response.data.paper_id);

      setMessage(
        `✓ ${response.data.filename} uploaded successfully (${response.data.pages} pages)`
      );

      setSummary("");
      setQuestion("");
      setAnswer("");
      setQuiz("");
      setNotes("");

      const summaryResponse = await getSummary(response.data.paper_id);

      setSummary(summaryResponse.data.summary);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to upload PDF. Please try again."));
    } finally {
      setUploadingLoading(false);
    }
  };

  const generateSummary = async () => {
    setError("");

    if (!paperId) {
      setError("Please upload a paper first.");
      return;
    }

    try {
      setSummarizingLoading(true);
      setSummary("");

      const response = await getSummary(paperId);

      setSummary(response.data.summary);
    } catch (err) {
      const errorMsg = getErrorMessage(
        err,
        "Failed to generate summary. Please try again."
      );
      setError(errorMsg);
    } finally {
      setSummarizingLoading(false);
    }
  };

  const generateQuiz = async () => {
    setError("");

    if (!paperId) {
      setError("Please upload a paper first.");
      return;
    }

    try {
      setGeneratingQuizLoading(true);
      setQuiz("");

      const response = await getQuiz(paperId);

      setQuiz(response.data.quiz);
    } catch (err) {
      const errorMsg = getErrorMessage(
        err,
        "Failed to generate quiz. Please try again."
      );
      setError(errorMsg);
    } finally {
      setGeneratingQuizLoading(false);
    }
  };

  const generateNotes = async () => {
    setError("");

    if (!paperId) {
      setError("Please upload a paper first.");
      return;
    }

    try {
      setGeneratingNotesLoading(true);
      setNotes("");

      const response = await getNotes(paperId);

      setNotes(response.data.notes);
    } catch (err) {
      const errorMsg = getErrorMessage(
        err,
        "Failed to generate study notes. Please try again."
      );
      setError(errorMsg);
    } finally {
      setGeneratingNotesLoading(false);
    }
  };

  const askQuestion = async () => {
    setError("");

    if (!paperId) {
      setError("Please upload a paper first.");
      return;
    }

    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    try {
      setAskingLoading(true);
      setAnswer("");

      const response = await askPaper(
        paperId,
        question
      );

      setAnswer(response.data.answer);
    } catch (err) {
      const errorMsg = getErrorMessage(
        err,
        "Failed to get an answer. Please try again."
      );
      setError(errorMsg);
    } finally {
      setAskingLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Hero */}
        <section className="mb-10 text-center">
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
            Powered by AI
          </Badge>

          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            📄 PaperPal AI
          </h1>

          <p className="mx-auto mt-2 text-lg font-semibold text-blue-300">
            AI-powered Research Paper Assistant
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            Upload a research paper, generate summaries, create quizzes,
            prepare study notes, and chat with your document.
          </p>
        </section>

        {/* Top Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          <UploadCard
            onUpload={uploadFile}
            loading={uploadingLoading}
            file={file}
            onFileChange={setFile}
            message={message}
          />

          <StudyTools
            onGenerateSummary={generateSummary}
            onGenerateQuiz={generateQuiz}
            onGenerateNotes={generateNotes}
            summarizingLoading={summarizingLoading}
            generatingQuizLoading={generatingQuizLoading}
            generatingNotesLoading={generatingNotesLoading}
            paperId={paperId}
          />
        </div>

        {/* Empty State */}
        {!paperId && (
          <Card className="mt-6 border-purple-500/30 bg-slate-800/50 backdrop-blur-sm shadow-lg">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">
                No paper uploaded yet
              </h3>
              <p className="text-slate-400">
                Upload a PDF to start summarizing, asking questions and
                generating quizzes.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Summary */}
        <SummaryCard summary={summary} />

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-lg border border-red-500/40 bg-red-950/40 p-4 text-sm text-red-300 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <span className="text-lg">⚠</span>
              <div>
                <p className="font-semibold">Error</p>
                <p>{error}</p>
              </div>
            </div>
          </div>
        )}

        <Separator className="my-8 bg-purple-500/20" />

        {/* Chat */}
        <ChatCard
          question={question}
          onQuestionChange={setQuestion}
          onAskQuestion={askQuestion}
          answer={answer}
          loading={askingLoading}
          paperId={paperId}
        />

        {/* Bottom Grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <QuizCard quiz={quiz} />
          <NotesCard notes={notes} />
        </div>
      </div>
    </main>
  );
}

export default App;