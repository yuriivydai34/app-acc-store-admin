import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { FilesModule } from './files/files.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { File } from './files/entities/file.entity';
import { OrderModule } from './order/order.module';
import { Order } from './order/entities/order.entity';
import { CashReceiptModule } from './cash-receipt/cash-receipt.module';
import { CashReceipt } from './cash-receipt/entities/cash-receipt.entity';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables from .env file
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
      exclude: ['/api*'],
      serveStaticOptions: {
        index: false,
        cacheControl: true,
        maxAge: 0,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'postgres',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'acc_store',
      entities: [User, Product, File, Order, CashReceipt],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    AuthModule, 
    UsersModule, 
    ProductModule, FilesModule, OrderModule, CashReceiptModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppService
  ],
})
export class AppModule {}
