import {describe, it, expect, vi, beforeEach, Mock} from 'vitest';
import {handleUserSession} from './';

// @ts-ignore
import {logActivity, sendContent, getUserPreferences, getUserProfile, authenticateUser} from './services';

vi.mock('./services', () => ({
    authenticateUser: vi.fn(),
    getUserProfile: vi.fn(),
    getUserPreferences: vi.fn(),
    sendContent: vi.fn(),
    logActivity: vi.fn(),
}));


describe('Advanced Dynamic Mock Example', () => {
    const mockAuthenticateUser = authenticateUser as Mock;
    const mockGetUserProfile = getUserProfile as Mock;
    const mockGetUserPreferences = getUserPreferences as Mock;
    const mockSendContent = sendContent as Mock;
    const mockLogActivity = logActivity as Mock;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should authenticate and send content if preferences allow', async () => {
        mockAuthenticateUser.mockResolvedValue(true);
        mockGetUserProfile.mockResolvedValue({name: 'Alice Doe'});
        mockGetUserPreferences.mockResolvedValue({receiveContent: true});
        mockSendContent.mockResolvedValue({title: 'New Offer', id: 'offer123'});

        const result = await handleUserSession('123', 'valid-credentials');

        expect(result).toContain('Welcome back, Alice Doe!');
        expect(result).toContain('You have new content: New Offer.');
        expect(mockAuthenticateUser).toHaveBeenCalledWith('123', 'valid-credentials');
        expect(mockGetUserProfile).toHaveBeenCalledWith('123');
        expect(mockGetUserPreferences).toHaveBeenCalledWith('123');
        expect(mockSendContent).toHaveBeenCalledWith('123', {receiveContent: true});
        expect(mockLogActivity).toHaveBeenCalledWith('ContentSent', {userId: '123', contentId: 'offer123'});
    });

    it('should skip content if user has opted out', async () => {
        mockAuthenticateUser.mockResolvedValue(true);
        mockGetUserProfile.mockResolvedValue({name: 'Bob Smith'});
        mockGetUserPreferences.mockResolvedValue({receiveContent: false});

        const result = await handleUserSession('456', 'valid-credentials');

        expect(result).toContain('Welcome back, Bob Smith!');
        expect(result).not.toContain('You have new content');
        expect(mockLogActivity).toHaveBeenCalledWith('ContentSkipped', {userId: '456'});
    });

    it('should dynamically change behavior based on call count', async () => {
        mockAuthenticateUser.mockResolvedValue(true);
        mockGetUserProfile.mockResolvedValue({name: 'Charlie Brown'});
        mockGetUserPreferences
            .mockResolvedValueOnce({receiveContent: true})
            .mockResolvedValueOnce({receiveContent: false});

        // First call: User receives content
        const result1 = await handleUserSession('789', 'valid-credentials');
        expect(result1).toContain('Welcome back, Charlie Brown!');
        expect(result1).toContain('You have new content');

        // Second call: User opts out of content
        const result2 = await handleUserSession('789', 'valid-credentials');
        expect(result2).toContain('Welcome back, Charlie Brown!');
        expect(result2).not.toContain('You have new content');
        expect(mockGetUserPreferences).toHaveBeenCalledTimes(2);
        expect(mockLogActivity).toHaveBeenNthCalledWith(1, 'ContentSent', expect.any(Object));
        expect(mockLogActivity).toHaveBeenNthCalledWith(2, 'ContentSkipped', {userId: '789'});
    });

    it('should handle random behavior in log activity', async () => {
        mockAuthenticateUser.mockResolvedValue(true);
        mockGetUserProfile.mockResolvedValue({name: 'Daisy Duck'});
        mockGetUserPreferences.mockResolvedValue({receiveContent: true});
        mockSendContent.mockResolvedValue({title: 'Special Content', id: 'special123'});

        const result = await handleUserSession('1010', 'valid-credentials');
        expect(result).toContain('Welcome back, Daisy Duck!');
        expect(result).toContain('You have new content: Special Content.');
        expect(mockLogActivity).toHaveBeenCalledWith('ContentSent', expect.any(Object));
    });
});