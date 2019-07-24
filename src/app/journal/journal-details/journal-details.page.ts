import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, RouterEvent } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { JournalService } from './../../services/journal.service';
import { JournalModel } from './../../models/journal.model';

@Component({
  selector: 'app-journal-details',
  templateUrl: './journal-details.page.html',
  styleUrls: ['./journal-details.page.scss'],
})
export class JournalDetailsPage implements OnInit {
 
  journal: JournalModel;
 
  journalId = null;
  defaultBackLink: string;
  newJournal: boolean = true;
 
  constructor(private route: ActivatedRoute, private nav: NavController, private journalService: JournalService, private loadingController: LoadingController, private router: Router) { 
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event instanceof NavigationEnd && event.url) {
        this.defaultBackLink = event.url.replace('/tabs/tab1/journals/', '');
      }
    });
  }
 
  ngOnInit() {
    this.journalId = this.route.snapshot.params['id'];
    if (this.journalId)  {
      this.newJournal = false;
      this.loadJournal();
    }
  }

  removeJournal() {
    this.journalService.removeJournal(this.journalId);
    this.router.navigate(['/tabs/tab1/journals']);
  }
 
  async loadJournal() {
    const loading = await this.loadingController.create({
      message: 'Loading Journal..'
    });
    await loading.present();
 
    this.journalService.getJournal(this.journalId).subscribe(res => {
      loading.dismiss();
      this.journal = res;
    });
  }
 
  async saveJournal() {
 
    const loading = await this.loadingController.create({
      message: 'Saving Journal..'
    });
    await loading.present();
 
    if (this.journalId) {
      this.journalService.updateJournal(this.journal, this.journalId).then(() => {
        loading.dismiss();
        this.nav.back();
      });
    } else {
      this.journalService.addJournal(this.journal).then(() => {
        loading.dismiss();
        this.nav.back();
      });
    }
  }
 
}