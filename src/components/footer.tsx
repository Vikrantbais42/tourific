import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Sailboat } from 'lucide-react';

export default function Footer() {
  const footerImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <footer
      className="relative border-t bg-cover bg-center text-white"
      style={{ backgroundImage: footerImage ? `url(${footerImage.imageUrl})` : '' }}
      data-ai-hint={footerImage?.imageHint}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-4">
                <Sailboat className="h-8 w-8 text-accent" />
                <h2 className="text-3xl font-bold font-poppins">Tourific</h2>
            </div>
          <p className="max-w-md text-gray-300">
            Crafting your perfect journey, one itinerary at a time. Let Tourific be your guide to unforgettable adventures.
          </p>
          <div className="flex items-center space-x-6 mt-6">
            <Link href="/about" className="text-sm hover:text-accent transition-colors">
              About
            </Link>
            <Link href="#" className="text-sm hover:text-accent transition-colors">
              Contact
            </Link>
            <Link href="#" className="text-sm hover:text-accent transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm hover:text-accent transition-colors">
              Terms
            </Link>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Tourific. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
}
