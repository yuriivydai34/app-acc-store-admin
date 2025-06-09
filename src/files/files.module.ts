import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';

import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const fileName = `${file.fieldname}-${uniqueSuffix}-${file.originalname}`;
          cb(null, fileName);
        }
      }),
    })
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule { }
