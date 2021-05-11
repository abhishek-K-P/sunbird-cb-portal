import { Component, HostBinding, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NsWidgetResolver, WidgetBaseComponent } from '@sunbird-cb/resolver'
import { ConfigurationsService } from '@sunbird-cb/utils'
import { DiscussUtilsService } from '@ws/app/src/lib/routes/discuss/services/discuss-utils.service'

@Component({
  selector: 'ws-widget-card-home-network',
  templateUrl: './card-network-home.component.html',
  styleUrls: ['./card-network-home.component.scss'],
})
export class CardNetworkHomeComponent extends WidgetBaseComponent

  implements OnInit, NsWidgetResolver.IWidgetData<any> {
  @Input() widgetData: any
  networkUser!: any
  @HostBinding('id')
  public id = `ws-card-home-network_${Math.random()}`
  constructor(private router: Router, public configurationsService: ConfigurationsService, private discussUtils: DiscussUtilsService) {
    super()
  }

  ngOnInit() {
    if (this.widgetData && this.widgetData.content) {
      this.networkUser = this.widgetData.content
    }
  }

  getUserFullName(user: any) {
    if (user && user.personalDetails.firstname && user.personalDetails.surname) {
      return `${user.personalDetails.firstname.trim()} ${user.personalDetails.surname.trim()}`
    }
    return ''
  }

  goToUserProfile(user: any) {
    this.router.navigate([`/app/person-profile`, user.id])
    // this.router.navigate(['/app/person-profile'], { queryParams: { emailId: user.personalDetails.primaryEmail } })
  }
  public getBgColor(tagTitle: any) {
    const bgColor = this.discussUtils.stringToColor(tagTitle.toLowerCase())

    const color = this.discussUtils.getContrast(bgColor)
    // console.log(color)
    return { color, 'background-color': 'red' }
  }
}
