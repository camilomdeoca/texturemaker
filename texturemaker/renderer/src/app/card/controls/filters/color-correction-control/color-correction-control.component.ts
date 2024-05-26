import { Component, Input } from '@angular/core';
import { ColorCorrectionNode, INode } from 'texturemaker-library';
import { FormsModule } from '@angular/forms';
import { CardControl } from '../../control.component';

@Component({
  selector: 'app-color-correction-control',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './color-correction-control.component.html',
  styleUrl: './color-correction-control.component.scss'
})
export class ColorCorrectionControlComponent extends CardControl {
  @Input({
    required: true,
    transform: (value: INode): ColorCorrectionNode => {
      if (!(value instanceof ColorCorrectionNode))
        throw new Error("assigned incorrect node type");
      return value as ColorCorrectionNode;
    }
  })
  node!: ColorCorrectionNode;

  public onChange(): void {
    if (this.changeCallback !== undefined)
      this.changeCallback();
  }
}
