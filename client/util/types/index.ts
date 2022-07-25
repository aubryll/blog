export type UnknownObjectValues = Record<string, unknown>;
export type NonUndefined<T> = T extends undefined ? never : T;

export type ValueOf<T> = T[keyof T];
export type KeyVal = {
    title: string;
    value: string;
    key: string;
};
