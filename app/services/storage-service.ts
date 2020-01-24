export class StorageService {
  static $inject = ['$localStorage'];

  constructor(private $localStorage: any) { }

  test() {
    console.log('Storage Service ----> ', this.$localStorage);
  }
};

export default StorageService;