import { HTTPTransport } from '../core/HttpTransport';
import { ResourcesDTO } from '../dto/ResourcesDTO';
import objectToFormData from '../utils/objectToFormData';

export default class ResourcesAPI {
  private api = new HTTPTransport('/resources');

  uploadFile(data:{resource:File}) {
    return this.api.POST<ResourcesDTO>('', { data: objectToFormData(data) });
  }
}
