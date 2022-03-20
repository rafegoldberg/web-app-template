import M from "mongoose";

const options = {
  timestamps: true,
  discriminatorKey: "type",
  toObject: { virtuals: true },
  toJSON: {
    getters: true,
    versionKey: false,
    depopulate: false,
    virtuals: true,
  },
};

const PageSchema = new M.Schema(
  {
    slug: { type: String, trim: true, unique: true },
    title: { type: String, required: true, trim: true, unique: true },
    displayTitle: { type: String, trim: true },
    body: { type: String, trim: true },
    author: { type: M.Types.ObjectId, ref: "User" },
    type: { type: String, default: "Page" },
  },
  options
);

PageSchema.methods = {
  async children(fn) {
    const parent = this._id;
    return M.model("ChildPage").find({ parent }, fn);
  },
  async makeRootPage() {
    const clone = this.toJSON();
    delete clone.type;
    delete clone.parent;
    await this.remove();
    return new M.model("Page")(clone).save();
  },
  async makeChildPage(parent) {
    if (this.type === "ChildPage")
      return console.error("This is already a child page!");
    if (!parent)
      return console.error("Conversion requires a parent ID to be passed.");

    await this.remove();
    return new M.model("ChildPage")({
      ...this.toJSON(),
      parent,
      type: "ChildPage",
    }).save();
  },
};

PageSchema.pre("save", function set_slug(next) {
  if (!this.slug) this.slug = generateSlug(this.title);
  return next();
});

PageSchema.pre("findOneAndUpdate", async function () {
  const update = this.getUpdate();
  const doc = (await this.model.findOne(this.getQuery())) || {};

  if (update.slug) update.slug = generateSlug(update.slug);
  else if (!doc.slug) update.slug = generateSlug(update.title || doc.title);

  this.setUpdate(update);
});

export const Page = M.model("Page", PageSchema);

export const ChildPage = Page.discriminator(
  "ChildPage",
  new M.Schema(
    { parent: { type: M.Types.ObjectId, ref: "Page", required: true } },
    options
  )
);

export default Page;

/* Utility Methods
 */
export function generateSlug(str) {
  return !str
    ? ""
    : str
        .toLowerCase()
        .replace(/\s+/g, "-") // replace spaces w/dashes
        .replace(/[^\w\-]+/g, "") // remove non-word chars
        .replace(/\-\-+/g, "-") // merge multiple dashes
        .replace(/^-+/, "") // trim start
        .replace(/-+$/, ""); // trim end
}
