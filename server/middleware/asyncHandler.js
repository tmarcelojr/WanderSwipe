/**
 * Wraps an async route handler and forwards any thrown error to Express
 * @param {Function} fn - Async route handler
 * @returns {Function} Wrapped route handler with error forwarding
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
