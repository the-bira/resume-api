import { Education } from '../entities/education.entity';
import { PersonalData } from '../entities/personal-data.entity';
import { ProfessionalExperience } from '../entities/professional-experience.entity';

export interface UpdateResumeDto {
  personalData?: PersonalData;
  professionalExperience?: ProfessionalExperience[];
  education?: Education[];
  profissionalSummary?: string;
  skills?: string[];
  languages?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  public?: boolean;
}
