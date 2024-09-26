import {describe, it, expect, vi, beforeEach} from 'vitest';

import {notifyUser, fetchUser} from './';

const mocks = vi.hoisted(() => {
    return {
        mockGetUserData: vi.fn(),
        mockSendNotification: vi.fn(),
    }
})

vi.mock('./services', () => {
    return {
        getUserData: mocks.mockGetUserData,
        sendNotification: mocks.mockSendNotification,
    };
});


describe('notifyUser', () => {
    const {mockSendNotification, mockGetUserData,} = mocks;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should notify the user using mocked dependencies', async () => {

        mockGetUserData.mockResolvedValue({name: 'Alice Doe'});

        const result = await notifyUser('123');

        expect(result).toBe('Hello, Alice Doe! You have a new notification.');
        expect(mockGetUserData).toHaveBeenCalledWith('123');
        expect(mockGetUserData).toHaveBeenCalledTimes(1);
        expect(mockSendNotification).toHaveBeenCalledWith('123', result);
        expect(mockSendNotification).toHaveBeenCalledTimes(1);
    });

    it('should handle user not found scenario', async () => {
        mockGetUserData.mockResolvedValue(null);

        await expect(notifyUser('456')).rejects.toThrow('User not found');
        expect(mockGetUserData).toHaveBeenCalledWith('456');
    });
});

describe('fetchUser', () => {
    it('should return user data with a mocked fetch function', async () => {
        const mockFetchFn = vi.fn().mockResolvedValue({name: 'John Doe', age: 30});

        const result = await fetchUser(mockFetchFn, '123');

        expect(result).toEqual({name: 'John Doe', age: 30});
        expect(mockFetchFn).toHaveBeenCalledWith('https://api.example.com/users/123');
        expect(mockFetchFn).toHaveBeenCalledTimes(1);
    });

    it('should handle errors from a mocked fetch function', async () => {
        const mockFetchFn = vi.fn().mockRejectedValue(new Error('Network response was not ok'));

        await expect(fetchUser(mockFetchFn, '456')).rejects.toThrow('Network response was not ok');
        expect(mockFetchFn).toHaveBeenCalledWith('https://api.example.com/users/456');
    });
});