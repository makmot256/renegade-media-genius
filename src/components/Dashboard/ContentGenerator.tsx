import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Copy, Save, Share, Sparkles, Mic, MicOff, Upload, History, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import GoogleTranslate from "@/components/GoogleTranslate";


import { uploadToIPFS } from "@/lib/ipfs";
import { createActorWithIdentity } from "@/lib/actor/aiWriterActor";
import UserFeed from "../UserFeed";
const cid = "vizcg-th777-77774-qaaea-cai";
const platforms = [
  { value: "twitter", label: "X / Twitter" },
  { value: "instagram", label: "Instagram" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "facebook", label: "Facebook" },
  { value: "tiktok", label: "TikTok" },
];

const contentTypes = [
  { value: "post", label: "Regular Post" },
  { value: "thread", label: "Thread" },
  { value: "caption", label: "Image Caption" },
  { value: "blog", label: "Blog Post" },
  { value: "ar-post", label: "AR Post" },
  { value: "360-video", label: "360° Video" },
  { value: "panorama", label: "Panorama Image" },
];

interface GenerationHistoryItem {
  id: string;
  prompt: string;
  platform: string;
  contentType: string;
  tone: string;
  generatedContent: string;
  timestamp: Date;
}

const ContentGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [platform, setPlatform] = useState("twitter");
  const [contentType, setContentType] = useState("post");
  const [tone, setTone] = useState("professional");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [arFile, setArFile] = useState<File | null>(null);
  const [generationHistory, setGenerationHistory] = useState<GenerationHistoryItem[]>([]);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGenerate = async () => {
    if (!prompt) {
      toast({
        title: "Missing prompt",
        description: "Please provide a prompt for the AI to generate content",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedContent("");

    try {
      // Connect to the canister actor with identity
      const actor = await createActorWithIdentity();

      // Call backend method to generate content
      //If the intent of handleGenerate is only to generate the content and not save it yet, then remove cid from the call and adjust the backend method if possible:
      const result = await actor.createContent(prompt, contentType, tone, cid); // adjust args as needed


      setGeneratedContent(result);

      // Save to local UI history (not blockchain yet)
      const historyItem: GenerationHistoryItem = {
        id: Date.now().toString(),
        prompt,
        platform,
        contentType,
        tone,
        generatedContent: result,
        timestamp: new Date(),
      };

      setGenerationHistory(prev => [historyItem, ...prev]);

    } catch (error) {
      console.error("Generation error:", error);
      toast({
        title: "Generation failed",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };


  const handleVoiceInput = async () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Speech recognition not supported",
        description: "Your browser doesn't support speech recognition",
        variant: "destructive",
      });
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    if (!isRecording) {
      setIsRecording(true);
      recognition.start();

      recognition.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setPrompt(prev => prev + " " + finalTranscript);
        }
      };

      recognition.onerror = () => {
        toast({
          title: "Speech recognition error",
          description: "There was an error with speech recognition",
          variant: "destructive",
        });
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };
    } else {
      recognition.stop();
      setIsRecording(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = ['image/', 'video/'];
      if (!validTypes.some(type => file.type.startsWith(type))) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image or video file",
          variant: "destructive",
        });
        return;
      }
      setArFile(file);
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded for AR content`,
      });
    }
  };

  const handleSave = async () => {
    try {
      const cid = await uploadToIPFS(generatedContent);
      const actor = await createActorWithIdentity();
      await actor.createContent(prompt, contentType, tone, cid);

      toast({
        title: "Saved",
        description: "Content linked to your identity and stored immutably",
      });
    } catch (err) {
      console.error("Error saving:", err);
      toast({
        title: "Failed",
        description: "Could not save content to blockchain",
        variant: "destructive",
      });
    }
  };



  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: "Copied to clipboard",
      description: "The generated content has been copied to your clipboard",
    });
  };

  const handleShare = () => {
    toast({
      title: "Ready to share",
      description: "Content has been added to your publishing queue",
    });
  };

  const handleTranslate = (translatedText: string, targetLanguage: string) => {
    setGeneratedContent(translatedText);
    toast({
      title: "Content updated",
      description: `Content has been translated and updated`,
    });
  };

  const handleDeleteHistoryItem = (id: string) => {
    setGenerationHistory(prev => prev.filter(item => item.id !== id));
    toast({
      title: "History item deleted",
      description: "The item has been removed from your history",
    });
  };

  const handleUseHistoryItem = (item: GenerationHistoryItem) => {
    setPrompt(item.prompt);
    setPlatform(item.platform);
    setContentType(item.contentType);
    setTone(item.tone);
    setGeneratedContent(item.generatedContent);
    toast({
      title: "Content loaded",
      description: "Previous generation has been loaded",
    });
  };

  const isArContent = ["ar-post", "360-video", "panorama"].includes(contentType);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="generate">Generate Content</TabsTrigger>
          <TabsTrigger value="history">Generation History</TabsTrigger>
          <TabsTrigger value="feed">My On-Chain Feed</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <Card className="cyber-card">
            <CardContent className="pt-6">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="prompt">What would you like to create?</Label>
                  <div className="relative">
                    <Textarea
                      id="prompt"
                      placeholder="E.g., A post about new AI features in our product, focusing on user benefits"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-[100px] bg-renegade-dark border-renegade-green/30 focus:border-renegade-green focus:ring-renegade-green/20 pr-12"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={handleVoiceInput}
                      className={`absolute top-2 right-2 h-8 w-8 p-0 ${isRecording ? 'text-red-500' : 'text-renegade-green'} hover:bg-renegade-green/10`}
                    >
                      {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      <span className="sr-only">{isRecording ? 'Stop recording' : 'Start voice input'}</span>
                    </Button>
                  </div>
                  {isRecording && (
                    <p className="text-sm text-red-500 animate-pulse">🎤 Recording... Speak now</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="platform">Platform</Label>
                    <Select value={platform} onValueChange={setPlatform}>
                      <SelectTrigger className="bg-renegade-dark border-renegade-green/30">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        {platforms.map((p) => (
                          <SelectItem key={p.value} value={p.value}>
                            {p.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content-type">Content Type</Label>
                    <Select value={contentType} onValueChange={setContentType}>
                      <SelectTrigger className="bg-renegade-dark border-renegade-green/30">
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent>
                        {contentTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tone">Tone</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger className="bg-renegade-dark border-renegade-green/30">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="excited">Excited</SelectItem>
                        <SelectItem value="humorous">Humorous</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {isArContent && (
                  <div className="space-y-2">
                    <Label htmlFor="ar-file">Upload AR Content</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFileUpload}
                        className="bg-renegade-dark border-renegade-green/30"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="border-renegade-green/50 text-renegade-green hover:bg-renegade-green/10"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Browse
                      </Button>
                    </div>
                    {arFile && (
                      <p className="text-sm text-renegade-green">✓ {arFile.name} uploaded</p>
                    )}
                  </div>
                )}

                <Button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full bg-renegade-green hover:bg-renegade-green/80 text-black font-medium"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" /> Generate Content
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {generatedContent && (
            <Card className="cyber-card">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Label>Generated Content</Label>
                  <div className="relative">
                    <Textarea
                      value={generatedContent}
                      onChange={(e) => setGeneratedContent(e.target.value)}
                      className="min-h-[180px] bg-renegade-dark border-renegade-green/30"
                      readOnly={false}
                    />
                    <div className="absolute top-2 right-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleCopy}
                        className="h-8 w-8 p-0 text-renegade-green hover:bg-renegade-green/10"
                      >
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy</span>
                      </Button>
                    </div>
                  </div>

                  <GoogleTranslate
                    text={generatedContent}
                    onTranslate={handleTranslate}
                    className="border-t border-renegade-green/20 pt-4"
                  />

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="outline"
                      className="border-renegade-green/50 text-renegade-green hover:bg-renegade-green/10"
                      onClick={handleSave}
                    >
                      <Save className="mr-2 h-4 w-4" /> Save to Blockchain
                    </Button>
                    <Button
                      onClick={handleShare}
                      className="bg-accent hover:bg-accent/80 text-white"
                    >
                      <Share className="mr-2 h-4 w-4" /> Add to Publishing Queue
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history">
          <Card className="cyber-card">
            <CardContent className="pt-6">
              {generationHistory.length === 0 ? (
                <div className="text-center py-8">
                  <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No generation history yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Generated content will appear here after you create it
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Generation History</h3>
                    <Badge variant="secondary">{generationHistory.length} items</Badge>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {generationHistory.map((item) => (
                      <Card key={item.id} className="border-renegade-green/30">
                        <CardContent className="pt-4">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant="outline" className="text-xs">
                                    {platforms.find(p => p.value === item.platform)?.label}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {contentTypes.find(t => t.value === item.contentType)?.label}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {item.tone}
                                  </Badge>
                                </div>
                                <p className="text-sm font-medium text-renegade-green mb-1">
                                  Prompt: {item.prompt}
                                </p>
                                <p className="text-sm text-muted-foreground line-clamp-3">
                                  {item.generatedContent}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 ml-4">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleUseHistoryItem(item)}
                                  className="border-renegade-green/50 text-renegade-green hover:bg-renegade-green/10"
                                >
                                  Use
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDeleteHistoryItem(item.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Generated on {item.timestamp.toLocaleString()}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent><TabsContent value="feed">
          <UserFeed />
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default ContentGenerator;
