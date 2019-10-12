import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICell } from 'app/shared/model/cell.model';

type EntityResponseType = HttpResponse<ICell>;
type EntityArrayResponseType = HttpResponse<ICell[]>;

@Injectable({ providedIn: 'root' })
export class CellService {
  public resourceUrl = SERVER_API_URL + 'api/cells';

  constructor(protected http: HttpClient) {}

  create(cell: ICell): Observable<EntityResponseType> {
    return this.http.post<ICell>(this.resourceUrl, cell, { observe: 'response' });
  }

  update(cell: ICell): Observable<EntityResponseType> {
    return this.http.put<ICell>(this.resourceUrl, cell, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICell>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICell[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
