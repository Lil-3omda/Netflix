import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



export interface TranslationData{
    heroTitle: string;
  searchPlaceholder: string;
  categoryAll: string;
  categoryComedy: string;
  categoryRomance: string;
  categoryAction: string;
  categoryKids: string;
  categorySeries: string;
  categoryMovies: string;
  trendingTitle: string;
  newsTitle: string;
  footerTitle: string;
  footerSubtitle: string;
  footerButton: string;
  newsroom: string;
  resources: string;
  apply: string;
  pressLogin: string;
}
@Injectable({
  providedIn: 'root'
})


export class Translation {

  private currentLanguageSubject = new BehaviorSubject<string>('en');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  private translations: { [key: string]: TranslationData} = {
    en: {
      heroTitle: "Discover Stories and Experiences to Share with Everyone",
      searchPlaceholder: "Search for titles, people, and genres on Netflix",
      categoryAll: "All",
      categoryComedy: "Comedy Shows",
      categoryRomance: "Romance",
      categoryAction: "Action & Thriller",
      categoryKids: "Kids & Family",
      categorySeries: "TV Series",
      categoryMovies: "Movies",
      trendingTitle: "Trending Now in July",
      newsTitle: "Latest News",
      footerTitle: "Looking for Company Assets?",
      footerSubtitle: "Get more images and information about Netflix on our corporate website.",
      footerButton: "Go to Netflix Corporate",
      newsroom: "Newsroom",
      resources: "Resources",
      apply: "Apply",
      pressLogin: "Press Log In"
    },
    ar: {
      heroTitle: "اكتشف القصص والتجارب لتشاركها مع الجميع",
      searchPlaceholder: "ابحث عن العناوين والأشخاص والأنواع على نتفليكس",
      categoryAll: "الكل",
      categoryComedy: "الكوميديا",
      categoryRomance: "الرومانسية",
      categoryAction: "الحركة والإثارة",
      categoryKids: "الأطفال والعائلة",
      categorySeries: "المسلسلات",
      categoryMovies: "الأفلام",
      trendingTitle: "الأكثر رواجاً في يوليو",
      newsTitle: "آخر الأخبار",
      footerTitle: "تبحث عن أصول الشركة؟",
      footerSubtitle: "احصل على المزيد من الصور والمعلومات حول نتفليكس على موقع الشركة.",
      footerButton: "انتقل إلى نتفليكس للشركات",
      newsroom: "غرفة الأخبار",
      resources: "الموارد",
      apply: "تقدم بطلب",
      pressLogin: "تسجيل دخول الصحافة"
    },
    es: {
      heroTitle: "Descubre Historias y Experiencias para Compartir con Todos",
      searchPlaceholder: "Buscar títulos, personas y géneros en Netflix",
      categoryAll: "Todo",
      categoryComedy: "Comedias",
      categoryRomance: "Romance",
      categoryAction: "Acción y Suspenso",
      categoryKids: "Niños y Familia",
      categorySeries: "Series de TV",
      categoryMovies: "Películas",
      trendingTitle: "Tendencia Ahora en Julio",
      newsTitle: "Últimas Noticias",
      footerTitle: "¿Buscas Activos de la Empresa?",
      footerSubtitle: "Obtén más imágenes e información sobre Netflix en nuestro sitio web corporativo.",
      footerButton: "Ir a Netflix Corporativo",
      newsroom: "Sala de Prensa",
      resources: "Recursos",
      apply: "Aplicar",
      pressLogin: "Iniciar Sesión de Prensa"
    }
  };

  setLanguage(langCode: string): void {
    this.currentLanguageSubject.next(langCode);
}
}
