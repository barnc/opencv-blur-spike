import ImageProcessor from './ImageProcessor'
import fs from 'fs'
import path from 'path'
import cv, { imread } from 'opencv4nodejs'
import { Mat } from 'opencv4nodejs'

const refImage = imread("./images/reference.png")

const imageProcessor = new ImageProcessor(refImage)

const imgsPath = "./images"
const imgFiles: string[] = fs.readdirSync(imgsPath);

imgFiles.map(f => path.resolve(imgsPath, f))
        .map(filePath => ({ image: cv.imread(filePath), filePath}))
        .map(({filePath, image}) => {
            console.log(`Processing: ${filePath}`);
            console.log(`Meets Sharpness Criteria: ${imageProcessor.checkSharpness(image)}`)
        })