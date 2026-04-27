import { describe, expect, it } from "@jest/globals";

import { formatMoney } from "./formatMoney";

describe("formatMoney", () => {
  it("formats an integer amount as USD without decimals", () => {
    expect(formatMoney(25000)).toBe("$25,000");
  });

  it("rounds decimal values to the nearest dollar", () => {
    expect(formatMoney(1234.56)).toBe("$1,235");
  });
});
