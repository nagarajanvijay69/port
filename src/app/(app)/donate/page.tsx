'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, Heart } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function DonatePage() {
  const [amount, setAmount] = useState('');
  const presetAmounts = [10, 25, 50, 100];
  const { toast } = useToast();

  const handleDonate = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        variant: 'destructive',
        title: 'Invalid Amount',
        description: 'Please enter a valid donation amount.',
      });
      return;
    }
    toast({
      title: 'Thank You!',
      description: `Your donation of $${amount} has been processed.`,
    });
    // In a real app, you would handle payment processing here.
  };

  return (
    <div className="h-full bg-muted/20">
      <div className="container mx-auto py-6 max-w-2xl space-y-6">
        <Link href="/profile" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Profile
        </Link>

        <Card>
          <CardHeader>
            <div className="flex justify-center mb-4">
                <Heart className="h-16 w-16 text-primary" />
            </div>
            <CardTitle className="text-center">Support Our Cause</CardTitle>
            <CardDescription className="text-center">
              Your generous donation helps us support local communities and provide essential resources to those in need. Every contribution makes a difference.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <Label>Choose an amount or enter a custom one</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                {presetAmounts.map((preset) => (
                  <Button
                    key={preset}
                    variant={amount === preset.toString() ? 'default' : 'outline'}
                    onClick={() => setAmount(preset.toString())}
                    className="h-12 text-lg"
                  >
                    ${preset}
                  </Button>
                ))}
              </div>
            </div>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="custom-amount"
                type="number"
                placeholder="Custom Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-12 text-lg pl-8 text-center"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleDonate} className="w-full h-12 text-lg">
              Pay Now
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
