import {describe, it, expect, beforeEach} from 'vitest';

import {UserController} from './';

describe('UserController Tests', () => {
    let userController: UserController;

    beforeEach(() => {
        userController = new UserController();
    });

    it('should create a user with a valid random ID', () => {
        const userId = userController.createUser('Alice');
        expect(userId).toMatch(/^user_[a-z0-9]{10}$/);
    });

    it('should find a user by ID', () => {
        const userId = userController.createUser('Bob');
        const user = userController.findUserById(userId);

        expect(user).toEqual({name: 'Bob', items: []});
    });

    it('should return null if user is not found by ID', () => {
        const user = userController.findUserById('user_nonexistent');

        expect(user).toBeNull();
    });

    it('should add items to a user and verify the items array', () => {
        const userId = userController.createUser('Charlie');
        userController.addItemToUser(userId, 'item1');
        userController.addItemToUser(userId, 'item2');

        const items = userController.getUserItems(userId);
        expect(items).toEqual(['item1', 'item2']);
    });

    it('should update user name and verify the name change', () => {
        const userId = userController.createUser('Dana');
        const result = userController.updateUserName(userId, 'Dan');

        expect(result).toBe(true);
        const updatedUser = userController.findUserById(userId);
        expect(updatedUser?.name).toBe('Dan');
    });

    it('should handle invalid user ID format correctly', () => {
        expect(() => userController.deleteUser('invalid_id')).toThrow('Invalid user ID');
        expect(() => userController.updateUserName('invalid_id', 'NewName')).toThrow('Invalid user ID');
    });

    it('should delete a user and ensure the user is removed', () => {
        const userId = userController.createUser('Eve');
        const result = userController.deleteUser(userId);

        expect(result).toBe(true);
        const userAfterDeletion = userController.findUserById(userId);
        expect(userAfterDeletion).toBeNull();
    });
});