import { Education } from './education.entity';
import { PersonalData } from './personal-data.entity';
import { ProfessionalExperience } from './professional-experience.entity';

export interface Resume {
  id: string;
  personalData: PersonalData;
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
