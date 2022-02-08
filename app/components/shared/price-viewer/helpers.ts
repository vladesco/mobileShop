export const calculateDiscountPercent = (
    realPrice: number,
    discountPrice: number
): number => Math.ceil(((realPrice - discountPrice) / realPrice) * 100);

export const generateRandomPriceWithDiscount = (realPrice: number) =>
    Math.floor(Math.random() * realPrice);
