'use client';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star, Heart, Share2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useState, useMemo } from 'react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import type { Product } from '@/lib/data';

const sampleShopData: any = {
    '1': {
        name: 'Pizza Paradise',
        category: 'Italian, Pizza',
        address: '123 Pizza St, New York, NY',
        rating: 4.5,
        reviews: 250,
        coverImageUrlId: 'shop-pizza-cover',
        logoUrlId: 'shop-pizza-logo',
        products: [
            { id: 'p1', name: 'Margherita Pizza', description: 'Classic mozzarella and basil', price: 12.99, imageUrlId: 'product-pizza-margherita' },
            { id: 'p2', name: 'Pepperoni Pizza', description: 'Loaded with pepperoni', price: 14.99, imageUrlId: 'product-pizza-pepperoni' },
            { id: 'p3', name: 'Garlic Bread', description: 'With mozzarella cheese', price: 6.99, imageUrlId: 'moment-3' },
        ]
    },
    '2': {
        name: 'Burger Bliss',
        category: 'American, Burgers',
        address: '456 Burger Ave, Los Angeles, CA',
        rating: 4.2,
        reviews: 180,
        coverImageUrlId: 'shop-burger-cover',
        logoUrlId: 'shop-burger-logo',
        products: [
            { id: 'b1', name: 'Classic Burger', description: 'Beef patty, lettuce, tomato', price: 9.99, imageUrlId: 'product-burger-classic' },
            { id: 'b2', name: 'Cheeseburger Deluxe', description: 'With extra cheese and bacon', price: 12.50, imageUrlId: 'product-burger-cheese' },
            { id: 'b3', name: 'Fries', description: 'Crispy golden fries', price: 4.50, imageUrlId: 'moment-3' },
        ]
    },
    '3': {
        name: 'Sushi Station',
        category: 'Japanese, Sushi',
        address: '789 Sushi Ln, San Francisco, CA',
        rating: 4.8,
        reviews: 320,
        coverImageUrlId: 'shop-sushi-cover',
        products: [
            { id: 's1', name: 'California Roll', description: 'Crab, avocado, cucumber', price: 8.00, imageUrlId: 'moment-3' },
            { id: 's2', name: 'Spicy Tuna Roll', description: 'Tuna, spicy mayo, cucumber', price: 9.50, imageUrlId: 'moment-3' },
        ]
    },
    '4': {
        name: 'The Fresh Market',
        category: 'Groceries',
        address: '101 Produce Row, Chicago, IL',
        rating: 4.6,
        reviews: 95,
        coverImageUrlId: 'shop-grocery-cover',
        products: [
            { id: 'g1', name: 'Organic Apples', description: 'Per lb', price: 2.99, imageUrlId: 'moment-3' },
            { id: 'g2', name: 'Fresh Baguette', description: 'Baked daily', price: 3.50, imageUrlId: 'moment-3' },
        ]
    }
}

interface CartItem extends Product {
    quantity: number;
}


export default function ShopDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const shopId = params.shopId as string;
    const shop = sampleShopData[shopId];

    const [cart, setCart] = useState<CartItem[]>([]);

    const getImageUrl = (imageId: string) => {
        return PlaceHolderImages.find(img => img.id === imageId)?.imageUrl || `https://picsum.photos/seed/${imageId}/600/400`;
    }

    const handleAddToCart = (product: Product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
        toast({
            title: `${product.name} added to cart!`,
        });
    };

    const handleUpdateQuantity = (productId: string, quantity: number) => {
        setCart(prevCart => {
            if (quantity <= 0) {
                return prevCart.filter(item => item.id !== productId);
            }
            return prevCart.map(item =>
                item.id === productId ? { ...item, quantity } : item
            );
        });
    };

    const cartTotal = useMemo(() => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }, [cart]);

    const totalCartItems = useMemo(() => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    }, [cart]);

    const handleConfirmOrder = () => {
        if (cart.length === 0) {
            toast({
                variant: "destructive",
                title: "Your cart is empty",
                description: "Add items to your cart before placing an order.",
            });
            return;
        }
        // In a real app, this would trigger a checkout process.
        setCart([]);
        toast({
            title: "Order Confirmed!",
            description: "Your order has been placed successfully.",
        });
        router.push('/orders');
    };

    if (!shop) {
        return (
            <div className="container mx-auto py-6">
                <h1 className="text-2xl font-bold">Shop not found</h1>
            </div>
        )
    }

    return (
        <div className="px-2 md:px-auto md:pl-28">
            <Sheet>
                <div className="h-full bg-muted/20 pb-24">
                    <div className="relative h-48 w-full">
                        <Image
                            src={getImageUrl(shop.coverImageUrlId)}
                            alt={shop.name}
                            fill
                            className="object-cover"
                            data-ai-hint="restaurant food"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-4 right-4 flex gap-2">
                            <Button size="icon" variant="secondary" className="rounded-full bg-black/30 text-white border-0 hover:bg-black/50" onClick={() => toast({ title: "Added to favorites!" })}>
                                <Heart className="h-5 w-5" />
                            </Button>
                            <Button size="icon" variant="secondary" className="rounded-full bg-black/30 text-white border-0 hover:bg-black/50" onClick={() => toast({ title: "Link copied!" })}>
                                <Share2 className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    <div className="container mx-auto -mt-12">
                        <div className="bg-background rounded-lg shadow-lg p-6">
                            <h1 className="text-3xl font-bold">{shop.name}</h1>
                            <p className="text-muted-foreground mt-1">{shop.category}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span>{shop.rating} ({shop.reviews}+ ratings)</span>
                                </div>
                                <span>&bull;</span>
                                <p>{shop.address}</p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-2xl font-bold mb-4">Menu</h2>
                            <div className="space-y-4">
                                {shop.products.map((product: any) => (
                                    <Card key={product.id} className="overflow-hidden">
                                        <CardContent className="p-0 flex">
                                            <div className="flex-1 p-4">
                                                <h3 className="font-semibold">{product.name}</h3>
                                                <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                                                <p className="font-bold mt-2">${product.price.toFixed(2)}</p>
                                            </div>
                                            <div className="relative w-32 h-32 flex-shrink-0">
                                                <Image
                                                    src={getImageUrl(product.imageUrlId)}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                    data-ai-hint="food item"
                                                />
                                                <Button size="icon" className="absolute bottom-2 right-2 rounded-full h-8 w-8" onClick={() => handleAddToCart(product)}>
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {totalCartItems > 0 && (
                    <SheetTrigger asChild>
                        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-20">
                            <Button className="w-full h-14 text-lg rounded-xl shadow-lg">
                                <ShoppingCart className="mr-3 h-6 w-6" />
                                View Cart ({totalCartItems} items)
                                <span className="ml-auto font-bold">${cartTotal.toFixed(2)}</span>
                            </Button>
                        </div>
                    </SheetTrigger>
                )}

                <SheetContent side="bottom" className="h-4/5 flex flex-col rounded-t-2xl">
                    <SheetHeader className="p-4 border-b">
                        <SheetTitle className="text-center">My Cart</SheetTitle>
                    </SheetHeader>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {cart.map(item => (
                            <div key={item.id} className="flex items-center gap-4">
                                <Image
                                    src={getImageUrl(item.imageUrlId)}
                                    alt={item.name}
                                    width={64}
                                    height={64}
                                    className="rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm font-bold">${item.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center gap-2 border rounded-lg p-1">
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-6 text-center font-bold">{item.quantity}</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                        {cart.length === 0 && (
                            <div className="text-center text-muted-foreground py-10">
                                <ShoppingCart className="mx-auto h-12 w-12" />
                                <p className="mt-4">Your cart is empty</p>
                            </div>
                        )}
                    </div>
                    <Separator />
                    <SheetFooter className="p-4 bg-background">
                        <div className="w-full space-y-4">
                            <div className="flex justify-between items-center font-bold text-lg">
                                <span>Total</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <SheetClose asChild>
                                <Button className="w-full h-12 text-lg" onClick={handleConfirmOrder}>Confirm Order</Button>
                            </SheetClose>
                        </div>
                    </SheetFooter>
                </SheetContent>

            </Sheet>
        </div>
    )
}
