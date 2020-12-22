const normalizeTransform = (_, ret) => {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
};

module.exports = normalizeTransform;
