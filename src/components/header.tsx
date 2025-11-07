import { Sailboat } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Sailboat className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground font-poppins">Tourific</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-2">
             <Button variant="ghost" asChild><Link href="#features">Features</Link></Button>
             <Button variant="ghost" asChild><Link href="#how-it-works">How it Works</Link></Button>
             <Button variant="ghost">Contact</Button>
          </nav>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
            <Link href="#planner">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
