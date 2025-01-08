import { Observable } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';

import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectToken } from '@shared-libs/shared-lib';

export const authResolver: ResolveFn<boolean> = (route, state) => {
  const store = inject(Store);

  return store.select(selectToken).pipe(
    filter((token) => !!token), // Wait until token is available
    first(), // Take the first available token and complete the observable
    switchMap(() => [true])
  );
};
