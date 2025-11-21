// src/services/user.service.js
import { pool } from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';
import bcrypt from 'bcrypt';

export const registerUser = async (userData) => {
    const { username, email, password } = userData;
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const [result] = await pool.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );

        // ✅ This returns user WITHOUT password
        const newUser = await getUserById(result.insertId);
        return newUser;

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            throw new ApiError(409, "Username or email already exists.");
        }
        throw error;
    }
};

export const getUserById = async (id) => {
    // ✅ EXPLICITLY exclude password
    const [rows] = await pool.query(
        'SELECT id, username, email, createdAt FROM users WHERE id = ?',
        [id]
    );

    if (rows.length === 0) {
        throw new ApiError(404, "User not found");
    }
    return rows[0];
};

export const getAllUsers = async () => {
    const [users] = await pool.query(
        'SELECT id, username, email, createdAt FROM users'
    );
    return users;
};

// Find user by email (including password hash)
const getUserByEmailWithPassword = async (email) => {
    const [rows] = await pool.query(
        'SELECT id, username, email, password, createdAt FROM users WHERE email = ?',
        [email]
    );

    if (rows.length === 0) {
        throw new ApiError(401, "Invalid email or password");
    }

    return rows[0];
};

//Authenticate user with email + password
export const authenticateUser = async (email, plainPassword) => {
    const userWithPassword = await getUserByEmailWithPassword(email);

    const passwordMatches = await bcrypt.compare(
        plainPassword,
        userWithPassword.password
    );

    if (!passwordMatches) {
        throw new ApiError(401, "Invalid email or password");
    }

    // Remove password before returning
    const { password, ...safeUser } = userWithPassword;
    return safeUser;
};
