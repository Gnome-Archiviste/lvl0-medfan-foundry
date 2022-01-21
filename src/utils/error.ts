export function foundryAssert(cond: any, message: string): asserts cond {
    if (!cond) {
        throw new Error(message);
    }
}
