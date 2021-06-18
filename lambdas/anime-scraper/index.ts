import * as dynamoose from "dynamoose";
import { Document } from "dynamoose/dist/Document";

const schema = new dynamoose.Schema(
  {
    pk: {
      type: Object,
      hashKey: true,
      //@ts-expect-error
      set: (val) => `${val.entity}#${val.id}`,
      // "get": (val) =>  // split the string on # and return an object
    },
    sk: {
      type: Object,
      rangeKey: true,
      //@ts-expect-error
      set: (val) => `${val.entity}#${val.id}`,
      // "get": (val) =>  // split the string on # and return an object
    },
    // ... More attributes here
  },
  {
    saveUnknown: true, // now I can use attributes which aren't defined in the schema
    timestamps: true,
  }
);

class AnimeEntity extends Document {
  pk: { id: string; entity: string };
  sk: { id: string; entity: string };
}
export const handler = async (event: { title: string; id: string }) => {
  const AnimeEntity = dynamoose.model<AnimeEntity>("anime", schema);

  await AnimeEntity.create({
    pk: { id: event.id, entity: "ANIME" },
    sk: { id: "v1", entity: "VERSION" },
  });

  return;
};
