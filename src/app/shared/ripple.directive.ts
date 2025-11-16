import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
    selector: '[lvl0Ripple]',
    standalone: false
})
export class RippleDirective {

    constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
        const circle = this.renderer.createElement('span');
        const diameter = Math.max(this.el.nativeElement.clientWidth, this.el.nativeElement.clientHeight);
        const radius = diameter / 2;

        this.el.nativeElement.style.overflow = 'hidden';
        this.el.nativeElement.style.position = 'relative';
        let elementBbox = this.el.nativeElement.getClientRects()[0];
        this.renderer.setStyle(circle, 'width', `${diameter}px`);
        this.renderer.setStyle(circle, 'height', `${diameter}px`);
        this.renderer.setStyle(circle, 'left', `${event.clientX - elementBbox.left - radius}px`);
        this.renderer.setStyle(circle, 'top', `${event.clientY - elementBbox.top - radius}px`);
        this.renderer.addClass(circle, 'lvl0-ripple');

        const ripple = this.el.nativeElement.getElementsByClassName('lvl0-ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        this.renderer.appendChild(this.el.nativeElement, circle);

        // setTimeout(() => circle.remove(), 500); // Adjust timing as needed
    }
}
