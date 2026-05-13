const bookingForm = document.querySelector("#booking-form");
const formStatus = document.querySelector("#form-status");
const dateInput = bookingForm?.elements.date;
const bookingButton = bookingForm?.querySelector('button[type="submit"]');
const languageButtons = document.querySelectorAll("[data-lang]");
const metaDescription = document.querySelector('meta[name="description"]');
const languageStorageKey = "beerBarLanguage";
const galleryCards = Array.from(document.querySelectorAll("[data-gallery-item]"));
const galleryModal = document.querySelector("#gallery-modal");
const galleryModalVideo = document.querySelector("#gallery-modal-video");
const galleryModalTitle = document.querySelector("#gallery-modal-title");
const galleryModalCopy = document.querySelector("#gallery-modal-copy");
const galleryCloseButtons = document.querySelectorAll("[data-gallery-close]");
const galleryPreviousButton = document.querySelector("[data-gallery-prev]");
const galleryNextButton = document.querySelector("[data-gallery-next]");
let activeGalleryIndex = 0;

const translations = {
  ru: {
    langCode: "ru",
    pageTitle: "ZONA 6/9 - пивной бар",
    metaDescription: "Пивной бар ZONA 6/9: крафтовое пиво, закуски, живые встречи и бронирование столов.",
    brand: "ZONA 6/9",
    language: {
      aria: "Выбор языка",
    },
    nav: {
      aria: "Основная навигация",
      beer: "Пиво",
      menu: "QR menu",
      gallery: "Галерея",
      snacks: "Закуски",
      events: "События",
      contacts: "Контакты",
      book: "Забронировать",
    },
    hero: {
      aria: "Пивной бар ZONA 6/9",
      mediaAria: "Барная стойка с кранами крафтового пива",
      eyebrow: "6 кранов и 20+ видов пива из России, Сербии и Бельгии",
      title: "ZONA 6/9",
      copy: "Пивной бар в центре города для спокойных вечеров, шумных матчей и встреч, которые не хочется заканчивать.",
      book: "Стол на вечер",
      menu: "QR menu",
    },
    quick: {
      aria: "Краткая информация",
      today: "Сегодня",
      address: "Адрес",
      addressValue: "Суботица, Трг Цара Јована Ненада 6-10",
      booking: "Бронь",
    },
    intro: {
      kicker: "Атмосфера",
      title: "Бар, где знают вкус пива и не торопят разговор.",
      copy: "Наливаем крафтовое и классическое пиво: от свежего лагера до IPA, стаута и бельгийских сортов. К каждому бокалу подберем закуску, а к каждому вечеру - правильный темп.",
    },
    qrMenu: {
      kicker: "QR menu",
      title: "Сканируйте меню",
      copy: "Откройте меню ZONA 6/9 на телефоне: наведите камеру на QR-код.",
      imageAlt: "QR menu ZONA 6/9",
    },
    gallery: {
      kicker: "Галерея",
      title: "Атмосфера ZONA 6/9",
      copy: "Живые моменты из бара: откройте любое видео в большом формате.",
      open: "Смотреть",
      close: "Закрыть галерею",
      previous: "Предыдущее видео",
      next: "Следующее видео",
      modalAria: "Галерея ZONA 6/9",
      items: {
        atmosphere: {
          label: "Видео",
          title: "Вечерняя атмосфера",
          copy: "Теплый свет, холодное пиво и настроение ZONA 6/9.",
        },
        bar: {
          label: "Видео",
          title: "Открытие",
          copy: "Краны, бокалы и живой ритм вечера крупным планом.",
        },
        moment1: {
          label: "Видео",
          title: "Игры",
          copy: "Короткий взгляд на вечер в ZONA 6/9.",
        },
        moment2: {
          label: "Видео",
          title: "Наливаем вечер",
          copy: "Бар в движении: бокал за бокалом.",
        },
        moment3: {
          label: "Видео",
          title: "Настроение зала",
          copy: "Тот самый вечер, который лучше чувствуется вживую.",
        },
        moment4: {
          label: "Видео",
          title: "Пиво крупным планом",
          copy: "Свежий налив, темные тона и правильный барный свет.",
        },
        moment5: {
          label: "Видео",
          title: "Свет ZONA 6/9",
          copy: "Детали, настроение и теплое сияние бара.",
        },
        moment6: {
          label: "Видео",
          title: "Наши холодильники",
          copy: "Короткий фрагмент живого ритма ZONA 6/9.",
        },
        moment7: {
          label: "Видео",
          title: "Барная стойка",
          copy: "Еще один взгляд на настоящую атмосферу бара.",
        },
      },
    },
    beer: {
      kicker: "Барная карта",
      title: "Пиво на кранах",
      columns: {
        name: "Сорт",
        price: "Цена",
      },
      items: {
        pilsner: {
          name: "Золотой берег",
          copy: "Чистый солод, травяной хмель, сухой финал.",
        },
        ipa: {
          name: "Горький маршрут",
          copy: "Смола, грейпфрут, плотная хмелевая горечь.",
        },
        stout: {
          name: "Темная смена",
          copy: "Какао, кофе, мягкая сладость и бархатная пена.",
        },
        sour: {
          name: "Кислый двор",
          copy: "Черная смородина, легкая кислотность, освежающий финиш.",
        },
      },
    },
    snacks: {
      kicker: "Закуски",
      title: "К пиву",
      priceAsk: "Уточните в баре",
      items: {
        peanuts: {
          name: "Соленый арахис",
          copy: "Классическая соленая закуска к лагерю, пилсу и элю.",
        },
        pistachios: {
          name: "Фисташки",
          copy: "Соленые фисташки для спокойного вечера за бокалом.",
        },
        driedMeat: {
          name: "5 сортов вяленого мяса",
          copy: "Мясная нарезка к крафтовому и классическому пиву.",
        },
      },
    },
    events: {
      kicker: "Календарь",
      title: "Ближайшие вечера",
      items: {
        tasting: {
          date: "Четверг, 14 мая",
          name: "4 новых сорта крафтового пива",
          copy: "В четверг открываем новые вкусы для тех, кто любит пробовать что-то свежее.",
        },
        football: {
          date: "Новинка на кране",
          name: "Ravangrad High Five",
          copy: "New England, 6.5% alcohol. Новый сорт разливного пива уже в ZONA 6/9.",
        },
        acoustic: {
          date: "Скоро",
          name: "Следите за обновлениями",
          copy: "Анонсы появятся здесь, как только мы подтвердим даты и детали.",
        },
      },
    },
    booking: {
      kicker: "Бронь",
      title: "Оставьте стол за собой",
      copy: "Напишите имя, телефон и время визита. Мы перезвоним и подтвердим бронь.",
    },
    form: {
      name: "Имя",
      namePlaceholder: "Алексей",
      phone: "Телефон",
      date: "Дата и время",
      dateYearError: "Год должен состоять максимум из 4 цифр.",
      guests: "Гостей",
      submit: "Отправить заявку",
      sending: "Отправляем...",
      error: "Не удалось отправить заявку. Позвоните нам или напишите на email.",
      guestOptions: {
        2: "2 гостя",
        3: "3 гостя",
        4: "4 гостя",
        5: "5 гостей",
        6: "6 гостей",
      },
    },
    footer: {
      hours: "Вс-Чт 16:00 - 00:00, Пт-Сб 16:00 - 02:00",
      address: "Суботица, Трг Цара Јована Ненада 6-10<br>+381 62 932 66 64<br>69zona69zona@gmail.com",
    },
    guestForms: {
      one: "гость",
      few: "гостя",
      many: "гостей",
    },
    bookingSuccess: ({ name, guests, guestWord }) =>
      `${name}, заявка на ${guests} ${guestWord} отправлена. Мы скоро перезвоним.`,
  },
  en: {
    langCode: "en",
    pageTitle: "ZONA 6/9 - beer bar",
    metaDescription: "ZONA 6/9 beer bar: craft beer, snacks, live gatherings, and table reservations.",
    brand: "ZONA 6/9",
    language: {
      aria: "Language selection",
    },
    nav: {
      aria: "Main navigation",
      beer: "Beer",
      menu: "QR menu",
      gallery: "Gallery",
      snacks: "Snacks",
      events: "Events",
      contacts: "Contacts",
      book: "Book a table",
    },
    hero: {
      aria: "ZONA 6/9 beer bar",
      mediaAria: "Beer bar counter with craft beer taps",
      eyebrow: "6 taps and 20+ beers from Russia, Serbia, and Belgium",
      title: "ZONA 6/9",
      copy: "A beer bar downtown for relaxed evenings, loud match nights, and meetups you do not want to end.",
      book: "Table tonight",
      menu: "QR menu",
    },
    quick: {
      aria: "Quick information",
      today: "Today",
      address: "Address",
      addressValue: "Subotica, Trg Cara Jovana Nenada 6-10",
      booking: "Booking",
    },
    intro: {
      kicker: "Atmosphere",
      title: "A bar that knows beer and lets conversations breathe.",
      copy: "We pour craft and classic beer: from fresh lager to IPA, stout, and Belgian styles. We will match every glass with a snack and every evening with the right pace.",
    },
    qrMenu: {
      kicker: "QR menu",
      title: "Scan the menu",
      copy: "Open the ZONA 6/9 menu on your phone: point your camera at the QR code.",
      imageAlt: "ZONA 6/9 QR menu",
    },
    gallery: {
      kicker: "Gallery",
      title: "ZONA 6/9 in motion",
      copy: "Live moments from the bar: open any video to watch it larger.",
      open: "Watch",
      close: "Close gallery",
      previous: "Previous video",
      next: "Next video",
      modalAria: "ZONA 6/9 gallery",
      items: {
        atmosphere: {
          label: "Video",
          title: "Evening atmosphere",
          copy: "Warm light, cold beer, and the ZONA 6/9 mood.",
        },
        bar: {
          label: "Video",
          title: "Opening night",
          copy: "Taps, glasses, and the live pace of the evening up close.",
        },
        moment1: {
          label: "Video",
          title: "Games",
          copy: "A close look at the ZONA 6/9 evening.",
        },
        moment2: {
          label: "Video",
          title: "Pouring the night",
          copy: "The bar in motion, glass by glass.",
        },
        moment3: {
          label: "Video",
          title: "Room mood",
          copy: "The kind of evening that feels better in person.",
        },
        moment4: {
          label: "Video",
          title: "Beer close-up",
          copy: "Fresh pours, dark tones, and a proper bar glow.",
        },
        moment5: {
          label: "Video",
          title: "ZONA 6/9 lights",
          copy: "Small details, strong mood, and the glow of the bar.",
        },
        moment6: {
          label: "Video",
          title: "Our fridges",
          copy: "A short piece of the ZONA 6/9 rhythm.",
        },
        moment7: {
          label: "Video",
          title: "Bar counter",
          copy: "One more glimpse into the bar's real atmosphere.",
        },
      },
    },
    beer: {
      kicker: "Tap list",
      title: "Beer on Tap",
      columns: {
        name: "Beer",
        price: "Price",
      },
      items: {
        pilsner: {
          name: "Golden Shore",
          copy: "Clean malt, herbal hops, dry finish.",
        },
        ipa: {
          name: "Bitter Route",
          copy: "Pine resin, grapefruit, firm hop bitterness.",
        },
        stout: {
          name: "Dark Shift",
          copy: "Cocoa, coffee, gentle sweetness, and velvet foam.",
        },
        sour: {
          name: "Sour Yard",
          copy: "Blackcurrant, light acidity, refreshing finish.",
        },
      },
    },
    snacks: {
      kicker: "Snacks",
      title: "With Beer",
      priceAsk: "Ask at the bar",
      items: {
        peanuts: {
          name: "Salted peanuts",
          copy: "A classic salty snack for lager, pils, and ale.",
        },
        pistachios: {
          name: "Pistachios",
          copy: "Salted pistachios for an easy evening with a glass.",
        },
        driedMeat: {
          name: "5 types of dried meat",
          copy: "A meat selection for craft and classic beer.",
        },
      },
    },
    events: {
      kicker: "Calendar",
      title: "Upcoming Nights",
      items: {
        tasting: {
          date: "Thursday, May 14",
          name: "4 new craft beer varieties",
          copy: "On Thursday, we are opening new flavors for everyone who likes to try something fresh.",
        },
        football: {
          date: "New on tap",
          name: "Ravangrad High Five",
          copy: "New England, 6.5% alcohol. A new draft beer is now at ZONA 6/9.",
        },
        acoustic: {
          date: "Soon",
          name: "Watch this space",
          copy: "Announcements will appear here once dates and details are confirmed.",
        },
      },
    },
    booking: {
      kicker: "Reservation",
      title: "Keep a table for yourself",
      copy: "Leave your name, phone, and visit time. We will call back to confirm.",
    },
    form: {
      name: "Name",
      namePlaceholder: "Alex",
      phone: "Phone",
      date: "Date and time",
      dateYearError: "The year must contain no more than 4 digits.",
      guests: "Guests",
      submit: "Send request",
      sending: "Sending...",
      error: "Could not send the request. Please call us or email us.",
      guestOptions: {
        2: "2 guests",
        3: "3 guests",
        4: "4 guests",
        5: "5 guests",
        6: "6 guests",
      },
    },
    footer: {
      hours: "Sun-Thu 16:00 - 00:00, Fri-Sat 16:00 - 02:00",
      address: "Subotica, Trg Cara Jovana Nenada 6-10<br>+381 62 932 66 64<br>69zona69zona@gmail.com",
    },
    guestForms: {
      one: "guest",
      few: "guests",
      many: "guests",
    },
    bookingSuccess: ({ name, guests, guestWord }) =>
      `${name}, your booking request for ${guests} ${guestWord} has been sent. We'll call you soon.`,
  },
  sr: {
    langCode: "sr",
    pageTitle: "ZONA 6/9 - pivski bar",
    metaDescription: "Pivski bar ZONA 6/9: kraft pivo, zalogaji, druženja uživo i rezervacija stolova.",
    brand: "ZONA 6/9",
    language: {
      aria: "Izbor jezika",
    },
    nav: {
      aria: "Glavna navigacija",
      beer: "Pivo",
      menu: "QR menu",
      gallery: "Galerija",
      snacks: "Grickalice",
      events: "Događaji",
      contacts: "Kontakt",
      book: "Rezerviši",
    },
    hero: {
      aria: "Pivski bar ZONA 6/9",
      mediaAria: "Barski pult sa točilicama kraft piva",
      eyebrow: "6 točilica i 20+ piva iz Rusije, Srbije i Belgije",
      title: "ZONA 6/9",
      copy: "Pivski bar u centru grada za mirne večeri, glasne utakmice i susrete koje ne želite da završite.",
      book: "Sto za večeras",
      menu: "QR menu",
    },
    quick: {
      aria: "Kratke informacije",
      today: "Danas",
      address: "Adresa",
      addressValue: "Subotica, Trg cara Jovana Nenada 6-10",
      booking: "Rezervacije",
    },
    intro: {
      kicker: "Atmosfera",
      title: "Bar koji poznaje ukus piva i ne požuruje razgovor.",
      copy: "Točimo kraft i klasično pivo: od svežeg lagera do IPA, stouta i belgijskih stilova. Za svaku čašu biramo zalogaj, a za svako veče pravi ritam.",
    },
    qrMenu: {
      kicker: "QR menu",
      title: "Skenirajte meni",
      copy: "Otvorite ZONA 6/9 meni na telefonu: usmerite kameru ka QR kodu.",
      imageAlt: "ZONA 6/9 QR meni",
    },
    gallery: {
      kicker: "Galerija",
      title: "Atmosfera ZONA 6/9",
      copy: "Trenuci iz bara: otvorite bilo koji video u većem prikazu.",
      open: "Pogledaj",
      close: "Zatvori galeriju",
      previous: "Prethodni video",
      next: "Sledeći video",
      modalAria: "Galerija ZONA 6/9",
      items: {
        atmosphere: {
          label: "Video",
          title: "Večernja atmosfera",
          copy: "Toplo svetlo, hladno pivo i raspoloženje ZONA 6/9.",
        },
        bar: {
          label: "Video",
          title: "Otvaranje",
          copy: "Točilice, čaše i živi ritam večeri izbliza.",
        },
        moment1: {
          label: "Video",
          title: "Igre",
          copy: "Kratak pogled na veče u ZONA 6/9.",
        },
        moment2: {
          label: "Video",
          title: "Točimo veče",
          copy: "Bar u pokretu, čaša za čašom.",
        },
        moment3: {
          label: "Video",
          title: "Atmosfera lokala",
          copy: "Veče koje se najbolje oseća uživo.",
        },
        moment4: {
          label: "Video",
          title: "Pivo izbliza",
          copy: "Sveže točeno pivo, tamni tonovi i pravi barski sjaj.",
        },
        moment5: {
          label: "Video",
          title: "Svetla ZONA 6/9",
          copy: "Detalji, raspoloženje i toplo svetlo bara.",
        },
        moment6: {
          label: "Video",
          title: "Naši frižideri",
          copy: "Kratak deo živog ritma ZONA 6/9.",
        },
        moment7: {
          label: "Video",
          title: "Barski pult",
          copy: "Još jedan pogled na pravu atmosferu bara.",
        },
      },
    },
    beer: {
      kicker: "Karta piva",
      title: "Pivo na točilicama",
      columns: {
        name: "Pivo",
        price: "Cena",
      },
      items: {
        pilsner: {
          name: "Zlatna obala",
          copy: "Čist slad, travnati hmelj, suv završetak.",
        },
        ipa: {
          name: "Gorka ruta",
          copy: "Smola, grejpfrut, čvrsta hmeljna gorčina.",
        },
        stout: {
          name: "Tamna smena",
          copy: "Kakao, kafa, blaga slatkoća i baršunasta pena.",
        },
        sour: {
          name: "Kiselo dvorište",
          copy: "Crna ribizla, lagana kiselost, osvežavajući finiš.",
        },
      },
    },
    snacks: {
      kicker: "Grickalice",
      title: "Uz pivo",
      priceAsk: "Pitajte u baru",
      items: {
        peanuts: {
          name: "Slani kikiriki",
          copy: "Klasična slana grickalica uz lager, pils i ejl.",
        },
        pistachios: {
          name: "Pistaći",
          copy: "Slani pistaći za mirno veče uz čašu piva.",
        },
        driedMeat: {
          name: "5 vrsta suvog mesa",
          copy: "Mesna selekcija uz kraft i klasično pivo.",
        },
      },
    },
    events: {
      kicker: "Kalendar",
      title: "Predstojeće večeri",
      items: {
        tasting: {
          date: "Četvrtak, 14. maj",
          name: "4 nove vrste kraft piva",
          copy: "U četvrtak otvaramo nove ukuse za sve koji vole da probaju nešto sveže.",
        },
        football: {
          date: "Novo na točilici",
          name: "Ravangrad High Five",
          copy: "New England, 6.5% alkohola. Novo točeno pivo je već u ZONA 6/9.",
        },
        acoustic: {
          date: "Uskoro",
          name: "Pratite novosti",
          copy: "Najave će se pojaviti ovde čim potvrdimo datume i detalje.",
        },
      },
    },
    booking: {
      kicker: "Rezervacija",
      title: "Sačuvajte sto za sebe",
      copy: "Unesite ime, telefon i vreme posete. Pozvaćemo vas da potvrdimo rezervaciju.",
    },
    form: {
      name: "Ime",
      namePlaceholder: "Aleksandar",
      phone: "Telefon",
      date: "Datum i vreme",
      dateYearError: "Godina može imati najviše 4 cifre.",
      guests: "Gosti",
      submit: "Pošalji zahtev",
      sending: "Šaljemo...",
      error: "Zahtev nije poslat. Pozovite nas ili nam pišite na email.",
      guestOptions: {
        2: "2 gosta",
        3: "3 gosta",
        4: "4 gosta",
        5: "5 gostiju",
        6: "6 gostiju",
      },
    },
    footer: {
      hours: "Ned-Čet 16:00 - 00:00, Pet-Sub 16:00 - 02:00",
      address: "Subotica, Trg cara Jovana Nenada 6-10<br>+381 62 932 66 64<br>69zona69zona@gmail.com",
    },
    guestForms: {
      one: "gost",
      few: "gosta",
      many: "gostiju",
    },
    bookingSuccess: ({ name, guests, guestWord }) =>
      `${name}, zahtev za ${guests} ${guestWord} je poslat. Uskoro vas zovemo.`,
  },
};

const getStoredLanguage = () => {
  try {
    return localStorage.getItem(languageStorageKey);
  } catch {
    return null;
  }
};

const setStoredLanguage = (language) => {
  try {
    localStorage.setItem(languageStorageKey, language);
  } catch {
    // The switch still works when localStorage is unavailable.
  }
};

const getTranslation = (path, dictionary) =>
  path.split(".").reduce((value, key) => value?.[key], dictionary);

const setText = (selector, attribute, setter, dictionary) => {
  document.querySelectorAll(selector).forEach((element) => {
    const translation = getTranslation(element.dataset[attribute], dictionary);

    if (typeof translation === "string") {
      setter(element, translation);
    }
  });
};

let currentLanguage = translations[getStoredLanguage()] ? getStoredLanguage() : "ru";

const getGuestWord = (count) => {
  const numericCount = Number(count);
  const forms = translations[currentLanguage].guestForms;

  if (numericCount === 1) return forms.one;
  if (numericCount >= 2 && numericCount <= 4) return forms.few;
  return forms.many;
};

const getCurrentDictionary = () => translations[currentLanguage] || translations.ru;

const getLocalizedText = (key) => {
  const translation = key ? getTranslation(key, getCurrentDictionary()) : "";
  return typeof translation === "string" ? translation : "";
};

const renderGalleryModal = (index) => {
  const item = galleryCards[index];

  if (!item || !galleryModalVideo) {
    return;
  }

  const source = document.createElement("source");
  source.src = item.dataset.gallerySrc;
  source.type = item.dataset.galleryType || "video/mp4";

  galleryModalVideo.pause();
  galleryModalVideo.innerHTML = "";
  galleryModalVideo.append(source);
  galleryModalVideo.load();

  if (galleryModalTitle) {
    galleryModalTitle.textContent = getLocalizedText(item.dataset.galleryTitleKey);
  }

  if (galleryModalCopy) {
    galleryModalCopy.textContent = getLocalizedText(item.dataset.galleryCopyKey);
  }
};

const showGalleryItem = (index) => {
  if (!galleryCards.length) {
    return;
  }

  activeGalleryIndex = (index + galleryCards.length) % galleryCards.length;
  renderGalleryModal(activeGalleryIndex);
  const playPromise = galleryModalVideo?.play();
  playPromise?.catch(() => {});
};

const openGallery = (index) => {
  if (!galleryModal || !galleryCards.length) {
    return;
  }

  galleryModal.classList.add("is-open");
  galleryModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-gallery-open");
  showGalleryItem(index);
};

const closeGallery = () => {
  if (!galleryModal || !galleryModalVideo) {
    return;
  }

  galleryModal.classList.remove("is-open");
  galleryModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-gallery-open");
  galleryModalVideo.pause();
  galleryModalVideo.innerHTML = "";
  galleryModalVideo.load();
};

const applyLanguage = (language) => {
  const dictionary = translations[language] || translations.ru;
  currentLanguage = translations[language] ? language : "ru";

  document.documentElement.lang = dictionary.langCode;
  document.title = dictionary.pageTitle;

  if (metaDescription) {
    metaDescription.setAttribute("content", dictionary.metaDescription);
  }

  setText("[data-i18n]", "i18n", (element, value) => {
    element.textContent = value;
  }, dictionary);

  setText("[data-i18n-html]", "i18nHtml", (element, value) => {
    element.innerHTML = value;
  }, dictionary);

  setText("[data-i18n-placeholder]", "i18nPlaceholder", (element, value) => {
    element.setAttribute("placeholder", value);
  }, dictionary);

  setText("[data-i18n-alt]", "i18nAlt", (element, value) => {
    element.setAttribute("alt", value);
  }, dictionary);

  setText("[data-i18n-aria]", "i18nAria", (element, value) => {
    element.setAttribute("aria-label", value);
  }, dictionary);

  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === currentLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (formStatus) {
    formStatus.textContent = "";
  }

  if (bookingButton) {
    bookingButton.textContent = dictionary.form.submit;
  }

  if (galleryModal?.classList.contains("is-open")) {
    renderGalleryModal(activeGalleryIndex);
  }

  setStoredLanguage(currentLanguage);
};

if (dateInput) {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  dateInput.min = now.toISOString().slice(0, 16);
  dateInput.max = "9999-12-31T23:59";

  const limitDateYear = () => {
    const value = dateInput.value;
    const match = value.match(/^(\d{5,})(.*)$/);

    if (match) {
      dateInput.value = `${match[1].slice(0, 4)}${match[2]}`;
    }

    dateInput.setCustomValidity("");
  };

  dateInput.addEventListener("input", limitDateYear);
  dateInput.addEventListener("change", limitDateYear);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.lang);
  });
});

galleryCards.forEach((card, index) => {
  const previewVideo = card.querySelector("video");

  const ensurePreviewVideo = () => {
    if (!previewVideo || previewVideo.dataset.loaded) {
      return;
    }

    const source = document.createElement("source");
    source.src = card.dataset.gallerySrc;
    source.type = card.dataset.galleryType || "video/mp4";
    previewVideo.append(source);
    previewVideo.dataset.loaded = "true";
    previewVideo.load();
  };

  const playPreview = () => {
    ensurePreviewVideo();
    const playPromise = previewVideo?.play();
    playPromise?.catch(() => {});
  };

  const pausePreview = () => {
    previewVideo?.pause();
  };

  card.addEventListener("mouseenter", playPreview);
  card.addEventListener("mouseleave", pausePreview);
  card.addEventListener("focusin", playPreview);
  card.addEventListener("focusout", pausePreview);
  card.addEventListener("click", () => openGallery(index));
  card.addEventListener("keydown", (event) => {
    if (event.target.closest("button")) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openGallery(index);
    }
  });
});

galleryCloseButtons.forEach((button) => {
  button.addEventListener("click", closeGallery);
});

galleryPreviousButton?.addEventListener("click", () => showGalleryItem(activeGalleryIndex - 1));
galleryNextButton?.addEventListener("click", () => showGalleryItem(activeGalleryIndex + 1));

document.addEventListener("keydown", (event) => {
  if (!galleryModal?.classList.contains("is-open")) {
    return;
  }

  if (event.key === "Escape") {
    closeGallery();
  }

  if (event.key === "ArrowLeft") {
    showGalleryItem(activeGalleryIndex - 1);
  }

  if (event.key === "ArrowRight") {
    showGalleryItem(activeGalleryIndex + 1);
  }
});

bookingForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(bookingForm);
  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const date = String(formData.get("date") || "").trim();
  const guests = String(formData.get("guests") || "2");
  const dictionary = translations[currentLanguage];
  const dateYear = date.split("-")[0] || "";

  if (dateYear.length > 4) {
    dateInput?.setCustomValidity(dictionary.form.dateYearError);
    dateInput?.reportValidity();
    return;
  }

  dateInput?.setCustomValidity("");

  if (bookingButton) {
    bookingButton.disabled = true;
    bookingButton.textContent = dictionary.form.sending;
  }

  formStatus.textContent = dictionary.form.sending;

  try {
    const response = await fetch("/api/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date,
        guests,
        language: currentLanguage,
        name,
        phone,
      }),
    });

    if (!response.ok) {
      throw new Error("Booking request failed");
    }

    formStatus.textContent = dictionary.bookingSuccess({
      name,
      guests,
      guestWord: getGuestWord(guests),
    });
    bookingForm.reset();
  } catch {
    formStatus.textContent = dictionary.form.error;
  } finally {
    if (bookingButton) {
      bookingButton.disabled = false;
      bookingButton.textContent = dictionary.form.submit;
    }
  }
});

applyLanguage(currentLanguage);
