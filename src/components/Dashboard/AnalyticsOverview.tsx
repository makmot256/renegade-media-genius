import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, Users, TrendingUp, BarChart2, MessageSquare, Brain, Target, ThumbsUp, ThumbsDown, Heart } from "lucide-react";

const AnalyticsOverview: React.FC = () => {
  const [trendPeriod, setTrendPeriod] = useState("7d");
  const [commentsPeriod, setCommentsPeriod] = useState("30d");

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid grid-cols-6">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="engagement">Engagement</TabsTrigger>
        <TabsTrigger value="audience">Audience</TabsTrigger>
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
        <TabsTrigger value="comments">Comment Analysis</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <Card className="cyber-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Engagement</CardTitle>
              <Activity className="h-4 w-4 text-renegade-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,840</div>
              <p className="text-xs text-muted-foreground">
                +15.8% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="cyber-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Followers</CardTitle>
              <Users className="h-4 w-4 text-renegade-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+249</div>
              <p className="text-xs text-muted-foreground">
                +10.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="cyber-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reach</CardTitle>
              <TrendingUp className="h-4 w-4 text-renegade-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">34.2K</div>
              <p className="text-xs text-muted-foreground">
                +25.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="cyber-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Impressions</CardTitle>
              <BarChart2 className="h-4 w-4 text-renegade-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78.4K</div>
              <p className="text-xs text-muted-foreground">
                +22.3% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="cyber-card">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>
              Your content performance across platforms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground mb-2">Analytics chart will display here</p>
                <div className="w-full h-[200px] bg-renegade-dark rounded-md border border-renegade-green/30 flex items-center justify-center">
                  <p className="text-renegade-green">Performance Chart</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle>Top Performing Content</CardTitle>
              <CardDescription>
                Your most engaging posts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b border-renegade-green/20 pb-2">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">X / Twitter post</div>
                    <div className="text-renegade-green">2.4K engagements</div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    "Just discovered @RENEGADE_ICP - an AI content generator..."
                  </div>
                </div>
                <div className="border-b border-renegade-green/20 pb-2">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">Instagram post</div>
                    <div className="text-renegade-green">1.8K engagements</div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    "✨ INNOVATION ALERT ✨ Taking my content game..."
                  </div>
                </div>
                <div className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">LinkedIn article</div>
                    <div className="text-renegade-green">856 engagements</div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    "🚀 Exciting Web3 Innovation 🚀 I'm thrilled..."
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cyber-card">
            <CardHeader>
              <CardTitle>Platform Breakdown</CardTitle>
              <CardDescription>
                Performance by social platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-renegade-green mr-2"></div>
                      <span>X / Twitter</span>
                    </div>
                    <span>42%</span>
                  </div>
                  <div className="w-full bg-renegade-green/20 rounded-full h-2">
                    <div className="bg-renegade-green h-2 rounded-full" style={{ width: "42%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-accent mr-2"></div>
                      <span>Instagram</span>
                    </div>
                    <span>28%</span>
                  </div>
                  <div className="w-full bg-renegade-green/20 rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: "28%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      <span>LinkedIn</span>
                    </div>
                    <span>18%</span>
                  </div>
                  <div className="w-full bg-renegade-green/20 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "18%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                      <span>Others</span>
                    </div>
                    <span>12%</span>
                  </div>
                  <div className="w-full bg-renegade-green/20 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: "12%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="engagement">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle>Engagement Analytics</CardTitle>
            <CardDescription>Detailed breakdown of your audience engagement</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">Engagement analytics will be shown here</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="audience">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle>Audience Demographics</CardTitle>
            <CardDescription>Understand who is engaging with your content</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">Audience demographic data will be shown here</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="content">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle>Content Performance</CardTitle>
            <CardDescription>Analysis of your content strategy effectiveness</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">Content performance metrics will be shown here</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="trends" className="space-y-4">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-renegade-green" />
              Data-Driven Trend Analysis
            </CardTitle>
            <CardDescription>
              AI-powered analysis of emerging trends and content opportunities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Select value={trendPeriod} onValueChange={setTrendPeriod}>
                <SelectTrigger className="w-40 bg-renegade-dark border-renegade-green/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline"
                className="border-renegade-green/50 text-renegade-green hover:bg-renegade-green/10"
              >
                <Target className="h-4 w-4 mr-2" />
                Refresh Analysis
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border border-renegade-green/30">
                <CardHeader>
                  <CardTitle className="text-lg">Trending Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">#AugmentedReality</div>
                        <div className="text-sm text-muted-foreground">Tech & Innovation</div>
                      </div>
                      <div className="text-right">
                        <div className="text-renegade-green font-medium">+245%</div>
                        <div className="text-xs text-muted-foreground">trending up</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">#Web3Content</div>
                        <div className="text-sm text-muted-foreground">Blockchain & Web3</div>
                      </div>
                      <div className="text-right">
                        <div className="text-renegade-green font-medium">+189%</div>
                        <div className="text-xs text-muted-foreground">trending up</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">#AIGenerated</div>
                        <div className="text-sm text-muted-foreground">Artificial Intelligence</div>
                      </div>
                      <div className="text-right">
                        <div className="text-renegade-green font-medium">+156%</div>
                        <div className="text-xs text-muted-foreground">trending up</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-renegade-green/30">
                <CardHeader>
                  <CardTitle className="text-lg">Content Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 rounded border border-renegade-green/20 bg-renegade-green/5">
                      <div className="font-medium">360° Video Content</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        High engagement potential in your niche
                      </div>
                      <div className="text-xs text-renegade-green mt-2">Recommendation Score: 94%</div>
                    </div>
                    <div className="p-3 rounded border border-renegade-green/20 bg-renegade-green/5">
                      <div className="font-medium">Interactive AR Posts</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Emerging trend with low competition
                      </div>
                      <div className="text-xs text-renegade-green mt-2">Recommendation Score: 87%</div>
                    </div>
                    <div className="p-3 rounded border border-renegade-green/20 bg-renegade-green/5">
                      <div className="font-medium">Voice-First Content</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Growing audience engagement format
                      </div>
                      <div className="text-xs text-renegade-green mt-2">Recommendation Score: 82%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border border-renegade-green/30">
              <CardHeader>
                <CardTitle className="text-lg">Trend Predictions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] bg-renegade-dark rounded-md border border-renegade-green/30 flex items-center justify-center">
                  <p className="text-renegade-green">AI Trend Prediction Chart</p>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="comments" className="space-y-4">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-renegade-green" />
              Comment Analysis
            </CardTitle>
            <CardDescription>
              AI-powered sentiment analysis and engagement insights from comments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Select value={commentsPeriod} onValueChange={setCommentsPeriod}>
                <SelectTrigger className="w-40 bg-renegade-dark border-renegade-green/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline"
                className="border-renegade-green/50 text-renegade-green hover:bg-renegade-green/10"
              >
                <Brain className="h-4 w-4 mr-2" />
                Analyze Comments
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border border-green-500/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4 text-green-500" />
                    Positive
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">68%</div>
                  <div className="text-sm text-muted-foreground">2,456 comments</div>
                </CardContent>
              </Card>

              <Card className="border border-yellow-500/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Heart className="h-4 w-4 text-yellow-500" />
                    Neutral
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-500">24%</div>
                  <div className="text-sm text-muted-foreground">867 comments</div>
                </CardContent>
              </Card>

              <Card className="border border-red-500/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ThumbsDown className="h-4 w-4 text-red-500" />
                    Negative
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-500">8%</div>
                  <div className="text-sm text-muted-foreground">289 comments</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border border-renegade-green/30">
                <CardHeader>
                  <CardTitle className="text-lg">Top Keywords</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">innovative</span>
                      <span className="text-renegade-green">342 mentions</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">amazing</span>
                      <span className="text-renegade-green">298 mentions</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">helpful</span>
                      <span className="text-renegade-green">276 mentions</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">future</span>
                      <span className="text-renegade-green">234 mentions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-renegade-green/30">
                <CardHeader>
                  <CardTitle className="text-lg">Engagement Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Response Rate</span>
                        <span>87%</span>
                      </div>
                      <div className="w-full bg-renegade-green/20 rounded-full h-2">
                        <div className="bg-renegade-green h-2 rounded-full" style={{ width: "87%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Average Response Time</span>
                        <span>2.3 hours</span>
                      </div>
                      <div className="w-full bg-renegade-green/20 rounded-full h-2">
                        <div className="bg-renegade-green h-2 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Comment Quality Score</span>
                        <span>94%</span>
                      </div>
                      <div className="w-full bg-renegade-green/20 rounded-full h-2">
                        <div className="bg-renegade-green h-2 rounded-full" style={{ width: "94%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AnalyticsOverview;
