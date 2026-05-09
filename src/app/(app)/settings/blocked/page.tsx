'use client';
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useToast } from "@/hooks/use-toast";

const blockedContactsData = [
    { id: '1', name: 'Casey Becker', avatarId: 'user-casey' },
    { id: '2', name: 'Jordan Peele', avatarId: 'user-jordan' },
]

export default function BlockedContactsPage() {
    const { toast } = useToast();
    const getAvatarUrl = (avatarId: string) => {
        return PlaceHolderImages.find(img => img.id === avatarId)?.imageUrl || `https://picsum.photos/seed/${avatarId}/100/100`;
    }

    const handleUnblock = (name: string) => {
        toast({
            title: "Contact Unblocked",
            description: `${name} has been unblocked.`,
        });
        // In a real app, you'd update the state here.
    }

    return (
        <div className="h-full bg-muted/20">
            <div className="container mx-auto py-6 max-w-2xl space-y-8">
                <div className="flex items-center gap-4">
                    <Link href="/settings" className="p-2 rounded-full hover:bg-muted">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-2xl font-bold">Blocked Contacts</h1>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Manage Blocked Contacts</CardTitle>
                        <CardDescription>
                            People on this list will not be able to contact you.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {blockedContactsData.length > 0 ? (
                            <ul className="divide-y">
                                {blockedContactsData.map(contact => (
                                    <li key={contact.id} className="flex items-center justify-between py-4">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={getAvatarUrl(contact.avatarId)} alt={contact.name} />
                                                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <p className="font-semibold">{contact.name}</p>
                                        </div>
                                        <Button variant="outline" onClick={() => handleUnblock(contact.name)}>Unblock</Button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-muted-foreground text-center py-8">You haven't blocked anyone.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
