export const envConfig = {
  jwt_secret: process.env.JWT_SECRET,
  jwt_expires: process.env.JWT_EXPIRES,
  supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabase_annon_key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  clodinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  clodinary_api_key: process.env.CLOUDINARY_API_KEY,
  clodinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  stripe_webhook: process.env.STRIPE_WEBHOOK,
  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
  next_public: process.env.NEXT_PUBLIC_URL,
};
