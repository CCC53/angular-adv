import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private theme = document.getElementById('theme');

  constructor() {
    const selectedTheme = localStorage.getItem('theme') || 'assets/css/colors/default-dark.css';
    this.theme && this.theme.setAttribute('href', selectedTheme);
  }

  changeTheme(theme: string, items: NodeListOf<Element>) {
    const path = `assets/css/colors/${theme}.css`;
    if (this.theme) {
      this.theme.setAttribute('href', path);
      localStorage.setItem('theme', path);
      this.checkCurrentTheme(items);
    }
  }

  checkCurrentTheme(items: NodeListOf<Element>) {
    items.forEach(item => {
      item.classList.remove('working');
      const btnTheme = item.getAttribute('data-theme');
      const path = `assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.theme && this.theme.getAttribute('href');
      path === currentTheme && item.classList.add('working');
    });
  }
}
