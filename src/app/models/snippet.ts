import mongoose, {Schema} from "mongoose";

const snippetSchema = new Schema(
{
    functionName: {type: String, required: true},
    language: {type: String, required: true},
    description: {type: String, required: true},
    code: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
}
);

const Snippet = mongoose.models.Snippet || mongoose.model("Snippet", snippetSchema);

export default Snippet;