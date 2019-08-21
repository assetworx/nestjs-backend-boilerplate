import { Module } from '@nestjs/common';
import { ExampleController } from 'src/example/example.controller';
import { ExampleService } from 'src/example/example.service';

@Module({
  imports: [],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class SharedModule {}
