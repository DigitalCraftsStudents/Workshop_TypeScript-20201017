export function amountToDollars(amount: number): string {
    return amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      });
}