'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Star, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

export default function RateOrderPage() {
  const params = useParams();
  const orderId = params.orderId;
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="h-full bg-muted/20 px-2 md:px-auto md:pl-28">
        <div className="container mx-auto py-6 max-w-2xl space-y-6">
            <Link href="/orders" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Back to Orders
            </Link>

            <Card>
                <CardHeader>
                    <CardTitle>Rate Your Order</CardTitle>
                    <CardDescription>
                        Your feedback helps us improve. Please rate your experience for order #{orderId}.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Your Rating</Label>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="p-1"
                                >
                                    <Star
                                        className={cn(
                                            'h-8 w-8 transition-colors',
                                            (hoverRating || rating) >= star
                                                ? 'text-yellow-400 fill-yellow-400'
                                                : 'text-muted-foreground/50'
                                        )}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="review-comment">Feedback (Optional)</Label>
                        <Textarea id="review-comment" placeholder="Tell us more about your experience..." />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Submit Review</Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
}
