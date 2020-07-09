/**
 * Copyright Composiv Inc and its affiliates
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

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

