import { createClient } from "contentful";

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE!;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!;

if (!space && !accessToken) {
  alert("Please provide contentfull space id and accessToken");
}
export let cful = createClient({
  space,
  accessToken,
});
