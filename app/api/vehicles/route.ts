import { auth } from '@/lib/auth'
import { getSql } from '@/lib/db'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const vehicleNumber = new URL(request.url).searchParams.get('vehicleNumber')?.trim().toUpperCase()
  if (!vehicleNumber) return NextResponse.json({ error: 'Vehicle number is required' }, { status: 400 })
  const sql = getSql()
  const profiles = await sql`SELECT id, vehicle_number, make, model, year, created_at FROM vehicle_profiles WHERE user_id = ${session.user.id} AND vehicle_number = ${vehicleNumber} LIMIT 1`
  if (!profiles[0]) return NextResponse.json({ error: 'No verified vehicle found for this account' }, { status: 404 })
  const history = await sql`SELECT id, service_date, service_type, notes, status FROM service_history WHERE vehicle_profile_id = ${profiles[0].id} ORDER BY service_date DESC`
  return NextResponse.json({ profile: profiles[0], history })
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  const vehicleNumber = String(body.vehicleNumber ?? '').trim().toUpperCase()
  const make = String(body.make ?? '').trim()
  const model = String(body.model ?? '').trim()
  if (!vehicleNumber || !make || !model) return NextResponse.json({ error: 'Vehicle number, make, and model are required' }, { status: 400 })
  const sql = getSql()
  const profiles = await sql`INSERT INTO vehicle_profiles (user_id, vehicle_number, make, model, year) VALUES (${session.user.id}, ${vehicleNumber}, ${make}, ${model}, ${body.year ? Number(body.year) : null}) ON CONFLICT (vehicle_number) DO UPDATE SET user_id = EXCLUDED.user_id, make = EXCLUDED.make, model = EXCLUDED.model, year = EXCLUDED.year RETURNING id, vehicle_number, make, model, year`
  return NextResponse.json({ profile: profiles[0] })
}
