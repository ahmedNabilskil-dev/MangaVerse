export interface PaddlePrice {
  id: string;
  name: string;
  description: string;
  unit_price: {
    amount: string;
    currency_code: string;
  };
  billing_cycle?: {
    interval: string;
    frequency: number;
  };
  type: "subscription" | "one_time";
}

export interface CheckoutConfig {
  items: Array<{
    priceId: string;
    quantity: number;
  }>;
  customer?: {
    email: string;
    name?: string;
  };
  customData?: any;
  settings?: {
    displayMode?: "overlay" | "inline";
    theme?: "light" | "dark";
    locale?: string;
    successUrl?: string;
  };
}
