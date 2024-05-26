import { CdkDrag, CdkDragHandle, CdkDragMove } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CardType, cardTypeToName } from './card-type.enum';
import { Vector2 } from 'vectors-typescript';
import { ColorCorrectionNode, INode, PerlinNoiseNode, WorleyNoiseNode } from 'texturemaker-library';
import { CardInputDirective } from '../card/input/card-input.directive';
import { CardOutputDirective } from '../card/output/card-output.directive';
import { PerlinNoiseControlComponent } from './controls/generators/perlin-noise-control/perlin-noise-control.component';
import { ColorCorrectionControlComponent } from './controls/filters/color-correction-control/color-correction-control.component';
import { FormsModule } from '@angular/forms';
import { drawNodeToCanvas } from '../card/utils';
import { WorleyNoiseControlComponent } from './controls/generators/worley-noise-control/worley-noise-control.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CdkDrag,
    CdkDragHandle,
    CardInputDirective,
    CardOutputDirective,
    PerlinNoiseControlComponent,
    WorleyNoiseControlComponent,
    ColorCorrectionControlComponent,
    FormsModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit, AfterViewInit {
  @Input({ required: true })
  startConnectionCallback!: (card: CardComponent, output: string) => void;
  @Input({ required: true })
  endConnectionCallback!: (card: CardComponent, input: string) => void;

  @Input()
  updateChildrenOfCallback: ((card: CardComponent) => void) | undefined = undefined;

  public console = console;
  public CardType = CardType;
  public PerlinNoiseNode = PerlinNoiseNode;

  @Input({ required: true })
  public cardType!: CardType;
  public get cardName(): string { return cardTypeToName(this.cardType); }

  @ViewChildren(CardInputDirective)
  private inputElems!: QueryList<CardInputDirective>;
  @ViewChildren(CardOutputDirective)
  private outputElems!: QueryList<CardOutputDirective>;

  public node!: INode;

  get inputs(): {
    name: string,
    position: Vector2
  }[] {
    let result: {
      name: string,
      position: Vector2
    }[] = [];

    for (let [key, _value] of this.node.inputs) {
      const rect = this.inputElems.find(elem => elem.appCardInput === key)!.elementRef!.nativeElement.getBoundingClientRect();
      result.push({
        name: key,
        position: new Vector2(
          rect.x + rect.width / 2 + window.scrollX,
          rect.y + rect.height / 2 + window.scrollY
        )
      });
    }

    return result;
  }

  getInputPos(name: string): Vector2 {
    return this.inputs.find(elem => elem.name === name)!.position;
  }

  get outputs(): {
    name: string,
    position: Vector2
  }[] {
    const rect = this.outputElems.find(elem => elem.appCardOutput === "output")!.elementRef!.nativeElement.getBoundingClientRect();
    return [{
      name: "output",
      position: new Vector2(
        rect.x + rect.width / 2 + window.scrollX,
        rect.y + rect.height / 2 + window.scrollY
      ),
    }];
  }

  getOutputPos(name: string): Vector2 {
    return this.outputs.find(elem => elem.name === name)!.position;
  }

  ngOnInit(): void {
    let node;
    switch (this.cardType) {
      case CardType.PerlinNoise:
        node = new PerlinNoiseNode();
        break;
      case CardType.WorleyNoise:
        node = new WorleyNoiseNode();
        break;
      case CardType.ColorCorrection:
        node = new ColorCorrectionNode();
        break;
      default:
        throw new Error("Invalid card type");
    }
    this.node = node;
  }

  onDragMove(_event: CdkDragMove): void {
    // Just calling a function on move makes the connection move with the card
  }

  onMouseDownOnOutput(name: string): void {
    this.startConnectionCallback(this, name);
  }

  onMouseUpOnInput(name: string): void {
    this.endConnectionCallback(this, name);
  }

  textureSize: number = 128;

  @ViewChild('texturePreviewCanvas', { static: false })
  private texturePreviewCanvas: ElementRef<HTMLCanvasElement> | null = null;
  private texturePreviewContext: CanvasRenderingContext2D | null = null;
  public onChange = (): void => {
    if (this.texturePreviewContext !== null) {
      drawNodeToCanvas(this.node, this.texturePreviewContext!, this.textureSize);
      if (this.updateChildrenOfCallback !== undefined)
        this.updateChildrenOfCallback(this);
    }
  }

  ngAfterViewInit(): void {
    this.texturePreviewContext = this.texturePreviewCanvas!.nativeElement.getContext('2d')!;
    drawNodeToCanvas(this.node, this.texturePreviewContext!, this.textureSize);
  }
}
