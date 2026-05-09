'use client'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { Star } from 'lucide-react'

// Sample data to display in the UI
const sampleShops = [
    {
        id: '1',
        name: 'Pizza Paradise',
        category: 'Italian, Pizza',
        addressCity: 'New York',
        coverImageUrl: PlaceHolderImages.find(img => img.id === 'shop-pizza-cover')?.imageUrl,
        rating: 4.5,
        deliveryTime: '25-30 min'
    },
    {
        id: '2',
        name: 'Burger Bliss',
        category: 'American, Burgers',
        addressCity: 'Los Angeles',
        coverImageUrl: PlaceHolderImages.find(img => img.id === 'shop-burger-cover')?.imageUrl,
        rating: 4.2,
        deliveryTime: '20-25 min'
    },
    {
        id: '3',
        name: 'Sushi Station',
        category: 'Japanese, Sushi',
        addressCity: 'San Francisco',
        coverImageUrl: PlaceHolderImages.find(img => img.id === 'shop-sushi-cover')?.imageUrl,
        rating: 4.8,
        deliveryTime: '35-40 min'
    },
    {
        id: '4',
        name: 'The Fresh Market',
        category: 'Groceries',
        addressCity: 'Chicago',
        coverImageUrl: PlaceHolderImages.find(img => img.id === 'shop-grocery-cover')?.imageUrl,
        rating: 4.6,
        deliveryTime: '45-55 min'
    }
]

export default function ShopsPage() {

    return (
        <div className="h-full bg-muted/20 px-2 md:px-auto md:pl-28">
            <div className="container mx-auto py-6 space-y-6">
                <h1 className="text-3xl font-bold tracking-tight">Restaurants and Stores</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {sampleShops.map(shop => (
                        <Link key={shop.id} href={`/shops/${shop.id}`} passHref>
                            <Card className="hover:shadow-md transition-shadow cursor-pointer overflow-hidden group">
                                <div className="relative aspect-[16/9] overflow-hidden">
                                    <Image 
                                        src={shop.coverImageUrl || `https://picsum.photos/seed/${shop.id}/400/225`} 
                                        alt={shop.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        data-ai-hint="storefront restaurant"
                                    />
                                </div>
                                <CardContent className="p-4 space-y-1">
                                    <h3 className="font-semibold text-lg truncate">{shop.name}</h3>
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span>{shop.rating}</span>
                                        <span className="mx-1">&bull;</span>
                                        <span>{shop.deliveryTime}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground truncate">{shop.category}</p>
                                    <p className="text-sm text-muted-foreground truncate">{shop.addressCity}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

    