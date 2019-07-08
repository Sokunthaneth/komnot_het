import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthenticationGuard } from '../guard/authentication.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            redirectTo: 'journals',
            loadChildren: '../tab1/tab1.module#Tab1PageModule'
          },
          {
            path: 'journals',
            children: [
              {
                path: '',
                loadChildren: '../journal/journal.module#JournalPageModule', 
                canActivate: [AuthenticationGuard]
              },
              {
                path: 'detail',
                loadChildren: '../journal/journal-details/journal-details.module#JournalDetailsPageModule', 
                canActivate: [AuthenticationGuard]
              },
              {
                path: 'detail/:id',
                loadChildren: '../journal/journal-details/journal-details.module#JournalDetailsPageModule', 
                canActivate: [AuthenticationGuard]
              }
            ]
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: '../tab2/tab2.module#Tab2PageModule'
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: '../tab3/tab3.module#Tab3PageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1/journals',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1/journals',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
