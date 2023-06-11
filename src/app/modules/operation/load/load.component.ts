import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent {
  isAvailable: Boolean = false;
  files: File[] = [] || null;

  constructor() { }

  changeAvailable(): void {
    debugger
    this.isAvailable = !this.isAvailable;
  }
  drop(event: CdkDragDrop<File[]>) {
    moveItemInArray(this.files, event.previousIndex, event.currentIndex);
  }

  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  fileBrowseHandler(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target?.files;
    if (!files) {
      // Manejar el caso cuando no se proporcionan archivos
      return;
    }
    // Continuar con el procesamiento de los archivos
  }



  prepareFilesList(files: Array<File>) {
    for (const item of files) {
      this.files.push(item);
    }
  }
}
