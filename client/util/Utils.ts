import { words } from "lodash";

export const capitalizeFirstLetter = (word: string) =>
    word.charAt(0).toUpperCase() + word.slice(1);

export const readableStatus = (status: string) =>
    status?.toUpperCase()?.replaceAll("_", " ");

export const readableCamelCase = (text: string) => {
    const result = text.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
};

export const kFormatter = (value: number) =>
    new Intl.NumberFormat("en", {
        notation: "compact",
        compactDisplay: "short",
    }).format(value);

export const moneyFormatter = (value: number, withCurrency?: boolean) => {
    if (withCurrency) {
        return new Intl.NumberFormat("en", {
            style: "currency",
            currency: "ZMW",
        }).format(value);
    } else return new Intl.NumberFormat("en").format(value);
};
export const hashcode = (str: string, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed,
        h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 =
        Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 =
        Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};
