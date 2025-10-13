import { Component, HostListener, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private theme = inject(ThemeService);
  currentTheme: string = 'auto';

  ngOnInit(): void {
    this.currentTheme = this.theme.getCurrentTheme();
  }

  changeTheme(theme: 'light' | 'dark' | 'auto') {
    this.theme.setTheme(theme);
    this.currentTheme = theme;
    console.log('THIS IS YOUR MODE', this.currentTheme);
  }
  
activeSection: string = '';

@HostListener('window:scroll', ['$event'])
onScroll(): void {
  const sections = ['experience', 'projects', 'education', 'skills'];
  const scrollPosition = window.pageYOffset + 150; // Ajusta el offset

  for (const section of sections) {
    const element = document.getElementById(section);
    if (element) {
      const offsetTop = element.offsetTop;
      const offsetBottom = offsetTop + element.offsetHeight;

      if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
        this.activeSection = section;
        break;
      }
    }
  }
}

closeMenu(): void {
  if (window.innerWidth < 768) {
    const button = document.getElementById('hs-navbar-header-floating-collapse') as HTMLElement;
    if (button) {
      button.click();
    }
  }
}
}

