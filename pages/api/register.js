import bcrypt from 'bcryptjs';

import * as userService from '../../services/user.service';

const saltHash = process.env.SALT_HASH

export default async function handler(req, res) {
    try {
        const body = req.body;
        const method = req.method;

        if (method !== 'POST') {
            return res.status(405).json({resCode: '405',  data: {msg: `Method ${req.method} ${req.url} Not Allowed`}});
        }

        const getUser = await userService.findOneUser(body.username)
        if (getUser) {
            return res.status(400).json({resCode: '400',  data: {msg: `username is already`}});
        }
        const hashPassword = await bcrypt.hash(body.password, parseInt(saltHash))
        const dataCreate = {
            username: body.username,
            password: hashPassword
        }

        await userService.createUsername(dataCreate);

        return res.status(201).json({resCode: '201',  data: {msg: 'Create user success'}})
    } catch (error) {
        return res.status(500).json({resCode: '500',  data: {msg: `Internal Server Error: ${error.message}`}})
    }
}
