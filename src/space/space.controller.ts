import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { CreateSpaceDTO, UpdateSpaceInfoDTO } from './dto';
import { SpaceService } from './services';
import { ReqUser } from '@app/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Space')
@ApiBearerAuth()
@Controller('space')
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':key')
  getSpace(@Param('key') key: string) {
    return this.spaceService.getActiveSpace(key);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createSpace(@ReqUser() user, @Body() data: CreateSpaceDTO) {
    return this.spaceService.createSpace(user, data);
  }

  @ApiParam({ name: 'key' })
  @UseGuards(AuthGuard('jwt'))
  @Put(':key')
  updateInfo(@Param('key') key, @Body() data: UpdateSpaceInfoDTO) {
    return this.spaceService.updateSpaceInfo(key, data);
  }

  @ApiOkResponse()
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'key' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  //@UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  @Put(':key/logo')
  updateLogo(@Param('key') key, @UploadedFiles() file: Express.Multer.File) {
    return this.spaceService.updateSpaceLogo(key, file);
  }

  @Get(':key/logo')
  async serveLogoImage(@Param('key') key: string, @Res() res): Promise<any> {
    const logo = await this.spaceService.getSpaceLogo(key);
    res.sendFile(key, { root: logo });
  }

  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'key' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post(':key/attachment')
  attachment(
    @Param('key') key: string,
    @Body() body,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.spaceService.attachment(key, body, file);
  }
}
