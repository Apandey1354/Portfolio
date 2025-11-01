import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MediaGallery = ({ achievement }) => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!achievement?.media || achievement?.media?.length === 0) {
    return null;
  }

  const openLightbox = (media, index) => {
    setSelectedMedia(media);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
    setCurrentIndex(0);
  };

  const nextMedia = () => {
    const nextIndex = (currentIndex + 1) % achievement?.media?.length;
    setCurrentIndex(nextIndex);
    setSelectedMedia(achievement?.media?.[nextIndex]);
  };

  const prevMedia = () => {
    const prevIndex = (currentIndex - 1 + achievement?.media?.length) % achievement?.media?.length;
    setCurrentIndex(prevIndex);
    setSelectedMedia(achievement?.media?.[prevIndex]);
  };

  const getMediaIcon = (type) => {
    switch (type) {
      case 'image': return 'Image';
      case 'video': return 'Play';
      case 'document': return 'FileText';
      case 'certificate': return 'Award';
      default: return 'File';
    }
  };

  return (
    <>
      <div className="space-y-4">
        <h4 className="text-lg font-space-grotesk font-semibold text-text-primary flex items-center">
          <Icon name="Camera" size={20} className="mr-2 text-primary" />
          Media Gallery
        </h4>

        {/* Media Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {achievement?.media?.map((media, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="relative group cursor-pointer"
              onClick={() => openLightbox(media, index)}
            >
              <div className="aspect-square rounded-lg overflow-hidden bg-surface">
                {media?.type === 'image' ? (
                  <Image
                    src={media?.url}
                    alt={media?.caption || `Media ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                    <Icon name={getMediaIcon(media?.type)} size={32} className="text-primary" />
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex items-center space-x-2 text-white">
                    <Icon name="Eye" size={16} />
                    <span className="text-sm font-medium">View</span>
                  </div>
                </div>

                {/* Media Type Badge */}
                <div className="absolute top-2 right-2 px-2 py-1 bg-background/80 rounded text-xs text-primary font-medium">
                  {media?.type}
                </div>
              </div>

              {/* Caption */}
              {media?.caption && (
                <p className="mt-2 text-xs text-text-secondary text-center line-clamp-2">
                  {media?.caption}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e?.stopPropagation()}
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={closeLightbox}
                className="absolute -top-12 right-0 w-10 h-10 bg-background/80 hover:bg-background text-text-primary hover:text-primary backdrop-blur-sm z-10"
              >
                <Icon name="X" size={20} />
              </Button>

              {/* Navigation Buttons */}
              {achievement?.media?.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevMedia}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-background/80 hover:bg-background text-text-primary hover:text-primary backdrop-blur-sm"
                  >
                    <Icon name="ChevronLeft" size={24} />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextMedia}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-background/80 hover:bg-background text-text-primary hover:text-primary backdrop-blur-sm"
                  >
                    <Icon name="ChevronRight" size={24} />
                  </Button>
                </>
              )}

              {/* Media Content */}
              <div className="glass-panel rounded-xl overflow-hidden">
                {selectedMedia?.type === 'image' ? (
                  <Image
                    src={selectedMedia?.url}
                    alt={selectedMedia?.caption || 'Media'}
                    className="max-w-full max-h-[70vh] object-contain"
                  />
                ) : selectedMedia?.type === 'video' ? (
                  <video
                    src={selectedMedia?.url}
                    controls
                    className="max-w-full max-h-[70vh]"
                    autoPlay
                  />
                ) : (
                  <div className="p-8 text-center">
                    <Icon name={getMediaIcon(selectedMedia?.type)} size={64} className="text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-space-grotesk font-semibold text-text-primary mb-2">
                      {selectedMedia?.title || 'Document'}
                    </h3>
                    <p className="text-text-secondary mb-4">
                      {selectedMedia?.caption || 'Click to download or view'}
                    </p>
                    <Button
                      variant="default"
                      iconName="Download"
                      iconPosition="left"
                      onClick={() => window.open(selectedMedia?.url, '_blank')}
                    >
                      Download
                    </Button>
                  </div>
                )}

                {/* Caption */}
                {selectedMedia?.caption && selectedMedia?.type === 'image' && (
                  <div className="p-4 bg-background/50">
                    <p className="text-text-secondary text-center">
                      {selectedMedia?.caption}
                    </p>
                  </div>
                )}
              </div>

              {/* Media Counter */}
              {achievement?.media?.length > 1 && (
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-background/80 rounded-full text-text-secondary text-sm backdrop-blur-sm">
                  {currentIndex + 1} of {achievement?.media?.length}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MediaGallery;