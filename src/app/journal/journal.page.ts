import { Component, OnInit } from '@angular/core';
import { JournalService } from '../services/journal.service';
import { JournalModel } from '../models/journal.model';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.page.html',
  styleUrls: ['./journal.page.scss'],
})
export class JournalPage implements OnInit {

  journals: JournalModel[];

  constructor(private journalService: JournalService) { }

  ngOnInit() {
    this.journalService.getJournals().subscribe(res => {
      this.journals = res;
    });
  }
}
