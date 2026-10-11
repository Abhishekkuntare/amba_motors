import { put } from '@vercel/blob'
import { auth } from '@/lib/auth'
import { getSql } from '@/lib/db'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'audio/webm', 'audio/mpeg'])

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const formData = await request.formData()
  const file = formData.get('file')
  const vehicleNumber = String(formData.get('vehicleNumber') ?? '').trim().toUpperCase()
  if (!(file instanceof File) || !vehicleNumber) return NextResponse.json({ error: 'A file and vehicle number are required' }, { status: 400 })
  if (!allowedTypes.has(file.type) || file.size > 25 * 1024 * 1024) return NextResponse.json({ error: 'Use a supported image, video, or audio file under 25MB' }, { status: 400 })
  const blob = await put(`vehicle-uploads/${session.user.id}/${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`, file, { access: 'private', addRandomSuffix: false })
  const sql = getSql()
  await sql`INSERT INTO vehicle_uploads (user_id, vehicle_number, pathname, file_type) VALUES (${session.user.id}, ${vehicleNumber}, ${blob.pathname}, ${file.type})`
  return NextResponse.json({ pathname: blob.pathname, fileType: file.type })
}
