import * as userService from '../../../services/user.service';

export default async function handler(req, res) {
    try {
        const method = req.method;
        const { id } = req.query

        if (method !== 'DELETE') {
            return res.status(405).json({ resCode: '405', data: { msg: `Method ${req.method} ${req.url} Not Allowed` } });
        }

        // check user in DB
        const getUser = await userService.findByIdUser(id)
        if (!getUser) {
            return res.status(400).json({ resCode: '400', data: { msg: `User doesn't exists.` } });
        }

        await userService.deletedUser(id)

        return res.status(200).json({ resCode: '200', data: { msg: 'Delete user success' } })
    } catch (error) {
        return res.status(500).json({ resCode: '500', data: { msg: `Internal Server Error: ${error.message}` } })
    }
}
