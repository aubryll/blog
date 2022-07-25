import { KeyVal } from "./types";

export const orderStatuses: KeyVal[] = [
  { title: "Cart", value: "cart", key: "filter[state_eq]" },
  { title: "Address", value: "address", key: "filter[state_eq]" },
  { title: "Delivery", value: "delivery", key: "filter[state_eq]" },
  { title: "Payment", value: "payment", key: "filter[state_eq]" },
  { title: "Confirm", value: "confirm", key: "filter[state_eq]" },
  {
    title: "Verify payment",
    value: "payment_confirm",
    key: "filter[state_eq]",
  },
  { title: "Complete", value: "complete", key: "filter[state_eq]" },
  { title: "Canceled", value: "canceled", key: "filter[state_eq]" },
  {
    title: "Awaiting return",
    value: "awaiting_return",
    key: "filter[state_eq]",
  },
  { title: "Returned", value: "returned", key: "filter[state_eq]" },
  { title: "Resumed", value: "resumed", key: "filter[state_eq]" },
];

export const paymentStates: KeyVal[] = [
  {
    title: "Balance due",
    value: "balance_due",
    key: "filter[payment_state_eq]",
  },
  {
    title: "Credit owed",
    value: "credit_owed",
    key: "filter[payment_state_eq]",
  },
  { title: "Failed", value: "failed", key: "filter[payment_state_eq]" },
  { title: "Paid", value: "paid", key: "filter[payment_state_eq]" },
  { title: "Void", value: "void", key: "filter[payment_state_eq]" },
];

export const shipmentStates: KeyVal[] = [
  { title: "Back order", value: "backorder", key: "filter[shipment_state_eq]" },
  { title: "Cancelled", value: "cancelled", key: "filter[shipment_state_eq]" },
  { title: "Partial", value: "partial", key: "filter[shipment_state_eq]" },
  { title: "Pending", value: "pending", key: "filter[shipment_state_eq]" },
  { title: "Ready", value: "ready", key: "filter[shipment_state_eq]" },
  { title: "Shipped", value: "shipped", key: "filter[shipment_state_eq]" },
];
