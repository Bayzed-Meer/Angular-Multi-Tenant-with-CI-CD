import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestService } from './services/test.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Multi-Tenant-with-CI-CD';

  constructor(private testService: TestService) {}

  ngOnInit(): void {
    this.testService.fetch().subscribe();
  }

  showError(): void {
    throw new Error('Hi! from error');
  }
}
