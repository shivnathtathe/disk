import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from './data/data.service';
import { HttpClientModule } from '@angular/common/http';
import { NgCircleProgressModule } from 'ng-circle-progress';
// import { SharedModule } from './shared/shared.module';
import {RoundProgressModule} from 'angular-svg-round-progressbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,HttpClientModule,RoundProgressModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[NgCircleProgressModule]
})
export class AppComponent {
  title = 'server-Logs';
  serverName: any;
 
  Total: any;
  used: any;
  free: any;
  percent: any;

  constructor(private dataService: DataService) {}
  // <p *ngIf="diskSpaceData">Total: {{ diskSpaceData.total }} GB</p>
  // <p *ngIf="diskSpaceData">Used: {{ diskSpaceData.used }} GB</p>
  // <p *ngIf="diskSpaceData">Free: {{ diskSpaceData.free }} GB</p>
  // <p *ngIf="diskSpaceData">Percentage Used: {{ diskSpaceData.percent }}%</p>

  fetchData(id: any) {
    // debugger;
    this.dataService.getDiskInfoById(id).subscribe({
      next: (diskSpaceData) => {
        console.log(diskSpaceData[0].diskSpace.Total);
        this.Total = diskSpaceData[0].diskSpace.Total;
        this.used = diskSpaceData[0].diskSpace.used;
        this.free = diskSpaceData[0].diskSpace.free;
        this.percent = diskSpaceData[0].diskSpace.percent;
      },
      error: (err) => {
        console.error('Error fetching disk space data', err);
      }
    });
  }
  doSomethingWithCurrentValue(id:any){}
}
