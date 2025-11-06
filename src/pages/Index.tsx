import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, Pause, Square, Search, Clock, FileText } from "lucide-react";

const Index = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const handleRecordToggle = () => {
    if (!isRecording) {
      setIsRecording(true);
      setIsPaused(false);
      // Start timer logic here
    }
  };

  const handlePauseToggle = () => {
    setIsPaused(!isPaused);
    // Pause/resume logic here
  };

  const handleStop = () => {
    setIsRecording(false);
    setIsPaused(false);
    setRecordingTime(0);
    // Stop and save logic here
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">Perfect Memory</h1>
              <p className="text-xs text-muted-foreground">Dr. Smith</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              History
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Settings
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        {!isRecording ? (
          /* Landing State */
          <div className="max-w-2xl mx-auto text-center space-y-12 animate-fade-in">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold tracking-tight">
                Start a New Visit
              </h2>
              <p className="text-xl text-muted-foreground max-w-lg mx-auto">
                Record patient conversations with complete clarity.
                Every detail captured, organized, and instantly accessible.
              </p>
            </div>

            {/* Record Button */}
            <div className="py-8">
              <Button
                onClick={handleRecordToggle}
                size="lg"
                className="w-32 h-32 rounded-full bg-primary hover:bg-primary-hover shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Mic className="w-12 h-12" />
              </Button>
              <p className="mt-6 text-sm text-muted-foreground">
                Click to start recording
              </p>
            </div>

            {/* Recent Visits Preview */}
            <div className="pt-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Recent Visits</h3>
                <Button variant="ghost" size="sm" className="text-primary">
                  View All
                </Button>
              </div>
              
              <div className="grid gap-4">
                <Card className="p-6 text-left hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer border-border/50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">Jane Doe</h4>
                      <p className="text-sm text-muted-foreground">Hypertension Follow-up</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      14 min
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Blood pressure check showed improvement with current medication regimen...
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">March 15, 2024 • 12:34 PM</p>
                </Card>

                <Card className="p-6 text-left hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer border-border/50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">John Smith</h4>
                      <p className="text-sm text-muted-foreground">Post-Surgery Follow-up</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      22 min
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Patient recovering well from procedure. No complications reported...
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">March 10, 2024 • 9:15 AM</p>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          /* Recording State */
          <div className="max-w-2xl mx-auto text-center space-y-12 animate-fade-in">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-recording-light text-recording text-sm font-medium">
                <div className={`w-2 h-2 rounded-full bg-recording ${!isPaused && 'animate-pulse'}`} />
                {isPaused ? 'Paused' : 'Recording'}
              </div>
              <h2 className="text-4xl font-bold tracking-tight pt-4">
                Patient Visit in Progress
              </h2>
            </div>

            {/* Timer */}
            <div className="py-8">
              <div className="text-7xl font-bold tracking-tight tabular-nums">
                {formatTime(recordingTime)}
              </div>
            </div>

            {/* Waveform Visualization Placeholder */}
            <div className="flex items-center justify-center gap-1 h-24">
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    !isPaused ? 'bg-primary' : 'bg-muted'
                  }`}
                  style={{
                    height: `${Math.random() * 60 + 20}%`,
                    opacity: !isPaused ? Math.random() * 0.5 + 0.5 : 0.3,
                  }}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 pt-8">
              <Button
                onClick={handlePauseToggle}
                variant="outline"
                size="lg"
                className="w-20 h-20 rounded-full border-2 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Pause className="w-8 h-8" />
              </Button>
              
              <Button
                onClick={handleStop}
                size="lg"
                className="w-24 h-24 rounded-full bg-destructive hover:bg-destructive/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Square className="w-10 h-10" />
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              Recording will be automatically saved and transcribed
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-24">
        <div className="container mx-auto px-6 py-8 text-center text-sm text-muted-foreground">
          <p>HIPAA Compliant • End-to-End Encrypted • Secure Storage</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
