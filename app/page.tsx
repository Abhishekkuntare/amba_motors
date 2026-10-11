'use client'

import { cloneElement, isValidElement, useEffect, useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'
import { jsPDF } from 'jspdf'
import { CarDoctor } from '@/components/car-doctor'
import {
  ArrowRight,
  Asterisk,
  AlertTriangle,
  Car,
  CalendarDays,
  Check,
  ClipboardCheck,
  ChevronDown,
  Clock3,
  History,
  ImagePlus,
  Mic,
  Navigation,
  Upload,
  Crosshair,
  Globe2,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Wrench,
  X,
  Zap,
} from 'lucide-react'

const assets = {
  exterior:
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Aug%2020%2C%202026%2C%2010_59_22%20AM-xwiai6Wp4oiKmgRh82sMhNzRAe29Bm.png',
  collage:
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Aug%2020%2C%202026%2C%2011_19_48%20AM%20%281%29-kZuFDY1AKK0H9dxAyvWois19zmbEWI.png',
  logo:
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Aug%2020%2C%202026%2C%2011_12_25%20AM-6wdFLAcOdpkr9nijKlksjYPTmjbMEX.png',
  banner:
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Aug%2020%2C%202026%2C%2011_08_58%20AM-mjZHDZwgiUK9YxnCxfnPu2SSQVqYWx.png',
  feature:
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Aug%2020%2C%202026%2C%2011_27_20%20AM-wU5MBArqv0685kQUKjhxCH3GUXhinv.png',
  interior:
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Aug%2020%2C%202026%2C%2011_29_40%20AM-UT0t9oSiwDQEVuP0oSiu9wwwo4OP38.png',
}

const phone = '+919823028110'
const languages = { en: 'English', hi: 'हिन्दी', mr: 'मराठी' } as const
type Language = keyof typeof languages
const copy = {
  en: { services: 'Services', about: 'About', diagnose: 'Diagnose', why: 'Why Amba', gallery: 'Gallery', contact: 'Contact', call: 'Call now', heroLabel: 'Navratri special · Maa Amba’s blessings', heroTitle: 'Car Service & Repair', heroTitleAccent: 'in Amravati.', heroText: 'Looking for a car garage in Amravati? Amba Motors on Badnera Road offers car servicing, diagnostics, brake and AC repair, wheel alignment, denting and painting.', book: 'Book via WhatsApp', explore: 'Explore services', proof: 'Proof you can', proofAccent: 'count on.', proofText: 'Every job is backed by hands-on experience, careful inspection and a commitment to doing the work right the first time.', bookService: 'Book a service', ask: 'Ask on WhatsApp', vehicles: 'Vehicles serviced', issues: 'Issues resolved', models: 'Car models serviced', years: 'Years experience', what: 'What we do', one: 'One workshop.', every: 'Every solution.', aboutLabel: 'Meet the founder', meet: 'Meet us for your next service' },
  hi: { services: 'सेवाएँ', about: 'हमारे बारे में', diagnose: 'जाँच', why: 'अम्बा क्यों', gallery: 'गैलरी', contact: 'संपर्क', call: 'कॉल करें', heroLabel: 'नवरात्रि विशेष · माँ अम्बा का आशीर्वाद', heroTitle: 'कार सर्विस और रिपेयर', heroTitleAccent: 'अमरावती में।', heroText: 'अमरावती में कार गैराज ढूँढ़ रहे हैं? अम्बा मोटर्स, बडनेरा रोड पर कार सर्विसिंग, डायग्नोस्टिक्स, ब्रेक और एसी रिपेयर, व्हील अलाइनमेंट, डेंटिंग और पेंटिंग की सुविधा।', book: 'व्हाट्सऐप पर बुक करें', explore: 'सेवाएँ देखें', proof: 'भरोसे का', proofAccent: 'प्रमाण।', proofText: 'हर काम अनुभव, सावधानी से जाँच और पहली बार में सही काम करने की प्रतिबद्धता के साथ किया जाता है।', bookService: 'सर्विस बुक करें', ask: 'व्हाट्सऐप पूछें', vehicles: 'सर्विस की गई कारें', issues: 'हल की गई समस्याएँ', models: 'सर्विस किए गए मॉडल', years: 'वर्षों का अनुभव', what: 'हम क्या करते हैं', one: 'एक वर्कशॉप।', every: 'हर समाधान।', aboutLabel: 'संस्थापक से मिलिए', meet: 'अगली सर्विस के लिए मिलिए' },
  mr: { services: 'सेवा', about: 'आमच्याबद्दल', diagnose: 'तपासणी', why: 'अम्बा का?', gallery: 'गॅलरी', contact: 'संपर्क', call: 'कॉल करा', heroLabel: 'नवरात्री विशेष · आई अंबेचा आशीर्वाद', heroTitle: 'कार सर्व्हिस आणि रिपेअर', heroTitleAccent: 'अमरावतीमध्ये.', heroText: 'अमरावतीमध्ये कार गॅरेज शोधत आहात? अम्बा मोटर्स, बडनेरा रोड येथे कार सर्व्हिसिंग, डायग्नोस्टिक्स, ब्रेक व एसी रिपेअर, व्हील अलाइनमेंट, डेंटिंग आणि पेंटिंग.', book: 'व्हॉट्सॲपवर बुक करा', explore: 'सेवा पहा', proof: 'विश्वासाचा', proofAccent: 'पुरावा.', proofText: 'प्रत्येक काम अनुभव, काळजीपूर्वक तपासणी आणि पहिल्याच वेळी योग्य काम करण्याच्या वचनबद्धतेने केले जाते.', bookService: 'सेवा बुक करा', ask: 'व्हॉट्सॲप विचारा', vehicles: 'सर्व्हिस केलेल्या कार', issues: 'सोडवलेल्या समस्या', models: 'सर्व्हिस केलेले मॉडेल', years: 'वर्षांचा अनुभव', what: 'आम्ही काय करतो', one: 'एक वर्कशॉप.', every: 'प्रत्येक उपाय.', aboutLabel: 'संस्थापकाला भेटा', meet: 'पुढील सर्व्हिससाठी भेटा' },
} as const
const siteTranslations: Record<Exclude<Language, 'en'>, Record<string, string>> = {
  hi: {
    'What we do': 'हम क्या करते हैं', 'One workshop.': 'एक वर्कशॉप।', 'Every solution.': 'हर समाधान।', 'From a routine check-up to a complete body makeover, our technicians treat your car like it matters.': 'रूटीन चेक-अप से लेकर पूरी बॉडी मेकओवर तक, हमारे तकनीशियन आपकी कार का ध्यान अपने वाहन जैसा रखते हैं।', 'Meet the founder': 'संस्थापक से मिलिए', 'Experience behind every repair.': 'हर रिपेयर के पीछे अनुभव।', 'Complete service menu': 'पूरी सर्विस सूची', 'Whatever your car needs,': 'आपकी कार को जो चाहिए,', 'we’re ready.': 'हम तैयार हैं।', 'Quick diagnosis': 'त्वरित जाँच', 'What’s wrong': 'क्या समस्या है', 'with your car?': 'आपकी कार में?', 'Recommended first step': 'पहला सुझाया कदम', 'Local car care guide': 'स्थानीय कार केयर गाइड', 'Why is my car': 'मेरी कार', 'doing this?': 'ऐसा क्यों कर रही है?', 'Car brand compatibility': 'कार ब्रांड संगतता', 'We work on': 'हम काम करते हैं', 'your brand.': 'आपके ब्रांड पर।', 'What our customers say': 'हमारे ग्राहक क्या कहते हैं', 'Trusted for': 'भरोसेमंद', 'the right reasons.': 'सही कारणों से।', 'Business dashboard': 'बिज़नेस डैशबोर्ड', 'How we work,': 'हम कैसे काम करते हैं,', 'made visible.': 'वह साफ़ दिखता है।', 'Emergency / Roadside': 'आपातकाल / रोडसाइड', 'Vehicle': 'वाहन', 'breakdown?': 'खराब हो गया?', 'The Amba difference': 'अम्बा का फर्क', 'Good work is': 'अच्छा काम', 'felt on the road.': 'सड़क पर महसूस होता है।', 'Simple from start to finish': 'शुरू से अंत तक आसान', 'Your car is': 'आपकी कार', 'in good hands.': 'सही हाथों में है।', 'Proof in the work': 'काम का प्रमाण', 'Before. Repair.': 'पहले। रिपेयर।', 'After.': 'बाद में।', 'Tell us about your car': 'अपनी कार के बारे में बताएं', 'Start with': 'शुरुआत करें', 'the details.': 'जानकारी से।', 'Let’s get you moving': 'आपको फिर से सड़क पर लाएं', 'Call now': 'अभी कॉल करें', 'WhatsApp now': 'अभी व्हॉट्सऐप करें', 'Save & enquire on WhatsApp': 'सेव करें और व्हॉट्सऐप पर पूछें', 'Talk to our team': 'हमारी टीम से बात करें', 'Clear communication': 'स्पष्ट बातचीत', 'Skilled technicians': 'कुशल तकनीशियन', 'Quality-first process': 'गुणवत्ता वाला काम', 'Support after service': 'सर्विस के बाद सहायता', '25+ years of experience': '25+ वर्षों का अनुभव', 'Car service for all major brands': 'सभी प्रमुख कार ब्रांड की सर्विस', 'Car repair in Amravati': 'अमरावती में कार रिपेयर', 'Honest work. Reliable results.': 'ईमानदार काम। भरोसेमंद परिणाम।'
  },
  mr: {
    'What we do': 'आम्ही काय करतो', 'One workshop.': 'एक वर्कशॉप.', 'Every solution.': 'प्रत्येक उपाय.', 'From a routine check-up to a complete body makeover, our technicians treat your car like it matters.': 'रुटीन तपासणीपासून संपूर्ण बॉडी मेकओव्हरपर्यंत, आमचे तंत्रज्ञ तुमच्या कारची मनापासून काळजी घेतात.', 'Meet the founder': 'संस्थापकाला भेटा', 'Experience behind every repair.': 'प्रत्येक दुरुस्तीमागचा अनुभव.', 'Complete service menu': 'संपूर्ण सेवा यादी', 'Whatever your car needs,': 'तुमच्या कारला जे हवे,', 'we’re ready.': 'त्यासाठी आम्ही तयार.', 'Quick diagnosis': '��लद तपासणी', 'What’s wrong': 'काय समस्या आहे', 'with your car?': 'तुमच्या कारमध्ये?', 'Recommended first step': 'सुचवलेली पहिली पायरी', 'Local car care guide': 'स्थानिक कार केअर मार्गदर्शक', 'Why is my car': 'म��झी कार', 'doing this?': 'असे का करत आहे?', 'Car brand compatibility': 'कार ब्रँड सुसंगतता', 'We work on': 'आम्ही काम करतो', 'your brand.': 'तुमच्या ब्रँडवर.', 'What our customers say': 'आमचे ग्राहक काय म्हणतात', 'Trusted for': 'विश्वासार्ह', 'the right reasons.': 'योग्य कारणांसाठी.', 'Business dashboard': 'व्यवसाय डॅशबोर्ड', 'How we work,': 'आम्ही कसे काम करतो,', 'made visible.': 'ते स्पष्ट दिसते.', 'Emergency / Roadside': 'आपत्कालीन / रोडसाइड', 'Vehicle': 'वाहन', 'breakdown?': 'बंद पडले?', 'The Amba difference': 'अम्बाचा फरक', 'Good work is': 'चांगले काम', 'felt on the road.': 'रस्त्यावर जाणवते.', 'Simple from start to finish': 'सुरुवातीपासून शेवटपर्यंत सोपे', 'Your car is': 'तुमची कार', 'in good hands.': 'योग्य हातात आहे.', 'Proof in the work': 'कामाचा पुरावा', 'Before. Repair.': 'आधी. दुरुस्ती.', 'After.': 'नंतर.', 'Tell us about your car': 'तुमच्या कारबद्दल सांगा', 'Start with': 'सुरुवात करा', 'the details.': 'तपशीलांपासून.', 'Let’s get you moving': 'तुम्हाला पुन्हा रस्त्यावर आणूया', 'Call now': 'आता कॉल करा', 'WhatsApp now': 'आता व्हॉट्सॲप करा', 'Save & enquire on WhatsApp': 'सेव्ह करा आणि व्हॉट्सॲपवर विचारा', 'Talk to our team': 'आमच्या टीमशी बोला', 'Clear communication': 'स्पष्ट संवाद', 'Skilled technicians': 'कुशल तंत्रज्ञ', 'Quality-first process': 'गुणवत्तेला प्राधान्य', 'Support after service': 'सेवेनंतर मदत', '25+ years of experience': '25+ वर्षांचा अनुभव', 'Car service for all major brands': 'सर्व प्रमुख कार ब्रँडची सेवा', 'Car repair in Amravati': 'अमरावतीमध्ये कार रिपेअर', 'Honest work. Reliable results.': 'प्रामाणिक काम. विश्वासार्ह परिणाम.'
  }
}

function Localized({ language, children }: { language: Language, children: ReactNode }) {
  if (language === 'en') return <>{children}</>
  const dictionary = siteTranslations[language]
  const translate = (node: ReactNode): ReactNode => {
    if (typeof node === 'string') return dictionary[node] ?? node
    if (Array.isArray(node)) return node.map(translate)
    if (isValidElement(node)) return cloneElement(node, {}, translate((node.props as { children?: ReactNode }).children))
    return node
  }
  return <>{translate(children)}</>
}

const mapLink = 'https://maps.app.goo.gl/pQgiSuMJqdmjTbVp6'
const whatsapp = (message = 'Hello Amba Motors, I would like to enquire about car service.') =>
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

const services = [
  { icon: Car, title: 'Periodic service', text: 'Keep your car smooth, safe and ready for every drive.' },
  { icon: Zap, title: 'Engine diagnostics', text: 'Accurate diagnosis for warning lights, power loss and performance.' },
  { icon: Sparkles, title: 'Denting & painting', text: 'Factory-like finish with careful panel and colour matching.' },
  { icon: ShieldCheck, title: 'Brake & safety', text: 'Confidence-inspiring inspection, repairs and replacement.' },
  { icon: Wrench, title: 'AC & electrical', text: 'Comfort and reliability from experts who know every system.' },
  { icon: Crosshair, title: 'Wheel alignment', text: 'Better handling, tyre life and a calmer drive.' },
]

const serviceCatalog = [
  { group: 'Car Repair & Maintenance', icon: Wrench, items: ['General car repair', 'Car servicing', 'Periodic car maintenance', 'Vehicle inspection', 'Mechanical repairs', 'Engine diagnostics', 'Engine repair', 'Brake repair', 'Clutch repair', 'Suspension repair', 'Steering repair', 'Cooling system repair', 'Battery replacement', 'Oil change', 'Filter replacement'] },
  { group: 'Electrical Services', icon: Zap, items: ['Car electrical repair', 'Battery check', 'Battery replacement', 'Starter motor repair', 'Alternator repair', 'Car lighting repair', 'Electrical diagnostics'] },
  { group: 'Vehicle Services', icon: Car, items: ['AC service', 'AC repair', 'Tyre inspection', 'Tyre replacement', 'Wheel alignment', 'Wheel balancing', 'Vehicle troubleshooting'] },
  { group: 'Emergency / Roadside', icon: ShieldCheck, items: ['Roadside assistance', 'Breakdown assistance', 'Emergency vehicle repair', 'Battery jump start', 'On-site vehicle inspection'] },
]

const symptoms = [
  ['Car won’t start', 'Battery check & electrical diagnostics', 'My car will not start. I need battery and electrical diagnostics.'],
  ['Engine noise', 'Engine diagnostics', 'I hear an unusual engine noise and need an inspection.'],
  ['Brake noise', 'Brake repair', 'My brakes are making noise. I need a safety inspection.'],
  ['AC not cooling', 'AC service', 'My car AC is not cooling. I would like an AC inspection.'],
  ['Battery problem', 'Battery replacement', 'I have a battery problem and need assistance.'],
  ['Car vibration', 'Wheel alignment', 'My car is vibrating. I need wheel, tyre and suspension inspection.'],
  ['Check-engine light', 'Engine diagnostics', 'My check-engine light is on. I need diagnostics.'],
  ['Poor mileage', 'Periodic car maintenance', 'My car mileage has dropped. I need a service check.'],
] as const

const brands = [
  ['Maruti Suzuki', 'maruti-suzuki'], ['Hyundai', 'hyundai'], ['Tata', 'tata-motors'], ['Mahindra', 'mahindra'], ['Toyota', 'toyota'], ['Honda', 'honda'], ['Kia', 'kia'], ['Renault', 'renault'], ['Nissan', 'nissan'], ['Volkswagen', 'volkswagen'], ['Škoda', 'skoda'], ['MG', 'mg'], ['Jeep', 'jeep'], ['BMW', 'bmw'], ['Mercedes-Benz', 'mercedes-benz'], ['Audi', 'audi'], ['Jaguar', 'jaguar'], ['Volvo', 'volvo'], ['Lexus', 'lexus'], ['Land Rover', 'land-rover'], ['Porsche', 'porsche'],
] as const

const seoArticles = [
  ['Why is my car not starting?', 'A flat battery, starter issue, fuel problem or electrical fault can stop a car from starting. Amba Motors can inspect the cause instead of replacing parts by guesswork.'],
  ['Why is my car AC not cooling?', 'Low refrigerant, compressor trouble, a blocked filter or electrical fault may be responsible. An AC inspection helps find the real issue quickly.'],
  ['When should brake pads be replaced?', 'Replace brake pads when you hear grinding or squealing, feel vibration or notice a longer stopping distance. Brake safety should never be postponed.'],
  ['Why is my car making a strange noise?', 'Unusual sounds can come from the engine, brakes, suspension, tyres or belts. Note when the sound happens and let a technician inspect it.'],
  ['Why does my car vibrate while driving?', 'Vibration may point to wheel balancing, alignment, tyres, suspension or brake issues. A proper inspection protects both comfort and safety.'],
  ['Why is the check-engine light on?', 'The warning light can indicate anything from a sensor fault to an engine or emissions issue. Diagnostics reveal the next right step.'],
  ['How often should a car be serviced?', 'Follow your manufacturer schedule, and service sooner if you drive in heavy traffic, dust or heat. Regular checks prevent expensive surprises.'],
  ['Signs your car battery needs replacement', 'Slow cranking, dim lights, repeated jump starts and electrical glitches can all point to a tired battery.'],
  ['Signs of clutch problems', 'Slipping, a high bite point, difficulty changing gears or a burning smell are common clutch warning signs.'],
  ['Why is my car overheating?', 'Low coolant, a radiator fault, thermostat issue or cooling fan problem can cause overheating. Stop safely and seek help before driving further.'],
] as const

const vehicleOptions = ['Maruti Suzuki Swift', 'Maruti Suzuki Baleno', 'Maruti Suzuki WagonR', 'Maruti Suzuki Dzire', 'Hyundai Creta', 'Hyundai i20', 'Hyundai Venue', 'Hyundai Verna', 'Tata Nexon', 'Tata Punch', 'Tata Harrier', 'Tata Tiago', 'Mahindra Scorpio', 'Mahindra Thar', 'Mahindra XUV700', 'Toyota Innova Crysta', 'Toyota Fortuner', 'Toyota Glanza', 'Honda City', 'Honda Amaze', 'Honda Elevate', 'Kia Seltos', 'Kia Sonet', 'Kia Carens', 'Volkswagen Virtus', 'Volkswagen Taigun', 'Skoda Slavia', 'Skoda Kushaq', 'Renault Kwid', 'Renault Duster', 'Nissan Magnite', 'MG Hector', 'Jeep Compass', 'Ford EcoSport', 'Chevrolet Beat', 'BMW 3 Series', 'Mercedes-Benz C-Class', 'Audi A4', 'Volvo XC40', 'Tesla Model 3']

const reviews = [
  ['Abhishek Kuntare', 'Really good experience at Amba Motors. The service was professional, the work was done properly, and the staff was helpful and polite. They explained the issues clearly and completed the work on time.'],
  ['Manoj Rathi · Local Guide', 'Best car garage in Amravati. Owner is honest and polite.'],
  ['Atharv Shelorkar', 'Best car garage in Amravati. Best car service'],
  ['Sunita Rathod', 'Reasonable price…'],
] as const

const gallery = [
  { src: assets.exterior, alt: 'Amba Motors workshop exterior', label: 'Your trusted workshop' },
  { src: assets.feature, alt: 'Amba Motors service bay', label: 'Built for every car' },
  { src: assets.collage, alt: 'Amba Motors technicians and paint booth', label: 'Crafted with care' },
  { src: assets.interior, alt: 'Amba Motors reception and service tools', label: 'A clear process' },
  { src: '/images/amba-navratri-poster.png', alt: 'Amba Motors Navratri poster with Maa Durga, the workshop and safe journey wishes', label: 'Safe rides, happy vibes' },
  { src: '/images/navratri-ambe-cover.png', alt: 'Colorful festive portrait celebrating Maa Ambe', label: 'Maa Ambe’s blessings' },
  { src: '/images/happy-navratri-eyes.png', alt: 'Festive Happy Navratri greeting artwork', label: 'Happy Navratri' },
  { src: '/images/durga-blessings.png', alt: 'Maa Durga blessing devotees for Navratri', label: 'Blessings for every journey' },
  { src: '/images/navratri-durga-art.png', alt: 'Traditional red and gold Maa Durga artwork', label: 'A season of celebration' },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow"><Asterisk size={14} /> {children}</p>
}

function SignatureCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)')
    if (!finePointer.matches) return
    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return
    let frame = 0
    let x = -40
    let y = -40
    let ringX = x
    let ringY = y
    const move = (event: MouseEvent) => {
      x = event.clientX
      y = event.clientY
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`
      cancelAnimationFrame(frame)
      const animate = () => {
        ringX += (x - ringX) * 0.16
        ringY += (y - ringY) * 0.16
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
        frame = requestAnimationFrame(animate)
      }
      frame = requestAnimationFrame(animate)
    }
    const setHover = (event: Event) => {
      const target = event.currentTarget as HTMLElement
      ring.classList.toggle('cursor-hover', target.matches('a, button, input, select, textarea, label'))
    }
    const interactive = Array.from(document.querySelectorAll('a, button, input, select, textarea, label'))
    window.addEventListener('mousemove', move)
    interactive.forEach((element) => {
      element.addEventListener('mouseenter', setHover)
      element.addEventListener('mouseleave', setHover)
    })
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(frame)
      interactive.forEach((element) => {
        element.removeEventListener('mouseenter', setHover)
        element.removeEventListener('mouseleave', setHover)
      })
    }
  }, [])

  return <><div ref={ringRef} className="signature-cursor-ring" aria-hidden="true" /><div ref={cursorRef} className="signature-cursor-core" aria-hidden="true" /></>
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [language, setLanguage] = useState<Language>('en')
  const [selected, setSelected] = useState<(typeof gallery)[number] | null>(null)
  const [openFaq, setOpenFaq] = useState(0)
  const [selectedSymptom, setSelectedSymptom] = useState(0)
  const [form, setForm] = useState({ name: '', phone: '', vehicleName: '', service: 'Periodic service', message: '' })
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [metricValues, setMetricValues] = useState([0, 0, 0, 0])
  const [reminder, setReminder] = useState({ vehicle: '', date: '', type: 'Periodic service' })
  const [jobCard, setJobCard] = useState({ customer: '', vehicle: '', registration: '', concern: '', status: 'Received' })
  const [reminderSaved, setReminderSaved] = useState(false)
  const [jobCardSaved, setJobCardSaved] = useState(false)
  const [vehicleNumber, setVehicleNumber] = useState('')
  const [vehicleProfile, setVehicleProfile] = useState<{ vehicle_number: string; make: string; model: string; year?: number } | null>(null)
  const [history, setHistory] = useState<Array<{ service_date: string; service_type: string; notes?: string; status: string }>>([])
  const [vehicleMessage, setVehicleMessage] = useState('')
  const [uploadMessage, setUploadMessage] = useState('')
  const [selectedMedia, setSelectedMedia] = useState<File | null>(null)
  const [mediaPreviewUrl, setMediaPreviewUrl] = useState('')
  const [voiceMessage, setVoiceMessage] = useState('')
  const [openNow, setOpenNow] = useState(false)
  const [recognizing, setRecognizing] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const metricsRef = useRef<HTMLDivElement>(null)

  const t = copy[language]
  useEffect(() => {
    const timer = window.setTimeout(() => setShowWelcome(false), 3600)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const now = new Date()
    const day = now.getDay()
    const minutes = now.getHours() * 60 + now.getMinutes()
    const isFridayHoliday = day === 5
    setOpenNow(!isFridayHoliday && minutes >= 10 * 60 && minutes < 21 * 60)
  }, [])

  const lookupVehicle = async () => {
    setVehicleMessage('')
    const response = await fetch(`/api/vehicles?vehicleNumber=${encodeURIComponent(vehicleNumber)}`)
    const data = await response.json()
    if (!response.ok) setVehicleMessage(data.error ?? 'Vehicle not found.')
    else { setVehicleProfile(data.profile); setHistory(data.history) }
  }

  const handleMediaSelect = (file: File) => {
    setSelectedMedia(file)
    setMediaPreviewUrl(URL.createObjectURL(file))
    setUploadMessage('Preview ready. Tap the WhatsApp button to send it to Amba Motors.')
  }

  const shareProblemOnWhatsApp = async () => {
    if (!selectedMedia) return
    const file = selectedMedia
    const message = `Hello Amba Motors, I need help with my vehicle${vehicleNumber ? ` ${vehicleNumber}` : ''}. I am sharing a ${file.type.startsWith('video') ? 'video' : file.type.startsWith('audio') ? 'voice recording' : 'photo'} of the problem.`
    try {
      if (typeof navigator.share === 'function' && typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text: message, title: 'Amba Motors vehicle problem' })
        setUploadMessage('Your file is ready to share directly with Amba Motors.')
        return
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
    }
    window.open(whatsapp(message), '_blank', 'noopener,noreferrer')
    setUploadMessage('WhatsApp opened. Please attach the selected file in the chat.')
  }

  const startVoiceEnquiry = () => {
    const SpeechRecognition = (window as Window & { webkitSpeechRecognition?: new () => { lang: string; start: () => void; onresult: (event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void; onend: () => void } }).webkitSpeechRecognition
    if (!SpeechRecognition) { setVoiceMessage('Voice input is not supported in this browser.'); return }
    const recognition = new SpeechRecognition()
    recognition.lang = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN'
    recognition.onresult = event => setVoiceMessage(event.results[0][0].transcript)
    recognition.onend = () => setRecognizing(false)
    setRecognizing(true)
    recognition.start()
  }

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem('amba-language') as Language | null
    if (savedLanguage && savedLanguage in languages) setLanguage(savedLanguage)
  }, [])

  useEffect(() => {
    window.localStorage.setItem('amba-language', language)
    document.documentElement.lang = language
    document.documentElement.dataset.language = language
  }, [language])

  useEffect(() => {
    const savedReminder = window.localStorage.getItem('amba-reminder')
    const savedJobCard = window.localStorage.getItem('amba-job-card')
    if (savedReminder) setReminder(JSON.parse(savedReminder))
    if (savedJobCard) setJobCard(JSON.parse(savedJobCard))
  }, [])

  const saveReminder = () => {
    if (!reminder.vehicle || !reminder.date) return
    window.localStorage.setItem('amba-reminder', JSON.stringify(reminder))
    setReminderSaved(true)
  }

  const saveJobCard = () => {
    if (!jobCard.customer || !jobCard.vehicle) return
    window.localStorage.setItem('amba-job-card', JSON.stringify(jobCard))
    setJobCardSaved(true)
  }

  const downloadJobCardPdf = () => {
    const pdf = new jsPDF({ unit: 'mm', format: 'a4' })
    const pageWidth = pdf.internal.pageSize.getWidth()
    const margin = 20
    let y = 24
    pdf.setFillColor(40, 34, 29)
    pdf.rect(0, 0, pageWidth, 42, 'F')
    pdf.setTextColor(255, 255, 255)
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(10)
    pdf.text('AMBA MOTORS', margin, 16)
    pdf.setFontSize(22)
    pdf.text('Digital Job Card', margin, 30)
    pdf.setTextColor(40, 34, 29)
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    y = 62
    const rows = [['Customer name', jobCard.customer], ['Vehicle', jobCard.vehicle], ['Registration number', jobCard.registration], ['Reported issue', jobCard.concern], ['Job status', jobCard.status]]
    rows.forEach(([label, value]) => {
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(105, 91, 76)
      pdf.text(label.toUpperCase(), margin, y)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(40, 34, 29)
      const lines = pdf.splitTextToSize(value || 'Not provided', pageWidth - margin * 2)
      pdf.text(lines, margin, y + 7)
      y += Math.max(18, lines.length * 6 + 12)
      pdf.setDrawColor(220, 209, 194)
      pdf.line(margin, y - 5, pageWidth - margin, y - 5)
    })
    y += 12
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(216, 39, 47)
    pdf.setFontSize(13)
    pdf.text('Thank you for visiting Amba Motors.', margin, y)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(105, 91, 76)
    pdf.setFontSize(10)
    pdf.text('We appreciate your trust. Drive safely.', margin, y + 8)
    pdf.save(`amba-motors-job-card-${jobCard.registration || 'customer'}.pdf`)
  }

  const reminderMessage = reminder.vehicle && reminder.date ? `Hello Amba Motors, please remind me about ${reminder.type} for my ${reminder.vehicle} around ${reminder.date}.` : 'Hello Amba Motors, I would like to set a service reminder.'

  useEffect(() => {
    const node = metricsRef.current
    if (!node) return
    let started = false
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return
      started = true
      const targets = [5000, 10000, 100, 25]
      const startedAt = performance.now()
      const duration = 2400
      const animate = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setMetricValues(targets.map(target => Math.floor(target * eased)))
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setMetricValues(targets)
        }
      }
      requestAnimationFrame(animate)
      observer.disconnect()
    }, { threshold: 0.35 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (form.name.trim().length < 2 || !/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, '')) || form.vehicleName.trim().length < 2) {
      setError('Please enter your name, valid mobile number and vehicle model.')
      return
    }
    setError('')
    const response = await fetch('/api/enquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    if (!response.ok) { setError('We could not save this enquiry. Please call us directly.'); return }
    setSaved(true)
    window.open(whatsapp(`Hello Amba Motors, I am ${form.name}. My vehicle is ${form.vehicleName}. I need ${form.service}. My number is ${form.phone}. ${form.message}`), '_blank', 'noopener,noreferrer')
  }

  return (
    <Localized language={language}>
    <SignatureCursor />
    {showWelcome && <div className="welcome-splash" role="status" aria-label="Happy Navratri from Amba Motors">
      <div className="welcome-garland welcome-garland-left" aria-hidden="true">✦ ✧ ✦</div>
      <div className="welcome-garland welcome-garland-right" aria-hidden="true">✦ ✧ ✦</div>
      <div className="welcome-scene">
        <div className="welcome-side-art welcome-side-left">
          <figure><Image src="/images/navratri-ambe-cover.png" alt="" fill sizes="(max-width: 800px) 24vw, 15vw" /></figure>
          <figure><Image src="/images/happy-navratri-eyes.png" alt="" fill sizes="(max-width: 800px) 24vw, 15vw" /></figure>
        </div>
        <div className="welcome-center">
          <p className="welcome-kicker">Amba Motors wishes you</p>
          <h2>Happy <em>Navratri</em></h2>
          <div className="welcome-poster-frame"><Image src="/images/amba-navratri-poster.png" alt="Maa Durga blesses Amba Motors customers with safe rides and happy vibes this Navratri" fill priority sizes="(max-width: 800px) 60vw, 34vw" /></div>
          <span className="welcome-blessing">माँ दुर्गा का आशीर्वाद · Blessed journeys ahead</span>
        </div>
        <div className="welcome-side-art welcome-side-right">
          <figure><Image src="/images/durga-blessings.png" alt="" fill sizes="(max-width: 800px) 24vw, 15vw" /></figure>
          <figure><Image src="/images/navratri-durga-art.png" alt="" fill sizes="(max-width: 800px) 24vw, 15vw" /></figure>
        </div>
      </div>
    </div>}
    <main>
      <CarDoctor />
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Amba Motors home">
<span className="brand-mark"><Image src="/amba-motors-logo.png" alt="" width={42} height={42} /></span>
  <span><strong>AMBA</strong><small>MOTORS</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#services">{t.services}</a><a href="#about">{t.about}</a><a href="#diagnose">{t.diagnose}</a><a href="#why-us">{t.why}</a><a href="#gallery">{t.gallery}</a><a href="#contact">{t.contact}</a>
        </nav>
        <label className="language-picker"><Globe2 size={15} /><span className="sr-only">Choose language</span><select value={language} onChange={event => setLanguage(event.target.value as Language)} aria-label="Choose language"><option value="en">EN</option><option value="hi">हिन्दी</option><option value="mr">मराठी</option></select></label>
        <a className="header-call" href={`tel:${phone}`}><Phone size={16} /> {t.call}</a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button>
      </header>
      {menuOpen && <nav className="mobile-nav"><a href="#services" onClick={() => setMenuOpen(false)}>{t.services}</a><a href="#about" onClick={() => setMenuOpen(false)}>{t.about}</a><a href="#why-us" onClick={() => setMenuOpen(false)}>{t.why}</a><a href="#gallery" onClick={() => setMenuOpen(false)}>{t.gallery}</a><a href="#contact" onClick={() => setMenuOpen(false)}>{t.contact}</a><div className="mobile-language-picker"><Globe2 size={15} /> <select value={language} onChange={event => setLanguage(event.target.value as Language)} aria-label="Choose language"><option value="en">{languages.en}</option><option value="hi">{languages.hi}</option><option value="mr">{languages.mr}</option></select></div></nav>}

      <section className="hero" id="top">
        <div className="hero-copy reveal">
          <SectionLabel>{t.heroLabel}</SectionLabel>
          <h1>{t.heroTitle}<br /><em>{t.heroTitleAccent}</em></h1>
          <p className="hero-lede">{t.heroText}</p>
          <div className="hero-actions"><a className="button button-red" href={whatsapp()} target="_blank" rel="noreferrer"><MessageCircle size={18} /> {t.book}</a><a className="text-link" href="#services">{t.explore} <ArrowRight size={16} /></a></div>
          <div className="hero-proof"><span><Star size={15} fill="currentColor" /> 4.6 Google rating</span><span><ShieldCheck size={15} /> All types of cars</span></div>
        </div>
        <div className="hero-image-wrap" aria-label="Navratri greetings and artwork from Amba Motors">
          <div className="navratri-photo-grid">
            <figure className="navratri-photo navratri-photo-cover"><Image src="/images/durga-navratri.png" alt="Maa Durga seated with her lion for Navratri" fill priority sizes="(max-width: 800px) 46vw, 28vw" /><figcaption>Maa Ambe’s grace</figcaption></figure>
            <figure className="navratri-photo navratri-photo-eyes"><Image src="/images/happy-navratri-eyes.png" alt="Happy Navratri greeting with Maa Durga’s eyes" fill sizes="(max-width: 800px) 46vw, 28vw" /><figcaption>Happy Navratri</figcaption></figure>
            <figure className="navratri-photo navratri-photo-blessings"><Image src="/images/durga-blessings.png" alt="Maa Durga’s blessing for Navratri" fill sizes="(max-width: 800px) 46vw, 28vw" /><figcaption>Blessings for every journey</figcaption></figure>
            <figure className="navratri-photo navratri-photo-art"><Image src="/images/amba-navratri-poster.png" alt="Amba Motors Navratri greetings for safe rides and happy vibes" fill sizes="(max-width: 800px) 46vw, 28vw" /><figcaption>Safe rides, happy vibes</figcaption></figure>
          </div>
          <div className="image-caption"><span>शुभ नवरात्रि</span><span>Safe journeys, blessed beginnings</span></div>
        </div>
      </section>

      <section className="ticker" aria-label="Amba Motors highlights"><div><span>25+ years of experience</span><span>Car service for all major brands</span><span>Car repair in Amravati</span><span>Honest work. Reliable results.</span></div></section>

      <section className="trust-metrics" ref={metricsRef} aria-label="Amba Motors experience statistics"><div className="trust-metrics-intro"><SectionLabel>{t.proof}</SectionLabel><h2>{t.proof}<br /><span>{t.proofAccent}</span></h2><p>{t.proofText}</p><div className="trust-metrics-actions"><a className="button button-red" href="#contact"><Phone size={17} /> {t.bookService}</a><a className="text-link" href={whatsapp()} target="_blank" rel="noreferrer">{t.ask} <ArrowRight size={16} /></a></div></div><div className="metrics-grid">{[[metricValues[0], '+', t.vehicles], [metricValues[1], '+', t.issues], [metricValues[2], '+', t.models], [metricValues[3], '+', t.years]].map(([value, suffix, label]) => <div className="metric-card" key={label}><strong>{value.toLocaleString()}<em>{suffix}</em></strong><span>{label}</span></div>)}</div></section>

      <section className="section services-section" id="services"><div className="section-heading"><div><SectionLabel>What we do</SectionLabel><h2>One workshop.<br /><span>Every solution.</span></h2></div><p>From a routine check-up to a complete body makeover, our technicians treat your car like it matters.</p></div><div className="service-grid">{services.map(({ icon: Icon, title, text }, index) => <article className="service-card reveal" style={{ animationDelay: `${index * 70}ms` }} key={title}><div className="service-icon"><Icon size={24} /></div><span className="service-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p><a href="#contact" aria-label={`Enquire about ${title}`}><ArrowRight size={17} /></a></article>)}</div></section>

      <section className="about-section" id="about"><div className="about-image"><Image src="/images/pravin-kuntare.png" alt="Pravin Kuntare, founder of Amba Motors, standing beside a serviced car" fill sizes="(max-width: 800px) 100vw, 42vw" /></div><div className="about-copy"><SectionLabel>Meet the founder</SectionLabel><h2>Pravin Kuntare.<br /><span>Experience behind every repair.</span></h2><p>Amba Motors was founded by <strong>Pravin Kuntare</strong>, a Mechanical Engineer with more than 25 years of experience in the automotive field.</p><p>With decades of hands-on experience, Pravin has built Amba Motors around dependable workmanship, honest service and customer satisfaction. He believes every customer deserves a clear explanation, careful inspection and work done with pride.</p><div className="founder-signature"><strong>Pravin Kuntare</strong><span>Founder · Mechanical Engineer</span></div><div className="about-points"><span><strong>25+</strong> years in automotive care</span><span><strong>All</strong> major car brands welcomed</span><span><strong>One</strong> trusted local workshop</span></div><a className="button button-outline" href="#contact">Meet us for your next service <ArrowRight size={17} /></a></div></section>

      <section className="catalog-section section" id="service-list"><div className="section-heading"><div><SectionLabel>Complete service menu</SectionLabel><h2>Whatever your car needs,<br /><span>we’re ready.</span></h2></div><p>From maintenance and diagnostics to electrical work and roadside support, ask our team about the right solution for your vehicle.</p></div><div className="catalog-grid">{serviceCatalog.map(({ group, icon: Icon, items }) => <article className={`catalog-card ${group === 'Emergency / Roadside' ? 'catalog-emergency' : ''}`} key={group}><div className="catalog-title"><span className="service-icon"><Icon size={21} /></span><h3>{group}</h3></div><ul>{items.map(item => <li key={item}><Check size={15} /> {item}</li>)}</ul>{group === 'Emergency / Roadside' && <a className="text-link" href={whatsapp('Hello Amba Motors, I need emergency roadside assistance.')} target="_blank" rel="noreferrer">Need urgent help? WhatsApp us <ArrowRight size={16} /></a>}</article>)}</div></section>

      <section className="diagnostic-section section" id="diagnose"><div className="section-heading"><div><SectionLabel>Quick diagnosis</SectionLabel><h2>What’s wrong<br /><span>with your car?</span></h2></div><p>Select a symptom and we’ll point you toward the right first step. No guessing, no jargon.</p></div><div className="symptom-layout"><div className="symptom-list">{symptoms.map(([label], index) => <button className={selectedSymptom === index ? 'symptom active' : 'symptom'} key={label} onClick={() => setSelectedSymptom(index)}><span>{label}</span><ArrowRight size={16} /></button>)}</div><div className="symptom-result"><span className="result-kicker"><Check size={15} /> Recommended first step</span><h3>{symptoms[selectedSymptom][1]}</h3><p>{symptoms[selectedSymptom][0]} can have more than one cause. Bring it in for a proper inspection and a clear recommendation.</p><a className="button button-red" href={whatsapp(symptoms[selectedSymptom][2])} target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp us about this</a></div></div></section>

      <section className="seo-section section" id="car-advice"><div className="section-heading"><div><SectionLabel>Local car care guide</SectionLabel><h2>Why is my car<br /><span>doing this?</span></h2></div><p>Useful answers for everyday car problems, written to help drivers make a confident next decision.</p></div><div className="article-grid">{seoArticles.map(([title, text]) => <article className="article-card" key={title}><span className="article-tag">Car care guide</span><h3>{title}</h3><p>{text}</p><a href={`#contact?topic=${encodeURIComponent(title)}`} aria-label={`Talk to Amba Motors about ${title}`}>Having this problem? <strong>Talk to Amba Motors</strong> <ArrowRight size={15} /></a></article>)}</div></section>

      <section className="brands-section"><div className="brands-inner"><div className="brands-copy"><SectionLabel>Car brand compatibility</SectionLabel><h2>We work on<br /><span>your brand.</span></h2><p>From everyday hatchbacks to premium SUVs, our technicians service and repair vehicles across 21 trusted manufacturers.</p><div className="brands-car-image"><Image src={assets.exterior} alt="Cars receiving service at Amba Motors" fill sizes="(max-width: 800px) 100vw, 28vw" /></div></div><div className="brand-list">{brands.map(([brand, slug]) => <div className="brand-logo" key={brand}><img src={`https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/${slug}/default.svg`} alt={`${brand} logo`} /><span>{brand}</span></div>)}</div></div></section>

      <section className="reviews-section section" id="reviews"><div className="reviews-heading"><div><SectionLabel>What our customers say</SectionLabel><h2>Trusted for<br /><span>the right reasons.</span></h2></div><p>Real feedback from customers who value dependable car servicing and honest repairs.</p></div><div className="review-content"><div><div className="review-grid">{reviews.map(([name, text]) => <article className="review-card" key={name}><div className="stars" aria-label="Five star review">★★★★★</div><p>“{text}”</p><strong>{name}</strong><span>Google review</span></article>)}</div><a className="button button-outline review-cta" href={mapLink} target="_blank" rel="noreferrer">See us on Google Maps <ArrowRight size={17} /></a></div><aside className="review-qr-card"><div><SectionLabel>Support local care</SectionLabel><h3>Happy with your service?</h3><p>Scan to leave Amba Motors a Google review. Your feedback helps other drivers find trusted car care.</p><a className="text-link" href={mapLink} target="_blank" rel="noreferrer">Open review page <ArrowRight size={16} /></a></div><Image src="/images/amba-google-review-qr.png" alt="QR code to review Amba Motors on Google" width={190} height={190} /></aside></div></section>

      <section className="dashboard-section section" id="dashboard"><div className="dashboard-header"><div><SectionLabel>Business dashboard</SectionLabel><h2>How we work,<br /><span>made visible.</span></h2></div><p>Every enquiry moves through a clear process, so customers know what happens next.</p></div><div className="dashboard-metrics"><div><strong>8</strong><span>Today’s enquiries</span></div><div><strong>21</strong><span>WhatsApp clicks</span></div><div><strong>14</strong><span>Calls</span></div><div><strong>7</strong><span>Service requests</span></div><div><strong>5</strong><span>Appointments</span></div></div><div className="workflow"><div className="workflow-steps">{['New', 'Contacted', 'Scheduled', 'In Service', 'Completed'].map((status, index) => <span key={status} className={index === 0 ? 'workflow-step active' : 'workflow-step'}><b>{index + 1}</b>{status}</span>)}</div><div className="customer-table"><div className="table-row table-head"><span>Customer</span><span>Vehicle</span><span>Service</span><span>Status</span></div>{[['Rahul', 'Swift', 'Brake repair', 'Pending'], ['Amit', 'Creta', 'Periodic service', 'Confirmed'], ['Priya', 'Nexon', 'AC service', 'In Service']].map(row => <div className="table-row" key={row[0]}>{row.map(cell => <span key={cell}>{cell}</span>)}</div>)}</div></div></section>

      <section className="workflow-tools section" id="tools"><div className="section-heading"><div><SectionLabel>Helpful garage tools</SectionLabel><h2>Stay ready.<br /><span>Stay informed.</span></h2></div><p>Save your next service reminder and keep a simple digital job card ready for every visit.</p></div><div className="tools-grid"><article className="tool-card"><div className="tool-card-heading"><span className="service-icon"><CalendarDays size={22} /></span><div><span className="tool-kicker">Service reminder</span><h3>Never miss your next check-up.</h3></div></div><div className="tool-fields"><label>Vehicle<select value={reminder.vehicle} onChange={event => setReminder({ ...reminder, vehicle: event.target.value })}><option value="">Choose your car</option>{vehicleOptions.map(vehicle => <option key={vehicle}>{vehicle}</option>)}</select></label><label>Reminder type<select value={reminder.type} onChange={event => setReminder({ ...reminder, type: event.target.value })}><option>Periodic service</option><option>Insurance renewal</option><option>PUC renewal</option><option>Tyre check</option></select></label><label className="wide-field">Due around<input type="month" value={reminder.date} onChange={event => setReminder({ ...reminder, date: event.target.value })} /></label></div><div className="tool-actions"><button className="button button-red" onClick={saveReminder}><CalendarDays size={16} /> Save reminder</button><a className="text-link" href={whatsapp(reminderMessage)} target="_blank" rel="noreferrer">Send on WhatsApp <ArrowRight size={15} /></a></div>{reminderSaved && <p className="tool-success">Reminder saved on this device.</p>}</article><article className="tool-card job-card-tool job-card-printable"><div className="tool-card-heading"><span className="service-icon"><ClipboardCheck size={22} /></span><div><span className="tool-kicker">Digital job card</span><h3>Make every visit easy to follow.</h3></div></div><div className="tool-fields"><label>Customer name<input value={jobCard.customer} onChange={event => setJobCard({ ...jobCard, customer: event.target.value })} placeholder="Your name" /></label><label>Vehicle<input value={jobCard.vehicle} onChange={event => setJobCard({ ...jobCard, vehicle: event.target.value })} placeholder="Car model" /></label><label>Registration number<input value={jobCard.registration} onChange={event => setJobCard({ ...jobCard, registration: event.target.value })} placeholder="MH 27 XX 0000" /></label><label>Reported issue<input value={jobCard.concern} onChange={event => setJobCard({ ...jobCard, concern: event.target.value })} placeholder="What should we inspect?" /></label></div><div className="job-statuses" aria-label="Job status">{['Received', 'Inspection', 'Repair', 'Completed'].map(status => <button key={status} className={jobCard.status === status ? 'job-status active' : 'job-status'} onClick={() => setJobCard({ ...jobCard, status })}><span>{status === 'Received' ? '1' : status === 'Inspection' ? '2' : status === 'Repair' ? '3' : '4'}</span>{status}</button>)}</div><div className="tool-actions"><button className="button button-outline" onClick={saveJobCard}><ClipboardCheck size={16} /> Save job card</button><button className="text-link" onClick={() => downloadJobCardPdf()}>Print / save PDF <ArrowRight size={15} /></button></div>{jobCardSaved && <p className="tool-success">Job card saved on this device.</p>}</article></div></section>

      <section className="live-tools section" id="customer-tools"><div className="section-heading"><div><SectionLabel>Live customer tools</SectionLabel><h2>Your car.<br /><span>Always in reach.</span></h2></div><p>Sign in for a private vehicle profile, share a problem directly on WhatsApp, and reach the workshop with live opening information.</p></div><div className="live-grid"><article className="live-card profile-card"><div className="live-card-icon"><History size={20} /></div><span className="tool-kicker">Vehicle history</span><h3>Find your Amba service record.</h3><div className="live-form"><input value={vehicleNumber} onChange={event => setVehicleNumber(event.target.value.toUpperCase())} placeholder="Vehicle number · MH 27 XX 0000" /><button className="button button-red" onClick={lookupVehicle}><History size={16} /> Verify & view history</button></div>{vehicleProfile && <div className="profile-result"><strong>{vehicleProfile.make} {vehicleProfile.model}</strong><span>{vehicleProfile.vehicle_number} {vehicleProfile.year ? `· ${vehicleProfile.year}` : ''}</span>{history.length ? history.map(item => <p key={`${item.service_date}-${item.service_type}`}><b>{item.service_type}</b><small>{item.service_date} · {item.status}</small></p>) : <p>No service history has been added yet.</p>}</div>}{vehicleMessage && <p className="live-message">{vehicleMessage}</p>}</article><article className="live-card upload-card"><div className="live-card-icon"><ImagePlus size={20} /></div><span className="tool-kicker">Problem upload</span><h3>Show us what your car is saying.</h3><p>Choose a dashboard warning, damaged part, tyre or brake photo, engine video, or sound recording. Preview it here, then send it directly to Amba Motors on WhatsApp.</p><label className="upload-drop"><Upload size={20} /><span>{selectedMedia ? 'Choose a different file' : 'Choose photo, video, or audio'}</span><input type="file" accept="image/*,video/*,audio/*" onChange={event => { const file = event.target.files?.[0]; if (file) handleMediaSelect(file) }} /></label>{selectedMedia && <div className="media-preview"><span className="media-preview-name">{selectedMedia.name}</span>{selectedMedia.type.startsWith('image/') && <img src={mediaPreviewUrl} alt="Selected vehicle problem preview" />}{selectedMedia.type.startsWith('video/') && <video src={mediaPreviewUrl} controls playsInline />}{selectedMedia.type.startsWith('audio/') && <audio src={mediaPreviewUrl} controls />}</div>}<button className="button button-red media-whatsapp-button" disabled={!selectedMedia} onClick={shareProblemOnWhatsApp}><MessageCircle size={17} /> Send {selectedMedia ? 'this file' : 'file'} on WhatsApp</button>{uploadMessage && <p className="live-message">{uploadMessage}</p>}</article><article className="live-card voice-card"><div className="live-card-icon"><Mic size={20} /></div><span className="tool-kicker">Voice enquiry</span><h3>Describe your problem naturally.</h3><button className={recognizing ? 'voice-button recording' : 'voice-button'} onClick={startVoiceEnquiry}><Mic size={21} /> {recognizing ? 'Listening…' : 'Describe your problem'}</button>{voiceMessage && <p className="voice-result">“{voiceMessage}”</p>}<a className="text-link" href={whatsapp(voiceMessage || 'Hello Amba Motors, I would like to describe a vehicle problem.')} target="_blank" rel="noreferrer">Send enquiry on WhatsApp <ArrowRight size={15} /></a></article></div></section>

      <section className="open-directions section"><div className="open-status"><span className={openNow ? 'status-dot open' : 'status-dot closed'} /> <strong>{openNow ? 'Open now' : 'Closed · Friday holiday'}</strong><span><Clock3 size={15} /> Sat–Thu · 10:00 AM–9:00 PM · Friday holiday</span></div><a className="button button-red" href={mapLink} target="_blank" rel="noreferrer"><Navigation size={17} /> Navigate to Amba Motors</a></section>

      <section className="emergency-section"><div><span className="emergency-kicker"><AlertTriangle size={18} /> Emergency / Roadside</span><h2>Vehicle<br /><span>breakdown?</span></h2><p>Contact Amba Motors for assistance with roadside and urgent vehicle issues.</p></div><div className="emergency-actions"><a className="button button-red" href={`tel:${phone}`}><Phone size={17} /> Call now</a><a className="button button-outline" href={whatsapp('Hello Amba Motors, my vehicle has broken down and I need roadside assistance.')} target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp now</a></div></section>

      <section className="split-feature" id="why-us"><div className="split-image"><Image src={assets.feature} alt="Technician servicing a car at Amba Motors" fill sizes="(max-width: 800px) 100vw, 50vw" /></div><div className="split-copy"><SectionLabel>The Amba difference</SectionLabel><h2>Good work is<br /><span>felt on the road.</span></h2><p>We combine practical experience, careful workmanship and straight answers. No confusing jargon. No rushed handovers. Just a car that feels right again.</p><div className="check-list"><span><Check size={16} /> Clear communication</span><span><Check size={16} /> Skilled technicians</span><span><Check size={16} /> Quality-first process</span><span><Check size={16} /> Support after service</span></div><a className="button button-outline" href="#contact">Talk to our team <ArrowRight size={17} /></a></div></section>

      <section className="section process-section"><div className="section-heading"><div><SectionLabel>Simple from start to finish</SectionLabel><h2>Your car is<br /><span>in good hands.</span></h2></div><p>Drop in, call ahead or send us a message. We will help you take the next step without the runaround.</p></div><div className="process-grid">{[['01', 'Tell us what’s wrong', 'Share your car details and what you have noticed.'], ['02', 'We inspect & explain', 'Our team checks the car and recommends the right work.'], ['03', 'We restore confidence', 'You get a clear update and a car ready for the road.']].map(([number, title, text]) => <div className="process-item" key={number}><strong>{number}</strong><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></section>

      <section className="gallery-section" id="gallery"><div className="section gallery-heading"><SectionLabel>Proof in the work</SectionLabel><h2>Before. Repair.<br /><span>After.</span></h2><p className="gallery-intro">Real workshop moments, real hands-on care. Tap any image to see it larger.</p></div><div className="trust-gallery"><button className="trust-gallery-item" onClick={() => setSelected({ src: assets.exterior, alt: 'Vehicle before service at Amba Motors', label: 'Before' })}><Image src={assets.exterior} alt="Vehicle before service at Amba Motors" fill sizes="(max-width: 800px) 100vw, 33vw" /><span>Before</span></button><button className="trust-gallery-item" onClick={() => setSelected({ src: assets.feature, alt: 'Technician repairing a vehicle at Amba Motors', label: 'Repair' })}><Image src={assets.feature} alt="Technician repairing a vehicle at Amba Motors" fill sizes="(max-width: 800px) 100vw, 33vw" /><span>Repair</span></button><button className="trust-gallery-item" onClick={() => setSelected({ src: assets.collage, alt: 'Finished bodywork at Amba Motors', label: 'After' })}><Image src={assets.collage} alt="Finished bodywork at Amba Motors" fill sizes="(max-width: 800px) 100vw, 33vw" /><span>After</span></button></div><div className="gallery-grid">{gallery.map((item, index) => <button className={`gallery-item gallery-${index + 1}`} key={item.src} onClick={() => setSelected(item)}><Image src={item.src} alt={item.alt} fill sizes="(max-width: 800px) 50vw, 25vw" /><span>{item.label}</span></button>)}</div></section>

      <section className="vehicle-intake-section section" id="tell-us"><div className="section-heading"><div><SectionLabel>Tell us about your car</SectionLabel><h2>Start with<br /><span>the details.</span></h2></div><p>Choose your vehicle or type your own model. The more we know, the faster we can guide you.</p></div><form className="vehicle-intake-form" onSubmit={submit}><label>Your name<input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Rahul Sharma" required /></label><label>Mobile number<input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="98230 28110" inputMode="numeric" required /></label><label>Vehicle make or model<input list="vehicle-options" value={form.vehicleName} onChange={e => setForm({ ...form, vehicleName: e.target.value })} placeholder="Search or type your car" required /><datalist id="vehicle-options">{vehicleOptions.map(vehicle => <option value={vehicle} key={vehicle} />)}</datalist></label><label>What do you need?<select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>{serviceCatalog.flatMap(group => group.items).map(service => <option key={service}>{service}</option>)}</select></label><label className="wide-field">Tell us more<textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Describe the issue, warning light or service you need..." rows={4} /></label><div className="form-submit wide-field">{error && <p className="form-error">{error}</p>}{saved && <p className="form-success"><Check size={15} /> Saved. Opening WhatsApp for the next step.</p>}<button className="button button-red" type="submit"><MessageCircle size={17} /> Save & enquire on WhatsApp</button></div></form></section>

      <section className="contact-section" id="contact"><div className="contact-intro"><SectionLabel>Let’s get you moving</SectionLabel><h2>Tell us about<br /><span>your car.</span></h2><p>Send an enquiry and our team will get back to you on WhatsApp.</p><div className="contact-details"><a href={`tel:${phone}`}><Phone size={18} /><span>+91 98230 28110<small>Customer care</small></span></a><a href={mapLink} target="_blank" rel="noreferrer"><MapPin size={18} /><span>Sharda Vihar, Amravati<small>Get directions</small></span></a></div></div><form className="enquiry-form" onSubmit={submit}><label>Name<input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" required /></label><label>Mobile number<input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="10-digit number" inputMode="tel" required /></label><label>What do you need?<select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>{serviceCatalog.flatMap(group => group.items).map(service => <option key={service}>{service}</option>)}</select></label><label>Anything else? <span className="optional">Optional</span><textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us a little about your car..." rows={3} /></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-red" type="submit">Send enquiry on WhatsApp <ArrowRight size={17} /></button><p className="form-note">You will continue in WhatsApp to send your enquiry.</p></form></section>

      <section className="faq-section section"><div><SectionLabel>Good to know</SectionLabel><h2>Questions,<br /><span>answered.</span></h2></div><div className="faq-list">{[['Do you service all car brands?', 'Yes. We work with all major car brands and welcome every type of vehicle, from hatchbacks to SUVs.'], ['How do I book a service?', 'Call us, send a WhatsApp message, or use the enquiry form above. We will help arrange the next step.'], ['Where are you located?', 'We are at WP2X+VHJ, No 1, Ram Vattika Hareeiali, Badnera Road, Sharda Vihar, Amravati, Maharashtra 444607.']].map(([question, answer], index) => <div className={`faq ${openFaq === index ? 'faq-open' : ''}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>{question}</span><ChevronDown size={19} /></button>{openFaq === index && <p>{answer}</p>}</div>)}</div></section>

      <section className="map-section"><div className="map-card"><div className="map-grid"><MapPin size={42} /><div><SectionLabel>Find us in Amravati</SectionLabel><h2>Come by.<br /><span>We’re ready.</span></h2><p>WP2X+VHJ, No 1, Ram Vattika Hareeiali, Badnera Rd, Sharda Vihar, Amravati.</p><a className="button button-red" href={mapLink} target="_blank" rel="noreferrer">Open in Google Maps <ArrowRight size={17} /></a></div></div><div className="map-lines" aria-hidden="true"><span /><span /><span /><span /><div className="map-pin"><MapPin size={20} /></div></div></div></section>

      <footer className="footer"><div className="footer-top"><a href="#top" className="brand"><span className="brand-mark"><Wrench size={18} /></span><span><strong>AMBA</strong><small>MOTORS</small></span></a><p>Your car, our care.<br />Reliable service for every road ahead.</p><div className="socials"><a href="#contact" aria-label="Website"><Globe2 size={18} /></a><a href="#contact" aria-label="Location"><MapPin size={18} /></a><a href={whatsapp()} aria-label="WhatsApp"><MessageCircle size={18} /></a></div></div><div className="footer-bottom"><span>© 2026 Amba Motors</span><span>Amravati, Maharashtra</span><span>Built on trust.</span></div></footer>
      <a className="floating-wa" href={whatsapp()} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle size={23} /></a>
      <div className="mobile-actions"><a href={`tel:${phone}`}><Phone size={17} /> Call</a><a href={whatsapp()} target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp</a></div>

      {selected && <div className="lightbox" role="dialog" aria-modal="true" aria-label={selected.alt} onClick={() => setSelected(null)}><button onClick={() => setSelected(null)} aria-label="Close image"><X /></button><Image src={selected.src} alt={selected.alt} width={1400} height={900} onClick={e => e.stopPropagation()} /></div>}
    </main>
    </Localized>
  )
}
