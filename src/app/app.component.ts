import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestService } from './services/test.service';
import { CommonModule } from '@angular/common';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Multi-Tenant-with-CI-CD';
  api: any;

  constructor(
    private testService: TestService,
    private config: ConfigService,
  ) {}

  ngOnInit(): void {
    this.testService.fetch().subscribe();
    this.api = this.config.api();
    console.log(this.api);
  }

  showError(): void {
    throw new Error('Hi! from error');
  }
}
