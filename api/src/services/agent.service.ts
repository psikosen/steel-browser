import { SessionService } from './session.service';
import { FileService } from './file.service';

export class AgentService {
  constructor(
    private readonly sessionService: SessionService,
    private readonly fileService: FileService
  ) {}

  async createSession(options: any) {
    return this.sessionService.createSession(options);
  }

  async releaseSession(id: string) {
    return this.sessionService.releaseSession(id);
  }

  async getSessions() {
    return this.sessionService.getSessions();
  }

  async getSessionDetails(id: string) {
    return this.sessionService.getSession(id);
  }

  async uploadFile(session: any, file: any) {
    return this.fileService.upload(session, file);
  }

  async downloadFile(session: any, filename: string) {
    return this.fileService.download(session, filename);
  }

  async listFiles(session: any) {
    return this.fileService.list(session);
  }
}
