export const pricePlans = [
  {
    name: "Free Starter",
    price: 0,
    description: "Try the product and generate quick summaries at no cost",
    items: [
      "2 PDF summaries (one-time)",
      "Basic text summarization",
      "Normal processing speed",
      "Standard summary quality",
    ],
    id: "free",
    paymentLink: "",
    priceId: "",
  },
  {
    name: "Basic",
    price: 1,
    description: "Best for students and occasional users",
    items: [
      "5 PDF summaries per month",
      "Improved summary quality",
      "Standard processing speed",
      "Email support",
    ],
    id: "basic",
    paymentLink: "https://buy.stripe.com/test_5kQ28r4E3fCr8vebWHfUQ00",
    priceId: "",
  },
  {
    name: "Pro",
    price: 5,
    description: "Designed for professionals and power users",
    items: [
      "Unlimited PDF summaries",
      "Highest-quality summaries",
      "Priority processing speed",
      "Markdown & text export",
      "24/7 priority support",
    ],
    id: "pro",
    paymentLink: "https://buy.stripe.com/test_aFa3cv6MbcqffXG0dZfUQ01",
    priceId: "",
  },
];

export const freeUploadLimit = 2;
