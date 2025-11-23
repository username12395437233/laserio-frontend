export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-6 bg-muted rounded w-1/3 mb-6 animate-pulse" />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square bg-muted rounded-lg animate-pulse" />
        <div className="space-y-4">
          <div className="h-10 bg-muted rounded w-3/4 animate-pulse" />
          <div className="h-8 bg-muted rounded w-1/4 animate-pulse" />
          <div className="h-12 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

