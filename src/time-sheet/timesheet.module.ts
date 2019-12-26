import { Module } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';

@Module({
  providers: [TimesheetService],
})
export class TimesheetModule {}
