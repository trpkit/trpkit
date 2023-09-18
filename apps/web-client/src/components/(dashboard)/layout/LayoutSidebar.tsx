export default function LayoutSidebar() {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-neutral-900 px-6">
        {/* Rest of sidebar */}
      </div>
    </div>
  );
}
