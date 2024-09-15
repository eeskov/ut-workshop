// @ts-ignore
import {logActivity, sendContent, getUserPreferences, getUserProfile, authenticateUser} from './services';

export async function handleUserSession(userId: string, credentials: string): Promise<string> {
    const isAuthenticated = await authenticateUser(userId, credentials);
    if (!isAuthenticated) {
        throw new Error('Authentication failed');
    }

    const [profile, preferences] = await Promise.all([
        getUserProfile(userId),
        getUserPreferences(userId),
    ]);

    if (!profile) {
        throw new Error('User profile not found');
    }

    if (!preferences) {
        throw new Error('User preferences not found');
    }

    let message = `Welcome back, ${profile.name}!`;

    if (preferences.receiveContent) {
        const content = await sendContent(userId, preferences);
        message += ` You have new content: ${content.title}.`;
        logActivity('ContentSent', {userId, contentId: content.id});
    } else {
        logActivity('ContentSkipped', {userId});
    }

    return message;
}