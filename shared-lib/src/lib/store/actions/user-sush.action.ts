import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "../../models/user.model";

export const userAction = createActionGroup({
    source: 'User',
    events: {
      'User Login': props<{email: string, password: string}>(),
      'User Login Success': props<{user: User}>(),
      'User Login Failure': props<{error: string}>(),
      'Logout': emptyProps()
    },
  })