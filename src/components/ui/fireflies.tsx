"use client";

export function Fireflies() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[2]">
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={i} className="firefly" />
      ))}
    </div>
  );
}
