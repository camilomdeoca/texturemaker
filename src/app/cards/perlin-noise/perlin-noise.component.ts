import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PerlinNoiseNode } from 'texturemaker-library';
import { Vector2 } from 'vectors-typescript';
import { drawNodeToCanvas } from '../utils';

@Component({
  selector: 'app-perlin-noise',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './perlin-noise.component.html',
  styleUrl: './perlin-noise.component.scss'
})
export class PerlinNoiseComponent implements AfterViewInit {
  @Input()
  position: Vector2 = new Vector2(0, 0);

  minOctaves: number = 1;
  maxOctaves: number = 16
  octaves: number = 4;

  minScale: number = 0.1;
  maxScale: number = 10;
  scale: number = 1;

  @ViewChild('texturePreviewCanvas', { static: false })
  private texturePreviewCanvas: ElementRef | null = null;
  private texturePreviewContext: CanvasRenderingContext2D | null = null;

  constructor() { }

  onChange = () => {
    if (this.texturePreviewContext !== null) {
      console.log(this.octaves);
      console.log(this.texturePreviewCanvas);
      this.noise.startingOctaveIndex = this.octaves - 1;
      drawNodeToCanvas(this.noise, this.texturePreviewContext!, this.textureSize);
    }
  };

  textureSize: number = 128;

  private noise: PerlinNoiseNode = new PerlinNoiseNode();

  ngAfterViewInit(): void {
    this.texturePreviewContext = this.texturePreviewCanvas!.nativeElement.getContext('2d')!;
    drawNodeToCanvas(this.noise, this.texturePreviewContext!, this.textureSize);
  }
}
