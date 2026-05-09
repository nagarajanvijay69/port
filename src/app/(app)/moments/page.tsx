'use client';
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Heart, MessageCircle, MoreHorizontal, Plus, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react";

type Moment = {
    id: string;
    user: { name: string; avatarId: string; };
    image: { id: string; hint: string; };
    caption: string;
};

const followingMoments: Moment[] = [
    {
        id: '1',
        user: { name: 'Sam', avatarId: 'user-sam' },
        image: { id: 'moment-1', hint: 'nature landscape'},
        caption: 'Beautiful hike this morning! 🌲☀️'
    },
    {
        id: '2',
        user: { name: 'Alex', avatarId: 'user-alex' },
        image: { id: 'moment-2', hint: 'city architecture' },
        caption: 'Exploring the city streets.'
    },
    {
        id: '3',
        user: { name: 'Jamie', avatarId: 'user-jamie' },
        image: { id: 'moment-3', hint: 'food delicious' },
        caption: 'Best pizza I\'ve had in a while!'
    },
    {
        id: '4',
        user: { name: 'Casey', avatarId: 'user-casey' },
        image: { id: 'moment-4', hint: 'cute animal' },
        caption: 'My new best friend! 🐶'
    }
];

const myMoments: Moment[] = [
    {
        id: 'my-1',
        user: { name: 'Drew', avatarId: 'user-drew' },
        image: { id: 'my-moment-beach', hint: 'beach sunset' },
        caption: 'Sunset at the beach was breathtaking.'
    },
    {
        id: 'my-2',
        user: { name: 'Drew', avatarId: 'user-drew' },
        image: { id: 'my-moment-coffee', hint: 'coffee art' },
        caption: 'Morning coffee art.'
    }
];

const MomentCard = ({ moment }: { moment: Moment }) => {
    const { toast } = useToast();
    const getImageUrl = (imageId: string) => {
        return PlaceHolderImages.find(img => img.id === imageId)?.imageUrl || `https://picsum.photos/seed/${imageId}/600/400`;
    }
    const getAvatarUrl = (avatarId: string) => {
        return PlaceHolderImages.find(img => img.id === avatarId)?.imageUrl || `https://picsum.photos/seed/${avatarId}/100/100`;
    }
    
    return (
         <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={getAvatarUrl(moment.user.avatarId)} alt={moment.user.name} />
                            <AvatarFallback>{moment.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className="font-semibold">{moment.user.name}</p>
                    </div>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-5 w-5" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="relative aspect-square">
                    <Image
                        src={getImageUrl(moment.image.id)}
                        alt={moment.caption}
                        fill
                        className="object-cover"
                        data-ai-hint={moment.image.hint}
                    />
                </div>
                <div className="p-4 space-y-2">
                    <p>{moment.caption}</p>
                </div>
            </CardContent>
            <CardFooter className="py-2 px-4 border-t">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => toast({ title: "Liked!" })}>
                        <Heart className="mr-2 h-4 w-4" />
                        Like
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => toast({ title: "Comment clicked" })}>
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Comment
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
};

export default function MomentsPage() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const { toast } = useToast();
    const [open, setOpen] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImagePreview(URL.createObjectURL(file));
        }
    };
    
    const handlePostMoment = (event: React.FormEvent) => {
        event.preventDefault();
        // In a real app, you'd handle the form submission here,
        // uploading the image and saving the moment data.
        toast({
            title: "Moment Posted!",
            description: "Your new moment is now live.",
        });
        setOpen(false); // Close dialog
        setImagePreview(null); // Reset preview
    }

    return (
        <div className="h-full bg-muted/20 px-2 md:px-auto">
            <div className="container mx-auto py-6 max-w-md space-y-6">
                 <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Moments</h1>
                    <Dialog open={open} onOpenChange={(isOpen) => { setOpen(isOpen); if (!isOpen) setImagePreview(null); }}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Create Moment
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <form onSubmit={handlePostMoment}>
                                <DialogHeader>
                                    <DialogTitle>Create a new Moment</DialogTitle>
                                    <DialogDescription>
                                        Share a photo with a caption to your followers.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="moment-photo">Photo</Label>
                                        <Input id="moment-photo" type="file" accept="image/*" onChange={handleFileChange} required />
                                    </div>
                                    {imagePreview && (
                                        <div className="relative aspect-square w-full rounded-md overflow-hidden border">
                                            <Image src={imagePreview} alt="Image preview" fill className="object-cover" />
                                        </div>
                                    )}
                                    <div className="space-y-2">
                                        <Label htmlFor="moment-caption">Caption</Label>
                                        <Textarea id="moment-caption" placeholder="Write something..." required />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button" variant="secondary">Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit">Post Moment</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <Tabs defaultValue="following" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="following">Following</TabsTrigger>
                        <TabsTrigger value="you">My Posts</TabsTrigger>
                    </TabsList>
                    <TabsContent value="following" className="space-y-6 pt-6">
                        {followingMoments.map(moment => (
                            <MomentCard key={moment.id} moment={moment} />
                        ))}
                         {followingMoments.length === 0 && (
                            <div className="text-center text-muted-foreground py-10">
                                <Camera className="mx-auto h-12 w-12" />
                                <p className="mt-4">When people you follow post moments, you'll see them here.</p>
                            </div>
                        )}
                    </TabsContent>
                    <TabsContent value="you" className="space-y-6 pt-6">
                        {myMoments.map(moment => (
                           <MomentCard key={moment.id} moment={moment} />
                        ))}
                        {myMoments.length === 0 && (
                            <div className="text-center text-muted-foreground py-10">
                                <Camera className="mx-auto h-12 w-12" />
                                <p className="mt-4">You haven't posted any moments yet.</p>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
