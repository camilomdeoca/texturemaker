import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { INode, PerlinNoiseNode } from 'texturemaker-library';
import { CardControl } from '../../control.component';

@Component({
  selector: 'app-perlin-noise-control',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './perlin-noise-control.component.html',
  styleUrl: './perlin-noise-control.component.scss'
})
export class PerlinNoiseControlComponent extends CardControl implements OnInit {
  @Input({
    required: true,
    transform: (value: INode): PerlinNoiseNode => {
      if (!(value instanceof PerlinNoiseNode))
        throw new Error("assigned incorrect node type");
      return value as PerlinNoiseNode;
    }
  })
  node!: PerlinNoiseNode;

  PerlinNoiseControlComponent = PerlinNoiseControlComponent;
  static minStartOctave: number = 0;
  static maxStartOctave: number = 8;

  static minScale: number = 1;
  static maxScale: number = 10;

  static minOctavesCount: number = 1;
  static maxOctavesCount: number = 8;

  static minWeightsRelation: number = 0;
  static maxWeightsRelation: number = 1;

  public octavesWeights!: number[];
  public useWeightsRelation: boolean = true;
  public weightsRelation: number = 0.5;
  get octavesCount(): number { return this.octavesWeights.length; }
  set octavesCount(octavesCount: number) {
    if (octavesCount == this.octavesWeights.length)
      return;
    if (octavesCount > this.octavesWeights.length)
      this.octavesWeights = [...this.octavesWeights, ...Array(octavesCount - this.octavesWeights.length, 0)];
    else
      this.octavesWeights = [...this.octavesWeights.slice(0, octavesCount)];
  }

  // weight_n * factor = weight_n+1
  private makeWeightsProportional(factor: number) {
    for (let i = 0; i < this.octavesWeights.length; i++) {
      this.octavesWeights[i] = factor ** i;
    }
  }

  public onChange(): void {
    if (this.useWeightsRelation)
      this.makeWeightsProportional(this.weightsRelation);
    this.node.octavesWeights = this.octavesWeights;
    if (this.changeCallback !== undefined)
      this.changeCallback();
  }

  ngOnInit(): void {
     this.octavesWeights = [...this.node.octavesWeights];
  }
}
