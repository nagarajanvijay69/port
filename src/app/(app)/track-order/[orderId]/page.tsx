'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, Phone, Truck } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const deliveryAgent = {
  name: 'Mike Ross',
  avatarId: 'user-jordan', // Using an existing user avatar for sample
  phone: '+1 123 456 7890'
};

export default function TrackOrderPage() {
  const params = useParams();
  const orderId = params.orderId;

  const getImageUrl = (imageId: string) => {
    return PlaceHolderImages.find(img => img.id === imageId)?.imageUrl || `https://picsum.photos/seed/${imageId}/600/400`;
  }
   const getAvatarUrl = (avatarId: string) => {
    return PlaceHolderImages.find(img => img.id === avatarId)?.imageUrl || `https://picsum.photos/seed/${avatarId}/100/100`;
  }

  return (
    <div className="h-full flex flex-col">
        <div className="relative h-3/5 w-full">
            <Image
                src={getImageUrl('map-view')}
                alt="Order tracking map"
                fill
                className="object-cover"
                data-ai-hint="city map"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
             <div className="absolute top-4 left-4">
                <Link href="/profile" className="flex items-center gap-2 text-sm bg-background/80 text-foreground rounded-full px-3 py-1.5 shadow-md">
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Link>
             </div>
        </div>

        <div className="flex-1 -mt-16">
             <div className="container mx-auto max-w-2xl">
                 <Card>
                    <CardHeader>
                        <p className="text-sm text-muted-foreground">Order ID: {orderId}</p>
                        <CardTitle className="flex items-center gap-2">
                           <Truck className="h-6 w-6 text-primary" /> 
                           <span>Out for Delivery</span>
                        </CardTitle>
                        <p className="text-muted-foreground">Estimated arrival: 10-15 minutes</p>
                    </CardHeader>
                    <Separator />
                    <CardContent className="p-4">
                        <p className="font-semibold mb-3">Your Delivery Agent</p>
                        <div className="flex justify-between items-center">
                             <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={getAvatarUrl(deliveryAgent.avatarId)} alt={deliveryAgent.name} />
                                    <AvatarFallback>{deliveryAgent.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{deliveryAgent.name}</p>
                                    <p className="text-xs text-muted-foreground">Delivery Partner</p>
                                </div>
                            </div>
                            <a href={`tel:${deliveryAgent.phone}`} className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20">
                                <Phone className="h-5 w-5" />
                            </a>
                        </div>
                    </CardContent>
                </Card>
             </div>
        </div>
    </div>
  );
}
