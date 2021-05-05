// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    {
      title: "постууд",
      name: "post",
      type: "document",
      fields: [
        {
          title: "постын гарчиг",
          name: "title",
          type: "string",
          description: "Блогын үндсэн гарчиг. 50 тэмдэгтээс бүү хэтрүүлээрэй",
          validation: (Rule) => [
            Rule.required()
              .min(10)
              .error("Гарчиг хамгийн багадаа 10 үсгээс тогтоно"),
            Rule.max(80).warning("Гарчиг 80 тэмдэгтээс хэтрэхгүй байвал сайн"),
          ],
        },
        {
          title: "дэд гарчиг",
          name: "subtitle",
          type: "string",
          description: "постын төрлийг текстээр бичих",
        },
        {
          title: "постын зураг",
          name: "cover_image",
          type: "image",
          fields: [
            {
              title: "зургийн тайлбар",
              name: "alt",
              type: "text",
            },
          ],
          options: {
            hotspot: true,
          },
        },
        {
          name: "content",
          type: "array",
          title: "постын агуулга",
          of: [
            {
              type: "block",
            },
            {
              type: "image",
              fields: [
                {
                  title: "зургийн тайлбар",
                  name: "alt",
                  type: "text",
                  options: {
                    isHighlighted: true,
                  },
                },
                {
                  title: "зургийн байрлал",
                  name: "position",
                  type: "string",
                  options: {
                    isHighlighted: true,
                    list: [
                      { title: "Голлуулж", value: "center" },
                      { title: "Баруун талд", value: "right" },
                      { title: "Зүүн талд", value: "left" },
                    ],
                    layout: "radio",
                  },
                },
              ],
              options: {
                hotspot: true,
              },
            },
            {
              type: "code",
              options: {
                withFilename: true,
              },
            },
          ],
        },
        {
          title: "Огноо",
          name: "date",
          type: "datetime",
        },
        {
          title: "хаяг",
          name: "slug",
          type: "slug",
          options: {
            source: "title",
            maxLength: 200, // will be ignored if slugify is set
            slugify: (input) =>
              input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
          },
        },
        {
          title: "нийтлэгч",
          name: "publisher",
          type: "reference",
          to: [{ type: `publisher` }],
        },
      ],
    },
    {
      title: "нийтлэгч",
      name: "publisher",
      type: "document",
      fields: [
        {
          title: "нийтлэгчийн нэр",
          name: "title",
          type: "string",
        },
        {
          title: "нийтлэгчийн зураг",
          name: "picture",
          type: "image",
        },
      ],
    },
  ]),
});
