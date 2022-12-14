export default {
  name: "class",
  title: "Class",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "array",
      of: [{ type: "image" }],
      options: {
        hotspot: true,
      },
    },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 90,
      },
    },
    {
      name: "length",
      title: "Length",
      type: "number",
    },
    {
      name: "intensity",
      title: "Intensity",
      type: "string",
    },
    {
      name: "catagories",
      title: "catagories",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "details",
      title: "Details",
      type: "string",
    },
    {
      name: "trainer",
      title: "Trainer",
      type: "string",
    },
  ],
};
