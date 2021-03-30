import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { SpaceResource } from '../resources';
import { CreateSpaceDTO, UpdateSpaceInfoDTO } from '../dto';
import { SpaceEntity } from '../entities';
import { generateRandomString } from '@app/common';
import { extname, join } from 'path';
import { ConfigService } from '@config/config.service';
import { UploadService } from '../../file';
import { UserEntity } from '../../user';
import { SpaceRO } from '../ro';

@Injectable()
export class SpaceService {
  private readonly logger = new Logger(SpaceService.name);
  constructor(
    private readonly resource: SpaceResource,
    private readonly uploader: UploadService,
    private readonly config: ConfigService,
  ) {}

  getActiveSpace(key: string): Promise<SpaceEntity> {
    return this.resource.getSpace(key, true);
  }

  protected async isExistDomain(domain: string): Promise<boolean> {
    return (await this.resource.count({ domain })) > 0;
  }

  async checkDomainExist(domain: string): Promise<void | never> {
    if (await this.isExistDomain(domain)) {
      throw new BadRequestException(`Domain '${domain}' has been taken`);
    }
    return;
  }

  async createSpace(user: UserEntity, data: CreateSpaceDTO) {
    await this.checkDomainExist(data.domain);
    try {
      const newSpace = this.resource.create(data);
      newSpace.key = await this.resource.generateUniqueRandomKey(10);
      newSpace.ownerUserId = user.id;
      return await this.resource
        .save(newSpace)
        .then(space => new SpaceRO(space));
    } catch (e) {
      this.logger.error(e.message, e.stack);
      throw new InternalServerErrorException();
    }
  }

  async updateSpaceInfo(key: string, data: UpdateSpaceInfoDTO) {
    try {
      const space = await this.resource.getSpaceOrFailed(key);
      const updateSpace = this.resource.merge(space, data);
      await this.resource.save(updateSpace);
    } catch (e) {
      this.logger.error(e.message, e.stack);
      throw new InternalServerErrorException();
    }
  }

  async updateSpaceLogo(id: string, fileLogo: Express.Multer.File) {
    try {
      const logoName = `${id}-${generateRandomString(10)}`;
      const extName = extname(fileLogo.originalname);

      return {
        id: id,
        fileName: `${logoName}${extName}`,
      };
    } catch (e) {
      this.logger.error(e.message, e.stack);
    }
  }

  async getSpaceLogo(key: string): Promise<string | undefined> {
    const space: SpaceEntity = await this.resource.getSpaceOrFailed(key);

    if (space.logo) {
      // TODO check space logo exist
      return `${this.config.get('SERVER_URL')}/upload/${space.logo}`;
    }

    return undefined;
  }

  async attachment(id: string, data: any, file: Express.Multer.File) {
    if (!this.uploader.validateFileSize(file, 5 * Math.pow(1024, 2))) {
      throw new BadRequestException('File size exceeds maximum limit 5 MB.');
    }
    const space = await this.resource.getSpaceMock({ id, active: true });
    const fileName = generateRandomString(10);
    const result = this.uploader.uploadFile(
      join(space.domain, 'attachments'),
      fileName,
      file,
    );
    return { id: space.id, data, file: result };
  }
}
