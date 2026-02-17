'use client';

import { useEffect, useState } from 'react';
import { eventLogger, type AnalyticsEvent } from '@/lib/eventLog';
import Link from 'next/link';

export default function DebugPage() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);

  useEffect(() => {
    // Load events on mount
    const loadedEvents = eventLogger.getEvents();
    setEvents(loadedEvents);
  }, []);

  const handleRefresh = () => {
    const loadedEvents = eventLogger.getEvents();
    setEvents(loadedEvents);
  };

  const handleClear = () => {
    eventLogger.clearEvents();
    setEvents([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Debug: Analytics Events</h1>
          <div className="flex space-x-3">
            <button
              onClick={handleRefresh}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Refresh
            </button>
            <button
              onClick={handleClear}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Clear All
            </button>
            <Link
              href="/"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Home
            </Link>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">
            Total events logged: <strong>{events.length}</strong>
          </p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No events logged yet. Use the app to generate events.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map((event, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(event.timestamp).toLocaleString('es-AR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800">
                        {event.event}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <pre className="text-xs overflow-x-auto">
                        {event.data ? JSON.stringify(event.data, null, 2) : '-'}
                      </pre>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-bold text-blue-900 mb-2">Event Types Tracked:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <code>view_assistant</code> - Assistant page viewed</li>
          <li>• <code>assistant_goal_selected</code> - User selected a wellness goal</li>
          <li>• <code>assistant_question_answered</code> - User answered a question</li>
          <li>• <code>assistant_recommendations_generated</code> - Recommendations shown</li>
          <li>• <code>add_to_cart</code> - Product added to cart</li>
          <li>• <code>remove_from_cart</code> - Product removed from cart</li>
          <li>• <code>cart_viewed</code> - Cart page viewed</li>
          <li>• <code>cart_suggestion_added</code> - Optimization suggestion accepted</li>
          <li>• <code>checkout_simulated</code> - Checkout completed</li>
          <li>• <code>checkout_reminder_toggled</code> - Replenishment reminder toggled</li>
        </ul>
      </div>
    </div>
  );
}
