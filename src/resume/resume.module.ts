import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { DynamoResumeRepository } from './dynamo-repository/resume.repository';
import { FindResumeByController } from './find-resume-by.controller';

@Module({
  controllers: [ResumeController, FindResumeByController],
  providers: [
    ResumeService,
    {
      provide: 'ResumeRepository',
      useClass: DynamoResumeRepository,
    },
    {
      provide: 'DYNAMO_TABLE_NAME',
      useValue: 'ResumeTable',
    },
  ],
})
export class ResumeModule {}
