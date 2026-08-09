// Privacy-focused analytics abstraction module
const ANALYTICS_ID = import.meta.env.VITE_ANALYTICS_ID;
const IS_PROD = import.meta.env.PROD;

export const analytics = {
  trackPageView: (path: string) => {
    if (!IS_PROD || !ANALYTICS_ID) {
      if (import.meta.env.DEV) {
        console.log(`[Analytics Dev Log] PageView: ${path}`);
      }
      return;
    }
    // Production analytics dispatch (e.g. Plausible / Google Analytics / Telemetry)
  },

  trackToolUsage: (toolName: string) => {
    if (!IS_PROD || !ANALYTICS_ID) {
      if (import.meta.env.DEV) {
        console.log(`[Analytics Dev Log] Tool Usage: ${toolName}`);
      }
      return;
    }
    // Note: NEVER send tool inputs or outputs to analytics. Only tool names!
  },
};
