export type Locale = "ru" | "en";

export const locales: Locale[] = ["ru", "en"];
export const defaultLocale: Locale = "ru";

export const translations = {
  ru: {
    nav: {
      projects: "Проекты",
      services: "Услуги",
      approach: "Процесс",
      about: "О студии",
      contact: "Контакты",
    },

    hero: {
      title: "Design Planner",
      subtitle: "Продуманные пространства.\nГде форма работает на жизнь.",
      cta_projects: "Смотреть проекты",
      cta_contact: "Обсудить проект",
      scroll: "Прокрутить",
    },

    services_preview: {
      title: "ФУНКЦИОНАЛЬНОЕ ПЛАНИРОВАНИЕ",
      items: ["Логика пространства", "Эргономика", "Визуальная чистота"],
    },

    projects: {
      heading: "Проекты",
      subheading: "Избранные работы",
      view_project: "Открыть проект",
      all_projects: "Все проекты",
    },

    project: {
      description: "Описание",
      before_after: "До / После",
      planning: "Планировка",
      details: "Детали",
      area: "Площадь",
      year: "Год",
      location: "Локация",
      back: "← Проекты",
    },

    services: {
      heading: "Услуги",
      subheading: "Что мы делаем",
      items: [
        {
          id: "planning",
          title: "Функциональное планирование",
          description: "Планировочные решения, основанные на реальных сценариях жизни.",
        },
        {
          id: "design",
          title: "Дизайн-проект",
          description: "Цельный визуальный образ пространства, материалы и рабочая логика.",
        },
        {
          id: "documentation",
          title: "Рабочая документация",
          description: "Чертежи и технические решения для реализации проекта.",
        },
        {
          id: "presentation",
          title: "Визуальная презентация",
          description: "Подача объекта через фото, видео и before/after формат.",
        },
      ],
    },

    approach: {
      heading: "Подход",
      subheading: "Сначала функция. Затем форма.",
      items: [
        "Мы проектируем не картинку, а сценарий жизни.",
        "Каждое решение должно быть логичным, удобным и реализуемым.",
        "Эстетика появляется там, где пространство собрано точно.",
      ],
    },

    about: {
      heading: "О студии",
      subheading: "Design Planner — ателье функционального проектирования и дизайна жилых пространств.",
      description: [
        "Мы создаём интерьеры, где планировка, эстетика и реализация работают как единая система.",
        "Каждое решение основано на логике пространства, сценариях жизни и точной работе с деталями.",
      ],
      values: [
        { label: "Логика", text: "Каждое решение имеет причину" },
        { label: "Эргономика", text: "Пространство работает для человека" },
        { label: "Чистота", text: "Ничего лишнего, только суть" },
      ],
    },

    contact: {
      heading: "Обсудить проект",
      subheading: "Расскажите о вашем проекте. Мы ответим в течение одного рабочего дня.",
      form: {
        name: "Имя",
        contact: "Телефон или email",
        message: "О проекте",
        submit: "Отправить",
        success: "Сообщение отправлено. Мы свяжемся с вами.",
      },
      info: {
        email: "hello@atelierform.ru",
        phone: "+7 495 000 00 00",
        address: "Москва, Россия",
      },
    },

    footer: {
      copyright: "© 2024 Design Planner. Все права защищены.",
      tagline: "Проектирование жилых пространств",
    },
  },

  en: {
    nav: {
      projects: "Projects",
      services: "Services",
      approach: "Process",
      about: "About",
      contact: "Contact",
    },

    hero: {
      title: "Design Planner",
      subtitle: "Functional design and planning\nof living spaces.",
      cta_projects: "View projects",
      cta_contact: "Discuss a project",
      scroll: "Scroll",
    },

    services_preview: {
      title: "FUNCTIONAL PLANNING",
      items: ["Interior logic", "Ergonomics", "Visual clarity"],
    },

    projects: {
      heading: "Projects",
      subheading: "Selected works",
      view_project: "View project",
      all_projects: "All projects",
    },

    project: {
      description: "Description",
      before_after: "Before / After",
      planning: "Planning",
      details: "Details",
      area: "Area",
      year: "Year",
      location: "Location",
      back: "← Projects",
    },

    services: {
      heading: "Services",
      subheading: "What we do",
      items: [
        {
          id: "planning",
          title: "Functional Planning",
          description: "Planning solutions based on real living scenarios.",
        },
        {
          id: "design",
          title: "Interior Design",
          description: "A complete visual concept with materials and spatial logic.",
        },
        {
          id: "documentation",
          title: "Working Documentation",
          description: "Drawings and technical documents for implementation.",
        },
        {
          id: "presentation",
          title: "Visual Presentation",
          description: "Object presentation through photo, video and before/after format.",
        },
      ],
    },

    approach: {
      heading: "Approach",
      subheading: "Function first. Form follows.",
      items: [
        "We design not an image, but a living scenario.",
        "Every decision must be logical, comfortable and buildable.",
        "Aesthetics appear when space is precisely composed.",
      ],
    },

    about: {
      heading: "About",
      subheading: "Design Planner is a studio for functional planning and residential interior design.",
      description: [
        "We create interiors where planning, aesthetics and implementation work as one system.",
        "Every decision is based on spatial logic, real-life scenarios and precise attention to detail.",
      ],
      values: [
        { label: "Logic", text: "Every decision has a reason" },
        { label: "Ergonomics", text: "Space works for people" },
        { label: "Clarity", text: "Nothing extra, only essence" },
      ],
    },

    contact: {
      heading: "Discuss a project",
      subheading: "Tell us about your project. We will reply within one business day.",
      form: {
        name: "Name",
        contact: "Phone or email",
        message: "About the project",
        submit: "Send",
        success: "Message sent. We will contact you.",
      },
      info: {
        email: "hello@atelierform.ru",
        phone: "+7 495 000 00 00",
        address: "Moscow, Russia",
      },
    },

    footer: {
      copyright: "© 2024 Design Planner. All rights reserved.",
      tagline: "Residential space design",
    },
  },
} as const;

export type Translations = (typeof translations)[Locale];

export default translations;
