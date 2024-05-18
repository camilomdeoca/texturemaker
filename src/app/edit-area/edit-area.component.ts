import { AfterViewInit, Component } from '@angular/core';
import { PerlinNoiseNode } from 'texturemaker-library';
import { Vector2 } from 'vectors-typescript';
import { PerlinNoiseComponent } from '../cards/perlin-noise/perlin-noise.component';
import { NodeType } from './node-type.enum';
import { WorleyNoiseComponent } from '../cards/worley-noise/worley-noise.component';

@Component({
  selector: 'app-edit-area',
  standalone: true,
  imports: [PerlinNoiseComponent, WorleyNoiseComponent],
  templateUrl: './edit-area.component.html',
  styleUrl: './edit-area.component.scss'
})
export class EditAreaComponent implements AfterViewInit {
  public nodes: { id: string, type: NodeType, position: Vector2 }[] = [
    {
      id: "awdaw",
      type: NodeType.PerlinNoise,
      position: new Vector2(0, 0),
    },
    {
      id: "aaaaaa",
      type: NodeType.WorleyNoise,
      position: new Vector2(0, 0),
    },
  ];

  NodeType = NodeType; // Expose enum to template

  ngAfterViewInit(): void {
    for (let node of this.nodes) {
      if (node instanceof PerlinNoiseNode)
        console.log("is PerlinNoiseNode");
      console.log(node);
    }
  }

}
