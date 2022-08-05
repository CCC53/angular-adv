import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  
  items: NodeListOf<Element> | undefined;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.items = document.querySelectorAll('.selector');
    this.settingsService.checkCurrentTheme(this.items);
  }

  changeTheme(theme: string) {
    const path = `assets/css/colors/${theme}.css`;
    this.items && this.settingsService.changeTheme(theme, this.items);
  }
}
