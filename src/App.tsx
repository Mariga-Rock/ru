import { useState, useEffect, useRef, FormEvent } from 'react';
import {
  Layers,
  Users,
  FileSearch,
  ChevronRight,
  Linkedin,
  ArrowUpRight,
  CheckCircle,
  Menu,
  X,
  Briefcase,
  Target,
  TrendingUp,
  Boxes,
  Rocket,
  UsersRound,
  ArrowLeft,
  Check,
} from 'lucide-react';
import profilePic from './assets/1000018781.png';

type View = 'home' | 'case-studies';

type CaseStudy = {
  id: string;
  industry: string;
  icon: 'briefcase' | 'target' | 'trending';
  title: string;
  location: string;
  challenge: string;
  approach: string;
  result: string;
  details: {
    scope: string;
    duration: string;
    team: string;
    outcomes: string[];
  };
};

const caseStudies: CaseStudy[] = [
  {
    id: 'nsd',
    industry: 'Финтех',
    icon: 'briefcase',
    title: 'Национальный расчетный депозитарий',
    location: 'Москва, Россия',
    challenge:
      'Создать новый пользовательский интерфейс (UI) и пользовательский опыт (UX) для платформы государственного депозитария. Устаревший интерфейс не позволял масштабироваться, выглядел устаревшим и вынуждал операторов переключаться между пятью разрозненными системами для выполнения даже одной рабочей задачи.',
    approach:
      'Разработала модульную дизайн-систему с компонентами для визуализации данных в реальном времени. Объединила пять устаревших систем в единую UX-среду с общей библиотекой компонентов, единообразными паттернами взаимодействия и масштабируемой токен-архитектурой. Провела совместные воркшопы с дизайнерами и разработчиками для согласования целевой архитектуры со стейкхолдерами.',
    result:
      'Новая зонтичная дизайн-система, высокая масштабируемость, создание единого стиля для пяти программных продуктов.',
    details: {
      scope: 'Полный цикл редизайна UX/UI продукта + дизайн-система',
      duration: '48 месяцев',
      team: '1 дизайн-лид, 3 дизайнера, 3 фронтенд-инженера',
      outcomes: [
        'Пять устаревших систем объединены в единую UX-среду',
        'Библиотека переиспользуемых компонентов внедрена во всей линейке продуктов',
        'Онбординг новых операторов стал быстрее',
      ],
    },
  },
  {
    id: 'bostongene',
    industry: 'Биотех',
    icon: 'target',
    title: 'BostonGene',
    location: 'Москва, Россия',
    challenge:
      'Спроектировать UI и UX продукта с нуля для биотех-стартапа. Платформа должна была представлять сложные геномные и клинические данные двум принципиально разным ролям пользователей, не перегружая ни одну из них.',
    approach:
      'Создала информационную архитектуру, дашборды для данных и сложные элементы управления. Разработала карты пользовательских путей для двух ролей (исследователи и врачи), утвердила потоки работы со стейкхолдерами и заложила системный визуальный язык, способный расти вместе с продуктом.',
    result:
      'Стартап получил лёгкий, прозрачный и системный дизайн, который масштабируется. Для каждой роли созданы индивидуальные дашборды, команда может выпускать новые функции, опираясь на стабильную дизайн‑основу.',
    details: {
      scope: 'Разработка UX/UI продукта с нуля и создание дизайн-языка',
      duration: '14 месяцев',
      team: '3 дизайнера, 4 инженера',
      outcomes: [
        'Ролевые дашборды для исследователей и врачей',
        'Чёткая информационная архитектура для сложных данных анализа ДНК',
        'Системный и масштабируемый визуальный язык',
        'Ускоренный выпуск новых функций после запуска',
      ],
    },
  },
  {
    id: 'netcracker',
    industry: 'SaaS',
    icon: 'trending',
    title: 'B2B аналитическая панель',
    location: 'NetCracker, NEC Corporation',
    challenge:
      'Модернизировать UI зрелой B2B аналитической панели, сохранив все существующие функции. Продукт накопил множество функций, а пользователи привыкли к определённым рабочим процессам.',
    approach:
      'Провела полное исследование продукта и пользовательского опыта, составила карту всех существующих функций до внесения визуальных изменений. Затем выполнила полноценный редизайн, обновив визуальный слой и модель взаимодействия без потери функциональности.',
    result:
      'Новая версия продукта выглядит современно, сохраняет все унаследованные функции и стала значительно проще для освоения пользователями.',
    details: {
      scope: 'Полное UX-исследование + UI-редизайн',
      duration: '11 месяцев',
      team: '4 дизайнера, 6 инженеров',
      outcomes: [
        'Современный UI с сохранением всех существующих функций',
        'Документированная карта всех функций',
        'Улучшенная обучаемость для новых пользователей',
        'Фундамент для будущего расширения модулей',
      ],
    },
  },
];

const industryIcon = (icon: CaseStudy['icon']) => {
  switch (icon) {
    case 'briefcase':
      return Briefcase;
    case 'target':
      return Target;
    case 'trending':
      return TrendingUp;
  }
};

function App() {
  const [view, setView] = useState<View>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);

  const goHome = () => setView('home');
  const goToCaseStudies = () => setView('case-studies');

  const goToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };
  const goToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactClick = () => {
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [view]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://formspree.io/f/mbdnjwov', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Ошибка отправки. Пожалуйста, попробуйте снова.');
      }
    } catch (error) {
      alert('Ошибка соединения. Проверьте интернет.');
    }
  };

  if (view === 'case-studies') {
    return <CaseStudiesPage onBack={goHome} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <button onClick={goHome} className="text-left text-xl font-bold text-white">
              Мария Гурьянова
              <span className="block text-rose-500 text-sm font-normal">Дизайн‑лид</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={goToAbout} className="text-gray-300 hover:text-white transition-colors font-medium">
                Обо мне
              </button>
              <button onClick={goToServices} className="text-gray-300 hover:text-white transition-colors font-medium">
                Услуги
              </button>
              <button onClick={goToCaseStudies} className="text-gray-300 hover:text-white transition-colors font-medium">
                Кейсы
              </button>
              <button onClick={handleContactClick} className="text-gray-300 hover:text-white transition-colors font-medium">
                Контакты
              </button>
            </div>

            {/* Mobile menu button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-300">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  goToAbout();
                }}
                className="block w-full text-left py-2 text-gray-300 hover:text-white font-medium"
              >
                Обо мне
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  goToServices();
                }}
                className="block w-full text-left py-2 text-gray-300 hover:text-white font-medium"
              >
                Услуги
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  goToCaseStudies();
                }}
                className="block w-full text-left py-2 text-gray-300 hover:text-white font-medium"
              >
                Кейсы
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleContactClick();
                }}
                className="block w-full text-left py-2 text-gray-300 hover:text-white font-medium"
              >
                Контакты
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gray-50 pt-28 pb-12 lg:pt-24 lg:pb-10 text-left min-h-[60vh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-4 lg:px-8 w-full">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="max-w-4xl lg:col-span-9">
              <p className="text-rose-600 font-semibold tracking-wide uppercase mb-2 animate-on-scroll">Экспертиза в крупных проектах</p>
              <h1 className="text-4xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-3 animate-on-scroll">
                Мария Гурьянова
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 mb-6 leading-relaxed max-w-3xl font-bold animate-on-scroll">
                Дизайн‑лид для корпоративных B2B‑продуктов
              </p>
              <p className="text-xl lg:text-2xl text-gray-600 mb-6 leading-relaxed max-w-3xl animate-on-scroll">
                Дизайн‑системы, UX‑стратегия и менторство команд для масштабирования вашего продукта.
                <br />
                Опыт работы с крупными заказчиками — теперь для вашего бизнеса.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 animate-on-scroll">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl group"
                >
                  Заказать консультацию
                  <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <button
                  onClick={goToCaseStudies}
                  className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-900 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all"
                >
                  Смотреть кейсы
                </button>
              </div>
            </div>
            <div className="lg:col-span-3 mt-3 animate-on-scroll">
              <img src={profilePic} alt="Мария Гурьянова, дизайн-лид" className="w-full h-[300px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-sm font-semibold text-rose-600 uppercase tracking-wide mb-3 animate-on-scroll">Обо мне</h2>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 animate-on-scroll">
                Более 13 лет опыта в разработке корпоративных продуктов и управлении дизайн‑командами
              </h3>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed animate-on-scroll">
                <p>
                  Корпоративные дизайн‑системы и UX‑стратегия. Я помогаю масштабировать ваш продукт и команды быстрее, с меньшим количеством итераций. Гибкая система сотрудничества, без обязательств на полную ставку.
                </p>
                <p>
                  После 13+ лет проектирования сложных B2B‑систем для крупных зарубежных и российских компаний, я теперь сосредоточена на поддержке российских стартапов и растущих бизнесов в создании дизайн‑инфраструктуры мирового уровня: дизайн‑систем, библиотек компонентов и команд профессионалов, способных справляться с растущими вызовами.
                </p>
                <p>
                  Я соединяю дизайн и разработку, обучаю команды создавать продукты, сочетая качество и скорость. Системный подход, ориентированный на бизнес и адаптированный к уникальным вызовам российского рынка.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 animate-on-scroll">
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <Boxes className="w-10 h-10 text-rose-600 mb-3" />
                <div className="text-4xl lg:text-5xl font-bold text-rose-600 mb-2">3+</div>
                <div className="text-gray-500 font-medium">Создано дизайн‑систем</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <Rocket className="w-10 h-10 text-rose-600 mb-3" />
                <div className="text-4xl lg:text-5xl font-bold text-rose-600 mb-2">8</div>
                <div className="text-gray-500 font-medium">Выпущено продуктов</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <UsersRound className="w-10 h-10 text-rose-600 mb-3" />
                <div className="text-4xl lg:text-5xl font-bold text-rose-600 mb-2">5+</div>
                <div className="text-gray-500 font-medium">Возглавляла команды такого размера</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-sm font-semibold text-rose-600 uppercase tracking-wide mb-3 animate-on-scroll">Услуги</h2>
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 animate-on-scroll">Как я могу помочь вашему бизнесу</h3>
            <p className="text-gray-600 text-lg animate-on-scroll">Стратегическое дизайн‑лидерство под ваши потребности</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="group bg-gray-50 rounded-2xl p-6 lg:p-8 border border-gray-100 hover:border-rose-200 hover:shadow-xl transition-all duration-300 animate-on-scroll flex flex-col">
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-rose-600 transition-colors">
                <Layers className="w-7 h-7 text-rose-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Дизайн‑система как сервис</h4>
              <p className="text-gray-600 leading-relaxed mb-6">
                Аудит, создание и внедрение масштабируемой дизайн‑системы. Плотное взаимодействие с разработкой. Установите единый язык дизайна для всей линейки продуктов.
              </p>
              <div className="mt-auto">
                <p className="text-sm font-semibold text-gray-900 mb-3">Что вы получаете</p>
                <ul className="space-y-2">
                  {[
                    'Полный аудит текущего UI и использования компонентов',
                    'Токен‑ориентированная дизайн‑система в Figma',
                    'Документированные гайдлайны для дизайнеров и разработчиков',
                    'Сессии онбординга для слаженной работы команды',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="group bg-gray-50 rounded-2xl p-6 lg:p-8 border border-gray-100 hover:border-rose-200 hover:shadow-xl transition-all duration-300 animate-on-scroll flex flex-col">
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-rose-600 transition-colors">
                <Users className="w-7 h-7 text-rose-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Внештатный дизайн‑директор</h4>
              <p className="text-gray-600 leading-relaxed mb-6">
                Дизайн‑лидерство уровня enterprise. Я вхожу в роль вашего дизайн‑директора — провожу дизайн‑ревью, менторю команду, формирую продуктовый дизайн. Все это без необходимости оформления в штат.
              </p>
              <div className="mt-auto">
                <p className="text-sm font-semibold text-gray-900 mb-3">Что вы получаете</p>
                <ul className="space-y-2">
                  {[
                    'Еженедельные дизайн‑ревью и развитие интерфейса продукта',
                    'Менторство и планы роста для дизайнеров',
                    'Кросс-функциональное согласование с продуктом и разработкой',
                    'Рекомендации по найму и настройка дизайн‑процессов',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="group bg-gray-50 rounded-2xl p-6 lg:p-8 border border-gray-100 hover:border-rose-200 hover:shadow-xl transition-all duration-300 animate-on-scroll flex flex-col">
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-rose-600 transition-colors">
                <FileSearch className="w-7 h-7 text-rose-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">UX‑аудит и дорожная карта</h4>
              <p className="text-gray-600 leading-relaxed mb-6">
                Глубокий анализ вашего продукта. Я предоставляю приоритизированную дорожную карту для повышения удовлетворённости пользователей, снижения оттока, роста конверсии уменьшения количества ошибок при совершении олпераций. Вы получаете внятный план как на краткосрочную, так и на долгосрочную перспективу.
              </p>
              <div className="mt-auto">
                <p className="text-sm font-semibold text-gray-900 mb-3">Что вы получаете</p>
                <ul className="space-y-2">
                  {[
                    'Эвристическая оценка ключевых и вспомогательных пользовательских сценариев',
                    'Дорожная карта, согласованная с бизнес‑целями',
                    'Презентация для стейкхолдеров',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section (на главной) */}
      <section id="case-studies" className="py-14 lg:py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wide mb-3 animate-on-scroll">Кейсы</h2>
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 animate-on-scroll">Доказанные результаты в разных отраслях</h3>
            <p className="text-gray-300 text-lg animate-on-scroll">Избранные проекты</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study) => {
              const Icon = industryIcon(study.icon);
              return (
                <div
                  key={study.id}
                  className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-rose-500/50 transition-all animate-on-scroll flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-5 h-5 text-rose-400" />
                    <span className="text-sm text-rose-400 font-medium">{study.industry}</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-1">{study.title}</h4>
                  <p className="text-sm text-gray-400 mb-3">{study.location}</p>
                  <div className="space-y-3 text-sm flex-1">
                    <div>
                      <span className="text-gray-400 font-medium">Задача:</span>
                      <p className="text-gray-300 mt-1">{study.challenge}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 font-medium">Результат:</span>
                      <p className="text-gray-300 mt-1">{study.result}</p>
                    </div>
                  </div>
                  <button
                    onClick={goToCaseStudies}
                    className="inline-flex items-center text-rose-600 font-semibold hover:text-rose-700 transition-colors group/link mt-4"
                  >
                    Подробнее
                    <ChevronRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section / Footer */}
      <footer id="contact" className="py-14 lg:py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Info */}
            <div className="animate-on-scroll">
              <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wide mb-3">Контакты</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">Доступна для встреч в часовом поясе UTC+3 (Москва)</p>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Готовы вывести дизайн вашего продукта на новый уровень? Закажите бесплатную консультацию, чтобы обсудить ваши задачи и понять, подходим ли мы друг другу.
              </p>


              <div className="mt-10 pt-8 border-t border-gray-700">
                <p className="text-sm text-gray-400">Работаю с компаниями по всей России.</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-800/50 rounded-2xl p-6 lg:p-8 border border-gray-700 animate-on-scroll">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="w-16 h-16 text-rose-400 mb-4" />
                  <h4 className="text-xl font-semibold text-white mb-2">Сообщение отправлено!</h4>
                  <p className="text-gray-300">Я свяжусь с вами в течение 24–48 часов.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Имя</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                      placeholder="Ваш email"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Сообщение</label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors resize-none"
                      placeholder="Расскажите о вашем проекте..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-rose-600 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:bg-rose-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    Заказать консультацию
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
            <p>&copy; 2026 Мария Гурьянова — Дизайн-лид. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CaseStudiesPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <button onClick={onBack} className="text-left text-xl font-bold text-white">
              Мария Гурьянова
              <span className="block text-rose-500 text-sm font-normal">Дизайн‑директор</span>
            </button>
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-medium group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Назад на главную
            </button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="hero-gradient pt-28 pb-12 lg:pt-32 lg:pb-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <p className="text-rose-400 font-semibold tracking-wide uppercase mb-2 animate-on-scroll">Кейсы</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 animate-on-scroll">Доказанные результаты в разных отраслях</h1>
          <p className="text-xl text-gray-300 max-w-3xl animate-on-scroll">
            Избранные проекты для клиентов из финтеха, биотеха и SaaS с описанием задачи, подхода и измеримых результатов.
          </p>
        </div>
      </section>

      {/* Case Study Details */}
      <section className="py-14 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {caseStudies.map((study) => {
            const Icon = industryIcon(study.icon);
            return (
              <article
                key={study.id}
                className="bg-white rounded-2xl p-6 lg:p-10 shadow-lg border border-gray-100 animate-on-scroll"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-rose-600" />
                  </div>
                  <span className="text-sm text-rose-600 font-medium">{study.industry}</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{study.title}</h2>
                <p className="text-gray-500 mb-6">{study.location}</p>

                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Объём</p>
                    <p className="text-sm font-medium text-gray-900">{study.details.scope}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Длительность</p>
                    <p className="text-sm font-medium text-gray-900">{study.details.duration}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Команда</p>
                    <p className="text-sm font-medium text-gray-900">{study.details.team}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Задача</h3>
                    <p className="text-gray-600 leading-relaxed">{study.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Подход</h3>
                    <p className="text-gray-600 leading-relaxed">{study.approach}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Результат</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{study.result}</p>
                    <ul className="space-y-2">
                      {study.details.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-2 text-gray-700">
                          <Check className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 lg:py-20 bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 animate-on-scroll">Хотите такие же результаты?</h2>
          <p className="text-gray-300 text-lg mb-8 animate-on-scroll">Закажите бесплатную консультацию, чтобы обсудить ваш продукт и возможные форматы сотрудничества.</p>
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-rose-700 transition-all shadow-lg hover:shadow-xl group"
          >
            Связаться
            <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
