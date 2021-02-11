import mongoose from './mongoose';

const Schema = mongoose.Schema;

// A safeguard against people spamming the perspective api endpoint
const PictureTemplateSchema = new Schema({
    resourceId: String,
    // The following are percentages represented by floats in between 0 and 1
    offset: {
        left: Number,
        right: Number,
        top: Number,
        bottom: Number,
    },
    variant: String, // right now "flip" or "impose",
    backgroundColor: String,
    textColor: String
});

const PictureTemplate =
    mongoose.models.PictureTemplate || mongoose.model('PictureTemplate', PictureTemplateSchema);

export default PictureTemplate;

/*
{
  "resourceId": "6_mazbcx",
  "textColor": "black",
  "offset": {
    "top": 0,
    "bottom": 0,
    "left": 0,
    "right": 0
  },
  "variant": "impose"
}

 */