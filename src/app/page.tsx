import { ConsultaView } from "@/components/features/consulta-view";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Fireflies } from "@/components/ui/fireflies";
import { LoadingScreen } from "@/components/ui/loading-screen";

export default function Home() {
  return (
    <>
      <LoadingScreen />

      <div className="earlybird-bg flex h-[100dvh] flex-col overflow-hidden">
        {/* Animated floating orbs */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="bg-orb bg-orb-1" />
          <div className="bg-orb bg-orb-2" />
          <div className="bg-orb bg-orb-3" />
        </div>

        {/* Firefly particles */}
        <Fireflies />

        <div className="relative z-10 flex h-full flex-col">
          {/* Theme toggle — top right */}
          <div className="fixed right-4 top-4 z-50 sm:right-5 sm:top-5">
            <ThemeToggle />
          </div>

          <main className="flex flex-1 flex-col">
            <ConsultaView />
          </main>
          <footer className="py-3 sm:py-4">
            <p className="text-center text-[11px] text-[#999] sm:text-[12px]">
              NEXUS &middot; Sistema interno &middot; Uso exclusivo operacional
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
