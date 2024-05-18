import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WorleyNoiseNode } from 'texturemaker-library';
import { drawNodeToCanvas } from '../utils';

@Component({
  selector: 'app-worley-noise',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './worley-noise.component.html',
  styleUrl: './worley-noise.component.scss'
})
export class WorleyNoiseComponent implements AfterViewInit {
  public textureSize: number = 128;
  public maxPoints: number = 1000;
  public minPoints: number = 0;
  public noise: WorleyNoiseNode = new WorleyNoiseNode();

  @ViewChild('texturePreviewCanvas', { static: false })
  private texturePreviewCanvas: ElementRef | null = null;
  private texturePreviewContext: CanvasRenderingContext2D | null = null;

  public onChange = () => {
    console.log("aaaa");
  };

  ngAfterViewInit(): void {
    this.texturePreviewContext = this.texturePreviewCanvas!.nativeElement.getContext('2d')!;
    drawNodeToCanvas(this.noise, this.texturePreviewContext!, this.textureSize);
  }

}
