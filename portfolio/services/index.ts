import { cful } from "./contentful";

export const getSiteMetadata = async () => {
  const response = await cful?.getEntries();
  return response?.items[0];
};

export const getAssets = async () => {
  const response = await cful?.getAssets();
  return response?.items;
};
