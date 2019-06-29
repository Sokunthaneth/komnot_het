import { Component, ViewChild } from '@angular/core';
import { StorageService, Item } from '../services/storage.service';
import { Platform, ToastController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  items: Item[] = [];

  newItem: Item = <Item>{};

  @ViewChild('mylist')mylist: IonList;
  constructor(private storageService: StorageService, private plt: Platform, private toastController: ToastController) {
    this.plt.ready().then(() => {
      this.loadItems();
    })
  }

  addItem() {
    this.newItem.modified = Date.now();
    this.newItem.id = Date.now();

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
      this.showToast('Item added!');
      this.loadItems();
    });
  }

  loadItems() {
    this.storageService.getItems().then(items => {
      this.items = items;
    });
  }

  updateItem(item: Item) {
    item.title = `UPDATED: ${item.title}`;
    item.modified = Date.now();

    this.storageService.updateItem(item).then(item => {
      this.showToast('Item updated!');
      this.mylist.closeSlidingItems();
      this.loadItems();
    });
  }

  deleteItem(item: Item) {
    this.storageService.deleteItem(item.id).then(item => {
      this.showToast('Item removed!');
      this.mylist.closeSlidingItems();
      this.loadItems();
    });
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}