import { pool } from '../config/db.js';   // ✅ named import
import { ApiError } from '../utils/ApiError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (userData) => {
    const { username, email, password } = userData;
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const [result] = await pool.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );

        // Don’t return password
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

// 🔐 LOGIN: email + password → token
export const loginUser = async (loginData) => {
    const { email, password } = loginData;

    // 1. Find user (including password hash)
    const [rows] = await pool.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );
    if (rows.length === 0) {
        throw new ApiError(401, "Invalid credentials");
    }
    const user = rows[0];

    // 2. Check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new ApiError(401, "Invalid credentials");
    }

    // 3. Create JWT
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });

    return token; 
};
