import bcrypt from 'bcryptjs';

import * as userService from '../../../services/user.service';

const saltHash = process.env.SALT_HASH

export default async function handler(req, res) {
    try {
        const body = req.body;
        const method = req.method;
        const { id } = req.query

        if (method !== 'PUT') {
            return res.status(405).json({ resCode: '405', data: { msg: `Method ${req.method} ${req.url} Not Allowed` } });
        }

        // check user in DB
        const getUser = await userService.findOneUser(body.username)
        if (!getUser) {
            return res.status(400).json({ resCode: '400', data: { msg: `User doesn't exists.` } });
        }

        const checkPassword = await bcrypt.compare(body.oldPassword, getUser.password);
        if (!checkPassword) {
            return res.status(400).json({ resCode: '400', data: { msg: `Old Password is incorrect.` } });
        }

        // compare password old and new
        const checkSamePassword = await bcrypt.compare(body.password, getUser.password);
        if (checkSamePassword) {
            return res.status(400).json({ resCode: '400', data: { msg: `New password must not be the same old password.` } });
        }

        const hashPassword = await bcrypt.hash(body.password, parseInt(saltHash))
        const dataUpdate = { password: hashPassword }
        await userService.updateUser(id, dataUpdate)

        return res.status(200).json({ resCode: '200', data: { msg: 'Update password success' } })
    } catch (error) {
        return res.status(500).json({ resCode: '500', data: { msg: `Internal Server Error: ${error.message}` } })
    }
}
