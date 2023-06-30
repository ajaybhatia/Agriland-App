/**
 * Generated by orval v6.14.3 🍺
 * Do not edit manually.
 * Farmer App API
 * OpenAPI spec version: v1
 */
import type { LanguageName } from './languageName';
import type { GovernorateModel } from './governorateModel';
import type { IrrigationTypeModel } from './irrigationTypeModel';
import type { CityModel } from './cityModel';
import type { VillageModel } from './villageModel';
import type { CoOrdinates } from './coOrdinates';

export interface FarmModel {
  name?: LanguageName;
  landHoldingNumber?: string | null;
  governorate?: GovernorateModel;
  governorateFieldId?: string | null;
  irrigationType?: IrrigationTypeModel;
  irrigationTypeId?: string | null;
  city?: CityModel;
  cityId?: string | null;
  village?: VillageModel;
  villageId?: string | null;
  address?: string | null;
  organization?: string | null;
  coordinates?: CoOrdinates[] | null;
}
