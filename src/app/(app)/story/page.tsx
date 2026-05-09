'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Camera, Plus } from "lucide-react";
import { useRef } from "react";
import { useToast } from "@/hooks/use-toast";

const recentUpdates = [
    { id: '1', name: 'Alex', avatarId: 'user-alex', time: '15 minutes ago' },
    { id: '2', name: 'Sam', avatarId: 'user-sam', time: '2 hours ago' },
];

const viewedUpdates = [
    { id: '3', name: 'Jamie', avatarId: 'user-jamie', time: 'Today, 9:23 AM' },
    { id: '4', name: 'Taylor', avatarId: 'user-taylor', time: 'Yesterday, 8:00 PM' },
];

export default function StoryPage() {
    const { toast } = useToast();
    const getAvatarUrl = (avatarId: string) => {
        return PlaceHolderImages.find(img => img.id === avatarId)?.imageUrl || `https://picsum.photos/seed/${avatarId}/100/100`;
    }
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAddStoryClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            // In a real app, you would navigate to a story editor page
            // with the selected image/video to add a description and post.
            toast({
                title: "Story Upload",
                description: `${file.name} selected. Ready for editing!`,
            })
        }
    };


    return (
        <div className="h-full bg-muted/20">
            <div className="container mx-auto py-6 max-w-md px-2 md:px-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Stories</h1>
                    <Button variant="ghost" size="icon" onClick={handleAddStoryClick}>
                        <Camera className="h-6 w-6" />
                    </Button>
                </div>
                <div 
                    className="flex items-center gap-4 p-4 bg-background rounded-lg shadow-sm cursor-pointer hover:bg-muted/50"
                    onClick={handleAddStoryClick}
                >
                     <div className="relative">
                        <Avatar className="h-14 w-14">
                            <AvatarImage src={getAvatarUrl('user-drew')} alt="My Story" />
                            <AvatarFallback>M</AvatarFallback>
                        </Avatar>
                        <div className="absolute bottom-0 right-0 flex items-center justify-center w-6 h-6 bg-primary rounded-full border-2 border-background text-primary-foreground">
                            <Plus className="w-4 h-4" />
                        </div>
                     </div>
                    <div className="flex-1">
                        <p className="font-semibold">My Story</p>
                        <p className="text-sm text-muted-foreground">Tap to add a story</p>
                    </div>
                    <input 
                        type="file" 
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="mt-6">
                    <h2 className="text-sm font-semibold text-muted-foreground px-4 mb-2">RECENT UPDATES</h2>
                    <div className="bg-background rounded-lg shadow-sm overflow-hidden">
                        {recentUpdates.map((update, index) => (
                            <div key={update.id}>
                                <div className="flex items-center gap-4 p-4 hover:bg-muted/50 cursor-pointer">
                                    <Avatar className="h-14 w-14 border-2 border-primary">
                                        <AvatarImage src={getAvatarUrl(update.avatarId)} alt={update.name} />
                                        <AvatarFallback>{update.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <p className="font-semibold">{update.name}</p>
                                        <p className="text-sm text-muted-foreground">{update.time}</p>
                                    </div>
                                </div>
                                {index < recentUpdates.length - 1 && <Separator />}
                            </div>
                        ))}
                    </div>
                </div>

                 <div className="mt-6">
                    <h2 className="text-sm font-semibold text-muted-foreground px-4 mb-2">VIEWED UPDATES</h2>
                    <div className="bg-background rounded-lg shadow-sm overflow-hidden">
                        {viewedUpdates.map((update, index) => (
                            <div key={update.id}>
                                <div className="flex items-center gap-4 p-4 hover:bg-muted/50 cursor-pointer">
                                    <Avatar className="h-14 w-14 border-2 border-border">
                                        <AvatarImage src={getAvatarUrl(update.avatarId)} alt={update.name} />
                                        <AvatarFallback>{update.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <p className="font-semibold">{update.name}</p>
                                        <p className="text-sm text-muted-foreground">{update.time}</p>
                                    </div>
                                </div>
                                {index < viewedUpdates.length - 1 && <Separator />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
