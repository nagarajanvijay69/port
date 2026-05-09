'use client';

import { Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface inputType {
    click: boolean,
    message: string,
    setClick: React.Dispatch<React.SetStateAction<boolean>>,
    setMessage: React.Dispatch<React.SetStateAction<string>>,
}

export function MessageInput(props: inputType) {

    const { click, message, setClick, setMessage } = props;

    const handleCancel =()=>{
        setClick(false);
        setMessage("");
    }

    return (
        <div className="border-t bg-background p-4">
            <div className={`${click && 'bg-muted'} rounded-lg`}>
                {
                    click && (
                        <div className='flex justify-between h-10 items-center p-1 rounded'>
                            <div className='pl-4 w-[100%] overflow-hidden text-sm py-2 h-full'>{message}</div>
                            <div className='h-full text-gray-700 cursor-pointer hover:text-gray-900' onClick={handleCancel}><X /></div>
                        </div>
                    )
                }
                <div className="relative">
                    <Input
                        placeholder="Type a message..."
                        className="pr-12"
                    />
                    <Button
                        type="submit"
                        size="icon"
                        variant="ghost"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    >
                        <Send className="h-5 w-5 text-muted-foreground" />
                        <span className="sr-only">Send</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
