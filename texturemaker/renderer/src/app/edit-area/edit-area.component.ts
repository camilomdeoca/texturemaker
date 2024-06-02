import { Component, ViewChildren, QueryList, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Vector2 } from 'vectors-typescript';
import { CardsConnectionComponent } from '../cards-connection/cards-connection.component';
import { CardComponent } from '../card/card.component'
import { CardType } from '../card/card-type.enum';
import { AddCardMenuComponent } from '../menus/add-card-menu/add-card-menu.component';

interface CardsConnection {
  from: {
    card: CardComponent,
    output: string
  },
  to: {
    card: CardComponent,
    input: string
  },
}

@Component({
  selector: 'app-edit-area',
  standalone: true,
  imports: [CardComponent, CardsConnectionComponent, AddCardMenuComponent, FormsModule],
  templateUrl: './edit-area.component.html',
  styleUrl: './edit-area.component.scss'
})
export class EditAreaComponent {
  nodes: {
    id: string,
    type: CardType,
    position: Vector2,
  }[] = [];

  nextValidIdInt: number = 1;
  scale: number = 1;
  connections: CardsConnection[] = Array();
  startedConnection: { card: CardComponent, output: string } | undefined = undefined;
  mousePosStart: Vector2 = new Vector2(0, 0);
  mousePos: Vector2 = new Vector2(0, 0);
  addCardMenuData: {
    show: boolean,
    position: Vector2 | undefined,
  } = {
    show: false,
    position: undefined,
  };

  panningData: {
    editAreaPosition: Vector2,
    startEditAreaPosition: Vector2,
    startMousePos: Vector2 | undefined,
  } = {
    editAreaPosition: new Vector2(0, 0),
    startEditAreaPosition: new Vector2(0, 0),
    startMousePos: undefined,
  };

  CardType = CardType; // Expose enum to template
  Vector2 = Vector2;

  @ViewChildren('card')
  cardComponents!: QueryList<CardComponent>;

  constructor() { }

  connectCards(
    from: {
      card: CardComponent,
      output: string
    },
    to: {
      card: CardComponent,
      input: string
    }
  ) {
    this.connections.push({
      from: {
        card: from.card,
        output: from.output
      },
      to: {
        card: to.card,
        input: to.input
      }
    });
    to.card.node.inputs.set(to.input, from.card.node);
    to.card.onChange();
    console.log(to.card.node);
  }

  onStartConnection = (card: CardComponent, output: string): void => {
    console.log("Start connection from output", output);
    this.startedConnection = { card: card, output: output };
    this.mousePosStart = this.mousePos = card.getOutputPos(output);
    console.log(this.mousePosStart);
  }

  onMouseMove = (event: MouseEvent): void => {
    if (this.startedConnection !== undefined) {
      this.mousePos = new Vector2(event.pageX, event.pageY);
    } else if (this.panningData.startMousePos !== undefined) {
      this.mousePos = new Vector2(event.pageX, event.pageY);
      this.panningData.editAreaPosition = Vector2.add(
        this.panningData.startEditAreaPosition,
        Vector2.subtract(
          this.mousePos,
          this.panningData.startMousePos
        )
      );
      console.log(this.panningData.editAreaPosition);
    }
  }

  @ViewChild("editor", { static: true }) editor!: ElementRef<HTMLDivElement>;
  onMouseDown(event: MouseEvent): void {
    console.log(event.pageX, event.pageY);
    if (this.addCardMenuData.show) {
      this.addCardMenuData.show = false;
    } else if (event.button == 2) {
      const editorRect = this.editor.nativeElement.getBoundingClientRect();
      this.addCardMenuData.position = new Vector2(
        event.pageX - editorRect.x,
        event.pageY - editorRect.y
      );
      this.addCardMenuData.show = true;
    } else if (event.button == 0) {
      this.panningData.startMousePos = new Vector2(event.pageX, event.pageY);
      this.panningData.startEditAreaPosition = this.panningData.editAreaPosition;
      console.log("pan");
    }
  }

  onMouseUp(_event: MouseEvent): void {
    this.startedConnection = undefined;

    if (this.panningData.startMousePos !== undefined)
      this.panningData.startMousePos = undefined;
  }

  onScroll(event: WheelEvent): void {
    this.mousePos = new Vector2(event.pageX, event.pageY);
    const editAreaRect = this.editArea.nativeElement.getBoundingClientRect();
    const mousePosEditorAreaSpaceBefore = new Vector2(
      (this.mousePos.x - editAreaRect.x)/this.scale,
      (this.mousePos.y - editAreaRect.y)/this.scale
    );
    this.scale -= 0.1*Math.sign(event.deltaY);
    this.scale = this.scale < 0.3 ? 0.3 : this.scale > 3 ? 3 : this.scale;
    const mousePosEditorAreaSpaceAfter = new Vector2(
      (this.mousePos.x - editAreaRect.x)/this.scale,
      (this.mousePos.y - editAreaRect.y)/this.scale
    );
    const deltaPosPageSpace = Vector2.subtract(mousePosEditorAreaSpaceAfter, mousePosEditorAreaSpaceBefore).times(this.scale);
    this.panningData.editAreaPosition = Vector2.add(this.panningData.editAreaPosition, deltaPosPageSpace);
    console.log(this.panningData.editAreaPosition);
  }

  @ViewChild("editArea", { static: true }) editArea!: ElementRef<HTMLDivElement>;
  onAddCardMenuSelect = (type: CardType): void => {
    const editorRect = this.editor.nativeElement.getBoundingClientRect();
    const editAreaRect = this.editArea.nativeElement.getBoundingClientRect();
    this.nodes.push({
      id: this.nextValidIdInt.toString(36),
      type: type,
      position: new Vector2(
        (this.addCardMenuData.position!.x + editorRect.x - editAreaRect.x)/this.scale,
        (this.addCardMenuData.position!.y + editorRect.y - editAreaRect.y)/this.scale
      ),
    });
    this.nextValidIdInt++;
  }

  // Gets executed with mouse button up on an input
  // deletes the conection to that input and if a conection was started it's ended on that input
  onEndConnection = (card: CardComponent, input: string): void => {
    let i = 0;
    while (i < this.connections.length) {
      if (this.connections[i].to.card === card && this.connections[i].to.input === input) {
        this.connections.splice(i, 1);
        break; // If we dont break and continue iterating, the index should not increase when a
               // deletion is done because it would skip the next element to the one deleted
      }
      i++;
    }

    if (this.startedConnection === undefined) {
      card.node.inputs.set(input, undefined);
      card.onChange();
      return;
    }

    this.connectCards({
      card: this.startedConnection.card,
      output: this.startedConnection.output,
    }, {
      card: card,
      input: input,
    });
    this.startedConnection = undefined;
  }

  updateChildrenOf = (card: CardComponent): void => {
    for (let connection of this.connections) {
      if (connection.from.card === card)
        connection.to.card.onChange();
    }
  }

  sendCardToTop = (card: CardComponent): void => {
    let index = 0;
    for (; index < this.cardComponents.length && this.cardComponents.get(index) !== card; index++);

    const node = this.nodes.splice(index, 1)[0];
    this.nodes.push(node);
  }
}
