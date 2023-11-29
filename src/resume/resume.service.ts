import { Inject, Injectable } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ResumeRepository } from './repository/resume.repository';
import { ResumeOutputDto } from './dto/resume-output.dto';
import { FindByDto } from './dto/find-by.dto';

@Injectable()
export class ResumeService {
  constructor(
    @Inject('ResumeRepository')
    private readonly resumeRepository: ResumeRepository,
  ) {}

  async create(createResumeDto: CreateResumeDto): Promise<ResumeOutputDto> {
    return this.resumeRepository.save(createResumeDto);
  }

  async findAll(): Promise<ResumeOutputDto[]> {
    return this.resumeRepository.findAll();
  }

  async findOne(id: string): Promise<ResumeOutputDto> {
    return this.resumeRepository.findOne(id);
  }

  async update(
    id: string,
    updateResumeDto: UpdateResumeDto,
  ): Promise<ResumeOutputDto> {
    return this.resumeRepository.update(id, updateResumeDto);
  }

  async remove(id: string): Promise<ResumeOutputDto> {
    return this.resumeRepository.remove(id);
  }

  async findBy(attributes: FindByDto): Promise<ResumeOutputDto[]> {
    return this.resumeRepository.findBy(attributes);
  }
}
