import { CreateResumeDto } from '../dto/create-resume.dto';
import { ResumeOutputDto } from '../dto/resume-output.dto';
import { UpdateResumeDto } from '../dto/update-resume.dto';

export interface ResumeRepository {
  save(createResumeDto: CreateResumeDto): Promise<ResumeOutputDto>;
  findAll(): Promise<ResumeOutputDto[]>;
  findOne(id: string): Promise<ResumeOutputDto | null>;
  update(
    id: string,
    updateResumeDto: UpdateResumeDto,
  ): Promise<ResumeOutputDto>;
  remove(id: string): Promise<ResumeOutputDto>;
  findBy(attributes: Record<string, any>): Promise<ResumeOutputDto[]>;
}
