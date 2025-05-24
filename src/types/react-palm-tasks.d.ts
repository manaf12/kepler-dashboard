// src/types/react-palm-tasks.d.ts
declare module 'react-palm/tasks' {
  import { Middleware } from 'redux';
  // we’ll treat it as untyped to keep TS happy
  export const taskMiddleware: Middleware<any, any, any>;
}
