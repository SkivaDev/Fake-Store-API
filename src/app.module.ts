import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [ProductsModule, CategoriesModule, ImagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
