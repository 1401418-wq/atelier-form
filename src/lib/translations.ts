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
      eyebrow: "О СТУДИИ",
      statement: "Ателье функционального проектирования и дизайна жилых пространств.",
      description: "Мы создаём интерьеры, где планировка, эстетика и реализация работают как единая система.",
      values: [
        { label: "Логика", text: "Каждое решение имеет причину" },
        { label: "Эргономика", text: "Пространство работает для человека" },
        { label: "Чистота", text: "Ничего лишнего, только суть" },
      ],
    },

    additionalServices: {
      eyebrow: "ДОПОЛНИТЕЛЬНО",
      heading: "Дополнительные направления",
      lead: "Помогаем не только разработать пространство, но и довести проект до практической реализации — от функционального проектирования до мебели и ремонта.",
      items: [
        {
          num: "01",
          title: "Функциональное проектирование",
          text: "Различные решения перепланировок, практичная организация пространства и удобная логика повседневной жизни.",
        },
        {
          num: "02",
          title: "Встроенная и корпусная мебель",
          text: "Гардеробные, шкафы-купе и мебель по индивидуальному эскизу, адаптированная под конкретное пространство.",
        },
        {
          num: "03",
          title: "Ремонт под ключ и детальное сопровождение",
          text: "Черновой, косметический и капитальный ремонт с аккуратной координацией процесса и вниманием к деталям.",
        },
      ],
      cta: "Обсудить проект",
    },

    contact: {
      eyebrow: "КОНТАКТЫ",
      heading: "Обсудим ваш проект",
      lead: "Расскажите о пространстве, задачах и желаемом формате работы. Мы предложим подходящий сценарий и следующий шаг.",
      location: "Москва, Россия",
      whatsappCta: "Написать в WhatsApp",
      contacts: [
        { label: "WhatsApp", value: "+7 966 044-43-33", href: "https://wa.me/79660444333" },
        { label: "Telegram", value: "@KetDPln", href: "https://t.me/KetDPln" },
        { label: "Instagram", value: "_designplanner_", href: "https://instagram.com/_designplanner_" },
        { label: "Email", value: "designplannerstudio@gmail.com", href: "mailto:designplannerstudio@gmail.com" },
        { label: "Телефон", value: "+7 966 044-43-33", href: "tel:+79660444333" },
      ],
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
      eyebrow: "ABOUT",
      statement: "A studio for functional planning and residential interior design.",
      description: "We create interiors where planning, aesthetics and implementation work as one system.",
      values: [
        { label: "Logic", text: "Every decision has a reason" },
        { label: "Ergonomics", text: "Space works for people" },
        { label: "Clarity", text: "Nothing extra, only essence" },
      ],
    },

    additionalServices: {
      eyebrow: "ADDITIONAL",
      heading: "Additional Services",
      lead: "We help not only design the space, but also bring the project to practical realization — from functional planning to custom furniture and renovation support.",
      items: [
        {
          num: "01",
          title: "Functional Planning",
          text: "Alternative layout solutions, practical space organization, and a comfortable logic for everyday living.",
        },
        {
          num: "02",
          title: "Built-in and Cabinet Furniture",
          text: "Walk-in wardrobes, sliding wardrobes, and custom furniture designed specifically for the space.",
        },
        {
          num: "03",
          title: "Turnkey Renovation and Detailed Support",
          text: "Rough, cosmetic, and full renovation with careful coordination and attention to detail.",
        },
      ],
      cta: "Discuss a project",
    },

    contact: {
      eyebrow: "CONTACTS",
      heading: "Let's discuss your project",
      lead: "Tell us about the space, your goals and the preferred format of work. We will suggest the right scenario and the next step.",
      location: "Moscow, Russia",
      whatsappCta: "Message on WhatsApp",
      contacts: [
        { label: "WhatsApp", value: "+7 966 044-43-33", href: "https://wa.me/79660444333" },
        { label: "Telegram", value: "@KetDPln", href: "https://t.me/KetDPln" },
        { label: "Instagram", value: "_designplanner_", href: "https://instagram.com/_designplanner_" },
        { label: "Email", value: "designplannerstudio@gmail.com", href: "mailto:designplannerstudio@gmail.com" },
        { label: "Phone", value: "+7 966 044-43-33", href: "tel:+79660444333" },
      ],
    },

    footer: {
      copyright: "© 2024 Design Planner. All rights reserved.",
      tagline: "Residential space design",
    },
  },
} as const;

export type Translations = (typeof translations)[Locale];

export default translations;
