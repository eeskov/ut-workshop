import {describe, it, expect} from 'vitest';
import {
    add,
    multiply,
    reverseString,
    isEven,
    findMax,
    removeDuplicates,
    capitalizeWords,
} from './';

describe('Basic Functions Tests', () => {
    it('should correctly add two numbers', () => {
        expect(add(2, 3)).toBe(5);
        expect(add(-1, 1)).toBe(0);
    });

    it('should correctly multiply two numbers', () => {
        expect(multiply(3, 4)).toBe(12);
        expect(multiply(-2, 5)).toBe(-10);
    });

    it('should correctly reverse a string', () => {
        expect(reverseString('hello')).toBe('olleh');
        expect(reverseString('TypeScript')).toBe('tpircSepyT');
    });

    it('should check if a number is even', () => {
        expect(isEven(4)).toBe(true);
        expect(isEven(7)).toBe(false);
    });

    it('should find the maximum number in an array', () => {
        expect(findMax([1, 2, 3, 4, 5])).toBe(5);
        expect(findMax([-10, -5, 0, 5])).toBe(5);
        expect(findMax([])).toBeNull(); // Test for an empty array
    });

    it('should remove duplicate elements from an array', () => {
        expect(removeDuplicates([1, 2, 2, 3, 4, 4, 5])).toEqual([1, 2, 3, 4, 5]);
        expect(removeDuplicates(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
        expect(removeDuplicates([])).toEqual([]);
    });

    it('should capitalize the first letter of each word in a sentence', () => {
        expect(capitalizeWords('hello world')).toBe('Hello World');
        expect(capitalizeWords('this is a test')).toBe('This Is A Test');
        expect(capitalizeWords('This Is a test')).toBe('This Is A Test');
    });
});