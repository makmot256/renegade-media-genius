
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Upload, Eye, Download, Share, Save, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const arContentTypes = [
  { value: "ar-post", label: "AR Post", description: "Interactive AR experience with 3D objects" },
  { value: "360-video", label: "360° Video", description: "Immersive 360-degree video content" },
  { value: "panorama", label: "Panorama Image", description: "Wide-angle panoramic images" },
  { value: "ar-filter", label: "AR Filter", description: "Face or object tracking AR effects" },
  { value: "3d-model", label: "3D Model Viewer", description: "Interactive 3D model showcase" },
];

const platforms = [
  { value: "instagram", label: "Instagram Stories/Reels" },
  { value: "facebook", label: "Facebook AR" },
  { value: "snapchat", label: "Snapchat Lenses" },
  { value: "tiktok", label: "TikTok Effects" },
  { value: "web", label: "Web AR" },
];

const ARContentCreator: React.FC = () => {
  const [description, setDescription] = useState("");
  const [arContentType, setArContentType] = useState("ar-post");
  const [platform, setPlatform] = useState("instagram");
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [arFile, setArFile] = useState<File | null>(null);
  const [generatedContent, setGeneratedContent] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type based on AR content type
      const validTypes = getValidFileTypes(arContentType);
      if (!validTypes.some(type => file.type.startsWith(type))) {
        toast({
          title: "Invalid file type",
          description: `Please upload a ${validTypes.join(", ")} file for ${arContentType}`,
          variant: "destructive",
        });
        return;
      }

      setArFile(file);
      
      // Simulate upload progress
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      toast({
        title: "File uploaded successfully",
        description: `${file.name} is ready for AR content generation`,
      });
    }
  };

  const getValidFileTypes = (type: string): string[] => {
    switch (type) {
      case "360-video":
        return ["video/"];
      case "panorama":
        return ["image/"];
      case "ar-post":
      case "ar-filter":
        return ["image/", "video/"];
      case "3d-model":
        return ["model/", "application/"];
      default:
        return ["image/", "video/"];
    }
  };

  const handleGenerate = async () => {
    if (!description) {
      toast({
        title: "Missing description",
        description: "Please provide a description for your AR content",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedContent("");

    try {
      // Simulate AR content generation
      await new Promise(resolve => setTimeout(resolve, 3000));

      let result = "";
      switch (arContentType) {
        case "ar-post":
          result = `🌟 AR Experience Created! 🌟\n\n${description}\n\nYour AR post is now ready with:\n✨ Interactive 3D elements\n🎮 Touch-responsive animations\n📱 Cross-platform compatibility\n🔄 Real-time rendering\n\nUsers can tap, rotate, and interact with your AR content in real-time!\n\n#AugmentedReality #ARPost #Innovation #InteractiveContent`;
          break;
        case "360-video":
          result = `🎥 360° Video Experience Ready! 🎥\n\n${description}\n\nYour immersive 360° content features:\n🔄 Full spherical view\n📱 Mobile gyroscope support\n🎬 4K resolution quality\n🎯 Hotspot interactions\n\nViewers can look around in all directions for a truly immersive experience!\n\n#360Video #ImmersiveContent #VirtualReality #360Experience`;
          break;
        case "panorama":
          result = `📸 Panoramic Masterpiece Created! 📸\n\n${description}\n\nYour panoramic content includes:\n🌅 Ultra-wide field of view\n📱 Interactive pan & zoom\n🎨 HDR processing\n🔍 Detail preservation\n\nSwipe to explore every detail of this breathtaking panoramic view!\n\n#Panorama #Photography #WideAngle #Landscape`;
          break;
        case "ar-filter":
          result = `🎭 AR Filter Created! 🎭\n\n${description}\n\nYour custom AR filter features:\n👤 Face tracking technology\n✨ Real-time effects\n🎨 Custom animations\n📱 Platform optimized\n\nTry on this amazing AR filter and share your transformed look!\n\n#ARFilter #FaceFilter #AREffects #SocialAR`;
          break;
        case "3d-model":
          result = `🎯 3D Model Viewer Ready! 🎯\n\n${description}\n\nYour 3D model showcase includes:\n🔄 360° rotation controls\n🔍 Zoom & pan functionality\n💡 Dynamic lighting\n📐 Scale adjustments\n\nExplore this detailed 3D model from every angle!\n\n#3DModel #3DViewer #InteractiveContent #3DVisualization`;
          break;
      }

      setGeneratedContent(result);
      
      toast({
        title: "AR Content Generated!",
        description: "Your AR content is ready for publishing",
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Failed to generate AR content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePreview = () => {
    toast({
      title: "AR Preview",
      description: "Opening AR preview in a new window...",
    });
  };

  const handleSave = () => {
    toast({
      title: "AR Content Saved",
      description: "Your AR content has been saved to the blockchain",
    });
  };

  const handleShare = () => {
    toast({
      title: "Ready to Share",
      description: "AR content has been added to your publishing queue",
    });
  };

  const selectedType = arContentTypes.find(type => type.value === arContentType);

  return (
    <div className="space-y-6">
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-renegade-green" />
            AR Content Creator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ar-type">AR Content Type</Label>
              <Select value={arContentType} onValueChange={setArContentType}>
                <SelectTrigger className="bg-renegade-dark border-renegade-green/30">
                  <SelectValue placeholder="Select AR content type" />
                </SelectTrigger>
                <SelectContent>
                  {arContentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedType && (
                <p className="text-sm text-muted-foreground">{selectedType.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ar-platform">Target Platform</Label>
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="ar-description">Content Description</Label>
            <Textarea
              id="ar-description"
              placeholder="Describe your AR experience (e.g., 'A floating 3D logo that users can rotate and interact with')"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] bg-renegade-dark border-renegade-green/30 focus:border-renegade-green focus:ring-renegade-green/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ar-file">Upload AR Asset</Label>
            <div className="flex items-center gap-2">
              <Input
                ref={fileInputRef}
                type="file"
                accept={getValidFileTypes(arContentType).join(",") + "/*"}
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
            
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="space-y-1">
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-sm text-muted-foreground">Uploading... {uploadProgress}%</p>
              </div>
            )}
            
            {arFile && uploadProgress === 100 && (
              <div className="p-3 bg-renegade-green/10 border border-renegade-green/30 rounded-md">
                <p className="text-sm text-renegade-green">✓ {arFile.name} uploaded successfully</p>
                <p className="text-xs text-muted-foreground">Size: {(arFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            )}
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !description}
            className="w-full bg-renegade-green hover:bg-renegade-green/80 text-black font-medium"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating AR Content...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate AR Experience
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedContent && (
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle>Generated AR Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={generatedContent}
              onChange={(e) => setGeneratedContent(e.target.value)}
              className="min-h-[180px] bg-renegade-dark border-renegade-green/30"
            />
            
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={handlePreview}
                variant="outline"
                className="border-renegade-green/50 text-renegade-green hover:bg-renegade-green/10"
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview AR
              </Button>
              <Button
                onClick={handleSave}
                variant="outline"
                className="border-renegade-green/50 text-renegade-green hover:bg-renegade-green/10"
              >
                <Save className="mr-2 h-4 w-4" />
                Save to Blockchain
              </Button>
              <Button
                onClick={handleShare}
                className="bg-accent hover:bg-accent/80 text-white"
              >
                <Share className="mr-2 h-4 w-4" />
                Publish AR Content
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ARContentCreator;
