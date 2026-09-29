// Inner pages mount this as their backdrop. It used to layer remote stock
// photos and looping blobs; the redesign keeps the page surface quiet so the
// content carries the page.
export const AnimatedBackground = () => (
  <div aria-hidden="true" className="fixed inset-0 -z-10 bg-background" />
);
