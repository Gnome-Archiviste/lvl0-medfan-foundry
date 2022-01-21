export function throwAndError(message: string): never {
    ui.notifications?.error(message);
    throw new Error(message);
}

export function foundryAssert(cond: any, message: string): asserts cond {
    if (!cond) {
        throwAndError(message);
    }
}
