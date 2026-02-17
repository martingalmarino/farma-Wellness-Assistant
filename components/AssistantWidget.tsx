'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function AssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Don't show on assistant page
  if (pathname === '/assistant') return null;

  return (
    <>
      {/* Floating button */}
      <Link
        href="/assistant"
        className="fixed bottom-6 right-6 z-40 bg-primary-500 hover:bg-primary-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
        aria-label="Open Wellness Assistant"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </Link>
    </>
  );
}
