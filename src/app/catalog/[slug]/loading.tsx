export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-6">
        <aside className="w-80 flex-shrink-0 bg-catalog-sidebar p-4 rounded-lg h-fit sticky top-24">
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 bg-muted rounded-md animate-pulse" />
            ))}
          </div>
        </aside>
        <div className="flex-1">
          <div className="h-10 bg-muted rounded-md w-1/3 mb-6 animate-pulse" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-4">
                <div className="aspect-square bg-muted rounded-md mb-3 animate-pulse" />
                <div className="h-4 bg-muted rounded w-3/4 mb-2 animate-pulse" />
                <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

