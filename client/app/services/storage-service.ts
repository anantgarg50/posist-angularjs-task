import angular from 'angular';
import uuid from 'uuid/v4';
import { ngStorage } from 'ngstorage';

export class StorageService {
  static $inject = ['$localStorage'];

  constructor(private $localStorage: ngStorage.StorageService) { }

  saveEntry(dbName: string, data: any) {
    if (!data._id) {
      data._id = uuid();
    }

    this.$localStorage[dbName].push(data);

    return data;
  }

  updateEntry(dbName: string, _id: string, data: object) {
    const index = this.$localStorage[dbName].findIndex((el: any) => el._id === _id);

    if (index > -1) {
      this.$localStorage[dbName][index] = angular.copy(data);

      return true;
    }

    return false;
  }

  deleteEntry(dbName: string, _id: string) {
    const index = this.$localStorage[dbName].findIndex((el: any) => el._id === _id);

    if (index > -1) {
      this.$localStorage[dbName].splice(index, 1);

      return true;
    }

    return false;
  }

  getEntry(dbName: string, _id: string) {
    const entry = this.$localStorage[dbName].find((el: any) => el._id === _id);

    if (entry) {
      return angular.copy(entry);
    }

    return {};
  }

  getAll(dbName: string) {
    return this.$localStorage[dbName];
  }

  setAll(dbName: string, data: object[]) {
    this.$localStorage[dbName] = data;
  }
};

export default StorageService;