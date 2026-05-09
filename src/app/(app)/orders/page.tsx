'use client'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Package, Truck, XCircle, CreditCard } from "lucide-react";
import Link from "next/link";

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'Delivered':
            return <CheckCircle2 className="h-5 w-5 text-green-500" />;
        case 'Out for Delivery':
            return <Truck className="h-5 w-5 text-blue-500" />;
        case 'Cancelled':
            return <XCircle className="h-5 w-5 text-red-500" />;
        case 'Confirmed':
        case 'Preparing':
            return <Package className="h-5 w-5 text-amber-500" />;
        default:
            return <Package className="h-5 w-5 text-muted-foreground" />;
    }
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Delivered':
            return "bg-green-100 text-green-800";
        case 'Out for Delivery':
            return "bg-blue-100 text-blue-800";
        case 'Cancelled':
            return "bg-red-100 text-red-800";
        case 'Confirmed':
        case 'Preparing':
            return "bg-amber-100 text-amber-800";
        default:
            return "bg-muted text-muted-foreground";
    }
}

const sampleOrders = [
    {
        id: 'ORD001',
        shopName: 'Pizza Paradise',
        shopImageId: 'shop-pizza-logo',
        date: 'July 28, 2024',
        status: 'Delivered',
        total: 25.99,
        paymentMethod: 'Credit Card',
        items: [
            { name: 'Margherita Pizza', quantity: 1, imageId: 'product-pizza-margherita' },
            { name: 'Coke', quantity: 2 },
        ]
    },
    {
        id: 'ORD002',
        shopName: 'Burger Bliss',
        shopImageId: 'shop-burger-logo',
        date: 'July 27, 2024',
        status: 'Cancelled',
        total: 15.50,
        paymentMethod: 'COD',
        items: [
            { name: 'Classic Burger', quantity: 1, imageId: 'product-burger-classic' },
        ]
    },
    {
        id: 'ORD003',
        shopName: 'Pizza Paradise',
        shopImageId: 'shop-pizza-logo',
        date: 'July 29, 2024',
        status: 'Out for Delivery',
        total: 35.00,
        paymentMethod: 'UPI',
        items: [
            { name: 'Pepperoni Pizza', quantity: 1, imageId: 'product-pizza-pepperoni' },
            { name: 'Garlic Bread', quantity: 1 },
            { name: 'Sprite', quantity: 1 },
        ]
    },
    {
        id: 'ORD004',
        shopName: 'Sushi Station',
        shopImageId: 'shop-sushi-cover',
        date: 'July 26, 2024',
        status: 'Delivered',
        total: 17.50,
        paymentMethod: 'Credit Card',
        items: [
            { name: 'California Roll', quantity: 1, imageId: 'moment-3' },
            { name: 'Spicy Tuna Roll', quantity: 1, imageId: 'moment-3' },
        ]
    }
]

export default function OrdersPage() {

    const getImageUrl = (imageId: string) => {
        const image = PlaceHolderImages.find(img => img.id === imageId);
        return image?.imageUrl || `https://picsum.photos/seed/${imageId}/100/100`;
    }

    return (
        <div className="h-full bg-muted/20 px-2 md:px-auto md:pl-28">
            <div className="container mx-auto py-6 max-w-2xl space-y-6">
                <h1 className="text-2xl font-bold">My Orders</h1>
                
                {sampleOrders.map(order => (
                    <Card key={order.id}>
                        <CardHeader className="p-4">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-4">
                                    <Image
                                        src={getImageUrl(order.shopImageId || 'shop-default')}
                                        alt={order.shopName}
                                        width={48}
                                        height={48}
                                        className="rounded-md object-cover"
                                        data-ai-hint="restaurant logo"
                                    />
                                    <div>
                                        <CardTitle className="text-lg">{order.shopName}</CardTitle>
                                        <p className="text-sm text-muted-foreground">{order.id} &bull; {order.date}</p>
                                    </div>
                                </div>
                                <Badge variant="outline" className={`flex gap-2 items-center ${getStatusColor(order.status)}`}>
                                    {getStatusIcon(order.status)}
                                    {order.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="space-y-3">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        {item.imageId && (
                                            <Image
                                                src={getImageUrl(item.imageId)}
                                                alt={item.name}
                                                width={40}
                                                height={40}
                                                className="rounded-md object-cover"
                                                data-ai-hint="food item"
                                            />
                                        )}
                                        <p className="text-sm text-muted-foreground">{item.quantity} x</p>
                                        <p className="flex-1 font-medium">{item.name}</p>
                                    </div>
                                ))}
                            </div>
                            <Separator className="my-3" />
                            <div className="flex items-center text-sm text-muted-foreground">
                                <CreditCard className="h-4 w-4 mr-2" />
                                Paid via {order.paymentMethod}
                            </div>
                        </CardContent>
                        <Separator />
                        <CardFooter className="p-4 flex justify-between items-center">
                            <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                            <div className="flex gap-2">
                                <Button variant="outline">Reorder</Button>
                                {order.status === 'Delivered' ? (
                                    <Button asChild>
                                        <Link href={`/orders/${order.id}/rate`}>Rate Order</Link>
                                    </Button>
                                ) : (
                                    <Button disabled>Rate Order</Button>
                                )}
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
