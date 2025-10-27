import { Shield, Key, Scan, Upload, Trash2, GitCommit } from 'lucide-react';
import { OffsetShadowCard } from './Shared';

const GuideItem = ({ icon: Icon, title, children }) => (
  <div>
    <div className="flex items-center gap-3 mb-2">
      <Icon className="w-6 h-6 text-purple-600" />
      <h4 className="text-lg font-bold text-gray-800">{title}</h4>
    </div>
    <p className="text-gray-600 ml-9">{children}</p>
  </div>
);

export const GuideSection = () => {
  return (
    <OffsetShadowCard color="purple" className="bg-purple-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">How to Use GitVeilcy</h2>
      <div className="space-y-6">
        <GuideItem icon={Shield} title="Your Keys, Your Security">
          Your GitHub and Gemini keys are safe. They are only stored in your browser (client-side) and never sent to our servers. Your privacy is our priority.
        </GuideItem>
        <GuideItem icon={Key} title="Step 1: Configuration">
          Fill in your GitHub Personal Access Token, the repository name (e.g., `your-name/your-repo`), and the branch you want to work on. The Gemini API Key is optional but needed for auto-generating commit messages.
        </GuideItem>
        <GuideItem icon={Scan} title="Step 2: Scan Repository">
          Always click <strong>"Scan Repository Files"</strong> first. This maps your repo's structure, allowing for automatic path detection when you upload or delete files.
        </GuideItem>
        <GuideItem icon={Upload} title="To Add or Update Files">
          After scanning, drag and drop or select files. If a file already exists in the repo, its path will be filled automatically. Add a commit message, then click <strong>"Commit & Push"</strong>.
        </GuideItem>
        <GuideItem icon={Trash2} title="To Delete Files or Folders">
          Enter the full path of the file (e.g., `src/components/Button.tsx`) or folder (e.g., `src/utils`) you want to remove, then click <strong>"Delete Path"</strong>.
        </GuideItem>
        <GuideItem icon={GitCommit} title="Track Your Work">
          Use the <strong>"Fetch Commits"</strong> button anytime to see the latest commit history in the "Latest Commits" log.
        </GuideItem>
      </div>
    </OffsetShadowCard>
  );
};