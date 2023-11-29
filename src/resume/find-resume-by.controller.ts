import { Body, Controller, Get } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeOutputDto } from './dto/resume-output.dto';
import { FindByDto } from './dto/find-by.dto';

@Controller('find-resume-by')
export class FindResumeByController {
  constructor(private readonly resumeService: ResumeService) {}

  @Get()
  findBy(@Body() attributes: FindByDto): Promise<ResumeOutputDto[]> {
    console.log('Received findBy request with attributes:', attributes);
    return this.resumeService.findBy(attributes);
  }
}
