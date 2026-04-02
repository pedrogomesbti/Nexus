import { ConsultaView } from "@/components/features/consulta-view";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Fireflies } from "@/components/ui/fireflies";
import { LoadingScreen } from "@/components/ui/loading-screen";

export default function Home() {
  return (
    <>
      <LoadingScreen />

      <div className="earlybird-bg flex min-h-screen flex-col overflow-hidden">
        {/* Animated floating orbs */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="bg-orb bg-orb-1" />
          <div className="bg-orb bg-orb-2" />
          <div className="bg-orb bg-orb-3" />
        </div>

        {/* Firefly particles */}
        <Fireflies />

        <div className="relative z-10 flex min-h-screen flex-col">
          {/* Theme toggle — top right */}
          <div className="fixed right-5 top-5 z-50">
            <ThemeToggle />
          </div>

          <main className="flex-1">
            <ConsultaView />
          </main>
          <footer className="py-8">
            <p className="text-center text-[12px] text-[#999]">
              ITRACKER &middot; Sistema interno &middot; Uso exclusivo operacional
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
