import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ClientSearchService } from 'app/main/clients/client-search/client-search.service';

@Component({
    selector   : 'client-search-main-sidebar',
    templateUrl: './main.component.html',
    styleUrls  : ['./main.component.scss']
})
export class ClientSearchMainSidebarComponent implements OnInit, OnDestroy
{
    user: any;
    filterBy: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ClientSearchService} _clientSearchService
     */
    constructor(
      private _clientSearchService: ClientSearchService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
      this.filterBy = this._clientSearchService.filterBy || 'all';

      this._clientSearchService.onUserDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(user => {
                this.user = user;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Change the filter
     *
     * @param filter
     */
    changeFilter(filter): void
    {
        this.filterBy = filter;
      this._clientSearchService.onFilterChanged.next(this.filterBy);
    }
}
