declare module 'kepler.gl' {
  import * as React from 'react';
  import { MapViewState } from '@deck.gl/core';
  import { Layer } from '@deck.gl/core';

  export interface KeplerGlProps {
    id: string;
    mapboxApiAccessToken: string;
    width?: number;
    height?: number;
  }

  export default class KeplerGl extends React.Component<KeplerGlProps> {}
}

declare module '@kepler.gl/layers' {
  export const Layers: any;
}

declare module '@kepler.gl/schemas' {
  export const VisState: {
    combine: any;
    INITIAL_VIS_STATE: any;
  };
  export const LayerClasses: any[];
}

declare module 'react-palm' {
  export function taskMiddleware(): any;
  export function createTask(task: any): any;
}