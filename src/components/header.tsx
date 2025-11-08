
import { Menu, Sailboat } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

export default function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
                <Sailboat className="h-8 w-8 text-accent" />
                <h1 className="text-2xl font-bold text-foreground font-poppins">Tourific</h1>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-2">
             <Button variant="ghost" asChild><Link href="/">Home</Link></Button>
             <Button variant="ghost" asChild><Link href="/about">About Us</Link></Button>
             <Button variant="ghost" asChild><Link href="/#features">Features</Link></Button>
             <Button variant="ghost" asChild><Link href="/#how-it-works">How it Works</Link></Button>
             <Button variant="ghost" asChild><Link href="/contact">Contact</Link></Button>
          </nav>
          <div className="hidden md:block">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                <Link href="/#planner">Get Started</Link>
            </Button>
          </div>
          <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-3/4">
                     <nav className="flex flex-col gap-4 pt-6">
                         <Link href="/" className="font-medium">Home</Link>
                         <Link href="/about" className="font-medium">About Us</Link>
                         <Link href="/#features" className="font-medium">Features</Link>
                         <Link href="/#how-it-works" className="font-medium">How it Works</Link>
                         <Link href="/contact" className="font-medium">Contact</Link>
                         <Button className="bg-accent hover:bg-accent/90 text-accent-foreground mt-4" asChild>
                            <Link href="/#planner">Get Started</Link>
                        </Button>
                    </nav>
                </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
