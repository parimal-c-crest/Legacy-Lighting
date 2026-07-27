interface PlaceholderPageProps {
  title: string;
  moduleDoc: string;
  sprint: string;
}

export default function PlaceholderPage({ title, moduleDoc, sprint }: PlaceholderPageProps) {
  return (
    <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
      <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      <p className="mt-1 text-sm text-gray-500">
        Built in {sprint} — see <code className="text-xs">{moduleDoc}</code>.
      </p>
    </div>
  );
}
