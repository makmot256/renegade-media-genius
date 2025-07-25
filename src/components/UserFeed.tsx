import React, { useEffect, useState } from "react";
import { fetchUserContent } from "@/lib/queries/fetchUserContent";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const UserFeed: React.FC = () => {
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        const load = async () => {
            const content = await fetchUserContent();
            setPosts(content);
        };
        load();
    }, []);

    if (posts.length === 0) {
        return <p className="text-muted text-center py-6">No on-chain posts yet</p>;
    }

    return (
        <div className="space-y-4">
            {posts.map((post, idx) => (
                <Card key={idx} className="border border-renegade-green/30">
                    <CardContent className="pt-4 space-y-2">
                        <Label className="text-sm">
                            {post.contentType} • {post.tone}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                            Prompt: {post.prompt}
                        </p>
                        <p className="text-sm text-renegade-green">
                            IPFS CID: <a
                                href={`https://ipfs.io/ipfs/${post.cid}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                {post.cid}
                            </a>
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Published: {new Date(Number(post.createdAt) / 1_000_000).toLocaleString()}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default UserFeed;
