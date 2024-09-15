export function add(a: number, b: number): number {
    return a + b;
}

export function multiply(a: number, b: number): number {
    return a * b;
}

export function reverseString(str: string): string {
    return str.split('').reverse().join('');
}

export function isEven(num: number): boolean {
    return num % 2 === 0;
}

export function findMax(arr: number[]): number | null {
    if (arr.length === 0) return null;
    return Math.max(...arr);
}

export function removeDuplicates(arr: any[]): any[] {
    return Array.from(new Set(arr));
}

export function capitalizeWords(sentence: string): string {
    return sentence
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}