import { Injectable } from '@angular/core';
import { Province} from '../model/province';
import { PROVINCES } from '../model/mock-provinces';

@Injectable({
  providedIn: 'root'
})

export class ProvinceService {

  provinces: Province[] = PROVINCES;

  getProvinces(): Province[] {
    return this.provinces;
  }

  getProvinceByName(name: string): Province {

    for (const province of this.provinces) {
      if ( province.name === name ) {
        return province;
      }
    }
    return null;
  }

}
