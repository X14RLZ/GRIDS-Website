
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  isDarkMode?: boolean;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ isDarkMode = false }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (location.pathname === '/' || location.pathname === '/home') return null;

  const getDisplayName = (name: string) => {
    // Custom mapping for better display names
    const mapping: Record<string, string> = {
      'gad-data': 'GAD Indicators',
      'cbms': 'CBMS Table',
      'data-submission': 'Submission',
      'data-approval': 'Approval',
      'data-retrieval': 'Retrieval',
      'user-management': 'Users',
      'audit-trail': 'Audit Trail',
      'privacy-policy': 'Privacy',
      'analysis': 'Analysis',
      'view': 'Viewer',
    };

    if (mapping[name.toLowerCase()]) return mapping[name.toLowerCase()];
    
    // Default formatting: capitalize and replace hyphens
    return name
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6 animate-in fade-in slide-in-from-left-2 duration-500">
      <ol className="flex items-center flex-wrap gap-2">
        <li>
          <Link
            to="/"
            className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-colors
              ${isDarkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-900'}`}
          >
            <Home size={12} />
            Home
          </Link>
        </li>

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const displayName = getDisplayName(name);

          return (
            <li key={routeTo} className="flex items-center gap-2">
              <ChevronRight size={10} className={isDarkMode ? 'text-white/10' : 'text-gray-300'} />
              {isLast ? (
                <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                  {displayName}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className={`text-[10px] font-black uppercase tracking-widest transition-colors
                    ${isDarkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-900'}`}
                >
                  {displayName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
