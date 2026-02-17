export interface AnalyticsEvent {
  timestamp: Date;
  event: string;
  data?: Record<string, any>;
}

class EventLogger {
  private events: AnalyticsEvent[] = [];

  log(event: string, data?: Record<string, any>) {
    const analyticsEvent: AnalyticsEvent = {
      timestamp: new Date(),
      event,
      data,
    };
    this.events.push(analyticsEvent);
    
    // Also log to console for debugging
    console.log('[Analytics]', event, data);
    
    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('farmaquiero_events', JSON.stringify(this.events));
      } catch (e) {
        // Ignore storage errors
      }
    }
  }

  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  clearEvents() {
    this.events = [];
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('farmaquiero_events');
      } catch (e) {
        // Ignore storage errors
      }
    }
  }

  // Load events from localStorage on initialization
  loadEvents() {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('farmaquiero_events');
        if (stored) {
          const parsed = JSON.parse(stored);
          this.events = parsed.map((e: any) => ({
            ...e,
            timestamp: new Date(e.timestamp),
          }));
        }
      } catch (e) {
        // Ignore parsing errors
      }
    }
  }
}

// Singleton instance
export const eventLogger = new EventLogger();

// Initialize on load
if (typeof window !== 'undefined') {
  eventLogger.loadEvents();
}
