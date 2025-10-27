import { Github } from 'lucide-react';

const UnapologeticButton = ({ href, children, className, variant = 'primary' }) => {
  const baseClasses = "relative inline-block px-8 py-3 font-bold text-black rounded-lg transition-transform duration-200 ease-in-out";
  
  const variantClasses = {
    primary: 'bg-yellow-400 hover:bg-yellow-500',
    secondary: 'bg-purple-500 hover:bg-purple-600',
  };

  const buttonContent = (
    <div className="relative z-10 flex items-center justify-center gap-2">
      {children}
    </div>
  );

  const buttonWrapperClasses = `relative w-full sm:w-auto group ${className}`;
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} border-b-4 border-r-4 border-black group-hover:border-b-2 group-hover:border-r-2 group-hover:translate-x-0.5 group-hover:translate-y-0.5`;
  
  return (
    <a href={href || '#'} className={buttonWrapperClasses}>
      <div className={buttonClasses}>{buttonContent}</div>
    </a>
  );
};

const Rating = ({ className }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <img 
      src="/rate.png" 
      alt="Rating" 
      className="w-8 h-8" 
      onError={(e) => { e.currentTarget.style.display = 'none'; }}
    />
    <div>
      <p className="font-bold text-gray-800">Rated 4.8 / 5</p>
      <p className="text-sm text-gray-500">1,000+ Reviews</p>
    </div>
  </div>
);

const FeatureMarquee = () => {
  const marqueeItems = [
    "README Generator", "GitHub Repository", "Commit & Push", "Client-Side Security", 
    "Delete Path", "Mobile First", "AI Powered", "Text & Markdown"
  ];
  return (
    <>
      <style>{`
        .marquee-container-hero {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent, white 10%, white 90%, transparent);
          mask-image: linear-gradient(to right, transparent, white 10%, white 90%, transparent);
        }
        .marquee-content-hero {
          display: flex;
          width: max-content;
          animation: scroll-hero 30s linear infinite;
        }
        @keyframes scroll-hero {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      <div className="marquee-container-hero mt-16 lg:mt-24">
        <div className="marquee-content-hero">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <div key={index} className="mx-4 px-6 py-2 rounded-md border-2 border-gray-300 bg-gray-100 text-gray-600 font-semibold whitespace-nowrap">
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};


export default function Hero() {
  return (
    <section id="home" className="bg-white text-black overflow-hidden pt-20 pb-12 lg:pt-28 lg:pb-20">
      <div className="container mx-auto px-6 max-w-6xl"> 
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="md:w-1/2 w-full text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-800">
              <span className="bg-gradient-to-r from-purple-500 to-yellow-500 bg-clip-text text-transparent">
                Push. Commit. Automate.
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-lg">
              GitVeilcy helps you manage GitHub repositories directly from mobile — commit, upload, and document with ease.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start justify-start gap-4 sm:gap-6">
              <UnapologeticButton variant="primary">
                Try Now
              </UnapologeticButton>
              <UnapologeticButton 
                href="https://github.com" 
                variant="secondary"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </UnapologeticButton>
            </div>

            <Rating className="hidden md:flex mt-10" />
            <Rating className="flex md:hidden mt-10" />
          </div>
          
          <div className="md:w-1/2 w-full flex flex-col items-center mt-8 md:mt-0">
            <img 
              src="/avatar.png" 
              alt="GitVeilcy Illustration" 
              className="hidden md:block w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto rounded-lg"
              onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/e5e7eb/1f2937?text=GitVeilcy'; }}
            />
          </div>

        </div>

        <FeatureMarquee />
      </div>
    </section>
  );
}