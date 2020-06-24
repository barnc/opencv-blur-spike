import cv, { Mat, imread, imwrite } from "opencv4nodejs";



const SHARPNESS_THRESHOLD: number = 0.7;

export default class ImageProcessor {

    private refImage: Mat;
    private refImageSharpness: number;
    

    constructor(refImage: Mat) {
        this.refImage = refImage
        this.refImageSharpness = this.measureSharpness(refImage.bgrToGray())
    }

    private measureSharpness = (image: Mat): number => {
        imwrite(`./processed/${Date.now()}.jpg`, image)
        const des: Mat = image.laplacian(cv.CV_64F)
        const { mean, stddev } = des.meanStdDev()
        const sharpness: number = Math.pow(stddev.at(0, 0), 2);
        return sharpness;

    }

    checkSharpness = (image: Mat) : boolean => {
        const refPixels = this.refImage.sizes[0] * this.refImage.sizes[1]
        const imagePixels = image.sizes[0] * image.sizes[1]
        const scale: number = Math.pow(refPixels / imagePixels, 0.5);    
        const resized: Mat = image.resize(Math.round(image.sizes[0] * scale), Math.round(image.sizes[1] * scale))
        const sharpness: Number = this.measureSharpness(resized.bgrToGray())
        console.log(`Sharpness: ${sharpness}`)
        return sharpness > this.refImageSharpness * SHARPNESS_THRESHOLD;
    }
}