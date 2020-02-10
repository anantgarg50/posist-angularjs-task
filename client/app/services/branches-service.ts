import { StorageService } from './storage-service';

export class BranchesService {
  static $inject = ['storageService'];

  private DB_NAME = 'branches';

  constructor(private storageService: StorageService) {
    const data = storageService.getAll(this.DB_NAME);

    if (!Array.isArray(data)) {
      storageService.setAll(this.DB_NAME, []);
    }
  }

  save(data: object) {
    return this.storageService.saveEntry(this.DB_NAME, data);
  }

  update(_id: string, data: object) {
    return this.storageService.updateEntry(this.DB_NAME, _id, data);
  }

  get(_id: string) {
    return this.storageService.getEntry(this.DB_NAME, _id);
  }

  getList() {
    return this.storageService.getAll(this.DB_NAME);
  }
};

export default BranchesService;