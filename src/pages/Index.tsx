import { useState, useEffect, useRef } from "react";

const REGIONS = [
  {
    id: "north",
    name: "Север",
    label: "NORD",
    color: "#4A90B8",
    x: 290,
    y: 95,
    specialty: "Шины и сервис",
    description: "Северная Африка формирует сцепление системы — производство шин, сервисная инфраструктура и точка входа в средиземноморские рынки.",
    symbol: "Кольца-протектор",
  },
  {
    id: "center",
    name: "Центр",
    label: "CENTRE",
    color: "#C9933A",
    x: 310,
    y: 230,
    specialty: "Моторы и сборка",
    description: "Центральная Африка — сердце системы. Здесь производятся двигатели, цилиндры, коленвалы и финальная сборка автомобилей бренда.",
    symbol: "Блок-цилиндр с коленвалом",
  },
  {
    id: "west",
    name: "Запад",
    label: "OUEST",
    color: "#7CB87C",
    x: 175,
    y: 210,
    specialty: "Кузова и двери",
    description: "Западная Африка отвечает за каркас и облик автомобиля — производство кузовов, дверей и внешних панелей для всей сети.",
    symbol: "Контур кузова",
  },
  {
    id: "east",
    name: "Восток",
    label: "EST",
    color: "#B87C4A",
    x: 400,
    y: 235,
    specialty: "Локальные адаптации",
    description: "Восточная Африка — модульный узел гибкости. Здесь создаются локальные адаптации, электронные модули и системы подключений.",
    symbol: "Модуль с разъёмами",
  },
  {
    id: "south",
    name: "Юг",
    label: "SUD",
    color: "#A04A4A",
    x: 310,
    y: 365,
    specialty: "Продажи и рынки",
    description: "Южная Африка — финальная точка маршрута и выход на международные рынки. Стрелы ускорения символизируют дистрибуцию и устремление.",
    symbol: "Стрелы-ускорители",
  },
];

const PARTNERS = [
  {
    name: "Африканский банк развития",
    abbr: "AfDB",
    color: "#C9933A",
    flag: "🌍",
    role: "Основной континентальный институт",
    desc: "Финансирование инфраструктурных и производственных проектов на континенте. Приоритетный партнёр для запуска региональных узлов.",
  },
  {
    name: "Банки России",
    abbr: "RU",
    color: "#4A90B8",
    flag: "🇷🇺",
    role: "Промышленное финансирование",
    desc: "Финансирование трансфера технологий, поставок оборудования и партнёрских программ в рамках российско-африканского сотрудничества.",
  },
  {
    name: "Исламские банки",
    abbr: "IB",
    color: "#7CB87C",
    flag: "☪️",
    role: "Исламское финансирование",
    desc: "Структуры без процентного финансирования (мурабаха, иджара) для партнёров в Северной и Западной Африке.",
  },
  {
    name: "Международный валютный фонд",
    abbr: "IMF",
    color: "#9B7EC8",
    flag: "🏛️",
    role: "Макроэкономическая поддержка",
    desc: "Программы поддержки индустриализации и укрепления платёжного баланса стран-участниц производственной сети.",
  },
  {
    name: "Всемирный банк",
    abbr: "WB",
    color: "#B87C4A",
    flag: "🌐",
    role: "Развитие и инфраструктура",
    desc: "Гранты и кредиты на развитие производственной инфраструктуры, обучение кадров и устойчивое промышленное развитие.",
  },
  {
    name: "Центральные банки Африки",
    abbr: "CB",
    color: "#A04A4A",
    flag: "🏦",
    role: "Регуляторная база",
    desc: "Координация валютной политики, лицензирование и регуляторное сопровождение межрегиональных производственных расчётов.",
  },
];

const CLIENTS = [
  {
    ring: "core",
    label: "Ядро",
    color: "#C9933A",
    r: 70,
    segments: [
      { icon: "🏭", title: "Тяжёлая индустрия", desc: "Горнодобывающие, металлургические и энергетические предприятия" },
      { icon: "🚛", title: "Транспортировка", desc: "Логистические компании, автопарки, грузоперевозчики" },
    ],
  },
  {
    ring: "mid",
    label: "Средний круг",
    color: "#7CB87C",
    r: 130,
    segments: [
      { icon: "🏗️", title: "Лёгкая индустрия", desc: "Производственные и перерабатывающие предприятия" },
      { icon: "🏢", title: "Крупный бизнес", desc: "Корпорации и холдинги, нуждающиеся в автопарке" },
      { icon: "🏬", title: "Средний бизнес", desc: "Региональные компании и дистрибьюторские сети" },
    ],
  },
  {
    ring: "outer",
    label: "Внешний круг",
    color: "#4A90B8",
    r: 185,
    segments: [
      { icon: "🏛️", title: "Администрация", desc: "Государственные структуры, муниципалитеты, ведомства" },
      { icon: "🤝", title: "Малый бизнес", desc: "Предприниматели, такси, частные перевозчики" },
      { icon: "🌍", title: "Иностранные агенты", desc: "Международные партнёры и представители по регионам" },
    ],
  },
];

const VALUES = [
  { title: "Местные корни", desc: "Каждый узел строится на существующих навыках и мастерских региона" },
  { title: "Единый стандарт", desc: "Общие технические требования и контроль качества через всю цепочку" },
  { title: "Устойчивость", desc: "Локальное производство снижает зависимость от импорта и укрепляет экономику" },
  { title: "Общий голос", desc: "Единый бренд для международных рынков с региональной идентичностью" },
];

const ROADMAP = [
  {
    period: "2025",
    phase: "Концепция",
    status: "current",
    items: ["Формирование идеи бренда", "Разработка архитектуры цепочки ценности", "Пять региональных логотипов"],
  },
  {
    period: "2025–2027",
    phase: "Анализ и развитие",
    status: "active",
    items: ["Анализ рынка и партнёрских возможностей", "Поиск производственных партнёров", "Разработка стандартов качества", "Пилотные соглашения"],
  },
  {
    period: "2026–2027",
    phase: "Кадры",
    status: "future",
    items: [
      "Идентификация инженеров через биржевые центры",
      "Привлечение диаспоры и иностранных специалистов",
      "Интеграция местных инженерных кадров",
      "Формирование технических команд по регионам",
    ],
  },
  {
    period: "2026–2028",
    phase: "Партнёрства",
    status: "future",
    items: [
      "Поиск и идентификация партнёров из РФ",
      "Привлечение партнёров из других заинтересованных стран",
      "Межгосударственные производственные соглашения",
      "Трансфер технологий и компетенций",
    ],
  },
  {
    period: "2028–2035",
    phase: "Производство",
    status: "future",
    items: [
      "Запуск линейки грузовых автомобилей",
      "Запуск линейки пассажирских автомобилей",
      "Запуск линейки престижных автомобилей",
      "5 моделей по каждой из 5 марок регионов",
      "Полный охват континентального рынка",
    ],
  },
];

function AfricaMap({ onRegionClick, activeRegion }: { onRegionClick: (id: string) => void; activeRegion: string | null }) {
  return (
    <svg viewBox="0 50 500 450" className="w-full max-w-lg mx-auto" style={{ filter: "drop-shadow(0 0 40px rgba(201,147,58,0.08))" }}>
      <path
        d="M220,60 L270,55 L310,58 L345,62 L370,70 L385,85 L395,100 L398,120 L395,140 L400,155 L410,165 L418,185 L420,205 L415,225 L418,245 L415,265 L410,285 L405,305 L398,320 L390,335 L378,350 L365,365 L348,378 L330,390 L315,398 L300,405 L288,408 L275,407 L262,402 L248,392 L235,380 L220,365 L208,350 L198,332 L190,312 L185,290 L182,268 L180,248 L178,228 L175,210 L170,192 L165,175 L160,158 L158,140 L160,122 L165,105 L172,90 L182,75 L195,65 Z"
        fill="rgba(201,147,58,0.06)"
        stroke="rgba(201,147,58,0.25)"
        strokeWidth="1.5"
      />
      <g stroke="rgba(201,147,58,0.2)" strokeWidth="1" strokeDasharray="4 4">
        <line x1="290" y1="95" x2="310" y2="230" />
        <line x1="310" y1="230" x2="175" y2="210" />
        <line x1="310" y1="230" x2="400" y2="235" />
        <line x1="310" y1="230" x2="310" y2="365" />
        <line x1="175" y1="210" x2="310" y2="365" />
        <line x1="400" y1="235" x2="310" y2="365" />
      </g>
      {REGIONS.map((region) => (
        <g key={region.id} onClick={() => onRegionClick(region.id)} style={{ cursor: "pointer" }}>
          {activeRegion === region.id && (
            <circle cx={region.x} cy={region.y} r="10" fill="none" stroke={region.color} strokeWidth="1" opacity="0" className="pulse-ring" />
          )}
          <circle
            cx={region.x} cy={region.y}
            r={activeRegion === region.id ? 20 : 16}
            fill={activeRegion === region.id ? `${region.color}30` : "rgba(26,20,16,0.8)"}
            stroke={region.color}
            strokeWidth={activeRegion === region.id ? 1.5 : 1}
            style={{ transition: "all 0.3s ease" }}
          />
          <circle cx={region.x} cy={region.y} r={activeRegion === region.id ? 5 : 4} fill={region.color} style={{ transition: "all 0.3s ease" }} />
          <text x={region.x} y={region.y - 26} textAnchor="middle" fill={activeRegion === region.id ? region.color : "#9C8E7E"} fontSize="8" fontFamily="IBM Plex Sans, sans-serif" letterSpacing="2" style={{ transition: "fill 0.3s ease" }}>
            {region.label}
          </text>
          <text x={region.x} y={region.y + 30} textAnchor="middle" fill={activeRegion === region.id ? "#EDE0CC" : "rgba(156,142,126,0.6)"} fontSize="7" fontFamily="IBM Plex Sans, sans-serif" style={{ transition: "fill 0.3s ease" }}>
            {region.specialty}
          </text>
        </g>
      ))}
    </svg>
  );
}

function LogoSymbol({ region }: { region: typeof REGIONS[0] }) {
  const size = 80;
  const cx = size / 2;
  const cy = size / 2;

  if (region.id === "north") return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-16 h-16">
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={cx} cy={cy} r={10 + i * 12} fill="none" stroke={region.color} strokeWidth="2" opacity={1 - i * 0.25} />
      ))}
      <circle cx={cx} cy={cy} r="4" fill={region.color} />
    </svg>
  );

  if (region.id === "center") return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-16 h-16">
      <rect x="20" y="25" width="40" height="28" rx="2" fill="none" stroke={region.color} strokeWidth="2" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={24 + i * 9} y="29" width="6" height="20" rx="1" fill={region.color} opacity="0.6" />
      ))}
      <line x1="28" y1="58" x2="28" y2="68" stroke={region.color} strokeWidth="2" />
      <line x1="52" y1="58" x2="52" y2="68" stroke={region.color} strokeWidth="2" />
      <ellipse cx="20" cy="65" rx="6" ry="4" fill="none" stroke={region.color} strokeWidth="1.5" />
      <ellipse cx="60" cy="65" rx="6" ry="4" fill="none" stroke={region.color} strokeWidth="1.5" />
    </svg>
  );

  if (region.id === "west") return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-16 h-16">
      <path d="M10,50 Q15,30 30,25 L55,25 Q70,25 70,38 L70,50 Q70,60 55,62 L25,62 Q10,60 10,50Z" fill="none" stroke={region.color} strokeWidth="2" />
      <line x1="38" y1="25" x2="38" y2="62" stroke={region.color} strokeWidth="1.5" opacity="0.5" />
      <rect x="28" y="28" width="10" height="20" rx="1" fill="none" stroke={region.color} strokeWidth="1" opacity="0.6" />
    </svg>
  );

  if (region.id === "east") return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-16 h-16">
      <rect x="15" y="20" width="50" height="40" rx="3" fill="none" stroke={region.color} strokeWidth="2" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx={27 + i * 14} cy="50" r="3" fill={region.color} />
          <line x1={27 + i * 14} y1="53" x2={27 + i * 14} y2="62" stroke={region.color} strokeWidth="1.5" />
        </g>
      ))}
      <line x1="25" y1="32" x2="55" y2="32" stroke={region.color} strokeWidth="1" opacity="0.5" />
      <line x1="25" y1="38" x2="45" y2="38" stroke={region.color} strokeWidth="1" opacity="0.5" />
    </svg>
  );

  if (region.id === "south") return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-16 h-16">
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${22 + i * 14},20 L${32 + i * 14},40 L${22 + i * 14},36 L${32 + i * 14},60`} fill="none" stroke={region.color} strokeWidth="2" opacity={1 - i * 0.2} strokeLinecap="round" />
      ))}
    </svg>
  );

  return null;
}

export default function Index() {
  const [activeRegion, setActiveRegion] = useState<string | null>("center");
  const [navScrolled, setNavScrolled] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const selectedRegion = REGIONS.find((r) => r.id === activeRegion);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* Nav */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navScrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : ""}`}>
        <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 relative">
              <div className="absolute inset-0 border border-gold rounded-full" />
              <div className="absolute inset-1.5 bg-gold rounded-full" />
            </div>
            <span className="font-display text-lg tracking-widest text-sand">AFRIC 4 <span className="text-gold">MATIC</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "О бренде", id: "about" },
              { label: "Партнёры", id: "partners" },
              { label: "Регионы", id: "regions" },
              { label: "Логотипы", id: "logos" },
              { label: "Клиентура", id: "clients" },
              { label: "Ценности", id: "values" },
              { label: "Маршрут", id: "roadmap" },
              { label: "Контакт", id: "contact" },
            ].map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="nav-link">{item.label}</button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url(https://cdn.poehali.dev/projects/dd8c2efa-c3a6-4b6b-81e1-68bd8c4e46fc/files/b44950b8-0b4c-4305-a3ae-a715738eda32.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 65% 40%, rgba(201,147,58,0.07) 0%, transparent 60%)" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-8 pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          <div>
            <p className="font-body text-xs tracking-[0.3em] text-gold mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              AFRICA · 2025–2030
            </p>
            <h1 className="font-display text-6xl lg:text-7xl font-light leading-tight text-sand mb-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              От местных<br />
              <em className="text-gold not-italic">мастерских</em><br />
              к холдингу
            </h1>
            <div className="h-px bg-gold mb-8 animate-fade-in" style={{ animationDelay: "0.6s", width: "80px" }} />
            <p className="font-body text-mist text-base leading-relaxed max-w-md animate-fade-in" style={{ animationDelay: "0.8s" }}>
              Единый бренд объединяет пять регионов Африки в цепочку производственной ценности — от шин Севера до рынков Юга.
            </p>
            <div className="flex gap-4 mt-10 animate-fade-in" style={{ animationDelay: "1s" }}>
              <button
                onClick={() => scrollTo("regions")}
                className="px-6 py-3 font-body text-xs tracking-widest uppercase border border-gold text-gold hover:bg-gold hover:text-charcoal transition-all duration-300"
              >
                Карта регионов
              </button>
              <button
                onClick={() => scrollTo("about")}
                className="px-6 py-3 font-body text-xs tracking-widest uppercase text-mist hover:text-sand transition-all duration-300"
              >
                О проекте →
              </button>
            </div>
          </div>
          <div className="hidden lg:block opacity-75 animate-fade-in-slow" style={{ animationDelay: "0.5s" }}>
            <AfricaMap onRegionClick={setActiveRegion} activeRegion={activeRegion} />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-12 bg-gold animate-pulse" />
          <span className="font-body text-xs tracking-widest text-gold">SCROLL</span>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-32 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="fade-up">
            <p className="font-body text-xs tracking-[0.3em] text-gold mb-6">О БРЕНДЕ</p>
            <h2 className="font-display text-5xl font-light text-sand mb-8 leading-tight">
              Пять узлов —<br /><em className="text-gold not-italic">одна система</em>
            </h2>
            <p className="font-body text-mist leading-relaxed mb-6">
              AfriMotor — это не просто автомобильный бренд. Это архитектура континентальной кооперации, где каждый регион Африки вносит уникальную производственную экспертизу.
            </p>
            <p className="font-body text-mist leading-relaxed">
              Пять логотипов отражают роль каждого узла: сцепление Севера, мощь Центра, каркас Запада, гибкость Востока и устремления Юга. Вместе — гармония континентальной инженерии.
            </p>
          </div>
          <div className="flex flex-col gap-0 fade-up" style={{ transitionDelay: "0.2s" }}>
            {[
              { num: "5", label: "Производственных регионов" },
              { num: "2027", label: "Год запуска первого узла" },
              { num: "2030", label: "Выход на международные рынки" },
            ].map((stat) => (
              <div key={stat.num} className="flex items-center gap-8 py-7 border-b border-border last:border-0">
                <span className="font-display text-5xl text-gold font-light w-24 shrink-0">{stat.num}</span>
                <span className="font-body text-mist text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="py-32 px-8 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="fade-up mb-16">
            <p className="font-body text-xs tracking-[0.3em] text-gold mb-4">ФИНАНСОВЫЕ ПАРТНЁРЫ</p>
            <h2 className="font-display text-5xl font-light text-sand">
              Институциональная<br /><em className="text-gold not-italic">основа проекта</em>
            </h2>
            <p className="font-body text-mist mt-6 max-w-xl leading-relaxed">
              Многоуровневое финансовое партнёрство охватывает континентальные, международные и региональные институты развития.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PARTNERS.map((p, i) => (
              <div
                key={p.abbr}
                className="logo-card p-6 fade-up"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded flex items-center justify-center text-xl shrink-0 font-display font-light"
                    style={{ background: `${p.color}15`, border: `1px solid ${p.color}30`, color: p.color }}
                  >
                    {p.flag}
                  </div>
                  <div>
                    <p className="font-body text-xs tracking-widest uppercase mb-1" style={{ color: p.color }}>{p.abbr}</p>
                    <p className="font-display text-lg text-sand leading-tight">{p.name}</p>
                  </div>
                </div>
                <div className="h-px mb-4" style={{ background: `${p.color}25` }} />
                <p className="font-body text-xs tracking-widest uppercase mb-2" style={{ color: p.color }}>{p.role}</p>
                <p className="font-body text-sm text-mist leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Combined bar */}
          <div className="mt-14 fade-up">
            <div className="flex h-1 rounded overflow-hidden">
              {PARTNERS.map((p) => (
                <div key={p.abbr} className="flex-1 transition-all duration-500" style={{ background: p.color }} />
              ))}
            </div>
            <div className="flex justify-between mt-3">
              {PARTNERS.map((p) => (
                <span key={p.abbr} className="font-body text-xs" style={{ color: p.color }}>{p.abbr}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Regions */}
      <section id="regions" className="py-32 px-8 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="fade-up mb-16">
            <p className="font-body text-xs tracking-[0.3em] text-gold mb-4">РЕГИОНЫ</p>
            <h2 className="font-display text-5xl font-light text-sand">
              Интерактивная карта<br /><em className="text-gold not-italic">производственных узлов</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Region selector */}
            <div className="lg:col-span-2 flex flex-col gap-2 fade-up">
              {REGIONS.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setActiveRegion(region.id)}
                  className={`text-left px-5 py-4 border transition-all duration-300 ${activeRegion === region.id ? "border-gold/40" : "border-border hover:border-gold/25"}`}
                  style={{ background: activeRegion === region.id ? `${region.color}10` : "transparent" }}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-2 h-2 rounded-full" style={{ background: region.color }} />
                    <span className="font-body text-xs tracking-widest uppercase" style={{ color: activeRegion === region.id ? region.color : "#9C8E7E" }}>
                      {region.label}
                    </span>
                  </div>
                  <div className="font-display text-xl text-sand pl-5">{region.name}</div>
                  <div className="font-body text-xs text-mist pl-5 mt-0.5">{region.specialty}</div>
                </button>
              ))}
            </div>

            {/* Map */}
            <div className="lg:col-span-2 fade-up" style={{ transitionDelay: "0.15s" }}>
              <AfricaMap onRegionClick={setActiveRegion} activeRegion={activeRegion} />
            </div>

            {/* Detail */}
            <div className="lg:col-span-1 fade-up" style={{ transitionDelay: "0.3s" }}>
              {selectedRegion && (
                <div className="sticky top-28 space-y-6">
                  <div>
                    <p className="font-body text-xs tracking-widest uppercase mb-2" style={{ color: selectedRegion.color }}>{selectedRegion.label}</p>
                    <h3 className="font-display text-3xl text-sand font-light">{selectedRegion.name}</h3>
                    <p className="font-body text-xs text-mist mt-1">{selectedRegion.specialty}</p>
                  </div>
                  <div className="h-px" style={{ background: selectedRegion.color, opacity: 0.3 }} />
                  <p className="font-body text-sm text-mist leading-relaxed">{selectedRegion.description}</p>
                  <div className="p-4 border" style={{ borderColor: `${selectedRegion.color}30`, background: `${selectedRegion.color}08` }}>
                    <p className="font-body text-xs tracking-widest text-mist mb-2 uppercase">Символ</p>
                    <p className="font-body text-sm text-sand">{selectedRegion.symbol}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Logos */}
      <section id="logos" className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="fade-up mb-16">
            <p className="font-body text-xs tracking-[0.3em] text-gold mb-4">ЛОГОТИПЫ</p>
            <h2 className="font-display text-5xl font-light text-sand">
              Пять знаков —<br /><em className="text-gold not-italic">одна цепочка</em>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {REGIONS.map((region, i) => (
              <div
                key={region.id}
                className="logo-card p-6 flex flex-col items-center text-center gap-4 fade-up cursor-pointer"
                style={{ transitionDelay: `${i * 0.1}s` }}
                onClick={() => { setActiveRegion(region.id); scrollTo("regions"); }}
              >
                <LogoSymbol region={region} />
                <div>
                  <p className="font-body text-xs tracking-widest mb-1" style={{ color: region.color }}>{region.label}</p>
                  <p className="font-display text-xl text-sand">{region.name}</p>
                  <p className="font-body text-xs text-mist mt-1">{region.specialty}</p>
                </div>
                <p className="text-xs font-body text-mist leading-snug opacity-70">{region.symbol}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 fade-up flex flex-col items-center gap-5">
            <div className="h-px w-16 bg-gold/40" />
            <p className="font-body text-xs tracking-widest text-mist uppercase">Общий знак бренда — линия маршрута</p>
            <div className="flex items-center gap-2">
              {REGIONS.map((region, i) => (
                <div key={region.id} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: region.color }} />
                  {i < REGIONS.length - 1 && (
                    <div className="w-8 h-px" style={{ background: `linear-gradient(to right, ${region.color}, ${REGIONS[i + 1].color})` }} />
                  )}
                </div>
              ))}
            </div>
            <p className="font-body text-xs text-mist max-w-sm text-center leading-relaxed">
              Линия соединяет все пять узлов, подчёркивая путь деталей к сборке и единство голоса бренда
            </p>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section id="clients" className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="fade-up mb-16">
            <p className="font-body text-xs tracking-[0.3em] text-gold mb-4">КЛИЕНТУРА</p>
            <h2 className="font-display text-5xl font-light text-sand">
              Концентрическая<br /><em className="text-gold not-italic">стратегия охвата</em>
            </h2>
            <p className="font-body text-mist mt-6 max-w-xl leading-relaxed">
              Заключение сделок с экономическими агентами во всех секторах — от тяжёлой индустрии и транспорта до администрации и малого бизнеса.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Concentric diagram */}
            <div className="fade-up flex items-center justify-center">
              <svg viewBox="0 0 400 400" className="w-full max-w-sm">
                {/* Outer ring */}
                <circle cx="200" cy="200" r="185" fill="rgba(74,144,184,0.04)" stroke="rgba(74,144,184,0.25)" strokeWidth="1" strokeDasharray="6 4" />
                {/* Mid ring */}
                <circle cx="200" cy="200" r="130" fill="rgba(124,184,124,0.05)" stroke="rgba(124,184,124,0.3)" strokeWidth="1" strokeDasharray="6 4" />
                {/* Core ring */}
                <circle cx="200" cy="200" r="70" fill="rgba(201,147,58,0.08)" stroke="rgba(201,147,58,0.5)" strokeWidth="1.5" />
                {/* Center dot */}
                <circle cx="200" cy="200" r="18" fill="rgba(201,147,58,0.2)" stroke="#C9933A" strokeWidth="2" />
                <text x="200" y="196" textAnchor="middle" fill="#C9933A" fontSize="9" fontFamily="IBM Plex Sans" letterSpacing="1">AFRIC 4</text>
                <text x="200" y="208" textAnchor="middle" fill="#C9933A" fontSize="9" fontFamily="IBM Plex Sans" letterSpacing="1">MATIC</text>

                {/* Core labels */}
                <text x="200" y="142" textAnchor="middle" fill="#C9933A" fontSize="8" fontFamily="IBM Plex Sans">🏭 Тяжёлая индустрия</text>
                <text x="200" y="256" textAnchor="middle" fill="#C9933A" fontSize="8" fontFamily="IBM Plex Sans">🚛 Транспортировка</text>

                {/* Mid ring labels */}
                <text x="100" y="178" textAnchor="middle" fill="#7CB87C" fontSize="8" fontFamily="IBM Plex Sans">🏗️ Лёгкая индустрия</text>
                <text x="300" y="178" textAnchor="middle" fill="#7CB87C" fontSize="8" fontFamily="IBM Plex Sans">🏢 Крупный бизнес</text>
                <text x="200" y="300" textAnchor="middle" fill="#7CB87C" fontSize="8" fontFamily="IBM Plex Sans">🏬 Средний бизнес</text>

                {/* Outer ring labels */}
                <text x="90" y="110" textAnchor="middle" fill="#4A90B8" fontSize="8" fontFamily="IBM Plex Sans">🏛️ Администрация</text>
                <text x="310" y="110" textAnchor="middle" fill="#4A90B8" fontSize="8" fontFamily="IBM Plex Sans">🤝 Малый бизнес</text>
                <text x="200" y="370" textAnchor="middle" fill="#4A90B8" fontSize="8" fontFamily="IBM Plex Sans">🌍 Иностранные агенты</text>

                {/* Ring labels */}
                <text x="16" y="200" textAnchor="middle" fill="rgba(201,147,58,0.5)" fontSize="7" fontFamily="IBM Plex Sans" transform="rotate(-90, 16, 200)">ЯДРО</text>
                <text x="72" y="200" textAnchor="middle" fill="rgba(124,184,124,0.5)" fontSize="7" fontFamily="IBM Plex Sans" transform="rotate(-90, 72, 200)">СРЕДНИЙ КРУГ</text>
                <text x="18" y="60" textAnchor="start" fill="rgba(74,144,184,0.5)" fontSize="7" fontFamily="IBM Plex Sans">ВНЕШНИЙ КРУГ</text>
              </svg>
            </div>

            {/* Segments list */}
            <div className="space-y-3 fade-up" style={{ transitionDelay: "0.2s" }}>
              {CLIENTS.map((ring) => (
                <div key={ring.ring}>
                  <p className="font-body text-xs tracking-widest uppercase mb-3 mt-6 first:mt-0" style={{ color: ring.color }}>
                    {ring.label}
                  </p>
                  {ring.segments.map((seg, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-4 border border-border hover:border-opacity-50 transition-all duration-300 mb-2"
                      style={{ borderLeftColor: ring.color, borderLeftWidth: "2px" }}
                    >
                      <span className="text-xl shrink-0 mt-0.5">{seg.icon}</span>
                      <div>
                        <p className="font-body text-sm text-sand font-medium">{seg.title}</p>
                        <p className="font-body text-xs text-mist mt-0.5 leading-relaxed">{seg.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              <div className="mt-8 p-5 border border-gold/20 bg-gold/5">
                <p className="font-body text-xs tracking-widest text-gold uppercase mb-2">CRM-стратегия</p>
                <p className="font-body text-sm text-mist leading-relaxed">
                  Концентрическая модель охвата: от ключевых индустриальных партнёров в ядре — к широкой сети агентов во внешнем круге. Каждый сегмент получает адаптированное коммерческое предложение.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="py-32 px-8 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="fade-up mb-16">
            <p className="font-body text-xs tracking-[0.3em] text-gold mb-4">ЦЕННОСТИ</p>
            <h2 className="font-display text-5xl font-light text-sand">
              История и<br /><em className="text-gold not-italic">принципы марки</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {VALUES.map((v, i) => (
              <div key={i} className="bg-card p-8 fade-up hover:bg-secondary/40 transition-colors duration-300" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="w-8 h-px bg-gold mb-6" />
                <h3 className="font-display text-2xl text-sand mb-4 leading-tight">{v.title}</h3>
                <p className="font-body text-sm text-mist leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="fade-up mb-16">
            <p className="font-body text-xs tracking-[0.3em] text-gold mb-4">ДОРОЖНАЯ КАРТА</p>
            <h2 className="font-display text-5xl font-light text-sand">
              Маршрут к<br /><em className="text-gold not-italic">2035 году</em>
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-16 pl-12">
              {ROADMAP.map((item, i) => {
                const dotColor = item.status === "current" ? "#C9933A" : item.status === "active" ? "#7CB87C" : "#4A90B8";
                return (
                  <div key={i} className="relative fade-up" style={{ transitionDelay: `${i * 0.15}s` }}>
                    <div className="absolute -left-[3.25rem] top-1.5 w-3 h-3 rounded-full border-2" style={{ borderColor: dotColor, background: item.status === "current" ? dotColor : "transparent" }} />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <p className="font-body text-xs tracking-widest mb-1" style={{ color: dotColor }}>
                          {item.status === "current" ? "СТАРТ" : item.status === "active" ? "В ПРОЦЕССЕ" : "ПЛАНИРУЕТСЯ"}
                        </p>
                        <p className="font-display text-3xl text-sand font-light">{item.period}</p>
                        <p className="font-body text-sm text-mist mt-1">{item.phase}</p>
                      </div>
                      <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {item.items.map((point, j) => (
                          <div key={j} className="flex items-start gap-3">
                            <div className="w-1 h-1 rounded-full bg-gold mt-2 shrink-0" />
                            <span className="font-body text-sm text-mist">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-8 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl fade-up">
            <p className="font-body text-xs tracking-[0.3em] text-gold mb-6">КОНТАКТ</p>
            <h2 className="font-display text-5xl font-light text-sand mb-8 leading-tight">
              Присоединиться<br />к <em className="text-gold not-italic">сети</em>
            </h2>
            <p className="font-body text-mist leading-relaxed mb-10">
              Ищем производственных партнёров, инвесторов и экспертов во всех регионах. Если вы разделяете видение континентальной автомобильной индустрии — свяжитесь с нами.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                { ph: "Ваше имя" },
                { ph: "Email" },
                { ph: "Организация" },
              ].map((f) => (
                <input key={f.ph} placeholder={f.ph} className="bg-background border border-border px-5 py-4 font-body text-sm text-sand placeholder:text-mist/50 focus:outline-none focus:border-gold/50 transition-colors" />
              ))}
              <select className="bg-background border border-border px-5 py-4 font-body text-sm text-mist focus:outline-none focus:border-gold/50 transition-colors">
                <option>Регион интереса</option>
                {REGIONS.map((r) => <option key={r.id}>{r.name} — {r.specialty}</option>)}
              </select>
              <textarea placeholder="Ваше предложение или вопрос" rows={3} className="sm:col-span-2 bg-background border border-border px-5 py-4 font-body text-sm text-sand placeholder:text-mist/50 focus:outline-none focus:border-gold/50 transition-colors resize-none" />
            </div>
            <button className="px-8 py-4 font-body text-xs tracking-widest uppercase bg-gold text-charcoal hover:bg-gold/90 transition-all duration-300 font-medium">
              Отправить запрос
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 relative">
              <div className="absolute inset-0 border border-gold rounded-full" />
              <div className="absolute inset-1 bg-gold rounded-full" />
            </div>
            <span className="font-display text-base tracking-widest text-sand">AFRIC 4 <span className="text-gold">MATIC</span></span>
          </div>
          <p className="font-body text-xs text-mist tracking-widest">AFRIC 4 MATIC · CONTINENTAL AUTOMOTIVE NETWORK · 2025–2035</p>
          <p className="font-body text-xs text-mist/50">От локальных инициатив к континентальной сети</p>
        </div>
      </footer>
    </div>
  );
}