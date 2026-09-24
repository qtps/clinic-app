export default function ScheduleGraphic() {
  const days = ["M", "T", "W", "T", "F", "S"];
  const rows = 5;

  return (
    <div className="rounded-lg border border-line bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between pb-4">
        <span className="font-display text-lg text-ink">This week</span>
        <span className="text-xs text-ink/50">Riverside District</span>
      </div>
      <div className="grid grid-cols-6 gap-2">
        {days.map((d) => (
          <div key={d} className="text-center text-xs font-medium text-ink/50">
            {d}
          </div>
        ))}
        {Array.from({ length: rows * 6 }).map((_, i) => {
          const isOpen = [4, 9, 14, 20, 27].includes(i);
          const isSelected = i === 20;
          let slotClass = "bg-teal-light";

          if (isOpen) {
            slotClass = "bg-sage-light border border-sage";
          }

          if (isSelected) {
            slotClass = "bg-amber";
          }

          return (
            <div
              key={i}
              className={["aspect-square rounded-sm", slotClass].join(" ")}
            />
          );
        })}
      </div>
      <div className="mt-5 flex items-center justify-between rounded-md bg-teal-light px-4 py-3">
        <div>
          <p className="text-sm font-medium text-ink">Next open slot</p>
          <p className="text-xs text-ink/60">
            Thursday · 2:30 PM · Dr. Amara Osei
          </p>
        </div>
        <span className="h-2.5 w-2.5 rounded-full bg-amber" />
      </div>
    </div>
  );
}
