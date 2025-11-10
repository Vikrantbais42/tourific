'use client';

import { Plane, Sailboat, Map } from 'lucide-react';

const icons = [
  { component: Plane, key: 'plane', animation: 'animate-icon-1-fade' },
  { component: Sailboat, key: 'sailboat', animation: 'animate-icon-2-fade' },
  { component: Map, key: 'map', animation: 'animate-icon-3-fade' },
];

export default function LoadingAnimation() {
  return (
    <div className="relative w-24 h-24">
      {icons.map((Icon) => (
        <Icon.component
          key={Icon.key}
          className={`absolute inset-0 w-full h-full text-accent opacity-0 ${Icon.animation}`}
        />
      ))}
    </div>
  );
}
