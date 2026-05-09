'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const contacts = [
    { id: '1', name: 'Alex', avatarId: 'user-alex' },
    { id: '2', name: 'Sam', avatarId: 'user-sam' },
    { id: '3', name: 'Jamie', avatarId: 'user-jamie' },
    { id: '4', name: 'Taylor', avatarId: 'user-taylor' },
    { id: '5', name: 'Casey', avatarId: 'user-casey' },
    { id: '6', name: 'Jordan', avatarId: 'user-jordan' },
    { id: '7', name: 'Drew', avatarId: 'user-drew' },
    { id: '8', name: 'Reese', avatarId: 'user-reese' },
    { id: '9', name: 'John Warren', avatarId: 'user-alex' },
    { id: '10', name: 'Sam andreson', avatarId: 'user-sam' },
    { id: '11', name: 'Jamie Lannister', avatarId: 'user-jamie' },
    { id: '12', name: 'Taylor Swift', avatarId: 'user-taylor' },
    { id: '13', name: 'Casey Becker', avatarId: 'user-casey' },
    { id: '14', name: 'Jordan Peele', avatarId: 'user-jordan' },
    { id: '15', name: 'Drew Barrymore', avatarId: 'user-drew' },
]

export default function ContactsPage() {
    const getAvatarUrl = (avatarId: string) => {
        return PlaceHolderImages.find(img => img.id === avatarId)?.imageUrl || `https://picsum.photos/seed/${avatarId}/100/100`;
    }
    return (
        <div className="h-full bg-muted/20">
            <div className="container mx-auto py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Contacts</h1>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Add Contact
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                            <DialogTitle>Add New Contact</DialogTitle>
                            <DialogDescription>
                                Enter the details of your new contact below.
                            </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input id="name" placeholder="John Doe" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="phone" className="text-right">
                                        Phone
                                    </Label>
                                    <Input id="phone" placeholder="+91 98765 43210" className="col-span-3" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Save Contact</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {contacts.map(contact => (
                        <Card key={contact.id} className="hover:shadow-lg transition-shadow">
                            <CardContent className="flex flex-col items-center justify-center p-6">
                                <Avatar className="h-24 w-24 mb-4">
                                    <AvatarImage src={getAvatarUrl(contact.avatarId)} alt={contact.name} />
                                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <p className="font-semibold text-lg">{contact.name}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
