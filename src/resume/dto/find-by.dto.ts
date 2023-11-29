export interface FindByDto {
  id?: string;
  personalData?: {
    fullName?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
    postalCode?: string;
    linkedin?: string;
    github?: string;
  };
  professionalExperience?: {
    company?: string;
    position?: string;
    startMonth?: number;
    startYear?: number;
    endMonth?: number;
    endYear?: number;
    location?: string;
    description?: string;
  }[];
  education?: {
    institution?: string;
    degree?: string;
    startMonth?: number;
    startYear?: number;
    endMonth?: number;
    endYear?: number;
    location?: string;
    description?: string;
  }[];
  profissionalSummary?: string;
  skills?: string[];
  languages?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  public?: boolean;
}
