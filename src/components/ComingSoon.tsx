export default function ComingSoon({
  label,
  comingSoonText,
}: {
  label: string;
  comingSoonText: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-160px)] gap-4 text-center">
      <h2 className="text-2xl font-semibold text-gray-700">{label}</h2>
      <p className="text-gray-400 text-sm">{comingSoonText}</p>
    </div>
  );
}
