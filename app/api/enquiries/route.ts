import { NextResponse } from 'next/server'
import { getSql } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const sql = getSql()
    const body = await request.json()
    const name = String(body.name ?? '').trim()
    const phone = String(body.phone ?? '').replace(/\s/g, '')
    const vehicleName = String(body.vehicleName ?? '').trim()
    const service = String(body.service ?? '').trim()

    if (name.length < 2 || !/^[6-9]\d{9}$/.test(phone) || vehicleName.length < 2 || service.length < 2) {
      return NextResponse.json({ error: 'Please complete your name, valid mobile number, vehicle and service.' }, { status: 400 })
    }

    const [enquiry] = await sql`
      INSERT INTO customer_enquiries (customer_name, phone, vehicle_name, service, status)
      VALUES (${name}, ${phone}, ${vehicleName}, ${service}, 'New')
      RETURNING id, customer_name, vehicle_name, service, status, created_at
    `

    return NextResponse.json({ enquiry }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Unable to save enquiry right now.' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const sql = getSql()
    const [metrics] = await sql`
      SELECT COUNT(*)::int AS enquiries,
        COUNT(*) FILTER (WHERE status = 'New')::int AS new_enquiries,
        COUNT(*) FILTER (WHERE status = 'Scheduled')::int AS scheduled,
        COUNT(*) FILTER (WHERE status = 'In Service')::int AS in_service,
        COUNT(*) FILTER (WHERE status = 'Completed')::int AS completed
      FROM customer_enquiries
    `
    const enquiries = await sql`
      SELECT customer_name, vehicle_name, service, status, created_at
      FROM customer_enquiries
      ORDER BY created_at DESC
      LIMIT 8
    `
    return NextResponse.json({ metrics, enquiries })
  } catch {
    return NextResponse.json({ error: 'Unable to load dashboard data.' }, { status: 500 })
  }
}
