import { type Paddle, initializePaddle } from "@paddle/paddle-js";
import type { CheckoutConfig } from "../types/paddle";

let paddle: Paddle | undefined;

export const initialize = async (): Promise<Paddle | undefined> => {
  if (!paddle) {
    paddle = await initializePaddle({
      environment: import.meta.env.VITE_PADDLE_ENV as "sandbox" | "production",
      token: import.meta.env.VITE_PADDLE_CLIENT_TOKEN,
    });
  }
  return paddle;
};

export const openCheckout = async (config: CheckoutConfig): Promise<void> => {
  const paddleInstance = await initialize();

  paddleInstance?.Checkout.open({
    items: config.items,
    customer: config.customer,
    customData: config.customData,
    settings: {
      displayMode: config.settings?.displayMode || "overlay",
      theme: config.settings?.theme || "light",
      locale: config.settings?.locale || "en",
      successUrl:
        config.settings?.successUrl || `${window.location.origin}/success`,
    },
  });
};

export const getPriceDetails = (
  priceId: string
): { type: string; interval?: string } => {
  // Map your Paddle price IDs to product types
  const priceMap: { [key: string]: { type: string; interval?: string } } = {
    pri_trial_monthly: { type: "trial", interval: "monthly" },
    pri_monthly: { type: "subscription", interval: "monthly" },
    pri_yearly: { type: "subscription", interval: "yearly" },
    pri_lifetime: { type: "one_time" },
  };

  return priceMap[priceId] || { type: "unknown" };
};
