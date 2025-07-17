
import React, { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, Shield, AlertTriangle, CheckCircle, Eye, Video, Image } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface DetectionResult {
  confidence: number;
  isDeepfake: boolean;
  detectionMethod: string;
  timestamp: string;
}

const DeepfakeDetection: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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
      
      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 50MB",
          variant: "destructive",
        });
        return;
      }

      setUploadedFile(file);
      setDetectionResult(null);
      toast({
        title: "File uploaded",
        description: `${file.name} is ready for analysis`,
      });
    }
  };

  const analyzeFile = async () => {
    if (!uploadedFile) {
      toast({
        title: "No file selected",
        description: "Please upload a file first",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      // Simulate API call for deepfake detection
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock detection result
      const mockResult: DetectionResult = {
        confidence: Math.random() > 0.7 ? 92.5 : 15.3,
        isDeepfake: Math.random() > 0.7,
        detectionMethod: "Neural Network Analysis + Facial Landmarks",
        timestamp: new Date().toISOString(),
      };

      setDetectionResult(mockResult);
      setAnalysisProgress(100);
      
      toast({
        title: "Analysis complete",
        description: mockResult.isDeepfake 
          ? "Potential deepfake detected" 
          : "Content appears authentic",
        variant: mockResult.isDeepfake ? "destructive" : "default",
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing the file",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
      clearInterval(progressInterval);
    }
  };

  const resetAnalysis = () => {
    setUploadedFile(null);
    setDetectionResult(null);
    setAnalysisProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-renegade-green" />
            Deepfake Detection System
          </CardTitle>
          <CardDescription>
            Upload images or videos to detect AI-generated or manipulated content using advanced neural network analysis.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="upload">Upload & Analyze</TabsTrigger>
              <TabsTrigger value="results">Detection History</TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="file-upload">Upload Media File</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      ref={fileInputRef}
                      id="file-upload"
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                      className="bg-renegade-dark border-renegade-green/30"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="border-renegade-green/50 text-renegade-green hover:bg-renegade-green/10"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Browse
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Supported formats: JPG, PNG, MP4, MOV (Max 50MB)
                  </p>
                </div>

                {uploadedFile && (
                  <Alert>
                    <Eye className="h-4 w-4" />
                    <AlertDescription>
                      <strong>{uploadedFile.name}</strong> ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB) ready for analysis
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-2">
                  <Button
                    onClick={analyzeFile}
                    disabled={!uploadedFile || isAnalyzing}
                    className="bg-renegade-green hover:bg-renegade-green/80 text-black font-medium"
                  >
                    {isAnalyzing ? (
                      <>
                        <Shield className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Shield className="mr-2 h-4 w-4" />
                        Start Analysis
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={resetAnalysis}
                    disabled={isAnalyzing}
                    className="border-renegade-green/50 text-renegade-green hover:bg-renegade-green/10"
                  >
                    Reset
                  </Button>
                </div>

                {isAnalyzing && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Analysis Progress</span>
                      <span>{analysisProgress}%</span>
                    </div>
                    <Progress value={analysisProgress} className="w-full" />
                    <p className="text-sm text-muted-foreground">
                      Running neural network detection algorithms...
                    </p>
                  </div>
                )}

                {detectionResult && (
                  <Card className="border-l-4 border-l-renegade-green">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          {detectionResult.isDeepfake ? (
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                          ) : (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                          <h3 className="font-semibold">
                            {detectionResult.isDeepfake ? "Deepfake Detected" : "Authentic Content"}
                          </h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium">Confidence Score</Label>
                            <div className="flex items-center gap-2 mt-1">
                              <Progress 
                                value={detectionResult.confidence} 
                                className="flex-1" 
                              />
                              <span className="text-sm font-medium">
                                {detectionResult.confidence.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-sm font-medium">Detection Method</Label>
                            <p className="text-sm text-muted-foreground mt-1">
                              {detectionResult.detectionMethod}
                            </p>
                          </div>
                        </div>

                        <Alert variant={detectionResult.isDeepfake ? "destructive" : "default"}>
                          <AlertDescription>
                            {detectionResult.isDeepfake
                              ? "This content shows signs of AI manipulation or generation. Please verify the source and authenticity before sharing."
                              : "This content appears to be authentic with no signs of AI manipulation detected."
                            }
                          </AlertDescription>
                        </Alert>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="results">
              <Card className="cyber-card">
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Your detection history will appear here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeepfakeDetection;
