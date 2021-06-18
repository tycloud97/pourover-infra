import * as dynamoose from "dynamoose";
import { Document } from "dynamoose/dist/Document";

const schema = new dynamoose.Schema(
  {
    PK: {
      type: Object,
      hashKey: true,
      //@ts-expect-error
      set: (val) => `${val.entity}#${val.id}`,
      // "get": (val) =>  // split the string on # and return an object
    },
    SK: {
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
  PK: { id: string; entity: string };
  SK: { id: string; entity: string };
  title: string;
}
export const handler = async (event: { title: string; id: string }) => {
  // create domain model
  const AnimeEntity = dynamoose.model<AnimeEntity>("anime", schema, {
    create: false,
  });

  // extract attributes from event
  const { title, id } = event;

  // create instance of the model
  const anime = new AnimeEntity({
    PK: { id, entity: "ANIME" },
    SK: { id: "v1", entity: "VERSION" },
    title,
  });

  // save model to dynamo
  return await anime.save().catch((err) => console.error(err));
};
