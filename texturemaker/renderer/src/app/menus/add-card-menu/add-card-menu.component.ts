import { Component, Input } from '@angular/core';
import { CardType, CardTypeList, cardTypeToName } from '../../card/card-type.enum';
import { Vector2 } from 'vectors-typescript';

@Component({
  selector: 'app-add-card-menu',
  standalone: true,
  imports: [],
  templateUrl: './add-card-menu.component.html',
  styleUrl: './add-card-menu.component.scss'
})
export class AddCardMenuComponent {
  @Input()
  position: Vector2 = new Vector2(0, 0);

  @Input({ required: true })
  cardTypeSelectedCallback!: (type: CardType) => void;

  CardTypeList = CardTypeList;
  cardTypeToName = cardTypeToName;

  public onCardTypeSelected(type: CardType): void {
    this.cardTypeSelectedCallback(type);
  }
}
