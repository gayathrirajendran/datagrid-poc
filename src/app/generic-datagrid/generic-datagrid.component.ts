import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { Items } from '@clr/angular/data/datagrid/providers/items';
import { map, Observable } from 'rxjs';

interface MasterGroupList<T> {
  groupName: string;
  id: string;
  recordCount: number;
  records: Array<T>;
}

interface User {
  isSelected: boolean;
  id: string;
  name: string;
  color: string;
  creation: Date;
  pokemon: {
    name: string;
  }
}

interface APIParams {
  pageSize: number;
  pageOffset: number;
  groupId: string;
}

@Component({
  selector: 'app-generic-datagrid',
  templateUrl: './generic-datagrid.component.html',
  styleUrls: ['./generic-datagrid.component.scss']
})
export class GenericDatagridComponent implements OnInit {

  masterUsersList: Array<MasterGroupList<User>> = [];
  users: User[] = [];
  total: number = 0;
  loading = false;
  isGrouped = true;
  pageSize = 10;
  initialPageInfo = {
    pageSize: this.pageSize,
    pageOffset: 0,
    groupId: ''
  };
  selecteditems: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchUsers({
      pageSize: this.pageSize,
      pageOffset: 0,
      groupId: ''
    });
  }

  getData(pageInfo: APIParams, isGrouped: boolean): Observable<Array<MasterGroupList<User>>> {
    const api = isGrouped ? '/assets/user-list.json' : '/assets/user-list-ungrouped.json';
    return (this.http.get(api) as Observable<Array<MasterGroupList<User>>>).pipe(
      map((response: Array<MasterGroupList<User>>) => response.map((item: MasterGroupList<User>) => ({
        id: item.id,
        recordCount: item.recordCount,
        groupName: item.groupName,
        records: item.records.slice(pageInfo.pageOffset, pageInfo.pageOffset + pageInfo.pageSize).map((sitem: User) => ({
          id: sitem.id,
          name: sitem.name,
          color: sitem.color,
          creation: sitem.creation,
          pokemon: {
            name: sitem.name
          },
          isSelected: this.selecteditems.indexOf(sitem.id) > -1 ? true : false
        }))}
      ))
    ));
  }

  getPaginatedData(pageInfo: APIParams, isGrouped: boolean): Observable<Array<MasterGroupList<User>>> {
    const api = isGrouped ? '/assets/user-list.json' : '/assets/user-list-ungrouped.json';
    return (this.http.get(api) as Observable<Array<MasterGroupList<User>>>).pipe(
      map((response: Array<MasterGroupList<User>>) => response.map((item: MasterGroupList<User>) => ({
        id: item.id,
        recordCount: item.recordCount,
        groupName: item.groupName,
        records: item.records.slice(pageInfo.pageOffset, pageInfo.pageOffset + pageInfo.pageSize).map((sitem: User) => ({
          id: sitem.id,
          name: sitem.name,
          color: sitem.color,
          creation: sitem.creation,
          pokemon: {
            name: sitem.name
          },
          isSelected: this.selecteditems.indexOf(sitem.id) > -1 ? true : false
        }))}
      ))
    ));
  }

  toggleGroup(): void {
    this.isGrouped = !this.isGrouped;
    this.fetchUsers(this.initialPageInfo);
  }

  fetchUsers(pageInfo: APIParams): void {
    this.getData(pageInfo, this.isGrouped).subscribe({
      next: (response) => {
        this.masterUsersList = response;
      }
    })
  }



  refresh(state: ClrDatagridStateInterface) {
    console.log(state, 'refresh state');
    // this.loading = true;
    // We convert the filters from an array to a map,
    // because that's what our backend-calling service is expecting
    let filters: { [prop: string]: any[] } = {};
    if (state.filters) {
      for (let filter of state.filters) {
        let { property, value } = <{ property: string, value: string }>filter;
        filters[property] = [value];
      }
    }
    ;
  }

  selectionChange(event: any) {
    console.log(event, 'selection change');
  }

  trackByIdentity = (index: number, item: any) => item;

}
