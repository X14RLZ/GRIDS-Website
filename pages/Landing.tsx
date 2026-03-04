
import React, { useState } from 'react';
import { Logo, BaguioLogo } from '../components/Logo';
import { User, UserRole, Notification } from '../types';
import { 
  Mail, Lock, User as UserIcon, Building2, 
  Loader2, UserPlus, LogIn, ChevronRight, Eye, EyeOff,
  FileText, FileSearch, RotateCw, CheckCircle2, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
          setIsProcessing(false);
          return;
        }
        if (matchedUser.status === 'Suspended' || matchedUser.isActive === false) {
          alert('Your account is inactive or suspended. Please contact the administrator.');
          setIsProcessing(false);
          return;
        }
        onLogin(matchedUser);
        navigate('/');
      } else {
        alert('Invalid credentials');
        setIsProcessing(false);
      }
    }, 1000);
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

      // UML COMPLIANT DATABASE INSERT
      const { confirmPassword, password, phone, ...rest } = regData;
      
      const newUserId = `u_reg_${Date.now().toString().slice(-6)}`;
      
      const newUserRecord = { 
        ...rest, 
        userId: newUserId,
        roleId: mapRoleToId(regData.role), // Added for SQL Seed compatibility
        username: regData.email.split('@')[0],
        password: password, 
        passwordHash: 'PBKDF2_SIMULATED', 
        contactInfo: phone, 
        isActive: true, 
        status: 'Pending', 
        createdAt: new Date().toISOString(),
        lastLogin: null
      };

      // COMMIT TO DATABASE (LocalStorage simulated Seed.sql)
      localStorage.setItem('grids_users', JSON.stringify([...storedUsers, newUserRecord]));

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
    <div className={`flex items-start gap-5 transition-all duration-500 ${active ? 'opacity-100 scale-100' : 'opacity-30 scale-95'}`}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-black transition-all border-[3px]
        ${active ? 'bg-white border-white text-purple-900 shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-transparent border-white text-white'}`}>
        {num}
      </div>
      <div>
        <h4 className="text-white text-xl font-black uppercase tracking-tight leading-none mb-1">{title}</h4>
        <p className="text-white/70 text-[10px] font-bold uppercase tracking-[0.2em] leading-tight">{desc}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-[#E5D1F8] flex items-center justify-center p-4 md:p-12 font-sans selection:bg-purple-100 selection:text-purple-900">
      <div className="w-full max-w-7xl bg-[#FBF6FF] rounded-[64px] shadow-[0_50px_100px_rgba(75,0,130,0.12)] overflow-hidden flex flex-col lg:flex-row min-h-[850px] relative border-[12px] border-white/50">
        
        <button 
          onClick={() => navigate('/')}
          className="absolute top-10 right-10 z-50 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-400 hover:text-black hover:scale-110 active:scale-95 transition-all"
          title="Return to Dashboard"
        >
          <X size={28} strokeWidth={3} />
        </button>

        <div className="w-full lg:w-[45%] relative bg-purple-900 overflow-hidden flex flex-col p-12 lg:p-20">
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2026&auto=format&fit=crop" 
            alt="Baguio" 
            className="absolute inset-0 w-full h-full object-cover opacity-60" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-950 via-purple-900/40 to-transparent"></div>
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="mb-12 text-white/50 font-black text-[10px] uppercase tracking-[0.5em] flex items-center gap-4">
              <div className="w-10 h-0.5 bg-white/20"></div>
              City of Baguio
            </div>
            
            <div className="max-w-md mb-20">
              <h2 className="text-white text-4xl lg:text-[52px] font-black mb-8 uppercase tracking-tighter leading-[0.95] drop-shadow-xl">
                For gender equality to be real, it must benefit both men and women, boys and girls— making life better for everyone.
              </h2>
              <p className="text-white/70 text-sm italic font-medium leading-relaxed max-w-xs">
                Phumzile Mlambo-Ngcuka (Former Executive Director of UN Women)
              </p>
            </div>

            {isRegistering && (
              <div className="mt-auto space-y-12 animate-in fade-in slide-in-from-left-8 duration-700">
                <StepIndicator num={1} title="Select Role" desc="Please, select you role for your account." active={regStep === 1} />
                <StepIndicator num={2} title="Personal Information" desc="Fill up the required information." active={regStep === 2} />
                <StepIndicator num={3} title="Finish" desc="Wait for Approval and Verification of your Account" active={regStep === 3} />
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 p-8 lg:p-20 flex flex-col items-center justify-center relative bg-[#FBF6FF]">
          
          <div className="mb-16 transform transition-transform hover:scale-105 duration-500">
            <Logo size="md" />
          </div>

          <div className="w-full max-w-xl flex flex-col items-center">
            {!isRegistering ? (
              <div className="w-full animate-in fade-in duration-500">
                <div className="text-center mb-12">
                  <h2 className="text-6xl font-black text-gray-900 uppercase tracking-tighter mb-3 leading-none">Welcome Back</h2>
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.5em]">Authentication Portal</p>
                </div>

                <form onSubmit={handleSignIn} className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 px-8">Email Address</label>
                    <input 
                      type="email" 
                      value={loginEmail} 
                      onChange={e => setLoginEmail(e.target.value)} 
                      className="w-full px-10 py-5 bg-white border border-purple-100/50 rounded-[40px] text-sm font-bold text-gray-900 focus:outline-none focus:ring-8 focus:ring-purple-600/5 transition-all shadow-sm"
                      placeholder="e.g. user@baguio.gov.ph"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 px-8">Password</label>
                    <input 
                      type="password" 
                      value={loginPassword} 
                      onChange={e => setLoginPassword(e.target.value)} 
                      className="w-full px-10 py-5 bg-white border border-purple-100/50 rounded-[40px] text-sm font-bold text-gray-900 focus:outline-none focus:ring-8 focus:ring-purple-600/5 transition-all shadow-sm"
                      placeholder="••••••••"
                      required 
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isProcessing}
                    className="w-full py-6 bg-black text-white rounded-[40px] font-black uppercase text-xs tracking-[0.4em] hover:bg-purple-600 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3 disabled:bg-gray-400 mt-4"
                  >
                    {isProcessing ? <Loader2 className="animate-spin" /> : <><LogIn size={20} strokeWidth={3} /> Login</>}
                  </button>

                  <div className="pt-8 flex flex-col items-center gap-6">
                    <button type="button" onClick={() => setIsRegistering(true)} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-purple-600 transition-all">
                      New to GRIDS? <span className="underline decoration-2 underline-offset-4">Create Account</span>
                    </button>
                    <div className="flex items-center gap-6 opacity-30 grayscale group hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                      <BaguioLogo />
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center">
                {regStep === 1 && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center w-full">
                    <div className="text-center mb-16">
                      <h2 className="text-7xl font-black text-gray-900 uppercase tracking-tighter mb-4 leading-none">Select Role</h2>
                      <p className="text-gray-400 text-lg font-medium tracking-tight">Let's continue to setup your account.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-8 mb-16 w-full px-4">
                      <button 
                        onClick={() => setRegData({...regData, role: 'Data Provider'})}
                        className={`flex-1 group h-64 rounded-[48px] border-[6px] flex flex-col items-center justify-center gap-6 transition-all shadow-xl p-8
                          ${regData.role === 'Data Provider' ? 'bg-white border-black scale-105 shadow-2xl' : 'bg-white/5 border-transparent opacity-60 hover:opacity-100 hover:bg-white hover:scale-[1.02]'}`}
                      >
                        <div className={`p-6 rounded-[32px] transition-colors ${regData.role === 'Data Provider' ? 'bg-black text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-purple-50 group-hover:text-purple-600'}`}>
                          <FileText size={48} strokeWidth={2.5} />
                        </div>
                        <span className="text-sm font-black uppercase tracking-widest text-gray-900">Data Provider</span>
                      </button>
                      
                      <button 
                        onClick={() => setRegData({...regData, role: 'Data Reviewer'})}
                        className={`flex-1 group h-64 rounded-[48px] border-[6px] flex flex-col items-center justify-center gap-6 transition-all shadow-xl p-8
                          ${regData.role === 'Data Reviewer' ? 'bg-white border-black scale-105 shadow-2xl' : 'bg-white/5 border-transparent opacity-60 hover:opacity-100 hover:bg-white hover:scale-[1.02]'}`}
                      >
                        <div className={`p-6 rounded-[32px] transition-colors ${regData.role === 'Data Reviewer' ? 'bg-black text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-purple-50 group-hover:text-purple-600'}`}>
                          <FileSearch size={48} strokeWidth={2.5} />
                        </div>
                        <span className="text-sm font-black uppercase tracking-widest text-gray-900">Data Reviewer</span>
                      </button>
                    </div>

                    <button 
                      onClick={() => setRegStep(2)}
                      className="w-full max-sm py-6 bg-black text-white rounded-[40px] font-black uppercase text-xs tracking-[0.4em] hover:bg-purple-600 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3"
                    >
                      Continue <ChevronRight size={18} strokeWidth={3} />
                    </button>
                  </div>
                )}

                {regStep === 2 && (
                  <div className="animate-in fade-in slide-in-from-right-8 duration-500 w-full">
                    <div className="text-center mb-12">
                      <h2 className="text-6xl font-black text-gray-900 uppercase tracking-tighter mb-3 leading-none">Personal Information</h2>
                      <p className="text-gray-400 text-sm font-medium tracking-tight">Fill up the required information.</p>
                    </div>

                    <form onSubmit={handleRegisterFinalize} className="space-y-5">
                      <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 px-6">First Name</label>
                          <input type="text" placeholder="Enter your First Name" value={regData.firstName} onChange={e => setRegData({...regData, firstName: e.target.value})} className="w-full px-8 py-4.5 bg-[#F4ECFF] border-2 border-white rounded-[24px] text-sm font-bold placeholder:text-gray-300 focus:outline-none focus:border-purple-200 transition-all" required />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 px-6">Last Name</label>
                          <input type="text" placeholder="Enter your Last Name" value={regData.lastName} onChange={e => setRegData({...regData, lastName: e.target.value})} className="w-full px-8 py-4.5 bg-[#F4ECFF] border-2 border-white rounded-[24px] text-sm font-bold placeholder:text-gray-300 focus:outline-none focus:border-purple-200 transition-all" required />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 px-6">Email Address</label>
                        <input type="email" placeholder="Enter your Email Address" value={regData.email} onChange={e => setRegData({...regData, email: e.target.value})} className="w-full px-8 py-4.5 bg-[#F4ECFF] border-2 border-white rounded-[24px] text-sm font-bold placeholder:text-gray-300 focus:outline-none focus:border-purple-200 transition-all" required />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 px-6">Office / Barangay</label>
                        <input type="text" placeholder="e.g. CPDSO / Barangay Irisan" value={regData.office} onChange={e => setRegData({...regData, office: e.target.value})} className="w-full px-8 py-4.5 bg-[#F4ECFF] border-2 border-white rounded-[24px] text-sm font-bold placeholder:text-gray-300 focus:outline-none focus:border-purple-200 transition-all" required />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 px-6">Password</label>
                        <div className="relative">
                          <input type={showPassword ? "text" : "password"} placeholder="Enter a password" value={regData.password} onChange={e => setRegData({...regData, password: e.target.value})} className="w-full px-8 py-4.5 bg-[#F4ECFF] border-2 border-white rounded-[24px] text-sm font-bold placeholder:text-gray-300 focus:outline-none focus:border-purple-200 transition-all" required />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors">
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 px-6">Confirm Password</label>
                        <div className="relative">
                          <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm your password" value={regData.confirmPassword} onChange={e => setRegData({...regData, confirmPassword: e.target.value})} className="w-full px-8 py-4.5 bg-[#F4ECFF] border-2 border-white rounded-[24px] text-sm font-bold placeholder:text-gray-300 focus:outline-none focus:border-purple-200 transition-all" required />
                          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors">
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 px-6 py-4">
                        <input type="checkbox" id="terms" className="w-5 h-5 rounded-lg border-purple-200 text-purple-600 focus:ring-purple-500 cursor-pointer" required />
                        <label htmlFor="terms" className="text-[11px] font-bold text-gray-500 cursor-pointer">I agree to the <span className="text-purple-600 underline">terms of service</span> and <span className="text-purple-600 underline">privacy policy</span>.</label>
                      </div>

                      <div className="pt-4 space-y-4">
                        <button 
                          type="submit" 
                          disabled={isProcessing}
                          className="w-full py-6 bg-[#4B4B52] text-white rounded-[32px] font-black uppercase text-xs tracking-[0.4em] hover:bg-black transition-all shadow-xl active:scale-95 disabled:bg-gray-400 flex items-center justify-center gap-3"
                        >
                          {isProcessing ? <Loader2 className="animate-spin" /> : 'Sign Up'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {regStep === 3 && (
                  <div className="animate-in zoom-in-95 duration-500 flex flex-col items-center py-20">
                    <div className="text-center mb-16">
                      <h2 className="text-8xl font-black text-gray-900 uppercase tracking-tighter mb-6 leading-none">Well Done!</h2>
                      <p className="text-gray-500 text-2xl font-medium tracking-tight max-w-sm mx-auto leading-relaxed">
                        Kindly wait for Approval and Verification of your Account :)
                      </p>
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-0 bg-purple-100 rounded-full blur-2xl group-hover:blur-3xl transition-all opacity-40"></div>
                      <div className="relative w-56 h-56 rounded-full border-[10px] border-dashed border-gray-900 flex items-center justify-center mb-16 animate-[spin_12s_linear_infinite]">
                        <RotateCw size={96} className="text-gray-900" strokeWidth={3} />
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => { setIsRegistering(false); setRegStep(1); }}
                      className="px-16 py-5 bg-black text-white rounded-full font-black uppercase text-xs tracking-[0.4em] hover:bg-purple-600 transition-all shadow-xl active:scale-95"
                    >
                      Return to Login
                    </button>
                  </div>
                )}

                <div className="mt-16 pt-10 border-t border-purple-100/50 flex flex-col items-center gap-8 w-full">
                  <button type="button" onClick={() => { setIsRegistering(false); setRegStep(1); }} className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-purple-600 transition-all">
                    Already have an account? <span className="underline decoration-2 underline-offset-4 decoration-purple-200">Login</span>
                  </button>
                  <div className="flex items-center gap-6 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer">
                    <BaguioLogo />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
