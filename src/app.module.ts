import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { IssueModule } from './issue/issue.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TimesheetModule } from './time-sheet/timesheet.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    ProjectModule,
    IssueModule,
    UserModule,
    TimesheetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
