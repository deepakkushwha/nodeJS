import Users from './user.model.js'

const createUser = async (req, res) => {
    try {
        const user = await Users.create(req.body);
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user
        })
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                message: 'user already exists'
            });
        }

        if (err.name === 'ValidationError') {
            return res.status(400).json({
                message: Object.values(err.errors)[0].message
            });
        }

        return res.status(500).json({
            message: err.message
        });
    }
}

const getUser = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 2;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";
    const totalUsers = await Users.countDocuments({
        name: { $regex: search, $options: 'i' }
    });
    try {
        const user = await Users.find(
            {
                isVerified: req.query.isVerified,
                name: { $regex: search, $options: "i" }
            },
        ).skip(skip).limit(limit);
        return res.status(200).json({
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            currentPage: page,
            data: user
        })
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await Users.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: "Data not found"
            })
        }
        res.status(200).json({
            message: "User deleted Successfully"
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

const getSingleUser = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id)
        res.status(200).json({
            data: user
        })
    }
    catch (err) {
        res.status(500).json({
            err: err.message
        })
    }
}

export { createUser, getUser, updateUser, deleteUser, getSingleUser }