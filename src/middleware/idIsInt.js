
export const isInt = (req,res,next) => {
  const { id } = req.params;
  if (!Number.isInteger(parseInt(id)) || id <= 0) {
    return res.status(400).json({ message: 'Invalid ID' });
  }
  next();
}
