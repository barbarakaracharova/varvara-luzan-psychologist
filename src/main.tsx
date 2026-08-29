import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  FileText,
  Instagram,
  MessageCircle,
} from "lucide-react";
import "./styles.css";

const links = {
  booking: "https://docs.google.com/forms/d/e/1FAIpQLSfJ86HO_YiK0rN2yhrdKltusymdy_FAjyeoxqT4TYTjXmyG1g/viewform?usp=header",
  formPost: "https://docs.google.com/forms/d/e/1FAIpQLSfJ86HO_YiK0rN2yhrdKltusymdy_FAjyeoxqT4TYTjXmyG1g/formResponse",
  telegram: "https://t.me/barbarakaracharovaa",
  instagram: "https://www.instagram.com/barbarakaracharova.a",
  docs: "https://drive.google.com/drive/folders/1oplxtSNpSCYeQsyoCgzILNulmMn6hGnl?usp=sharing",
  privacy: "personal-data-policy.html",
  offer: "offer.html",
  personalDataConsent: "personal-data-consent.html",
  mailingConsent: "mailing-consent.html",
  cookies: "cookies.html",
};

const requests = [
  {
    title: "БАР, ПРЛ, КПТСР",
    text: "Когда важно видеть за диагнозом не ярлык, а живой опыт, реакции, историю и способы опоры.",
  },
  {
    title: "Эмоциональные качели",
    text: "Резкие перепады состояния, импульсивность, усталость от себя и попытки выдерживать больше, чем есть сил.",
  },
  {
    title: "Отношения и привязанность",
    text: "Страх быть оставленной, эмоциональная зависимость, сложность доверять и поиск более безопасного контакта.",
  },
  {
    title: "Тревога и депрессивные состояния",
    text: "Напряжение, апатия, потеря опоры, перегруз и ощущение, что обычная жизнь требует слишком много сил.",
  },
  {
    title: "Стыд и внутренняя критика",
    text: "Когда внутри много самообвинения, сравнения, чувства неправильности и страха быть замеченной.",
  },
  {
    title: "Кризисы и самоподдержка",
    text: "Периоды, где важно не остаться одной с острым состоянием и собрать понятные способы пережить волну.",
  },
  {
    title: "«Со мной что-то не так»",
    text: "Ощущение поломки, чуждости себе, внутренней пустоты и сложности назвать то, что происходит.",
  },
  {
    title: "СДВГ и расфокус",
    text: "Хаос в задачах, трудность удерживать внимание, перегруз от быта и поиск более бережной организации жизни.",
  },
];

const principles = [
  ["Безоценочность", "Можно говорить о сложном без страха, что вас будут стыдить или срочно чинить."],
  ["Ясные договоренности", "Мы заранее обсуждаем процесс, регулярность, границы работы и формат связи."],
  ["Уважение к опыту", "Я не подгоняю человека под шаблон. У каждой реакции есть история и контекст."],
];

const firstMeeting = [
  {
    title: "Знакомимся",
    text: "Вы рассказываете, что сейчас болит и чего хочется от работы. Я задаю вопросы, чтобы лучше понять контекст.",
  },
  {
    title: "Договариваемся о процессе",
    text: "Обсуждаем регулярность, формат, ожидания, оплату и то, какие темы важно держать особенно бережно.",
  },
  {
    title: "Смотрим, подходит ли контакт",
    text: "Первая встреча не обязывает продолжать. Важно, чтобы рядом со мной вам было достаточно спокойно и понятно.",
  },
];

const learning = [
  {
    title: "Образование и клиническая подготовка",
    text: "Я обучаюсь на клинического психолога и продолжаю углублять знания в психопатологии, КПТ, ДБТ и ACT.",
  },
  {
    title: "Супервизии и личная терапия",
    text: "Работа идет с регулярной профессиональной поддержкой и личной терапией. Это часть ответственности, а не формальность.",
  },
  {
    title: "Современная научная опора",
    text: "Я читаю профессиональную литературу, прохожу повышения квалификации и сверяю практику с доказательными подходами.",
  },
];

const library = [
  {
    title: "Романтизация расстройств",
    href: "https://t.me/barbarakaracharovaa/2114",
    text: "Почему эстетика боли может мешать видеть реальность лечения, восстановления и живой человеческой сложности.",
  },
  {
    title: "Почему ремиссия может пугать",
    href: "https://t.me/barbarakaracharovaa/2117",
    text: "Про потерю привычной версии себя и необходимость строить идентичность не вокруг боли.",
  },
  {
    title: "Не все нужно чинить",
    href: "https://t.me/barbarakaracharovaa/2135",
    text: "О терапии как способе понимать, принимать и учитывать разные части опыта.",
  },
];

const faq = [
  {
    question: "Какой подход используется в работе?",
    answer:
      "Я работаю в когнитивно-поведенческом подходе и использую методы ДБТ и ACT. Эти инструменты помогают работать с эмоциями, внутренними конфликтами, ценностями, острыми состояниями и хроническим стрессом.",
  },
  {
    question: "Можно ли прийти, если я раньше не был у психолога?",
    answer:
      "Да. Первая встреча нужна, чтобы спокойно познакомиться, обозначить запрос и понять, какой формат работы будет бережным и полезным именно для вас.",
  },
  {
    question: "Вы назначаете препараты или ставите диагнозы?",
    answer:
      "Нет. Я не психиатр, не назначаю и не отменяю медикаменты, не подбираю лечение и не ставлю медицинские диагнозы.",
  },
];

type BookingFormState = {
  name: string;
  age: string;
  request: string;
  therapyExperience: string;
  therapyApproach: string;
  currentTherapy: string;
  expectations: string;
  contact: string;
  agreePersonalData: boolean;
  agreeMailing: boolean;
};

const emptyBookingForm: BookingFormState = {
  name: "",
  age: "",
  request: "",
  therapyExperience: "",
  therapyApproach: "",
  currentTherapy: "",
  expectations: "",
  contact: "",
  agreePersonalData: false,
  agreeMailing: false,
};

const reveal = {
  hidden: { opacity: 0, y: 18, scale: 0.99 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

function keep(text: string) {
  return text
    .replace(/\b(в|с|к|о|об|и|а|но|на|по|из|от|до|за|для|при|или)\s+/gi, "$1\u00a0")
    .replace(/60 минут/g, "60\u00a0минут")
    .replace(/4000 ₽/g, "4000\u00a0₽")
    .replace(/клинический психолог/gi, (match) => match.replace(" ", "\u00a0"))
    .replace(/личная терапия/gi, (match) => match.replace(" ", "\u00a0"))
    .replace(/личной терапии/gi, (match) => match.replace(" ", "\u00a0"))
    .replace(/психическое здоровье/gi, (match) => match.replace(" ", "\u00a0"))
    .replace(/когнитивно-поведенческая терапия/gi, (match) => match.replace(" ", "\u00a0"));
}

function NoBreak({ children }: { children: React.ReactNode }) {
  return <span className="nowrap">{children}</span>;
}

function FadeIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-90px" }}
      variants={reveal}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Progress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return <motion.div className="reading-progress" style={{ scaleX }} />;
}

function CTA({
  variant = "primary",
  label = "Записаться",
}: {
  variant?: "primary" | "secondary" | "quiet";
  label?: string;
}) {
  return (
    <a className={`button ${variant}`} href="#contacts">
      {label} <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="В начало">
        ВЛ
      </a>
      <nav aria-label="Основная навигация">
        <a href="#requests">Запросы</a>
        <a href="#about">Обо мне</a>
        <a href="#format">Формат</a>
        <a href="#library">Библиотека</a>
        <a href="#price">Стоимость</a>
        <a href="#contacts">Контакты</a>
      </nav>
      <a className="header-cta" href="#contacts">
        Записаться <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-topline">
        <span>Варвара Лузан</span>
        <a href={links.telegram} target="_blank" rel="noreferrer">
          TG: @barbarakaracharovaa
        </a>
      </div>
      <div className="hero-layout">
        <FadeIn className="hero-copy">
          <div className="hero-cloud" aria-hidden="true" />
          <h1>
            Варя
            <br />
            клинический
            <br />
            психолог
          </h1>
          <p className="lead">
            Помогаю не стать другим
            <br />
            человеком, а лучше понять того,
            <br />
            кем вы уже являетесь.
          </p>
          <div className="actions">
            <CTA />
            <a className="button secondary" href={links.telegram} target="_blank" rel="noreferrer">
              Telegram <MessageCircle size={18} aria-hidden="true" />
            </a>
          </div>
        </FadeIn>
        <FadeIn className="hero-portrait">
          <div className="hero-photo-frame">
            <img src="/images/varia-hero-cinematic.jpg" alt="Варвара Лузан" className="hero-photo" />
            <p className="portrait-caption">
              {keep("Я знаю многие переживания не только как специалист, но\u00a0и\u00a0как человек.")}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Requests() {
  return (
    <section id="requests" className="section requests-section">
      <FadeIn className="section-heading split-heading">
        <span className="eyebrow">С чем можно прийти</span>
        <h2>За диагнозом всегда остается человек</h2>
      </FadeIn>
      <div className="request-grid compact-grid">
        {requests.map((item, index) => (
          <FadeIn className="request-card" key={item.title}>
            <span className="row-number">{String(index + 1).padStart(2, "0")}</span>
            <h3>
              {item.title === "«Со мной что-то не так»" ? (
                <>
                  «Со мной что-то
                  <br />
                  не так»
                </>
              ) : (
                item.title
              )}
            </h3>
            <p>{keep(item.text)}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="philosophy-section" aria-label="Главная мысль сайта">
      <FadeIn className="philosophy-inner">
        <span className="eyebrow">Главная мысль</span>
        <blockquote>
          <strong>Некоторые вещи вообще не нужно чинить.</strong>
          <span>
            Какие-то части себя нужно понимать, какие-то — принимать, какие-то —
            учиться учитывать, а какие-то вообще оказываются не поломкой,{" "}
            <span className="quote-tail">
              <span className="keep-together">а обычным</span> человеческим опытом.
            </span>
          </span>
        </blockquote>
      </FadeIn>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about-section">
      <FadeIn className="about-photo-wrap">
        <img src="/images/varia-street.jpg" alt="Варвара Лузан на улице" className="about-photo" />
      </FadeIn>
      <FadeIn className="about-copy">
        <span className="eyebrow">Обо мне</span>
        <h2>Я — Варя</h2>
        <p>
          Клинический психолог, мама двоих детей, человек{" "}
          <NoBreak>с непростым прошлым и длительным</NoBreak> опытом личной терапии.
        </p>
        <p>
          Я открыто говорю о жизни с БАР и ПРЛ не потому, что строю вокруг этого
          идентичность. Это часть моего профессионального{" "}
          <NoBreak>пути и человеческого опыта,</NoBreak> который помогает мне быть
          внимательной к чужой боли без романтизации диагнозов.
        </p>
        <p className="soft-note">
          {keep("В работе для меня важны ясность, бережность, честность и уважение к вашим границам.")}
        </p>
        <div className="about-actions">
          <CTA variant="quiet" label="Записаться на первую встречу" />
          <a className="text-link" href={links.telegram} target="_blank" rel="noreferrer">
            Читать Telegram <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </FadeIn>
    </section>
  );
}

function Format() {
  return (
    <section id="format" className="section format-section">
      <FadeIn className="format-intro">
        <span className="eyebrow">Формат работы</span>
        <h2>Долгосрочная онлайн-терапия в КПТ-подходе</h2>
        <p>
          {keep(
            "Я использую методы ДБТ и ACT, когда нужно глубже работать с эмоциями, ценностями, внутренними конфликтами и острыми состояниями.",
          )}
        </p>
      </FadeIn>
      <div className="format-layout">
        <div className="format-copy">
          {principles.map(([title, text]) => (
            <FadeIn className="principle-line" key={title}>
              <span className="note-mark" aria-hidden="true" />
              <div>
                <h3>{title}</h3>
                <p>{keep(text)}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn className="format-aside">
          <span>
            В терапии мы
            <br />
            не ищем один
            <br />
            быстрый ответ.
          </span>
          <p>{keep("Мы постепенно замечаем повторяющиеся реакции и собираем способы жить устойчивее.")}</p>
          <CTA variant="secondary" label="Обсудить формат" />
        </FadeIn>
      </div>
    </section>
  );
}

function FirstMeeting() {
  return (
    <section className="section first-meeting">
      <FadeIn className="section-heading narrow">
        <span className="eyebrow">Первая встреча</span>
        <h2>Как проходит начало работы</h2>
      </FadeIn>
      <div className="meeting-grid">
        {firstMeeting.map((item, index) => (
          <FadeIn className="meeting-card" key={item.title}>
            <span className="timeline-number">{String(index + 1).padStart(2, "0")}</span>
            <h3>
              {item.title === "Договариваемся о процессе" ? (
                <>
                  Договариваемся <NoBreak>о процессе</NoBreak>
                </>
              ) : (
                item.title
              )}
            </h3>
            <p>{keep(item.text)}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Learning() {
  return (
    <section className="section learning-section">
      <FadeIn className="section-heading editorial-heading">
        <span className="eyebrow">На что я опираюсь</span>
        <h2>На что я опираюсь в работе</h2>
        <p>
          {keep(
            "За моей работой стоят образование, клиническая подготовка, супервизии, личная терапия и постоянное развитие.",
          )}
        </p>
      </FadeIn>
      <div className="learning-layout">
        <div className="learning-list">
          {learning.map((item) => (
            <FadeIn className="learning-item" key={item.title}>
              <BookOpen size={20} aria-hidden="true" />
              <div>
                <h3>{item.title}</h3>
                <p>{keep(item.text)}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn className="document-card">
          <div className="document-stack" aria-hidden="true">
            <img src="/docs/akpp.jpg" alt="" loading="lazy" />
            <img src="/docs/akpp.jpg" alt="" loading="lazy" />
            <img src="/docs/akpp.jpg" alt="" loading="lazy" />
          </div>
          <div className="document-copy">
            <span>Документы</span>
            <h3>Дипломы и сертификаты</h3>
          </div>
          <a href={links.docs} target="_blank" rel="noreferrer">
            Открыть документы <FileText size={18} aria-hidden="true" />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

function Library() {
  return (
    <section id="library" className="section library-section">
      <FadeIn className="section-heading split-heading">
        <span className="eyebrow">Библиотека</span>
        <h2>
          Тексты, в которых можно
          <br />
          встретиться с собой
        </h2>
      </FadeIn>
      <div className="library-grid">
        {library.map((post) => (
          <FadeIn className="library-card" key={post.href}>
            <span>Telegram</span>
            <h3>{post.title}</h3>
            <p>
              {post.title === "Почему ремиссия может пугать" ? (
                <>
                  Про потерю привычной версии себя <NoBreak>и необходимость</NoBreak>{" "}
                  строить идентичность не вокруг боли.
                </>
              ) : (
                keep(post.text)
              )}
            </p>
            <a href={post.href} target="_blank" rel="noreferrer">
              Читать <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Price() {
  return (
    <section id="price" className="section price-section">
      <FadeIn className="price-card">
        <div>
          <span className="eyebrow">Стоимость</span>
          <h2>Онлайн-консультация</h2>
          <p>{keep("60 минут. После заявки я свяжусь с вами, чтобы согласовать время и формат первой встречи.")}</p>
        </div>
        <div className="price-value">4000&nbsp;₽</div>
        <CTA />
      </FadeIn>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq">
      <FadeIn className="section-heading narrow">
        <span className="eyebrow">FAQ</span>
        <h2>Перед первой встречей</h2>
      </FadeIn>
      <div className="faq-list">
        {faq.map((item, index) => (
          <FadeIn className="faq-item" key={item.question}>
            <button
              type="button"
              onClick={() => setOpen(open === index ? -1 : index)}
              aria-expanded={open === index}
            >
              <span>{item.question}</span>
              <ChevronDown className={open === index ? "rotated" : ""} size={20} />
            </button>
            {open === index && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                {keep(item.answer)}
              </motion.p>
            )}
          </FadeIn>
        ))}
      </div>
      <FadeIn className="section-cta">
        <CTA variant="quiet" label="Записаться на встречу" />
      </FadeIn>
    </section>
  );
}

function Contacts() {
  const [form, setForm] = useState<BookingFormState>(emptyBookingForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const updateTextField = (
    field: Exclude<keyof BookingFormState, "agreePersonalData" | "agreeMailing">,
    value: string,
  ) => {
    if (status !== "idle") {
      setStatus("idle");
    }
    setForm((current) => ({ ...current, [field]: value }));
  };

  const updateConsent = (field: "agreePersonalData" | "agreeMailing", value: boolean) => {
    if (status !== "idle") {
      setStatus("idle");
    }
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.agreePersonalData) {
      setStatus("error");
      return;
    }

    const data = new FormData();
    data.append("entry.1439284067", form.name);
    data.append("entry.1295082185", form.age);
    data.append("entry.736478988", form.request);
    data.append("entry.667097387", form.therapyExperience);
    data.append("entry.593525964", form.therapyApproach);
    data.append("entry.2097076034", form.currentTherapy);
    data.append(
      "entry.170392065",
      `${form.expectations}\n\nСогласие на обработку ПДн: да\nСогласие на информационные сообщения: ${
        form.agreeMailing ? "да" : "нет"
      }`,
    );
    data.append("entry.532589034", form.contact);

    setStatus("sending");

    try {
      await fetch(links.formPost, {
        method: "POST",
        mode: "no-cors",
        body: data,
      });
      setStatus("sent");
      setForm(emptyBookingForm);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contacts" className="section contacts">
      <FadeIn className="contact-copy">
        <span className="eyebrow">Контакты</span>
        <h2>Если вам близок мой подход</h2>
        <p>
          {keep(
            "Оставьте заявку. Я свяжусь с вами, чтобы согласовать удобное время, ответить на вопросы и договориться о первой встрече.",
          )}
        </p>
        <div className="contact-links">
          <a href={links.telegram} target="_blank" rel="noreferrer">
            Telegram <MessageCircle size={18} />
          </a>
          <a href={links.instagram} target="_blank" rel="noreferrer">
            Instagram* <Instagram size={18} />
          </a>
        </div>
      </FadeIn>
      <FadeIn className="contact-form-card">
        <form className="booking-form" onSubmit={submitForm}>
          <div className="form-row two-columns">
            <label>
              <span>Ваше имя</span>
              <input
                required
                value={form.name}
                onChange={(event) => updateTextField("name", event.target.value)}
                autoComplete="name"
              />
            </label>
            <label>
              <span>Сколько вам лет?</span>
              <input
                required
                value={form.age}
                onChange={(event) => updateTextField("age", event.target.value)}
                inputMode="numeric"
              />
            </label>
          </div>
          <label>
            <span>Способ связи с вами</span>
            <input
              required
              value={form.contact}
              onChange={(event) => updateTextField("contact", event.target.value)}
              placeholder="Telegram, телефон или email"
              autoComplete="email"
            />
          </label>
          <label>
            <span>Какой у вас запрос?</span>
            <textarea
              required
              value={form.request}
              onChange={(event) => updateTextField("request", event.target.value)}
              rows={3}
            />
          </label>
          <div className="form-row two-columns">
            <label>
              <span>Был ли опыт терапии?</span>
              <input
                value={form.therapyExperience}
                onChange={(event) => updateTextField("therapyExperience", event.target.value)}
              />
            </label>
            <label>
              <span>Если да, какой подход?</span>
              <input
                value={form.therapyApproach}
                onChange={(event) => updateTextField("therapyApproach", event.target.value)}
              />
            </label>
          </div>
          <label>
            <span>На данный момент вы находитесь в терапии?</span>
            <input
              required
              value={form.currentTherapy}
              onChange={(event) => updateTextField("currentTherapy", event.target.value)}
            />
          </label>
          <label>
            <span>Что вы ждете от наших сессий?</span>
            <textarea
              required
              value={form.expectations}
              onChange={(event) => updateTextField("expectations", event.target.value)}
              rows={3}
            />
          </label>
          <label className="consent-line">
            <input
              required
              type="checkbox"
              checked={form.agreePersonalData}
              onChange={(event) => updateConsent("agreePersonalData", event.target.checked)}
            />
            <span>
              Я согласен(на) с{" "}
              <a href={links.privacy} target="_blank" rel="noreferrer">
                политикой обработки ПДн
              </a>{" "}
              и даю{" "}
              <a href={links.personalDataConsent} target="_blank" rel="noreferrer">
                согласие на обработку ПДн
              </a>
              .
            </span>
          </label>
          <label className="consent-line">
            <input
              type="checkbox"
              checked={form.agreeMailing}
              onChange={(event) => updateConsent("agreeMailing", event.target.checked)}
            />
            <span>
              Я согласен(на) получать информационные и организационные сообщения.{" "}
              <a href={links.mailingConsent} target="_blank" rel="noreferrer">
                Подробнее
              </a>
              .
            </span>
          </label>
          <button className="button primary form-submit" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Отправляю..." : "Оставить заявку"} <ArrowUpRight size={18} />
          </button>
          {status === "sent" && <p className="form-status">Заявка отправлена. Я свяжусь с вами в ближайшее время.</p>}
          {status === "error" && (
            <p className="form-status error">Проверьте согласие на обработку данных и попробуйте еще раз.</p>
          )}
        </form>
      </FadeIn>
    </section>
  );
}

function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(localStorage.getItem("cookie-consent") !== "accepted");
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <aside className="cookie-banner" aria-label="Согласие на использование cookies">
      <p>
        {keep("Сайт использует cookies, чтобы корректно работать и запоминать ваше согласие. Продолжая пользоваться сайтом, вы соглашаетесь с использованием cookies.")}
      </p>
      <div>
        <a href={links.cookies} target="_blank" rel="noreferrer">
          Подробнее
        </a>
        <button
          type="button"
          onClick={() => {
            localStorage.setItem("cookie-consent", "accepted");
            setVisible(false);
          }}
        >
          Принять
        </button>
      </div>
    </aside>
  );
}

function JsonLd() {
  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": ["Person", "Psychologist"],
          name: "Варвара Лузан",
          alternateName: "Варя",
          jobTitle: "Клинический психолог",
          image: "/images/varia-hero-cinematic.jpg",
          url: links.instagram,
          sameAs: [links.instagram, links.telegram],
          knowsAbout: ["КПТ", "ДБТ", "ACT", "ПРЛ", "БАР", "КПТСР", "СДВГ"],
          memberOf: "Ассоциация КПТ терапевтов",
        },
        {
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        },
      ],
    }),
    [],
  );
  return <script type="application/ld+json">{JSON.stringify(schema)}</script>;
}

function Footer() {
  return (
    <footer>
      <div className="source-notes">
        <p>
          {keep("Услуги носят консультативный характер, не являются медицинской деятельностью и не заменяют обращения к врачу.")}
        </p>
        <p>Сайт предназначен для лиц старше 18 лет (18+).</p>
        <p>
          * Instagram принадлежит компании Meta Platforms Inc., деятельность которой
          признана экстремистской и запрещена в РФ.
        </p>
        <span className="legal-links">
          <a href={links.offer}>Договор-оферта</a>
          <a href={links.privacy}>Политика обработки ПДн</a>
          <a href={links.personalDataConsent}>Согласие на обработку ПДн</a>
          <a href={links.mailingConsent}>Согласие на рассылку</a>
          <a href={links.cookies}>Cookies</a>
        </span>
      </div>
      <span>© {new Date().getFullYear()} Варвара Лузан</span>
    </footer>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <>
      <JsonLd />
      <Progress />
      <Header />
      <main>
        <Hero />
        <Requests />
        <Philosophy />
        <About />
        <Format />
        <FirstMeeting />
        <Learning />
        <Library />
        <Price />
        <FAQ />
        <Contacts />
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
