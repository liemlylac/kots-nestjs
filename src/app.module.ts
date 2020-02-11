import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { IssueModule } from './issue/issue.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    IssueModule,
    ProjectModule,
  ],
})
export class AppModule {}
