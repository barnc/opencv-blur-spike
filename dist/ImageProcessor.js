"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const opencv4nodejs_1 = __importStar(require("opencv4nodejs"));
const SHARPNESS_THRESHOLD = 0.7;
class ImageProcessor {
    constructor(refImage) {
        this.measureSharpness = (image) => {
            opencv4nodejs_1.imwrite(`./processed/${Date.now()}.jpg`, image);
            const des = image.laplacian(opencv4nodejs_1.default.CV_64F);
            const { mean, stddev } = des.meanStdDev();
            const sharpness = Math.pow(stddev.at(0, 0), 2);
            return sharpness;
        };
        this.checkSharpness = (image) => {
            const refPixels = this.refImage.sizes[0] * this.refImage.sizes[1];
            const imagePixels = image.sizes[0] * image.sizes[1];
            const scale = Math.pow(refPixels / imagePixels, 0.5);
            const resized = image.resize(Math.round(image.sizes[0] * scale), Math.round(image.sizes[1] * scale));
            const sharpness = this.measureSharpness(resized.bgrToGray());
            console.log(`Sharpness: ${sharpness}`);
            return sharpness > this.refImageSharpness * SHARPNESS_THRESHOLD;
        };
        this.refImage = refImage;
        this.refImageSharpness = this.measureSharpness(refImage.bgrToGray());
    }
}
exports.default = ImageProcessor;
//# sourceMappingURL=ImageProcessor.js.map