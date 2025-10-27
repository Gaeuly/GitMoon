import { Shield, Smartphone, Zap } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, colorClass }) => {
  return (
    <div className={`relative p-8 rounded-lg text-black transition-transform duration-200 ease-in-out border-b-4 border-r-4 border-black hover:translate-x-0.5 hover:translate-y-0.5 hover:border-b-2 hover:border-r-2 ${colorClass}`}>
      <div className="w-12 h-12 rounded-xl bg-black/10 flex items-center justify-center mb-5">
        <Icon className="w-6 h-6 text-black" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-black/70 leading-relaxed">{description}</p>
    </div>
  );
};

export default function About() {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'All operations run client-side. Your GitHub tokens and Gemini API keys never leave your device.',
      colorClass: 'bg-yellow-300'
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Designed for developers on the go. Commit and push repositories directly from your phone.',
      colorClass: 'bg-purple-300'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'No backend delays. Instant operations with direct API connections.',
      colorClass: 'bg-green-300'
    },
  ];

  return (
    <section id="about" className="bg-white text-black py-16 lg:py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-12 lg:mb-16 text-left">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-800">
            Why GitVeilcy?
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl leading-relaxed">
            GitVeilcy runs fully client-side, using your GitHub Token and Gemini API Key safely. We prioritize your privacy and simplicity, making Git operations accessible for developers anywhere, anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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