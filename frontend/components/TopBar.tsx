import React from 'react'
import { FaBriefcase, FaChalkboardTeacher, FaChevronDown, FaClipboardList, FaFileAlt, FaPlus, FaProjectDiagram, FaSearch, FaBell } from 'react-icons/fa';
import { DialogTitle } from "@radix-ui/react-dialog";
import * as Cmdk from "cmdk";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import ThemeSwitcher from '@/components/auth/ThemeSwitcher';

function Projects({ theme = 'dark' }: { theme?: 'light' | 'dark' }) {
    return (
      <>
        <Item theme={theme}>Project 1</Item>
        <Item theme={theme}>Project 2</Item>
        <Item theme={theme}>Project 3</Item>
        <Item theme={theme}>Project 4</Item>
        <Item theme={theme}>Project 5</Item>
        <Item theme={theme}>Project 6</Item>
      </>
    );
  }
  
  function Item({ children, shortcut, onSelect = () => {}, theme = 'dark' }: { children: React.ReactNode; shortcut?: string; onSelect?: (value: string) => void; theme?: 'light' | 'dark' }) {
    return (
      <Cmdk.Command.Item onSelect={onSelect} className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors cursor-pointer mb-1 ${
        theme === 'dark' ? 'hover:bg-[#13ff8c]/10' : 'hover:bg-emerald-100/70'
      }`}>
        <span className={`flex items-center gap-3 text-base ${
          theme === 'dark' ? 'text-white' : 'text-slate-700'
        }`}>{children}</span>
        {shortcut && (
          <div className="flex gap-1 ml-4">
            {shortcut.split(' ').map((key) => (
              <kbd key={key} className={`px-2 py-1 rounded text-xs font-mono border shadow-sm ${
                theme === 'dark'
                  ? 'bg-[#13ff8c]/20 text-[#13ff8c] border-[#13ff8c]/30'
                  : 'bg-emerald-100/70 text-emerald-700 border-emerald-300/50'
              }`}>{key}</kbd>
            ))}
          </div>
        )}
      </Cmdk.Command.Item>
    );
  }
function Home({ searchProjects, theme = 'dark' }: { searchProjects: () => void; theme?: 'light' | 'dark' }) {
    const iconColor = theme === 'dark' ? 'text-[#13ff8c]' : 'text-emerald-600';
    return (
      <>
        <Cmdk.Command.Group heading="Projects" className="mb-6 px-1">
          <Item shortcut="S P" onSelect={() => searchProjects()} theme={theme}>
            <FaProjectDiagram className={`mr-2 text-lg ${iconColor}`} />
            Search Projects...
          </Item>
          <Item theme={theme}>
            <FaPlus className={`mr-2 text-lg ${iconColor}`} />
            Create New Project...
          </Item>
        </Cmdk.Command.Group>
        <Cmdk.Command.Group heading="Mentors" className="mb-6 px-1">
          <Item shortcut="S M" theme={theme}>
            <FaChalkboardTeacher className={`mr-2 text-lg ${iconColor}`} />
            Search Mentors...
          </Item>
        </Cmdk.Command.Group>
        <Cmdk.Command.Group heading="Jobs" className="mb-6 px-1">
          <Item shortcut="S J" theme={theme}>
            <FaBriefcase className={`mr-2 text-lg ${iconColor}`} />
            Search Jobs...
          </Item>
          <Item theme={theme}>
            <FaClipboardList className={`mr-2 text-lg ${iconColor}`} />
            Apply for Job...
          </Item>
        </Cmdk.Command.Group>
        <Cmdk.Command.Group heading="Help" className="mb-2 px-1">
          <Item shortcut="H" theme={theme}>
            <FaFileAlt className={`mr-2 text-lg ${iconColor}`} />
            Search Docs...
          </Item>
        </Cmdk.Command.Group>
      </>
    );
  }
function CommandPalette({ theme = 'dark' }: { theme?: 'light' | 'dark' }) {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [pages, setPages] = React.useState<string[]>(['home']);
    const activePage = pages[pages.length - 1];
    const isHome = activePage === 'home';
  
    const popPage = React.useCallback(() => {
      setPages((pages) => {
        const x = [...pages];
        x.splice(-1, 1);
        return x;
      });
    }, []);
  
    function bounce() {
      if (ref.current) {
        ref.current.style.transform = 'scale(0.96)';
        setTimeout(() => {
          if (ref.current) {
            ref.current.style.transform = '';
          }
        }, 100);
        setInputValue('');
      }
    }
  
    // Add global Ctrl+K/Cmd+K listener
    React.useEffect(() => {
      function onKeyDown(e: KeyboardEvent) {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          setOpen(true);
        }
      }
      window.addEventListener('keydown', onKeyDown);
      return () => window.removeEventListener('keydown', onKeyDown);
    }, []);
  
    return (
      <>
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className={`relative group w-full max-w-md flex items-center backdrop-blur-md rounded-lg shadow-lg px-4 py-3 text-left text-base focus:outline-none transition ${
              theme === 'dark'
                ? 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                : 'bg-white/80 border border-emerald-200/50 text-slate-700 hover:bg-white/90'
            }`}
            aria-label="Open command palette"
            type="button"
          >
            <span className={`mr-3 flex items-center justify-center ${
              theme === 'dark' ? 'text-gray-400' : 'text-slate-500'
            }`}>
              <FaSearch />
            </span>
            <span className={`flex-1 text-base truncate ${
              theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
            }`}>Search... <span className={`hidden md:inline text-xs ml-2 ${
              theme === 'dark' ? 'text-gray-500' : 'text-slate-500'
            }`}>(Ctrl+K)</span></span>
            <kbd className={`ml-3 px-2 py-1 rounded text-xs font-mono border hidden md:inline ${
              theme === 'dark'
                ? 'bg-[#13ff8c]/10 text-[#13ff8c] border-[#13ff8c]/30'
                : 'bg-emerald-100/70 text-emerald-700 border-emerald-300/50'
            }`}>Ctrl+K</kbd>
          </button>
        )}
        {open && (
          <div className="fixed inset-0 z-40 bg-black/70 transition-opacity duration-200 animate-fadein" />
        )}
        <Cmdk.Command.Dialog
          open={open}
          onOpenChange={setOpen}
          label="Global Search"
          className={`fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg border rounded-2xl shadow-2xl p-0 px-4 py-6 max-w-xl ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-[#1a2a22]/90 to-[#0a1813]/90 border-white/10'
              : 'bg-gradient-to-br from-white/95 to-emerald-50/95 border-emerald-200/50 backdrop-blur-md'
          }`}
        >
          <DialogTitle>
            <VisuallyHidden>Global Search</VisuallyHidden>
          </DialogTitle>
          {/* Remove breadcrumb/home text */}
          <Cmdk.Command
            ref={ref}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === 'Enter') bounce();
              if (isHome || inputValue.length) return;
              if (e.key === 'Backspace') {
                e.preventDefault();
                popPage();
                bounce();
              }
            }}
          >
            <Cmdk.Command.Input
              autoFocus
              value={inputValue}
              onValueChange={setInputValue}
              placeholder="What do you need?"
              className={`w-full px-5 py-3 mb-4 text-lg border rounded-lg outline-none focus:ring-2 backdrop-blur-[6px] shadow-inner ${
                theme === 'dark'
                  ? 'bg-white/10 border-white/10 text-white placeholder-gray-400 focus:ring-[#13ff8c] focus:border-[#13ff8c]'
                  : 'bg-white/80 border-emerald-200/50 text-slate-700 placeholder-slate-400 focus:ring-emerald-500 focus:border-emerald-500'
              }`}
            />
            <Cmdk.Command.List className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              <Cmdk.Command.Empty>No results found.</Cmdk.Command.Empty>
              {activePage === 'home' && (
                <Home searchProjects={() => setPages([...pages, 'projects'])} theme={theme} />
              )}
              {activePage === 'projects' && <Projects theme={theme} />}
            </Cmdk.Command.List>
          </Cmdk.Command>
        </Cmdk.Command.Dialog>
        <style jsx global>{`
          @keyframes fadein {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fadein { animation: fadein 0.2s ease; }
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #13ff8c 40%, #0a1813 100%);
            border-radius: 8px;
            min-height: 24px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #19fb9b 60%, #1a2a22 100%);
          }
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #13ff8c #0a1813;
          }
        `}</style>
      </>
    );
  }
export const TopBar = ({ title = "Dashboard", theme, setTheme }: { title?: string, theme: 'light' | 'dark', setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>> }) => {
  return (
    <div className="sticky top-0 z-20 px-10 pt-10 pb-4 flex-shrink-0 flex items-center gap-4 flex-wrap w-full bg-transparent">
      <h1 className={`text-4xl font-bold flex-shrink-0 ${
        theme === 'dark' ? 'text-white' : 'text-slate-800'
      }`}>{title}</h1>
      <div className="flex-1 flex justify-center">
        <CommandPalette theme={theme} />
      </div>
      <div className="flex items-center justify-end gap-6 px-8 py-4 bg-transparent relative">
        {/* Theme toggle icon and notification icon in same group */}
        <div className="flex items-center gap-4">
          <ThemeSwitcher theme={theme} setTheme={setTheme} />
          {/* Notification icon */}
          <div className="relative">
            <button className={`rounded-full p-2 transition focus:outline-none ${
              theme === 'dark' 
                ? 'bg-white/10 hover:bg-white/20' 
                : 'bg-emerald-100/70 hover:bg-emerald-200/70'
            }`} aria-label="Notifications">
              <FaBell className={`w-6 h-6 ${
                theme === 'dark' ? 'text-white' : 'text-emerald-700'
              }`} />
              <span className="absolute top-1 right-1 block w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
            </button>
          </div>
        </div>

        {/* User profile */}
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full shadow ${
          theme === 'dark' 
            ? 'bg-white/10 border border-white/20' 
            : 'bg-white/80 border border-emerald-200/50'
        }`}>
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="w-8 h-8 rounded-full" />
          <span className={`font-medium ${
            theme === 'dark' ? 'text-white' : 'text-slate-700'
          }`}>Carla Sanford</span>
          <FaChevronDown className={theme === 'dark' ? 'text-gray-400' : 'text-slate-500'} />
        </div>
      </div>
    </div>
  )
}
