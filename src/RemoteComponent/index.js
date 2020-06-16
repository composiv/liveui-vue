/**
 *
 * RemoteComponent
 *
 */

import { Registry, ViewBuilder } from '@composiv/liveui-core';

export function RemoteComponentWithUrl(url, onError) {
   
   return () => new Promise((resolve, reject) => {
    fetch(url, { method: 'GET' })
      .then((response) => response.text())
      .then((js) => {
          const DynamicElement = ViewBuilder.build(js, onError);
          resolve(DynamicElement);
      })
      .catch((error) => {
         const DynamicElement = onError(`Error loading ${url}`, -200, error);
         reject(DynamicElement);
      });
   }); 
}

export default function RemoteComponent(key, onError) {

   const url = Registry.getComponentUrl(key);
   
   return RemoteComponentWithUrl(url, onError);
}

