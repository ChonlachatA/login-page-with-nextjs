import bcrypt from 'bcryptjs';

import * as userService from '../services/user.service';

export default async function handler(req, res) {
    try {
        const body = req.body;
        const method = req.method;

        if (method !== 'POST') {
            res.status(405).end(`Method ${req.method} ${req.url} Not Allowed`)
        }

        // check user
        const getUser = await userService.getUserByUsername()
        const user = getUser.find(d => d.username === body.username)
        if (!user) {
            return res.status(400).json({resCode: '400', msg: 'Username is not exists.'})
        }

        // check Password
        const checkPassword = await bcrypt.compare(body.password, user.password)
        if (!checkPassword) {
            return res.status(400).json({resCode: '400', msg: 'Password is incorrect.'})
        }

        return res.status(200).json({resCode: '200', msg: 'Login Success'})
    } catch (error) {
        return res.status(500).end(`Internal Server Error: ${error.message}`)
    }
}
