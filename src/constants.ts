
import { 
  GraduationCap, TrendingUp, Heart, ShieldAlert, 
  UserCheck, Globe, Briefcase, Sun, Layers, HelpCircle
} from 'lucide-react';

export const SECTOR_DATA: Record<string, any> = {
  'education-and-training': {
    id: 'education-and-training',
    title: 'Education and Training',
    icon: GraduationCap,
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600',
    indicators: [
      { id: '1', slug: 'literacy-rate', title: 'Basic and Functional Literacy Rate, By Sex', office: 'CPDSO / DepEd', definition: 'The percentage of the population aged 10 and above who can read and write simple messages.' },
      { id: '2', slug: 'completion-rate', title: 'School Completion Rate', office: 'DepEd', definition: 'The percentage of graduates in the last school year who completed the level of education.' }
    ]
  },
  'economy': {
    id: 'economy',
    title: 'Economy',
    icon: TrendingUp,
    img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=600',
    indicators: [
      { id: '9', slug: 'labor-participation', title: 'Labor Force Participation Rate', office: 'PESO / PSA', definition: 'Proportion of the population aged 15 and above that is either employed or unemployed.' }
    ]
  },
  'health': {
    id: 'health',
    title: 'Health',
    icon: Heart,
    img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600',
    indicators: [
      { id: '15', slug: 'stunting', title: 'Prevalence of Stunting', office: 'HSO', definition: 'Percentage of children under 5 years old who are stunted (height-for-age).' }
    ]
  },
  'poverty': {
    id: 'poverty',
    title: 'Poverty',
    icon: HelpCircle,
    img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600',
    indicators: []
  },
  'power': {
    id: 'power',
    title: 'Power and Decision-Making',
    icon: UserCheck,
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=600',
    indicators: [
      { id: '32', slug: 'govt-seats', title: 'Seats Held by Women in Govt', office: 'SP / HRMO', definition: 'Proportion of seats held by women in the local government unit.' }
    ]
  },
  'violence': {
    id: 'violence',
    title: 'Violence Against Women',
    icon: ShieldAlert,
    img: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=600',
    indicators: []
  },
  'institutional': {
    id: 'institutional',
    title: 'Institutional Mechanism',
    icon: Briefcase,
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600',
    indicators: []
  },
  'environment': {
    id: 'environment',
    title: 'Environment',
    icon: Sun,
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600',
    indicators: []
  }
};
