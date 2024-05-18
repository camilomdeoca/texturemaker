import { ElementRef } from "@angular/core";
import { INode } from "texturemaker-library";
import { Vector2 } from "vectors-typescript";

// The node to get the data from, the canvas to render to and the size of the rendered image
const drawNodeToCanvas = (node: INode, context: CanvasRenderingContext2D, size: number) => {
  const width = size;
  const height = size;
  const data: Uint8ClampedArray = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const color = node.getValueAt(new Vector2(x / (width - 1), y / (height - 1)));
      data[(y * width + x) * 4 + 0] = color.r * 255;
      data[(y * width + x) * 4 + 1] = color.g * 255;
      data[(y * width + x) * 4 + 2] = color.b * 255;
      data[(y * width + x) * 4 + 3] = color.a * 255;
    }
  }
  console.log(data.length);
  const imageData: ImageData = new ImageData(data, size, size);

  context.putImageData(imageData, 0, 0);
};

export { drawNodeToCanvas };
