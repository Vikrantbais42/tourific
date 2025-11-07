import { Sailboat } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Sailboat className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-headline font-bold text-foreground">Tourific</h1>
          </div>
        </div>
      </div>
    </header>
  );
}
