import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Color, ColorizeControlPoint, ColorizeNode, INode } from 'texturemaker-library';
import { FormsModule } from '@angular/forms';
import { CardControl } from '../../control.component';
import { ColorPickerComponent } from '../../../../custom-components/color-picker/color-picker.component';
import { Vector2 } from 'vectors-typescript';

/* TODO: When clicking on colorMappingBar create a new control point on the mouse position
 * TODO: Way to drag the control points
 */

@Component({
  selector: 'app-colorize-control',
  standalone: true,
  imports: [FormsModule, ColorPickerComponent],
  templateUrl: './colorize-control.component.html',
  styleUrl: './colorize-control.component.scss'
})
export class ColorizeControlComponent extends CardControl implements OnInit, AfterViewInit {
  @Input({
    required: true,
    transform: (value: INode): ColorizeNode => {
      if (!(value instanceof ColorizeNode))
        throw new Error("assigned incorrect node type");
      return value as ColorizeNode;
    }
  })
  node!: ColorizeNode;

  public colors: string[] = [];

  public onColorPickerChange(): void {
    for (let i = 0; i < this.node.colors.length; i++) {
      this.node.colors[i].color = Color.fromHex(this.colors[i]);
    }
    this.drawColorMappingBar();
    this.onChange();
  }

  public syncStringColorsWithNode(): void {
    this.colors = [];
    for (let controlPoint of this.node.colors) {
      this.colors.push(controlPoint.color.toHex());
    }
  }

  public onChange() {
    this.syncStringColorsWithNode();
    this.drawColorMappingBar();
    if (this.changeCallback !== undefined)
      this.changeCallback();
  }

  @ViewChild('colorMappingBar', { static: false })
  private colorMappingBarCanvas: ElementRef<HTMLCanvasElement> | null = null;
  colorMappingBarCanvasContext: CanvasRenderingContext2D | null = null;

  ngOnInit(): void {
    for (let controlPoint of this.node.colors) {
      this.colors.push(controlPoint.color.toHex());
    }
  }

  ngAfterViewInit(): void {
    this.colorMappingBarCanvasContext = this.colorMappingBarCanvas!.nativeElement.getContext('2d');
    this.drawColorMappingBar();
  }

  drawColorMappingBar(): void {
    let ctx = this.colorMappingBarCanvasContext;
    if (ctx !== null) {
      const w = ctx.canvas.width;
      const h = ctx.canvas.height;
      const gradient = ctx.createLinearGradient(0, h, 0, 0);
      for (let controlPoint of this.node.colors) {
        gradient.addColorStop(controlPoint.lightness, controlPoint.color.toHex());
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    }
  }

  private _movingControlPointIndex: number | undefined = undefined;
  startControlPointDrag(_event: MouseEvent, controlPointIndex: number): void {
    document.onmousemove = this.onControlPointDrag;
    document.onmouseup = this.endControlPointDrag;
    this._movingControlPointIndex = controlPointIndex;
  }

  endControlPointDrag = (_event: MouseEvent): void => {
    document.onmousemove = null;
    document.onmouseup = null;
    this._movingControlPointIndex = undefined;
    this.onChange();
  }

  onControlPointDrag = (event: MouseEvent): void => {
    const rect = this.colorMappingBarCanvas!.nativeElement.getBoundingClientRect();
    const relativePos = new Vector2(
      event.pageX - rect.x,
      event.pageY - rect.y
    );
    let lightness = 1 - (relativePos.y / rect.height);
    lightness = lightness < 0 ? 0 : lightness > 1 ? 1 : lightness;
    let controlPoint = this.node.colors.splice(this._movingControlPointIndex!, 1)[0];
    controlPoint.lightness = lightness;
    this._movingControlPointIndex = this.addControlPoint(controlPoint);
    this.drawColorMappingBar();
  }

  removeControlPointOfLightness(lightness: number): void {
    const indexToRemove = this.node.colors.findIndex(elem => elem.lightness === lightness);
    this.node.colors.splice(indexToRemove, 1);
    this.onChange();
  }

  addControlPoint(controlPoint: ColorizeControlPoint): number {
    let leftIndex = 0;
    let rightIndex = this.node.colors.length;
    while (leftIndex < rightIndex) {
      const midIndex = Math.floor((leftIndex + rightIndex) / 2);
      if (this.node.colors[midIndex].lightness < controlPoint.lightness) {
        leftIndex = midIndex + 1;
      } else {
        rightIndex = midIndex;
      }
    }
    this.node.colors.splice(leftIndex, 0, {
      lightness: controlPoint.lightness,
      color: controlPoint.color,
    });
    return leftIndex;
  }

  public onColorMappingBarClick(event: MouseEvent): void {
    const rect = this.colorMappingBarCanvas!.nativeElement.getBoundingClientRect();
    const relativePos = new Vector2(
      event.pageX - rect.x,
      event.pageY - rect.y
    );

    let lightness = 1 - (relativePos.y / rect.height);
    lightness = lightness < 0 ? 0 : lightness > 1 ? 1 : lightness;
    this.addControlPoint({
      lightness: lightness,
      color: this.node.getColorMappedToLightness(lightness),
    });
    this.onChange();
  }

  public onControlPointLightnessChange(): void {
    this.node.colors.sort((elem1: ColorizeControlPoint, elem2: ColorizeControlPoint): number => {
      if (elem1.lightness < elem2.lightness) return -1;
      if (elem1.lightness > elem2.lightness) return 1;
      return 0;
    });
    this.onChange();
  }
}
