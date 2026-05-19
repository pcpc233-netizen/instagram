import { Slide } from '../store/editorStore';

export interface TemplateProps {
  slide: Slide;
  index: number;
  total: number;
  brandName: string;
  accentColor: string;
}
