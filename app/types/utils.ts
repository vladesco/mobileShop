export type Property<T extends Record<string, unknown>, U extends keyof T> = T[U];
