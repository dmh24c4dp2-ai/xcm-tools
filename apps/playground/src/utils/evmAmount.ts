import { formatUnits, parseUnits } from 'viem';

/**
 * Resolves an amount entered in the Playground into token base units.
 *
 * With abstract decimals enabled the input is a human readable amount and is
 * scaled by the token decimals. With it disabled the input is already raw base
 * units, which is what Snowbridge expects in that mode, so it must be used
 * as-is instead of being scaled a second time.
 */
export const toBaseUnits = (
  amount: string,
  decimals: number,
  abstractDecimals = true,
): bigint | undefined => {
  const trimmed = amount.trim();
  if (!trimmed) return undefined;
  try {
    return abstractDecimals ? parseUnits(trimmed, decimals) : BigInt(trimmed);
  } catch {
    return undefined;
  }
};

/**
 * Formats token base units for display using the same decimals mode as
 * {@link toBaseUnits}, so a displayed amount can be compared with the amount
 * the user entered.
 */
export const fromBaseUnits = (
  value: bigint | undefined,
  decimals: number,
  abstractDecimals = true,
): string | undefined => {
  if (value === undefined) return undefined;
  return abstractDecimals ? formatUnits(value, decimals) : value.toString();
};
