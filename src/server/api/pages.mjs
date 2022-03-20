import express from "express";
import Page, { ChildPage, generateSlug } from "../../db/models/page.mjs";

const PagesAPI = express();

const POPULATE = ["author", { path: "parent", select: "title" }];

const OPTIONS = {
  findOneAndUpdate: {
    upsert: true, // add if not found
    new: true, // return the updated doc
  },
};

async function updatePage(title, updates = {}) {
  const PageModel = updates.parent ? ChildPage : Page;
  const page = await PageModel.findOneAndUpdate(
    { title },
    updates,
    OPTIONS.findOneAndUpdate
  ).populate(POPULATE);
  return page;
}

async function findPages(filter = {}) {
  let page = await Page.find(filter || {}).populate(POPULATE);
  if (!page) throw new Error(`No matching pages found.`);
  return page;
}

PagesAPI.get("/:slug?", async ({ query, params }, res) => {
  const slug = generateSlug(params.slug);
  const filter = slug ? { slug, ...query } : query;
  try {
    const pages = await findPages(filter);
    if (!pages.length)
      return res.status(400).json({
        message: `We lost the thread somewhere. 🧵 Sorry about that.`,
        title: `Oy vey!`,
      });
    return res.json(pages);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: e.message });
  }
});

PagesAPI.post("/:slug", async ({ query, params }, res) => {
  const { slug } = params;
  try {
    const updated = await updatePage(slug, query);
    return res.json(updated);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

PagesAPI.put("/:slug", async ({ query, params }, res) => {
  let { slug } = params;
  try {
    const updated = await updatePage(slug, query, true);
    return res.json(updated);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

export default PagesAPI;
