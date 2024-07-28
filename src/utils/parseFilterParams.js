const parseIsFavourite = (favourite) => {
  const isString = typeof favourite === "string";

  if (!isString) return;

  const lowerCaseFavourite = favourite.toLowerCase();
  if (lowerCaseFavourite === "true" || lowerCaseFavourite === "1") {
    return true;
  } else if (lowerCaseFavourite === "false" || lowerCaseFavourite === "0") {
    return false;
  }

  return undefined;
};

export const parseFilterParams = (query) => {
  const { isFavourite } = query;

  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    isFavourite: parsedIsFavourite,
  };
};
