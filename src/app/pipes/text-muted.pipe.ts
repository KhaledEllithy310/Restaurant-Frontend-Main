import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textMuted',
})
export class TextMutedPipe implements PipeTransform {
  transform(value: string, limit?: number): string | null {
    if (!value) {
      return null;
    }
    return value.substr(0, limit || 30) + '...';
  }
}
