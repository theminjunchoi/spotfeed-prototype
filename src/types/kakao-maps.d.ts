
declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => any;
        Map: new (container: HTMLElement, options: any) => any;
        Marker: new (options: any) => any;
        event: {
          addListener: (target: any, type: string, handler: (...args: any[]) => void) => void;
        };
        services: {
          Status: {
            OK: any;
          };
          Geocoder: new () => {
            coord2Address: (lng: number, lat: number, callback: (result: any[], status: any) => void) => void;
          };
        };
      };
    };
  }
}

export {};
