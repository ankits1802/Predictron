import { HealthStatus } from "@/components/dashboard/health-status";
import { FailureChart } from "@/components/dashboard/failure-chart";
import { RealtimeChart } from "@/components/dashboard/realtimes-chart";
import { AnomalyAlerts } from "@/components/dashboard/anomaly-alerts";
import { MaintenanceSummary } from "@/components/dashboard/maintenance-summary";
import { DailyBriefing } from "@/components/dashboard/daily-briefing";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
        <div className="w-full flex-1">
          <h1 className="text-xl font-semibold">Equipment Overview</h1>
        </div>
        <div className="hidden md:block">
            <Button variant="outline" size="icon" className="h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
            </Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4">
            <DailyBriefing />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <HealthStatus />
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
              <FailureChart />
              <RealtimeChart />
          </div>
          <div className="grid gap-4">
              <AnomalyAlerts />
          </div>
          <div className="grid gap-4">
              <MaintenanceSummary />
          </div>
      </main>
    </>
  );
}
