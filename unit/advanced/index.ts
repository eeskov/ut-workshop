export class UserController {
    private users: Record<string, { name: string; items: string[] }> = {};

    createUser(name: string): string {
        const userId = this._generateRandomUserId();
        this.users[userId] = {name, items: []};
        return userId;
    }

    deleteUser(userId: string): boolean {
        this._validateUserId(userId);
        if (this.users[userId]) {
            delete this.users[userId];
            return true;
        }
        return false;
    }

    updateUserName(userId: string, newName: string): boolean {
        this._validateUserId(userId);
        if (this.users[userId]) {
            this.users[userId].name = newName;
            return true;
        }
        return false;
    }

    addItemToUser(userId: string, item: string): void {
        this._validateUserId(userId);
        if (this.users[userId]) {
            this.users[userId].items.push(item);
        }
    }

    getUserItems(userId: string): string[] {
        this._validateUserId(userId);
        if (this.users[userId]) {
            return this.users[userId].items;
        }
        return [];
    }

    findUserById(userId: string): { name: string; items: string[] } | null {
        this._validateUserId(userId);
        if (this.users[userId]) {
            return this.users[userId];
        }
        return null;
    }

    private _validateUserId(userId: string): void {
        if (!userId.startsWith('user_')) {
            throw new Error('Invalid user ID');
        }
    }

    private _generateRandomUserId(): string {
        return `user_${Math.random().toString(36).substring(2, 12)}`;
    }
}
