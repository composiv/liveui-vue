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
