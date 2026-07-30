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
    industry: 'Fintech',
    icon: 'briefcase',
    title: 'National State Depositary',
    location: 'Russia',
    challenge:
      'Create a new product UI and UX for a state depositary platform. The legacy UI could not scale, looked outdated, and forced operators to jump across five disconnected systems to complete a single workflow.',
    approach:
      'Built a modular design system with real-time data visualization components. Unified five legacy systems into a single UX system with a shared component library, consistent interaction patterns, and a scalable token architecture. Ran collaborative design-engineering workshops to align stakeholders on the target architecture.',
    result:
      '60% reduction in UI bugs, a new umbrella design system, strong scalability, and a light, top-notch UI. Operators now complete core workflows in one system instead of five.',
    details: {
      scope: 'End-to-end product UX/UI redesign + design system',
      duration: '14 months',
      team: '5 designers, 3 frontend engineers',
      outcomes: [
        '60% reduction in UI-related defects',
        '5 legacy systems unified into 1 UX system',
        'Reusable component library adopted across product suite',
        'Faster onboarding for new operators',
      ],
    },
  },
  {
    id: 'bostongene',
    industry: 'Biotech',
    icon: 'target',
    title: 'BostonGene',
    location: 'United States',
    challenge:
      'Design the product UI and UX from scratch for a biotech startup. The platform needed to present complex genomic and clinical data to two very different user roles without overwhelming either.',
    approach:
      'Designed the information architecture, data dashboards, and complex controls. Created customer journey maps for two user roles (researchers and clinicians), validated flows with stakeholders, and established a systematic visual language that could grow with the product.',
    result:
      'The startup now has a light, clear, and systematic design that scales. Both user roles get role-tailored dashboards, and the team can ship new features against a stable design foundation.',
    details: {
      scope: 'Product UX/UI from scratch + design language',
      duration: '9 months',
      team: '3 designers, 4 engineers',
      outcomes: [
        'Role-based dashboards for researchers and clinicians',
        'Clear information architecture for complex genomic data',
        'Systematic, scalable visual language',
        'Faster feature delivery post-launch',
      ],
    },
  },
  {
    id: 'netcracker',
    industry: 'SaaS',
    icon: 'trending',
    title: 'B2B Analytics Dashboard',
    location: 'NetCracker, NEC Corporation',
    challenge:
      'Redesign the UI of a mature B2B analytics dashboard while preserving every legacy function. The product had years of accumulated features and a user base that depended on exact workflows.',
    approach:
      'Ran a full investigation of the product and user experience, mapping every existing function before any visual change. Then executed a full redesign that modernized the visual layer and interaction model without removing capability.',
    result:
      'A new version of the product that looks and feels modern, keeps all legacy functions intact, and is significantly easier for new users to learn.',
    details: {
      scope: 'Full UX investigation + UI redesign',
      duration: '11 months',
      team: '4 designers, 6 engineers',
      outcomes: [
        'Modern UI with all legacy functions preserved',
        'Documented map of every existing feature',
        'Improved learnability for new users',
        'Foundation for future module expansion',
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
        alert('Sending error. Please try again.');
      }
    } catch (error) {
      alert('Connection error. Check your internet connection.');
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
              Maria Guryanova
              <span className="block text-rose-500 text-sm font-small">Design Director</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={goToAbout} className="text-gray-300 hover:text-white transition-colors font-medium">
                About
              </button>
              <button onClick={goToServices} className="text-gray-300 hover:text-white transition-colors font-medium">
                Services
              </button>
              <button onClick={goToCaseStudies} className="text-gray-300 hover:text-white transition-colors font-medium">
                Case Studies
              </button>
              <button onClick={handleContactClick} className="text-gray-300 hover:text-white transition-colors font-medium">
                Contact
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
                About
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  goToServices();
                }}
                className="block w-full text-left py-2 text-gray-300 hover:text-white font-medium"
              >
                Services
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  goToCaseStudies();
                }}
                className="block w-full text-left py-2 text-gray-300 hover:text-white font-medium"
              >
                Case Studies
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleContactClick();
                }}
                className="block w-full text-left py-2 text-gray-300 hover:text-white font-medium"
              >
                Contact
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
              <p className="text-rose-600 font-semibold tracking-wide uppercase mb-2 animate-on-scroll">US & APAC</p>
              <h1 className="text-4xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-3 animate-on-scroll">
                Maria Guryanova
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 mb-6 leading-relaxed max-w-3xl font-bold animate-on-scroll">
                Fractional Design Director for Enterprise B2B Products
              </p>
              <p className="text-xl lg:text-2xl text-gray-600 mb-6 leading-relaxed max-w-3xl animate-on-scroll">
                Design systems, UX strategy, and team mentorship to scale your product without hiring full-time.
                <br />
                US Enterprise Expertise, Now for APAC
              </p>
              <div className="flex flex-col sm:flex-row gap-3 animate-on-scroll">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl group"
                >
                  Book a free call
                  <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <button
                  onClick={goToCaseStudies}
                  className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-900 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all"
                >
                  View case studies
                </button>
              </div>
            </div>
            <div className="lg:col-span-3 mt-3 animate-on-scroll">
              <img src={profilePic} alt="Maria Guryanova, Design Director" className="w-full h-[300px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-sm font-semibold text-rose-600 uppercase tracking-wide mb-3 animate-on-scroll">About</h2>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 animate-on-scroll">
                13+ Years of Shipping Enterprise Products and Design Leadership
              </h3>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed animate-on-scroll">
                <p>
                  Enterprise-grade design systems and UX strategy — I help you scale your product and
                  teams faster, with fewer iterations. No full-time commitment required.
                </p>
                <p>
                  After 10+ years of designing complex B2B systems for US enterprises, I'm now focusing
                  on helping APAC startups and scale-ups build world-class design infrastructure that scales with them - design systems, component libraries, and the teams to manage it all.
                </p>
                <p>
                  I bridge the gap between design and engineering, mentoring teams to ship better products, faster. My approach is systematic, business driven and tailored to the unique challenges of fast growing APAC companies.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 animate-on-scroll">
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <Boxes className="w-10 h-10 text-rose-600 mb-3" />
                <div className="text-4xl lg:text-5xl font-bold text-rose-600 mb-2">3+</div>
                <div className="text-gray-500 font-small">Design systems built</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <Rocket className="w-10 h-10 text-rose-600 mb-3" />
                <div className="text-4xl lg:text-5xl font-bold text-rose-600 mb-2">8</div>
                <div className="text-gray-500 font-small">Products shipped</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <UsersRound className="w-10 h-10 text-rose-600 mb-3" />
                <div className="text-4xl lg:text-5xl font-bold text-rose-600 mb-2">5+</div>
                <div className="text-gray-500 font-small">Led teams of this size</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-sm font-semibold text-rose-600 uppercase tracking-wide mb-3 animate-on-scroll">Services</h2>
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 animate-on-scroll">How I Can Help Your Business</h3>
            <p className="text-gray-600 text-lg animate-on-scroll">Strategic design leadership tailored to your stage and needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="group bg-gray-50 rounded-2xl p-6 lg:p-8 border border-gray-100 hover:border-rose-200 hover:shadow-xl transition-all duration-300 animate-on-scroll flex flex-col">
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-rose-600 transition-colors">
                <Layers className="w-7 h-7 text-rose-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Design System as a Service</h4>
              <p className="text-gray-600 leading-relaxed mb-6">
                Audit, build, and implement a scalable design system with code components. Establish
                consistent design language across your product suite.
              </p>
              <div className="mt-auto">
                <p className="text-sm font-semibold text-gray-900 mb-3">What you get</p>
                <ul className="space-y-2">
                  {[
                    'Full audit of your current UI and component usage',
                    'Token-based design system in Figma + code components',
                    'Documented usage guidelines for designers and engineers',
                    'Onboarding sessions so your team can self-serve',
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
              <h4 className="text-xl font-bold text-gray-900 mb-3">Fractional Design Director</h4>
              <p className="text-gray-600 leading-relaxed mb-6">
                Enterprise-grade design leadership, available part-time. I step in as your design director - running design reviews, mentoring your team, shaping product design.
                All for a fraction of a full-time cost.
              </p>
              <div className="mt-auto">
                <p className="text-sm font-semibold text-gray-900 mb-3">What you get</p>
                <ul className="space-y-2">
                  {[
                    'Weekly design reviews and direction for your team',
                    'Mentorship and growth plans for your designers',
                    'Cross-functional alignment with product and engineering',
                    'Hiring guidance and design process setup',
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
              <h4 className="text-xl font-bold text-gray-900 mb-3">UX Audit & Roadmap</h4>
              <p className="text-gray-600 leading-relaxed mb-6">
                In-depth analysis of your B2B product. I deliver a prioritized roadmap and improve user satisfaction, reduce churn and increase conversion. You get a strategic plan.
                Identify quick wins and long-term improvements.
              </p>
              <div className="mt-auto">
                <p className="text-sm font-semibold text-gray-900 mb-3">What you get</p>
                <ul className="space-y-2">
                  {[
                    'Heuristic evaluation of key user flows',
                    'Prioritized list of quick wins and long-term bets',
                    'Actionable roadmap aligned to business goals',
                    'Stakeholder readout with clear next steps',
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
            <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wide mb-3 animate-on-scroll">Case Studies</h2>
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 animate-on-scroll">Proven Results Across Industries</h3>
            <p className="text-gray-300 text-lg animate-on-scroll">Selected projects from enterprise clients in fintech, biotech, and SaaS</p>
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
                      <span className="text-gray-400 font-medium">Challenge:</span>
                      <p className="text-gray-300 mt-1">{study.challenge}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 font-medium">Result:</span>
                      <p className="text-gray-300 mt-1">{study.result}</p>
                    </div>
                  </div>
                  <button
                    onClick={goToCaseStudies}
                    className="inline-flex items-center text-rose-600 font-semibold hover:text-rose-700 transition-colors group/link mt-4"
                  >
                    Learn more
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
              <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wide mb-3">Contact</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">Available for UTC +8</p>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Ready to elevate your product's design? Book a free discovery call
                to discuss your challenges and see if we're a good fit.
              </p>

              <div className="space-y-4">
                <a
                  href="https://www.linkedin.com/in/maria-guryanova-24260337/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                >
                  <Linkedin className="w-5 h-5 text-rose-400" />
                  <span>Connect on LinkedIn</span>
                </a>
              </div>

              <div className="mt-10 pt-8 border-t border-gray-700">
                <p className="text-sm text-gray-400">Serving startups and scale-ups across APAC.</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-800/50 rounded-2xl p-6 lg:p-8 border border-gray-700 animate-on-scroll">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="w-16 h-16 text-rose-400 mb-4" />
                  <h4 className="text-xl font-semibold text-white mb-2">Message Sent!</h4>
                  <p className="text-gray-300">I'll get back to you within 24-48 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                      placeholder="Your name"
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
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-rose-600 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:bg-rose-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    Book a free call
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
            <p>&copy; 2026 Maria Guryanova DesignDirector. All rights reserved.</p>
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
              Maria Guryanova
              <span className="block text-rose-500 text-sm font-small">Design Director</span>
            </button>
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-medium group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to home
            </button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="hero-gradient pt-28 pb-12 lg:pt-32 lg:pb-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <p className="text-rose-400 font-semibold tracking-wide uppercase mb-2 animate-on-scroll">Case Studies</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 animate-on-scroll">Proven Results Across Industries</h1>
          <p className="text-xl text-gray-300 max-w-3xl animate-on-scroll">
            Selected projects from enterprise clients in fintech, biotech, and SaaS — with the
            challenge, approach, and measurable outcomes for each.
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
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Scope</p>
                    <p className="text-sm font-medium text-gray-900">{study.details.scope}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Duration</p>
                    <p className="text-sm font-medium text-gray-900">{study.details.duration}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Team</p>
                    <p className="text-sm font-medium text-gray-900">{study.details.team}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Challenge</h3>
                    <p className="text-gray-600 leading-relaxed">{study.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Approach</h3>
                    <p className="text-gray-600 leading-relaxed">{study.approach}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Result</h3>
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
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 animate-on-scroll">Want results like these?</h2>
          <p className="text-gray-300 text-lg mb-8 animate-on-scroll">Book a free discovery call to discuss your product and how we'd work together.</p>
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-rose-700 transition-all shadow-lg hover:shadow-xl group"
          >
            Get in Touch
            <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
