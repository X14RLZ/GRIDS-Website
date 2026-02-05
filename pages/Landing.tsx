
import React, { useState, useEffect, useRef } from 'react';
import { Logo } from '../components/Logo';
import { User, UserRole } from '../types';
import { 
  EyeOff, CheckCircle2, UserCheck, ShieldCheck, ArrowRight, Eye, X, Mail, Lock, 
  User as UserIcon, Calendar, Phone, Building2, PhoneCall, ChevronUp, ChevronDown, Check, AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LandingProps {
  onLogin: (user: User) => void;
  onCancel?: () => void;
}

const InputWrapper = ({ label, children, icon: Icon, rightElement, error }: any) => (
  <div className="w-full space-y-2">
    <div className="flex justify-between items-center px-6">
      <label className={`block text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${error ? 'text-red-500' : 'text-gray-400'}`}>
        {label}
      </label>
    </div>
    <div className="relative group">
      {Icon && (
        <div className={`absolute left-7 top-1/2 -translate-y-1/2 transition-colors duration-300 ${error ? 'text-red-400' : 'text-gray-300 group-focus-within:text-purple-600'}`}>
          <Icon size={18} strokeWidth={2.5} />
        </div>
      )}
      {children}
      {rightElement && (
        <div className="absolute right-6 top-1/2 -translate-y-1/2">
          {rightElement}
        </div>
      )}
    </div>
  </div>
);

const sharedInputClass = "w-full pl-16 pr-14 py-5 bg-white border border-gray-100 rounded-[28px] text-sm font-bold text-gray-900 focus:outline-none focus:ring-8 focus:ring-purple-600/5 focus:border-purple-600/30 focus:shadow-2xl transition-all placeholder:text-gray-300 shadow-sm cursor-text";

const AuthLayout = ({ children, leftContent, step, onNavigateBack }: any) => (
  <div className="min-h-screen w-full bg-[#fdf8ff] flex items-center justify-center p-4 md:p-8 relative overflow-x-hidden">
    <button 
      onClick={onNavigateBack}
      className="absolute top-6 right-6 md:top-10 md:right-10 p-3 md:p-4 bg-white rounded-full shadow-lg text-gray-400 hover:text-purple-600 transition-all z-50 active:scale-95 flex items-center gap-2 group border border-purple-50"
      title="Return to Dashboard"
    >
      <span className="hidden md:inline text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Return Home</span>
      <X size={20} />
    </button>

    <div className="w-full max-w-6xl bg-white rounded-[56px] shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[800px] transition-all duration-500 border border-gray-100">
      <div className="hidden lg:flex lg:w-1/2 relative bg-purple-900 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2026&auto=format&fit=crop" 
          alt="Baguio Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent"></div>
        <div className="relative z-10 p-20 flex flex-col justify-end h-full">
          <div className="mb-8 h-px w-24 bg-white/50"></div>
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            {leftContent?.title || "Development is not sustainable if it is not fair and inclusive—and gender equality is central to fairness and inclusiveness."}
          </h2>
          <p className="text-white/70 italic text-lg">
            — {leftContent?.author || "Michelle Bachelet (Former Executive Director of UN Women)"}
          </p>
          {step !== 'login' && (
            <div className="mt-12 space-y-6">
              {[
                { id: 'role', label: 'Select Role' },
                { id: 'personal', label: 'Personal Information' },
                { id: 'finish', label: 'Finish' }
              ].map((s, idx) => {
                const isActive = step === s.id;
                const isPast = (step === 'personal' && s.id === 'role') || (step === 'finish');
                return (
                  <div key={s.id} className={`flex items-center gap-6 transition-colors duration-300 ${isActive || isPast ? 'text-white' : 'text-white/40'}`}>
                    <div className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center font-black transition-all ${isActive || isPast ? 'border-purple-400 bg-purple-400 scale-110 shadow-lg shadow-purple-900' : 'border-white/20'}`}>
                      {isPast && s.id !== step ? '✓' : idx + 1}
                    </div>
                    <span className="font-black text-sm uppercase tracking-widest">{s.label}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col items-center justify-center bg-white relative">
        <div className="mb-10">
          <Logo size="md" />
        </div>
        {children}
      </div>
    </div>
  </div>
);

const ScrollPicker: React.FC<{
  options: number[] | string[];
  value: string | number;
  onChange: (val: any) => void;
  label: string;
}> = ({ options, value, onChange, label }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col items-center w-full">
      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">{label}</span>
      <div className="relative w-full h-40 bg-gray-50 rounded-2xl overflow-hidden group">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-10 bg-purple-600/10 border-y border-purple-100 z-0"></div>
        <div 
          ref={scrollRef}
          className="absolute inset-0 overflow-y-auto custom-scrollbar flex flex-col items-center z-10 py-14"
        >
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              className={`w-full py-2 text-center text-sm font-black transition-all duration-300
                ${value == opt ? 'text-purple-600 scale-125' : 'text-gray-300 hover:text-gray-600'}`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Landing: React.FC<LandingProps> = ({ onLogin, onCancel }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'login' | 'role' | 'personal' | 'finish'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showConfirmRegPassword, setShowConfirmRegPassword] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthdate: '',
    phone: '',
    office: '',
    landline: ''
  });

  const [errors, setErrors] = useState<string[]>([]);

  const [tempDate, setTempDate] = useState({
    day: 1,
    month: 'January',
    year: 1999
  });

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      firstName: 'User',
      lastName: '',
      email: email,
      role: 'Administrator',
      office: 'CPDSO',
      phone: '',
      birthdate: ''
    });
    navigate('/', { replace: true });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors.includes(name)) {
      setErrors(errors.filter(err => err !== name));
    }
  };

  const handleSignUp = () => {
    const requiredFields = ['firstName', 'lastName', 'birthdate', 'phone', 'office', 'email', 'password', 'confirmPassword'];
    const newErrors = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    if (formData.password !== formData.confirmPassword) return;
    setStep('finish');
  };

  const passwordsMatch = formData.password.length > 0 && formData.password === formData.confirmPassword;
  const showPasswordError = formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword;
  const showPasswordMatch = formData.confirmPassword.length > 0 && formData.password === formData.confirmPassword;

  const handleSetDate = () => {
    const formattedDate = `${tempDate.month} ${tempDate.day}, ${tempDate.year}`;
    setFormData({ ...formData, birthdate: formattedDate });
    if (errors.includes('birthdate')) {
      setErrors(errors.filter(err => err !== 'birthdate'));
    }
    setShowDatePicker(false);
  };

  const getFieldClass = (fieldName: string) => {
    const hasError = errors.includes(fieldName);
    return `${sharedInputClass} ${hasError ? 'border-red-500 ring-8 ring-red-500/5' : ''}`;
  };

  const navigateToDashboard = () => navigate('/');

  if (step === 'login') {
    return (
      <AuthLayout step={step} onNavigateBack={navigateToDashboard}>
        <div className="w-full max-w-md text-center animate-in fade-in slide-in-from-right-4 duration-500">
          <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter uppercase">Welcome Back!</h2>
          <p className="text-gray-400 mb-12 text-sm font-bold uppercase tracking-widest opacity-60">Authentication Required</p>
          
          <form onSubmit={handleSignIn} className="space-y-8 text-left">
            <InputWrapper label="Email Address" icon={Mail}>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={sharedInputClass}
                placeholder="Enter your email (e.g. name@example.com)"
                required
              />
            </InputWrapper>
            
            <InputWrapper 
              label="Password" 
              icon={Lock}
              rightElement={
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-300 hover:text-purple-600 transition-colors p-2"
                >
                  {showPassword ? <Eye size={20} strokeWidth={2.5} /> : <EyeOff size={20} strokeWidth={2.5} />}
                </button>
              }
            >
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={sharedInputClass}
                placeholder="Enter your security password"
                required
              />
            </InputWrapper>

            <div className="flex justify-end px-4">
              <button type="button" className="text-[10px] text-purple-600 font-black uppercase hover:underline tracking-widest">Forgot Password?</button>
            </div>

            <button type="submit" className="w-full py-6 bg-black text-white rounded-[28px] font-black uppercase tracking-[0.3em] hover:bg-purple-600 transition-all shadow-2xl shadow-purple-950/10 active:scale-[0.98] text-[11px] mt-4">
              Sign In to Grids
            </button>
          </form>

          <p className="mt-14 text-xs text-gray-500 font-bold uppercase tracking-widest">
            New here? <button onClick={() => setStep('role')} className="text-purple-600 font-black hover:underline ml-2">Request Access</button>
          </p>
        </div>
      </AuthLayout>
    );
  }

  if (step === 'role') {
    return (
      <AuthLayout step={step} onNavigateBack={navigateToDashboard} leftContent={{ title: "For gender equality to be real...", author: "Phumzile Mlambo-Ngcuka" }}>
        <div className="w-full max-w-md text-center animate-in fade-in slide-in-from-right-4 duration-300">
          <h2 className="text-4xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Select Role</h2>
          <p className="text-gray-400 mb-12 text-sm font-bold uppercase tracking-widest opacity-60">Choose Account Type</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            <button 
              onClick={() => setSelectedRole('Data Provider')}
              className={`p-10 rounded-[40px] border-2 transition-all flex flex-col items-center gap-6 active:scale-95 group ${selectedRole === 'Data Provider' ? 'border-purple-600 bg-purple-50 shadow-2xl shadow-purple-900/5' : 'border-gray-100 hover:border-purple-100 bg-white'}`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all ${selectedRole === 'Data Provider' ? 'bg-purple-600 border-purple-600 text-white shadow-lg' : 'bg-gray-50 border-transparent text-gray-400 group-hover:bg-white group-hover:border-purple-100 group-hover:text-purple-600'}`}>
                <UserCheck size={28} strokeWidth={2.5} />
              </div>
              <span className="font-black text-gray-900 text-[10px] uppercase tracking-[0.2em]">Provider</span>
            </button>
            <button 
              onClick={() => setSelectedRole('Data Reviewer')}
              className={`p-10 rounded-[40px] border-2 transition-all flex flex-col items-center gap-6 active:scale-95 group ${selectedRole === 'Data Reviewer' ? 'border-purple-600 bg-purple-50 shadow-2xl shadow-purple-900/5' : 'border-gray-100 hover:border-purple-100 bg-white'}`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all ${selectedRole === 'Data Reviewer' ? 'bg-purple-600 border-purple-600 text-white shadow-lg' : 'bg-gray-50 border-transparent text-gray-400 group-hover:bg-white group-hover:border-purple-100 group-hover:text-purple-600'}`}>
                <ShieldCheck size={28} strokeWidth={2.5} />
              </div>
              <span className="font-black text-gray-900 text-[10px] uppercase tracking-[0.2em]">Reviewer</span>
            </button>
          </div>

          <button 
            disabled={!selectedRole}
            onClick={() => setStep('personal')}
            className="w-full py-6 bg-black text-white rounded-[28px] font-black uppercase tracking-[0.3em] hover:bg-purple-600 transition-all shadow-2xl disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98] text-[11px]"
          >
            Continue
          </button>
          
          <p className="mt-12 text-xs text-gray-500 font-bold uppercase tracking-widest">
            Already registered? <button onClick={() => setStep('login')} className="text-purple-600 font-black hover:underline ml-2">Login</button>
          </p>
        </div>
      </AuthLayout>
    );
  }

  if (step === 'personal') {
    return (
      <AuthLayout step={step} onNavigateBack={navigateToDashboard} leftContent={{ title: "For gender equality to be real...", author: "Phumzile Mlambo-Ngcuka" }}>
        <div className="w-full max-w-2xl text-center animate-in fade-in slide-in-from-right-4 duration-300">
          <h2 className="text-4xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Registration</h2>
          <p className="text-gray-400 mb-10 text-sm font-bold uppercase tracking-widest opacity-60">Official Information Only</p>

          <div className="space-y-6 max-h-[500px] overflow-y-auto px-4 custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <InputWrapper label="First Name *" icon={UserIcon} error={errors.includes('firstName')}>
                <input name="firstName" value={formData.firstName} onChange={handleInputChange} className={getFieldClass('firstName')} placeholder="Legal First Name" />
              </InputWrapper>
              <InputWrapper label="Last Name *" icon={UserIcon} error={errors.includes('lastName')}>
                <input name="lastName" value={formData.lastName} onChange={handleInputChange} className={getFieldClass('lastName')} placeholder="Legal Last Name" />
              </InputWrapper>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <InputWrapper label="Birthdate *" icon={Calendar} error={errors.includes('birthdate')}>
                <input 
                  name="birthdate" 
                  readOnly 
                  value={formData.birthdate} 
                  onClick={() => setShowDatePicker(true)}
                  className={`${getFieldClass('birthdate')} cursor-pointer hover:border-purple-300`} 
                  placeholder="Select Birthdate" 
                />
              </InputWrapper>
              <InputWrapper label="Phone Number *" icon={Phone} error={errors.includes('phone')}>
                <input name="phone" value={formData.phone} onChange={handleInputChange} className={getFieldClass('phone')} placeholder="+63 9xx xxx xxxx" />
              </InputWrapper>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <InputWrapper label="Office / Barangay *" icon={Building2} error={errors.includes('office')}>
                <select 
                  name="office" 
                  value={formData.office} 
                  onChange={handleInputChange} 
                  className={getFieldClass('office')}
                >
                  <option value="">Select Office</option>
                  <option value="CPDSO">CPDSO</option>
                  <option value="CMO">CMO</option>
                  <option value="CHSO">CHSO</option>
                  <option value="CSWDO">CSWDO</option>
                  <option value="CEPMO">CEPMO</option>
                  <option value="MITD">MITD</option>
                  <option value="Other">Other Office / Barangay</option>
                </select>
              </InputWrapper>
              <InputWrapper label="Landline" icon={PhoneCall}>
                <input name="landline" value={formData.landline} onChange={handleInputChange} className={sharedInputClass} placeholder="442-xxxx" />
              </InputWrapper>
            </div>
            
            <div className="text-left">
              <InputWrapper label="Official Email Address *" icon={Mail} error={errors.includes('email')}>
                <input name="email" value={formData.email} onChange={handleInputChange} className={getFieldClass('email')} placeholder="Official Govt Email (e.g. j.doe@baguio.gov.ph)" />
              </InputWrapper>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left relative">
              <InputWrapper 
                label="Password *" 
                icon={Lock}
                error={errors.includes('password')}
                rightElement={
                  <button 
                    type="button"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    className="text-gray-300 hover:text-purple-600 transition-colors p-2"
                  >
                    {showRegPassword ? <Eye size={18} strokeWidth={2.5} /> : <EyeOff size={18} strokeWidth={2.5} />}
                  </button>
                }
              >
                <input 
                  name="password" 
                  type={showRegPassword ? "text" : "password"} 
                  value={formData.password} 
                  onChange={handleInputChange} 
                  className={`${getFieldClass('password')} ${showPasswordError ? 'border-red-200' : showPasswordMatch ? 'border-green-200' : ''}`} 
                  placeholder="Create Password" 
                />
              </InputWrapper>
              <InputWrapper 
                label="Confirm *" 
                icon={Lock}
                error={errors.includes('confirmPassword')}
                rightElement={
                  <button 
                    type="button"
                    onClick={() => setShowConfirmRegPassword(!showConfirmRegPassword)}
                    className="text-gray-300 hover:text-purple-600 transition-colors p-2"
                  >
                    {showConfirmRegPassword ? <Eye size={18} strokeWidth={2.5} /> : <EyeOff size={18} strokeWidth={2.5} />}
                  </button>
                }
              >
                <input 
                  name="confirmPassword" 
                  type={showConfirmRegPassword ? "text" : "password"} 
                  value={formData.confirmPassword} 
                  onChange={handleInputChange} 
                  className={`${getFieldClass('confirmPassword')} ${showPasswordError ? 'border-red-200' : showPasswordMatch ? 'border-green-200' : ''}`} 
                  placeholder="Repeat Password" 
                />
              </InputWrapper>
              
              {showPasswordError && (
                <div className="absolute -bottom-6 left-6 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1">
                  <X size={10} className="text-red-500" strokeWidth={4} />
                  <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">
                    Passwords do not match!
                  </span>
                </div>
              )}

              {showPasswordMatch && (
                <div className="absolute -bottom-6 left-6 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1">
                  <Check size={10} className="text-green-500" strokeWidth={4} />
                  <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">
                    Passwords match!
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center mt-10 w-full gap-6">
            {errors.length > 0 && (
              <div className="flex items-center gap-2 text-red-500 animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertCircle size={16} strokeWidth={2.5} />
                <span className="text-[10px] font-black uppercase tracking-widest">Please fill in all required fields marked with *</span>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-6 w-full">
              <button onClick={() => setStep('role')} className="w-full sm:w-1/3 py-5 border-2 border-gray-100 text-gray-400 rounded-[28px] font-black uppercase text-[10px] tracking-widest hover:bg-gray-50 transition-all active:scale-95">Back</button>
              <button 
                onClick={handleSignUp}
                className={`w-full sm:w-2/3 py-5 rounded-[28px] font-black uppercase text-[11px] tracking-[0.3em] transition-all shadow-2xl active:scale-[0.98]
                  ${passwordsMatch || formData.confirmPassword.length === 0 ? 'bg-black text-white hover:bg-purple-600' : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'}`}
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>

        {/* Custom Date Picker Modal */}
        {showDatePicker && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowDatePicker(false)}></div>
            <div className="relative w-full max-w-sm bg-white rounded-[40px] p-10 shadow-2xl animate-in zoom-in-95">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Select Date</h3>
                <button onClick={() => setShowDatePicker(false)} className="text-gray-300 hover:text-black transition-colors"><X size={24} /></button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-10">
                <ScrollPicker 
                  label="Month"
                  options={months} 
                  value={tempDate.month} 
                  onChange={(val) => setTempDate({ ...tempDate, month: val })} 
                />
                <ScrollPicker 
                  label="Day"
                  options={days} 
                  value={tempDate.day} 
                  onChange={(val) => setTempDate({ ...tempDate, day: val })} 
                />
                <ScrollPicker 
                  label="Year"
                  options={years} 
                  value={tempDate.year} 
                  onChange={(val) => setTempDate({ ...tempDate, year: val })} 
                />
              </div>

              <button 
                onClick={handleSetDate}
                className="w-full py-5 bg-purple-600 text-white rounded-3xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-black transition-all shadow-xl shadow-purple-200"
              >
                Set Birthdate
              </button>
            </div>
          </div>
        )}
      </AuthLayout>
    );
  }

  return (
    <AuthLayout step={step} onNavigateBack={navigateToDashboard} leftContent={{ title: "For gender equality to be real...", author: "Phumzile Mlambo-Ngcuka" }}>
      <div className="w-full max-w-md text-center animate-in fade-in zoom-in duration-500">
        <h2 className="text-4xl font-black text-gray-900 mb-6 uppercase tracking-tighter leading-tight">Request Received</h2>
        <p className="text-gray-400 mb-14 text-sm font-bold uppercase tracking-widest leading-relaxed opacity-60">
          Submission Successful. Your application is now being reviewed by the CPDSO Administrator. You will be notified via email within 24-48 hours.
        </p>
        
        <div className="mb-14 flex justify-center">
          <div className="relative w-44 h-44">
            <div className="absolute inset-0 border-[12px] border-purple-50 rounded-full"></div>
            <div className="absolute inset-0 border-[12px] border-purple-600 rounded-full border-t-transparent animate-[spin_4s_linear_infinite]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <CheckCircle2 className="text-purple-600 drop-shadow-xl" size={72} />
            </div>
          </div>
        </div>

        <button 
          onClick={() => setStep('login')}
          className="w-full py-6 bg-black text-white rounded-[28px] font-black uppercase text-[11px] tracking-[0.3em] hover:bg-purple-600 transition-all shadow-2xl flex items-center justify-center gap-4 active:scale-[0.98]"
        >
          Return to Portal <ArrowRight size={20} strokeWidth={3} />
        </button>
      </div>
    </AuthLayout>
  );
};

export default Landing;
