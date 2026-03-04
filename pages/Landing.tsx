
import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { User, UserRole } from '../types';
import { EyeOff, CheckCircle2, UserCheck, ShieldCheck, ArrowRight, Eye, X } from 'lucide-react';

interface LandingProps {
  onLogin: (user: User) => void;
  onCancel?: () => void;
}

const Landing: React.FC<LandingProps> = ({ onLogin, onCancel }) => {
  const [step, setStep] = useState<'login' | 'role' | 'personal' | 'finish'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState('cbms.johndoe@gmail.com');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      firstName: 'John',
      lastName: 'Doe',
      email: email,
      role: 'Administrator',
      office: 'CPDSO',
      phone: '+63 1234567890',
      birthdate: '09-09-1999'
    });
  };

  const handleRegister = () => setStep('role');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setStep('finish');
  };

  const AuthLayout = ({ children, leftContent }: any) => (
    <div className="min-h-screen w-full bg-[#fdf8ff] flex items-center justify-center p-4 relative">
      {onCancel && (
        <button 
          onClick={onCancel}
          className="absolute top-10 right-10 p-4 hover:bg-gray-100 rounded-full transition-all text-gray-400 hover:text-gray-900 z-50"
        >
          <X size={32} />
        </button>
      )}
      
      <div className="w-full max-w-6xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex min-h-[700px] transition-all duration-500 border border-gray-100">
        {/* Left Side - Image & Quote */}
        <div className="hidden lg:flex w-1/2 relative bg-purple-900 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2026&auto=format&fit=crop" 
            alt="Baguio Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent"></div>
          <div className="relative z-10 p-16 flex flex-col justify-end h-full">
            <div className="mb-8 h-px w-24 bg-white/50"></div>
            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
              {leftContent?.title || "Development is not sustainable if it is not fair and inclusive—and gender equality is central to fairness and inclusiveness."}
            </h2>
            <p className="text-white/70 italic text-lg">
              — {leftContent?.author || "Michelle Bachelet (Former Executive Director of UN Women)"}
            </p>
            {step !== 'login' && (
              <div className="mt-12 space-y-4">
                {[
                  { id: 'role', label: 'Select Role' },
                  { id: 'personal', label: 'Personal Information' },
                  { id: 'finish', label: 'Finish' }
                ].map((s, idx) => {
                  const isActive = step === s.id;
                  const isPast = (step === 'personal' && s.id === 'role') || (step === 'finish');
                  return (
                    <div key={s.id} className={`flex items-center gap-4 transition-colors duration-300 ${isActive || isPast ? 'text-white' : 'text-white/40'}`}>
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold transition-colors ${isActive || isPast ? 'border-purple-400 bg-purple-400' : 'border-white/40'}`}>
                        {isPast && s.id !== step ? '✓' : idx + 1}
                      </div>
                      <span className="font-bold">{s.label}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Forms */}
        <div className="w-full lg:w-1/2 p-12 flex flex-col items-center justify-center bg-white">
          <div className="mb-8">
            <Logo size="lg" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );

  if (step === 'login') {
    return (
      <AuthLayout>
        <div className="w-full max-w-md text-center animate-in fade-in slide-in-from-right-4 duration-300">
          <h2 className="text-3xl font-black text-gray-900 mb-2">WELCOME!</h2>
          <p className="text-gray-400 mb-8 text-sm">Enter your email and password to access your account</p>
          
          <form onSubmit={handleSignIn} className="space-y-6 text-left">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2 ml-4">Email</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-6 py-4 bg-purple-50/50 border border-purple-100 rounded-full text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2 ml-4">
                <label className="block text-xs font-bold text-gray-700 uppercase">Password</label>
                <button type="button" className="text-[10px] text-purple-600 font-bold uppercase hover:underline">Forgot Password?</button>
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-6 py-4 bg-purple-50/50 border border-purple-100 rounded-full text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full py-4 bg-black text-white rounded-full font-bold hover:bg-gray-900 transition-all shadow-lg active:scale-95">Sign In</button>
          </form>

          <p className="mt-8 text-sm text-gray-500">
            Don't have an account? <button onClick={handleRegister} className="text-purple-600 font-bold hover:underline">Sign Up</button>
          </p>
        </div>
      </AuthLayout>
    );
  }

  if (step === 'role') {
    return (
      <AuthLayout leftContent={{ title: "For gender equality to be real...", author: "Phumzile Mlambo-Ngcuka" }}>
        <div className="w-full max-w-md text-center animate-in fade-in slide-in-from-right-4 duration-300">
          <h2 className="text-3xl font-black text-gray-900 mb-2 uppercase">Select Role</h2>
          <p className="text-gray-400 mb-12 text-sm">Let's continue to set up your account.</p>

          <div className="grid grid-cols-2 gap-6 mb-12">
            <button 
              onClick={() => setSelectedRole('Data Provider')}
              className={`p-8 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 active:scale-95 ${selectedRole === 'Data Provider' ? 'border-purple-600 bg-purple-50' : 'border-gray-100 hover:border-purple-200'}`}
            >
              <div className="w-16 h-16 bg-white shadow-md rounded-2xl flex items-center justify-center">
                <UserCheck className="text-purple-600" size={32} />
              </div>
              <span className="font-bold text-gray-800">Data Provider</span>
            </button>
            <button 
              onClick={() => setSelectedRole('Data Reviewer')}
              className={`p-8 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 active:scale-95 ${selectedRole === 'Data Reviewer' ? 'border-purple-600 bg-purple-50' : 'border-gray-100 hover:border-purple-200'}`}
            >
              <div className="w-16 h-16 bg-white shadow-md rounded-2xl flex items-center justify-center">
                <ShieldCheck className="text-purple-600" size={32} />
              </div>
              <span className="font-bold text-gray-800">Data Reviewer</span>
            </button>
          </div>

          <button 
            disabled={!selectedRole}
            onClick={() => setStep('personal')}
            className="w-full py-4 bg-black text-white rounded-full font-bold hover:bg-gray-900 transition-all shadow-lg disabled:opacity-30 active:scale-95"
          >
            Continue
          </button>
          
          <p className="mt-8 text-sm text-gray-500">
            Already have an account? <button onClick={() => setStep('login')} className="text-purple-600 font-bold hover:underline">Login</button>
          </p>
        </div>
      </AuthLayout>
    );
  }

  if (step === 'personal') {
    return (
      <AuthLayout leftContent={{ title: "For gender equality to be real...", author: "Phumzile Mlambo-Ngcuka" }}>
        <div className="w-full max-w-lg text-center animate-in fade-in slide-in-from-right-4 duration-300">
          <h2 className="text-3xl font-black text-gray-900 mb-2 uppercase">Personal Information</h2>
          <p className="text-gray-400 mb-8 text-sm">Fill up the required information.</p>

          <div className="grid grid-cols-2 gap-4 mb-4 text-left">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 ml-4">First Name</label>
              <input name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full px-6 py-3 bg-purple-50/50 border border-purple-100 rounded-full text-sm text-gray-900" placeholder="John" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 ml-4">Last Name</label>
              <input name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full px-6 py-3 bg-purple-50/50 border border-purple-100 rounded-full text-sm text-gray-900" placeholder="Doe" />
            </div>
          </div>
          <div className="text-left mb-4">
            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 ml-4">Email Address</label>
            <input name="email" value={formData.email} onChange={handleInputChange} className="w-full px-6 py-3 bg-purple-50/50 border border-purple-100 rounded-full text-sm text-gray-900" placeholder="Enter your email" />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8 text-left">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 ml-4">Password</label>
              <input name="password" type="password" value={formData.password} onChange={handleInputChange} className="w-full px-6 py-3 bg-purple-50/50 border border-purple-100 rounded-full text-sm text-gray-900" placeholder="Enter a password" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 ml-4">Confirm Password</label>
              <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} className="w-full px-6 py-3 bg-purple-50/50 border border-purple-100 rounded-full text-sm text-gray-900" placeholder="Confirm your password" />
            </div>
          </div>

          <div className="flex gap-4">
            <button onClick={() => setStep('role')} className="w-1/3 py-4 border border-gray-200 text-gray-600 rounded-full font-bold hover:bg-gray-50 transition-all active:scale-95">Back</button>
            <button 
              onClick={handleSignUp}
              className="w-2/3 py-4 bg-black text-white rounded-full font-bold hover:bg-gray-900 transition-all shadow-lg active:scale-95"
            >
              Sign Up
            </button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout leftContent={{ title: "For gender equality to be real...", author: "Phumzile Mlambo-Ngcuka" }}>
      <div className="w-full max-w-md text-center animate-in fade-in zoom-in duration-500">
        <h2 className="text-3xl font-black text-gray-900 mb-2 uppercase">Well Done!</h2>
        <p className="text-gray-400 mb-12 text-sm">Kindly wait for Approval and Verification of your Account :)</p>
        
        <div className="mb-12 flex justify-center">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 border-8 border-purple-100 rounded-full"></div>
            <div className="absolute inset-0 border-8 border-purple-600 rounded-full border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <CheckCircle2 className="text-purple-600" size={48} />
            </div>
          </div>
        </div>

        <button 
          onClick={() => setStep('login')}
          className="w-full py-4 bg-black text-white rounded-full font-bold hover:bg-gray-900 transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95"
        >
          Return to Login <ArrowRight size={18} />
        </button>
      </div>
    </AuthLayout>
  );
};

export default Landing;
