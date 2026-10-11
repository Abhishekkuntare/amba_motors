import { neon } from '@neondatabase/serverless'
import { Pool } from 'pg'

const databaseUrl = process.env.DATABASE_URL

export const pool = new Pool({ connectionString: databaseUrl })

export function getSql() {
  if (!databaseUrl) throw new Error('DATABASE_URL is not configured')
  return neon(databaseUrl)
}
