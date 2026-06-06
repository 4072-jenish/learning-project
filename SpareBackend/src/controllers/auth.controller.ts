import  AppDataSource  from "../db.js";
import bcrypt from "bcrypt";
import { sign } from "hono/jwt";
import { createUser, findUserByEmail } from "../services/user.services.js";

const creatToken = (user: any) => {
    return sign(
        {
                id: user?.id,
                email: user?.email,
                name: user?.name,
                role: user?.role
        },
        process.env.JWT_SECRET as string,
        "HS256"
);
}

export const loginUser = async (c: any) => {
    try {
        const { email, password } = await c.req.json();

        const user = await findUserByEmail(email);
        console.log(user);
        
        const comparePassword = await bcrypt.compare(password, user?.password || '');

        if (!comparePassword) {
            return c.json({ message: 'Invalid credentials' }, 401);
        }
        const token = await creatToken(user);
        console.log(token);
        return c.json({ message: 'Login successful', token });
    } catch (error) {
        return c.json({ message: 'Error logging in', error: (error as Error).message }, 500);
    }
}

export const registerUser = async (c: any) => {
    try {
        const { name, email, password } = await c.req.json();

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return c.json({ message: 'User already exists' }, 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser(name, email, hashedPassword);

        return c.json({ message: 'User registered successfully', newUser });
    } catch (error: any) {
        return c.json({
            message: 'Error registering user',
            error: error.message
        }, 500);
    }
}

export default {
    loginUser,
    registerUser
}