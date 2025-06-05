// utils/safeTransformers.ts
import { TransformFnParams } from 'class-transformer';

// 通用包装器
function transformSafe<T>(fn: (input: TransformFnParams) => T, fallback: T): (input: TransformFnParams) => T {
    return (input) => {
        try {
            const result = fn(input);
            return result !== undefined && result !== null ? result : fallback;
        } catch {
            return fallback;
        }
    };
}

// 👇 各种类型的安全转换器

export const toStringSafe = (path: string, fallback = '') =>
    transformSafe(({ obj }) => String(path.split('.').reduce((o, key) => o?.[key], obj)), fallback);

export const toNumberSafe = (path: string, fallback = 0) =>
    transformSafe(({ obj }) => Number(path.split('.').reduce((o, key) => o?.[key], obj)), fallback);

export const toBooleanSafe = (path: string, fallback = false) =>
    transformSafe(({ obj }) => {
        const value = path.split('.').reduce((o, key) => o?.[key], obj);
        return value === 'true' || value === true || value === 1 || value === '1';
    }, fallback);

export const toDateSafe = (path: string, fallback = new Date(0)) =>
    transformSafe(({ obj }) => new Date(path.split('.').reduce((o, key) => o?.[key], obj)), fallback);

export const toArraySafe = <T = any>(path: string, fallback: T[] = []) =>
    transformSafe(({ obj }) => {
        const val = path.split('.').reduce((o, key) => o?.[key], obj);
        return Array.isArray(val) ? val : fallback;
    }, fallback);

// utils/safeTransformers.ts
export function safeGet(obj: any, path: string[], fallback?: any): any {
    return path.reduce((acc, key) => (acc && acc[key] != null ? acc[key] : undefined), obj) ?? fallback;
}
