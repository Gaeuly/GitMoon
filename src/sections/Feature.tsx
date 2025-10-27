import { Package, Brain, Lock, Zap } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, colorClass }) => {
  return (
    <div className={`relative p-8 rounded-lg text-black transition-transform duration-200 ease-in-out border-b-4 border-r-4 border-black hover:translate-x-0.5 hover:translate-y-0.5 hover:border-b-2 hover:border-r-2 ${colorClass} h-full`}>
      <div className="w-14 h-14 rounded-xl bg-black/10 flex items-center justify-center mb-6">
        <Icon className="w-7 h-7 text-black" />
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-black/70 leading-relaxed text-lg">{description}</p>
    </div>
  );
};

export default function Feature() {
  const features = [
    {
      icon: Package,
      title: 'Upload ZIP → Extract & Commit',
      description: 'Simply upload a .zip file and GitVeilcy automatically extracts and commits it to your GitHub repository.',
      colorClass: 'bg-sky-300',
    },
    {
      icon: Brain,
      title: 'Auto README Generator',
      description: 'Powered by Gemini AI, automatically generate comprehensive README files for your projects.',
      colorClass: 'bg-red-300',
    },
    {
      icon: Lock,
      title: 'Secure Client-Side Tokens',
      description: 'Your GitHub tokens and API keys are stored securely in your browser. No backend, no risk.',
      colorClass: 'bg-lime-300',
    },
    {
      icon: Zap,
      title: 'Fast Mobile Push & Pull',
      description: 'Perform Git operations at lightning speed, directly from your mobile device.',
      colorClass: 'bg-orange-300',
    },
  ];

  return (
    <section id="features" className="bg-white text-black py-16 lg:py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-12 lg:mb-16 text-left">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-800">
            Powerful Features
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl leading-relaxed">
            Everything you need to manage your GitHub repositories with ease and speed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              colorClass={feature.colorClass}
            />
          ))}
        </div>
      </div>
    </section>
  );
}