export default {
  name: "trainer",
  title: "Trainer",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
    },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "quote",
      title: "Quote",
      type: "string",
    },
    {
      name: "desc",
      title: "Desc",
      type: "string",
    },
    {
      name: "classes",
      title: "Classes",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
};
