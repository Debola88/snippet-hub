import mongoose, { Schema, Document } from "mongoose";

export interface ISnippet extends Document {
  userId: mongoose.Types.ObjectId;
  functionName: string;
  language: string;
  description: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
}

const snippetSchema = new Schema<ISnippet>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    functionName: { type: String, required: true },
    language: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
  },
  { timestamps: true }
);

const Snippet = mongoose.models.Snippet || mongoose.model<ISnippet>("Snippet", snippetSchema);
export default Snippet;
