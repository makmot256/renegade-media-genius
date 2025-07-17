
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Plus, Edit, Trash2, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScheduledContent {
  id: string;
  title: string;
  content: string;
  platform: string;
  date: Date;
  time: string;
  status: "scheduled" | "published" | "failed";
}

const ContentScheduler: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState("");
  const [time, setTime] = useState("");
  const [scheduledContent, setScheduledContent] = useState<ScheduledContent[]>([
    {
      id: "1",
      title: "Product Launch Announcement",
      content: "🚀 Exciting news! Our new AI-powered content generator is now live...",
      platform: "twitter",
      date: new Date(),
      time: "14:30",
      status: "scheduled"
    },
    {
      id: "2",
      title: "Weekly Newsletter",
      content: "📧 This week's highlights in AI and blockchain technology...",
      platform: "linkedin",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000),
      time: "09:00",
      status: "scheduled"
    }
  ]);
  const { toast } = useToast();

  const platforms = [
    { value: "twitter", label: "X / Twitter" },
    { value: "instagram", label: "Instagram" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "facebook", label: "Facebook" },
    { value: "tiktok", label: "TikTok" }
  ];

  const handleScheduleContent = () => {
    if (!title || !content || !platform || !selectedDate || !time) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newContent: ScheduledContent = {
      id: Date.now().toString(),
      title,
      content,
      platform,
      date: selectedDate,
      time,
      status: "scheduled"
    };

    setScheduledContent([...scheduledContent, newContent]);
    setShowAddForm(false);
    setTitle("");
    setContent("");
    setPlatform("");
    setTime("");
    
    toast({
      title: "Content scheduled",
      description: `Your content has been scheduled for ${format(selectedDate, "PPP")} at ${time}`,
    });
  };

  const handleDeleteContent = (id: string) => {
    setScheduledContent(scheduledContent.filter(item => item.id !== id));
    toast({
      title: "Content deleted",
      description: "Scheduled content has been removed",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-blue-500";
      case "published": return "bg-green-500";
      case "failed": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "twitter": return "bg-blue-400";
      case "instagram": return "bg-pink-500";
      case "linkedin": return "bg-blue-700";
      case "facebook": return "bg-blue-600";
      case "tiktok": return "bg-black";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-renegade-green" />
            Content Calendar
          </CardTitle>
          <CardDescription>
            Schedule and manage your content across all platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Calendar</h3>
                <Button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-renegade-green hover:bg-renegade-green/80 text-black"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Content
                </Button>
              </div>
              
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border border-renegade-green/30 pointer-events-auto"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Scheduled Content</h3>
              
              {showAddForm && (
                <Card className="border-renegade-green/30">
                  <CardHeader>
                    <CardTitle className="text-base">Schedule New Content</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Content title"
                        className="bg-renegade-dark border-renegade-green/30"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your content here..."
                        className="bg-renegade-dark border-renegade-green/30"
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
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
                        <Label htmlFor="time">Time</Label>
                        <Input
                          id="time"
                          type="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="bg-renegade-dark border-renegade-green/30"
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={handleScheduleContent}
                        className="bg-renegade-green hover:bg-renegade-green/80 text-black"
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        Schedule
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowAddForm(false)}
                        className="border-renegade-green/50 text-renegade-green hover:bg-renegade-green/10"
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {scheduledContent.map((item) => (
                  <Card key={item.id} className="border-renegade-green/30">
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">{item.title}</h4>
                          <div className="flex items-center gap-2">
                            <Badge className={cn("text-xs", getPlatformColor(item.platform))}>
                              {platforms.find(p => p.value === item.platform)?.label}
                            </Badge>
                            <Badge className={cn("text-xs", getStatusColor(item.status))}>
                              {item.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {item.content}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>
                            {format(item.date, "MMM d, yyyy")} at {item.time}
                          </span>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteContent(item.id)}
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentScheduler;
