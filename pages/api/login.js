import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import * as userService from '../../services/user.service';

const secret = process.env.SECRET;

export default async function handler(req, res) {
    try {
        const body = req.body;
        const method = req.method;

        if (method !== 'POST') {
            return res.status(405).json({resCode: '405',  data: {msg: `Method ${req.method} ${req.url} Not Allowed`}});
        }

        // check user
        const getUser = await userService.findOneUser(body.username)
        if (!getUser) {
            return res.status(400).json({resCode: '400',  data: {msg: `User doesn't exists.`}});
        }

        // check Password
        const checkPassword = await bcrypt.compare(body.password, getUser.password)
        if (!checkPassword) {
            return res.status(400).json({resCode: '400',  data: {msg: `Password is incorrect.`}});
        }

        const payload = {
            id: getUser.id,
            username: getUser.username
        };

        const token = jwt.sign(payload, secret);

        return res.status(200).json({resCode: '200', data: {msg: 'Login Success', token}})
    } catch (error) {
        return res.status(500).json({resCode: '500',  data: {msg: `Internal Server Error: ${error.message}`}})
    }
}
