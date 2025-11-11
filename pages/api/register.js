import bcrypt from 'bcryptjs';

import * as userService from '../services/user.service';

const saltHash = process.env.SALT_HASH

export default async function handler(req, res) {
    try {
        const body = req.body;
        const method = req.method;

        if (method !== 'POST') {
            res.status(405).end(`Method ${req.method} ${req.url} Not Allowed`)
        }

        const getUser = await userService.getUserByUsername()
        const isUser = getUser.findIndex(d => d.username === body.username)
        if (isUser !== -1) {
            return res.status(400).json({resCode: '400', msg: 'username is already'})
        }
        const hashPassword = await bcrypt.hash(body.password, parseInt(saltHash))
        const dataCreate = {
            username: body.username,
            password: hashPassword
        }

        await userService.createUsername(dataCreate);

        return res.status(201).json({resCode: '201', msg: 'create user success'})
    } catch (error) {
        return res.status(500).end(`Internal Server Error: ${error.message}`)
    }
}
