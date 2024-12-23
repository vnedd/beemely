import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

// schema Color variables
const DOCUMENT_NAME = 'Color';
const COLLECTION_NAME = 'Colors';

const colorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: COLLECTION_NAME,
  }
);

colorSchema.plugin(mongoosePaginate, {
  deletedAt: true,
  overrideMethods: true,
});

export default mongoose.model(DOCUMENT_NAME, colorSchema);
