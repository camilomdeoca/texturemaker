import { Component, Input } from '@angular/core';
import { WorleyNoiseNode, INode } from 'texturemaker-library';
import { FormsModule } from '@angular/forms';
import { CardControl } from '../../control.component';
import { WorleyPointGenerationAlgorithm, WorleyPointSelectionCriteria } from 'noises-library';

interface NumberRange {
  min: number,
  max: number
}

@Component({
  selector: 'app-worley-noise-control',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './worley-noise-control.component.html',
  styleUrl: './worley-noise-control.component.scss'
})
export class WorleyNoiseControlComponent extends CardControl {
  static numPointsRange: NumberRange = { min: 1, max: 256**2};

  WorleyNoiseControlComponent = WorleyNoiseControlComponent;
  WorleyPointGenerationAlgorithm = WorleyPointGenerationAlgorithm;
  WorleyPointSelectionCriteria = WorleyPointSelectionCriteria;
  Object = Object;

  constructor() { super(); console.log(WorleyPointGenerationAlgorithm); }

  *getWorleyPointGenerationAlgorithmEntries() {
    yield { name: "Random", value: WorleyPointGenerationAlgorithm.Random};
    yield { name: "Halton", value: WorleyPointGenerationAlgorithm.Halton };
    yield { name: "Hammersley", value: WorleyPointGenerationAlgorithm.Hammersley };
  }

  *getWorleyPointSelectionCriteriaEntries() {
    yield { name: "Closest point", value: WorleyPointSelectionCriteria.Closest};
    yield { name: "Second closest point", value: WorleyPointSelectionCriteria.SecondClosest};
    yield { name: "Second closest - first closest", value: WorleyPointSelectionCriteria.SecondMinusClosest};
  }

  @Input({
    required: true,
    transform: (value: INode): WorleyNoiseNode => {
      if (!(value instanceof WorleyNoiseNode))
        throw new Error("assigned incorrect node type");
      return value as WorleyNoiseNode;
    }
  })
  node!: WorleyNoiseNode;

  public onChange(): void {
    if (this.changeCallback !== undefined)
      this.changeCallback();
  }
}
