// components/DemoCsrContent.tsx
export default function DemoCsrContent({ data }: { data: any[] }) {
    return (
        <div>
            <h1>Demo: Client-Side Rendered Page</h1>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>📄 {item.name}</li>
                ))}
            </ul>
        </div>
    );
}
