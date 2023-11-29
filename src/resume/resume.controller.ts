import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ResumeOutputDto } from './dto/resume-output.dto';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post()
  create(@Body() createResumeDto: CreateResumeDto): Promise<ResumeOutputDto> {
    return this.resumeService.create(createResumeDto);
  }

  @Get()
  findAll(): Promise<ResumeOutputDto[]> {
    return this.resumeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ResumeOutputDto | null> {
    return this.resumeService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateResumeDto: UpdateResumeDto,
  ): Promise<ResumeOutputDto> {
    return this.resumeService.update(id, updateResumeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<ResumeOutputDto> {
    return this.resumeService.remove(id);
  }
}
