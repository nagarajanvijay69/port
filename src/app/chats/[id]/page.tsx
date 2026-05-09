'use client'
import { ChatInterface } from '@/components/chat/chat-interface'


type ChatPageProps = {
  id: string,
  setIsList: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function ChatPage({ id, setIsList }: ChatPageProps) {
  return <ChatInterface id={id} setIsList={setIsList} />
}
