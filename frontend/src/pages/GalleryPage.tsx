import { useGetAllGalleryImages } from '@/hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function GalleryPage() {
  const { data: images, isLoading } = useGetAllGalleryImages();
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string; description: string } | null>(
    null
  );

  return (
    <div className="py-12">
      <div className="container">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold tracking-tight">Gallery</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore stunning destinations through our collection of travel photography
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-80 w-full rounded-lg" />
            ))}
          </div>
        ) : images && images.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {images.map((image) => {
              const imageUrl = image.blob.getDirectURL();
              return (
                <div
                  key={Number(image.id)}
                  className="group relative overflow-hidden rounded-lg cursor-pointer h-80"
                  onClick={() =>
                    setSelectedImage({
                      url: imageUrl,
                      title: image.title,
                      description: image.description,
                    })
                  }
                >
                  <img
                    src={imageUrl}
                    alt={image.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-white mb-2">{image.title}</h3>
                    <p className="text-sm text-white/90">{image.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No images in the gallery yet. Check back soon!</p>
          </div>
        )}
      </div>

      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl">
            <div className="space-y-4">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              />
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedImage.title}</h2>
                <p className="text-muted-foreground">{selectedImage.description}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
