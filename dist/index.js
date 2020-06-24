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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ImageProcessor_1 = __importDefault(require("./ImageProcessor"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const opencv4nodejs_1 = __importStar(require("opencv4nodejs"));
const refImage = opencv4nodejs_1.imread("./images/reference.png");
const imageProcessor = new ImageProcessor_1.default(refImage);
const imgsPath = "./images";
const imgFiles = fs_1.default.readdirSync(imgsPath);
imgFiles.map(f => path_1.default.resolve(imgsPath, f))
    .map(filePath => ({ image: opencv4nodejs_1.default.imread(filePath), filePath }))
    .map(({ filePath, image }) => {
    console.log(`Processing: ${filePath}`);
    console.log(`Meets Sharpness Criteria: ${imageProcessor.checkSharpness(image)}`);
});
//# sourceMappingURL=index.js.map