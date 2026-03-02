interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function TextPanel({ value, onChange }: Props) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="დაიწყე წერა..."
      className="w-full h-87.5 md:h-112.5 p-6 bg-[#F0F7FF] rounded-xl resize-none outline-none text-[#383A4899]"
    />
  );
}
