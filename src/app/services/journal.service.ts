import { Injectable } from '@angular/core';
import { JournalModel } from '../models/journal.model';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  private journals: Observable<JournalModel[]>;
  private journalCollection: AngularFirestoreCollection<JournalModel>;
  private userId: string;

  constructor(
    private fireStore: AngularFirestore,
    private authService: AuthenticationService
  ) {
    this.userId = authService.userId;
    this.journalCollection = fireStore.collection<JournalModel>('journals', ref => ref.where("userId", "==", this.userId));

    this.journals = this.journalCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // ionViewWillEnter() {
  //   console.log(this.authService.userId);
  //   this.userId = this.authService.userId;
  //   this.journalCollection = this.fireStore.collection<JournalModel>('journals', ref => ref.where("userId", "==", this.userId));

  //   this.journals = this.journalCollection.snapshotChanges().pipe(
  //     map(actions => {
  //       return actions.map(a => {
  //         const data = a.payload.doc.data();
  //         const id = a.payload.doc.id;
  //         return { id, ...data };
  //       });
  //     })
  //   );
  // }

  getJournals() {
    return this.journals;
  }

  getJournal(id) {
    return this.journalCollection.doc<JournalModel>(id).valueChanges();
  }
 
  updateJournal(journal: JournalModel, id: string) {
    return this.journalCollection.doc(id).update(journal);
  }
 
  addJournal(journal: JournalModel) {
    return this.journalCollection.add(journal);
  }
 
  removeJournal(id) {
    return this.journalCollection.doc(id).delete();
  }
}
