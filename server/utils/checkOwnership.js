/**
 * Checks whether two Mongoose ObjectIds (or strings) match
 * @param {ObjectId|string} ownerId - ID stored on the resource
 * @param {ObjectId|string} userId - ID of the currently authenticated user
 * @returns {boolean}
 */
export const checkOwnership = (ownerId, userId) => {
  return ownerId.toString() === userId.toString();
};
