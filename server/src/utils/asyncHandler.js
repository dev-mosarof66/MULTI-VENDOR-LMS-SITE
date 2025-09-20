export const asyncHandler = async (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(error => {
            return next(new Error(error, { statusCode: 500 }))
        })
    }
}