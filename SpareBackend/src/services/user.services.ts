import AppDataSource from "../db.js";

const userRepo = AppDataSource.getRepository("User");

export const findUserByEmail = async (email: string) => {
    try {
        const user = await userRepo.findOne({ where: { email } });
        return user;
    } catch (error) {
        throw new Error('Error finding user by email');
    }
}

export const findUserById = async (id: number) => {
    try {
        const user = await userRepo.findOne({ where: { id } });
        return user;
    } catch (error) {
        throw new Error('Error finding user by id');
    }
}


export const fetchUsers = async () => {
    try {
        const users = await userRepo.find();
        return users;
    } catch (error) {
        throw new Error('Error fetching users');
    }
}

export const createUser = async (name: string, email: string, password: string) => {
    try {
        const newUser = userRepo.create({ name, email, password });
        await userRepo.save(newUser);
        return newUser;
    } catch (error) {
        throw new Error('Error creating user');
    }
}

export const updateUser = async (id: number, name: string, email: string, password: string) => {
    try {
        const user = await userRepo.findOne({ where: { id } });
        if (!user) {
            throw new Error('User not found');
        }
        Object.assign(user, { name, email, password });
        await userRepo.save(user);
        return user;
    } catch (error : any) {
        throw new Error('Error updating user');
    }
}

export const deleteUser = async (id: number) => {
    try {
        const user = await userRepo.findOne({ where: { id } });
        if (!user) {
            throw new Error('User not found');
        }
        user.isDeleted = true;
        await userRepo.save(user);
        return user;
    } catch (error : any) {
        throw new Error('Error deleting user');
    }
}

export const deletePermanently = async (id: number) => {
    try {
        const user = await userRepo.findOne({ where: { id } });
        if (!user) {
            throw new Error('User not found');
        }
        await userRepo.remove(user);
        return user;
    } catch (error : any) {
        throw new Error('Error deleting user permanently');
    }
}

export const restoreUser = async (id: number) => {
    try {
        const user = await userRepo.findOne({ where: { id } });
        if (!user) {
            throw new Error('User not found');
        }
        user.isDeleted = false;
        await userRepo.save(user);
        return user;
    } catch (error : any) {
        throw new Error('Error restoring user');
    }
}

export default {
    findUserByEmail,
    findUserById,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    deletePermanently,
    restoreUser
}