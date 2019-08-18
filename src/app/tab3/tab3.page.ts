import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '.././services/authentication.service'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  userEmail: string;

  constructor(private navCtrl: NavController, private authService: AuthenticationService) {}

  ngOnInit() {
    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
    }else{
      this.navCtrl.navigateBack('');
    }
  }

  logout(){
    this.authService.logoutUser()
    .then(res => {
      // console.log(res);
      this.navCtrl.navigateBack('/login');
    })
    .catch(error => {
      console.log(error);
    })
  }
}
