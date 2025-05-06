import {
  HttpRequest,
  HttpHandlerFn,
  HttpResponse,
  HttpEvent,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

const cache = new Map<string, HttpResponse<any>>();

export function cacheInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  if (req.method !== 'GET') {
    return next(req);
  }

  const cachedResponse = cache.get(req.urlWithParams);
  if (cachedResponse) {
    return of(cachedResponse);
  }

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        cache.set(req.urlWithParams, event);
      }
    })
  );
}
