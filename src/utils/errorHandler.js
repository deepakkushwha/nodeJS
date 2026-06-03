const errorHandler = (err, req, res, next) => {

    if (err.code === 11000) {
        return res.status(400).json({
            message: "User already exists"
        });
    }

    if (err.name === "ValidationError") {
        return res.status(400).json({
            message: Object.values(err.errors)[0].message
        });
    }

    return res.status(500).json({
        message: err.message
    });
}

export default errorHandler