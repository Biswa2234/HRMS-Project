/**
 * Wraps async Express handlers and forwards
 * rejected promises to the global error handler.
 *
 * @param {Function} fn - Async Express handler
 * @returns {Function} Express middleware
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
