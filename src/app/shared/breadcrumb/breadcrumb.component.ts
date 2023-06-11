import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {
  breadcrumbs: Array<any> = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = []; // clear out the breadcrumbs
        let currentRoute = this.activatedRoute.root;
        while (currentRoute.children.length > 0) {
          let child = currentRoute.children[0];
          if (child.snapshot.data['breadcrumb']) {
            this.breadcrumbs.push(child.snapshot.data['breadcrumb']);
          }
          currentRoute = child;
        }
      });
  }
}
