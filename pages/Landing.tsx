
import React, { useState } from 'react';
import { LogoWithMotto, BaguioLogo } from '../components/Logo';
import { User, UserRole, Notification } from '../types';
import { 
  Mail, Lock, User as UserIcon, Building2, 
  Loader2, UserPlus, LogIn, ChevronRight, Eye, EyeOff,
  FileText, FileSearch, RotateCw, CheckCircle2, X, Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { recordAuditLog } from '../utils/auditLogger';
import Footer from '../components/Footer';

const Landing: React.FC<{ onLogin: (user: User) => void, isDarkMode?: boolean }> = ({ onLogin, isDarkMode = false }) => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [regStep, setRegStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register State
  const [regData, setRegData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Data Provider' as UserRole,
    office: '',
    phone: '',
    birthdate: ''
  });

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      const storedUsers = JSON.parse(localStorage.getItem('grids_users') || '[]');
      const matchedUser = storedUsers.find((u: any) => u.email === loginEmail && (u.password === loginPassword || u.passwordHash === loginPassword));
      
      if (matchedUser) {
        if (matchedUser.status === 'Pending') {
          alert('Your account is still pending approval by the Administrator.');
          recordAuditLog(null, 'LOGIN_DENIED', `Blocked login attempt for pending account: ${loginEmail}`, 'Authentication');
          setIsProcessing(false);
          return;
        }
        if (matchedUser.status === 'Suspended' || matchedUser.isActive === false) {
          alert('Your account is inactive or suspended. Please contact the administrator.');
          recordAuditLog(matchedUser, 'LOGIN_DENIED', `Blocked login attempt for suspended account: ${loginEmail}`, 'Authentication');
          setIsProcessing(false);
          return;
        }
        onLogin(matchedUser);
        navigate('/');
      } else {
        alert('Invalid credentials');
        recordAuditLog(null, 'LOGIN_FAILURE', `Failed login attempt with email: ${loginEmail}`, 'Authentication');
        setIsProcessing(false);
      }
    }, 1000);
  };

  const handleSSO = () => {
    setIsProcessing(true);
    console.log("[OAUTH2] Redirecting to Baguio City ID Portal (Auth0/Google Workspace API)...");
    setTimeout(() => {
      const adminUser: User = {
        userId: 'u_admin_1',
        email: 'cbmscharles@gmail.com',
        firstName: 'Charles',
        lastName: 'Chantioco',
        role: 'Administrator',
        office: 'CPDSO',
      };
      onLogin(adminUser);
      recordAuditLog(adminUser, 'SSO_LOGIN', 'User authenticated via Baguio City ID OAuth2 Provider.', 'Authentication');
      navigate('/');
    }, 1200);
  };

  const mapRoleToId = (role: string): string => {
    const map: Record<string, string> = {
      'Administrator': 'role_admin',
      'Data Provider': 'role_provider',
      'Data Reviewer': 'role_reviewer',
      'Data Analyst': 'role_analyst',
      'Public User': 'role_public',
      'Guest': 'role_guest'
    };
    return map[role] || 'role_public';
  };

  const handleRegisterFinalize = (e: React.FormEvent) => {
    e.preventDefault();
    if (regData.password !== regData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    setIsProcessing(true);
    
    setTimeout(() => {
      const storedUsers = JSON.parse(localStorage.getItem('grids_users') || '[]');
      if (storedUsers.some((u: any) => u.email === regData.email)) {
        alert('Email already registered.');
        setIsProcessing(false);
        return;
      }

      const { confirmPassword, password, ...rest } = regData;
      const newUserId = `u_reg_${Date.now().toString().slice(-6)}`;
      const newUserRecord = { 
        ...rest, 
        userId: newUserId,
        roleId: mapRoleToId(regData.role),
        username: regData.email.split('@')[0],
        password: password, 
        passwordHash: 'PBKDF2_SIMULATED', 
        phone: regData.phone,
        contactInfo: regData.phone, 
        isActive: true, 
        status: 'Pending', 
        createdAt: new Date().toISOString(),
        lastLogin: null
      };

      localStorage.setItem('grids_users', JSON.stringify([...storedUsers, newUserRecord]));
      recordAuditLog(null, 'USER_REGISTERED', `New account registration initiated for ${regData.email} (${regData.role})`, 'User Management');

      const notifications = JSON.parse(localStorage.getItem('grids_notifications') || '[]');
      const newNotification: Notification = {
        id: `regnotif-${Date.now()}`,
        title: 'New Account Registered',
        message: `${regData.firstName} ${regData.lastName} has been added to the registry as ${regData.role}. Approval required.`,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: false,
        department: regData.office || 'System',
        targetUrl: '/user-management'
      };
      localStorage.setItem('grids_notifications', JSON.stringify([newNotification, ...notifications]));

      setIsProcessing(false);
      setRegStep(3);
      window.dispatchEvent(new Event('storage'));
    }, 1500);
  };

  const StepIndicator = ({ num, title, desc, active }: { num: number, title: string, desc: string, active: boolean }) => (
    <div className={`flex items-start gap-4 transition-all duration-500 ${active ? 'opacity-100 scale-100' : 'opacity-30 scale-95'}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black transition-all border-[2px]
        ${active ? 'bg-white border-white text-purple-900 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'bg-transparent border-white text-white'}`}>
        {num}
      </div>
      <div>
        <h4 className="text-white text-lg font-black uppercase tracking-tight leading-none mb-0.5">{title}</h4>
        <p className="text-white/70 text-[8px] font-bold uppercase tracking-[0.2em] leading-tight">{desc}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-[#E5D1F8] flex flex-col items-center justify-center p-4 md:p-8 font-sans selection:bg-purple-100 selection:text-purple-900 overflow-y-auto custom-scrollbar">
      <div className="w-full max-w-7xl min-h-[600px] lg:h-[85vh] bg-[#FBF6FF] rounded-[48px] shadow-[0_40px_80px_rgba(75,0,130,0.1)] overflow-hidden flex flex-col lg:flex-row relative border-[10px] border-white/50 shrink-0 my-auto">
        
        <button 
          onClick={() => navigate('/')}
          className="absolute top-8 right-8 z-50 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-black hover:scale-110 active:scale-95 transition-all border border-gray-100"
          title="Return to Dashboard"
        >
          <X size={24} strokeWidth={4} />
        </button>

        <div className="w-full lg:w-[42%] relative bg-purple-900 overflow-hidden flex flex-col p-10 lg:p-16 flex-shrink-0">
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2026&auto=format&fit=crop" 
            alt="Baguio" 
            className="absolute inset-0 w-full h-full object-cover opacity-60" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-950 via-purple-900/40 to-transparent"></div>
          
          <div className="relative z-10 flex flex-col h-full overflow-hidden">
            <div className="mb-8 text-white/50 font-black text-[9px] uppercase tracking-[0.4em] flex items-center gap-3">
              <div className="w-8 h-0.5 bg-white/20"></div>
              City of Baguio
            </div>
            
            <div className="max-w-md mb-8">
              <h2 className="text-white text-3xl lg:text-[38px] font-black mb-4 uppercase tracking-tighter leading-[0.95] drop-shadow-lg">
                For gender equality to be real, it must benefit everyone.
              </h2>
              <p className="text-white/70 text-xs font-medium leading-relaxed max-w-xs">
                Phumzile Mlambo-Ngcuka
              </p>
            </div>

            {isRegistering && (
              <div className="mt-auto space-y-8 animate-in fade-in slide-in-from-left-6 duration-700">
                <StepIndicator num={1} title="Select Role" desc="SETUP ACCOUNT ROLE" active={regStep === 1} />
                <StepIndicator num={2} title="Information" desc="PERSONAL REGISTRY" active={regStep === 2} />
                <StepIndicator num={3} title="Finish" desc="APPROVAL QUEUE" active={regStep === 3} />
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 p-6 lg:p-10 xl:p-14 flex flex-col items-center justify-center relative bg-[#FBF6FF] overflow-hidden">
          
          <div className="mb-8 transform transition-transform hover:scale-105 duration-500 flex-shrink-0">
            <LogoWithMotto size="md" />
          </div>

          <div className="w-full max-w-lg flex flex-col items-center flex-1 justify-center">
            {!isRegistering ? (
              <div className="w-full animate-in fade-in duration-500">
                <div className="text-center mb-6">
                  <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-1 leading-none">Welcome Back</h2>
                  <p className="text-gray-400 text-[8px] font-black uppercase tracking-[0.4em]">Authentication Portal</p>
                </div>

                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-[9px] font-black uppercase tracking-widest text-gray-400 px-6">Email Address</label>
                    <input 
                      type="email" 
                      value={loginEmail} 
                      onChange={e => setLoginEmail(e.target.value)} 
                      className="w-full px-8 py-3.5 bg-white border border-purple-100/50 rounded-[32px] text-xs font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-600/5 transition-all shadow-sm"
                      placeholder="e.g. user@baguio.gov.ph"
                      required 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[9px] font-black uppercase tracking-widest text-gray-400 px-6">Password</label>
                    <input 
                      type="password" 
                      value={loginPassword} 
                      onChange={e => setLoginPassword(e.target.value)} 
                      className="w-full px-8 py-3.5 bg-white border border-purple-100/50 rounded-[32px] text-xs font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-600/5 transition-all shadow-sm"
                      placeholder="••••••••"
                      required 
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3 pt-1">
                    <button 
                      type="submit" 
                      disabled={isProcessing}
                      className="w-full py-4 bg-black text-white rounded-[32px] font-black uppercase text-[10px] tracking-[0.4em] hover:bg-purple-600 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 disabled:bg-gray-400"
                    >
                      {isProcessing ? <Loader2 className="animate-spin w-4 h-4" /> : <><LogIn size={16} strokeWidth={3} /> Login</>}
                    </button>
                    
                    <button 
                      type="button"
                      onClick={handleSSO}
                      disabled={isProcessing}
                      className="w-full py-4 bg-white border-2 border-gray-900 text-gray-900 rounded-[32px] font-black uppercase text-[10px] tracking-[0.4em] hover:bg-gray-50 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Shield size={16} className="text-purple-600" /> Sign in with City ID
                    </button>
                  </div>

                  <div className="pt-4 flex flex-col items-center gap-4">
                    <button type="button" onClick={() => setIsRegistering(true)} className="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-purple-600 transition-all">
                      New to GRIDS? <span className="underline decoration-2 underline-offset-4">Create Account</span>
                    </button>
                    <div className="flex items-center gap-4 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                      <BaguioLogo />
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center justify-center">
                {regStep === 1 && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center w-full">
                    <div className="text-center mb-8">
                      <h2 className="text-5xl font-black text-gray-900 uppercase tracking-tighter mb-2 leading-none">Select Role</h2>
                      <p className="text-gray-400 text-sm font-medium tracking-tight">Setup your account access.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full">
                      <button 
                        onClick={() => setRegData({...regData, role: 'Data Provider'})}
                        className={`flex-1 group h-40 rounded-[32px] border-[4px] flex flex-col items-center justify-center gap-3 transition-all shadow-lg p-4
                          ${regData.role === 'Data Provider' ? 'bg-white border-black scale-105 shadow-xl' : 'bg-white/5 border-transparent opacity-60 hover:opacity-100 hover:bg-white'}`}
                      >
                        <div className={`p-4 rounded-[20px] transition-colors ${regData.role === 'Data Provider' ? 'bg-black text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-purple-50 group-hover:text-purple-600'}`}>
                          <FileText size={32} strokeWidth={2.5} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">Provider</span>
                      </button>
                      
                      <button 
                        onClick={() => setRegData({...regData, role: 'Data Reviewer'})}
                        className={`flex-1 group h-40 rounded-[32px] border-[4px] flex flex-col items-center justify-center gap-3 transition-all shadow-lg p-4
                          ${regData.role === 'Data Reviewer' ? 'bg-white border-black scale-105 shadow-xl' : 'bg-white/5 border-transparent opacity-60 hover:opacity-100 hover:bg-white'}`}
                      >
                        <div className={`p-4 rounded-[20px] transition-colors ${regData.role === 'Data Reviewer' ? 'bg-black text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-purple-50 group-hover:text-purple-600'}`}>
                          <FileSearch size={32} strokeWidth={2.5} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">Reviewer</span>
                      </button>
                    </div>

                    <button 
                      onClick={() => setRegStep(2)}
                      className="w-full py-4 bg-black text-white rounded-[32px] font-black uppercase text-[10px] tracking-[0.4em] hover:bg-purple-600 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
                    >
                      Continue <ChevronRight size={16} strokeWidth={3} />
                    </button>
                  </div>
                )}

                {regStep === 2 && (
                  <div className="animate-in fade-in slide-in-from-right-6 duration-500 w-full">
                    <div className="text-center mb-6">
                      <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-1 leading-none">Personal Info</h2>
                      <p className="text-gray-400 text-[10px] font-medium tracking-tight">Complete your profile details.</p>
                    </div>

                    <form onSubmit={handleRegisterFinalize} className="space-y-2.5">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-0.5">
                          <label className="block text-[8px] font-black uppercase tracking-widest text-gray-500 px-4">First Name</label>
                          <input type="text" placeholder="First Name" value={regData.firstName} onChange={e => setRegData({...regData, firstName: e.target.value})} className="w-full px-5 py-2 bg-[#F4ECFF] border-2 border-white rounded-[20px] text-[11px] font-bold focus:outline-none transition-all" required />
                        </div>
                        <div className="space-y-0.5">
                          <label className="block text-[8px] font-black uppercase tracking-widest text-gray-500 px-4">Last Name</label>
                          <input type="text" placeholder="Last Name" value={regData.lastName} onChange={e => setRegData({...regData, lastName: e.target.value})} className="w-full px-5 py-2 bg-[#F4ECFF] border-2 border-white rounded-[20px] text-[11px] font-bold focus:outline-none transition-all" required />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-0.5">
                          <label className="block text-[8px] font-black uppercase tracking-widest text-gray-500 px-4">Email Address</label>
                          <input type="email" placeholder="Email" value={regData.email} onChange={e => setRegData({...regData, email: e.target.value})} className="w-full px-5 py-2 bg-[#F4ECFF] border-2 border-white rounded-[20px] text-[11px] font-bold focus:outline-none transition-all" required />
                        </div>
                        <div className="space-y-0.5">
                          <label className="block text-[8px] font-black uppercase tracking-widest text-gray-500 px-4">Phone Number</label>
                          <input type="tel" placeholder="09XXXXXXXXX" value={regData.phone} onChange={e => setRegData({...regData, phone: e.target.value})} className="w-full px-5 py-2 bg-[#F4ECFF] border-2 border-white rounded-[20px] text-[11px] font-bold focus:outline-none transition-all" required />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-0.5">
                          <label className="block text-[8px] font-black uppercase tracking-widest text-gray-500 px-4">Office / Barangay</label>
                          <input type="text" placeholder="CPDSO / Brgy" value={regData.office} onChange={e => setRegData({...regData, office: e.target.value})} className="w-full px-5 py-2 bg-[#F4ECFF] border-2 border-white rounded-[20px] text-[11px] font-bold focus:outline-none transition-all" required />
                        </div>
                        <div className="space-y-0.5">
                          <label className="block text-[8px] font-black uppercase tracking-widest text-gray-500 px-4">Birthdate</label>
                          <input type="date" value={regData.birthdate} onChange={e => setRegData({...regData, birthdate: e.target.value})} className="w-full px-5 py-2 bg-[#F4ECFF] border-2 border-white rounded-[20px] text-[11px] font-bold focus:outline-none transition-all" required />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-0.5">
                          <label className="block text-[8px] font-black uppercase tracking-widest text-gray-500 px-4">Password</label>
                          <div className="relative">
                            <input type={showPassword ? "text" : "password"} placeholder="Password" value={regData.password} onChange={e => setRegData({...regData, password: e.target.value})} className="w-full px-5 py-2 bg-[#F4ECFF] border-2 border-white rounded-[20px] text-[11px] font-bold focus:outline-none transition-all" required />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                              {showPassword ? <EyeOff size={12} /> : <Eye size={12} />}
                            </button>
                          </div>
                        </div>
                        <div className="space-y-0.5">
                          <label className="block text-[8px] font-black uppercase tracking-widest text-gray-500 px-4">Confirm</label>
                          <div className="relative">
                            <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm" value={regData.confirmPassword} onChange={e => setRegData({...regData, confirmPassword: e.target.value})} className="w-full px-5 py-2 bg-[#F4ECFF] border-2 border-white rounded-[20px] text-[11px] font-bold focus:outline-none transition-all" required />
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                              {showConfirmPassword ? <EyeOff size={12} /> : <Eye size={12} />}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 px-4 py-0.5">
                        <input type="checkbox" id="terms" className="w-3 h-3 rounded border-purple-200 text-purple-600 focus:ring-purple-500 cursor-pointer" required />
                        <label htmlFor="terms" className="text-[8px] font-bold text-gray-500 cursor-pointer uppercase tracking-widest">Agree to terms and privacy.</label>
                      </div>

                      <div className="pt-1">
                        <button 
                          type="submit" 
                          disabled={isProcessing}
                          className="w-full py-3 bg-[#4B4B52] text-white rounded-[28px] font-black uppercase text-[10px] tracking-[0.4em] hover:bg-black transition-all shadow-lg active:scale-95 disabled:bg-gray-400 flex items-center justify-center gap-2"
                        >
                          {isProcessing ? <Loader2 className="animate-spin w-4 h-4" /> : 'Sign Up'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {regStep === 3 && (
                  <div className="animate-in zoom-in-95 duration-500 flex flex-col items-center justify-center py-6">
                    <div className="text-center mb-6">
                      <h2 className="text-5xl font-black text-gray-900 uppercase tracking-tighter mb-2 leading-none">Well Done!</h2>
                      <p className="text-gray-500 text-lg font-medium tracking-tight leading-tight">
                        Kindly wait for Verification.
                      </p>
                    </div>

                    <div className="relative group mb-8">
                      <div className="absolute inset-0 bg-purple-100 rounded-full blur-xl opacity-40"></div>
                      <div className="relative w-32 h-32 rounded-full border-[6px] border-dashed border-gray-900 flex items-center justify-center animate-[spin_12s_linear_infinite]">
                        <RotateCw size={48} className="text-gray-900" strokeWidth={3} />
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => { setIsRegistering(false); setRegStep(1); }}
                      className="px-10 py-3.5 bg-black text-white rounded-full font-black uppercase text-[10px] tracking-[0.3em] hover:bg-purple-600 transition-all shadow-lg active:scale-95"
                    >
                      Back to Login
                    </button>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-purple-100/50 flex flex-col items-center gap-4 w-full flex-shrink-0">
                  <button type="button" onClick={() => { setIsRegistering(false); setRegStep(1); }} className="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-purple-600 transition-all">
                    Already have an account? <span className="underline decoration-2 underline-offset-4 decoration-purple-200">Login</span>
                  </button>
                  <div className="flex items-center gap-4 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer">
                    <BaguioLogo />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-8 w-full flex justify-center">
        <Footer isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default Landing;
