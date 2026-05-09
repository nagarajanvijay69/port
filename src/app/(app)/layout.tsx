import { FirebaseClientProvider } from '@/firebase'
import { BottomNav } from '@/components/bottom-nav'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseClientProvider>
      <div className="flex flex-col h-full">
        <main className="flex-1 overflow-y-auto pb-20 xl:pb-0">{children}</main>
        <BottomNav />
      </div>
    </FirebaseClientProvider>
  )
}
