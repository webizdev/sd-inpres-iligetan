import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';



export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const bucket = formData.get('bucket') as string || 'sdii_public_assets';
    const folder = formData.get('folder') as string || '';
 
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Koneksi database (Admin) tidak tersedia.' }, { status: 500 });
    }

    if (!file) {
      return NextResponse.json({ error: 'Tidak ada file yang diunggah.' }, { status: 400 });
    }

    // Validasi ukuran: Max 1MB
    const MAX_SIZE = 1 * 1024 * 1024; // 1MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'Ukuran file melebihi 1MB. Silakan kompres lebih dahulu.' },
        { status: 400 }
      );
    }

    // Validasi tipe file
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipe file tidak valid. Gunakan JPG, PNG, WEBP, atau PDF.' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = file.name.split('.').pop();
    const filename = `${uniqueSuffix}.${extension}`;
    const filePath = folder ? `${folder}/${filename}` : filename;

    // Upload ke Supabase
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return NextResponse.json({ error: `Gagal mengunggah ke Storage: ${error.message}` }, { status: 500 });
    }

    // Return URL publik apabila bucket public
    const { data: publicUrlData } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return NextResponse.json({
      message: 'Sukses',
      path: data.path,
      url: publicUrlData?.publicUrl,
    });
  } catch (error) {
    console.error('API Upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Terjadi kesalahan internal server.' },
      { status: 500 }
    );
  }
}
