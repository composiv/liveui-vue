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

import RemoteComponent, { RemoteComponentWithUrl } from '../index';
import { Registry, ViewBuilder } from '@composiv/liveui-core';
import 'whatwg-fetch';

describe('Remote Component', () => {

  const onError = function error() {
    return Function;
  };
  const module = 'test';
  const externals = { test: 'test' };
  Registry.register(module, externals, "requireError");
  const url = Registry.getComponentUrl("test");
  test('RemoteComponent ', () => {
    const remoteComponent = RemoteComponentWithUrl(url, onError);
    try {
      expect(RemoteComponent("test", onError)).toEqual(remoteComponent);
    } catch (error) {
      expect(RemoteComponent("test", onError));
    }
  });

  test('RemoteComponentWithUrl', function () {
    window.fetch = jest.fn();
    const res = new Response('{"hello":"world"}', {
      status: 200,
      headers: {
        'Content-type': 'application/json',
      },
    });

    window.fetch.mockReturnValue(Promise.resolve(res));
    window.fetch = RemoteComponentWithUrl(url, onError)()
      .then((response) => response.text())
      .then((js) => {
        new Promise((resolve, reject) =>{
          const DynamicElement = ViewBuilder.build(js, onError);  
          resolve(DynamicElement)
        })
      })
      .catch((error) => {
        new Promise((reject) => {
          const DynamicElement = onError(`Error loading ${url}`, -200, error);
          reject(DynamicElement);
        })
      })
  });


});
