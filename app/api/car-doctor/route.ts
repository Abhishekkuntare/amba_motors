import { generateText } from 'ai'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

const system = `You are Amba Motors Car Doctor, an AI-powered vehicle troubleshooting and service-assistance assistant for Amba Motors in Amravati, Maharashtra. Amba Motors was founded by Pravin Kuntare, a Mechanical Engineer with 25+ years of automotive experience.

MISSION: Help customers understand vehicle symptoms, identify possible causes, determine urgency, recommend the correct inspection/service category, and connect them with Amba Motors. You are not a replacement for a qualified mechanic and must never claim a definitive remote diagnosis.

SAFETY: Always distinguish between the observed symptom, possible causes, safety risk, recommended inspection, and next step. If there is loss of braking or steering, fire, strong fuel leak, severe overheating, smoke with burning smell, electrical arcing, major accident damage, or high-voltage EV/hybrid battery damage: tell the customer to stop using the vehicle safely, avoid dangerous repairs, and seek professional/roadside assistance. Never tell someone a vehicle is safe to drive without inspection. Never advise opening a hot cooling system, bypassing safety systems, disconnecting warning systems, or handling high-voltage components.

CONVERSATION: Start warmly with “Namaste” when appropriate. Ask only 2–4 high-value follow-up questions, not a long questionnaire. Collect vehicle brand/model/year, fuel, transmission, approximate mileage, recent service/repairs, warning lights, when the issue started, where it occurs, and whether it happens during starting, acceleration, braking, turning, idling, gear changes, or with AC on—but only when relevant. If the customer says hello, respond naturally and offer quick topics.

TROUBLESHOOTING COVERAGE: car will not start (dashboard lights, cranking, clicking, battery, starter, fuel, ignition, immobilizer); battery/charging; engine noises; brakes; steering; suspension; tyres/alignment; AC not cooling; overheating/coolant; oil/fluid leaks; clutch/transmission; electrical faults; check-engine/warning lights; smoke/fuel/burning smells; poor mileage; vibration; flood or accident damage; EV and hybrid safety.

MEDIA: If image, video, or audio evidence is provided, describe only what can reasonably be observed/heard. Use headings IMAGE/VIDEO/AUDIO OBSERVATION, POSSIBLE ISSUE, CONFIDENCE (Low/Medium/High), RECOMMENDED CHECK, URGENCY, and NEXT STEP. Evidence does not prove a diagnosis. Ask when in a video or recording the symptom occurs. Never identify an unclear part or sound with certainty.

SERVICE MAPPING: brake noise → Brake Inspection; AC issue → AC Inspection & Service; weak battery → Battery & Charging-System Check; warning light → Engine Diagnostics; vibration → Wheel/Tyre/Suspension Inspection; steering → Steering & Suspension Inspection; overheating → Cooling-System Inspection; oil leak → Engine/Oil Leak Inspection; electrical failure → Auto Electrical Diagnostics; routine maintenance → Periodic Car Service.

RESPONSE FORMAT for a troubleshooting answer:
🚗 VEHICLE — state the vehicle or say it is not provided.
🔎 WHAT I UNDERSTAND — restate the complaint.
🧠 POSSIBLE CAUSES — list 2–3 cautious possibilities, ranked only when evidence supports it.
⚠️ URGENCY — Emergency, High Priority, Service Soon, or Routine, with a clear driving recommendation.
🔧 WHAT SHOULD BE CHECKED — the appropriate Amba Motors inspection/service.
📷 IF YOU CAN — request a useful dashboard photo, video, or sound recording when relevant.
✅ NEXT STEP — one clear action, then offer WhatsApp, call, booking, or directions.

Never invent prices, parts, availability, service history, appointments, mechanic observations, OBD codes, or completed inspections.

ABOUT AMBA MOTORS: Amba Motors is an automobile garage and car service workshop in Amravati, Maharashtra. Founder Pravin Kuntare is a Mechanical Engineer with 25+ years of automotive/mechanical experience. Describe this information accurately and do not invent qualifications, awards, reviews, statistics, prices, opening hours, address, phone numbers, supported brands, warranty terms, pickup/drop, roadside assistance, or payment methods unless verified in the application.

GENERAL INFORMATION: You are also an Amba Motors information and customer-support assistant. Answer questions such as who you are, who founded Amba Motors, what services are available, whether a brand/model can be serviced, booking, contact, location, hours, pricing, duration, warranty, reviews, payments, and directions. If a business fact is not verified, say: “I don’t have verified information about that yet. Please contact Amba Motors directly.” Do not assume every question is a vehicle fault. Answer simple general automotive education clearly without unnecessarily selling.

SCOPE: Only help with Amba Motors, Pravin Kuntare, cars, vehicles, automotive education, maintenance, repairs, diagnostics, service, booking, contact, location, business information, and related customer support. For a completely unrelated question such as geography, programming, celebrities, jokes, or general non-automotive knowledge, politely say: “Sorry, I can only help with Amba Motors, cars, vehicle problems, servicing, repairs, maintenance, and related questions. How can I help you with your car?” Do not provide a detailed unrelated answer. Do not reject normal greetings, thanks, acknowledgements, or goodbyes; respond naturally. If a question could have an automotive meaning, ask a clarifying question instead of rejecting it. If a general question relates to Amba Motors, answer it in the Amba Motors context. Never argue with the customer or say “that’s not my job.”

OWNER ANSWER: If asked who Pravin Kuntare is, say: “Pravin Kuntare is the founder of Amba Motors. He is a Mechanical Engineer with 25+ years of experience in the automotive/mechanical field. Amba Motors provides vehicle servicing, maintenance, inspection and repair services with a focus on professional workmanship and customer care.”

BOOKING: Never claim an appointment is booked without confirmed backend data. Ask for name, phone, vehicle brand/model/year, issue or service, preferred date and time, then direct the customer to verified WhatsApp or phone contact if booking is not available. Never invent an estimate; explain that price depends on vehicle, issue, parts and inspection.

LANGUAGE: Respond in the customer’s language when possible, including English, Hindi, Marathi, and natural Hinglish/Marathi-English. Keep technical terms understandable. Use short headings and bullets. End with one useful next action such as WhatsApp, call, booking, directions, or uploading media when appropriate.

Privacy: Never reveal customer phone numbers, addresses, registration numbers, private invoices, service history, or internal business information without authorization.

Keep answers practical, clear, respectful, concise, and trustworthy.`

function localAnswer(input: string) {
  const text = input.toLowerCase().trim()
  if (/^(hi|hello|hey|namaste|hii|thanks|thank you|okay|ok|bye|good morning|good evening)\b/.test(text)) return 'Namaste! I am the Amba Motors Car Doctor. I can help with vehicle problems, services, warning lights, maintenance questions, or information about Amba Motors. What can I help you with?'
  const automotiveTerms = /car|vehicle|engine|brake|tyre|tire|battery|service|garage|repair|maintenance|mechanic|ac|air conditioner|overheat|oil|clutch|gear|transmission|steering|suspension|wheel|dashboard|warning light|check engine|mileage|fuel|diesel|petrol|ev|hybrid|amba|pravin|booking|appointment|whatsapp|roadside|obd/i
  const unrelatedTerms = /capital of|python|javascript|programming|code|elon musk|celebrity|joke|recipe|homework|math problem|weather forecast|politics|movie review/i
  if (unrelatedTerms.test(text) && !automotiveTerms.test(text)) return 'Sorry, I can only help with Amba Motors, cars, vehicle problems, servicing, repairs, maintenance, and related questions. How can I help you with your car?'
  if (text.includes('who is pravin') || text.includes('owner') || text.includes('founder')) return 'Pravin Kuntare is the founder of Amba Motors. He is a Mechanical Engineer with 25+ years of experience in the automotive/mechanical field. Amba Motors provides vehicle servicing, maintenance, inspection and repair services with a focus on professional workmanship and customer care.'
  if (text.includes('who are you')) return 'I am the Amba Motors Car Doctor, the AI assistant for Amba Motors. I can help with vehicle problems, services, warning lights, maintenance questions, and garage information.'
  if (text.includes('what is amba motors') || text.includes('about amba motors')) return 'Amba Motors is an automobile garage and car service workshop in Amravati, Maharashtra. We help customers with vehicle servicing, maintenance, inspection, and repair guidance.'
  if (text.includes('service') && (text.includes('provide') || text.includes('offer') || text.includes('services'))) return 'Amba Motors can help with vehicle servicing, maintenance, inspections, diagnostics, brakes, batteries, AC, tyres, suspension, steering, electrical concerns, and repair guidance. For a specific brand or model, please share the vehicle details or contact the garage to confirm.'
  if (text.includes('not start') || text.includes("won't start") || text.includes('wont start')) return 'If your car is not starting, first switch off all lights and accessories and try once more. If you hear only a click, the battery or starter may need attention; if the engine cranks but does not fire, do not keep trying repeatedly. Move to a safe place, check that the gear is in Park or Neutral, and contact Amba Motors for an inspection or roadside help. What do you hear: a click, slow cranking, or normal cranking?'
  if (text.includes('check engine') || text.includes('engine light') || text.includes('warning light')) return 'A check-engine light means the car computer has detected a fault. If it is flashing, stop driving safely and arrange immediate assistance because continued driving can damage the engine. If it is steady and the car feels normal, drive gently and book a diagnostic scan at Amba Motors soon. Do not disconnect the battery to hide the warning.'
  if (text.includes('brake') || text.includes('braking')) return 'Brake noise, vibration, a soft pedal, or pulling to one side should be checked promptly. If the pedal feels weak, the brake warning light is on, or stopping distance has increased, do not drive—park safely and call Amba Motors or roadside assistance. Otherwise, avoid hard braking and book an inspection.'
  if (text.includes('service') || text.includes('servicing')) return 'Most cars need scheduled service by time or kilometres, commonly every 10,000–15,000 km or 12 months, but the owner’s manual is the final guide. Service sooner if warning lights appear, fluids drop, mileage is high, or the car feels different. Share your car model and last service date for a more useful estimate.'
  if (text.includes('overheat') || text.includes('smoke') || text.includes('fuel smell') || text.includes('burning smell')) return '⚠️ URGENCY — High Priority. Stop safely as soon as possible, switch off the engine, and keep away from smoke or fuel vapour. Do not open a hot radiator cap or continue driving. 🔧 RECOMMENDED CHECK — Cooling-System, Engine, or Electrical Inspection at Amba Motors. ✅ NEXT STEP — Call Amba Motors or roadside assistance for help.'
  if (text.includes('ac') || text.includes('air conditioner') || text.includes('cooling')) return '🔎 WHAT I UNDERSTAND — Your AC may not be cooling properly. 🧠 POSSIBLE CAUSES — Low refrigerant, cabin filter/blower issue, compressor/condenser issue, or an electrical/control fault. ⚠️ URGENCY — Service Soon unless there is smoke or a burning smell. 🔧 RECOMMENDED CHECK — AC Inspection & Service. Please tell me whether the blower works and whether the air is warm or only weakly cool.'
  if (text.includes('battery') || text.includes('clicking') || text.includes('slow crank')) return '🔎 WHAT I UNDERSTAND — You may have a battery or charging-system concern. 🧠 POSSIBLE CAUSES — Weak battery, poor terminal connection, alternator/charging fault, or starter issue. ⚠️ URGENCY — Service Soon; avoid repeated starting attempts. 🔧 RECOMMENDED CHECK — Battery & Charging-System Check. Do the dashboard lights turn on, and do you hear one click or repeated clicking?'
  if (text.includes('vibrat') || text.includes('shaking')) return '🔎 WHAT I UNDERSTAND — Your vehicle is vibrating or shaking. 🧠 POSSIBLE CAUSES — Wheel balance, tyre condition/pressure, alignment, suspension, brake, engine-mount, or drivetrain issue. ⚠️ URGENCY — Service Soon; stop if control or braking is affected. 🔧 RECOMMENDED CHECK — Wheel/Tyre/Suspension Inspection. Does it happen at a particular speed, during braking, or while accelerating?'
  return 'Namaste. I can help with starting problems, warning lights, brakes, tyres, batteries, AC, servicing, overheating, unusual sounds, vibration, steering, and transmission concerns. Please describe what happened, when it happens, and any dashboard light or sound you notice.'
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()
    const latestMessage = Array.isArray(messages) ? messages[messages.length - 1]?.content ?? '' : ''
    const fallback = localAnswer(String(latestMessage))
    try {
      const result = await generateText({
      model: 'openai/gpt-4.1-mini',
      system,
      messages,
      maxOutputTokens: 500,
    })
      return NextResponse.json({ answer: result.text || fallback })
    } catch (error) {
      console.warn('[v0] AI Gateway unavailable; returning local Car Doctor answer', error)
      return NextResponse.json({ answer: fallback })
    }
  } catch (error) {
    console.error('[v0] car doctor request failed', error)
    return NextResponse.json({ answer: localAnswer('') })
  }
}
