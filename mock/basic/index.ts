// @ts-ignore
import {getUserData, sendNotification} from './services';

export async function notifyUser(userId: string): Promise<string> {
    const user = await getUserData(userId);
    if (!user) {
        throw new Error('User not found');
    }
    const message = `Hello, ${user.name}! You have a new notification.`;
    sendNotification(userId, message);
    return message;
}

// async mock

export async function fetchData(url: string): Promise<any> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}

export async function fetchUser(fetchFn: (url: string) => Promise<any>, userId: string): Promise<any> {
    const url = `https://api.example.com/users/${userId}`;
    const data = await fetchFn(url);
    return data;
}