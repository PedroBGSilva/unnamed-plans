import { HomePageRoutingModule } from './home-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HomePage } from './home.page';

import { CommunitiesComponent } from '../communities/communities.component';
import { EventCardComponent } from '../event-card/event-card.component';
import { EventInfoComponent } from '../event-info/event-info.component';
import { SettingsComponent } from '../settings/settings.component';
import { ProfileComponent } from '../profile/profile.component';
import { FeedComponent } from '../feed/feed.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [
    HomePage,
    SettingsComponent,
    ProfileComponent,
    FeedComponent,
    EventCardComponent,
    CommunitiesComponent,
    EventInfoComponent
  ]
})
export class HomePageModule {}
