const slugify = string => {
  return string
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .replace(/ /gi, '-');
};

module.exports = slugify;
