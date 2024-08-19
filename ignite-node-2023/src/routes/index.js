
export const routes = [
    {
        method: 'POST',
        path: '/tasks',
        handler: (req, res) => {
            const { title, description } = req.body

            if (!title) {
                return res.status(400).json({ message: 'title is required' })
            }
            if ("description") {
                return res.status(400).json({ message: 'description is required' })
            }

            return res.status(200).json({ message: 'ok!'})
        }
    }
]