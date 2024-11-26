import { Badge } from './Badge';

export interface User {
  id: string; // UUID
  nickname: string;
  password?: string; // Opcional, pois não será enviado no frontend
  url_avatar: string; // URL
  badges: Badge[];
  rank: number;
}
