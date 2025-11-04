import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageRoutingModule } from './home-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { HomePage } from './home.page';

import { CreateEventComponent } from '../create-event/create-event.component';
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
    TranslateModule.forChild(),
    ReactiveFormsModule
  ],
  declarations: [
    HomePage,
    SettingsComponent,
    ProfileComponent,
    FeedComponent,
    EventCardComponent,
    CommunitiesComponent,
    EventInfoComponent,
    CreateEventComponent
  ]
})
export class HomePageModule {}
