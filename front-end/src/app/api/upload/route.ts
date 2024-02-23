import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const suffix = Date.now()+file.name ;
  let path = `./public/uploads/${suffix}`
  await writeFile(path, buffer)
  
  // make the path available to the client
  path = `/uploads/${suffix}`
  return NextResponse.json({ success: true, path })
}