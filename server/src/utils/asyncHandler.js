export const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
     

      const statusCode = error.statusCode || 500;
      const message = error.message || "Something went wrong.";

      return res.status(statusCode).json({
        success: false,
        message,
      });
    }
  };
};
