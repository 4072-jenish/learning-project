import { fetchUsers, findUserByEmail, findUserById, updateUser } from "../services/user.services.js"

export const getAllUsers = async (c: any) => {
    try {
        const users = await fetchUsers();
        if (!users) {
            return c.json({ message: 'No users found' }, 404);
        }
        return c.json({ users });
    } catch (error) {
        return c.json({ message: 'Error fetching users', error: (error as Error).message }, 500);
    }
}

export const getUserById = async (c: any) => {
    try {
        const user = await findUserById(c.req.param("id"));
        if (!user) {
            return c.json({ message: 'User not found' }, 404);
        }
        return c.json({ user });
    } catch (error) {
        return c.json({ message: 'Error fetching user', error: (error as Error).message }, 500);
    }
}

export const getUserByEmail = async (c: any) => {
    try {
        const user = await findUserByEmail(c.req.param("email"));
        if (!user) {
            return c.json({ message: 'User not found' }, 404);
        }
        return c.json({ user });
    } catch (error) {
        return c.json({ message: 'Error fetching user', error: (error as Error).message }, 500);
    }
}

export const editUser = async (c: any) => {
    try {
        const { name, email, password } = await c.req.json();
        const editedUser = await updateUser(parseInt(c.req.param("id")), name, email, password);
        return c.json({ user: editedUser });
    } catch (error) {
        return c.json({ message: 'Error updating user', error: (error as Error).message }, 500);
    }
}

export const deleteUser = async (c: any) => {
    try {
        const userId = c.req.param("id");
        if (!userId) {
            return c.json({ message: 'Invalid user ID' }, 400);
        }
        const deletedUser: any = await deleteUser(parseInt(userId));
        if (!deletedUser) {
            return c.json({ message: 'User not found' }, 404);
        }
        return c.json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        return c.json({ message: 'Error deleting user', error: (error as Error).message }, 500);
    }
}
export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    editUser
}