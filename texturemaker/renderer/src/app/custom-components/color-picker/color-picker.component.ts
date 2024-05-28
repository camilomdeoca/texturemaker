import { AfterViewInit, Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true
    }
  ]
})
export class ColorPickerComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    console.log("after", this.color);
  }
  ngOnInit(): void {
    console.log("init", this.color);
  }
  writeValue(obj: any): void {
    console.log("value", obj);
    if (obj === null) return;
    if (typeof obj === "string")
      this.color = obj;
    else
      throw new Error("Color picker can only be bound with a string");
  }

  onChange: (_: any) => void = (_: any) => {};
  onTouch: () => void = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
  color: string = "#ff9999ff";
  isDisabled: boolean = false;

  showPicker: boolean = false;
  openPicker() {
    this.showPicker = true;
  }

  closePicker() {
    this.showPicker = false;
    this.onChange(this.color);
  }
}
