import { useState, useRef} from 'react';
import { api } from './function';
import { useUser } from './Users';
import { useSearchParams, useNavigate } from 'react-router-dom';

function Code() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const objet = searchParams.get('objet') || '';
  const [msg, setMsg] = useState(searchParams.get('msg'));
  const [code, setCode] = useState<string>(searchParams.get('code') ?? '');
  const [message, setMessage] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [bloque, setBloque] = useState(false);

  const [data, setData] = useState({
    email: email,
    code: code,
    objet: objet,
    nbre1: "",
    nbre2: "",
    nbre3: "",
    nbre4: "",
  });

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const resend = async () => {
    try {
      const res = await api.post('/resend-code', { email });
      setCode(res.data.code);
      setData(prev => ({ ...prev, code: res.data.code }));
      setMsg(res.data.msg);
    } catch (err) {
      setMessage("Erreur lors du renvoi.");
    }
  };

  const handleDigitChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const name = `nbre${index + 1}` as keyof typeof data;
      const newData = { ...data, [name]: value };
      setData(newData);

      // Focus suivant
      if (value && index < 3) {
        inputRefs[index + 1].current?.focus();
      }

      // Si toutes les cases sont remplies, soumettre automatiquement
      const isComplete = ["nbre1", "nbre2", "nbre3", "nbre4"].every(key => newData[key as keyof typeof data].length === 1);
      if (isComplete) {
        submitAuto(newData); // Utiliser version sans event
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !data[`nbre${index + 1}` as keyof typeof data] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const submitAuto = async (currentData: typeof data) => {
    if (bloque) return;
    setMessage('');
    try {
      setBloque(true);
      const response = await api.post("/Code", currentData);
    
      if (response.data.errors == null) {
        if(objet==="MotDePasse"){
           const userRes = await api.post("/Token");
        if (userRes.data && userRes.data.Email) {
          setUser(userRes.data);
        }
        }
       
        navigate(response.data.route);
      } else {
        setMessage(response.data.errors);
        setBloque(false);
      }
    } catch (error) {
      console.error("Erreur lors de la soumission automatique :", error);
      setBloque(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitAuto(data);
  };

  return (
    <div className='min-h-screen bg-cover bg-center flex flex-col justify-center items-center' style={{ backgroundImage: "url('/ft.png')" }}>
      <div className='backdrop-blur-xs w-[90%] 2xl:w-[60%] bg-white/10 rounded-2xl border-1 border-[#088cb4] grid grid-cols-1 sm:grid-cols-2 py-4'>
        <div className='flex flex-col justify-center items-center'>
          <img src="/infomation.png" alt="logo" className='w-24' />
          <div className='mx-8 py-8 sm:text-center'>
            <h1 className='text-xl'>{msg}</h1>
          </div>
          {message && <p className="mt-4 text-lg text-red-700">{message}</p>}
        </div>

        <form onSubmit={submit} className='grid grid-cols-1 gap-4 mx-8 lg:text-lg'>
          <div className='flex gap-4 items-center justify-center border-1 border-[#088cb4] rounded-sm p-2 bg-[#f4f4f462]'>
            {[0, 1, 2, 3].map(index => (
              <input
                key={index}
                ref={inputRefs[index]}
                name={`nbre${index + 1}`}
                type="text"
                value={data[`nbre${index + 1}` as keyof typeof data]}
                onChange={(e) => handleDigitChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength={1}
                inputMode='numeric'
                pattern='[0-9]*'
                autoComplete="one-time-code"
                className='text-center text-2xl outline-none w-16 h-16 border-1 border-[#088cb4] rounded-lg m-1 bg-white/40'
                required
              />
            ))}
          </div>

          <button disabled={bloque} className='rounded-sm text-white font-medium text-center bg-[#8bc53f] py-2 shadow-md hover:scale-105 cursor-pointer'>
            Envoyer
          </button>

          <button type='button' disabled={bloque} onClick={resend} className="bg-blue-600 text-white px-4 py-2 rounded hover:scale-105 cursor-pointer">
            Renvoyer le code
          </button>
        </form>
      </div>
      <div className='text-xs pt-4 text-center lg:text-sm'>
        <p>Conditions et politiques de confidentialités</p>
      </div>
    </div>
  );
}

export default Code;
