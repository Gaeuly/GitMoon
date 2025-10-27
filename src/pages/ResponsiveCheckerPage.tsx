import React, { useState, useEffect, useRef } from 'react';
import { Smartphone, Tablet, Monitor, Tv, RotateCw, Home, GitBranch, FileText, Camera } from 'lucide-react';

const deviceGroups = {
  mobile: {
    icon: Smartphone,
    label: "Mobile",
    devices: [
      { name: "iPhone 14/15 Pro Max", width: 430, height: 932 },
      { name: "iPhone 14/15 Pro", width: 393, height: 852 },
      { name: "iPhone 12/13/14/15", width: 390, height: 844 },
      { name: "iPhone X/XS/11 Pro", width: 375, height: 812 },
      { name: "iPhone 8 Plus", width: 414, height: 736 },
      { name: "iPhone 8", width: 375, height: 667 },
      { name: "Samsung Galaxy S22 Ultra", width: 412, height: 892 },
      { name: "Samsung Galaxy S22", width: 360, height: 780 },
      { name: "Google Pixel 7", width: 412, height: 915 },
      { name: "Google Pixel 6", width: 412, height: 892 },
      { name: "Mobile (S)", width: 360, height: 740 },
      { name: "Mobile (M)", width: 390, height: 844 },
      { name: "Mobile (L)", width: 430, height: 932 },
    ]
  },
  tablet: {
    icon: Tablet,
    label: "Tablet",
    devices: [
      { name: "iPad Pro 12.9\"", width: 1024, height: 1366 },
      { name: "iPad Pro 11\"", width: 834, height: 1194 },
      { name: "iPad Air 4/5", width: 820, height: 1180 },
      { name: "iPad 10th Gen", width: 810, height: 1080 },
      { name: "Samsung Tab S8 Ultra", width: 922, height: 1476 },
      { name: "Samsung Tab S8", width: 800, height: 1280 },
      { name: "Surface Pro 8", width: 960, height: 1440 },
    ]
  },
  desktop: {
    icon: Monitor,
    label: "Desktop",
    devices: [
      { name: "Laptop (13\")", width: 1280, height: 800 },
      { name: "Laptop (15\")", width: 1366, height: 768 },
      { name: "Common", width: 1440, height: 900 },
      { name: "HD+", width: 1600, height: 900 },
      { name: "Full HD (1080p)", width: 1920, height: 1080 },
      { name: "QHD (1440p)", width: 2560, height: 1440 },
      { name: "4K (2160p)", width: 3840, height: 2160 },
    ]
  },
  tv: {
    icon: Tv,
    label: "Television",
    devices: [
      { name: "TV (720p)", width: 1280, height: 720 },
      { name: "TV (1080p)", width: 1920, height: 1080 },
      { name: "TV (4K)", width: 3840, height: 2160 },
      { name: "TV (8K)", width: 7680, height: 4320 },
    ]
  }
};

type DeviceGroupKey = keyof typeof deviceGroups;

export default function ResponsiveCheckerPage() {
  const [url, setUrl] = useState('https://example.com');
  const [displayUrl, setDisplayUrl] = useState('https://example.com');
  const [size, setSize] = useState({ width: 1280, height: 800 });
  const [isRotated, setIsRotated] = useState(false);
  const [openMenu, setOpenMenu] = useState<DeviceGroupKey | null>(null);
  const [activeCategory, setActiveCategory] = useState<DeviceGroupKey | null>('desktop');
  const [isScreenshotting, setIsScreenshotting] = useState(false);

  const viewportMetaRef = useRef<HTMLMetaElement | null>(null);
  const originalViewportContentRef = useRef<string | null>(null);
  const screenshotRef = useRef<HTMLDivElement>(null); // Ref buat target screenshot

  useEffect(() => {
    let viewportTag = document.querySelector('meta[name="viewport"]');
    
    if (viewportTag) {
      viewportMetaRef.current = viewportTag as HTMLMetaElement;
      originalViewportContentRef.current = viewportTag.getAttribute('content');
    } else {
      viewportTag = document.createElement('meta');
      viewportTag.setAttribute('name', 'viewport');
      document.head.appendChild(viewportTag);
      viewportMetaRef.current = viewportTag as HTMLMetaElement;
      originalViewportContentRef.current = 'width=device-width, initial-scale=1.0';
    }
    
    viewportMetaRef.current.setAttribute('content', 'width=5000');
    
    // Load script html2canvas
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    script.async = true;
    script.id = 'html2canvas-script';
    document.body.appendChild(script);

    return () => {
      if (viewportMetaRef.current && originalViewportContentRef.current) {
        viewportMetaRef.current.setAttribute('content', originalViewportContentRef.current);
      }
      // Cleanup script
      const loadedScript = document.getElementById('html2canvas-script');
      if (loadedScript) {
        document.body.removeChild(loadedScript);
      }
    };
  }, []);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let finalUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      finalUrl = 'https://' + url;
    }
    setDisplayUrl(finalUrl);
    setIsRotated(false);
    setOpenMenu(null);
  };

  const setDevice = (width: number, height: number, category: DeviceGroupKey) => {
    setSize({ width, height });
    setIsRotated(false);
    setOpenMenu(null);
    setActiveCategory(category);
  };

  const rotate = () => {
    setSize({ width: size.height, height: size.width });
    setIsRotated(!isRotated);
    setOpenMenu(null);
    setActiveCategory(null);
  };

  const handleScreenshot = () => {
    if (!screenshotRef.current) {
      console.error("Target elemen buat screenshot gak ketemu.");
      return;
    }
    
    // @ts-ignore - html2canvas di-load dari CDN
    if (typeof html2canvas === 'undefined') {
      console.error("html2canvas script belum keload.");
      alert("Fitur screenshot belum siap, coba beberapa detik lagi.");
      return;
    }

    setIsScreenshotting(true);
    
    // @ts-ignore
    html2canvas(screenshotRef.current, {
      allowTaint: true, // Coba render cross-origin (tapi bakal gagal kalo ada X-Frame-Options)
      useCORS: true,     // Coba pake CORS
      logging: false,    // Matikan log console
      onclone: (document) => {
        // Coba 'fix' iframe, tapi ini GAK AKAN ngebypass X-Frame-Options
        // Ini cuma usaha terbaik, kemungkinan besar iframe cross-origin tetap blank
        const iframe = document.querySelector('iframe');
        if (iframe) {
          try {
            // Ini bakal error buat cross-origin dan itu normal
            const iframeContent = iframe.contentWindow?.document.body.innerHTML;
            if (iframeContent) {
              // ... (logika kompleks buat nempel-in konten, tapi kita skip)
            }
          } catch (e) {
            console.warn('Gagal akses iframe content buat screenshot (ini normal buat cross-origin):', e);
          }
        }
      }
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `screenshot-${currentWidth}x${currentHeight}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsScreenshotting(false);
    }).catch((err) => {
      console.error("Gagal screenshot:", err);
      alert("Gagal mengambil screenshot.");
      setIsScreenshotting(false);
    });
  };


  const currentWidth = isRotated ? size.height : size.width;
  const currentHeight = isRotated ? size.width : size.height;

  const minWorldWidth = currentWidth + 56 + 64; 

  return (
    <div 
      className="flex min-w-full min-h-screen bg-gray-100 text-gray-800"
      style={{ minWidth: `${minWorldWidth}px` }}
    >
      <nav className="w-14 h-screen bg-black text-gray-400 flex flex-col items-center py-4 gap-4 fixed top-0 left-0 z-30 shadow-lg">
        <a href="/" title="Home" className="p-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors">
          <Home className="w-6 h-6" />
        </a>
        <div className="p-2 rounded-lg bg-purple-600 text-white" title="Responsive Tool">
          <Smartphone className="w-6 h-6" />
        </div>
        <a href="/commit" title="Commit & Push" className="p-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors">
          <GitBranch className="w-6 h-6" />
        </a>
        <a href="/readme" title="README Generator" className="p-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors">
          <FileText className="w-6 h-6" />
        </a>
      </nav>

      <div className="flex-1 flex flex-col pl-14">
        
        <header className="w-full bg-white border-b border-gray-200 fixed top-0 left-14 right-0 z-20 shadow-sm">
          <div className="h-14 flex items-center justify-between px-4 border-b border-gray-100">
            <form onSubmit={handleUrlSubmit} className="flex-grow flex gap-2 max-w-lg">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter website URL..."
                className="flex-grow w-full p-2 border-2 border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Go
              </button>
            </form>
            <div className="text-gray-600 font-mono text-lg ml-4 p-2 bg-gray-100 rounded-md hidden lg:block">
              {currentWidth} x {currentHeight}
            </div>
          </div>

          <div className="w-full bg-gray-50 p-2 min-h-[3.5rem]">
            <div className="flex flex-wrap items-center justify-center gap-2 min-w-max">
              
              {(Object.keys(deviceGroups) as DeviceGroupKey[]).map((key) => {
                const group = deviceGroups[key];
                const Icon = group.icon;
                const isActive = activeCategory === key && !isRotated;
                
                return (
                  <div key={key} className="relative">
                    <button
                      onClick={() => setOpenMenu(openMenu === key ? null : key)}
                      title={group.label}
                      className={`flex items-center gap-2 p-2 rounded-md transition-colors flex-shrink-0 ${
                        isActive ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-200'
                      } border border-gray-300 shadow-sm`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium hidden md:inline">{group.label}</span>
                    </button>

                    {openMenu === key && (
                      <div className="absolute top-11 left-0 z-50 bg-white rounded-lg shadow-lg border border-gray-200 max-h-72 w-64 overflow-y-auto">
                        <ul className="p-1">
                          {group.devices.map((device) => (
                            <li key={device.name}>
                              <button
                                onClick={() => setDevice(device.width, device.height, key)}
                                className="w-full text-left p-2 rounded-md hover:bg-gray-100 flex justify-between items-center text-sm"
                              >
                                <span>{device.name}</span>
                                <span className="text-gray-500 font-mono">{device.width}x{device.height}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}

              <button
                onClick={rotate}
                title="Rotate"
                className={`flex items-center gap-2 p-2 rounded-md transition-colors flex-shrink-0 ${
                  isRotated ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-200'
                } border border-gray-300 shadow-sm`}
              >
                <RotateCw className="w-5 h-5" />
              </button>

              {/* TOMBOL SCREENSHOT BARU */}
              <button
                onClick={handleScreenshot}
                disabled={isScreenshotting}
                title="Screenshot"
                className="flex items-center gap-2 p-2 rounded-md transition-colors flex-shrink-0 bg-white text-gray-600 hover:bg-gray-200 border border-gray-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isScreenshotting ? (
                  <RotateCw className="w-5 h-5 animate-spin" /> 
                ) : (
                  <Camera className="w-5 h-5" />
                )}
                <span className="text-sm font-medium hidden md:inline">
                  {isScreenshotting ? "Loading..." : "Screenshot"}
                </span>
              </button>

            </div>
          </div>
        </header>

        <main className="flex-1 pt-28 bg-gray-200 bg-[radial-gradient(#bbb_1px,transparent_1px)] [background-size:20px_20px]">
          
          <div className="w-full p-8 min-h-full">
            
            {/* TARGET SCREENSHOT */}
            <div 
              ref={screenshotRef} // Tambahin ref di sini
              className="bg-black p-4 rounded-xl shadow-2xl transition-all duration-300 ease-in-out"
              style={{ width: currentWidth + 32, height: currentHeight + 56 }} 
            >
              <p className="text-center text-white text-sm mb-2 font-mono">{currentWidth} x {currentHeight}</p>
              
              <iframe
                key={displayUrl}
                src={displayUrl}
                title="Responsive Preview"
                className="bg-white"
                style={{ width: currentWidth, height: currentHeight, transition: 'all 0.3s ease-in-out' }}
                onError={(e) => console.error("Iframe load error. Target site might have X-Frame-Options set.", e)}
              ></iframe>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}