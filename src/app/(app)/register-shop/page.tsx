'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function RegisterShopPage() {
  return (
    <div className="h-full bg-muted/20">
        <div className="container mx-auto py-6 max-w-2xl space-y-6">
            <Link href="/profile" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Back to Profile
            </Link>

            <Card>
                <CardHeader>
                    <CardTitle>Register Your Shop</CardTitle>
                    <CardDescription>
                        Fill out the details below to get your shop listed on our platform.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="shop-name">Shop Name</Label>
                        <Input id="shop-name" placeholder="e.g., Pizza Paradise" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="shop-category">Category</Label>
                        <Input id="shop-category" placeholder="e.g., Restaurant, Grocery, Electronics" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="shop-description">Shop Description</Label>
                        <Textarea id="shop-description" placeholder="Tell us about your shop" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="shop-address">Full Address</Label>
                        <Input id="shop-address" placeholder="e.g., 123 Main St, New York, NY 10001" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="shop-phone">Contact Phone</Label>
                        <Input id="shop-phone" type="tel" placeholder="e.g., (123) 456-7890" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Submit for Review</Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
}
