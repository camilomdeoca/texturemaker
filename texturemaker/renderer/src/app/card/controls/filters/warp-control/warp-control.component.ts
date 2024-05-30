import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { INode, WarpNode } from 'texturemaker-library';
import { CardControl } from '../../control.component';

@Component({
  selector: 'app-warp-control',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './warp-control.component.html',
  styleUrl: './warp-control.component.scss'
})
export class WarpControlComponent extends CardControl {
  @Input({
    required: true,
    transform: (value: INode): WarpNode => {
      if (!(value instanceof WarpNode))
        throw new Error("assigned incorrect node type");
      return value as WarpNode;
    }
  })
  node!: WarpNode;

  public onChange(): void {
    if (this.changeCallback !== undefined)
      this.changeCallback();
  }
}
