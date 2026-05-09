'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Moon, Sun, Palette, Text, Bell, Mail, Music, Shield, UserX, BarChart, LogOut } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/firebase';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';

type ColorTheme = 'green' | 'blue' | 'orange' | 'rose';

export default function SettingsPage() {
    const { theme, setTheme, fontSize, setFontSize, colorTheme, setColorTheme } = useTheme();
    const { toast } = useToast();
    const router = useRouter();
    const auth = useAuth();

    // Mock states for UI interactivity
    const [pushNotifications, setPushNotifications] = useState(true);
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [inAppSounds, setInAppSounds] = useState(true);
    const [dataSaver, setDataSaver] = useState(false);
    const [activityStatus, setActivityStatus] = useState(true);
    const [emailDialogOpen, setEmailDialogOpen] = useState(false);

    const handleColorChange = (color: ColorTheme) => {
        setColorTheme(color);
        toast({
            title: "Theme color updated!",
            description: `App color set to ${color}.`
        });
    };
    
    const handle2FA = () => {
        toast({
            title: "Two-Factor Authentication",
            description: "This is a demo. In a real app, this would redirect to security settings."
        })
    }

    const handleEmailSwitch = (checked: boolean) => {
        if (checked) {
            setEmailDialogOpen(true);
        } else {
            setEmailNotifications(false);
            toast({
                title: "Email notifications disabled."
            });
        }
    }

    const handleSendVerification = (e: React.FormEvent) => {
        e.preventDefault();
        setEmailDialogOpen(false);
        setEmailNotifications(true);
        toast({
            title: "Verification Sent",
            description: "A verification link has been sent to your email address.",
        });
    }

    const handleLogout = () => {
        if (auth) {
            auth.signOut().then(() => {
                toast({ title: "Logged out successfully." });
                router.push('/login');
            });
        } else {
             toast({ title: "Logged out successfully." });
            router.push('/login');
        }
    };

    return (
        <div className="h-full bg-muted/20">
            <div className="container mx-auto py-6 max-w-2xl space-y-8 pb-24">
                <div className="flex items-center gap-4">
                    <Link href="/profile" className="p-2 rounded-full hover:bg-muted">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-2xl font-bold">Settings</h1>
                </div>

                {/* Appearance Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Appearance</CardTitle>
                        <CardDescription>Customize the look and feel of the app.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="dark-mode" className="flex items-center gap-3">
                                {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                                <span>Dark Mode</span>
                            </Label>
                            <Switch
                                id="dark-mode"
                                checked={theme === 'dark'}
                                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                            />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <Label htmlFor="app-color" className="flex items-center gap-3">
                                <Palette className="h-5 w-5" />
                                <span>App Color</span>
                            </Label>
                            <Select value={colorTheme} onValueChange={(value: ColorTheme) => handleColorChange(value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a color" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="green">Green (Default)</SelectItem>
                                    <SelectItem value="blue">Blue</SelectItem>
                                    <SelectItem value="orange">Orange</SelectItem>
                                    <SelectItem value="rose">Rose</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Separator />
                        <div className="space-y-3">
                             <Label htmlFor="font-size" className="flex items-center gap-3">
                                <Text className="h-5 w-5" />
                                <span>Font Size</span>
                            </Label>
                            <div className="flex items-center gap-4">
                                <span className="text-sm">A</span>
                                <Slider
                                    id="font-size"
                                    min={0.8}
                                    max={1.2}
                                    step={0.1}
                                    value={[fontSize]}
                                    onValueChange={(value) => setFontSize(value[0])}
                                />
                                <span className="text-xl">A</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Notification Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>Manage how you receive alerts.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="push-notifications" className="flex items-center gap-3">
                                <Bell className="h-5 w-5" />
                                <span>Push Notifications</span>
                            </Label>
                            <Switch
                                id="push-notifications"
                                checked={pushNotifications}
                                onCheckedChange={(checked) => { setPushNotifications(checked); toast({ title: `Push notifications ${checked ? 'enabled' : 'disabled'}.`}) }}
                            />
                        </div>
                        <Separator />
                        <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
                            <div className="flex items-center justify-between">
                               <Label htmlFor="email-notifications" className="flex items-center gap-3">
                                    <Mail className="h-5 w-5" />
                                    <span>Email Notifications</span>
                                </Label>
                                <Switch
                                    id="email-notifications"
                                    checked={emailNotifications}
                                    onCheckedChange={handleEmailSwitch}
                                />
                            </div>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Enable Email Notifications</DialogTitle>
                                    <DialogDescription>
                                        Please enter your email address to receive notifications. A verification link will be sent.
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleSendVerification} className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" type="email" placeholder="you@example.com" required />
                                    </div>
                                    <Button type="submit" className="w-full">Send Verification Link</Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                         <Separator />
                        <div className="flex items-center justify-between">
                           <Label htmlFor="in-app-sounds" className="flex items-center gap-3">
                                <Music className="h-5 w-5" />
                                <span>In-App Sounds</span>
                            </Label>
                            <Switch
                                id="in-app-sounds"
                                checked={inAppSounds}
                                onCheckedChange={(checked) => { setInAppSounds(checked); toast({ title: `In-app sounds ${checked ? 'enabled' : 'disabled'}.`}) }}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Account & Privacy Settings */}
                <Card>
                     <CardHeader>
                        <CardTitle>Account & Privacy</CardTitle>
                        <CardDescription>Manage your account security and privacy.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                           <Label className="flex items-center gap-3">
                                <Shield className="h-5 w-5" />
                                <span>Two-Factor Authentication</span>
                            </Label>
                            <Button variant="outline" onClick={handle2FA}>Enable</Button>
                        </div>
                         <Separator />
                        <Link href="/settings/blocked" className="flex items-center justify-between hover:bg-muted/50 -m-3 p-3 rounded-lg">
                           <Label className="flex items-center gap-3 cursor-pointer">
                                <UserX className="h-5 w-5" />
                                <span>Manage Blocked Contacts</span>
                            </Label>
                        </Link>
                         <Separator />
                         <div className="flex items-center justify-between">
                           <Label htmlFor="activity-status" className="flex items-center gap-3">
                                <span className='relative flex h-3 w-3'>
                                    {activityStatus && <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>}
                                    <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500'></span>
                                </span>
                                <span>Activity Status</span>
                            </Label>
                            <Switch
                                id="activity-status"
                                checked={activityStatus}
                                onCheckedChange={(checked) => { setActivityStatus(checked); toast({ title: `Activity status is now ${checked ? 'visible' : 'hidden'}.`}) }}
                            />
                        </div>
                    </CardContent>
                </Card>
                
                 {/* Data Usage */}
                <Card>
                     <CardHeader>
                        <CardTitle>Data Usage</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                           <Label htmlFor="data-saver" className="flex items-center gap-3">
                                <BarChart className="h-5 w-5" />
                                <span>Data Saver</span>
                            </Label>
                            <Switch
                                id="data-saver"
                                checked={dataSaver}
                                onCheckedChange={(checked) => { setDataSaver(checked); toast({ title: `Data saver mode ${checked ? 'enabled' : 'disabled'}.`}) }}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Button variant="destructive" className="w-full" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" /> Log Out
                </Button>
            </div>
        </div>
    );
}
