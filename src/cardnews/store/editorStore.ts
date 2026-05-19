import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TemplateId =
  | 'minimal-white' | 'dark-premium' | 'pastel-soft' | 'bold-type'
  | 'luxury-editorial' | 'split-frame' | 'street-bold' | 'kfashion-grad' | 'editorial-mag' | 'minimalist-lux';
export type SlideType = 'cover' | 'content' | 'cta';

export interface Slide {
  id: string;
  type: SlideType;
  title: string;
  body: string;
  bgImage?: string;
  template?: TemplateId; // per-slide override
}

export interface CustomFont {
  name: string;   // display name
  family: string; // CSS font-family name
  dataUrl: string; // base64
}

export interface BufferProfile {
  id: string;
  service: string;
  formatted_username: string;
  avatar_https: string;
}

interface EditorStore {
  slides: Slide[];
  activeIndex: number;
  template: TemplateId;
  brandName: string;
  accentColor: string;
  bufferToken: string;
  bufferProfiles: BufferProfile[];
  selectedProfileId: string;
  fontFamily: string;
  customFonts: CustomFont[];

  addSlide: () => void;
  removeSlide: (id: string) => void;
  updateSlide: (id: string, data: Partial<Omit<Slide, 'id'>>) => void;
  setActive: (index: number) => void;
  setTemplate: (t: TemplateId) => void;
  setBrandName: (name: string) => void;
  setAccentColor: (color: string) => void;
  moveSlide: (from: number, to: number) => void;
  setBufferToken: (token: string) => void;
  setBufferProfiles: (profiles: BufferProfile[]) => void;
  setSelectedProfile: (id: string) => void;
  loadGenerated: (slides: Omit<Slide, 'id'>[], hashtags: string) => void;
  setSlideImage: (id: string, bgImage: string) => void;
  setAllSlidesImage: (bgImage: string) => void;
  setSlideTemplate: (id: string, tpl: TemplateId | undefined) => void;
  setFontFamily: (font: string) => void;
  addCustomFont: (font: CustomFont) => void;
  hashtags: string;
  reset: () => void;
}

const defaultSlides: Slide[] = [
  {
    id: 'slide-1',
    type: 'cover',
    title: '제목을 입력하세요',
    body: '핵심 메시지를 여기에 작성하세요',
  },
  {
    id: 'slide-2',
    type: 'content',
    title: '핵심 포인트 1',
    body: '이곳에 핵심 내용을 입력하세요.\n간결하고 명확하게 작성하면 효과적입니다.',
  },
  {
    id: 'slide-3',
    type: 'content',
    title: '핵심 포인트 2',
    body: '두 번째 내용을 여기에 작성하세요.\n줄바꿈도 자유롭게 사용할 수 있습니다.',
  },
  {
    id: 'slide-4',
    type: 'cta',
    title: '팔로우 부탁드려요!',
    body: '더 많은 정보를 원하신다면\n계정을 팔로우해주세요 :)',
  },
];

const initialState = {
  slides: defaultSlides,
  activeIndex: 0,
  template: 'minimal-white' as TemplateId,
  brandName: '@브랜드명',
  accentColor: '#6366f1',
  bufferToken: '',
  bufferProfiles: [],
  selectedProfileId: '',
  hashtags: '',
  fontFamily: '"Noto Sans KR", sans-serif',
  customFonts: [],
};

export const useEditorStore = create<EditorStore>()(
  persist(
    (set) => ({
      ...initialState,

      addSlide: () =>
        set((s) => ({
          slides: [
            ...s.slides,
            {
              id: `slide-${Date.now()}`,
              type: 'content',
              title: '새 슬라이드',
              body: '내용을 입력하세요',
            },
          ],
          activeIndex: s.slides.length,
        })),

      removeSlide: (id) =>
        set((s) => {
          if (s.slides.length <= 1) return s;
          const slides = s.slides.filter((sl) => sl.id !== id);
          const removedIdx = s.slides.findIndex((sl) => sl.id === id);
          return {
            slides,
            activeIndex: Math.min(
              removedIdx === s.activeIndex ? Math.max(0, removedIdx - 1) : s.activeIndex,
              slides.length - 1
            ),
          };
        }),

      updateSlide: (id, data) =>
        set((s) => ({
          slides: s.slides.map((sl) => (sl.id === id ? { ...sl, ...data } : sl)),
        })),

      setActive: (activeIndex) => set({ activeIndex }),
      setTemplate: (template) => set({ template }),
      setBrandName: (brandName) => set({ brandName }),
      setAccentColor: (accentColor) => set({ accentColor }),

      moveSlide: (from, to) =>
        set((s) => {
          const slides = [...s.slides];
          const [item] = slides.splice(from, 1);
          slides.splice(to, 0, item);
          return { slides, activeIndex: to };
        }),

      setBufferToken: (bufferToken) => set({ bufferToken }),
      setBufferProfiles: (bufferProfiles) => set({ bufferProfiles }),
      setSelectedProfile: (selectedProfileId) => set({ selectedProfileId }),

      loadGenerated: (rawSlides, hashtags) =>
        set({
          slides: rawSlides.map((s, i) => ({ ...s, id: `ai-${Date.now()}-${i}` })),
          activeIndex: 0,
          hashtags,
        }),

      setSlideImage: (id, bgImage) =>
        set((s) => ({
          slides: s.slides.map((sl) => (sl.id === id ? { ...sl, bgImage } : sl)),
        })),

      setAllSlidesImage: (bgImage) =>
        set((s) => ({
          slides: s.slides.map((sl) => ({ ...sl, bgImage })),
        })),

      setSlideTemplate: (id, tpl) =>
        set((s) => ({
          slides: s.slides.map((sl) => (sl.id === id ? { ...sl, template: tpl } : sl)),
        })),

      setFontFamily: (fontFamily) => set({ fontFamily }),

      addCustomFont: (font) =>
        set((s) => ({ customFonts: [...s.customFonts.filter((f) => f.family !== font.family), font] })),

      reset: () => set({ ...initialState, slides: defaultSlides }),
    }),
    {
      name: 'cardnews-editor-v1',
      partialize: (s) => ({
        slides: s.slides,
        template: s.template,
        brandName: s.brandName,
        accentColor: s.accentColor,
        bufferToken: s.bufferToken,
        fontFamily: s.fontFamily,
        customFonts: s.customFonts,
      }),
    }
  )
);
