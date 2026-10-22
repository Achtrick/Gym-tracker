import { inject, Service } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Service()
export class SvgContentService {
  private readonly baseFolder = '/assets';
  private readonly jsonFilePath = this.baseFolder + '/svg-icons.json';
  private svgCache = new Map<string, string>();
  private sanitizer = inject(DomSanitizer);

  public async read(svgName: string): Promise<SafeHtml> {
    let content = this.svgCache.get(svgName);

    if (content?.length) {
      return this.sanitizer.bypassSecurityTrustHtml(content);
    } else {
      try {
        const json = await (await fetch(this.jsonFilePath)).json();
        const response = await fetch(this.baseFolder + '/' + json[svgName]);
        if (!response.ok) {
          throw 'unkown icon';
        }
        content = await response.text();
        this.svgCache.set(svgName, content);
        return this.sanitizer.bypassSecurityTrustHtml(content);
      } catch (error) {
        console.error(error);
        return this.sanitizer.bypassSecurityTrustHtml('');
      }
    }
  }
}
