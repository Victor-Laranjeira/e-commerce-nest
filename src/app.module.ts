import { Module } from '@nestjs/common';
import { CustomerModule } from './modules/customer/customer.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    CustomerModule,
    ProductModule,
    OrderModule,
    ClientsModule.register([
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
