import { DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';
import { appContants } from './constants';
import { appContants1 } from './constants';

export class StandardUrlSerializers implements UrlSerializer {
    private _defaultUrlSerializer: DefaultUrlSerializer = new DefaultUrlSerializer();

    parse(url: string): UrlTree {
        appContants1.outlets.forEach(outletName => {
            const reg = new RegExp('/(' + outletName + ')/([^\/]*)');
            url = url.replace(reg, '$1/($1:$2)' );
        });
        return this._defaultUrlSerializer.parse(url);
    }

    serialize(tree: UrlTree): string {
        let url = this._defaultUrlSerializer.serialize(tree);
        appContants1.outlets.forEach(outletName => {
            const reg = new RegExp('\\(' + outletName + ':([^\/]*)\\)');
            url = url.replace(reg, '$1');
        });
        return url;
    }
}