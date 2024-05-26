import { Component, Input } from '@angular/core';
import { Vector2 } from 'vectors-typescript';

@Component({
  selector: 'app-cards-connection',
  standalone: true,
  imports: [],
  templateUrl: './cards-connection.component.html',
  styleUrl: './cards-connection.component.scss'
})
export class CardsConnectionComponent {
  @Input()
  from: Vector2 = new Vector2(0, 0);
  @Input()
  to: Vector2 = new Vector2(10, 10);

  get size(): Vector2 {
    return new Vector2(
      Math.abs(this.from.x - this.to.x),
      Math.abs(this.from.y - this.to.y),
    );
  }

  get position(): Vector2 {
    return new Vector2(
      Math.min(this.from.x, this.to.x),
      Math.min(this.from.y, this.to.y),
    );
  }

  get goesDown(): boolean {
    return this.from.y < this.to.y;
  }

  get goesRight(): boolean {
    return this.from.x < this.to.x;
  }

}
