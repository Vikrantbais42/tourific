'use client';

import { Plane, Sailboat, Map } from 'lucide-react';

const icons = [
  { component: Plane, key: 'plane' },
  { component: Sailboat, key: 'sailboat' },
  { component: Map, key: 'map' },
];

export default function LoadingAnimation() {
  return (
    <div className="relative w-24 h-24">
      {icons.map((Icon, index) => (
        <Icon.component
          key={Icon.key}
          className="absolute inset-0 w-full h-full text-accent opacity-0 animate-icon-fade"
          style={{ animationDelay: `${index * 1.5}s` }}
        />
      ))}
    </div>
  );
}
