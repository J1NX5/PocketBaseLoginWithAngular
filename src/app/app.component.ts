import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PocketBaseService } from './pocketbase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  [x: string]: any;
  title = 'PocketBaseLogin';

  records: any[] = [];


  data$ = this.pocketBaseService.watch('test_collection', '8r2eksyah66wgo9')

  constructor(private router: Router, public pocketBaseService: PocketBaseService) {}

  ngOnInit() {
    //this.loginUser();
    this.fetchRecords();

    
  }

  async hello(){
    const result = await this.pocketBaseService.hello("world")
    console.log(`api result: ${result}`)
  }

  logout(){
    this.pocketBaseService.logout();
  }

  async loginUser() {
    try {
      const authData = await this.pocketBaseService.login('email@example.com', 'password');
      console.log('User logged in', authData);
    } catch (error) {
      console.error('Login error', error);
    }
  }

  async fetchRecords() {
    try {
      const records = await this.pocketBaseService.getRecords('test_collection');
      this.records = records;
      console.log("wird aufgerufen")
      console.log('Records fetched', records);
    } catch (error) {
      console.error('Fetching records error', error);
    }
  }

  async incrementCounter() {
    try {
      const updatedRecord = await this.pocketBaseService.incrementCounter('test_collection', '8r2eksyah66wgo9');
      console.log('Record updated', updatedRecord);
    } catch (error) {
      console.error('Updating record error', error);
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
