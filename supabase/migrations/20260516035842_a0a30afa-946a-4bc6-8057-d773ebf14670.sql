
INSERT INTO storage.buckets (id, name, public)
VALUES ('video-assets', 'video-assets', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Public read access
CREATE POLICY "Public can view video-assets"
ON storage.objects
FOR SELECT
USING (bucket_id = 'video-assets');
